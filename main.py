import re
import nltk
import json
import requests
import numpy as np
import pandas as pd
from io import StringIO 
from fastapi import FastAPI
from textblob import TextBlob 
from fuzzywuzzy import process
from pydantic import BaseModel
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize 
from nltk.tokenize import word_tokenize 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

class Item(BaseModel):
    file: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Specify the origin of your Next.js app
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

@app.post('/')
async def root(item:Item):
    response = requests.get(item.file, allow_redirects=True)
    if response.status_code == 200:
        if response.text.strip():
            df = pd.read_csv(StringIO(response.text), encoding='utf-8')
            peoandmonth(df)
        else:
            print("CSV content is empty.")
    else:
        print(f"Failed to download file. Status code: {response.status_code}")
    return item.file


def convert_to_json(data):
    data = data.to_dict(orient='records')
    json_data = json.dumps(data, indent=4)
    return json_data

def clean_text(text):
    if isinstance(text, str):
        text=re.sub(r'[^a-zA-Z0-9-\s]','',text)
        text=text.lower()
        return text
    else:
        return text


def clean_text1(text):
    if isinstance(text, str):
        text=re.sub(r'[^a-zA-Z-\s]','',text)
        return text
    else:
        return text
    

def peoandmonth(df):
    df1=df.copy()
    df1=df1.fillna('-')
    df1['Date'].replace('07.04,22','07.04.22',inplace=True)
    df1=df1[df1[ 'Date']!='-']
    df1[ 'Date']= pd.to_datetime(df1[ 'Date'] , format='%d.%m.%y')
    df1[ 'Designation'] = df1[ 'Designation'].str.strip().replace('Co-founder', 'Co-Founder')
    df1[ 'Designation'].value_counts().head(50)
    df1[ 'Designation']=df1[ 'Designation'].apply(clean_text)
    df1[ 'Place']=df1[ 'Place'].apply(clean_text)
    df1[ 'Areas of interest']=df1[ 'Areas of interest'].apply(clean_text)
    df1[ 'Insights']=df1[ 'Insights'].apply(clean_text)
    df1[ 'Platform']=df1[ 'Platform'].apply(clean_text)
    df1[ 'Insights']=df1[ 'Insights'].apply(clean_text1)
    df1[ 'Platform'].value_counts()
    df1=df1[df1['Platform'] != '-']
    df1['Month'] = df1[ 'Date'].dt.strftime('%B')
    df1['year'] = df1[ 'Date'].dt.year
    month_analysis=df1.groupby(['Month']).count()['Name'].reset_index()
    month_analysis.rename(columns={'Name':'Number of people'},inplace=True)
    res = convert_to_json(month_analysis)
    print(res)
