    const prisma = require("../dbConfig/prisma");
    const jwt = require("jsonwebtoken");

    exports.freelancerSignup = async (req, res) => {
        try {
            const { id } = req.params;
            const {
                title,
                bio,
                education,
                experience,
                portfolioUrl,
                hourlyRate,
                metamaskAddress,
                photoUrl,
                country,
                skills = [],
                languages = [],
                expectations = [],
            } = req.body;

            // Input validation
            if (!id) return res.status(400).json({ success: false, message: "User ID is required." });
            if (!title || !bio || !country) {
                return res.status(400).json({
                    success: false,
                    message: "Title, bio, and country are required fields.",
                });
            }

            // Validate domains
            const domainMap = {
                "Web Development": "WEB_DEVELOPMENT",
                "Mobile App Development": "MOBILE_APP_DEVELOPMENT",
                "Frontend Development": "FRONTEND_DEVELOPMENT",
                "Backend Development": "BACKEND_DEVELOPMENT",
                "Full-Stack Development": "FULLSTACK_DEVELOPMENT",
                "Blockchain Development": "BLOCKCHAIN_DEVELOPMENT",
                "Game Development": "GAME_DEVELOPMENT",
                "DevOps & Cloud Infrastructure": "DEVOPS_CLOUD_INFRASTRUCTURE",
                "Data Science & Machine Learning": "DATA_SCIENCE_MACHINE_LEARNING",
                "AI Development": "AI_DEVELOPMENT",
                "Cybersecurity": "CYBERSECURITY",
                "Embedded Systems": "EMBEDDED_SYSTEMS",
                "UI/UX Design": "UI_UX_DESIGN",
            };
            
            if (!domainMap[title]) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid title. Must be one of the predefined domains.",
                    validDomains: Object.keys(domainMap),
                });
            }

            // Validate MetaMask address
            // if (metamaskAddress && !/^0x[a-fA-F0-9]{40}$/.test(metamaskAddress)) {
            //     return res.status(400).json({
            //         success: false,
            //         message: "Invalid MetaMask address format.",
            //     });
            // }

            // Check if user exists
            const user = await prisma.user.findUnique({
                where: { id: parseInt(id) },
            });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found.",
                });
            }

            // Check if user is already a freelancer
            const existingFreelancer = await prisma.freelancer.findUnique({
                where: { userId: parseInt(id) },
            });
            if (existingFreelancer) {
                return res.status(400).json({
                    success: false,
                    message: "User is already registered as a freelancer.",
                });
            }

            console.log("Creating freelancer profile...");

            // Create freelancer profile and related records
            const freelancer = await prisma.freelancer.create({
                data: {
                    userId: parseInt(id),
                    title: domainMap[title], 
                    bio,
                    education,
                    experience,
                    portfolioUrl,
                    hourlyRate: parseFloat(hourlyRate) || 0,
                    metamaskAddress,
                    photoUrl,
                    country,
                },
            });

            // Bulk insert skills, languages, and expectations
            if (skills.length) {
                await prisma.freelancerSkill.createMany({
                    data: skills.map((skill) => ({
                        freelancerId: freelancer.id,
                        skill,
                    })),
                });
            }

            if (languages.length) {
                await prisma.freelancerLanguage.createMany({
                    data: languages.map((language) => ({
                        freelancerId: freelancer.id,
                        language,
                    })),
                });
            }

            if (expectations.length) {
                await prisma.freelancerExpectation.createMany({
                    data: expectations.map((point) => ({
                        freelancerId: freelancer.id,
                        point,
                    })),
                });
            }

            console.log("Updating user to mark as freelancer...");
            const updatedUser = await prisma.user.update({
                where: { id: parseInt(id) },
                data: { isFreelancer: true },
                include: {
                    freelancer: {
                        include: {
                            skills: true,
                            languages: true,
                            expectations: true,
                        },
                    },
                },
            });

            // Generate JWT token
            const token = jwt.sign({ id: updatedUser.id }, process.env.JWT_SECRET, {
                expiresIn: "2d",
            });

            const { password, ...userData } = updatedUser;

            // Set token in cookies
            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
            });

            console.log("Freelancer registration completed successfully");
            return res.status(200).json({
                success: true,
                message: "User successfully registered as a freelancer.",
                data: userData,
            });
        } catch (error) {
            console.error("Error registering freelancer:", error);

            // Handle known errors
            if (error.code === "P2002") {
                return res.status(400).json({
                    success: false,
                    message: "Duplicate record exists.",
                });
            }

            return res.status(500).json({
                success: false,
                message: "Internal server error.",
                error: error.message,
            });
        }
    };
