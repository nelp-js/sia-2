import { useState } from 'react';
import '../styles/Register.css';

function Register() {
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        is_married: false,
        maiden_name: '',
        email: '',
        confirm_email: '',
        phone_number: '',
        batch: '',
        program: '',
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const submitData = {
            ...formData
        };

        try {
            const response = await fetch('https://sia-2.onrender.com/api/user/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({
                    first_name: '',
                    middle_name: '',
                    last_name: '',
                    is_married: false,
                    maiden_name: '',
                    email: '',
                    confirm_email: '',
                    phone_number: '',
                    batch: '',
                    program: '',
                    username: '',
                    password: ''
                });
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                setErrors(data);
            }
        } catch (error) {
            setErrors({ general: 'An error occurred. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            {/* Header */}
            <header className="login-header">
                <div className="header-content">
                    <div className="header-logo-section">
                        <img src="/addu-logo-white.png" alt="ADDU Logo" className="header-logo" />
                        <span className="header-title">ATENEO ALUMNI</span>
                    </div>
                    <nav className="header-nav">
                        <a href="#news">News</a>
                        <a href="#events">Events</a>
                        <a href="#engage">Engage</a>
                        <a href="#support">Support</a>
                        <a href="#volunteer">Volunteer</a>
                        <a href="#profile">Profile</a>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="register-main">
                <h1 className="register-title">Reconnect With Us</h1>
                <div className="register-form">
                    {success && (
                        <div className="success-message">
                            <p>✓ Registration successful! Redirecting to login...</p>
                        </div>
                    )}

                    {errors.general && (
                        <div className="error-message">
                            <p>{errors.general}</p>
                        </div>
                    )}

                    <div className="form-fields">
                        <div className="name-fields">
                            <div className="form-group">
                                <label>First Name *</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className={errors.first_name ? 'error' : ''}
                                    placeholder="Arisa"
                                />
                                {errors.first_name && <span className="field-error">{errors.first_name}</span>}
                            </div>

                            <div className="form-group">
                                <label>Middle Name</label>
                                <input
                                    type="text"
                                    name="middle_name"
                                    value={formData.middle_name}
                                    onChange={handleChange}
                                    className={errors.middle_name ? 'error' : ''}
                                    placeholder="Baran"
                                />
                                {errors.middle_name && <span className="field-error">{errors.middle_name}</span>}
                            </div>

                            <div className="form-group">
                                <label>Last Name *</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className={errors.last_name ? 'error' : ''}
                                    placeholder="Nakagawa"
                                />
                                {errors.last_name && <span className="field-error">{errors.last_name}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="is_married"
                                    checked={formData.is_married}
                                    onChange={handleChange}
                                />
                                <span>Married</span>
                            </label>
                        </div>

                        {formData.is_married && (
                            <div className="form-group">
                                <label>Maiden Name</label>
                                <input
                                    type="text"
                                    name="maiden_name"
                                    value={formData.maiden_name}
                                    onChange={handleChange}
                                    placeholder="Enter maiden name"
                                />
                                {errors.maiden_name && <span className="field-error">{errors.maiden_name}</span>}
                            </div>
                        )}

                        <div className="email-fields">
                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? 'error' : ''}
                                    placeholder="abnakagawa@addu.edu.ph"
                                />
                                {errors.email && <span className="field-error">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label>Confirm Email *</label>
                                <input
                                    type="email"
                                    name="confirm_email"
                                    value={formData.confirm_email}
                                    onChange={handleChange}
                                    className={errors.confirm_email ? 'error' : ''}
                                    placeholder="abnakagawa@addu.edu.ph"
                                />
                                {errors.confirm_email && <span className="field-error">{errors.confirm_email}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Valid ID *</label>
                            <button type="button" className="upload-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                Upload Image
                            </button>
                        </div>

                        <div className="form-group">
                            <label>Phone Number *</label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className={errors.phone_number ? 'error' : ''}
                                placeholder="+63 9123456789"
                            />
                            {errors.phone_number && <span className="field-error">{errors.phone_number}</span>}
                        </div>

                        <div className="batch-program-fields">
                            <div className="form-group">
                                <label>Batch *</label>
                                <select
                                    name="batch"
                                    value={formData.batch}
                                    onChange={handleChange}
                                    className={errors.batch ? 'error' : ''}
                                >
                                    <option value="">Select Batch</option>
                                    <option value="2020">2025</option>
                                    <option value="2021">2024</option>
                                    <option value="2022">2023</option>
                                    <option value="2023">2022</option>
                                    <option value="2024">2021</option>
                                    <option value="2025">2020</option>
                                    <option value="2020">2019</option>
                                    <option value="2021">2018</option>
                                    <option value="2022">2017</option>
                                    <option value="2023">2016</option>
                                    <option value="2024">2015</option>
                                    <option value="2025">2014</option>
                                </select>
                                {errors.batch && <span className="field-error">{errors.batch}</span>}
                            </div>

                            <div className="form-group">
                                <label>Program *</label>
                                <select
                                    name="program"
                                    value={formData.program}
                                    onChange={handleChange}
                                    className={errors.program ? 'error' : ''}
                                >
                                    <option value="">Select Program</option>
                                    <option value="CS">Computer Science</option>
                                    <option value="IT">Information Technology</option>
                                    <option value="IS">Information Systems</option>
                                    
                                </select>
                                {errors.program && <span className="field-error">{errors.program}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Username *</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={errors.username ? 'error' : ''}
                                placeholder="arisanakagawa"
                            />
                            {errors.username && <span className="field-error">{errors.username}</span>}
                        </div>

                        <div className="form-group">
                            <label>Password * (minimum 8 characters)</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={errors.password ? 'error' : ''}
                                    placeholder=""
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                            <line x1="1" y1="1" x2="23" y2="23"></line>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <span className="field-error">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="submit-btn"
                            >
                                {loading ? 'Creating Account...' : 'Register'}
                            </button>
                            <p className="login-link">
                             <br/>   Already have an account? <a href="/login">Sign in</a> 
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="login-footer">
                <div className="footer-content">
                    <div className="footer-section footer-about">
                        <div className="footer-logo-section">
                            <img src="/addu-logo-white.png" alt="ADDU Logo" className="footer-logo" />
                            <span className="footer-title">ATENEO ALUMNI</span>
                        </div>
                        <p className="footer-address">E. Jacinto Street, 8016, Davao City, Philippines</p>
                    </div>

                    <div className="footer-section footer-connect">
                        <h3>Connect</h3>
                        <div className="social-icons">
                            <a href="#facebook" aria-label="Facebook">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="#linkedin" aria-label="LinkedIn">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a href="#youtube" aria-label="YouTube">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                            <a href="#instagram" aria-label="Instagram">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                        </div>
                        <div className="footer-links">
                            <a href="#alumni-near-me">Alumni Near Me</a>
                            <a href="#in-memoriam">In Memoriam</a>
                            <a href="#directory">Directory</a>
                        </div>
                    </div>

                    <div className="footer-section footer-engage">
                        <h3>Engage</h3>
                        <div className="footer-links">
                            <a href="#programs">Programs</a>
                            <a href="#partner">Partner</a>
                            <a href="#give">Give</a>
                        </div>
                    </div>

                    <div className="footer-section footer-events">
                        <h3>Events</h3>
                        <div className="footer-links">
                            <a href="#events-calendar">Events Calendar</a>
                            <a href="#travel">Travel</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Register;
