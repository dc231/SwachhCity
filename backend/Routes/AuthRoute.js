const { Signup, Login, AdminSignup } = require('../Controllers/AuthController');
const router = require('express').Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/adminsignup', AdminSignup);

module.exports = router;