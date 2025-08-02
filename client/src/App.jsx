import React, { useEffect } from 'react';
import API from './api';
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
import ComplaintHistory from './pages/ComplaintHistory';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await API.post('/verify');
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
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/raisecomplaint" element={<Complaints />} />
          <Route path="/complainthistory" element={<ComplaintHistory />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;