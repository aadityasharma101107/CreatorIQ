# CreatorIQ — Creator Analytics & Content Performance Dashboard

**CreatorIQ** is a centralized Content Intelligence Platform designed for content creators, influencer agencies, and digital marketing teams to track multi-platform social media performance, audience engagement, content growth, and monetization insights in one unified dashboard.

---

## Key Features (Milestone 1)

- **Authentication & Role-Based Access Control (RBAC):**
  - Secure user registration and login using JWT Bearer tokens and `bcrypt` password hashing.
  - Supports four distinct RBAC roles: `creator` (Content Creator), `agency` (Influencer Agency), `marketing_team` (Marketing Team), and `admin` (Administrator).
  - Protected frontend routes (`/dashboard`) and role-guarded backend endpoints.
- **Interactive Analytics Overview:**
  - **KPI Monitoring Cards:** Tracks Total Followers, 30-Day Views, Average Engagement Rate, and Monthly Revenue with period-over-period growth indicators.
  - **Data Visualizations:** Interactive Recharts Area Chart (*Weekly Views Growth Trend*) and Grouped Bar Chart (*Engagement by Platform* comparing likes and shares).
- **Content Performance Tracking:**
  - Detailed breakdown of top-performing posts across YouTube, Instagram, and LinkedIn with Views, Engagement Rate, and Watch Time metrics.
- **Social Media Integrations View:**
  - Multi-platform connection status cards (YouTube, Instagram, LinkedIn, X/Twitter) displaying linked handles and last synchronization timestamps.
- **System Design & Documentation:**
  - Complete technical documentation covering objectives, system architecture, 7-table DBML database schema, and UI wireframes.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js (Vite), Tailwind CSS v4, Recharts, Axios, React Router, Lucide React |
| **Backend** | Python 3.13, FastAPI, SQLAlchemy, Pydantic, JWT Authentication, `bcrypt`, Uvicorn |
| **Database** | SQLite (`creatoriq.db` for local dev); PostgreSQL, MongoDB & Redis planned for later milestones |

---

## Repository Structure

```text
creatoriq/
├── docs/
│   ├── 01_objectives_and_workflows.md   # Project objectives, user roles & workflows
│   ├── 02_architecture.md               # System architecture diagram (Mermaid)
│   ├── 03_database_schema.dbml          # Relational schema (7 tables for dbdiagram.io)
│   └── 04_ui_wireframes.md              # ASCII wireframes & UI specifications
├── backend/
│   ├── main.py                          # FastAPI app & API route definitions
│   ├── database.py                      # SQLAlchemy engine & session setup
│   ├── models.py                        # ORM database models (User, RBAC roles)
│   ├── schemas.py                       # Pydantic request/response schemas
│   ├── auth.py                          # Password hashing, JWT & RBAC dependencies
│   └── creatoriq.db                     # Local SQLite database (auto-generated)
├── frontend/
│   ├── vite.config.js                   # Vite + Tailwind CSS configuration
│   └── src/
│       ├── api.js                       # Axios client with JWT Bearer interceptor
│       ├── App.jsx                      # Routing & ProtectedRoute wrapper
│       ├── index.css                    # Tailwind CSS entry file
│       └── pages/
│           ├── AuthPage.jsx             # Login & Registration with Role selector
│           └── Dashboard.jsx            # Main analytics dashboard, charts & tabs
└── README.md
```

---

## Local Setup & Installation

### Prerequisites
- **Python** 3.10+
- **Node.js** 18+ and **npm**

### 1. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy pydantic "bcrypt==4.0.1" python-jose[cryptography] email-validator

# Run the FastAPI server
uvicorn main:app --reload
```

- Backend API runs at: `http://127.0.0.1:8000`
- Interactive Swagger API Docs: `http://127.0.0.1:8000/docs`

### 2. Frontend Setup (React + Vite)

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

- Frontend application runs at: `http://localhost:5173`

---

## API Endpoints (Milestone 1)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user with a selected RBAC role |
| `POST` | `/api/auth/login` | Public | Authenticate user and return JWT access token |
| `GET` | `/api/auth/me` | Authenticated | Retrieve current logged-in user profile |
| `GET` | `/api/dashboard/overview` | Authenticated | Fetch dashboard KPI and analytics summary |
| `GET` | `/api/admin/users` | `admin` only | List all registered users (RBAC protected) |

---

## Development Roadmap

- [x] **Milestone 1 (Weeks 1–2):** Project initialization, system architecture, DBML schema, UI wireframes, FastAPI + JWT/RBAC auth, and interactive React analytics dashboard.
- [ ] **Milestone 2 (Weeks 3–4):** Engagement tracking workflows, audience demographics reports, growth/trend charts, and YouTube/Instagram API integrations.
- [ ] **Milestone 3 (Weeks 5–6):** Revenue & sponsorship tracking, monetization analytics, alert/notification system, and PDF/Excel report exports.
- [ ] **Milestone 4 (Weeks 7–8):** End-to-end testing, performance optimization, Docker containerization, and AWS/Azure cloud deployment.
