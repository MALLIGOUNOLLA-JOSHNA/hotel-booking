import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHotelById, getRoomsByHotelId, getHotelReviews, addReview, getHotelAverageRating } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { MapPin, CheckCircle, ArrowLeft, Star, MessageSquare } from 'lucide-react';

const HotelDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const [hotel, setHotel] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);

    // Review Form state
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewError, setReviewError] = useState('');

    const loadData = () => {
        const foundHotel = getHotelById(id);
        if (foundHotel) {
            setHotel(foundHotel);
            setRooms(getRoomsByHotelId(id));
            setReviews(getHotelReviews(id).sort((a, b) => new Date(b.date) - new Date(a.date)));
            setAvgRating(getHotelAverageRating(id));
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        setReviewError('');

        if (!user) {
            setReviewError('You must be logged in to leave a review.');
            return;
        }

        if (!comment.trim()) {
            setReviewError('Review comment cannot be empty.');
            return;
        }

        addReview({
            hotelId: id,
            userId: user.id,
            userName: user.name,
            rating: Number(rating),
            comment: comment.trim()
        });

        setRating(5);
        setComment('');
        loadData(); // Refresh reviews and average
    };

    if (!hotel) return <div className="container" style={{ paddingTop: '2rem' }}>Loading hotel details...</div>;

    return (
        <div>
            {/* Back button */}
            <div className="container" style={{ padding: '1rem 1.5rem', position: 'absolute', zIndex: 20 }}>
                <Link to="/" className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', border: 'none', color: 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-pill)' }}>
                    <ArrowLeft size={16} /> Back to Search
                </Link>
            </div>

            {/* Hotel Header Image */}
            <div style={{ width: '100%', height: '500px', position: 'relative' }}>
                <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(transparent, rgba(15,23,42,0.9))' }}></div>
                <div className="container" style={{ position: 'absolute', bottom: '2rem', left: 0, right: 0, color: 'white' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-pill)', marginBottom: '1rem', fontWeight: 600 }}>
                        <Star size={16} fill="white" /> {avgRating > 0 ? avgRating : 'New'}
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.1 }}>{hotel.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', opacity: 0.9, fontSize: '1.1rem' }}>
                        <MapPin size={18} style={{ marginRight: '6px' }} /> {hotel.location}
                    </div>
                </div>
            </div>

            <div className="container" style={{ paddingTop: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '4rem', marginBottom: '4rem' }}>

                    {/* Main Content: Description & Amenities */}
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>About this property</h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '3rem', fontSize: '1.1rem' }}>
                            {hotel.description}
                        </p>

                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Premium Amenities</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            {hotel.amenities.map((amenity, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                                    <CheckCircle size={20} color="var(--primary)" />
                                    <span style={{ fontWeight: 500 }}>{amenity}</span>
                                </div>
                            ))}
                        </div>

                        {/* Ratings & Reviews Section */}
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Guest Reviews</h3>
                                <span className="badge badge-neutral">{reviews.length} reviews</span>
                            </div>

                            {/* Review Form */}
                            <div className="card" style={{ marginBottom: '2rem', padding: '2rem' }}>
                                <h4 style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MessageSquare size={18} /> Write a Review
                                </h4>
                                {!user ? (
                                    <div style={{ color: 'var(--text-muted)' }}>
                                        Please <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>log in</Link> to share your experience.
                                    </div>
                                ) : (
                                    <form onSubmit={handleReviewSubmit}>
                                        {reviewError && <div className="auth-error" style={{ padding: '0.75rem', marginBottom: '1rem' }}>{reviewError}</div>}
                                        <div className="form-group">
                                            <label className="form-label">Rating</label>
                                            <select className="form-input form-select" value={rating} onChange={(e) => setRating(e.target.value)}>
                                                <option value="5">5 - Excellent</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="3">3 - Average</option>
                                                <option value="2">2 - Poor</option>
                                                <option value="1">1 - Terrible</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Your Comment</label>
                                            <textarea className="form-input" rows="3" placeholder="Tell us about your stay..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Post Review</button>
                                    </form>
                                )}
                            </div>

                            {/* Reviews List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {reviews.length === 0 ? (
                                    <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No reviews yet. Be the first to review this hotel!</div>
                                ) : (
                                    reviews.map(review => (
                                        <div key={review.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontWeight: 600 }}>{review.userName}</span>
                                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{new Date(review.date).toLocaleDateString()}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '2px', marginBottom: '0.5rem' }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={14} fill={i < review.rating ? '#f59e0b' : 'none'} color={i < review.rating ? '#f59e0b' : '#cbd5e1'} />
                                                ))}
                                            </div>
                                            <p style={{ color: 'var(--text-main)', lineHeight: 1.6 }}>{review.comment}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Rooms Section */}
                    <div>
                        <div style={{ position: 'sticky', top: '100px' }}>
                            <h2 className="title" style={{ fontSize: '1.5rem' }}>Select a Room</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {rooms.map(room => (
                                    <div key={room.id} className="card-flush" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ height: '180px' }}>
                                            <img src={room.image} alt={room.type} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{room.type}</h3>
                                            <div style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Max Capacity: {room.capacity} guests</div>

                                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div>
                                                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                                                        ${room.pricePerNight}<span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>/night</span>
                                                    </div>
                                                </div>
                                                <Link to={`/room/${room.id}`} className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                                                    Book
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {rooms.length === 0 && (
                                    <div style={{ color: 'var(--text-muted)' }}>No rooms currently available for this hotel.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
