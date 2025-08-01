import { useSelector, useDispatch } from 'react-redux'; 
import { logout } from '../redux/userSlice'; 
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

function AppNavbar() {
  const { isLoggedIn } = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await axios.post('/api/logout');
        dispatch(logout());
        toast.success("Logged out successfully");
        navigate('/login');
    } catch (error) {
        console.error("Logout failed", error);
        toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn ?(
                <>
                <Nav.Link as={Link} to="/raisecomplaint">Raise Complaint</Nav.Link>
                <Nav.Link as={Link} to="/complainthistory">History</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
            ) : (
                <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;