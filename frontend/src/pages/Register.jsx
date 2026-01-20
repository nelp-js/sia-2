import { useState } from 'react';
import Form from '../components/Form';
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

        //for local
        // try {
        //     const response = await fetch('http://127.0.0.1:8000/api/user/register/', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(formData)
        //     });

        try {
    const response = await fetch('https://sia-2.onrender.com/api/user/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
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
        <div className="register-container">
            <div className="register-form">
                <div className="form-header">
                    <h2>Create Account</h2>
                    <p>Please fill in all required fields</p>
                </div>

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
                            />
                            {errors.first_name && <span className="field-error">{errors.first_name}</span>}
                        </div>

                        <div className="form-group">
                            <label>Middle Name *</label>
                            <input
                                type="text"
                                name="middle_name"
                                value={formData.middle_name}
                                onChange={handleChange}
                                className={errors.middle_name ? 'error' : ''}
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
                            <span>Are you married?</span>
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
                                className={errors.maiden_name ? 'error' : ''}
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
                            />
                            {errors.confirm_email && <span className="field-error">{errors.confirm_email}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Phone Number *</label>
                        <input
                            type="tel"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className={errors.phone_number ? 'error' : ''}
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
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
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
                                <option value="CE">Computer Engineering</option>
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
                        />
                        {errors.username && <span className="field-error">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                        <label>Password * (minimum 8 characters)</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="field-error">{errors.password}</span>}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="submit-btn"
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>

                    <p className="login-link">
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;