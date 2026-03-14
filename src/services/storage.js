// Default Mock Data
const DUMMY_HOTELS = [
    {
        id: 'h1',
        name: 'Grand Horizon Resort',
        location: 'Malibu, California',
        description: 'Experience luxury on the cliffs of Malibu. Enjoy panoramic ocean views, world-class dining, and a serene spa.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
        amenities: ['Free WiFi', 'Pool', 'Spa', 'Ocean View', 'Restaurant'],
        startingPrice: 350
    },
    {
        id: 'h2',
        name: 'Urban Oasis Hotel',
        location: 'New York City, NY',
        description: 'A modern retreat in the heart of the city. Perfect for business and leisure travelers alike.',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c0d5bf8f?auto=format&fit=crop&q=80&w=800',
        amenities: ['Gym', 'Free Breakfast', 'Conference Room', 'City View'],
        startingPrice: 200
    },
    {
        id: 'h3',
        name: ' Alpine Lodge',
        location: 'Aspen, Colorado',
        description: 'Cozy up in our beautiful mountain lodge. Direct ski-in/ski-out access and a warm fireplace wait for you.',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800',
        amenities: ['Ski Access', 'Fireplace', 'Hot Tub', 'Pet Friendly'],
        startingPrice: 280
    }
];

const DUMMY_ROOMS = [
    { id: 'r1', hotelId: 'h1', type: 'Deluxe Ocean View', pricePerNight: 350, capacity: 2, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800' },
    { id: 'r2', hotelId: 'h1', type: 'Presidential Suite', pricePerNight: 800, capacity: 4, image: 'https://images.unsplash.com/photo-1582719478250-c89dd1432824?auto=format&fit=crop&q=80&w=800' },
    { id: 'r3', hotelId: 'h2', type: 'Standard City Room', pricePerNight: 200, capacity: 2, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800' },
    { id: 'r4', hotelId: 'h3', type: 'Mountain Chalet', pricePerNight: 280, capacity: 6, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800' }
];

const DUMMY_USERS = [
    { id: 'u1', name: 'Admin User', email: 'admin@booking.com', password: 'password123', role: 'admin' },
    { id: 'u2', name: 'John Doe', email: 'user@booking.com', password: 'password123', role: 'user' }
];

// Initialize LocalStorage Data if empty
export const initDummyData = () => {
    if (!localStorage.getItem('hotels')) {
        localStorage.setItem('hotels', JSON.stringify(DUMMY_HOTELS));
    }
    if (!localStorage.getItem('rooms')) {
        localStorage.setItem('rooms', JSON.stringify(DUMMY_ROOMS));
    }
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(DUMMY_USERS));
    }
    if (!localStorage.getItem('bookings')) {
        localStorage.setItem('bookings', JSON.stringify([]));
    }
    if (!localStorage.getItem('wishlist')) {
        localStorage.setItem('wishlist', JSON.stringify([]));
    }
    if (!localStorage.getItem('reviews')) {
        localStorage.setItem('reviews', JSON.stringify([]));
    }
};

// --- AUTHENTICATION & USERS ---
export const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
export const authenticateUser = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
};
export const registerUser = (name, email, password) => {
    const users = getUsers();
    if (users.some(u => u.email === email)) return { error: 'Email already exists' };

    const newUser = { id: `u_${Date.now()}`, name, email, password, role: 'user' };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword };
};

// --- HOTELS ---
export const getHotels = () => JSON.parse(localStorage.getItem('hotels')) || [];
export const getHotelById = (id) => getHotels().find(h => h.id === id);
export const saveHotel = (hotelData) => {
    const hotels = getHotels();
    if (hotelData.id) {
        const index = hotels.findIndex(h => h.id === hotelData.id);
        if (index !== -1) hotels[index] = hotelData;
    } else {
        hotelData.id = `h_${Date.now()}`;
        hotels.push(hotelData);
    }
    localStorage.setItem('hotels', JSON.stringify(hotels));
    return hotelData;
};
export const deleteHotel = (id) => {
    const hotels = getHotels().filter(h => h.id !== id);
    localStorage.setItem('hotels', JSON.stringify(hotels));
    // also delete related rooms and bookings?
    const rooms = getRooms().filter(r => r.hotelId !== id);
    localStorage.setItem('rooms', JSON.stringify(rooms));
};

