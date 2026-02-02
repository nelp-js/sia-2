import { Link, NavLink } from 'react-router-dom';
import '../styles/Layout.css';

function Header() {
    return (
        <header className="site-header">
            <div className="header-content">
                <Link to="/" className="header-logo-section">
                    <img src="/addu-logo-white.png" alt="ADDU Logo" className="header-logo" />
                    <span className="header-title">Ateneo Alumni</span>
                </Link>
                <nav className="header-nav">
                    <Link to="/">Home</Link>
                    <Link to="/events">Events</Link>
                    <a href="#engage">Engage</a>
                    <a href="#support">Support</a>
                    <a href="#volunteer">Volunteer</a>
                    <a href="#profile">Profile</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;
