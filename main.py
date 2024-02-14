import re
import json
import nltk
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
from fastapi.responses import JSONResponse


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


file_url_storage = None

# @app.post('/')
# async def root(item:Item):
#     response = requests.get(item.file, allow_redirects=True)
#     if response.status_code == 200:
#         if response.text.strip():
#             # global df
#             df = pd.read_csv(StringIO(response.text), encoding='utf-8')
#             # json_data = peoandmonth(df)
#             # return JSONResponse(json_data)
#             global file_url_storage
#             file_url_storage = item.file
#             # print(df.head())
#         else:
#             print("CSV content is empty.")
#     else:
#         print(f"Failed to download file. Status code: {response.status_code}")
#     return item.file

@app.post('/')
async def root(item:Item):
    response = requests.get(item.file, allow_redirects=True)
    if response.status_code == 200:
            global file_url_storage
            file_url_storage = item.file
    else:
        print(f"Failed to get file link: {response.status_code}")
    return item.file

@app.get('/data/people')
async def get_people():
    response = requests.get(file_url_storage, allow_redirects=True)
    if response.status_code == 200:
        if response.text.strip():
            df = pd.read_csv(StringIO(response.text), encoding='utf-8')
            json_data = peoandmonth(df)
            return JSONResponse(json_data)
        else:
            print("CSV content is empty.")
    else:
        print(f"Failed to download file. Status code: {response.status_code}")


@app.get('/data/other')
async def get_other():
    response = requests.get(file_url_storage, allow_redirects=True)
    if response.status_code == 200:
        if response.text.strip():
            df = pd.read_csv(StringIO(response.text), encoding='utf-8')
            print(df.head())
        else:
            print("CSV content is empty.")
    else:
        print(f"Failed to download file. Status code: {response.status_code}")


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
    return convert_to_json(month_analysis)


@app.get('/api/data')
async def get_data():
    data = {
        'key1': 'value1',
        'key2': 'value2',
    }
    return data

@app.get('/data/search')
async def get_search(item: str):
    response = requests.get(file_url_storage, allow_redirects=True)
    if response.status_code == 200:
        if response.text.strip():
            df = pd.read_csv(StringIO(response.text), encoding='utf-8')
            search_results = search_data(df, item)
            return search_results
        else:
            print("CSV content is empty.")
    else:
        print(f"Failed to download file. Status code: {response.status_code}")


@app.get('/data/year')
async def get_year():
    response = requests.get(file_url_storage, allow_redirects=True)
    if response.status_code == 200:
        if response.text.strip():
            df1 = pd.read_csv(StringIO(response.text), encoding='utf-8')
            df1=df1.fillna('-')
            df1[df1['Date'].str.contains(r'[^0-9.-]')==True]
            df1['Date'].replace('07.04,22','07.04.22',inplace=True)
            df1=df1[df1[ 'Date']!='-']
            df1[ 'Date']= pd.to_datetime(df1[ 'Date'] , format='%d.%m.%y')
            df1['Month'] = df1[ 'Date'].dt.strftime('%B')
            df1['Date']= pd.to_datetime(df1['Date'] , format='%d.%m.%y')
            df1['year'] = df1[ 'Date'].dt.year
            year_analysis=df1.groupby(['year']).count()['Name'].reset_index()
            year_analysis.rename(columns={'Name':'Number of people'},inplace=True)
            return convert_to_json(year_analysis)
        else:
            print("CSV content is empty.")
    else:
        print(f"Failed to download file. Status code: {response.status_code}")


def search_data(df1, search_keyword):
    def search_data1(search_keyword):
        df1['Areas of interest'] = df1['Areas of interest'].fillna('')
        filtered_data = df1[df1['Areas of interest'].str.contains(search_keyword, case=False)]
        return filtered_data
    df1=search_data1(search_keyword)
    df_search = df1[
    (df1['Name'].str.contains(search_keyword, case=False)) |
    (df1['Company'].str.contains(search_keyword, case=False)) |
    (df1['Designation'].str.contains(search_keyword, case=False)) |
    (df1['Areas of interest'].str.contains(search_keyword, case=False))
]
    columns_to_display = ['Name', 'Date', 'Designation', 'Company', 'Areas of interest','Linkedin']
    search_results = df_search[columns_to_display]

    return search_results
