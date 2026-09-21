from contextlib import asynccontextmanager
from typing import List
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, get_db
import models
import schemas

# Create database tables
Base.metadata.create_all(bind=engine)


def seed_database(db: Session):
    existing_count = db.query(models.Issue).count()
    if existing_count == 0:
        seed_issues = [
            models.Issue(
                title="Fix CORS policy header mismatch in Auth microservice",
                description="Authentication requests fail when origin is port 5173 during cross-domain token refresh flow.",
                priority="Critical",
                status="To Do",
                assignee="Backend Lead",
            ),
            models.Issue(
                title="Implement dark mode theme switch and persistent settings",
                description="Add CSS variable toggles and save user preference in localStorage for seamless mode switching.",
                priority="Medium",
                status="To Do",
                assignee="Frontend Team",
            ),
            models.Issue(
                title="Optimize database query latency for dashboard stats widget",
                description="Aggregated statistics endpoint takes >800ms under load. Add composite indices on status and priority.",
                priority="High",
                status="In Progress",
                assignee="DevOps / Data",
            ),
            models.Issue(
                title="Upgrade React dependencies to v18.3 and audit bundle size",
                description="Successfully bumped core packages and removed deprecated lifecycles. Bundle size reduced by 14%.",
                priority="Low",
                status="Done",
                assignee="Frontend Team",
            ),
        ]
        db.add_all(seed_issues)
        db.commit()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Seed database if empty
    db = next(get_db())
    try:
        seed_database(db)
    finally:
        db.close()
    yield


app = FastAPI(
    title="DevTrack API",
    description="Issue Tracker & Agile Board Backend API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS Middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/issues", response_model=List[schemas.IssueResponse])
def get_issues(db: Session = Depends(get_db)):
    return (
        db.query(models.Issue)
        .order_by(models.Issue.created_at.desc(), models.Issue.id.desc())
        .all()
    )


@app.post(
    "/api/issues",
    response_model=schemas.IssueResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_issue(issue: schemas.IssueCreate, db: Session = Depends(get_db)):
    db_issue = models.Issue(
        title=issue.title,
        description=issue.description,
        priority=issue.priority,
        status=issue.status,
        assignee=issue.assignee,
    )
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    return db_issue


@app.patch("/api/issues/{issue_id}/status", response_model=schemas.IssueResponse)
def update_issue_status(
    issue_id: int, payload: schemas.IssueStatusUpdate, db: Session = Depends(get_db)
):
    valid_statuses = ["To Do", "In Progress", "Done"]
    if payload.status not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status '{payload.status}'. Allowed values: {valid_statuses}",
        )

    db_issue = db.query(models.Issue).filter(models.Issue.id == issue_id).first()
    if not db_issue:
        raise HTTPException(status_code=404, detail="Issue not found")

    db_issue.status = payload.status
    db.commit()
    db.refresh(db_issue)
    return db_issue


@app.delete("/api/issues/{issue_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_issue(issue_id: int, db: Session = Depends(get_db)):
    db_issue = db.query(models.Issue).filter(models.Issue.id == issue_id).first()
    if not db_issue:
        raise HTTPException(status_code=404, detail="Issue not found")

    db.delete(db_issue)
    db.commit()
    return None
