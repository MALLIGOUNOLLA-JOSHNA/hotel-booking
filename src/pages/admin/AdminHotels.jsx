import React, { useState, useEffect } from 'react';
import { getHotels, saveHotel, deleteHotel } from '../../services/storage';
import { Edit2, Trash2, Plus } from 'lucide-react';

const AdminHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingHotel, setEditingHotel] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '',
        image: '',
        amenities: '',
        startingPrice: ''
    });

    const loadHotels = () => setHotels(getHotels());

    useEffect(() => {
        loadHotels();
    }, []);

    const handleOpenModal = (hotel = null) => {
        if (hotel) {
            setEditingHotel(hotel);
            setFormData({
                ...hotel,
                amenities: hotel.amenities.join(', ')
            });
        } else {
            setEditingHotel(null);
            setFormData({ name: '', location: '', description: '', image: '', amenities: '', startingPrice: '' });
        }
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this hotel?')) {
            deleteHotel(id);
            loadHotels();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const hotelData = {
            ...formData,
            id: editingHotel ? editingHotel.id : undefined,
            amenities: formData.amenities.split(',').map(i => i.trim()).filter(i => i),
            startingPrice: Number(formData.startingPrice)
        };

        saveHotel(hotelData);
        setShowModal(false);
        loadHotels();
    };

    return (
        <div className="container" style={{ padding: '3rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="title" style={{ marginBottom: '0.5rem' }}>Manage Hotels</h1>
                    <p className="subtitle" style={{ marginBottom: 0 }}>Add, edit, or remove properties.</p>
                </div>
                <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                    <Plus size={18} /> Add Hotel
                </button>
            </div>

            <div className="card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--background)' }}>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Hotel Name</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Location</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Starting Price</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map(hotel => (
                            <tr key={hotel.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={hotel.image} alt="hotel" style={{ width: '50px', height: '50px', borderRadius: '0.25rem', objectFit: 'cover' }} />
                                    <span style={{ fontWeight: 500 }}>{hotel.name}</span>
                                </td>
                                <td style={{ padding: '1rem' }}>{hotel.location}</td>
                                <td style={{ padding: '1rem' }}>${hotel.startingPrice}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => handleOpenModal(hotel)} className="btn btn-outline" style={{ padding: '0.4rem', border: 'none', color: 'var(--primary)' }}><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(hotel.id)} className="btn btn-outline" style={{ padding: '0.4rem', border: 'none', color: 'var(--error)' }}><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {hotels.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hotels found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
                    <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>{editingHotel ? 'Edit Hotel' : 'Add New Hotel'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Hotel Name</label>
                                <input required type="text" className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Location</label>
                                <input required type="text" className="form-input" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Image URL</label>
                                <input required type="text" className="form-input" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea required className="form-input" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Amenities (comma separated)</label>
                                <input required type="text" className="form-input" value={formData.amenities} onChange={e => setFormData({ ...formData, amenities: e.target.value })} placeholder="e.g. Free WiFi, Pool, Gym" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Starting Price ($)</label>
                                <input required type="number" className="form-input" value={formData.startingPrice} onChange={e => setFormData({ ...formData, startingPrice: e.target.value })} />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">{editingHotel ? 'Update Hotel' : 'Add Hotel'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminHotels;
