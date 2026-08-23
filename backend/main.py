from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import engine, Base
import models
#application instance
app = FastAPI()

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
def get_document():
    return fake_document

#Fetch document by document_id
@app.get("/documents/{document_id}")
def get_documents(document_id: int):
    for doc in fake_document:
        if doc["id"] == document_id:
            return doc
    raise HTTPException(status_code=404, detail="Document not found")

#POST request for new document creation - FastAPI uses Pydantic for checking the incoming JSON to verify the incoming data - data must match the blueprint (class)

#pydantic blueprint for incoming data validation
class DocumentCreate(BaseModel):
    title: str

@app.post("/documents")
def create_document(document: DocumentCreate):
    new_id = len(fake_document) + 1

    new_doc = {
        "id": new_id,
        "title": document.title,
        "status": "Draft"
    }

    #add the new document to our document list 
    fake_document.append(new_doc)

    return new_doc



