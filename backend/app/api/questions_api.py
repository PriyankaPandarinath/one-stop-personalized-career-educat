from fastapi import APIRouter
from app.database.questions_data import QUESTIONS_DATA

router = APIRouter()

@router.get("/questions")
def get_questions():
    return QUESTIONS_DATA