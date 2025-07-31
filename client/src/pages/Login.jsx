import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
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
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
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