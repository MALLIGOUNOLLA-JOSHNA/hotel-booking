import React from 'react';
import { ShieldCheck, CalendarCheck, Settings, Heart, Star, LayoutDashboard } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: ShieldCheck,
            title: 'Role-Based Authentication',
            description: 'Secure access tailored for both users and administrators.'
        },
        {
            icon: CalendarCheck,
            title: 'Smart Booking Validation',
            description: 'Intelligent conflict resolution to prevent double bookings.'
        },
        {
            icon: Heart,
            title: 'Wishlist System',
            description: 'Easily save and manage your favorite stays for future trips.'
        },
        {
            icon: Star,
            title: 'Reviews & Ratings',
            description: 'Transparent community feedback to help you choose the best.'
        },
        {
            icon: LayoutDashboard,
            title: 'Admin Analytics Dashboard',
            description: 'Comprehensive tools for management to monitor and grow the platform.'
        }
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="hero" style={{
                background: 'linear-gradient(rgba(13, 104, 224, 0.7), rgba(15, 23, 42, 0.8)), url(https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200) center/cover',
                color: 'white',
                padding: '6rem 1rem 8rem 1rem',
                textAlign: 'center',
                marginBottom: '4rem',
                borderRadius: '0 0 var(--radius-xl) var(--radius-xl)'
            }}>
                <div className="container">
                    <h1 className="title" style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1rem' }}>LuxeStay</h1>
                    <p className="subtitle" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
                        Book Smart. Stay Comfortable.
                    </p>
                </div>
            </section>

            <div className="container" style={{ paddingBottom: '4rem' }}>
                {/* About Description */}
                <section style={{ marginBottom: '5rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem' }}>
                    <h2 className="title" style={{ marginBottom: '1.5rem' }}>About Our Platform</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                        LuxeStay is designed to provide a seamless and premium hotel booking experience.
                        We prioritize <strong>easy booking process</strong> combined with <strong>secure authentication</strong> to ensure your data is always safe.
                        Our platform features robust <strong>admin management</strong> tools, all wrapped in a beautifully <strong>responsive design</strong> that works flawlessly across all your devices.
                    </p>
                </section>

                {/* Features Section */}
                <section style={{ marginBottom: '5rem' }}>
                    <h2 className="title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Feature Highlights</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {features.map((feature, index) => (
                            <div key={index} className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    background: 'rgba(13, 104, 224, 0.1)',
                                    color: 'var(--primary)',
                                    marginBottom: '1.5rem'
                                }}>
                                    <feature.icon size={32} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mission / Vision Section */}
                <section className="card" style={{
                    background: 'linear-gradient(135deg, var(--surface) 0%, rgba(13, 104, 224, 0.05) 100%)',
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    borderRadius: 'var(--radius-xl)'
                }}>
                    <h2 className="title" style={{ marginBottom: '1.5rem' }}>Our Mission</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
                        Our goal is to revolutionize the way you travel by combining user convenience with a modern booking experience.
                        We strive to connect travelers with their ideal accommodations effortlessly, making every journey memorable from the very first click.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default About;
