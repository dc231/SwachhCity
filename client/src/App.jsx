import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './redux/userSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AppNavbar from './components/Navbar';
import Complaints from './pages/Complaints';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        axios.defaults.withCredentials = true; 
        const { data } = await axios.post('/api/verify');
        if (data.status) {
          dispatch(login({
          name: data.user.name,
          email: data.user.email,
          address: data.user.address,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyUser(); 
}, [dispatch]);
  return (
    <Router>
      <div>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/raisecomplaint" element={<Complaints />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;