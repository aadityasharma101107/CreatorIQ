from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas
from database import engine, get_db
from auth import (
    get_password_hash,
    verify_password,
    create_access_token,
    get_current_user,
    require_role,
)

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CreatorIQ API",
    description="Creator Analytics & Content Performance Dashboard Backend",
    version="1.0.0",
)

# Allow React Vite frontend (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VALID_ROLES = {"creator", "agency", "marketing_team", "admin"}

@app.get("/")
def health_check():
    return {"status": "online", "service": "CreatorIQ FastAPI Backend"}

# --- 1. Authentication & User Management ---
@app.post("/api/auth/register", response_model=schemas.TokenResponse, status_code=status.HTTP_201_CREATED)
def register(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    if user_in.role not in VALID_ROLES:
        raise HTTPException(status_code=400, detail=f"Invalid role. Choose from {VALID_ROLES}")

    existing_user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.User(
        full_name=user_in.full_name,
        email=user_in.email,
        password_hash=get_password_hash(user_in.password),
        role=user_in.role,
        organization_name=user_in.organization_name,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token(data={"sub": new_user.email, "role": new_user.role})
    return {"access_token": token, "user": new_user}

@app.post("/api/auth/login", response_model=schemas.TokenResponse)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(data={"sub": user.email, "role": user.role})
    return {"access_token": token, "user": user}

@app.get("/api/auth/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user

# --- 2. Dashboard Analytics Overview (Protected Route) ---
@app.get("/api/dashboard/overview")
def get_dashboard_overview(
    platform: str = "all",
    current_user: models.User = Depends(get_current_user),
):
    # Structured KPI & Chart payload for Milestone 1 Dashboard Visualizations
    return {
        "user": {
            "name": current_user.full_name,
            "role": current_user.role,
        },
        "selected_platform": platform,
        "kpis": {
            "total_followers": 124500,
            "followers_growth": "+4.2%",
            "total_views": 842100,
            "views_growth": "+12.8%",
            "engagement_rate": 6.4,
            "engagement_growth": "+0.8%",
            "monthly_revenue_inr": 85400,
            "revenue_growth": "+15.0%",
        },
        "growth_trend": [
            {"date": "Mon", "views": 95000, "followers": 121200},
            {"date": "Tue", "views": 112000, "followers": 121850},
            {"date": "Wed", "views": 108000, "followers": 122300},
            {"date": "Thu", "views": 134000, "followers": 122900},
            {"date": "Fri", "views": 149000, "followers": 123500},
            {"date": "Sat", "views": 121000, "followers": 124050},
            {"date": "Sun", "views": 123100, "followers": 124500},
        ],
        "platform_engagement": [
            {"platform": "YouTube", "likes": 42000, "comments": 5400, "shares": 8200},
            {"platform": "Instagram", "likes": 68000, "comments": 9100, "shares": 14500},
            {"platform": "LinkedIn", "likes": 12400, "comments": 1850, "shares": 3100},
            {"platform": "X (Twitter)", "likes": 19200, "comments": 2400, "shares": 4900},
        ],
        "top_content": [
            {
                "id": 1,
                "title": "Building Scalable REST APIs with FastAPI",
                "platform": "YouTube",
                "views": 145000,
                "engagement_rate": 7.8,
                "watch_time_hrs": 8420,
            },
            {
                "id": 2,
                "title": "5 React Performance Hooks You Missed",
                "platform": "Instagram",
                "views": 92400,
                "engagement_rate": 8.2,
                "watch_time_hrs": 3150,
            },
            {
                "id": 3,
                "title": "System Design Roadmap for 2026",
                "platform": "LinkedIn",
                "views": 54200,
                "engagement_rate": 5.9,
                "watch_time_hrs": 1890,
            },
            {
                "id": 4,
                "title": "JWT vs Session Authentication Explained",
                "platform": "YouTube",
                "views": 78900,
                "engagement_rate": 6.7,
                "watch_time_hrs": 4910,
            },
        ],
        "connected_accounts": [
            {"platform": "YouTube", "handle": "@AadityaTech", "status": "connected", "last_sync": "10 mins ago"},
            {"platform": "Instagram", "handle": "@aaditya.codes", "status": "connected", "last_sync": "25 mins ago"},
            {"platform": "LinkedIn", "handle": "Aaditya Sharma", "status": "connected", "last_sync": "1 hour ago"},
            {"platform": "X (Twitter)", "handle": "@sharma_aaditya", "status": "disconnected", "last_sync": "Never"},
        ],
    }

# --- 3. Role-Protected Admin/Agency Test Endpoint ---
@app.get("/api/admin/users", response_model=list[schemas.UserResponse])
def list_all_users(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role(["admin", "agency"])),
):
    return db.query(models.User).all()