document.addEventListener('DOMContentLoaded', function () {
    var botaoRemover= document.getElementById('remove');
    botaoRemover.addEventListener('click', removerTexto);
})

function removerTexto() {
    var select = document.getElementById('sel')
    var opcoes = select.selectedOptions;
      

    for (var i = opcoes.length - 1; i >= 0; i--) {
        select.removeChild(opcoes[i]);
    }
    
}