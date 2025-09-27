from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app=FastAPI()

origins=[
    "http://127.0.0.1:3000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class User(BaseModel):
    nombre:str
    clave:str

@app.post("/enviar/")
async def enviar(user:User):
    print(user)

@app.post("/registar/")
async def create_user(user:User):
    print(user)