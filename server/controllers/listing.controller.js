const prisma = require("../dbConfig/prisma");

// Get all freelancers (No filtering for now)
exports.getAllFreelancers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Get total count for pagination
        const total = await prisma.freelancer.count();

        // Fetch all freelancers with pagination
        const freelancers = await prisma.freelancer.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        metamaskAddress: true
                    }
                },
                skills: true,
                languages: true,
                expectations: true
            },
            skip: (parseInt(page) - 1) * parseInt(limit),
            take: parseInt(limit),
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Format the response
        const formattedFreelancers = freelancers.map(freelancer => ({
            id: freelancer.id,
            name: freelancer.user.name,
            email: freelancer.user.email,
            title: freelancer.title,
            bio: freelancer.bio,
            education: freelancer.education,
            experience: freelancer.experience,
            portfolioUrl: freelancer.portfolioUrl,
            hourlyRate: freelancer.hourlyRate,
            country: freelancer.country,
            photoUrl: freelancer.photoUrl,
            metamaskAddress: freelancer.user.metamaskAddress,
            skills: freelancer.skills.map(s => s.skill),
            languages: freelancer.languages.map(l => l.language),
            expectations: freelancer.expectations.map(e => e.point),
            createdAt: freelancer.createdAt,
            updatedAt: freelancer.updatedAt
        }));

        return res.status(200).json({
            success: true,
            data: formattedFreelancers,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });

    } catch (error) {
        console.error("Error fetching freelancers:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};

// Get a single freelancer by ID
exports.getFreelancerById = async (req, res) => {
    try {
        const { id } = req.params;

        const freelancer = await prisma.freelancer.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        metamaskAddress: true
                    }
                },
                skills: true,
                languages: true,
                expectations: true
            }
        });

        if (!freelancer) {
            return res.status(404).json({
                success: false,
                message: "Freelancer not found."
            });
        }

        const formattedFreelancer = {
            id: freelancer.id,
            name: freelancer.user.name,
            email: freelancer.user.email,
            title: freelancer.title,
            bio: freelancer.bio,
            education: freelancer.education,
            experience: freelancer.experience,
            portfolioUrl: freelancer.portfolioUrl,
            hourlyRate: freelancer.hourlyRate,
            country: freelancer.country,
            photoUrl: freelancer.photoUrl,
            metamaskAddress: freelancer.user.metamaskAddress,
            skills: freelancer.skills.map(s => s.skill),
            languages: freelancer.languages.map(l => l.language),
            expectations: freelancer.expectations.map(e => e.point),
            createdAt: freelancer.createdAt,
            updatedAt: freelancer.updatedAt
        };

        return res.status(200).json({
            success: true,
            data: formattedFreelancer
        });

    } catch (error) {
        console.error("Error fetching freelancer:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message
        });
    }
};
