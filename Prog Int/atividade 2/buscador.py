from bs4 import BeautifulSoup
import requests

url = 'https://ge.globo.com/'

response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')    

text = soup.get_text()
termo = input('Termo a ser buscado: ')
profundidade = int(input('Profundidade de busca: '))

def search(termo, texto, profundidade, soup): 
    if termo in texto and profundidade == 0:        
        index_inicio = max(texto.index(termo) - 20, 0)        
        index_fim = min(texto.index(termo) + len(termo) + 20, len(texto))        
        resultado = texto[index_inicio:index_fim]     
        return resultado
    else:
        if profundidade > 0:      
            links = soup.find_all('a')        
            for link in links:            
                href = link.get('href')  
                response = requests.get(href)
                soup = BeautifulSoup(response.content, 'html.parser')  
                text = soup.get_text()          
                if termo in text:        
                    index_inicio = max(text.index(termo) - 20, 0)        
                    index_fim = min(text.index(termo) + len(termo) + 20, len(text))        
                    resultado = text[index_inicio:index_fim]     
                    return resultado



print(search(termo, text, profundidade, soup))
