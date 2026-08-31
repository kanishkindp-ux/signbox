from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from database import engine, Base, get_db
from sqlalchemy.orm import Session
import models
from fastapi.middleware.cors import CORSMiddleware
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

#when someone sends HTTP GET request to URL '/' run the following function
@app.get("/")
def read_root():
    return {"message": "SignBox API running"}

fake_document = [
    {"id":1, "title": "Freelance Contract.pdf", "status": "Draft"},
    {"id":2, "title": "NDA Agreement.pdf", "status": "Pending"},
]

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



