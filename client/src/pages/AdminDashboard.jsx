import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  const fetchAllComplaints = async () => {
    try {
      const { data } = await axios.get('/api/allcomplaints');
      if (data.success) {
        setComplaints(data.complaints);
      } else {
        toast.error('Failed to fetch complaints.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching complaints.');
    }
  };

  useEffect(() => {
    fetchAllComplaints();
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard - All Complaints</h2>
        <button className="btn btn-secondary" onClick={fetchAllComplaints}>Refresh</button>
      </div>
      {complaints.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Name</th>
                <th scope="col">User Email</th>
                <th scope="col">Address</th>
                <th scope="col">Waste Type</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr key={complaint._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{complaint.user?.name || 'N/A'}</td>
                  <td>{complaint.user?.email || 'N/A'}</td>
                  <td>{complaint.address}</td>
                  <td>{complaint.wastetype}</td>
                  <td>{new Date(complaint.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${complaint.status === 'Pending' ? 'bg-warning' : 'bg-success'}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td>
                    {complaint.status === 'Pending' && (
                      <button className="btn btn-sm btn-success">
                        Resolve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4">No complaints have been submitted yet.</p>
      )}
    </div>
  );
}

export default AdminDashboard;