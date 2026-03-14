import React, { useState, useEffect } from 'react';
import { getHotels, getRooms, getUsers, getBookings, getTotalRevenue, getMostBookedHotel } from '../../services/storage';
import { Building, BedDouble, Users, CalendarCheck, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        hotels: 0,
        rooms: 0,
        users: 0,
        bookings: 0,
        revenue: 0,
        popularHotel: null
    });

    useEffect(() => {
        setStats({
            hotels: getHotels().length,
            rooms: getRooms().length,
            users: getUsers().length,
            bookings: getBookings().length,
            revenue: getTotalRevenue(),
            popularHotel: getMostBookedHotel()
        });
    }, []);

    const StatCard = ({ title, value, icon, link, color }) => (
        <Link to={link} className="card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', transition: 'transform 0.2s', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: `${color}15`, padding: '1rem', borderRadius: 'var(--radius-md)', color: color }}>
                {icon}
            </div>
            <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</p>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{value}</h3>
            </div>
        </Link>
    );

    return (
        <div className="container" style={{ padding: '3rem 1.5rem' }}>
            <h1 className="title">Admin Dashboard</h1>
            <p className="subtitle">Overview of your hotel booking platform</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div className="card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'linear-gradient(135deg, var(--primary) 0%, #3b82f6 100%)', color: 'white' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: 'var(--radius-md)', color: 'white' }}>
                        <DollarSign size={32} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>Total Revenue</p>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>${stats.revenue.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#10B981' }}>
                        <TrendingUp size={32} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Most Booked</p>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                            {stats.popularHotel ? stats.popularHotel.name : 'N/A'}
                        </h3>
                    </div>
                </div>

                <StatCard title="Total Hotels" value={stats.hotels} icon={<Building size={32} />} link="/admin/hotels" color="#4F46E5" />
                <StatCard title="Total Rooms" value={stats.rooms} icon={<BedDouble size={32} />} link="/admin/rooms" color="#10B981" />
                <StatCard title="Registered Users" value={stats.users} icon={<Users size={32} />} link="/admin/users" color="#F59E0B" />
                <StatCard title="Total Bookings" value={stats.bookings} icon={<CalendarCheck size={32} />} link="/admin/bookings" color="#EC4899" />
            </div>

            <div className="card" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Quick Actions</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link to="/admin/hotels" className="btn btn-primary">Manage Hotels</Link>
                    <Link to="/admin/rooms" className="btn btn-primary" style={{ background: 'var(--secondary)' }}>Manage Rooms</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
