from app.core.psql_connection import engine, Base
from app.database.user_model import User, AptitudeQuestions, QuizSessions, QuizAnswers, Question, Option, UserResponse, CareerPath, UserCareerRecommendation, College, Scholarship

def create_schema():
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully.")

if __name__ == "__main__":
    create_schema()
