import uuid
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Dict, Optional, List
from sqlalchemy.orm import Session
from app.core.psql_connection import get_db
from app.database.user_model import User, AptitudeQuestions, QuizSessions, QuizAnswers, Category, DifficultyLevel
from app.database.questions_data import QUESTIONS_DATA

router = APIRouter(prefix="/v1/aptitude", tags=["Aptitude"])


# ───────────── Utility: Seed Questions ─────────────

def seed_questions_if_empty(db: Session):
    count = db.query(AptitudeQuestions).count()
    if count == 0:
        print("Seeding aptitude questions...")
        for q in QUESTIONS_DATA:
            # Map string category to Enum if possible, otherwise use a default
            try:
                # Expecting q["stream"] to match Category names like 'science', 'commerce', etc.
                # If not, we might need a mapping dictionary.
                cat_enum = Category[q["stream"]]
            except (KeyError, ValueError):
                cat_enum = Category.quantitative # Default

            new_q = AptitudeQuestions(
                question_text=q["question"],
                options=q["options"],
                correct_answer=q["answer"],
                category=cat_enum,
                field=f"{q['stream']}::{q.get('skill', 'general')}"
            )
            db.add(new_q)
        db.commit()
        print(f"Seeded {len(QUESTIONS_DATA)} questions.")


# ───────────── GET Endpoints ─────────────

@router.get("/questions")
def aptitude_questions(db: Session = Depends(get_db)):
    seed_questions_if_empty(db)
    questions = db.query(AptitudeQuestions).all()
    # Format for frontend compatibility
    return [
        {
            "id": str(q.id),
            "question": q.question_text,
            "options": q.options,
            "answer": q.correct_answer,
            "stream": q.field.split("::")[0] if q.field and "::" in q.field else "science",
            "skill": q.field.split("::")[1] if q.field and "::" in q.field else q.field
        }
        for q in questions
    ]


@router.get("/category-based/{category}/{skill}")
def get_questions_by_category(category: str, skill: str, db: Session = Depends(get_db)):
    seed_questions_if_empty(db)
    
    encoded_field = f"{category}::{skill}"
    questions = db.query(AptitudeQuestions).filter(
        AptitudeQuestions.field == encoded_field
    ).all()
    
    return [
        {
            "id": str(q.id),
            "question": q.question_text,
            "options": q.options,
            "answer": q.correct_answer,
            "stream": category,
            "skill": skill
        }
        for q in questions
    ]


# ───────────── Session / Submit / Report ─────────────

class StartSessionRequest(BaseModel):
    user_id: Optional[int] = 1


class SubmitRequest(BaseModel):
    session_id: str
    answers: Dict[str, str]  # { "question_id": "selected_option" }


@router.post("/start-session")
def start_session(data: StartSessionRequest, db: Session = Depends(get_db)):
    # Verify user exists or use default
    user = db.query(User).filter(User.id == data.user_id).first()
    if not user and data.user_id != 1:
         raise HTTPException(status_code=404, detail="User not found")
    
    new_session = QuizSessions(
        user_id=data.user_id if user else None,
        score=0
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    
    return {"session_id": str(new_session.id), "message": "Session started"}


@router.post("/submit")
def submit_answers(data: SubmitRequest, db: Session = Depends(get_db)):
    try:
        session_uuid = uuid.UUID(data.session_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid session ID format")

    session = db.query(QuizSessions).filter(QuizSessions.id == session_uuid).first()
    if not session:
        return {"error": "Session not found"}

    results_list = []
    score = 0

    for qid_str, selected in data.answers.items():
        try:
            qid_uuid = uuid.UUID(qid_str)
        except ValueError:
            continue

        question = db.query(AptitudeQuestions).filter(AptitudeQuestions.id == qid_uuid).first()
        if not question:
            continue

        is_correct = question.correct_answer == selected
        if is_correct:
            score += 1

        # Save answer
        new_answer = QuizAnswers(
            session_id=session.id,
            question_id=question.id,
            selected_option=selected,
            is_correct=is_correct
        )
        db.add(new_answer)

        results_list.append({
            "question_id": str(qid_uuid),
            "question_text": question.question_text,
            "selected_option": selected,
            "correct_answer": question.correct_answer,
            "is_correct": is_correct,
        })

    session.score = score
    db.commit()

    total = len(results_list)
    accuracy = round((score / total * 100), 1) if total > 0 else 0

    return {
        "score": score,
        "total": total,
        "accuracy": accuracy,
        "results": results_list,
    }

class SubmitTestAnswer(BaseModel):
    question_id: str
    selected_option: str

class SubmitTestRequest(BaseModel):
    user_id: int = 1
    answers: List[SubmitTestAnswer]

@router.post("/submit-test")
def submit_career_test(data: SubmitTestRequest, db: Session = Depends(get_db)):
    score = 0
    total = len(data.answers)
    stream_counts = {}
    
    # Create a session for this test
    new_session = QuizSessions(user_id=data.user_id, score=0)
    db.add(new_session)
    db.commit()
    db.refresh(new_session)

    for ans in data.answers:
        try:
            qid_uuid = uuid.UUID(ans.question_id)
        except ValueError:
            continue

        question = db.query(AptitudeQuestions).filter(AptitudeQuestions.id == qid_uuid).first()
        if not question:
             continue
             
        is_correct = question.correct_answer == ans.selected_option
        if is_correct:
            score += 1
            stream = question.field.split("::")[0] if question.field and "::" in question.field else "general"
            stream_counts[stream] = stream_counts.get(stream, 0) + 1
            
        # Save each answer
        new_answer = QuizAnswers(
            session_id=new_session.id,
            question_id=question.id,
            selected_option=ans.selected_option,
            is_correct=is_correct
        )
        db.add(new_answer)
            
    new_session.score = score
    db.commit()

    if stream_counts:
        best_stream = max(stream_counts, key=stream_counts.get)
        recommended_career = best_stream.capitalize()
        ai_explanation = f"Based on your answers, you showed strong aptitude in {best_stream}. You answered {score} out of {total} questions correctly overall, and most of your correct answers align with this field."
    else:
        recommended_career = "General Studies"
        ai_explanation = f"You answered {score} out of {total} questions correctly. We recommend exploring a variety of fields to find your true passion."
        
    return {
        "recommended_career": recommended_career,
        "ai_explanation": ai_explanation,
        "score": score,
        "total": total
    }

@router.get("/user-report/{user_id}")
def get_user_report(user_id: int, db: Session = Depends(get_db)):
    # Calculate aggregate stats from all sessions for this user
    sessions = db.query(QuizSessions).filter(QuizSessions.user_id == user_id).all()
    
    total_correct = 0
    total_answered = 0
    
    for s in sessions:
        ans_count = db.query(QuizAnswers).filter(QuizAnswers.session_id == s.id).count()
        total_correct += s.score
        total_answered += ans_count
        
    total_incorrect = total_answered - total_correct
    accuracy = round((total_correct / total_answered * 100), 1) if total_answered > 0 else 0
    
    return {
        "total_correct": total_correct,
        "total_incorrect": total_incorrect,
        "total_questions_answered": total_answered,
        "accuracy_percentage": accuracy,
    }