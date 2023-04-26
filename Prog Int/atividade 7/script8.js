document.addEventListener('DOMContentLoaded', function () {
    var botaoExibir = document.getElementById('exibirResultado');
    botaoExibir.addEventListener('click', adicionarTexto);
})

function adicionarTexto() {
    var conteudo = document.getElementById('texto').value;
    var select = document.getElementById('sel')



    if(conteudo != '' && !Repete(conteudo) && select.options.length < 5) {
        var opcao = document.createElement('option')
        opcao.text = conteudo
        select.appendChild(opcao)
    }
}

function Repete(conteudo) {
    var select = document.getElementById("sel");
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].text.toUpperCase() === conteudo.toUpperCase()) {
        return true;
      }
    }
    return false;
}