import React, { useState, useEffect } from 'react';
import { getHotels, getUserWishlist, toggleWishlist, getHotelAverageRating } from '../services/storage';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Heart, Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [hotels, setHotels] = useState([]);
    const [wishlistIds, setWishlistIds] = useState(new Set());

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    // Derived filter options
    const [allLocations, setAllLocations] = useState([]);

    useEffect(() => {
        const fetchedHotels = getHotels();
        setHotels(fetchedHotels);

        const locs = [...new Set(fetchedHotels.map(h => h.location))];
        setAllLocations(locs);

        if (user) {
            const wList = getUserWishlist(user.id);
            setWishlistIds(new Set(wList.map(w => w.hotelId)));
        }
    }, [user]);

    const handleWishlistToggle = (e, hotelId) => {
        e.preventDefault(); // Prevent triggering Link
        if (!user) {
            navigate('/login');
            return;
        }
        const isAdded = toggleWishlist(user.id, hotelId);

        setWishlistIds(prev => {
            const newSet = new Set(prev);
            if (isAdded) newSet.add(hotelId);
            else newSet.delete(hotelId);
            return newSet;
        });
    };

    const filteredHotels = hotels.filter(hotel => {
        const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLocation = locationFilter ? hotel.location === locationFilter : true;

        let matchesPrice = true;
        if (priceRange) {
            const price = Number(hotel.startingPrice);
            if (priceRange === 'under2000' && price >= 2000) matchesPrice = false;
            if (priceRange === '2500-500' && (price < 2500 || price > 5000)) matchesPrice = false;
            if (priceRange === 'over5000' && price <= 5000) matchesPrice = false;
        }

        return matchesSearch && matchesLocation && matchesPrice;
    });

    return (
        <div>
            {/* Hero Section */}
            <section className="hero" style={{
                background: 'linear-gradient(rgba(7, 156, 197, 0.6), rgba(15, 23, 42, 0.8)), url(https://images.unsplash.com/photo-1542314831-c6a4d14d8373?auto=format&fit=crop&q=80&w=1200) center/cover',
                color: 'white',
                padding: '6rem 1rem 8rem 1rem',
                textAlign: 'center',
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Find Your Premium Stay</h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                        Discover luxury hotels, breathtaking views, and unforgettable curated experiences globally.
                    </p>
                </div>
            </section>

            <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
                {/* Filter Bar */}
                <div className="filter-bar">
                    <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border)' }}>
                        <Search size={20} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
                        <input
                            type="text"
                            placeholder="Search hotels by name..."
                            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '1rem', color: 'var(--text-main)' }}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Filter size={20} color="var(--text-muted)" />
                        <select className="form-input form-select" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-pill)' }} value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
                            <option value="">All Locations</option>
                            {allLocations.map((loc, idx) => <option key={idx} value={loc}>{loc}</option>)}
                        </select>
                    </div>

                    <div style={{ flex: '1 1 200px' }}>
                        <select className="form-input form-select" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-pill)' }} value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                            <option value="">Any Price RIGHT NOW</option>
                            <option value="under200">Under 2000</option>
                            <option value="200-500">2500 - 5000</option>
                            <option value="over500">Over 5000</option>
                        </select>
                    </div>
                </div>

                {/* Hotel Listings */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 className="title" style={{ margin: 0 }}>Featured Properties</h2>
                    <span style={{ color: 'var(--text-muted)' }}>Showing {filteredHotels.length} results</span>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    {filteredHotels.map(hotel => {
                        const isWished = wishlistIds.has(hotel.id);
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
                                        onClick={(e) => handleWishlistToggle(e, hotel.id)}
                                        style={{ position: 'absolute', top: '1rem', right: '1rem', color: isWished ? 'var(--error)' : 'var(--text-muted)' }}
                                    >
                                        <Heart size={20} fill={isWished ? 'currentColor' : 'none'} />
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
                    {filteredHotels.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'inline-block', background: '#f1f5f9', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
                                <Search size={32} color="var(--text-muted)" />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>No properties found</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
