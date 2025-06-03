const prisma = require("../dbConfig/prisma");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
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
                message: "Name or email is already taken",
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
            console.log("user not found");
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        console.log("Incoming password:", password);
        console.log("Stored hash:", validUser.password);

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }

        const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET, {
            expiresIn: '2d',
        });

        const { password: pass, ...userData } = validUser;

        let responseData = { ...userData };

        if (validUser.isFreelancer) {
            const freelancerData = await prisma.freelancer.findUnique({
                where: { userId: validUser.id },
            });

            if (freelancerData) {
                responseData = { ...userData, freelancer: freelancerData };
            }
        }

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        }).status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: responseData,
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
                    name:
                        req.body.name.split(" ").join("").toLowerCase() +
                        Math.random().toString(36).slice(-4),
                    email: req.body.email,
                    password: hashedPassword,
                },
            });

            const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET, { expiresIn: '2d' });

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


exports.signOut = async (req, res, next) => {
    try {
        console.log("Received cookies:", req.cookies); // Debugging

        // Check if access_token exists in cookies
        if (!req.cookies || !req.cookies.access_token) {
            return res.status(400).json({ 
                success: false, 
                message: 'No active session to log out' 
            });
        }

        // Clear the authentication cookie
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: false, // Change to true in production
            sameSite: 'Lax', // Use 'None' with secure: true for cross-site
        });

        console.log("User successfully logged out");

        return res.status(200).json({ 
            success: true, 
            message: 'User has been logged out!' 
        });

    } catch (error) {
        console.error("Error in signOut:", error);
        next(error);
    }
};

