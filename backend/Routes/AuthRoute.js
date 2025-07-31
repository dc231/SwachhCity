const { Signup, Login, AdminSignup } = require('../Controllers/AuthController');
const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/adminsignup', AdminSignup);
router.post('/verify', userVerification);

module.exports = router;