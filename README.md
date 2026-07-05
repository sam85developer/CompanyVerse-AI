# CompanyVerse AI

**CompanyVerse AI** is an AI-powered Business Operating System where multiple AI executive agents collaborate to help startup founders plan and build companies.

This repository contains the initial project architecture, separating the **React Frontend** (styled with Tailwind CSS v4) and the **FastAPI Backend** (orchestrated with Google Agent Development Kit (ADK) and Gemini).

---

## Folder Structure

```text
companyverse-ai/
├── README.md                      # Architecture documentation and guides
├── backend/                       # FastAPI Python Backend
│   ├── requirements.txt           # Python backend dependencies
│   └── app/
│       ├── __init__.py            # Application package initializer
│       ├── main.py                # FastAPI endpoints, CORS, and boardroom routing
│       ├── config.py              # Configuration manager for Gemini API keys
│       └── agents/                # Google ADK agent stubs & directory structure
│           ├── __init__.py
│           ├── base.py            # Base ADK agent wrapper class
│           ├── ceo/
│           │   ├── __init__.py
│           │   └── agent.py       # Chief Executive Officer Agent (Strategy & Synthesis)
│           ├── cto/
│           │   ├── __init__.py
│           │   └── agent.py       # Chief Technology Officer Agent (Architecture & Roadmap)
│           ├── finance/
│           │   ├── __init__.py
│           │   └── agent.py       # Chief Financial Officer Agent (Revenue & Funding)
│           ├── marketing/
│           │   ├── __init__.py
│           │   └── agent.py       # Chief Marketing Officer Agent (Acquisition & Markets)
│           ├── security/
│           │   ├── __init__.py
│           │   └── agent.py       # Chief Information Security Officer Agent (Compliance & Safety)
│           ├── project_manager/
│           │   ├── __init__.py
│           │   └── agent.py       # Operations Lead Agent (Sprints & Timelines)
│           ├── legal/
│           │   ├── __init__.py
│           │   └── agent.py       # Chief Legal Officer Agent (Corporate Law & IP)
│           └── data_analyst/
│               ├── __init__.py
│               └── agent.py       # Analytics Lead Agent (Telemetry & Target KPIs)
└── frontend/                      # React SPA Frontend
    ├── package.json               # Frontend dependencies & scripts
    ├── vite.config.js             # Vite configuration with Tailwind v4 support
    ├── index.html                 # Main HTML entry with premium Google Fonts
    └── src/
        ├── index.css              # Global styles, Tailwind v4 imports, and Glassmorphism utilities
        ├── main.jsx               # React bootstrapping file
        ├── App.jsx                # Main landing page, forms, and controller loops
        └── components/
            ├── AgentDashboardCard.jsx # Reusable glassmorphic cards for the 8 executive agents
            ├── MultiAgentExecutionDashboard.jsx # Real-time communication simulation & log console
            └── ResultsDashboard.jsx # Modern results display covering all 12 operational sectors
```

---

## File Explanations

### Backend
1. **`backend/requirements.txt`**: Standard Python requirements declaring dependencies for `fastapi`, `uvicorn`, and `google-adk` (Google's Agent Development Kit) to compile LLM reasoning steps.
2. **`backend/app/main.py`**: Initializes the FastAPI app, manages CORS origins for local web development, and implements `/api/v1/build-company` which runs the collaborative agent orchestration loop.
3. **`backend/app/config.py`**: Reads local configurations and securely binds keys like `GEMINI_API_KEY` for ADK execution.
4. **`backend/app/agents/base.py`**: A generic wrapper class `CompanyVerseAgent` that initializes the Google ADK `Agent` instance (`from google.adk import Agent`) with custom system prompts, models, and tools.
5. **`backend/app/agents/` (Specific Directories)**: Holds specialized agent sub-modules for CEO, CTO, Finance, Marketing, Security, Project Manager, Legal, and Data Analyst roles. Each inherits from `CompanyVerseAgent`.

### Frontend
1. **`frontend/package.json`**: Manages node scripts and dependencies, loading React, Vite, Tailwind CSS v4, and Lucide React.
2. **`frontend/vite.config.js`**: Integrates Vite plugins: `@vitejs/plugin-react` for rendering components and `@tailwindcss/vite` for Tailwind CSS v4 compilation.
3. **`frontend/index.html`**: Root markup that sets the page metadata and injects Google Fonts (Inter and Outfit) for modern typography.
4. **`frontend/src/index.css`**: Configures Tailwind v4 (`@import "tailwindcss"`) and defines premium glassmorphic UI classes, custom neon gradients, and floating animation keyframes.
5. **`frontend/src/App.jsx`**: Core landing page. Coordinates the boardroom simulation by updating the active agent's status dynamically, appending terminal log statements, and revealing the results dashboard.
6. **`frontend/src/components/AgentDashboardCard.jsx`**: Interactive card representing each agent role, showing their current operation, a progress indicator, and active status.
7. **`frontend/src/components/MultiAgentExecutionDashboard.jsx`**: Visually maps out the agent network with pulsating SVG lanes and terminal consoles.
8. **`frontend/src/components/ResultsDashboard.jsx`**: Beautifully groups the 12 modern results segments (Tech Stack, Funding Plan, Competitor Analysis, etc.) into glassmorphic cards, presenting a detailed roadmap.

---

## Getting Started

### 1. Run the FastAPI Backend
To launch the FastAPI server, ensure you have Python 3.10+ installed:

```bash
cd backend
python -m venv venv
# Activate on Windows:
.\venv\Scripts\activate
# Install dependencies:
pip install -r requirements.txt

# Run the app:
uvicorn app.main:app --reload --port 8000
```
The API documentation will be available at `http://127.0.0.1:8000/docs`.

### 2. Run the React Frontend
Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
*(Note: If the backend server is not running, the frontend automatically falls back to client-side agent simulations so the visual boardroom is always interactive).*
