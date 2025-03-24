const express= require('express');
const { freelancerSignup } = require('../controllers/register.controller');
const router = express.Router();

router.post("/register/:id", freelancerSignup)

module.exports = router