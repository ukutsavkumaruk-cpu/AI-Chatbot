# 🤖 Chatie – AI Chatbot

Chatie is an AI-powered chatbot application designed to provide interactive conversations and AI-generated responses using Google's Gemini API.

## 🚀 Project Overview

Chatie is a full-stack AI chatbot built using the MERN stack. It provides a conversational interface where users can interact with an AI model and receive intelligent responses.

The project focuses on implementing real-world full-stack development concepts, including REST APIs, authentication, database management, and AI integration.

## ✨ Features

* AI-powered conversations using Gemini API.
* Interactive chat interface.
* User Signup and Login.
* JWT-based authentication using HttpOnly cookies.
* Protected backend routes.
* MongoDB database integration.
* State management using Redux Toolkit.

*Note: Keep only the features that are actually implemented.*

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS v4
* Redux Toolkit
* React Router

### Backend

* Node.js
* Express.js 5
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* Google Gemini API

## 📁 Project Structure

```text
Chatie/
│
├── Cb_Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Cb_Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── package.json
│   └── server.js
│
├── docs/
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Setup Backend

```bash
cd Cb_Backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd Cb_Frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

## 🔐 Authentication

Chatie uses JWT-based authentication.

Authentication workflow:

1. User registers with credentials.
2. Password is securely hashed before storing in MongoDB.
3. User logs in using email and password.
4. Backend generates a JWT.
5. JWT is stored in an HttpOnly cookie.
6. Protected routes verify the JWT before granting access.

## 🧠 AI Integration

Chatie integrates Google's Gemini API through the `@google/genai` package.

The backend communicates with Gemini and processes AI-generated responses before returning them to the frontend.

## 🔒 Security

* Password hashing.
* Environment variables for sensitive credentials.
* HttpOnly cookies for JWT storage.
* JWT verification middleware.
* CORS configuration.

## 🔮 Future Improvements

* Chat history management.
* Multiple conversation support.
* Streaming AI responses.
* Better error handling.
* Rate limiting.
* Improved authentication and session management.

## 👨‍💻 Author

**Utsav Kumar**

GitHub: https://github.com/ukutsavkumaruk-cpu

---

⭐ If you find this project interesting, consider giving it a star!
