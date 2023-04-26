document.addEventListener('DOMContentLoaded', function () {
    var botaoExibir = document.getElementById('exibirResultado');
    botaoExibir.addEventListener('click', adicionarTexto);
})

function adicionarTexto() {
    var conteudo = document.getElementById('texto').value;
    var select = document.getElementById('sel')
    var opcao = document.createElement('option')
    opcao.text = conteudo
    select.appendChild(opcao)
}