import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/storage';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(getUsers());
    }, []);

    return (
        <div className="container" style={{ padding: '3rem 1.5rem' }}>
            <h1 className="title">Registered Users</h1>
            <p className="subtitle">View all users on the platform.</p>

            <div className="card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--background)' }}>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Name</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Email</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem', fontWeight: 500 }}>{u.name}</td>
                                <td style={{ padding: '1rem' }}>{u.email}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        background: u.role === 'admin' ? '#fee2e2' : '#e0e7ff',
                                        color: u.role === 'admin' ? '#b91c1c' : '#4338ca',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        textTransform: 'uppercase'
                                    }}>
                                        {u.role}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
