import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRoomById, getHotelById, checkRoomAvailability } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Calendar, Users, AlertCircle } from 'lucide-react';

const RoomDetails = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [room, setRoom] = useState(null);
    const [hotel, setHotel] = useState(null);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const foundRoom = getRoomById(roomId);
        if (foundRoom) {
            setRoom(foundRoom);
            setHotel(getHotelById(foundRoom.hotelId));
        }
    }, [roomId]);

    const calculateNightsAndTotal = () => {
        if (!checkIn || !checkOut) return { nights: 0, total: 0 };

        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = end - start;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) return { nights: 0, total: 0 };
        return { nights: diffDays, total: diffDays * room?.pricePerNight };
    };

    const handleBooking = () => {
        setError('');

        if (!user) {
            navigate('/login');
            return;
        }

        const { nights, total } = calculateNightsAndTotal();

        if (!checkIn || !checkOut) {
            setError('Please select check-in and check-out dates.');
            return;
        }
        if (nights <= 0) {
            setError('Check-out date must be at least 1 day after check-in date.');
            return;
        }

        // Step 2: Validate Date Overlap using the new Booking Logic Enhancement
        const isAvailable = checkRoomAvailability(room.id, checkIn, checkOut);
        if (!isAvailable) {
            setError('This room is already booked for the selected dates. Please choose different dates.');
            return;
        }

        const bookingDetails = {
            userId: user.id,
            roomId: room.id,
            hotelId: hotel.id,
            hotelName: hotel.name,
            roomType: room.type,
            checkIn,
            checkOut,
            nights,
            totalAmount: total,
            image: room.image
        };

        navigate('/payment', { state: { bookingDetails } });
    };

    if (!room || !hotel) return <div className="container" style={{ paddingTop: '2rem' }}>Loading room...</div>;

    const { nights, total } = calculateNightsAndTotal();
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1100px' }}>
            <Link to={`/hotel/${hotel.id}`} style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontWeight: 500 }}>
                <ArrowLeft size={16} style={{ marginRight: '0.5rem' }} /> Back to {hotel.name}
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
                {/* Left Column: Room Info */}
                <div>
                    <img src={room.image} alt={room.type} style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: 'var(--radius-xl)', marginBottom: '2rem', boxShadow: 'var(--shadow-lg)' }} />
                    <h1 className="title" style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>{room.type}</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>{hotel.name} • {hotel.location}</p>

                    <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', fontWeight: 500 }}>
                            <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '50%' }}>
                                <Users size={20} color="var(--primary)" />
                            </div>
                            Up to {room.capacity} guests
                        </div>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
                        ${room.pricePerNight} <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 500, paddingBottom: '0.3rem' }}>/ night</span>
                    </div>
                </div>

                {/* Right Column: Booking Form */}
                <div>
                    <div className="card" style={{ padding: '2.5rem', position: 'sticky', top: '100px' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>Reservation Details</h2>

                        {error && (
                            <div className="auth-error" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', textAlign: 'left', padding: '1rem', marginBottom: '2rem' }}>
                                <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={18} /> Check-in Date
                            </label>
                            <input
                                type="date"
                                className="form-input"
                                value={checkIn}
                                min={today}
                                onChange={(e) => setCheckIn(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={18} /> Check-out Date
                            </label>
                            <input
                                type="date"
                                className="form-input"
                                value={checkOut}
                                min={checkIn || today}
                                onChange={(e) => setCheckOut(e.target.value)}
                            />
                        </div>

                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-md)', margin: '2rem 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
                                <span>${room.pricePerNight} x {nights} nights</span>
                                <span style={{ color: 'var(--text-main)' }}>${total}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
                                <span>Taxes & Fees</span>
                                <span style={{ color: 'var(--text-main)' }}>$0</span>
                            </div>
                            <div style={{ borderTop: '1px solid #e2e8f0', margin: '1rem 0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        </div>

                        <button onClick={handleBooking} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                            Reserve
                        </button>
                        {!user && (
                            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                You will be redirected to log in to complete the booking.
                            </p>
                        )}
                        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            You won't be charged yet.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;
