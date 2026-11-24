# Chatie - AI Chatbot

Chatie is a full-stack AI chatbot built with React, Node.js, Express, MongoDB, and the Google Gemini API. It provides JWT-based authentication, persistent conversations, and real-time AI responses streamed to the browser.

## Features

- Streamed Gemini responses with server-sent events (SSE)
- User signup, login, logout, and authentication checks
- Access and refresh JWT authentication with HttpOnly cookies
- Multiple saved conversations with persistent message history
- Responsive chat sidebar and mobile layout
- Redux Toolkit state for users, chats, and conversations
- Optimistic user messages and loading feedback during streaming

## Tech Stack

| Frontend | Backend |
| --- | --- |
| React 19 | Node.js |
| Vite | Express 5 |
| Tailwind CSS 4 | MongoDB and Mongoose |
| Redux Toolkit | JWT and bcrypt |
| React Router | Google Gen AI SDK |

## Project Structure

```text
AI-Chatbot/
├── Cb_Frontend/
│   ├── src/
│   │   ├── components/     # Chat UI, sidebar, authentication, and services
│   │   ├── features/       # Redux auth and chat slices
│   │   └── app/store.js
│   └── package.json
├── Cb_Backend/
│   ├── controllers/        # Auth, chat, and conversation handlers
│   ├── middleware/
│   ├── models/             # User, conversation, and message schemas
│   ├── routes/
│   ├── services/           # Gemini client configuration
│   └── app.js
├── package.json            # Runs both applications
└── README.md
```

## Prerequisites

- Node.js and npm
- MongoDB Atlas or a local MongoDB server
- A Google Gemini API key

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/ukutsavkumaruk-cpu/AI-Chatbot.git
cd AI-Chatbot
```

### 2. Install dependencies

```bash
npm install
npm install --prefix Cb_Backend
npm install --prefix Cb_Frontend
```

### 3. Configure the backend

Create `Cb_Backend/.env`:

```env
DB_URL=mongodb://127.0.0.1:27017/chatie
JWT_SECRET=replace_with_a_long_random_secret
JWT_REFRESH_SECRET=replace_with_a_different_random_secret
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
```

Environment variables:

| Variable | Purpose |
| --- | --- |
| `DB_URL` | MongoDB connection string |
| `JWT_SECRET` | Signs access tokens |
| `JWT_REFRESH_SECRET` | Signs refresh tokens |
| `GEMINI_API_KEY` | Authenticates requests to the Google Gemini API |
| `NODE_ENV` | Controls cookie security behavior |

Do not commit `.env` or real API keys. Keep the access and refresh secrets different.

### 4. Start the application

Run both services from the repository root:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3010

Start each service separately when needed:

```bash
npm start --prefix Cb_Backend
npm run dev --prefix Cb_Frontend
```

## How It Works

1. A user signs up or logs in.
2. The backend hashes or verifies the password and returns access and refresh JWTs in HttpOnly cookies.
3. The frontend submits a message with the active conversation ID.
4. The backend validates the access JWT and creates or updates a conversation owned by the user.
5. Gemini streams response chunks over SSE.
6. The frontend appends chunks to the active agent message in real time.
7. The backend saves the completed user and agent messages in MongoDB.

Each conversation stores Gemini's latest `interactionId`. For follow-up messages, the backend passes `previous_interaction_id` so Gemini can continue the same interaction chain.

## API Overview

All routes are served from `http://localhost:3010`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/signUp` | Register a user |
| `POST` | `/api/auth/login` | Log in and set the auth cookie |
| `POST` | `/api/auth/logout` | Clear the auth cookie |
| `GET` | `/api/auth/check` | Check the current authenticated user |
| `GET` | `/api/auth/refreshToken` | Issue a new access token from the refresh cookie |
| `GET` | `/api/conversations` | List the user's conversations |
| `GET` | `/api/conversations/:conv_id` | Get messages for a conversation |
| `GET` | `/api/chat/:conversationId` | Get persisted chat messages |
| `POST` | `/api/chat` | Send a message and stream the Gemini response |

The chat endpoint accepts:

```json
{
  "message": "Explain MongoDB transactions",
  "conversationId": "optional_existing_mongodb_object_id"
}
```

## Authentication and Security

- Passwords are hashed with bcrypt.
- Access tokens expire after 30 minutes.
- Refresh tokens expire after 7 days and are saved in the user document.
- Authentication cookies are HttpOnly and use `SameSite=Lax`.
- Cookies use the `Secure` flag in production.
- Chat requests validate the access token before creating or updating a conversation.
- CORS is currently restricted to `http://localhost:5173`.

## Build and Lint

```bash
npm run build --prefix Cb_Frontend
npm run lint --prefix Cb_Frontend
```

## Troubleshooting

- **MongoDB connection fails:** verify `DB_URL` and confirm that MongoDB or MongoDB Atlas is reachable.
- **Gemini requests fail:** verify `GEMINI_API_KEY` and your API/model access.
- **Authentication is lost:** confirm that cookies are enabled and that frontend and backend origins match the local CORS setup.
- **Frontend cannot reach the backend:** confirm the backend is running on port `3010`.

## Author

**Utsav Kumar**

GitHub: https://github.com/ukutsavkumaruk-cpu
