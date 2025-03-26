const express = require("express");
const router = express.Router();
const { 
    addProject, 
    getFreelancerProjects, 
    updateProject, 
    deleteProject 
} = require("../controllers/addProject.controller");
const { verifyToken, isFreelancer, isFreelancerOwner } = require("../middleware/auth");

// Get all projects for a freelancer (public)
router.get("/freelancers/:freelancerId/projects", verifyToken, getFreelancerProjects);

// Project management routes (protected)
router.post("/freelancers/:freelancerId/projects", addProject);
router.put("/projects/:projectId", verifyToken, isFreelancer, isFreelancerOwner, updateProject);
router.delete("/projects/:projectId", verifyToken, isFreelancer, isFreelancerOwner, deleteProject);

module.exports = router; 