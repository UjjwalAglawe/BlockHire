const jwt = require("jsonwebtoken");
const prisma = require("../dbConfig/prisma");

const verifyToken = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token not found. Please login."
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                name: true,
                email: true,
                isFreelancer: true,
                metamaskAddress: true,
                companyName: true,
                contactNumber: true
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found."
            });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification error:", error);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please login again."
            });
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token has expired. Please login again."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error during authentication.",
            error: error.message
        });
    }
};

// Middleware to check if user is a freelancer
const isFreelancer = async (req, res, next) => {
    try {
        if (!req.user.isFreelancer) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Freelancer privileges required."
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error checking freelancer status.",
            error: error.message
        });
    }
};

// Middleware to check if user is accessing their own profile
const isOwner = async (req, res, next) => {
    try {
        const requestedUserId = parseInt(req.params.id);
        
        if (req.user.id !== requestedUserId) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You can only access your own profile."
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error verifying ownership.",
            error: error.message
        });
    }
};

// Middleware to check if user is accessing their own freelancer profile
const isFreelancerOwner = async (req, res, next) => {
    try {
        const freelancerId = parseInt(req.params.id);
        
        // Get the freelancer profile
        const freelancer = await prisma.freelancer.findUnique({
            where: { id: freelancerId },
            select: { userId: true }
        });

        if (!freelancer) {
            return res.status(404).json({
                success: false,
                message: "Freelancer profile not found."
            });
        }

        if (req.user.id !== freelancer.userId) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You can only access your own freelancer profile."
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error verifying freelancer ownership.",
            error: error.message
        });
    }
};

// Middleware to check if user is an admin (you can implement this based on your needs)
const isAdmin = async (req, res, next) => {
    try {
        // Add your admin check logic here
        // For example, check if user has admin role in database
        const isAdminUser = false; // Replace with actual admin check
        
        if (!isAdminUser) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin privileges required."
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error checking admin status.",
            error: error.message
        });
    }
};

module.exports = {
    verifyToken,
    isFreelancer,
    isOwner,
    isFreelancerOwner,
    isAdmin
}; 