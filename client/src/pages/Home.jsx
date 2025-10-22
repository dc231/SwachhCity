import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './home.css';

function Home() {
    const { isLoggedIn } = useSelector((state) => state.user);

    return (
        <section className="home-section">
            <div className="home-container">
                <div className="text-content">
                    <h1 className="display-4">Welcome to SwachhCity</h1>
                    <p className="lead">
                        Your one-stop solution to report and track garbage collection issues in your area.
                        Help us keep our cities clean, together.
                    </p>
                    {isLoggedIn ? (
                        <Button as={Link} to="/raisecomplaint" variant="success" size="lg" className="get-started-btn">
                            Raise a New Complaint
                        </Button>
                    ) : (
                        <Button as={Link} to="/login" variant="success" size="lg" className="get-started-btn">
                            Get Started
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Home;