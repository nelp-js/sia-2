import { useState, useRef } from 'react';
import '../styles/Register.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTitle } from '../Hooks/useTitle';
import { useNavigate } from 'react-router-dom';

function Register() {
    useTitle('Register');
    const navigate = useNavigate();
    
    // Setup Ref for the hidden file input
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
        id_type: '', // New field for selection
        valid_id: null 
    });

    const [fileName, setFileName] = useState(""); 
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Dynamic Batch Generation (1948 - Current Year)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1948 + 1 }, (_, i) => currentYear - i);

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

        // Frontend Validations
        if (formData.email !== formData.confirm_email) {
            setErrors({ confirm_email: 'Email and Confirm Email must match.' });
            return;
        }
        if (formData.password !== formData.confirm_password) {
            setErrors({ confirm_password: 'Password and Confirm Password must match.' });
            return;
        }
        if (!formData.id_type) {
            setErrors({ id_type: 'Please select an ID type first.' });
            return;
        }
        if (!formData.valid_id) {
            setErrors({ valid_id: 'Please upload the image of your selected ID.' });
            return;
        }

        setLoading(true);

        const dataToSend = new FormData();

        // Standard Fields
        dataToSend.append('first_name', formData.first_name);
        dataToSend.append('middle_name', formData.middle_name || ""); 
        dataToSend.append('last_name', formData.last_name);
        dataToSend.append('is_married', formData.is_married);
        
        if(formData.is_married && formData.maiden_name) {
            dataToSend.append('maiden_name', formData.maiden_name);
        }
        
        dataToSend.append('email', formData.email);
        dataToSend.append('confirm_email', formData.confirm_email);
        dataToSend.append('phone_number', formData.phone_number);
        dataToSend.append('batch', formData.batch);
        dataToSend.append('program', formData.program);
        dataToSend.append('username', formData.username);
        dataToSend.append('password', formData.password);

        // ID Specific Fields
        dataToSend.append('id_type', formData.id_type);
        dataToSend.append('valid_id', formData.valid_id);

        try {
            const response = await fetch('https://sia-2.onrender.com/api/user/register/', {
                method: 'POST',
                body: dataToSend 
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({
                    first_name: '', middle_name: '', last_name: '',
                    is_married: false, maiden_name: '', email: '',
                    confirm_email: '', phone_number: '', batch: '',
                    program: '', username: '', password: '', confirm_password: '', 
                    id_type: '', valid_id: null
                });
                setFileName("");
                
                setTimeout(() => {
                    navigate('/login');
                }, 5000);
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
                            <p>Please wait for approval. Redirecting you shortly...</p>
                        </div>
                    )}

                    {errors.general && (
                        <div className="error-message">
                            <p>{errors.general}</p>
                        </div>
                    )}

                    {!success && (
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
                                        placeholder="First Name"
                                        required
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
                                        placeholder="Middle Name"
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
                                        placeholder="Last Name"
                                        required
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
                                        placeholder="email@addu.edu.ph"
                                        required
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
                                        placeholder="Confirm email"
                                        required
                                    />
                                    {errors.confirm_email && <span className="field-error">{errors.confirm_email}</span>}
                                </div>
                            </div>

                            {/* --- ID TYPE SELECTION --- */}
                            <div className="form-group">
                                <span><label>Select ID Type</label><label style={{color: 'red'}}> *</label></span>
                                <select 
                                    name="id_type" 
                                    value={formData.id_type} 
                                    onChange={handleChange}
                                    className={errors.id_type ? 'error' : ''}
                                    required
                                >
                                    <option value="">-- Choose an ID --</option>
                                    <option value="National ID">Philippine National ID (PhilID)</option>
                                    <option value="Passport">Philippine Passport</option>
                                    <option value="Birth Certificate">PSA Birth Certificate</option>
                                    <option value="Student ID">Old Student ID</option>
                                    <option value="UMID">UMID (Unified Multi-Purpose ID)</option>
                                    <option value="Driver License">Driver’s License</option>
                                    <option value="PRC ID">PRC ID</option>
                                    <option value="Postal ID">Postal ID</option>
                                    <option value="Voter ID">Voter’s ID / Certification</option>
                                    <option value="PhilHealth">PhilHealth ID</option>
                                    <option value="TIN">TIN ID</option>
                                    <option value="Pag-IBIG">Pag-IBIG ID</option>
                                </select>
                                {errors.id_type && <span className="field-error">{errors.id_type}</span>}
                            </div>

                            <div className="form-group">
                                <span><label>Upload {formData.id_type || "ID"} Image</label><label style={{color: 'red'}}> *</label></span>
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                    accept="image/png, image/jpeg"
                                />
                                <button 
                                    type="button" 
                                    className="upload-btn"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    {fileName ? fileName : "Upload Image"} 
                                </button>
                                {errors.valid_id && <span className="field-error">{errors.valid_id}</span>}
                            </div>

                            <div className="batch-program-fields">
                                <div className="form-group">
                                    <span><label>Batch Year</label><label style={{color: 'red'}}> *</label></span>
                                    <select name="batch" value={formData.batch} onChange={handleChange} required>
                                        <option value="">Select Batch</option>
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <span><label>Program</label><label style={{color: 'red'}}> *</label></span>
                                    <select name="program" value={formData.program} onChange={handleChange} required>
                                        <option value="">Select Program</option>
                                        <option value="CS">Computer Science</option>
                                        <option value="IT">Information Technology</option>
                                        <option value="IS">Information Systems</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <span><label>Phone Number</label><label style={{color: 'red'}}> *</label></span>
                                <input
                                    type="tel"
                                    name="phone_number"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    className={errors.phone_number ? 'error' : ''}
                                    placeholder="+63 9XXXXXXXXX"
                                />
                                {errors.phone_number && <span className="field-error">{errors.phone_number}</span>}
                            </div>

                            <div className="form-group">
                                <label>Username *</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.username && <span className="field-error">{errors.username}</span>}
                            </div>

                            <div className="password-fields">
                                <div className="form-group">
                                    <label>Password *</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password *</label>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirm_password"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <button onClick={handleSubmit} disabled={loading} className="submit-btn">
                                    {loading ? 'Creating Account...' : 'Register'}
                                </button>
                                <p className="login-link">
                                    Already have an account? <a href="/login">Sign in</a> 
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Register;