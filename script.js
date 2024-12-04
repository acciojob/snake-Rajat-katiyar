//your code here
const gameContainer = document.getElementById('gameContainer');  
const scoreDisplay = document.getElementById('score');  
const rows = 40;  
const columns = 40;  
let snake = [{x: 1, y: 20}];  
let direction = {x: 1, y: 0}; // Start moving right  
let food = {};  
let score = 0;  

function createBoard() {  
    for (let i = 0; i < rows; i++) {  
        for (let j = 0; j < columns; j++) {  
            const pixel = document.createElement('div');  
            pixel.id = `pixel${i * columns + j + 1}`;  
            pixel.classList.add('pixel');  
            gameContainer.appendChild(pixel);  
        }  
    }  
}  

function placeFood() {  
    let randomPixel;  
    do {  
        randomPixel = {  
            x: Math.floor(Math.random() * columns),  
            y: Math.floor(Math.random() * rows)  
        };  
    } while (isSnake(randomPixel.x, randomPixel.y));  

    food = randomPixel;  
    const foodPixel = document.getElementById(`pixel${food.y * columns + food.x + 1}`);  
    foodPixel.classList.add('food');  
}  

function isSnake(x, y) {  
    return snake.some(segment => segment.x === x && segment.y === y);  
}  

function updateSnake() {  
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};  

    // Check for collision with walls or self  
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows || isSnake(head.x, head.y)) {  
        alert('Game over! Your score: ' + score);  
        document.location.reload();  
        return;  
    }  

    snake.unshift(head);  

    // Check if food is eaten  
    if (head.x === food.x && head.y === food.y) {  
        score++;  
        scoreDisplay.innerText = score;  
        placeFood();  
    } else {  
        snake.pop(); // Remove the tail unless eating  
    }  
}  

function drawSnake() {  
    // Clear the board  
    for (let i = 0; i < rows; i++) {  
        for (let j = 0; j < columns; j++) {  
            const pixel = document.getElementById(`pixel${i * columns + j + 1}`);  
            pixel.className = 'pixel'; // Reset all pixels  
        }  
    }  

    // Draw the snake  
    snake.forEach(segment => {  
        const pixel = document.getElementById(`pixel${segment.y * columns + segment.x + 1}`);  
        pixel.classList.add('snakeBodyPixel');  
    });  
}  

function gameLoop() {  
    updateSnake();  
    drawSnake();  
}  

document.addEventListener('keydown', (event) => {  
    switch (event.key) {  
        case 'ArrowUp':  
            if (direction.y === 0) direction = {x: 0, y: -1};  
            break;  
        case 'ArrowDown':  
            if (direction.y === 0) direction = {x: 0, y: 1};  
            break;  
        case 'ArrowLeft':  
            if (direction.x === 0) direction = {x: -1, y: 0};  
            break;  
        case 'ArrowRight':  
            if (direction.x === 0) direction = {x: 1, y: 0};  
            break;  
    }  
});  

createBoard();  
placeFood();  
setInterval(gameLoop, 100);