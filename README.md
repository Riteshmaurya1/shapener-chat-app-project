# 📄 Real-Time Chat Application

<div align="center">

![Chat App](https://img.shields.io/badge/Node.js-Chat%20App-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Active-success)

A modern, real-time chat application built with **Node.js, Express, Socket.io, and React** enabling seamless messaging with advanced features like user authentication, group chats, message persistence, and responsive UI.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#%EF%B8%8F-installation--setup) • [API Docs](#-api-documentation)

</div>

---

## 📊 Table of Contents

- [Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Installation](#%EF%B8%8F-installation--setup)
- [🚀 Usage](#-usage)
- [📡 API Documentation](#-api-documentation)
- [🔐 Socket.io Events](#-socketio-events)
- [🔓 Authentication](#-authentication)
- [License](#-license)

---

## 📝 Project Overview

A **full-stack real-time chat application** that enables seamless communication between users using modern web technologies. Supports one-on-one messaging, group chats, message history, and a fully responsive user interface optimized for desktop and mobile devices.

**Key Highlights:**
- 🔐 Secure JWT-based authentication with refresh tokens
- ⚡ Real-time communication using WebSockets (Socket.io)
- 💾 Persistent message storage in relational database
- 👥 Group chat support with member management
- 📱 Mobile-responsive design
- 🎊 Modern and intuitive user interface
- 🔔 Typing indicators & online/offline status
- 📄 File & emoji sharing support
- 🔍 Search functionality

---

## ✨ Features

### 🔐 **Authentication & Security**
- ✅ User registration with email validation
- ✅ Secure login with JWT tokens
- ✅ Password encryption (bcryptjs)
- ✅ Token refresh mechanism
- ✅ User profile management
- ✅ Logout with token invalidation

### 📄 **Messaging Features**
- ✅ One-on-one private messaging
- ✅ Group chat creation and management
- ✅ Real-time message delivery
- ✅ Message history with pagination
- ✅ Typing indicators
- ✅ Online/offline status
- ✅ Message timestamps
- ✅ Message deletion & edit support

### 📎 **Rich Content**
- ✅ Emoji picker
- ✅ File/image sharing
- ✅ Link preview
- ✅ Formatted text

### 🗣️ **Group Features**
- ✅ Create/manage groups
- ✅ Add/remove members
- ✅ Group owner privileges
- ✅ Member notifications
- ✅ Real-time member list

### 📱 **User Experience**
- ✅ Fully responsive design
- ✅ Dark/light theme
- ✅ Smooth animations
- ✅ Intuitive interface
- ✅ Search users & messages
- ✅ Real-time notifications

---
## 🛠 Tech Stack

### **Backend**
| Technology | Purpose |
|-----------|--------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **Socket.io** | Real-time communication |
| **PostgreSQL/MySQL** | Database |
| **Sequelize ORM** | Database ORM |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **Dotenv** | Environment variables |
| **CORS** | Cross-origin requests |

### **Frontend**
| Technology | Purpose |
|-----------|--------|
| **Socket.io Client** | Real-time communication |
| **Html** | Real-time communication |
| **Axios** | HTTP requests |
| **CSS3/Tailwind** | Styling |

### **Tools**
- Git & GitHub
- Postman
- Render/Railway/Heroku

---

## 📁 Project Structure

```
shapener-chat-app-project/
├── server/                       # Backend
│   ├── src/
│   │   ├── models/              # Database models
│   │   ├── routes/              # API routes
│   │   ├── controllers/        # Business logic
│   │   ├── middleware/         # Auth, error handling
│   │   ├── socket/             # WebSocket handlers
│   │   ├── config/             # Database config
│   │   ├── utils/              # Utilities
│   │   └── server.js           # Entry point
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── client/                       # Frontend (React)
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API & Socket services
│   │   ├── styles/             # CSS files
│   │   └── App.jsx
│   ├── public/
│   ├── package.json
│   └── README.md
├── .gitignore
├── README.md                   # This file
└── LICENSE
```

---

## ⚙️ Installation & Setup

### **Prerequisites**
- Node.js v14+
- npm or yarn
- PostgreSQL/MySQL
- Git

### **Step 1: Clone Repository**
```bash
git clone https://github.com/Riteshmaurya1/shapener-chat-app-project.git
cd shapener-chat-app-project
```

### **Step 2: Backend Setup**
```bash
cd server
npm install
cp .env.example .env

# Configure .env with:
# DATABASE_URL=your_database_url
# JWT_SECRET=your_secret_key
# PORT=5000
# FRONTEND_URL=http://localhost:3000

npx sequelize-cli db:migrate
npm run dev
```

### **Step 3: Frontend Setup**
```bash
cd ../client
npm install
cp .env.example .env

# Configure .env with:
# REACT_APP_API_URL=http://localhost:5000/api

npm start
```

---

## 🚀 Usage

**Terminal 1:**
```bash
cd server && npm run dev
# Server: http://localhost:5000
```

**Terminal 2:**
```bash
cd client && npm start
# Frontend: http://localhost:3000
```

**Steps:**
1. Register/Login at http://localhost:3000
2. View online users in sidebar
3. Click user to start chatting
4. Create groups from menu
5. Share files and emojis

---
## 📡 API Documentation

### **Base URL**
```
http://localhost:5000/api
```

---

## **🔐 Authentication Endpoints**

### **1️⃣ Register User**
```http
POST /auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "9876543210"
}

Response (201):
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com" }
}
```

### **2️⃣ Login User**
```http
POST /auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": { "id": 1, "name": "John Doe" }
}
```

### **3️⃣ Refresh Token**
```http
POST /auth/refresh
Content-Type: application/json

Body:
{
  "refreshToken": "eyJhbGc..."
}

Response (200):
{
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

### **4️⃣ Logout**
```http
POST /auth/logout
Authorization: Bearer <token>

Response (200):
{
  "message": "Logged out successfully"
}
```

---

## **👥 User Endpoints**

### **Get All Users**
```http
GET /users
Authorization: Bearer <token>

Response (200):
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "status": "online",
      "avatar": "https://..."
    }
  ]
}
```

### **Get User Profile**
```http
GET /users/:userId
Authorization: Bearer <token>

Response (200):
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "status": "online",
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

### **Update Profile**
```http
PUT /users/:userId
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "name": "John Updated",
  "phone": "9876543210"
}

Response (200):
{
  "message": "Profile updated",
  "user": { ... }
}
```

### **Search Users**
```http
GET /users/search?query=john
Authorization: Bearer <token>

Response (200):
{
  "users": [
    { "id": 1, "name": "John Doe", "email": "john@example.com", "status": "online" }
  ]
}
```

---

## **📄 Message Endpoints**

### **Get Conversation Messages**
```http
GET /messages?recipientId=2&page=1&limit=20
Authorization: Bearer <token>

Response (200):
{
  "messages": [
    {
      "id": 1,
      "senderId": 1,
      "recipientId": 2,
      "content": "Hello!",
      "timestamp": "2024-01-09T20:00:00Z",
      "read": true
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 100 }
}
```

### **Send Message**
```http
POST /messages
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "recipientId": 2,
  "content": "Hello John!",
  "fileUrl": null
}

Response (201):
{
  "message": "Message sent",
  "data": { "id": 1, "senderId": 1, "recipientId": 2, "content": "Hello John!" }
}
```

### **Delete Message**
```http
DELETE /messages/:messageId
Authorization: Bearer <token>

Response (200):
{
  "message": "Message deleted"
}
```

### **Edit Message**
```http
PUT /messages/:messageId
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "content": "Updated message"
}

Response (200):
{
  "message": "Message updated"
}
```

---

## **🗣️ Group Endpoints**

### **Create Group**
```http
POST /groups
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "name": "Study Group",
  "description": "For study purposes",
  "members": [1, 2, 3]
}

Response (201):
{
  "message": "Group created",
  "group": { "id": 1, "name": "Study Group", "ownerId": 1 }
}
```

### **Get All Groups**
```http
GET /groups
Authorization: Bearer <token>

Response (200):
{
  "groups": [
    { "id": 1, "name": "Study Group", "members": 5, "ownerId": 1 }
  ]
}
```

### **Get Group Messages**
```http
GET /groups/:groupId/messages?page=1&limit=20
Authorization: Bearer <token>

Response (200):
{
  "messages": [ ... ]
}
```

### **Send Group Message**
```http
POST /groups/:groupId/messages
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "content": "Hello everyone!"
}

Response (201):
{
  "message": "Message sent to group"
}
```

### **Add Member**
```http
POST /groups/:groupId/members
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "userId": 4
}

Response (200):
{
  "message": "Member added"
}
```

### **Remove Member**
```http
DELETE /groups/:groupId/members/:userId
Authorization: Bearer <token>

Response (200):
{
  "message": "Member removed"
}
```

### **Update Group**
```http
PUT /groups/:groupId
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "name": "Updated Group Name",
  "description": "Updated description"
}

Response (200):
{
  "message": "Group updated"
}
```

### **Delete Group**
```http
DELETE /groups/:groupId
Authorization: Bearer <token>

Response (200):
{
  "message": "Group deleted"
}
```

---
## 🔓 Socket.io Events

### **Client -> Server Events**

#### **Connect Events**
```javascript
socket.emit('user:connect', {
  userId: 1,
  userName: 'John Doe'
});

socket.emit('user:typing', {
  recipientId: 2,
  isTyping: true
});
```

#### **Message Events**
```javascript
// Send private message
socket.emit('message:private', {
  senderId: 1,
  recipientId: 2,
  content: 'Hello!',
  timestamp: new Date()
});

// Send group message
socket.emit('message:group', {
  groupId: 1,
  senderId: 1,
  content: 'Hello everyone!',
  timestamp: new Date()
});

// Read message
socket.emit('message:read', {
  messageId: 1
});
```

#### **Group Events**
```javascript
socket.emit('group:join', { groupId: 1 });
socket.emit('group:leave', { groupId: 1 });
```

### **Server -> Client Events**

```javascript
// User online/offline
socket.on('user:statusChanged', (data) => {
  console.log(`User ${data.userId} is ${data.status}`);
});

// Receive private message
socket.on('message:private', (data) => {
  console.log(`New message from ${data.senderName}: ${data.content}`);
});

// Receive group message
socket.on('message:group', (data) => {
  console.log(`New group message: ${data.content}`);
});

// Typing indicator
socket.on('user:typing', (data) => {
  console.log(`${data.userName} is typing...`);
});

// Message read confirmation
socket.on('message:readReceipt', (data) => {
  console.log(`Message ${data.messageId} was read`);
});

// Group member joined
socket.on('group:memberJoined', (data) => {
  console.log(`${data.memberName} joined the group`);
});

// Group member left
socket.on('group:memberLeft', (data) => {
  console.log(`${data.memberName} left the group`);
});
```

---

## 🔐 Authentication

### **JWT Token Format**
```
Header: { "alg": "HS256", "typ": "JWT" }
Payload: { "id": 1, "email": "user@example.com", "iat": 1234567890, "exp": 1234571490 }
Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

### **Token Storage**
- **Access Token**: Valid for 1 hour
- **Refresh Token**: Valid for 7 days
- **Storage**: LocalStorage (access token), Secure Cookie (refresh token)

### **Protected Routes**
All endpoints except `/auth/register` and `/auth/login` require:
```
Authorization: Bearer <access_token>
```

---

## 🗃️ Error Handling

### **Common Error Responses**

```http
400 Bad Request
{
  "error": "Invalid email format",
  "status": 400
}

401 Unauthorized
{
  "error": "Invalid credentials",
  "status": 401
}

403 Forbidden
{
  "error": "Access denied",
  "status": 403
}

404 Not Found
{
  "error": "User not found",
  "status": 404
}

500 Internal Server Error
{
  "error": "Internal server error",
  "status": 500
}
```

---

## 🔧 Troubleshooting

### **Common Issues**

**Issue: Connection refused**
```bash
# Solution: Ensure backend server is running
cd server && npm run dev
```

**Issue: CORS errors**
```bash
# Solution: Check CORS configuration in server.js
# Ensure frontend URL matches CORS_ORIGIN in .env
```

**Issue: Messages not sending**
```bash
# Solution: Check if Socket.io is connected
# Verify JWT token is valid
# Check browser console for errors
```

**Issue: Login fails**
```bash
# Solution: Verify email and password
# Check if database is connected
# Review server logs for errors
```

---

## 📚 Environment Variables

### **Server (.env)**
```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/chat_app
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=1h
REFRESH_TOKEN_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### **Client (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

---

## 🔘 Database Schema

### **Users Table**
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  avatar VARCHAR(255),
  status ENUM('online', 'offline', 'away') DEFAULT 'offline',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Messages Table**
```sql
CREATE TABLE messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  senderId INT NOT NULL,
  recipientId INT NOT NULL,
  content TEXT NOT NULL,
  fileUrl VARCHAR(255),
  read BOOLEAN DEFAULT false,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (senderId) REFERENCES users(id),
  FOREIGN KEY (recipientId) REFERENCES users(id)
);
```

### **Groups Table**
```sql
CREATE TABLE groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  ownerId INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ownerId) REFERENCES users(id)
);
```

### **GroupMembers Table**
```sql
CREATE TABLE group_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  groupId INT NOT NULL,
  userId INT NOT NULL,
  joinedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (groupId) REFERENCES groups(id),
  FOREIGN KEY (userId) REFERENCES users(id),
  UNIQUE KEY (groupId, userId)
);
```

### **GroupMessages Table**
```sql
CREATE TABLE group_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  groupId INT NOT NULL,
  senderId INT NOT NULL,
  content TEXT NOT NULL,
  fileUrl VARCHAR(255),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (groupId) REFERENCES groups(id),
  FOREIGN KEY (senderId) REFERENCES users(id)
);
```

---

## 🚀 Deployment

### **Deploy to Render**

1. **Create Render account** at [render.com](https://render.com)
2. **Connect GitHub repository**
3. **Set environment variables**
4. **Deploy**

### **Deploy to Railway**

1. **Connect GitHub account**
2. **Create new project**
3. **Add environment variables**
4. **Deploy**

### **Production Checklist**
- [ ] Set NODE_ENV=production
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Configure database backups
- [ ] Set up error logging (Sentry)
- [ ] Enable rate limiting
- [ ] Use security headers
- [ ] Test all features

---

## 📚 License

This project is licensed under the **MIT License**.

---

## 🙋 Author

**Ritesh Maurya**
- GitHub: [Riteshmaurya1](https://github.com/Riteshmaurya1)
- Email: ritesh@example.com
- LinkedIn: [Your LinkedIn Profile]

---

## 🚀 Getting Help

If you encounter any issues:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [API Documentation](#-api-documentation)
3. Open an issue on GitHub
4. Contact the author

---

**Made with ❤️ by Ritesh Maurya**

> Last updated: January 2024
