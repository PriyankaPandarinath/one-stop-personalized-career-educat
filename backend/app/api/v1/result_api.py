from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.database.questions_data import QUESTIONS_DATA

router = APIRouter()


class Answer(BaseModel):
    question_id: int
    selected_option: str


class TestSubmission(BaseModel):
    answers: List[Answer]


@router.post("/submit-test")
def submit_test(data: TestSubmission):
    stream_scores = {
        "science": 0,
        "commerce": 0,
        "arts": 0,
        "medical": 0,
        "architecture": 0,
        "nursing": 0,
    }

    for answer in data.answers:
        question = next(
            (q for q in QUESTIONS_DATA if q["id"] == answer.question_id), None
        )
        if question and question["answer"] == answer.selected_option:
            stream = question["stream"]
            stream_scores[stream] += 1

    recommended_stream = max(stream_scores, key=stream_scores.get)

    return {
        "scores": stream_scores,
        "recommended_career": recommended_stream,
        "ai_explanation": (
            f"You show strong aptitude for {recommended_stream}. "
            f"Your answers indicate skills and interests aligned with this career path."
        ),
    }
