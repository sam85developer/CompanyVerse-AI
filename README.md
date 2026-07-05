# CompanyVerse-AI

An advanced, interactive multi-agent Business Operating System (BOS) where specialized AI executive agents collaborate to generate, plan, build, and simulate startups from a single user-provided idea.

CompanyVerse-AI leverages a fully **data-driven `StartupContext` architecture**, decoupling generation and industry logic from UI rendering. Adding support for new startup domains requires zero code changes.

---

## 🚀 Key Features

- **Dynamic Startup Classification**: Dynamic keyword parsing dynamically maps prompts to complex verticals (Healthcare, FinTech, LegalTech, Precision Agriculture, Veterinary Services, EdTech, Cybersecurity) with domain-specific terminology.
- **Collaborative Board of AI Agents**: Visual representation of the active executive board (CEO, CTO, CFO, CMO, CISO, PM/Operations, Legal, and Data Analyst Agents) with role descriptions linked to the active vertical.
- **Dynamic Kanban Development Board**: Staged task board (Completed, In Progress, Backlog) showing operational tasks being managed by specific executive agents (e.g. backend routers, database encryption, compliance guidelines).
- **Interactive Workspace & Logs Terminal**: Real-time terminal log viewer showcasing detailed mock workspace outputs (Webpack bundlers, SQL migrations, security audits, OPEX model simulations).
- **Comprehensive Business Analysis**: Formatted panels displaying Mission, Vision, Target Market, Competitor Analysis, Marketing Strategy, Tech Stack, Roadmap, Funding Goals, and Risk Mitigation Plans.

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite-powered, ES6+ modules), Tailwind CSS v4, Lucide React (icons), and responsive glassmorphism UI styles.
- **Backend**: FastAPI (Python), Uvicorn server, and Pydantic schema validation.

---

## 📦 Directory Structure

```text
companyverse-ai/
├── backend/
│   ├── app/
│   │   ├── agents/          # Individual agent prompt definitions
│   │   ├── config.py        # Environment variables & constants
│   │   └── main.py          # FastAPI application & StartupContext engine
│   └── requirements.txt     # Python backend dependencies
└── frontend/
    ├── src/
    │   ├── components/      # UI components (Workspace, Results, Agent Cards)
    │   ├── App.jsx          # React main component & fallback mocks
    │   ├── main.jsx         # React application bootstrap entrypoint
    │   └── index.css        # Tailwind styles & premium CSS design tokens
    └── package.json         # Node.js frontend dependencies
```

---

## ⚙️ Running Locally

### Prerequisites
- Python 3.8+
- Node.js 16+

### 1. Launch the Backend API
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```
The backend server will run at `http://127.0.0.1:8000`.

### 2. Launch the Frontend Dev Client
```bash
cd frontend
npm install
npm run dev
```
The frontend dev server will launch at `http://127.0.0.1:5173`.

---

## 🧪 Running Verification Tests

To verify vertical classification, grammar, B2C Fintech guidelines, and the absence of human healthcare terminology leakage in the Veterinary/Agriculture segments:

```bash
cd backend
.\venv\Scripts\python.exe path/to/verify_verticals.py
```
