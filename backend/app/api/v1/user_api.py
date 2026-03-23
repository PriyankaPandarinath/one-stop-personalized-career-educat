from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.psql_connection import get_db
from app.database.user_model import User

router = APIRouter(prefix="/v1/user", tags=["User"])


@router.get("/me")
def get_current_user(db: Session = Depends(get_db)):
    # In a real app, this would get the ID from a JWT token.
    # For now, we fetch a default user or the first user in the DB.
    user = db.query(User).filter(User.id == 1).first()
    
    if not user:
        # Create a default student user if none exists for development purposes
        user = User(
            id=1,
            clerk_id="dev_user_123",
            name="Student",
            email="student@learnify.com",
            is_verified=True,
            first_name="Student",
            last_name="User"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "picture": user.picture,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "is_verified": user.is_verified,
    }
