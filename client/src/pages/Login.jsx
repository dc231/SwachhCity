import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
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

   const handleError = (err) => toast.error(err, { position: 'bottom-left' });
   const handleSuccess = (msg) => toast.success(msg, { position: 'bottom-right' });

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.post('/api/login', {
        ...inputValue,
        });
        const { message, success } = data;
        if (success) {
            handleSuccess(message);
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            handleError(message);
        }
    } catch (error) {
        console.log(error);
        handleError('An error occurred during login.');
    }
    setInputValue({
        email: '',
        password: '',
    });
    };
  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>Login</h2>
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
        <button type="submit" className="btn btn-primary">Login</button>
        <div className="mt-3">
          <span>Don't have an account? </span>
          <Link to="/signup">Signup</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;