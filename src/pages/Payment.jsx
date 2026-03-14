import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { createBooking } from '../services/storage';
import { CreditCard, CheckCircle } from 'lucide-react';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingDetails = location.state?.bookingDetails;

    const [enteredAmount, setEnteredAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // If no state is passed, redirect to home
    if (!bookingDetails) {
        return (
            <div className="container" style={{ marginTop: '3rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--error)' }}>Invalid session. Please restart your booking.</p>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Go Home</Link>
            </div>
        );
    }

    const handlePayment = (e) => {
        e.preventDefault();
        setError('');

        if (parseFloat(enteredAmount) !== bookingDetails.totalAmount) {
            setError(`Amount mismatch! Please enter exactly $${bookingDetails.totalAmount} to confirm.`);
            return;
        }

        // Success -> Create Booking
        createBooking(bookingDetails);
        setSuccess(true);
    };

    if (success) {
        return (
            <div className="auth-page">
                <div className="auth-card" style={{ textAlign: 'center' }}>
                    <CheckCircle size={64} color="var(--success)" style={{ margin: '0 auto 1.5rem auto' }} />
                    <h1 className="title">Booking Confirmed!</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        Your stay at <strong>{bookingDetails.hotelName}</strong> has been successfully booked.
                        We look forward to hosting you!
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/my-bookings" className="btn btn-primary">View My Bookings</Link>
                        <Link to="/" className="btn btn-outline">Back to Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: 'var(--primary)', color: 'white', padding: '2rem', textAlign: 'center' }}>
                    <CreditCard size={40} style={{ margin: '0 auto 1rem auto' }} />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Checkout & Payment</h1>
                </div>

                <div style={{ padding: '2rem' }}>
                    <div style={{ background: 'var(--background)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
                        <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Booking Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Hotel</span>
                            <span style={{ fontWeight: 500 }}>{bookingDetails.hotelName}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Room Type</span>
                            <span style={{ fontWeight: 500 }}>{bookingDetails.roomType}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Dates</span>
                            <span style={{ fontWeight: 500 }}>{bookingDetails.checkIn} to {bookingDetails.checkOut}</span>
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', margin: '1rem 0' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700 }}>
                            <span>Total Amount</span>
                            <span style={{ color: 'var(--primary)' }}>${bookingDetails.totalAmount}</span>
                        </div>
                    </div>

                    <form onSubmit={handlePayment}>
                        {error && <div className="auth-error">{error}</div>}

                        <div className="form-group">
                            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Enter Payment Amount</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>(For dummy check)</span>
                            </label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 600 }}>$</span>
                                <input
                                    type="number"
                                    className="form-input"
                                    style={{ paddingLeft: '2rem' }}
                                    placeholder="0.00"
                                    value={enteredAmount}
                                    onChange={(e) => setEnteredAmount(e.target.value)}
                                />
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                Must exactly match the Total Amount (${bookingDetails.totalAmount}) to simulate a successful payment.
                            </p>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                            Confirm Payment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;
