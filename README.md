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
