import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BuildingIcon, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to={isAdmin ? '/admin' : '/'} className="brand">
                    <BuildingIcon size={28} />
                    LuxeStay
                </Link>

                <div className="nav-actions">
                    {user ? (
                        <>
                            {isAdmin ? (
                                <>
                                    <Link to="/admin" className="nav-item">Dashboard</Link>
                                    <Link to="/admin/hotels" className="nav-item">Hotels</Link>
                                    <Link to="/admin/bookings" className="nav-item">Bookings</Link>
                                    <Link to="/about" className="nav-item">About</Link>
                                    <Link to="/contact" className="nav-item">Contact</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/" className="nav-item">Home</Link>
                                    <Link to="/my-bookings" className="nav-item">My Bookings</Link>
                                    <Link to="/about" className="nav-item">About</Link>
                                    <Link to="/contact" className="nav-item">Contact</Link>
                                </>
                            )}

                            <div className="nav-item flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '1rem', borderLeft: '1px solid var(--border)', paddingLeft: '1rem' }}>
                                <User size={20} />
                                <span className="font-medium text-sm">{user.name}</span>
                                <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', marginLeft: '0.5rem', fontSize: '0.85rem' }}>
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="nav-item" style={{ marginRight: '1rem' }}>Home</Link>
                            <Link to="/about" className="nav-item" style={{ marginRight: '1rem' }}>About</Link>
                            <Link to="/contact" className="nav-item" style={{ marginRight: '1rem' }}>Contact</Link>
                            <Link to="/login" className="btn btn-outline">Log in</Link>
                            <Link to="/signup" className="btn btn-primary">Sign up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
