import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 2. PREVENT 400 ERROR: Don't send request if empty
        if (!formData.username || !formData.password) {
            setErrors({ general: "Username and password are required." });
            return;
        }

        setLoading(true);
        setErrors({});

        //for local
        // try {
        //     const response = await fetch('http://127.0.0.1:8000/api/token/', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData)
        //     });

        try {
    const response = await fetch('https://sia-2.onrender.com/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });

            const data = await response.json();

            if (response.ok) {
                // 3. FIX: Use the string constants defined above
                localStorage.setItem(ACCESS_TOKEN, data.access);
                localStorage.setItem(REFRESH_TOKEN, data.refresh);
                
                // 4. FIX: Use React Router redirect instead of window.location
                // window.location.href = '/'  <-- This reloads the page (slower)
                window.location.href = '/'; // keeping your method for now, or use navigate('/')
            } else {
                // 5. DEBUG: This will print the specific 400 error to your browser console
                console.log("Error details:", data); 
                
                // Handle "No active account" (401) vs "Bad Request" (400)
                if (data.detail) {
                    setErrors({ general: data.detail });
                } else {
                    // This handles validation errors like { username: ["This field is required"] }
                    setErrors(data);
                }
            }
        } catch (error) {
            setErrors({ general: 'Unable to connect to server.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <Header />


            {/* Main Content */}
            <main className="login-main">
                <div className='login-container'>
                    <div className="login-form">
                        <div className="form-logo-section">
                            <img src="/addulogo.jpg" alt="ADDU Logo" className="form-logo" />


                            <h1 className="form-brand-title">Ateneo Alumni</h1>
                        </div>

                        <h2>Sign In</h2>


                        {errors.general && (
                            <div className="error-message">
                                <p>{errors.general}</p>
                            </div>
                        )}

                        <div className="form-fields">
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={errors.username ? 'error' : ''}
                                    placeholder="Enter your username"
                                />
                                {errors.username && <span className="field-error">{errors.username}</span>}
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <div className="password-input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={errors.password ? 'error' : ''}
                                        placeholder="Enter your password"
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

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="submit-btn"
                            >
                                {loading ? 'Logging in...' : 'Sign In'}
                            </button>

                            <div className="form-links">
                                <a href="#forgot-password" className="forgot-password-link">Forgot Password?</a>
                                <p className="register-link">
                                    Don't have an account? <a href="/register">Register here</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

        </div>
    );
}

export default Login;