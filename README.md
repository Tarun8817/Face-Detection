# 🎭 Face Detection & Expression Recognition Web App

A full-stack real-time **Face Expression Detection Web Application** built using **React**, **Vite**, **MediaPipe**, **Node.js**, **Express**, **MongoDB**, and **Redis**.

The application detects live facial expressions through a webcam and also provides a secure authentication system using JWT, Redis token blacklisting, and MongoDB.

---

# 🚀 Features

## 🎨 Frontend Features

- 📷 Real-time webcam face detection
- 😊 Detects multiple facial expressions:
  - Smiling
  - Surprised
  - Angry
  - Sleepy
  - Neutral
- ⚡ Fast performance using MediaPipe Face Landmarker
- 🎯 Lightweight React + Vite setup
- 🧩 Reusable React components
- 📱 Responsive and modern UI

---

## 🔐 Backend Features

- 👤 User Registration & Login
- 🔑 JWT Authentication
- 🍪 Secure Cookie-based Token Storage
- 🚫 Token Blacklisting using Redis
- 🛡️ Protected Routes Middleware
- 🗄️ MongoDB Database Integration
- ⚡ Redis Caching & Session Security
- 🔒 Password Hashing using bcryptjs
- 🌍 Environment Variable Configuration

---

# 🏗️ Tech Stack

## Frontend
- React (Vite)
- MediaPipe Tasks Vision
- JavaScript (ES6+)

## Backend
- Node.js
- Express.js
- MongoDB
- Redis
- JWT Authentication
- bcryptjs
- cookie-parser

---

# 📁 Project Structure

```bash
Backend/
│
├── src/
│   ├── app.js
│   │
│   ├── config/
│   │   ├── cache.js
│   │   └── database.js
│   │
│   ├── controllers/
│   │   └── auth.controller.js
│   │
│   ├── middlewares/
│   │   └── auth.middlewares.js
│   │
│   ├── models/
│   │   ├── user.models.js
│   │   └── blackList.model.js
│   │
│   └── routes/
│       └── auth.router.js
│
├── server.js
└── package.json


Frontend/
│
├── src/
│   ├── App.jsx
│   │
│   └── features/
│       └── Expression/
│           ├── components/
│           │   └── FaceExpression.jsx
│           │
│           └── utils/
│               └── utils.js
│
├── vite.config.js
└── package.json
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/face-detection.git

cd face-detection
```

---

# 🖥️ Backend Setup

## Install Dependencies

```bash
cd Backend

npm install
```

---

## Create `.env` File

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
```

---

## Start Backend Server

```bash
npm start
```

---

# 🌐 Frontend Setup

## Install Dependencies

```bash
cd ../Frontend

npm install
```

---

## Run Frontend

```bash
npm run dev
```

---

# 📷 Usage

1. Open the application in your browser
2. Register/Login (if authentication UI is available)
3. Click on **Start Camera**
4. Allow webcam permissions
5. View live facial expression detection in real-time

---

# ⚙️ How Face Detection Works

The frontend uses **MediaPipe Face Landmarker** to:

- Detect face landmarks
- Track facial movements
- Extract blendshape scores such as:
  - `mouthSmile`
  - `jawOpen`
  - `eyeBlink`
  - `browRaise`

These values are processed with threshold logic to classify facial expressions.

---

# 🔐 Authentication Flow

## Login Process

1. User logs in
2. Server validates credentials
3. JWT token is generated
4. Token stored in cookies

---

## Logout Process

1. JWT token is added to Redis blacklist
2. Cookie gets cleared
3. Blacklisted token becomes invalid

---

# 🔗 API Endpoints

## Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/get-me` | Get current user |
| GET | `/api/auth/logout` | Logout user |

---

# 🧩 Core Integrations

## 🎭 MediaPipe Integration

- Uses `@mediapipe/tasks-vision`
- Detects real-time facial landmarks
- Runs prediction loop using webcam feed

---

## 🗄️ MongoDB Integration

Stores:
- User Information
- Authentication Data
- Blacklisted Tokens (optional persistence)

---

## ⚡ Redis Integration

Used for:
- JWT token blacklisting
- Fast session validation
- Improved authentication security

---

# 📂 Important Files

| File | Purpose |
|------|----------|
| `database.js` | MongoDB connection |
| `cache.js` | Redis connection |
| `auth.controller.js` | Authentication logic |
| `auth.middlewares.js` | Route protection middleware |
| `user.models.js` | User schema |
| `blackList.model.js` | Blacklisted token schema |
| `FaceExpression.jsx` | Main expression detection component |
| `utils.js` | MediaPipe utility functions |

---

# 🛡️ Security Features

- JWT Authentication
- HTTP-only Cookies
- Password Hashing with bcryptjs
- Redis Token Blacklisting
- Protected API Routes
- Environment Variable Protection

---

# ⚠️ Requirements

- Modern Browser (Chrome Recommended)
- Webcam Access Enabled
- MongoDB Running
- Redis Running
- Node.js Installed

---

# 🧪 Future Improvements

- 🎯 Face Bounding Box
- 📊 Expression Confidence Graph
- 📱 Mobile Optimization
- 🤖 Better ML Accuracy
- 🌙 Dark Mode
- 👥 Multi-face Detection
- 📈 Analytics Dashboard

---

# 🙌 Acknowledgements

- MediaPipe by Google
- React Community
- Vite Community
- MongoDB
- Redis

---

# 📜 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you like this project:

- ⭐ Star the repository
- 🍴 Fork the project
- 🐛 Report issues
- 🚀 Contribute improvements
