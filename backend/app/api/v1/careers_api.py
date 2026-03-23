from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.psql_connection import get_db
from app.database.user_model import CareerPath
from app.database.careers_data import CAREERS_DATA

router = APIRouter(prefix="/v1/careers", tags=["Careers"])


# ───────────── Utility: Seed Careers ─────────────

def seed_careers_if_empty(db: Session):
    count = db.query(CareerPath).count()
    if count == 0:
        print("Seeding career paths...")
        for stream, data in CAREERS_DATA.items():
            # For each stream, we might have multiple careers.
            # The model has career_name, description, field.
            # We can use the stream as the 'field'.
            for career in data.get("careers", []):
                new_career = CareerPath(
                    career_name=career["name"],
                    description=career["description"],
                    field=stream
                )
                db.add(new_career)
        db.commit()
        print("Seeding complete.")


# ───────────── GET Endpoints ─────────────

@router.get("")
def get_all_careers(db: Session = Depends(get_db)):
    seed_careers_if_empty(db)
    careers = db.query(CareerPath).all()
    
    # Format back to the nested structure if the frontend expects it
    # or just return the list. Based on previous API, it returned CAREERS_DATA.
    # Let's try to reconstruct the structure for compatibility.
    
    result = {}
    for c in careers:
        if c.field not in result:
            result[c.field] = {
                "description": CAREERS_DATA.get(c.field, {}).get("description", ""),
                "careers": []
            }
        
        # Find original data for extra fields like salary, growth, etc.
        orig = next((oc for oc in CAREERS_DATA.get(c.field, {}).get("careers", []) if oc["name"] == c.career_name), {})
        
        result[c.field]["careers"].append({
            "name": c.career_name,
            "description": c.description,
            "salary": orig.get("salary", "N/A"),
            "growth": orig.get("growth", "N/A"),
            "skills": orig.get("skills", []),
            "companies": orig.get("companies", []),
            "education": orig.get("education", "N/A")
        })
    
    return result


@router.get("/{stream}")
def get_careers_by_stream(stream: str, db: Session = Depends(get_db)):
    seed_careers_if_empty(db)
    stream_lower = stream.lower()
    
    careers = db.query(CareerPath).filter(CareerPath.field == stream_lower).all()
    
    if not careers:
         return {"error": f"Stream '{stream}' not found."}
         
    result_list = []
    for c in careers:
        orig = next((oc for oc in CAREERS_DATA.get(stream_lower, {}).get("careers", []) if oc["name"] == c.career_name), {})
        result_list.append({
            "name": c.career_name,
            "description": c.description,
            "salary": orig.get("salary", "N/A"),
            "growth": orig.get("growth", "N/A"),
            "skills": orig.get("skills", []),
            "companies": orig.get("companies", []),
            "education": orig.get("education", "N/A")
        })
        
    return {stream_lower: {"description": CAREERS_DATA.get(stream_lower, {}).get("description", ""), "careers": result_list}}
