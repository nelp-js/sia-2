import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Layout.css';
import { ACCESS_TOKEN, USER_IS_ADMIN } from '../constants';
import api from '../api';

function Header() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAdmin(false);
            return;
        }
        const cached = localStorage.getItem(USER_IS_ADMIN);
        if (cached === 'true') {
            setIsAdmin(true);
            return;
        }
        api.get('/api/user/me/')
            .then((res) => {
                const admin = Boolean(res.data?.is_superuser);
                setIsAdmin(admin);
                localStorage.setItem(USER_IS_ADMIN, admin ? 'true' : 'false');
            })
            .catch(() => setIsAdmin(false));
    }, []);

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
                    {isAdmin && (
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'header-nav-link active' : 'header-nav-link'}>
                            Dashboard
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
