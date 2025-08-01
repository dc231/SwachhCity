const { RaiseComplaint, getComplaintHistory, getAllComplaints,updateComplaintStatus  } = require('../Controllers/ComplaintController');
const router = require('express').Router();

router.post('/raisecomplaint', RaiseComplaint);
router.get('/complainthistory', getComplaintHistory);

router.get('/allcomplaints', getAllComplaints);
router.put('/complaints/:id/resolve', updateComplaintStatus);

module.exports = router;