import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../api';
import '../styles/UserManagement.css';
import { useTitle } from '../Hooks/useTitle';

function UserManagement() {
    useTitle('User Management');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [approvingId, setApprovingId] = useState(null);
    const [rejectingId, setRejectingId] = useState(null);

    useEffect(() => {
        api.get('/api/users/')
            .then((res) => setUsers(res.data))
            .catch((err) => setError(err.response?.status === 403 ? 'Admin access required.' : 'Failed to load users.'))
            .finally(() => setLoading(false));
    }, []);

    const handleApprove = (userId) => {
        setApprovingId(userId);
        api.post(`/api/users/${userId}/approve/`)
            .then(() => {
                setUsers((prev) =>
                    prev.map((u) => (u.id === userId ? { ...u, is_approved: true, is_active: true } : u))
                );
            })
            .catch(() => {})
            .finally(() => setApprovingId(null));
    };

    const handleReject = (userId) => {
        setRejectingId(userId);
        api.post(`/api/users/${userId}/reject/`)
            .then(() => {
                setUsers((prev) =>
                    // Setting is_approved to false now puts them back to "Pending"
                    prev.map((u) => (u.id === userId ? { ...u, is_approved: false, is_active: false } : u))
                );
            })
            .catch(() => {})
            .finally(() => setRejectingId(null));
    };

    // Format date in viewer's local timezone
    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        try {
            const d = new Date(dateStr);
            return d.toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
            });
        } catch {
            return dateStr;
        }
    };

    // --- FIX 1: Updated Status Logic ---
    const getStatus = (u) => {
        // If True -> Approved
        if (u.is_approved) return 'Approved';
        // If False (or null) -> Pending
        return 'Pending';
    };

    // --- FIX 2: Updated Logic for showing buttons ---
    // Buttons should show if the user is NOT approved yet (is_approved === false)
    const isPending = (u) => !u.is_approved;

    const fullName = (u) => {
        const parts = [u.first_name, u.middle_name, u.last_name].filter(Boolean);
        return parts.join(' ') || '—';
    };

    return (
        <div className="user-mgmt-page">
            <Header />
            <main className="user-mgmt-main">
                <h1 className="user-mgmt-title">User Management</h1>
                <p className="user-mgmt-subtitle">Registered users and approval status.</p>

                <div className="user-mgmt-card">
                    {loading && <div className="user-mgmt-loading">Loading users...</div>}
                    {error && <div className="user-mgmt-error">{error}</div>}
                    {!loading && !error && users.length === 0 && (
                        <div className="user-mgmt-empty">No registered users yet.</div>
                    )}
                    {!loading && !error && users.length > 0 && (
                        <div className="user-mgmt-table-wrap">
                            <table className="user-mgmt-table">
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>USERNAME</th>
                                        <th>EMAIL</th>
                                        <th>PHONE</th>
                                        <th>BATCH</th>
                                        <th>PROGRAM</th>
                                        <th>DATE REGISTERED</th>
                                        <th>STATUS</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u.id}>
                                            <td>{fullName(u)}</td>
                                            <td>{u.username}</td>
                                            <td>{u.email || '—'}</td>
                                            <td>{u.phone_number || '—'}</td>
                                            <td>{u.batch || '—'}</td>
                                            <td>{u.program || '—'}</td>
                                            <td>{formatDate(u.date_joined)}</td>
                                            <td>
                                                {/* FIX 3: Updated CSS Class logic */}
                                                <span className={`user-mgmt-status ${u.is_approved ? 'approved' : 'pending'}`}>
                                                    {getStatus(u)}
                                                </span>
                                            </td>
                                            <td>
                                                {/* Only show buttons if they are NOT approved yet */}
                                                {isPending(u) && (
                                                    <span className="user-mgmt-actions">
                                                        <button
                                                            type="button"
                                                            className="user-mgmt-approve-btn"
                                                            onClick={() => handleApprove(u.id)}
                                                            disabled={approvingId === u.id}
                                                        >
                                                            {approvingId === u.id ? 'Approving...' : 'Approve'}
                                                        </button>
                                                        
                                                        {/* Optional: You can keep Reject if you want to be able to "Block" them 
                                                            (requires logic change) or just remove it if False = Pending */}
                                                        <button
                                                            type="button"
                                                            className="user-mgmt-reject-btn"
                                                            onClick={() => handleReject(u.id)}
                                                            disabled={rejectingId === u.id}
                                                        >
                                                            {rejectingId === u.id ? 'Rejecting...' : 'Reject'}
                                                        </button>
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="user-mgmt-back">
                    <Link to="/dashboard" className="user-mgmt-back-link">← Back to Dashboard</Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default UserManagement;