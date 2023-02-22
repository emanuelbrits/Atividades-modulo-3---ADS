import requests


busca = {
    "q": input("O que deseja buscar ? ")
}

response = requests.get('https://www.google.com/search', params=busca)

print(response.text)