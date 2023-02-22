import requests
from bs4 import BeautifulSoup

response = requests.get('https://www.google.com/')
soup = BeautifulSoup(response.text, 'html.parser')

links = soup.find_all('a')
for link in links:
    print(link.get('href'))