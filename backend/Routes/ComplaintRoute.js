const { RaiseComplaint, getComplaintHistory, getAllComplaints  } = require('../Controllers/ComplaintController');
const router = require('express').Router();

router.post('/raisecomplaint', RaiseComplaint);
router.get('/complainthistory', getComplaintHistory);

router.get('/allcomplaints', getAllComplaints);

module.exports = router;