// --- ROOMS ---
export const getRooms = () => JSON.parse(localStorage.getItem('rooms')) || [];
export const getRoomsByHotelId = (hotelId) => getRooms().filter(r => r.hotelId === hotelId);
export const getRoomById = (id) => getRooms().find(r => r.id === id);
export const saveRoom = (roomData) => {
    const rooms = getRooms();
    if (roomData.id) {
        const index = rooms.findIndex(r => r.id === roomData.id);
        if (index !== -1) rooms[index] = roomData;
    } else {
        roomData.id = `r_${Date.now()}`;
        rooms.push(roomData);
    }
    localStorage.setItem('rooms', JSON.stringify(rooms));
    return roomData;
};
export const deleteRoom = (id) => {
    const rooms = getRooms().filter(r => r.id !== id);
    localStorage.setItem('rooms', JSON.stringify(rooms));
};

// --- BOOKINGS & ANALYTICS ---
export const getBookings = () => JSON.parse(localStorage.getItem('bookings')) || [];
export const getUserBookings = (userId) => getBookings().filter(b => b.userId === userId);
export const createBooking = (bookingData) => {
    const bookings = getBookings();
    bookingData.id = `b_${Date.now()}`;
    bookingData.status = 'Confirmed';
    bookingData.date = new Date().toISOString();
    bookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return bookingData;
};
export const updateBookingStatus = (id, status) => {
    const bookings = getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
        bookings[index].status = status;
        localStorage.setItem('bookings', JSON.stringify(bookings));
        return true;
    }
    return false;
};

// Check if dates overlap with Confirmed or Completed bookings
export const checkRoomAvailability = (roomId, checkIn, checkOut) => {
    const bookings = getBookings();
    const newStart = new Date(checkIn).getTime();
    const newEnd = new Date(checkOut).getTime();

    const overlappingBooking = bookings.find(b => {
        if (b.roomId !== roomId) return false;
        if (b.status === 'Cancelled') return false;

        const bStart = new Date(b.checkIn).getTime();
        const bEnd = new Date(b.checkOut).getTime();

        // Overlap condition:
        // New booking starts before existing ends AND new booking ends after existing starts
        return (newStart < bEnd && newEnd > bStart);
    });

    return !overlappingBooking;
};

export const getTotalRevenue = () => {
    const bookings = getBookings();
    // Sum only confirmed or completed bookings
    return bookings
        .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
        .reduce((sum, b) => sum + b.totalAmount, 0);
};

export const getMostBookedHotel = () => {
    const bookings = getBookings();
    if (bookings.length === 0) return null;

    // Count bookings per hotelId
    const counts = {};
    bookings.forEach(b => {
        if (b.status !== 'Cancelled') {
            counts[b.hotelId] = (counts[b.hotelId] || 0) + 1;
        }
    });

    if (Object.keys(counts).length === 0) return null;

    // Find the hotelId with the max count
    const mostBookedId = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    return getHotelById(mostBookedId);
};

// --- WISHLIST ---
export const getWishlist = () => JSON.parse(localStorage.getItem('wishlist')) || [];
export const getUserWishlist = (userId) => getWishlist().filter(w => w.userId === userId);
export const toggleWishlist = (userId, hotelId) => {
    let wishlist = getWishlist();
    const existingIndex = wishlist.findIndex(w => w.userId === userId && w.hotelId === hotelId);

    if (existingIndex !== -1) {
        // Remove
        wishlist.splice(existingIndex, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        return false; // Returns false if removed
    } else {
        // Add
        wishlist.push({ id: `w_${Date.now()}`, userId, hotelId });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        return true; // Returns true if added
    }
};

// --- REVIEWS ---
export const getReviews = () => JSON.parse(localStorage.getItem('reviews')) || [];
export const getHotelReviews = (hotelId) => getReviews().filter(r => r.hotelId === hotelId);
export const addReview = (reviewData) => {
    const reviews = getReviews();
    reviewData.id = `rev_${Date.now()}`;
    reviewData.date = new Date().toISOString();
    reviews.push(reviewData);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    return reviewData;
};
export const getHotelAverageRating = (hotelId) => {
    const reviews = getHotelReviews(hotelId);
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, rev) => acc + Number(rev.rating), 0);
    return (sum / reviews.length).toFixed(1);
};

// Initialize on file load
initDummyData();
