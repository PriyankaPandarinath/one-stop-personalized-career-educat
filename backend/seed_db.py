from app.core.psql_connection import SessionLocal
from app.database.user_model import College, Scholarship, AptitudeQuestions, CareerPath
from app.database.colleges_data import COLLEGES_DATA
from app.database.scholarships_data import SCHOLARSHIPS_DATA
from app.database.questions_data import QUESTIONS_DATA
from app.database.careers_data import CAREERS_DATA

def seed():
    db = SessionLocal()
    try:
        # Seed Colleges
        if db.query(College).count() == 0:
            print("Seeding Colleges...")
            for c in COLLEGES_DATA:
                college = College(
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
                db.add(college)
            db.commit()

        # Seed Scholarships
        if db.query(Scholarship).count() == 0:
            print("Seeding Scholarships...")
            for s in SCHOLARSHIPS_DATA:
                scholarship = Scholarship(
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
                db.add(scholarship)
            db.commit()

        # Seed Aptitude Questions
        if db.query(AptitudeQuestions).count() == 0:
            print("Seeding Aptitude Questions...")
            for q in QUESTIONS_DATA:
                question = AptitudeQuestions(
                    question_text=q["question"],
                    options=q["options"],
                    correct_answer=q["answer"],
                    difficulty="easy", # Default as questions_data doesn't have it
                    category="quantitative", # Default as questions_data doesn't have it
                    field=q["stream"]
                )
                db.add(question)
            db.commit()

        # Seed Career Paths
        if db.query(CareerPath).count() == 0:
            print("Seeding Career Paths...")
            for stream, data in CAREERS_DATA.items():
                for c in data["careers"]:
                    career = CareerPath(
                        career_name=c["name"],
                        description=c["description"],
                        field=stream
                    )
                    db.add(career)
            db.commit()

        print("Seeding complete successfully.")
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
