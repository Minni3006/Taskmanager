# TaskFlow — Full-Stack Task Manager

A production-ready task management web application built with React, Node.js, Express, and MongoDB. Features JWT authentication, full CRUD task management, priority tracking, and a modern responsive UI.

---

## Features

- **Authentication** — Register, login, JWT-based session management
- **Task CRUD** — Create, read, update, delete tasks
- **Priority Levels** — Low / Medium / High with color indicators
- **Status Tracking** — Pending / Completed with one-click toggle
- **Due Dates** — Overdue and today highlighting
- **Dashboard Stats** — Total, completed, pending, overdue counts
- **Search & Filter** — Real-time search, filter by status
- **Sort** — By newest, priority, or due date
- **Responsive** — Mobile and desktop layouts

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS v4     |
| HTTP      | Axios                               |
| Routing   | React Router v6                     |
| Backend   | Node.js, Express                    |
| Database  | MongoDB, Mongoose                   |
| Auth      | JWT, bcryptjs                       |
| Validation| express-validator                   |

---

## Project Structure

```
Task_man/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── axios.js
    │   │   ├── auth.js
    │   │   └── tasks.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── TaskForm.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskList.jsx
    │   │   └── StatsBar.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   └── useTasks.js
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    └── vite.config.js
```

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Task_man
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Edit `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskmanager
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

Start the backend:

```bash
npm run dev      # development (nodemon)
npm start        # production
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Edit `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev      # development
npm run build    # production build
```

### 4. Open in browser

```
http://localhost:5173
```

---

## API Endpoints

### Auth

| Method | Endpoint             | Description          | Auth |
|--------|----------------------|----------------------|------|
| POST   | `/api/auth/register` | Register new user    | No   |
| POST   | `/api/auth/login`    | Login user           | No   |
| GET    | `/api/auth/me`       | Get current user     | Yes  |

### Tasks

| Method | Endpoint          | Description          | Auth |
|--------|-------------------|----------------------|------|
| GET    | `/api/tasks`      | Get all user tasks   | Yes  |
| POST   | `/api/tasks`      | Create a task        | Yes  |
| PUT    | `/api/tasks/:id`  | Update a task        | Yes  |
| DELETE | `/api/tasks/:id`  | Delete a task        | Yes  |

### Request/Response Examples

**Register**
```json
POST /api/auth/register
{ "name": "Jane Doe", "email": "jane@example.com", "password": "secret123" }
```

**Create Task**
```json
POST /api/tasks
Authorization: Bearer <token>
{
  "title": "Build portfolio",
  "description": "Complete the React project",
  "priority": "high",
  "status": "pending",
  "dueDate": "2025-12-31"
}
```

---

## Deployment

### Backend (Railway / Render / Fly.io)

Set environment variables:
```
MONGO_URI=<your-atlas-uri>
JWT_SECRET=<strong-random-secret>
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
```

### Frontend (Vercel / Netlify)

Set environment variable:
```
VITE_API_URL=https://your-backend-domain.com/api
```

Build command: `npm run build`  
Output directory: `dist`

---

## License

MIT
