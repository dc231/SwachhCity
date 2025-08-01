import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState({
        email: '',
        password: '',
    });

    const { email, password } = inputValue;

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
      const { data } = await axios.post('/api/login', { ...inputValue });
      const { message, success, user } = data;
      if (success) {
        toast.success(message);
        dispatch(login({ name: user.name, email: user.email, address: user.address }));
        navigate('/');
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred during login.');
    }
  };
  return (
    <div className="form-container">
        <div className="form-card">
            <h2>User Login</h2>
            <div className="alert alert-info small p-2">
            <strong>Demo Credentials:</strong><br />
            Email: <code>testuser@example.com</code><br />
            Password: <code>password123</code>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={handleOnChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={handleOnChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login as User</button>
                <div className="mt-3">
                <span>Don't have an account? </span>
                <Link to="/signup">Signup</Link>
                </div>
            </form>
             <Link to="/admin" className="admin-login-link">Admin Login</Link>
        </div>
    </div>
  );
}

export default Login;