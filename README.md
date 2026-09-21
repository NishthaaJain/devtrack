# DevTrack — Agile Issue Tracker & Kanban Dashboard

A full-stack issue tracker with a 3-column Kanban board (To Do, In Progress, Done), built to keep track of tasks and their status in a simple, visual way.

## Features

- 3-column Kanban board: **To Do → In Progress → Done**
- Add new issues with title, description, priority, and assignee
- Move issues between columns and delete them
- **Optimistic UI updates** — moving or deleting a card updates the screen instantly. If the backend request fails, the change automatically rolls back and shows an error, so the screen never shows something that wasn't actually saved
- Search issues by title, description, or assignee
- Filter issues by priority
- Live stats ribbon showing total issues, in-progress count, and completion rate

## Tech Stack

**Frontend:** React (Vite), Tailwind CSS, Axios, Lucide icons
**Backend:** FastAPI, SQLAlchemy (ORM), Pydantic v2 (data validation)
**Database:** SQLite

## How It Works

```
React (frontend)  →  FastAPI (backend)  →  SQLAlchemy  →  SQLite (devtrack.db)
```

The frontend sends requests to a REST API. FastAPI validates the incoming data with Pydantic, SQLAlchemy translates that into SQL, and everything is stored in a local SQLite database file.

## Running It Locally

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The backend will run at `http://localhost:8000`.

### Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173`.

## Project Structure

```
devtrack/
├── backend/
│   ├── main.py          # FastAPI app and API routes
│   ├── models.py        # SQLAlchemy database model
│   ├── schemas.py       # Pydantic validation schemas
│   ├── database.py      # Database connection setup
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx      # Main app logic
│   │   └── api.js       # API call functions
│   └── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/issues` | Get all issues |
| POST | `/api/issues` | Create a new issue |
| PATCH | `/api/issues/{id}/status` | Update an issue's status |
| DELETE | `/api/issues/{id}` | Delete an issue |
