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
                    prev.map((u) => (u.id === userId ? { ...u, is_active: true } : u))
                );
            })
            .catch(() => {})
            .finally(() => setApprovingId(null));
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        try {
            const d = new Date(dateStr);
            return d.toLocaleString('en-US', {
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
                                                <span className={u.is_active ? 'user-mgmt-status approved' : 'user-mgmt-status pending'}>
                                                    {u.is_active ? 'Approved' : 'Pending'}
                                                </span>
                                            </td>
                                            <td>
                                                {!u.is_active && (
                                                    <button
                                                        type="button"
                                                        className="user-mgmt-approve-btn"
                                                        onClick={() => handleApprove(u.id)}
                                                        disabled={approvingId === u.id}
                                                    >
                                                        {approvingId === u.id ? 'Approving...' : 'Approve'}
                                                    </button>
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
