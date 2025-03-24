const express= require('express');
const router = express.Router();
const { signin, signup, google, signOut } = require('../controllers/auth.controller');


router.post("/signin", signin)
router.post("/signup", signup)
router.post("/google", google)
router.post("/signout", signOut)

module.exports = router