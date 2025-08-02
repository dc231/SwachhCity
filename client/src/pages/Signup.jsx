import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const navigate = useNavigate(); 
    const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
  });

  const { email, password, name, address } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
        ...inputValue,
        [name]: value,
        });
  };

  const handleError = (err) =>
    toast.error(err, {
        position: 'bottom-left',
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
        position: 'bottom-right',
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/signup', {
        ...inputValue,
        createdAt: new Date(),
      });
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        navigate('/login');
        setInputValue({
          email: '',
          password: '',
          name: '',
          address: '',
        });
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError('An error occurred during signup.');
    }
  };

  return (
    <div className="form-container">
        <div className="form-card">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={name}
                        placeholder="Enter your full name"
                        onChange={handleOnChange}
                    />
                </div>
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
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={address}
                        placeholder="Enter your address"
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
                        placeholder="Create a password"
                        onChange={handleOnChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
                <div className="mt-3">
                    <span>Already have an account? </span>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    </div>
  );
}

export default Signup;