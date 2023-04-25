document.addEventListener('DOMContentLoaded', function () {
    var botaoCarregar = document.getElementById('botaoCarregar');
    botaoCarregar.addEventListener('click', carregar);
});

function carregar () {
    var nomeImagem = document.getElementById("nome").value
    const img = new Image()
    img.src = nomeImagem

    var div = document.getElementById("resultado")
    div.innerHTML = ''
    div.appendChild(img)
}