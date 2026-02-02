import { useState } from 'react';
import '../styles/Register.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
            <Header />

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
                                {errors.middle_name && <span className="field-error">{errors.middle_name}</span>}
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
                                <span><label>Maiden Name</label><label style={{color: 'red'}}> *</label></span>
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
                            <span><label>Valid ID</label><label style={{color: 'red'}}> *</label></span>
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
                                    <option value="2025">2025</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                    <option value="2014">2014</option>
                                    <option value="2013">2013</option>
                                    <option value="2012">2012</option>
                                    <option value="2011">2011</option>
                                    <option value="2010">2010</option>
                                    <option value="2009">2009</option>
                                    <option value="2008">2008</option>
                                    <option value="2007">2007</option>
                                    <option value="2006">2006</option>
                                    <option value="2005">2005</option>
                                    <option value="2004">2004</option>
                                    <option value="2003">2003</option>
                                    <option value="2002">2002</option>
                                    <option value="2001">2001</option>
                                    <option value="2000">2000</option>
                                    <option value="1999">1999</option>
                                    <option value="1998">1998</option>
                                    <option value="1997">1997</option>
                                    <option value="1996">1996</option>
                                    <option value="1995">1995</option>
                                    <option value="1994">1994</option>
                                    <option value="1993">1993</option>
                                    <option value="1992">1992</option>
                                    <option value="1991">1991</option>
                                    <option value="1990">1990</option>
                                    <option value="1989">1989</option>
                                    <option value="1988">1988</option>
                                    <option value="1987">1987</option>
                                    <option value="1986">1986</option>
                                    <option value="1985">1985</option>
                                    <option value="1984">1984</option>
                                    <option value="1983">1983</option>
                                    <option value="1982">1982</option>
                                    <option value="1981">1981</option>
                                    <option value="1980">1980</option>
                                    <option value="1979">1979</option>
                                    <option value="1978">1978</option>
                                    <option value="1977">1977</option>
                                    <option value="1976">1976</option>
                                    <option value="1975">1975</option>
                                    <option value="1974">1974</option>
                                    <option value="1973">1973</option>
                                    <option value="1972">1972</option>
                                    <option value="1971">1971</option>
                                    <option value="1970">1970</option>
                                    <option value="1969">1969</option>
                                    <option value="1968">1968</option>
                                    <option value="1967">1967</option>
                                    <option value="1966">1966</option>
                                    <option value="1965">1965</option>
                                    <option value="1964">1964</option>
                                    <option value="1963">1963</option>
                                    <option value="1962">1962</option>
                                    <option value="1961">1961</option>
                                    <option value="1960">1960</option>
                                    <option value="1959">1959</option>
                                    <option value="1958">1958</option>
                                    <option value="1957">1957</option>
                                    <option value="1956">1956</option>
                                    <option value="1955">1955</option>
                                    <option value="1954">1954</option>
                                    <option value="1953">1953</option>
                                    <option value="1952">1952</option>
                                    <option value="1951">1951</option>
                                    <option value="1950">1950</option>
                                    <option value="1949">1949</option>
                                    <option value="1948">1948</option>
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
