document.addEventListener('DOMContentLoaded', function () {
    var botaoChecar = document.getElementById('checar');
    botaoChecar.addEventListener('click', verificar);
});

function verificar () {
    var deveres = document.getElementsByName('deveres')
    var div = document.getElementById('resultado')
    var fez = false

    for(dever of deveres) {
        if(dever.checked) {
            fez = true
            break
        }
    }

    if (fez) {
        div.innerHTML = 'Muito Bem!'
    } else {
        div.innerHTML = 'Termine seus deveres!'
    }
}