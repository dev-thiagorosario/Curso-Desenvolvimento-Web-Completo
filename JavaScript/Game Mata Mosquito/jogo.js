var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 15;

var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'Fácil') {

criaMosquitoTempo = 2000

} else if (nivel === 'Médio') {

criaMosquitoTempo = 1500

} else if (nivel === 'Difícil'){

criaMosquitoTempo = 1000

} else if (nivel === 'Expert'){

criaMosquitoTempo = 750

}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}

ajustaTamanhoPalcoJogo();

var cronometro = setInterval(function() {

	tempo -= 1
	if (tempo < 0) {

		clearInterval(cronometro)
		clearInterval(criaMosquito)
		window.location.href = 'vitoria.html'

	} else {
	document.getElementById('cronometro').innerHTML = tempo
	}
}, criaMosquitoTempo)

function posicaoRandomica() {


    var mosquitoExistente = document.getElementById('mosquito');
    if (mosquitoExistente) {
        mosquitoExistente.remove();

        if (vidas > 3) {

        	window.location.href = 'game_over.html'
        } else {

	document.getElementById('v' + vidas).src = "img/coracao_vazio.png"

	   vidas ++

}
    }

    var posicaoX = Math.floor(Math.random() * largura - 100);
    var posicaoY = Math.floor(Math.random() * altura - 100);

    var mosquito = document.createElement('img');
    mosquito.src = 'img/mosquito.png';
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function(){
    	this.remove()
    }

    document.body.appendChild(mosquito);

    setTimeout(function () {
        mosquito.remove();
    }, criaMosquitoTempo); // Remove o mosquito após 1 segundo
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3);
    switch (classe) {
        case 0:
            return 'mosquito1';
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';
    }
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2);
    switch (classe) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}

var criaMosquito = setInterval(function () {
    posicaoRandomica();
}, criaMosquitoTempo);
