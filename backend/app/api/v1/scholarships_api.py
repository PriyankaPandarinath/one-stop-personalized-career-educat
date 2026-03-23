from fastapi import APIRouter, Query, Depends
from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.core.psql_connection import get_db
from app.database.user_model import Scholarship
from app.database.scholarships_data import SCHOLARSHIPS_DATA

router = APIRouter(prefix="/v1/scholarships", tags=["Scholarships"])


# ───────────── Utility: Seed Scholarships ─────────────

def seed_scholarships_if_empty(db: Session):
    count = db.query(Scholarship).count()
    if count == 0:
        print("Seeding scholarships...")
        for s in SCHOLARSHIPS_DATA:
            new_sch = Scholarship(
                name=s["name"],
                provider=s["provider"],
                amount=s["amount"],
                deadline=s["deadline"],
                category=s["category"],
                eligibility=s["eligibility"],
                description=s["description"],
                appliedCount=s["appliedCount"],
                link=s["link"]
            )
            db.add(new_sch)
        db.commit()
        print("Seeding complete.")


# ───────────── GET Endpoints ─────────────

@router.get("")
def get_scholarships(
    category: Optional[str] = Query(None, description="Filter by category: merit, need, government, private"),
    search: Optional[str] = Query(None, description="Search by name or provider"),
    db: Session = Depends(get_db)
):
    seed_scholarships_if_empty(db)
    query = db.query(Scholarship)

    if category and category != "all":
        query = query.filter(Scholarship.category == category)

    if search:
        search_lower = f"%{search}%"
        query = query.filter(
            or_(
                Scholarship.name.ilike(search_lower),
                Scholarship.provider.ilike(search_lower)
            )
        )

    return query.all()


@router.get("/{scholarship_id}")
def get_scholarship(scholarship_id: int, db: Session = Depends(get_db)):
    seed_scholarships_if_empty(db)
    sch = db.query(Scholarship).filter(Scholarship.id == scholarship_id).first()
    if sch:
        return sch
    return {"error": "Scholarship not found"}
