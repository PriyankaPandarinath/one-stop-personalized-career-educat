import os
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):

    # Database (optional - not needed for in-memory mode)
    DB_NAME: Optional[str] = "testdb"
    DB_HOST: Optional[str] = "localhost"
    DB_PORT: Optional[int] = 5432
    DB_PASS: Optional[str] = "password"
    DB_USER: Optional[str] = "postgres"

    # Clerk (optional - not needed for local dev)
    CLERK_SECRETE_KEY: Optional[str] = "test"
    JWT_KEY: Optional[str] = "test"

    # OpenRouter (optional - not needed for response-bank AI)
    OPENROUTER_API_KEY: Optional[str] = "test"
    OPENROUTER_ENDPOINT: Optional[str] = "https://openrouter.ai/api/v1"

    class Config:
        env_file = os.path.join(os.path.dirname(__file__), "../../.env")
        env_file_encoding = "utf-8"
        extra = "ignore"


settings = Settings()
