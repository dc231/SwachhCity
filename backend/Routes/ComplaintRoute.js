const { RaiseComplaint } = require('../Controllers/ComplaintController');
const router = require('express').Router();

router.post('/raisecomplaint', RaiseComplaint);

module.exports = router;