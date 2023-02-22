import requests
from bs4 import BeautifulSoup

response = requests.get('https://www.google.com/')
soup = BeautifulSoup(response.text, 'html.parser')

tagproc = input('Qual tag: ')
tags = soup.find_all(tagproc)

for tag in tags:
    texto = tag.get_text()
    print("  ", texto)