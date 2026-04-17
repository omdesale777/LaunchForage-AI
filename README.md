# 🚀 LaunchForge AI

**Transform a rough startup idea into a launch-ready product blueprint in seconds.**

LaunchForge AI is an AI startup studio that generates structured startup proposals from a simple concept — product name, pitch, features, UI/UX flow, backend architecture, and more.

---

## 📁 Project Structure

```
launchforge-ai/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── generator.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       └── components/
│           ├── Navbar.jsx
│           ├── Hero.jsx
│           ├── IdeaForm.jsx
│           ├── ResultCard.jsx
│           ├── HistoryPanel.jsx
│           ├── FeatureCard.jsx
│           └── Footer.jsx
├── .env.example
└── README.md
```

---

## ⚡ Quick Start

### 1. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend runs at: `http://localhost:8000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/generate` | Generate startup blueprint |
| GET | `/history` | Get all saved ideas |
| POST | `/save` | Save a generated idea |
| DELETE | `/history/{id}` | Delete a saved idea |

---

## 🌍 Environment Variables

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

---

## 🚀 Deployment

### Backend (Render)
- Set build command: `pip install -r requirements.txt`
- Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Vercel / Netlify)
- Set build command: `npm run build`
- Set output directory: `dist`
- Set env var: `VITE_API_URL=https://your-backend.onrender.com`

---

## 🛠 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: FastAPI, Uvicorn, Pydantic
- **Database**: SQLite
- **AI**: Template-based engine (optional LLM integration ready)
