const prisma = require("../dbConfig/prisma");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.freelancerSignup = async (req, res, next) => {
    try {
        console.log("first")
        const { id } = req.params;
        const {
            title,
            bio,
            education,
            experience,
            portfolioUrl,
            hourlyRate,
            metamaskAddress,
            skills,
        } = req.body;

        console.log("Received payload: ", req.body);
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const existingFreelancer = await prisma.freelancer.findUnique({
            where: { userId: parseInt(id) },
        });

        if (existingFreelancer) {
            return res.status(400).json({ message: "User is already registered as a freelancer." });
        }


        console.log("Creating freelancer profile...");
        const freelancer = await prisma.freelancer.create({
            data: {
                userId: parseInt(id),
                title,
                bio,
                education,
                experience,
                portfolioUrl,
                hourlyRate: parseFloat(hourlyRate),
                metamaskAddress,
                skills: {
                    create: skills.map((skill) => ({ skill })),
                },
            },
            include: {
                skills: true,
            },
        });

        // Update user to mark as freelancer
        console.log("Updating user to mark as freelancer...");
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { isFreelancer: true },
            include: { freelancer: true },
        });

        console.log("User successfully registered as a freelancer.");        
        res.status(201).json({
            success: true,
            message: "User successfully registered as a freelancer.",
            data: {
                user: updatedUser,
                freelancer
            }
        });

    } catch (error) {
        console.error("Error registering freelancer:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};
