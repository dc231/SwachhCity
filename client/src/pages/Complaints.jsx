import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Complaints() {
  const { name, email, address, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    wastetype: '',
    date: '',
    time: '',
    description: '',
    address: address, 
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/raisecomplaint', {
        ...inputValue,
      });
      if (data.success) {
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit complaint.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2>Raise a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="wastetype" className="form-label">Type of Waste</label>
          <select className="form-select" name="wastetype" value={inputValue.wastetype} onChange={handleOnChange} required>
            <option value="">-- Select Waste Type --</option>
            <option value="Dry">Dry Waste</option>
            <option value="Wet">Wet Waste</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Preferred Pickup Date</label>
          <input type="date" className="form-control" name="date" value={inputValue.date} onChange={handleOnChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">Preferred Pickup Time</label>
          <input type="time" className="form-control" name="time" value={inputValue.time} onChange={handleOnChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Pickup Address</label>
          <input type="text" className="form-control" name="address" value={inputValue.address} onChange={handleOnChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description (Optional)</label>
          <textarea className="form-control" name="description" rows="3" value={inputValue.description} onChange={handleOnChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Complaint</button>
      </form>
    </div>
  );
}

export default Complaints;