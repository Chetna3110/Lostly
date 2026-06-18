<img width="1548" height="510" alt="image" src="https://github.com/user-attachments/assets/91194967-8fb1-474d-be57-2078e5c58db4" /># Lostly - Smart Campus Lost & Found System

Lostly is a full-stack MERN application that helps students report, search, and recover lost items within their campus community.

---

##  Motivation

Students frequently lose personal belongings such as ID cards, wallets, keys, earphones, water bottles, and other valuable items on campus. Traditional notice boards and word-of-mouth methods are often slow and ineffective, making it difficult for owners to recover their belongings.

Lostly was developed to provide a centralized digital platform where students can easily report lost or found items, search existing listings, and connect with the rightful owners. The goal is to simplify the recovery process, reduce item loss, and encourage community collaboration within educational institutions.

By combining modern web technologies with a user-friendly interface, Lostly offers a secure and efficient solution for campus lost-and-found management.

##  Project Highlights

- Built using the MERN Stack (MongoDB, Express.js, React.js, Node.js)
- Secure JWT-based Authentication
- Cloudinary Image Storage Integration
- Complete Lost & Found Item Lifecycle Management
- Responsive UI for Desktop and Mobile Devices
- Admin Dashboard for Platform Management
- Real-world Problem Solving Application
  
## ✨ Features

- JWT Authentication & Authorization
-  Secure User Registration & Login
-  Report Lost Items
-  Report Found Items
-  Image Uploads using Cloudinary
-  Smart Search & Filtering
-  Location-Based Item Tracking
-  Claim Request System
-  Admin Dashboard
-  Fully Responsive Design
-  Fast & Modern UI

---

##  Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- JWT
- bcryptjs

### Media Storage
- Cloudinary

---

##  Project Structure

```bash
Lostly/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
└── README.md
```

---

##  Installation

### Clone the Repository

```bash
git clone https://github.com/Chetna3110/Lostly.git
cd Lostly
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd ../server
npm install
```

---

##  Environment Variables

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

##  Running the Project

### Start Backend

```bash
cd server
npm start
```

### Start Frontend

```bash
cd client
npm run dev
```

---


---

##  Future Improvements

- AI-Based Item Matching
- Email Notifications
- Real-Time Updates
- Mobile App Support

---

##  Author

**Chetna Chaudhary**
project is live at : https://lostly-eosin.vercel.app/
GitHub: https://github.com/Chetna3110

---

⭐ If you like this project, consider giving it a star.
