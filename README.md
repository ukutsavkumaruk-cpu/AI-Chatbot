# 🤖 Chatie – AI Chatbot

Chatie is an AI-powered chatbot application designed to provide interactive conversations and AI-generated responses using Google's Gemini API.

## 🚀 Project Overview

Chatie is a full-stack AI chatbot built using the MERN stack. It provides a conversational interface where users can interact with an AI model and receive intelligent responses.

The project focuses on implementing real-world full-stack development concepts, including REST APIs, authentication, database management, and AI integration.

## ✨ Features

* AI-generated responses using Google's Gemini API.
* Chat responses stream into the interface as they are generated.
* User signup, login, and logout with JWT authentication in HttpOnly cookies.
* Conversations and messages are stored in MongoDB and can be revisited.
* Redux Toolkit state management for chat and authentication.

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
│   │   ├── components/
│   │   └── features/
│   └── package.json
│
├── Cb_Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── package.json
│   └── app.js
│
├── package.json
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd AI-Chatbot
```

### 2. Install Dependencies

```bash
npm install
npm install --prefix Cb_Backend
npm install --prefix Cb_Frontend
```

### 3. Configure the Backend

Create `Cb_Backend/.env`:

```env
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Start the Application

From the repository root, run:

```bash
npm run dev
```

This starts the Vite frontend at `http://localhost:5173` and the Express backend at `http://localhost:3010`.

To start either app separately:

```bash
# Backend
cd Cb_Backend
npm start
```

```bash
# Frontend (in a separate terminal)
cd Cb_Frontend
npm install
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

Chatie integrates Google's Gemini API through the `@google/genai` package and streams generated response chunks to the chat interface.

Messages are stored against a conversation in MongoDB, but each request currently sends only the latest user message to Gemini. Stored chat history can be revisited in the app, but it is not yet used by the model as conversation context.

### Conversation Context (Planned)

To let Gemini follow earlier messages in the same conversation:

1. On the backend, load messages for the authenticated conversation, ordered by creation time.
2. Convert stored roles to Gemini roles (`user` and `model`; map Chatie's `agent` role to `model`).
3. Send the recent messages as Gemini's `contents` along with each new request.
4. Limit the history sent to Gemini (for example, to the latest 20 messages) to control token usage. For longer conversations, a rolling summary can be stored with the conversation and included with recent messages.

Build the context from server-side records rather than trusting message history supplied by the client, and verify that the authenticated user owns the conversation. This provides memory within one conversation; remembering user preferences across separate conversations would require a separate, user-scoped memory feature.

## 🔒 Security

* Password hashing.
* Environment variables for sensitive credentials.
* HttpOnly cookies for JWT storage.
* JWT verification middleware.
* CORS configuration.

## 🔮 Future Improvements

* Context-aware responses using recent messages from the current conversation.
* Summaries for long conversations and optional user-scoped memory across conversations.
* Rate limiting.
* Improved authentication and session management.

## 👨‍💻 Author

**Utsav Kumar**

GitHub: https://github.com/ukutsavkumaruk-cpu

---

⭐ If you find this project interesting, consider giving it a star!
