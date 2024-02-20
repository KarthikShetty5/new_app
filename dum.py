# import requests
# import yfinance as yf

# user_company_name = input("Enter the name of a company: ")

# headers = {
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
# }

# try:
#     search_url = f'https://query2.finance.yahoo.com/v1/finance/search?q={user_company_name}&quotesCount=1'
#     response = requests.get(search_url, headers=headers)

#     if response.status_code == 200:
#         response_data = response.json()

#         if 'quotes' in response_data and response_data['quotes']:
#             first_result = response_data['quotes'][0]

#             symbol = first_result['symbol']
            
#             market_cap = yf.Ticker(symbol).info.get('marketCap')

#             if market_cap is not None:
#                 print(f"The market capitalization of {user_company_name} ({symbol}) is: ${market_cap}")
#             else:
#                 print(f"Unable to retrieve market capitalization for {user_company_name}.")
#         else:
#             print(f"No matching company found for {user_company_name}.")
#     else:
#         print(f"Error: Unable to fetch data. Status code: {response.status_code}")
# except Exception as e:
#     print(f"Error fetching data for {user_company_name}: {e}")



import requests

# Define your LinkedIn API access credentials
CLIENT_ID = 'your_client_id'
CLIENT_SECRET = 'your_client_secret'
ACCESS_TOKEN = 'your_access_token'

# Define the parameters for fetching job postings
params = {
    'company': 'Your target company',
    'location': 'Location',  # e.g., city, state
    'keywords': 'Keywords',  # optional
    'access_token': ACCESS_TOKEN
}

# Make a GET request to the LinkedIn API endpoint for job postings
response = requests.get('https://api.linkedin.com/v2/jobs', params=params)

# Process the response
if response.status_code == 200:
    job_postings = response.json()
    print(job_postings)  # Example: print the job postings JSON data
else:
    print('Error:', response.status_code)
