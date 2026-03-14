import React, { useState, useEffect } from 'react';
import { getHotels, getUserWishlist, toggleWishlist, getHotelAverageRating } from '../services/storage';
import { Link } from 'react-router-dom';
import { MapPin, Star, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MyWishlist = () => {
    const { user } = useAuth();
    const [wishlistedHotels, setWishlistedHotels] = useState([]);

    const loadWishlist = () => {
        if (!user) return;
        const allHotels = getHotels();
        const wishlistEntries = getUserWishlist(user.id);
        const wishedIds = new Set(wishlistEntries.map(w => w.hotelId));

        setWishlistedHotels(allHotels.filter(h => wishedIds.has(h.id)));
    };

    useEffect(() => {
        loadWishlist();
    }, [user]);

    const handleRemove = (e, hotelId) => {
        e.preventDefault();
        toggleWishlist(user.id, hotelId);
        loadWishlist(); // Refresh list immediately
    };

    return (
        <div className="container" style={{ padding: '3rem 1.5rem' }}>
            <h1 className="title">My Wishlist</h1>
            <p className="subtitle" style={{ marginBottom: '3rem' }}>Your curated list of premium stays.</p>

            {wishlistedHotels.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <Heart size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Your wishlist is empty</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Explore properties and tap the heart icon to save them here.</p>
                    <Link to="/" className="btn btn-primary">Browse Hotels</Link>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    {wishlistedHotels.map(hotel => {
                        const avgRating = getHotelAverageRating(hotel.id) || "New";

                        return (
                            <Link to={`/hotel/${hotel.id}`} key={hotel.id} className="card-flush" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div style={{ height: '240px', position: 'relative' }}>
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <button
                                        className="icon-action"
                                        onClick={(e) => handleRemove(e, hotel.id)}
                                        style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--error)' }}
                                        title="Remove from wishlist"
                                    >
                                        <Heart size={20} fill="currentColor" />
                                    </button>
                                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 600, boxShadow: 'var(--shadow-sm)' }}>
                                        <Star size={14} fill="#f59e0b" color="#f59e0b" /> {avgRating}
                                    </div>
                                </div>

                                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 500 }}>
                                        <MapPin size={14} style={{ marginRight: '4px' }} /> {hotel.location}
                                    </div>

                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.2 }}>{hotel.name}</h3>

                                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                        <div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Starting from</span>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                                                ${hotel.startingPrice}<span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>/night</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default MyWishlist;
