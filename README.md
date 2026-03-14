<div align="center">

<img src="https://img.shields.io/badge/Real--Time-Chat%20App-3b82f6?style=for-the-badge&logo=socket.io&logoColor=white" alt="Chat App Logo" />

# ⚡ Shapener Chat Application

### *Scalable. Real-time. Persistent.*

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-v5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![Socket.io](https://img.shields.io/badge/Socket.io-v4-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io)
[![MySQL](https://img.shields.io/badge/MySQL-Sequelize-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)](https://github.com/Riteshmaurya1/shapener-chat-app-project)

A production-ready, real-time messaging platform supporting **One-to-One chats**, **Group conversations**, and **Persistent Media Sharing**.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Guide](#-api-endpoints) • [Socket Events](#-socket-events)

</div>

---

## 🚀 Overview

**Shapener Chat** is a comprehensive full-stack application designed for high-performance messaging. It leverages WebSockets for instantaneous data transfer and a relational database (MySQL/Sequelize) for persistent storage of messages and media.

### 🌟 Key Highlights
- **Real-time Engine:** Powered by Socket.io for sub-millisecond latency.
- **Group Dynamics:** Create groups, manage members, and chat collectively.
- **Media Support:** Persistent image sharing integrated with cloud/local storage.
- **Auth Security:** Robust JWT authentication with secure password hashing.

---

## ✨ Features

| Category | Features |
|---|---|
| 🔐 **Security** | JWT-based Auth, Refresh Tokens, bcrypt Hashing, Protected Routes |
| 💬 **Messaging** | One-to-One Chat, Group Chats, Message Persistence, Unread Receipts |
| 👥 **Groups** | Create Groups, Add/Remove Members, Owner Privileges, Group Info |
| 📦 **Content** | Image Sharing (S3/Multer), Emoji Support, Rich Text Previews |
| ⚡ **Real-time** | Online/Offline Status, Typing Indicators, Real-time Notifications |
| 📱 **UI/UX** | Fully Responsive, Mobile Optimized, Dark/Light Mode support |

---

## 🛠 Tech Stack

### **Backend**
- **Runtime:** Node.js (CommonJS)
- **Framework:** Express.js v5
- **Real-time:** Socket.io v4
- **ORM:** Sequelize (MySQL/PostgreSQL)
- **Authentication:** JWT (JSON Web Token)
- **File Handling:** Multer + AWS SDK (S3 integration)
- **Logging:** Pino + Morgan

### **Frontend**
- **Library:** React.js / HTML5
- **Styling:** CSS3 / Tailwind CSS
- **API Client:** Axios
- **Real-time Client:** Socket.io-client

---

## 📂 Project Structure

```
shapener-chat-app-project/
├── server/                 # Backend Directory
│   ├── src/
│   │   ├── auth/           # JWT & Auth Logic
│   │   ├── Config/         # DB & Environment Configuration
│   │   ├── Controller/     # Route Handlers (Business Logic)
│   │   ├── Middleware/     # Auth & Error Interceptors
│   │   ├── Model/          # Sequelize Models (User, Message, Group)
│   │   ├── Routes/         # API Endpoint Definitions
│   │   ├── Services/       # Core Business Services
│   │   ├── socket_io/      # WebSocket Event Handlers
│   │   └── server.js       # Entry Point
│   ├── package.json
│   └── .env.example
├── client/                 # Frontend Directory (React/HTML)
└── README.md
```

---

## ⚙️ Installation

### Prerequisites
- Node.js **v18+**
- MySQL or PostgreSQL database
- AWS Account (optional, for S3 image storage)

### Setup Steps

1. **Clone the Repo**
   ```bash
   git clone https://github.com/Riteshmaurya1/shapener-chat-app-project.git
   cd shapener-chat-app-project
   ```

2. **Backend Configuration**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update .env with your DB_URL, JWT_SECRET, and AWS credentials
   npm run dev
   ```

3. **Frontend Configuration**
   ```bash
   cd ../client
   npm install
   # Configure API_URL in your config/env file
   npm start
   ```

---

## 📡 API Endpoints

### **Authentication**
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Get Access & Refresh tokens
- `POST /api/auth/refresh` - Renew expired access token
- `POST /api/auth/logout` - Invalidate session

### **Messaging & Groups**
- `GET /api/messages?recipientId={id}` - Fetch chat history
- `POST /api/messages` - Send message with optional file
- `POST /api/groups` - Create new chat group
- `POST /api/groups/:id/members` - Add user to group

---

## 🔌 Socket Events

| Event Name | Type | Data | Description |
|---|---|---|---|
| `user:connect` | Emit | `{ userId, name }` | Registers user as online |
| `message:private` | Both | `{ recipientId, content }` | Direct messaging |
| `message:group` | Both | `{ groupId, content }` | Group messaging |
| `user:typing` | Both | `{ recipientId, isTyping }` | Visual feedback |
| `user:statusChanged`| On | `{ userId, status }` | Global presence update |

---

## 👨‍💻 Author

<div align="center">

**Ritesh Maurya**

[![GitHub](https://img.shields.io/badge/GitHub-Riteshmaurya1-181717?style=flat-square&logo=github)](https://github.com/Riteshmaurya1)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/riteshmaurya)

*Full-Stack Developer | Building Scalable Real-time Systems*

</div>

---

<div align="center">

⭐ **Star this repository if you find it helpful!** ⭐

*Built with ❤️ by Ritesh Maurya*

</div>
