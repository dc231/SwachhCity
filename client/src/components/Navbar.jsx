import { useSelector, useDispatch } from 'react-redux'; 
import { logout } from '../redux/userSlice'; 
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

function AppNavbar() {
  const { isLoggedIn } = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Swachh-Tracker</Navbar.Brand>
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