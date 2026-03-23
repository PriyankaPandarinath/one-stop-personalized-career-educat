from fastapi import APIRouter

from .v1.aptitude import router as aptitude_router
from .v1.colleges_api import router as colleges_router
from .v1.scholarships_api import router as scholarships_router
from .v1.careers_api import router as careers_router
from .v1.chat_api import router as chat_router
from .v1.user_api import router as user_router

api_router = APIRouter()

api_router.include_router(aptitude_router)
api_router.include_router(colleges_router)
api_router.include_router(scholarships_router)
api_router.include_router(careers_router)
api_router.include_router(chat_router)
api_router.include_router(user_router)

__all__ = ["api_router"]