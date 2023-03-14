var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');

pincel.fillStyle = 'black';
pincel.font = '20px sans-serif';
pincel.fillText('Clique para começar', 200, 200);

var raio1 = 5;
var raio2 = 10;
var raio3 = 15;

//função que desenha um círculo
function desenhaCirculo(x, y, raio, cor) {
    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

//função que desenha o alvo, com sobreposição de três círculos.
function desenhaAlvo() {
    //a cada vez que a função desenhaAlvo for chamada, um novo valor de X para os círculos será definido.
    function xAleatorio (min, max) {
        min = raio3;
        max = 600-(raio3);
        return Math.floor(Math.random()*(max-min)+min);
    }

    //a cada vez que a função desenhaAlvo for chamada, um novo valor de Y para os círculos será definido.
    function yAleatorio (min, max) {
        min = raio3+20; //o y gerado nunca será inferior à borda da pontuação.
        max = 400-(raio3);
        return Math.floor(Math.random()*(max-min)+min);
    }

    xAlvo = xAleatorio();
    yAlvo = yAleatorio();
    limpaTela();
    desenhaCirculo(xAlvo, yAlvo, raio3, 'red');
    desenhaCirculo(xAlvo, yAlvo, raio2, 'white');
    desenhaCirculo(xAlvo, yAlvo, raio1, 'red');
}

//função que desenha o quadro de pontuação do jogo.
function quadroPontuacao() {
    pincel.fillStyle = 'darkgray'
    pincel.fillRect(0, 0, 600, 20)
    
    pincel.fillStyle = 'blue';
    pincel.textAlign = 'center';
    pincel.font = '19px sans-serif';
    pincel.fillText(pontos, 300, 18);
}

//função que limpa a tela após o desenho de cada alvo.Caso contrário, vários alvos apareceriam na tela.
function limpaTela() {
    pincel.clearRect(0, 0, 600, 400);
    quadroPontuacao();
}

var pontos = 0;
var velocidade = 1500;
var atualizaJogo;

//função que determina o nível de dificuldade com base na velocidade que o alvo aparece na tela.
function nivelDificuldade() {
    
    if (pontos > 100 && pontos < 200){
        velocidade = 1000;
    } else if (pontos > 200 && pontos < 300) {
        velocidade = 750;
    } else if (pontos > 300 && pontos < 400) {
        velocidade = 500;
    } else if (pontos > 400) {
        alert("Fim de Jogo!")
        pontos = 0;
        velocidade = 2000;
    }
}

var xAlvo = 300;
var yAlvo = 200;

//função que inicia o jogo. A cada clique, é verificada pontuação do jogador, alterando nível de dificuldade de acordo com o progresso.
function dispara(evento) {
         
    var xMouse = evento.pageX - tela.offsetLeft;
    var yMouse = evento.pageY - tela.offsetTop;

    if(xMouse > xAlvo-raio1 && xMouse < xAlvo+raio1 && yMouse > yAlvo-raio1 && yMouse < yAlvo+raio1){
        pontos += 15;
    } else if(xMouse > xAlvo-raio2 && xMouse < xAlvo+raio2 && yMouse > yAlvo-raio2 && yMouse < yAlvo+raio2){
        pontos += 10;
    } else if (xMouse > xAlvo-raio3 && xMouse < xAlvo+raio3 && yMouse > yAlvo-raio3 && yMouse < yAlvo+raio3){
        pontos += 5;
    }
    clearInterval(atualizaJogo);
    nivelDificuldade();
    atualizaJogo = setInterval(desenhaAlvo, velocidade);
}

tela.onclick = dispara;
