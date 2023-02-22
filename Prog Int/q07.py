import requests

cep = input("Digite seu cep: ")
response = requests.get(f"https://viacep.com.br/ws/{cep}/json/")

dados = response.json()
print(f"Logradouro: {dados['logradouro']}")
print(f"Bairro: {dados['bairro']}")
print(f"Cidade: {dados['localidade']}")
print(f"Estado: {dados['uf']}")