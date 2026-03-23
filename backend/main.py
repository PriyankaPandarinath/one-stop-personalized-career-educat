import os
from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware

from app.api import api_router
from app.api.questions_api import router as questions_router
from app.api.v1.result_api import router as result_router

# Create FastAPI app
app = FastAPI(
    title="Career Advisor API",
    description="One-Stop Personalized Career & Education Advisor Backend",
    version="1.0.0",
)

# CORS configuration for React frontend
# Allow local dev + production Vercel URL
_frontend_url = os.getenv("FRONTEND_URL", "")
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
]
if _frontend_url:
    origins.append(_frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api_router)
app.include_router(questions_router)
app.include_router(result_router)


@app.get("/favicon.ico")
async def favicon():
    """Prevents favicon 404 logs"""
    return Response(status_code=status.HTTP_200_OK)


@app.get("/")
async def health():
    return {"message": "Career Advisor API Running"}
