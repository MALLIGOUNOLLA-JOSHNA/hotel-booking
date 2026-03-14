# LuxeStay – Hotel Booking React Application

##  Project Overview

**LuxeStay** is a modern hotel booking web application built using **React.js**.
The platform allows users to browse hotels, view details, manage bookings, and interact with a clean and responsive interface.

The application provides role-based access, booking management, and a premium UI design for a smooth user experience.

---

## Features

  **User Authentication** – Secure login and signup functionality
  **Hotel Listings** – Browse available hotels with details
  **Booking Management** – Users can book and manage reservations
  **Wishlist** – Save favorite hotels for later
  **Reviews & Ratings** – Users can review hotels
  **Admin Dashboard** – Manage hotels and bookings
  **Responsive Design** – Works on desktop, tablet, and mobile
  **Contact Form** – Users can send messages which are stored in localStorage
  **About Page** – Provides information about the platform and its features

---

## 🛠 Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* HTML5
* CSS3

### Libraries & Tools

* React Router (for routing)
* Lucide React Icons
* Vite (development and build tool)

### Storage

* Browser **localStorage** for saving contact messages

---

## 📂 Project Structure

```
src/
│
├── components/
│   ├── Navbar.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Bookings.jsx
│
├── App.jsx
├── main.jsx
└── styles/
```

---

## ⚙ Installation & Setup

1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/luxestay-hotel-booking.git
```

2️⃣ Navigate to the project folder

```bash
cd luxestay-hotel-booking
```

3️⃣ Install dependencies

```bash
npm install
```

4️⃣ Run the development server

```bash
npm run dev
```

5️⃣ Open in browser

```
http://localhost:5173
```

---

## 🧪 Testing the Contact Form

1. Navigate to the **Contact Page**
2. Fill in the form fields:

   * Name
   * Email
   * Subject
   * Message
3. Submit the form
4. Open browser console and run:

```javascript
JSON.parse(localStorage.getItem("contactMessages"))
```

You will see the stored messages.

---

## 🌟 Future Improvements

* Backend integration (Node.js / Express)
* Database integration (MongoDB / Firebase)
* Payment gateway integration
* Real-time booking availability
* Email notifications

---

## 👩‍💻 Author

**Joshna**

Student | Full Stack Development Enthusiast
Interested in building modern web applications and innovative tech solutions.

---

## 📜 License

This project is for educational and portfolio purposes.
