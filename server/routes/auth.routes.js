const express= require('express');
const router = express.Router();
const { signin, signup, google } = require('../controllers/auth.controller');


router.post("/signin", signin)
router.post("/signup", signup)
router.post("/google", google)

module.exports = router