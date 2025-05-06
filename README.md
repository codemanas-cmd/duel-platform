# Real-Time Matchmaking App (Socket.IO + React)

This is a real-time matchmaking application built with **React**, **Redux Toolkit**, **Socket.IO**, and **Node.js**. It allows users to join shared rooms, track active users, and exchange data in real time using websockets.

---

## 🚀 Features

- ✅ Join default or match-specific rooms using Socket.IO  
- 👥 Maintain a shared list of active users in real-time  
- 🔄 Peer-to-peer user data exchange via the server  
- 🔌 Clean and robust socket connection lifecycle management  
- 🧠 Redux Toolkit for frontend state management  
- 💡 Optional integration with Vite and Tailwind CSS  

---

## 🛠️ Installation

### 1. Clone the Repository and Install Dependencies

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```
Create a .env file in the server directory with the following content:
```
MONGO_URI="mongodb://localhost:27017/your_database_name"
CF_API_CONTEST_URL="https://codeforces.com/api/contest.list"
CF_API_PROBLEMSET_URL='https://codeforces.com/api/problemset.problems'
CF_API_SUBMISSIONS_URL='https://codeforces.com/api/user.status'
SOCKET_ACTIVE_USER_ROOM='default-room'
```
▶️ Running the App
Start the Backend and Frontend
```
# Start the backend (Socket.IO + Express)
cd backend
node server.js
```
```
# In a new terminal, start the frontend (React + Redux)
cd frontend
npm run dev
```

## 🧪 Usage
- Open http://localhost:3000 in multiple tabs or devices.

- Enter a unique username in each tab.

- Users will automatically join a room and see real-time updates as others connect or disconnect.

## 🧱 Tech Stack
- Backend: Node.js, Express, Socket.IO

- Frontend: React, Redux Toolkit, Vite (optional)

- Styling: Tailwind CSS (optional)


