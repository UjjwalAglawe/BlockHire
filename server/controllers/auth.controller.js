const prisma = require("../dbConfig/prisma"); 
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword,
            },
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser,
        });
    } catch (err) {
        if (err.code === "P2002") {
            return res.status(400).json({
                success: false,
                message: "Username or email is already taken",
            });
        }
        next(err);
    }
};

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await prisma.user.findUnique({ where: { email } });

        if (!validUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }

        const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser;

        res.cookie("access_token", token, { httpOnly: true }).status(200).json({
            success: true,
            message: "Logged in successfully",
            data: rest,
        });
    } catch (err) {
        next(err);
    }
};

exports.google = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: req.body.email },
        });

        if (user) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json({
                success: true,
                message: "Logged in successfully",
                data: rest,
            });
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            const newUser = await prisma.user.create({
                data: {
                    username:
                        req.body.name.split(" ").join("").toLowerCase() +
                        Math.random().toString(36).slice(-4),
                    email: req.body.email,
                    password: hashedPassword,
                },
            });

            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser;

            res.cookie("access_token", token, { httpOnly: true }).status(200).json({
                success: true,
                message: "Logged in successfully",
                data: rest,
            });
        }
    } catch (error) {
        next(error);
    }
};
