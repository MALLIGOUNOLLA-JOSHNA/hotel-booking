import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authenticateUser } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { LogIn, ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const user = authenticateUser(email, password);
        if (user && user.role === 'admin') {
            login(user);
            navigate('/admin');
        } else {
            setError('Invalid admin credentials or unauthorized access');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card" style={{ borderTop: '4px solid var(--error)' }}>
                <div className="auth-header">
                    <div className="flex justify-center mb-4 text-primary" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--error)' }}>
                        <ShieldAlert size={48} />
                    </div>
                    <h1 className="auth-title">Admin Portal</h1>
                    <p className="subtitle">Secure login for staff members</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Admin Email</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="admin@booking.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', background: 'var(--text-main)', boxShadow: 'none' }}>
                        Access Dashboard
                    </button>
                </form>

                <div className="auth-footer" style={{ marginTop: '2rem' }}>
                    <Link to="/login" className="auth-link" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Back to User Login</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
