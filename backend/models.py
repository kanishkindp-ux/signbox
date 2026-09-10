from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from datetime import datetime, timezone
from database import Base
import secrets


#Models which inherit the class from Base model

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    # Why the lambda:? Because SQLAlchemy needs a function that it can "call" every time a new row is inserted. Since datetime.now() requires us to pass timezone.utc inside the parentheses, we wrap it in a quick lambda so SQLAlchemy can trigger it properly
    # use are using this instead of datetime.utcnow()

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    file_path = Column(String, unique=True, nullable=False)
    status = Column(String, nullable=False, default = "Draft")
    owner_id = Column(Integer, ForeignKey("users.id"), nullable = False)
    created_at = Column(DateTime, nullable = False, default=lambda: datetime.now(timezone.utc))

class SigningRequest(Base):
    __tablename__ = "signing_requests"
    
    id = Column(Integer, primary_key=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    signer_email  = Column(String, nullable=False)
    token = Column(String, unique=True, nullable=False, default=lambda: secrets.token_urlsafe(32))
    status = Column(String, nullable=False, default="Pending")
    signature_page = Column(Integer, default=1)
    signature_x = Column(Integer, default=100)
    signature_y = Column(Integer, default=50)
    created_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))

class Signature(Base):
    __tablename__ = "signatures"

    id = Column(Integer, primary_key=True)
    signing_request_id = Column(Integer, ForeignKey("signing_requests.id"), nullable=False)
    image_data = Column(Text, nullable=False)
    signed_at = Column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))

    