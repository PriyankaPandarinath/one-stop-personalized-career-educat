from fastapi import APIRouter, Query, Depends
from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.core.psql_connection import get_db
from app.database.user_model import College
from app.database.colleges_data import COLLEGES_DATA

router = APIRouter(prefix="/v1/colleges", tags=["Colleges"])


# ───────────── Utility: Seed Colleges ─────────────

def seed_colleges_if_empty(db: Session):
    count = db.query(College).count()
    if count == 0:
        print("Seeding colleges...")
        for c in COLLEGES_DATA:
            new_college = College(
                name=c["name"],
                location=c["location"],
                state=c["state"],
                streams=c["streams"],
                rating=c["rating"],
                nirfRank=c["nirfRank"],
                type=c["type"],
                established=c["established"],
                description=c["description"],
                website=c["website"],
                highlights=c["highlights"]
            )
            db.add(new_college)
        db.commit()
        print("Seeding complete.")


# ───────────── GET Endpoints ─────────────

@router.get("")
def get_colleges(
    state: Optional[str] = Query(None, description="Filter by state"),
    stream: Optional[str] = Query(None, description="Filter by stream"),
    search: Optional[str] = Query(None, description="Search by name"),
    db: Session = Depends(get_db)
):
    seed_colleges_if_empty(db)
    query = db.query(College)

    if state and state != "All States":
        query = query.filter(College.state == state)

    if stream and stream != "All Streams":
        # Using SQLAlchemy's JSON contains or manual filter due to JSON structure
        # Since it's a small list, we can filter in python or use a specific JSON query
        # For simplicity and given the usage:
        query = query.filter(College.streams.contains([stream]))

    if search:
        query = query.filter(College.name.ilike(f"%{search}%"))

    return query.all()


@router.get("/{college_id}")
def get_college(college_id: int, db: Session = Depends(get_db)):
    seed_colleges_if_empty(db)
    college = db.query(College).filter(College.id == college_id).first()
    if college:
        return college
    return {"error": "College not found"}
