import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation (basic HTML5 validation is also used on inputs)
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Store in localStorage
        const existingMessages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        const newMessage = {
            ...formData,
            id: Date.now(),
            date: new Date().toISOString()
        };

        localStorage.setItem('contactMessages', JSON.stringify([...existingMessages, newMessage]));

        setIsSubmitted(true);
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
            setIsSubmitted(false);
        }, 5000);
    };

    return (
        <div className="contact-page container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="title">Contact Us</h1>
                <p className="subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Have a question or need assistance with your booking? We're here to help. Reach out to our team!
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
                alignItems: 'start'
            }}>

                {/* Contact Information */}
                <div>
                    <h2 className="title" style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Get in Touch</h2>

                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    background: 'rgba(13, 104, 224, 0.1)',
                                    color: 'var(--primary)',
                                    padding: '0.75rem',
                                    borderRadius: '50%'
                                }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.2rem' }}>Email</p>
                                    <p style={{ color: 'var(--text-muted)' }}>support@luxestay.com</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    background: 'rgba(13, 104, 224, 0.1)',
                                    color: 'var(--primary)',
                                    padding: '0.75rem',
                                    borderRadius: '50%'
                                }}>
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.2rem' }}>Phone</p>
                                    <p style={{ color: 'var(--text-muted)' }}>+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    background: 'rgba(13, 104, 224, 0.1)',
                                    color: 'var(--primary)',
                                    padding: '0.75rem',
                                    borderRadius: '50%'
                                }}>
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p style={{ fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.2rem' }}>Office</p>
                                    <p style={{ color: 'var(--text-muted)' }}>123 Luxury Ave, Suite 100<br />San Francisco, CA 94107</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="#" className="icon-action" style={{ color: 'var(--text-muted)' }}><Facebook size={20} /></a>
                        <a href="#" className="icon-action" style={{ color: 'var(--text-muted)' }}><Twitter size={20} /></a>
                        <a href="#" className="icon-action" style={{ color: 'var(--text-muted)' }}><Instagram size={20} /></a>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card" style={{ padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '2rem' }}>Send us a Message</h3>

                    {isSubmitted ? (
                        <div style={{
                            background: '#d1fae5',
                            color: '#059669',
                            padding: '2rem',
                            borderRadius: 'var(--radius-lg)',
                            textAlign: 'center',
                            border: '1px solid #10b981'
                        }}>
                            <CheckCircle2 size={48} style={{ margin: '0 auto 1rem' }} />
                            <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Message Sent!</h4>
                            <p>Thank you for reaching out. Our team will get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-input"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="form-input"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-input"
                                    placeholder="Type your message here..."
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    style={{ resize: 'vertical', minHeight: '120px' }}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                <Send size={18} /> Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
