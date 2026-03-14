import React, { useState, useEffect } from 'react';
import { getRooms, getHotels, saveRoom, deleteRoom } from '../../services/storage';
import { Edit2, Trash2, Plus } from 'lucide-react';

const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        hotelId: '',
        type: '',
        pricePerNight: '',
        capacity: '',
        image: ''
    });

    const loadData = () => {
        setRooms(getRooms());
        setHotels(getHotels());
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleOpenModal = (room = null) => {
        if (room) {
            setEditingRoom(room);
            setFormData({ ...room });
        } else {
            setEditingRoom(null);
            setFormData({ hotelId: hotels[0]?.id || '', type: '', pricePerNight: '', capacity: '', image: '' });
        }
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            deleteRoom(id);
            loadData();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const roomData = {
            ...formData,
            id: editingRoom ? editingRoom.id : undefined,
            pricePerNight: Number(formData.pricePerNight),
            capacity: Number(formData.capacity)
        };

        saveRoom(roomData);
        setShowModal(false);
        loadData();
    };

    const getHotelName = (hotelId) => {
        const hotel = hotels.find(h => h.id === hotelId);
        return hotel ? hotel.name : 'Unknown Hotel';
    };

    return (
        <div className="container" style={{ padding: '3rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 className="title" style={{ marginBottom: '0.5rem' }}>Manage Rooms</h1>
                    <p className="subtitle" style={{ marginBottom: 0 }}>Add, edit, or remove rooms.</p>
                </div>
                <button className="btn btn-primary" onClick={() => handleOpenModal()} disabled={hotels.length === 0}>
                    <Plus size={18} /> Add Room
                </button>
            </div>

            {hotels.length === 0 && (
                <div className="auth-error">You must add a Hotel first before adding any rooms.</div>
            )}

            <div className="card" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--background)' }}>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Room Type</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Hotel</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Capacity</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Price/Night</th>
                            <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map(room => (
                            <tr key={room.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={room.image} alt="room" style={{ width: '50px', height: '50px', borderRadius: '0.25rem', objectFit: 'cover' }} />
                                    <span style={{ fontWeight: 500 }}>{room.type}</span>
                                </td>
                                <td style={{ padding: '1rem' }}>{getHotelName(room.hotelId)}</td>
                                <td style={{ padding: '1rem' }}>{room.capacity} Guests</td>
                                <td style={{ padding: '1rem' }}>${room.pricePerNight}</td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => handleOpenModal(room)} className="btn btn-outline" style={{ padding: '0.4rem', border: 'none', color: 'var(--primary)' }}><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(room.id)} className="btn btn-outline" style={{ padding: '0.4rem', border: 'none', color: 'var(--error)' }}><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {rooms.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No rooms found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Select Hotel</label>
                                <select required className="form-input" value={formData.hotelId} onChange={e => setFormData({ ...formData, hotelId: e.target.value })}>
                                    <option value="" disabled>Select a Hotel...</option>
                                    {hotels.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Room Type</label>
                                <input required type="text" className="form-input" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} placeholder="e.g. Deluxe Suite" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Image URL</label>
                                <input required type="text" className="form-input" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label className="form-label">Price/Night ($)</label>
                                    <input required type="number" className="form-input" value={formData.pricePerNight} onChange={e => setFormData({ ...formData, pricePerNight: e.target.value })} />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label className="form-label">Capacity (Guests)</label>
                                    <input required type="number" className="form-input" value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
                                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">{editingRoom ? 'Update Room' : 'Add Room'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRooms;
