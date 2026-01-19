// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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
                        onClick={handleSubmit}
                        disabled={loading}
                        className="submit-btn"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="register-link">
                        Don't have an account? <a href="/register">Register here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;