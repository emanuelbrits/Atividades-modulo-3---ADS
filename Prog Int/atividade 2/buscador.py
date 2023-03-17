from bs4 import BeautifulSoup
import requests
import requests_cache

requests_cache.install_cache('cache')

def search(termo, url, profundidade): 

    if profundidade < 0:
        return

    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser',from_encoding="iso-8859-1")

    visitados = []
    links = []
    for link in soup.find_all('a'):
        href = link.get('href')
        if href and href.startswith(('http')):
            links.append(href)
            if href not in visitados:
                visitados.append(href)
                search(termo, href, profundidade-1)

    text = soup.get_text().upper()

    termos = []
    if termo.upper() in text.upper():
        index_inicio = max(text.upper().index(termo.upper()) - 20, 0)
        index_fim = min(text.upper().index(termo.upper()) + 20, len(text))
        termo_encontrado = text[index_inicio:index_fim]
        if termo_encontrado not in termos:
            termos.append(termo_encontrado)
            print(f"Termo encontrado em {url}: {termo_encontrado}")

    visitas = 0
    maior_referencia = 0
    link_maior_referencia = ''

    for link in links:
        if url in link:
            visitas += 1
    
    if visitas > maior_referencia:
        link_maior_referencia = url

    return link_maior_referencia

aux = search("gol", "https://www.rocketleague.com/pt-br//", 2)
print()
print(f"link com mais referências {aux}")