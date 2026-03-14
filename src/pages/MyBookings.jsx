import React, { useState, useEffect } from 'react';
import { getUserBookings, updateBookingStatus } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    const loadBookings = () => {
        if (user) {
            // Sort most recent bookings to the top
            setBookings(getUserBookings(user.id).sort((a, b) => new Date(b.date) - new Date(a.date)));
        }
    };

    useEffect(() => {
        loadBookings();
    }, [user]);

    const handleCancelBooking = (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
            updateBookingStatus(bookingId, 'Cancelled');
            loadBookings();
        }
    };

    const getStatusBadge = (status) => {
        if (status === 'Cancelled') {
            return (
                <span className="badge badge-error" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#fee2e2', color: '#b91c1c' }}>
                    <XCircle size={14} /> Cancelled
                </span>
            );
        }
        if (status === 'Completed') {
            return (
                <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#e0e7ff', color: '#4338ca' }}>
                    <CheckCircle size={14} /> Completed
                </span>
            );
        }
        // Confirmed
        return (
            <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#d1fae5', color: '#059669' }}>
                <Clock size={14} /> Confirmed
            </span>
        );
    };

    return (
        <div className="container" style={{ padding: '3rem 1.5rem' }}>
            <h1 className="title">My Bookings</h1>
            <p className="subtitle" style={{ marginBottom: '3rem' }}>View your upcoming and past reservations</p>

            {bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <Calendar size={48} color="var(--text-muted)" style={{ margin: '0 auto 1.5rem auto', opacity: 0.5 }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>No bookings found</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You haven't made any reservations yet.</p>
                    <Link to="/" className="btn btn-primary">Start Exploring</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {bookings.map(booking => {
                        const isCancelable = booking.status === 'Confirmed';

                        return (
                            <div key={booking.id} className="card-flush" style={{ display: 'flex', flexDirection: 'row', border: '1px solid var(--border)' }}>
                                <div style={{ width: '220px', background: 'var(--border)' }}>
                                    {booking.image ? (
                                        <img src={booking.image} alt={booking.hotelName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Img</div>
                                    )}
                                </div>
                                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>{booking.hotelName}</h3>
                                        {getStatusBadge(booking.status)}
                                    </div>

                                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 500 }}>{booking.roomType}</p>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem', background: 'var(--background)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                                        <div>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Check-in</span>
                                            <span style={{ fontWeight: 600 }}>{booking.checkIn}</span>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Check-out</span>
                                            <span style={{ fontWeight: 600 }}>{booking.checkOut}</span>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginRight: '1rem' }}>{booking.nights} nights</span>
                                            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>${booking.totalAmount}</span>
                                        </div>

                                        {isCancelable && (
                                            <button
                                                onClick={() => handleCancelBooking(booking.id)}
                                                className="btn btn-danger"
                                                style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', gap: '0.25rem' }}
                                            >
                                                <XCircle size={16} /> Cancel Booking
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
