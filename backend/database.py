from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# The engine is the physical connection to the database
engine = create_engine(DATABASE_URL)

# The session is our workspace for database operations
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# This Base class is what our models will inherit from
Base = declarative_base()


# Generator function 
def get_db():
    db = SessionLocal()
    try:
        yield db #hands the session to the route handler and waits (pauses)
    finally:
        db.close() #runs after the route function finishes even if it generated an error guaranteeing the session always gets closed

