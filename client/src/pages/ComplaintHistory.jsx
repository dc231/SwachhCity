import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function ComplaintHistory() {
  const [complaints, setComplaints] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const fetchComplaintHistory = async () => {
      try {
        const { data } = await axios.get('/api/complainthistory');
        if (data.success) {
          setComplaints(data.complaints);
        } else {
          toast.error('Failed to fetch complaint history.');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching history.');
      }
    };

    fetchComplaintHistory();
  }, [isLoggedIn, navigate]);

  return (
    <div className="container mt-5">
      <h2>Your Complaint History</h2>
      {complaints.length > 0 ? (
        <table className="table table-striped table-hover mt-4">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Waste Type</th>
              <th scope="col">Pickup Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint, index) => (
              <tr key={complaint._id}>
                <th scope="row">{index + 1}</th>
                <td>{complaint.wastetype}</td>
                <td>{new Date(complaint.date).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${complaint.status === 'Pending' ? 'bg-warning' : 'bg-success'}`}>
                    {complaint.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">You have not raised any complaints yet.</p>
      )}
    </div>
  );
}

export default ComplaintHistory;