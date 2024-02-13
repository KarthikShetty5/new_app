# import requests
# import pandas as pd
# from io import StringIO

# api_url = 'https://api.example.com/data'
# api_key = 'your_api_key'
# params = {'param1': 'value1', 'param2': 'value2'}

# response = requests.get(api_url, params=params, headers={'Authorization': f'Bearer {api_key}'})

# if response.status_code == 200:
#     data = response.json()
# else:
#     print(f"Error: {response.status_code}")

# from google.colab import drive
# drive.mount('/content/drive')


# download_url = 'firebase_download_url'
# response = requests.get(download_url, allow_redirects=True)

# if response.status_code == 200:
#     if response.text.strip():
#         df = pd.read_csv(StringIO(response.text), encoding='utf-8')
#         print(df.head())
#     else:
#         print("CSV content is empty.")
# else:
#     print(f"Failed to download file. Status code: {response.status_code}")

# import sys
# from googletrans import Translator

# translatr =Translator()

# userText = sys.argv[1]

# result = translatr.translate(userText, dest='nl') # translate to Dutch
# sys.argv.append(result.text)

# print(sys.argv[2])

from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import pandas as pd
from io import StringIO


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
            print(df.head())
        else:
            print("CSV content is empty.")
    else:
        print(f"Failed to download file. Status code: {response.status_code}")
    return item.file

