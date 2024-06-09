var blockSize = 25;
var rows = 20;
var columns = 20;
var board;
var context;

var snakeX;
var snakeY;
var snakeBody;
var velocityX;
var velocityY;
var foodX;
var foodY;
var gameOver;
var score;
var gameInterval;
var gameOverText;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize; 
    context = board.getContext("2d");

    gameOverText = document.getElementById("gameOverText");

    document.addEventListener("keyup", changeDirection);
    startGame();
}

function resetGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    gameOver = false;
    score = 0;
    updateScore();
    placeFood();
    gameOverText.style.display = "none";
}

function startGame() {
    playButtonSound();
    resetGame();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(update, 1000 / 9);
}

function update() {
    if (gameOver) {
        clearInterval(gameInterval);
        gameOverText.style.display = "block";
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height); 
    
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        updateScore();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX - velocityX * blockSize, snakeY - velocityY * blockSize];
    }

    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX >= columns * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function updateScore() {
    document.getElementById("score").innerText = "Score: " + score;
}

function playButtonSound() {
    var buttonSound = document.getElementById("buttonSound");
    buttonSound.play();
}
