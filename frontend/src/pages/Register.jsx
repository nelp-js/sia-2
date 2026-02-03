import { useState, useRef } from 'react';
import '../styles/Register.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTitle } from '../Hooks/useTitle';

function Register() {
    useTitle('Register');
    
    // 1. Setup Ref for the hidden file input
    const fileInputRef = useRef(null); 

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
        password: '',
        confirm_password: '',
        valid_id: null 
    });

    const [fileName, setFileName] = useState(""); 
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // 2. DYNAMIC BATCH GENERATION (1948 - Next Year)
    // This replaces all those hardcoded <option> tags
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: (currentYear - 1) - 1948 + 1 }, (_, i) => (currentYear - 1) - i);

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, valid_id: file }));
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (formData.email !== formData.confirm_email) {
            setErrors({ confirm_email: 'Email and Confirm Email must match.' });
            return;
        }
        if (formData.password !== formData.confirm_password) {
            setErrors({ confirm_password: 'Password and Confirm Password must match.' });
            return;
        }

        setLoading(true);

        const dataToSend = new FormData();

        dataToSend.append('first_name', formData.first_name);
        dataToSend.append('middle_name', formData.middle_name);
        dataToSend.append('last_name', formData.last_name);
        dataToSend.append('is_married', formData.is_married ? 'True' : 'False');
        if(formData.maiden_name) dataToSend.append('maiden_name', formData.maiden_name);
        dataToSend.append('email', formData.email);
        dataToSend.append('confirm_email', formData.confirm_email);
        dataToSend.append('phone_number', formData.phone_number);
        dataToSend.append('batch', formData.batch);
        dataToSend.append('program', formData.program);
        dataToSend.append('username', formData.username);
        dataToSend.append('password', formData.password);

        if (formData.valid_id) {
            dataToSend.append('valid_id', formData.valid_id);
        }

        try {
            const response = await fetch('https://sia-2.onrender.com/api/user/register/', {
                method: 'POST',
                body: dataToSend 
            });

        // try {
        //     const response = await fetch('http://127.0.0.1:8000/api/user/register/', {
        //         method: 'POST',
        //         body: dataToSend 
        //     });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({
                    first_name: '', middle_name: '', last_name: '',
                    is_married: false, maiden_name: '', email: '',
                    confirm_email: '', phone_number: '', batch: '',
                    program: '', username: '', password: '', confirm_password: '', valid_id: null
                });
                setFileName("");
                // Redirect to home after 6 seconds so user can read the message
                setTimeout(() => {
                    window.location.href = '/';
                }, 6000);
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
            <Header />
            <main className="register-main">
                <h1 className="register-title">Reconnect With Us</h1>
                <div className="register-form">
                    {success && (
                        <div className="success-message">
                            <p>✓ Your registration request has been sent.</p>
                            <p>Please wait for approval. You will be able to log in once an admin approves your account.</p>
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
                                <span><label>First Name</label><label style={{color: 'red'}}> *</label></span>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className={errors.first_name ? 'error' : ''}
                                    placeholder="Maria Cristina"
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
                                    placeholder="Reyes"
                                />
                                
                            </div>

                            <div className="form-group">
                                <span><label>Last Name</label><label style={{color: 'red'}}> *</label></span>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className={errors.last_name ? 'error' : ''}
                                    placeholder="Santos"
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
                                <span><label>Maiden Name</label></span>
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
                                <span><label>Email</label><label style={{color: 'red'}}> *</label></span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? 'error' : ''}
                                    placeholder="mcrs@addu.edu.ph"
                                />
                                {errors.email && <span className="field-error">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <span><label>Confirm Email</label><label style={{color: 'red'}}> *</label></span>
                                <input
                                    type="email"
                                    name="confirm_email"
                                    value={formData.confirm_email}
                                    onChange={handleChange}
                                    className={errors.confirm_email ? 'error' : ''}
                                    placeholder="mcrs@addu.edu.ph"
                                />
                                {errors.confirm_email && <span className="field-error">{errors.confirm_email}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <span><label>Valid ID (PNG, JPG, HEIF)</label><label style={{color: 'red'}}> *</label></span>
                            
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                accept="image/png, image/jpeg, image/heif, .heic"
                            />

                            <button 
                                type="button" 
                                className="upload-btn"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                {fileName ? fileName : "Upload Image"} 
                            </button>
                            {errors.valid_id && <span className="field-error">{errors.valid_id}</span>}
                        </div>

                        <div className="form-group">
                            <span><label>Phone Number</label><label style={{color: 'red'}}> *</label></span>
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
                                <span><label>Batch Year</label><label style={{color: 'red'}}> *</label></span>
                                <select
                                    name="batch"
                                    value={formData.batch}
                                    onChange={handleChange}
                                    className={errors.batch ? 'error' : ''}
                                >
                                    <option value="">Select Batch</option>
                                    {/* DYNAMIC BATCH LIST MAPPED HERE */}
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                {errors.batch && <span className="field-error">{errors.batch}</span>}
                            </div>

                            <div className="form-group">
                                <span><label>Program</label><label style={{color: 'red'}}> *</label></span>
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
                                placeholder="macristina"
                            />
                            {errors.username && <span className="field-error">{errors.username}</span>}
                        </div>

                        <div className="password-fields">
                            <div className="form-group">
                                <span><label>Password</label><label style={{color: 'red'}}> * (minimum 8 characters)</label></span>
                                <div className="password-input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={errors.password ? 'error' : ''}
                                        placeholder=""
                                        required
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

                            <div className="form-group">
                                <span><label>Confirm Password</label><label style={{color: 'red'}}> *</label></span>
                                <div className="password-input-wrapper">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirm_password"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        className={errors.confirm_password ? 'error' : ''}
                                        placeholder=""
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showConfirmPassword ? (
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
                                {errors.confirm_password && <span className="field-error">{errors.confirm_password}</span>}
                            </div>
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

            <Footer />
        </div>
    );
}

export default Register;