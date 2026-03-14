import React, { useState, useEffect } from 'react';
import { getBookings } from '../../services/storage';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Sort so most recent bookings are at the top
        const allBookings = getBookings().sort((a, b) => new Date(b.date) - new Date(a.date));
        setBookings(allBookings);
    }, []);

    return (
        <div className="container" style={{ padding: '3rem 1.5rem' }}>
            <h1 className="title">All Bookings</h1>
            <p className="subtitle">View all platform reservations.</p>

            <div className="card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--background)' }}>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Booking ID</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Hotel / Room</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Check-In / Out</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Amount</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(b => (
                            <tr key={b.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem', fontSize: '0.85rem', fontFamily: 'monospace' }}>{b.id}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: 600 }}>{b.hotelName}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{b.roomType}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div>In: {b.checkIn}</div>
                                    <div>Out: {b.checkOut}</div>
                                </td>
                                <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--primary)' }}>${b.totalAmount}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        background: '#d1fae5',
                                        color: '#059669',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        fontSize: '0.85rem',
                                        fontWeight: 600
                                    }}>
                                        {b.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No bookings found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBookings;
