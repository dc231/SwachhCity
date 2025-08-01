import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

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
    <div className="form-container">
        <div className="form-card">
            <h2>Admin Login</h2>
            <div className="alert alert-info small p-2">
                <strong>Demo Credentials:</strong><br />
                Email: <code>testadmin@example.com</code><br />
                Password: <code>password123</code>
            </div>
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
                <button type="submit" className="btn btn-primary">Login as Admin</button>
            </form>

            <Link to="/login" className="admin-login-link">User Login</Link>
        </div>
    </div>
  );
}

export default AdminLogin;