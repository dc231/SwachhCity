import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminLogin() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

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
      const { data } = await axios.post('/api/adminlogin', { ...inputValue });
      const { message, success } = data;
      if (success) {
        toast.success(message);
        navigate('/admin/dashboard');
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred during admin login.');
    }
    setInputValue({ email: '', password: '' });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={inputValue.email}
            placeholder="Enter admin email"
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={inputValue.password}
            placeholder="Enter admin password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" className="btn btn-success">Login as Admin</button>
      </form>
    </div>
  );
}

export default AdminLogin;