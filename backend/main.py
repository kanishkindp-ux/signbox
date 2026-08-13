from fastapi import FastAPI
#application instance
app = FastAPI()

#when someone sends HTTP GET request to URL '/' run the following function
@app.get("/")
def read_root():
    return {"message": "SignBox API running"}
