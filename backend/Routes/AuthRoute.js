const { Signup, Login, AdminSignup, AdminLogin } = require('../Controllers/AuthController');
const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/verify', userVerification);
router.post('/adminsignup', AdminSignup);
router.post('/adminlogin', AdminLogin);

module.exports = router;