# LaunchForge AI

**Transform a rough startup idea into a launch-ready product blueprint in seconds.**

LaunchForge AI is a full-stack startup studio web application. A user enters a concept — one sentence or two — and the app instantly generates a complete, structured product blueprint: name, pitch, problem, solution, features, target users, UI/UX flow, backend architecture, sample API endpoints, tech stack, and deployment strategy.

Built as a hackathon project. Fully functional, deployable, and requires zero API keys.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Reference](#api-reference)
- [How the Generator Works](#how-the-generator-works)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

Most early-stage founders have a spark of an idea but struggle to structure it into something presentable or buildable. LaunchForge AI solves that by generating a full product blueprint from a single input — instantly, for free, with no external API dependencies.

The generation engine uses a domain-aware template system that detects the category of your idea (health, finance, education, ecommerce, productivity, social, and more) and fills in intelligent, professional content tailored to that domain. The result feels like a real startup proposal, not a generic text response.

---

## Features

- Instant blueprint generation from a single idea input
- Supports 13 domains: health, finance, education, ecommerce, productivity, social, travel, food, AI, analytics, logistics, HR, and security
- Auto-detects domain from your input, or manually select one
- Optional target audience input to personalize the output
- Full blueprint output including:
  - Startup name and elevator pitch
  - Problem statement and solution
  - Core features list
  - Target users and use cases
  - Step-by-step UI/UX flow
  - Backend architecture description
  - Sample REST API endpoints
  - Tech stack breakdown
  - Deployment recommendation
- Save blueprints to a local SQLite database
- Browse and manage idea history
- Copy full blueprint as JSON
- Random example idea filler for quick demos
- Fully responsive — works on mobile and desktop
- Works completely offline with no API keys required

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | FastAPI, Uvicorn, Pydantic v2 |
| Database | SQLite via SQLAlchemy ORM |
| HTTP Client | Axios (frontend), httpx (backend) |
| Deployment | Render (backend), Vercel (frontend) |

---

## Project Structure

```
launchforge-ai/
├── backend/
│   ├── main.py            # FastAPI app and route definitions
│   ├── generator.py       # Domain detection and blueprint generation engine
│   ├── database.py        # SQLAlchemy models and database session
│   ├── models.py          # Pydantic request and response schemas
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vercel.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api.js          # Fetch wrapper for all API calls
│       ├── index.css       # Global styles, animations, utility classes
│       └── components/
│           ├── Navbar.jsx
│           ├── Hero.jsx
│           ├── IdeaForm.jsx
│           ├── ResultCard.jsx
│           ├── HistoryPanel.jsx
│           ├── FeatureCard.jsx
│           └── Footer.jsx
├── render.yaml             # Render.com deployment config
├── .env.example
└── README.md
```

---

## Getting Started

### Prerequisites

- Python 3.10, 3.11, or 3.12 recommended (3.14 has known compatibility issues with SQLAlchemy and pydantic-core)
- Node.js 18 or higher
- npm

On Fedora Linux:
```bash
sudo dnf install python3 python3-pip python3-virtualenv nodejs npm -y
```

On Ubuntu/Debian:
```bash
sudo apt install python3 python3-pip python3-venv nodejs npm -y
```

---

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp ../.env.example .env
uvicorn main:app --reload --port 8000
```

The backend will be available at `http://localhost:8000`.

You can verify it is running by visiting `http://localhost:8000/health` in your browser. You should see:

```json
{ "status": "ok", "service": "LaunchForge AI", "version": "1.0.0" }
```

The SQLite database file (`launchforge.db`) is created automatically on first run.

---

### Frontend Setup

Open a new terminal window:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

### Running Both Together

You need two terminals running simultaneously:

| Terminal 1 | Terminal 2 |
|---|---|
| `cd backend` | `cd frontend` |
| `source venv/bin/activate` | `npm run dev` |
| `uvicorn main:app --reload --port 8000` | |

---

## API Reference

All endpoints are served from `http://localhost:8000`.

### GET /health
Health check. Returns service status.

**Response:**
```json
{
  "status": "ok",
  "service": "LaunchForge AI",
  "version": "1.0.0"
}
```

---

### POST /generate
Generate a startup blueprint from an idea.

**Request body:**
```json
{
  "idea": "An app that helps remote teams stay in sync without meetings",
  "industry": "productivity",
  "target_audience": "Remote engineering teams"
}
```

`industry` and `target_audience` are optional. If omitted, the engine auto-detects the domain from the idea text.

**Response:** Full `StartupBlueprint` object (see `models.py` for schema).

---

### POST /save
Save a generated blueprint to the database.

**Request body:**
```json
{
  "idea": "original idea text",
  "blueprint": { }
}
```

---

### GET /history
Returns all saved blueprints, ordered by most recent first. Limited to 50 records.

---

### DELETE /history/{id}
Delete a saved blueprint by ID.

---

## How the Generator Works

There is no external AI API involved. The generation engine in `generator.py` works in four steps:

**1. Domain Detection**

The idea text is scanned against a keyword map for 13 domains. Each matching keyword adds one point to that domain's score. The highest-scoring domain wins.

```
idea: "fitness tracker for athletes"
keywords matched: "fitness" → health, "track" → analytics
winner: health domain
```

**2. Template Selection**

Each domain has a dedicated template containing pre-written problem statements, solution statements, feature lists, user personas, use cases, and more. These templates are written to be realistic and professional, not generic.

**3. Name Generation**

Meaningful words are extracted from the idea using regex, then combined with domain-specific adjectives and nouns in randomized patterns to produce a startup name.

**4. Randomized Variation**

UI/UX flows, backend architecture descriptions, and deployment suggestions are randomly selected from a pool of multiple well-written options. This means repeated inputs still produce varied output.

**On LLM integration:** The architecture is intentionally designed so that the `generate_blueprint` function in `generator.py` can be replaced with an LLM API call (OpenAI, Anthropic, etc.) with minimal code changes. The response schema and all downstream logic remain identical.

---

## Environment Variables

Copy `.env.example` to `.env` in the root and `frontend/.env.example` to `frontend/.env`.

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `sqlite:///./launchforge.db` | Database connection string |
| `CORS_ORIGINS` | `http://localhost:5173` | Allowed frontend origins |
| `VITE_API_URL` | `http://localhost:8000` | Backend URL used by the frontend |

Optional (for future LLM integration):
```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
LLM_PROVIDER=openai
```

---

## Deployment

### Backend on Render

1. Push the repo to GitHub.
2. Create a new Web Service on [Render](https://render.com).
3. Set root directory to `backend`.
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables from `.env.example`.

Alternatively, use the included `render.yaml` for one-click deployment.

### Frontend on Vercel

1. Import the repo on [Vercel](https://vercel.com).
2. Set root directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`

The `frontend/vercel.json` file is already included and handles SPA routing rewrites.

---

## Roadmap

- LLM integration (OpenAI / Anthropic) for fully dynamic output
- PDF export of the generated blueprint
- Pitch deck outline generator
- Team collaboration and shared workspaces
- Idea scoring against market trends
- CLI version for terminal-first founders

---

## License

MIT License. Free to use, modify, and distribute.
