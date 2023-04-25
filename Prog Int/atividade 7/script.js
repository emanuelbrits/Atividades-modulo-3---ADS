document.addEventListener('DOMContentLoaded', function () {
    var botaoExibir = document.getElementById('botaoExibir');
    botaoExibir.addEventListener('click', exibirConteudo);
});

function exibirConteudo() {
    var conteudo = document.getElementById('caixaDeTexto').value;

    if(conteudo.trim().length == 0) {
        document.getElementById('conteudo').style.color = ('red')
        conteudo = "Texto vazio"
        document.getElementById('conteudo').innerHTML = conteudo;
    } else {
        document.getElementById('conteudo').style.color = ('black')
        document.getElementById('conteudo').innerHTML = conteudo;
    }
}