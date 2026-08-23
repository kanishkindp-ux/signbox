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