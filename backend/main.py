from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
import json
import os

from database import get_db, create_tables, IdeaDB
from models import GenerateRequest, SaveRequest, StartupBlueprint, IdeaRecord
from generator import generate_blueprint

app = FastAPI(
    title="LaunchForge AI",
    description="Transform a rough startup idea into a launch-ready product blueprint.",
    version="1.0.0",
)

CORS_ORIGINS = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:3000,http://localhost:4173"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    create_tables()


# ─────────────────────────────────────
# Health
# ─────────────────────────────────────

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "LaunchForge AI", "version": "1.0.0"}


# ─────────────────────────────────────
# Generate Blueprint
# ─────────────────────────────────────

@app.post("/generate", response_model=StartupBlueprint)
def generate_startup(request: GenerateRequest):
    if not request.idea or len(request.idea.strip()) < 5:
        raise HTTPException(status_code=400, detail="Please provide a meaningful idea (at least 5 characters).")
    if len(request.idea) > 1000:
        raise HTTPException(status_code=400, detail="Idea is too long. Keep it under 1000 characters.")

    blueprint = generate_blueprint(
        idea=request.idea.strip(),
        industry=request.industry,
        target_audience=request.target_audience,
    )
    return blueprint


# ─────────────────────────────────────
# Save an Idea
# ─────────────────────────────────────

@app.post("/save", response_model=IdeaRecord)
def save_idea(request: SaveRequest, db: Session = Depends(get_db)):
    record = IdeaDB(
        idea=request.idea,
        startup_name=request.blueprint.startup_name,
        elevator_pitch=request.blueprint.elevator_pitch,
        blueprint_json=json.dumps(request.blueprint.model_dump()),
        created_at=datetime.utcnow(),
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return IdeaRecord(
        id=record.id,
        idea=record.idea,
        startup_name=record.startup_name,
        elevator_pitch=record.elevator_pitch,
        blueprint_json=record.blueprint_json,
        created_at=record.created_at.isoformat(),
    )


# ─────────────────────────────────────
# Get History
# ─────────────────────────────────────

@app.get("/history", response_model=list[IdeaRecord])
def get_history(db: Session = Depends(get_db)):
    records = db.query(IdeaDB).order_by(IdeaDB.created_at.desc()).limit(50).all()
    return [
        IdeaRecord(
            id=r.id,
            idea=r.idea,
            startup_name=r.startup_name,
            elevator_pitch=r.elevator_pitch,
            blueprint_json=r.blueprint_json,
            created_at=r.created_at.isoformat(),
        )
        for r in records
    ]


# ─────────────────────────────────────
# Delete from History
# ─────────────────────────────────────

@app.delete("/history/{idea_id}")
def delete_idea(idea_id: int, db: Session = Depends(get_db)):
    record = db.query(IdeaDB).filter(IdeaDB.id == idea_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Idea not found.")
    db.delete(record)
    db.commit()
    return {"message": "Deleted successfully", "id": idea_id}
