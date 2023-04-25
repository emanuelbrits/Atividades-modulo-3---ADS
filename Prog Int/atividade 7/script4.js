var select = document.getElementById('imagem');
var resultadoDiv = document.getElementById('resultado');

select.addEventListener('change', function() {
    var imagemSelecionada = 'img/' + select.value + '.jpg'
    var img = new Image()
    img.src = imagemSelecionada

    resultadoDiv.innerHTML = ''
    resultadoDiv.appendChild(img)
})