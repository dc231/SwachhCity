import React from 'react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Login() {
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
  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2>Login</h2>
      <form>
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