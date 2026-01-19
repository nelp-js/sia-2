// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
        setLoading(true);
        setErrors({});

        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Store tokens in localStorage
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);

                console.log('LOGIN SUCCESS, REDIRECTING');

                // Redirect to home using React Router
                navigate('/home');
            } else {
                if (data.detail) {
                    setErrors({ general: data.detail });
                } else {
                    setErrors(data);
                }
            }
        } catch (error) {
            setErrors({ general: 'Unable to connect to server. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="form-header">
                    <h2>Welcome Back</h2>
                    <p>Please login to your account</p>
                </div>

                {errors.general && (
                    <div className="error-message">
                        <p>{errors.general}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="form-fields">
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
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            placeholder="Enter your password"
                        />
                        {errors.password && <span className="field-error">{errors.password}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="submit-btn"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="register-link">
                        Don't have an account? <a href="/register">Register here</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
