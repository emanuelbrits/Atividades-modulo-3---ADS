import requests
from bs4 import BeautifulSoup

url = 'https://pt.wikipedia.org/wiki/Google'
busca = input('Qual sua busca ? ')

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html-parser')

qnt = soup.body.findAll(text=lambda text: busca in text)

if qnt:
    print(f"Quantidade de vezes do termo: '{busca}': ")
    for qt in qnt:
        print(f" {qt}")