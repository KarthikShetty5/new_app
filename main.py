from fastapi import FastAPI
import random
import requests


app=FastAPI()


@app.get('/')
async def root():
    return {"exxx":"tyuiknbvc"}

requests = requests.get('http://127.0.0.1:8000')
print(requests.json())