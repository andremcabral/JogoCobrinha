let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let nivel = 1;
let contaComida = 0;
let snake = [];
let direction = "right";
let velocidade = 300;
let jogo = setInterval(iniciarJogo, velocidade);
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}

// ONDE COMEÇA A COBRINHA
snake[0] = {
    x: 0 * box,
    y: 0 * box
}

// CRIA O FUNDO DO JOGO
function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// CRIA O CORPO DA COBRINHA
function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// COLOCA A COMIDA PARA A COBRINHA PEGAR E AUMENTAR
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// FAZ A LEITURA DO TECLADO PARA VER SE MUDA DE DIREÇÃO
document.addEventListener("keydown", update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

// INICIA O JOGO
function iniciarJogo() {

    // FAZ A COBRINHA PASSAR DE UM LADO PARA OUTRO NO FIM DA TELA
    if (snake[0].x > 15 * box && direction === "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction === "left") snake[0].x = 15 * box;
    if (snake[0].y > 15 * box && direction === "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction === "up") snake[0].y = 15 * box;


    // VERIFICA SE A COBRINHA TOCA NO PRÓPRIO CORPO, TERMINANDO O JOGO
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("Game Over! Pontos: " + contaComida + " Nível: " + nivel);
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // FAZ A COBRINHA ANDAR PARA A DIREÇÃO DEFINIDA
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // FAZ A COBRINHA AUMENTAR QUANDO ENCONTRA A COMIDA E GERA OUTRA COMIDA
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        contaComida = contaComida + 1;
        if ((contaComida % 5) == 0) {
            nivel++;
            document.getElementById("niveis").innerHTML = nivel;
        }
        document.getElementById("pontos").innerHTML = contaComida;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}