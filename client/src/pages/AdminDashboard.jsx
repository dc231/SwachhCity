import { useEffect, useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  const fetchAllComplaints = async () => {
    try {
      const { data } = await API.get('/allcomplaints');
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

  const handleResolve = async (id) => {
  try {
    const { data } = await API.put(`/complaints/${id}/resolve`);
    if (data.success) {
      toast.success(data.message);
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, status: 'Resolved' } : complaint
        )
      );
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error('Failed to resolve complaint.');
    }
  };

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
                      <button className="btn btn-sm btn-success" 
                      onClick={() => handleResolve(complaint._id)}>
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