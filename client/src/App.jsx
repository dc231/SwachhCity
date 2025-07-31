import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
function App() {
  return (
    <Router>
      <div>
        {/* I will add a Navbar component here later */}
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          {/* I will add routes for Login, Signup, etc. here later */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;