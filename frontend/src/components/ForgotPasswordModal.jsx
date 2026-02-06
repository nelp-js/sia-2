import { useState } from 'react';
import api from '../api';
import '../styles/EventManagement.css';

function ForgotPasswordModal({ onClose }) {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/api/password-reset-request/', { username });
            setStep(2);
            setMessage(res.data.detail); // Show "OTP sent to..." message
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to find username.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // 👇 CHANGED: Sending username for verification
            await api.post('/api/password-reset-confirm/', { username, otp, password });
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
                style={{ maxWidth: '400px' }}
            >
                <h2 className="event-mgmt-modal-title">Reset Password</h2>
                
                {error && <div className="event-mgmt-modal-error">{error}</div>}
                {message && <div style={{color:'green', marginBottom:'10px', fontSize:'0.9em'}}>{message}</div>}

                <div className="event-mgmt-modal-form">
                    {step === 1 ? (
                        <form onSubmit={handleSendOTP} style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                            <div className="event-mgmt-modal-field">
                                {/* 👇 CHANGED: Label and Input for Username */}
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                    placeholder="Enter your username"
                                />
                            </div>
                            <button type="submit" className="event-mgmt-modal-save" disabled={loading} style={{width:'100%'}}>
                                {loading ? "Finding User..." : "Next"}
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
                                    placeholder="Check your email"
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
                    <div />
                    <button type="button" className="event-mgmt-modal-cancel" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordModal;