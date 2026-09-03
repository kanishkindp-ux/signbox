from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from database import engine, Base, get_db
from sqlalchemy.orm import Session
import models
from fastapi.middleware.cors import CORSMiddleware
from auth import hash_password, verify_password, create_access_token, decode_access_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

#application instance
app = FastAPI()

#CORS - cross origin resource sharing (by default JS cant request data from a different address)
# we have to explicitly allow the frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"], #allow all methods GET, POST, PUT, DELETE
    allow_headers=["*"], #allow all headers
)

#looks at every class that inherits from Base (all your models) and issues the equivalent CREATE TABLE statements to Postgres — but only for tables that don't already exist.
Base.metadata.create_all(bind=engine)

# 1. This tells FastAPI to actively look for an "Authorization: Bearer <token>" header on incoming requests.
security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    # 2. Extract the raw token string from the request header
    token = credentials.credentials
    
    # 3. Hand the token to our auth.py function to verify the signature and expiration
    payload = decode_access_token(token)
    
    # 4. If the token was tampered with or expired, decode_access_token returns None. Kick them out.
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
        
    # 5. Extract the user ID ("sub") from the decoded payload
    user_id = payload.get("sub")
    
    # 6. Check the database. Just because the token is valid mathematically doesn't 
    # mean the user hasn't been deleted from our database since they logged in!
    user = db.query(models.User).filter(models.User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=401, detail="User no longer exists")
        
    # 7. If they pass all checks, hand the actual User database object to the route.
    return user

#when someone sends HTTP GET request to URL '/' run the following function
@app.get("/")
def read_root():
    return {"message": "SignBox API running"}


#Fetch all documents 
@app.get("/documents")
def get_document(db: Session = Depends(get_db)): #FastAPI's dependency injection - runs get_db and passes the yielded database session into the function as db
    return db.query(models.Document).all()
    

#Fetch document by document_id
@app.get("/documents/{document_id}")
def get_documents(document_id: int, db: Session = Depends(get_db)):
    doc = db.query(models.Document).filter(models.Document.id == document_id).first()

    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

#POST request for new document creation - FastAPI uses Pydantic for checking the incoming JSON to verify the incoming data - data must match the blueprint (class)

#pydantic blueprint for incoming data validation
class DocumentCreate(BaseModel):
    title: str
    file_path: str
    owner_id: int

@app.post("/documents")
def create_document(document: DocumentCreate, db: Session = Depends(get_db)):  
    new_doc = models.Document(
        title=document.title,
        file_path=document.file_path,
        owner_id=document.owner_id
    )
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)
    return new_doc

class UserCreate(BaseModel):
    email: str
    password: str


@app.post("/auth/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if(existing_user):
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.User(
        email = user.email,
        hashed_password = hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"id":new_user.id, "email":new_user.email}

class UserLogin(BaseModel):
    email: str
    password: str

@app.post("/auth/login")
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    # 1. Look up the single user by email
    user = db.query(models.User).filter(models.User.email == credentials.email).first()
    
    # 2. Check if user doesn't exist OR if the password hash fails verification
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    token = create_access_token({"sub": str(user.id)})

    # Standard OAuth2 format requires returning the token and its type
    return {"access_token": token, "token_type": "bearer"}


#protected route 
@app.get("/auth/me")
def get_me(current_user: models.User = Depends(get_current_user)):
    return {"id": current_user.id, "email": current_user.email}





