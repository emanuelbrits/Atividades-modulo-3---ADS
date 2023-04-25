document.addEventListener('DOMContentLoaded', function () {
    var botaoMultiplicar = document.getElementById('botaoMultiplicar');
    botaoMultiplicar.addEventListener('click', multiplicar);
});

function multiplicar () {
    var valor1 = document.getElementById("valor1").value
    var valor2 = document.getElementById("valor2").value

    if(isNaN(valor1) || isNaN(valor2) || valor1 == "" || valor2 == "") {
        alert("Valores inválidos")
    } else {
        var resultado = parseInt(valor1) * parseInt(valor2)
        alert(resultado)
    }
}