from bs4 import BeautifulSoup
import requests
import requests_cache

requests_cache.install_cache('cache')

def search(termo, url, profundidade): 

    if profundidade < 0:
        return

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    visitados = []
    links = []
    for link in soup.find_all('a'):
        href = link.get('href')
        if href and href.startswith(('http')):
            links.append(href)
            if href not in visitados:
                visitados.append(href)
                search(termo, href, profundidade-1)

    text = soup.get_text()

    termos = []
    if termo in text:
        index_inicio = max(text.index(termo) - 20, 0)
        index_fim = min(text.index(termo) + 20, len(text))
        termo_encontrado = text[index_inicio:index_fim]
        if termo_encontrado not in termos:
            termos.append(termo_encontrado)
            print(f"{termo_encontrado}")

    visitas = 0
    maior_referencia = 0
    link_maior_referencia = ''

    for link in links:
        if url in link:
            visitas += 1
    
    if visitas > maior_referencia:
        link_maior_referencia = ''
        link_maior_referencia+= url

    return link_maior_referencia

aux = search("torneio", "https://www.rocketleague.com/pt-br//", 1)
print()
print(f"link com mais referĂȘncias {aux}")
