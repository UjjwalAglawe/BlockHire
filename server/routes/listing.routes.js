const express = require("express");
const router = express.Router();
const { getAllFreelancers, getFreelancerById, getFreelancerByUserId } = require("../controllers/listing.controller");
const { verifyToken, isFreelancer, isFreelancerOwner } = require("../middleware/auth");

// Public routes (require authentication but no specific role)
router.get("/freelancers", verifyToken, getAllFreelancers);
router.get("/freelancers/:id", verifyToken, getFreelancerById);
router.get("/freelancersUser/:id", verifyToken, getFreelancerByUserId);

// // Protected routes (require freelancer role and ownership)
// router.put("/freelancers/:id", verifyToken, isFreelancer, isFreelancerOwner, updateFreelancerProfile);
// router.delete("/freelancers/:id", verifyToken, isFreelancer, isFreelancerOwner, deleteFreelancerProfile);

module.exports = router; 