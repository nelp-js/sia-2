import { useState } from 'react';
import api from '../api';
import '../styles/EventManagement.css'; // Importing your CSS

function ForgotPasswordModal({ onClose }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/api/password-reset-request/', { email });
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to send code.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/api/password-reset-confirm/', { email, otp, password });
            alert("Password Changed! Please login.");
            onClose();
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to reset.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="event-mgmt-modal-overlay" onClick={onClose}>
            <div 
                className="event-mgmt-modal" 
                onClick={(e) => e.stopPropagation()} 
                style={{ maxWidth: '400px' }} // Keep it compact
            >
                <h2 className="event-mgmt-modal-title">Reset Password</h2>
                
                {error && <div className="event-mgmt-modal-error">{error}</div>}

                <div className="event-mgmt-modal-form">
                    {step === 1 ? (
                        <form onSubmit={handleSendOTP} style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                            <div className="event-mgmt-modal-field">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    placeholder="Enter your registered email"
                                />
                            </div>
                            <button type="submit" className="event-mgmt-modal-save" disabled={loading} style={{width:'100%'}}>
                                {loading ? "Sending..." : "Send Verification Code"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                            <div className="event-mgmt-modal-field">
                                <label>Verification Code (OTP)</label>
                                <input 
                                    type="text" 
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value)} 
                                    required 
                                    placeholder="Check your email/console"
                                />
                            </div>
                            <div className="event-mgmt-modal-field">
                                <label>New Password</label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    placeholder="Enter new password"
                                />
                            </div>
                            <button type="submit" className="event-mgmt-modal-save" disabled={loading} style={{width:'100%'}}>
                                {loading ? "Processing..." : "Set New Password"}
                            </button>
                        </form>
                    )}
                </div>

                <div className="event-mgmt-modal-actions">
                    <div /> {/* Spacer to push Cancel to right */}
                    <button type="button" className="event-mgmt-modal-cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordModal;