import requests

response = requests.get("https://www.lance.com.br/files/article_main/uploads/2023/02/18/63f129c412027.jpeg")
with open('aviao.jpeg', 'wb') as f:
    f.write(response.content)