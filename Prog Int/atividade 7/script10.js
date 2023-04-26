document.addEventListener('DOMContentLoaded', function () {
    var botaoTransferir1= document.getElementById('transfere1');
    botaoTransferir1.addEventListener('click', transferir1);
    
    var botaoTransferir2= document.getElementById('transfere2');
    botaoTransferir2.addEventListener('click', transferir2);
})

function transferir1() {
    var select1 = document.getElementById('sel1')
    var opcoes1 = select1.selectedOptions;

    var select2 = document.getElementById('sel2')
      

    for (var i = opcoes1.length - 1; i >= 0; i--) {
        select2.appendChild(opcoes1[i]);
    }
    
}

function transferir2() {
    var select1 = document.getElementById('sel1')

    var select2 = document.getElementById('sel2')
    var opcoes2 = select2.selectedOptions;
      

    for (var i = opcoes2.length - 1; i >= 0; i--) {
        select1.appendChild(opcoes2[i]);
    }
    
}