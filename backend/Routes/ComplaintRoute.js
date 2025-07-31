const { RaiseComplaint, getComplaintHistory  } = require('../Controllers/ComplaintController');
const router = require('express').Router();

router.post('/raisecomplaint', RaiseComplaint);
router.get('/complainthistory', getComplaintHistory);

module.exports = router;