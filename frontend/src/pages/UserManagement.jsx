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
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({
        username: '', first_name: '', middle_name: '', last_name: '',
        email: '', phone_number: '', batch: '', program: '', is_superuser: false, is_staff: false,
    });
    const [editError, setEditError] = useState(null);
    const [savingEdit, setSavingEdit] = useState(false);

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

    const openEdit = (u) => {
        setEditingUser(u.id);
        setEditForm({
            username: u.username || '',
            first_name: u.first_name || '',
            middle_name: u.middle_name || '',
            last_name: u.last_name || '',
            email: u.email || '',
            phone_number: u.phone_number || '',
            batch: u.batch || '',
            program: u.program || '',
            is_superuser: !!u.is_superuser,
            is_staff: !!u.is_staff,
        });
        setEditError(null);
    };

    const closeEdit = () => {
        setEditingUser(null);
        setEditError(null);
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleEditSave = () => {
        if (!editingUser) return;
        setEditError(null);
        setSavingEdit(true);
        const payload = {
            username: editForm.username,
            first_name: editForm.first_name,
            middle_name: editForm.middle_name || null,
            last_name: editForm.last_name,
            email: editForm.email,
            phone_number: editForm.phone_number,
            batch: editForm.batch,
            program: editForm.program,
            is_superuser: editForm.is_superuser,
            is_staff: editForm.is_superuser, // keep in sync: admin = both
        };
        api.patch(`/api/users/${editingUser}/`, payload)
            .then((res) => {
                setUsers((prev) =>
                    prev.map((u) => (u.id === editingUser ? { ...u, ...res.data } : u))
                );
                closeEdit();
            })
            .catch((err) => {
                const data = err.response?.data;
                setEditError(
                    data && typeof data === 'object'
                        ? (data.detail || Object.values(data).flat().join(' '))
                        : 'Failed to save.'
                );
            })
            .finally(() => setSavingEdit(false));
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
                                                {/* FIX 3: Updated CSS Class logic */}
                                                <span className={`user-mgmt-status ${u.is_approved ? 'approved' : 'pending'}`}>
                                                    {getStatus(u)}
                                                </span>
                                            </td>
                                            <td>
                                                {isPending(u) ? (
                                                    <span className="user-mgmt-actions">
                                                        <button
                                                            type="button"
                                                            className="user-mgmt-approve-btn"
                                                            onClick={() => handleApprove(u.id)}
                                                            disabled={approvingId === u.id}
                                                        >
                                                            {approvingId === u.id ? 'Approving...' : 'Approve'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="user-mgmt-reject-btn"
                                                            onClick={() => handleReject(u.id)}
                                                            disabled={rejectingId === u.id}
                                                        >
                                                            {rejectingId === u.id ? 'Rejecting...' : 'Reject'}
                                                        </button>
                                                    </span>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="user-mgmt-edit-btn"
                                                        onClick={() => openEdit(u)}
                                                    >
                                                        Edit
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

                {editingUser != null && (
                    <div className="user-mgmt-modal-overlay" onClick={closeEdit}>
                        <div className="user-mgmt-modal" onClick={(e) => e.stopPropagation()}>
                            <h2 className="user-mgmt-modal-title">Edit User</h2>
                            {editError && <div className="user-mgmt-modal-error">{editError}</div>}
                            <div className="user-mgmt-modal-form">
                                <div className="user-mgmt-modal-row">
                                    <div className="user-mgmt-modal-field">
                                        <label>First Name *</label>
                                        <input name="first_name" value={editForm.first_name} onChange={handleEditChange} />
                                    </div>
                                    <div className="user-mgmt-modal-field">
                                        <label>Middle Name</label>
                                        <input name="middle_name" value={editForm.middle_name} onChange={handleEditChange} />
                                    </div>
                                    <div className="user-mgmt-modal-field">
                                        <label>Last Name *</label>
                                        <input name="last_name" value={editForm.last_name} onChange={handleEditChange} />
                                    </div>
                                </div>
                                <div className="user-mgmt-modal-field">
                                    <label>Username *</label>
                                    <input name="username" value={editForm.username} onChange={handleEditChange} />
                                </div>
                                <div className="user-mgmt-modal-field">
                                    <label>Email *</label>
                                    <input type="email" name="email" value={editForm.email} onChange={handleEditChange} />
                                </div>
                                <div className="user-mgmt-modal-field">
                                    <label>Phone Number</label>
                                    <input name="phone_number" value={editForm.phone_number} onChange={handleEditChange} />
                                </div>
                                <div className="user-mgmt-modal-row">
                                    <div className="user-mgmt-modal-field">
                                        <label>Batch</label>
                                        <input name="batch" value={editForm.batch} onChange={handleEditChange} placeholder="e.g. 2020" />
                                    </div>
                                    <div className="user-mgmt-modal-field">
                                        <label>Program</label>
                                        <select name="program" value={editForm.program} onChange={handleEditChange}>
                                            <option value="">Select</option>
                                            <option value="CS">Computer Science</option>
                                            <option value="IT">Information Technology</option>
                                            <option value="IS">Information Systems</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="user-mgmt-modal-field user-mgmt-modal-checkbox">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="is_superuser"
                                            checked={editForm.is_superuser}
                                            onChange={handleEditChange}
                                        />
                                        <span>Admin (superuser)</span>
                                    </label>
                                </div>
                            </div>
                            <div className="user-mgmt-modal-actions">
                                <button type="button" className="user-mgmt-modal-cancel" onClick={closeEdit}>Cancel</button>
                                <button type="button" className="user-mgmt-modal-save" onClick={handleEditSave} disabled={savingEdit}>
                                    {savingEdit ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default UserManagement;