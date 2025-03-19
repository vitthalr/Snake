const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
};
let dx = box, dy = 0;
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.key === "ArrowUp" && dy === 0) { dx = 0; dy = -box; }
    else if (event.key === "ArrowDown" && dy === 0) { dx = 0; dy = box; }
    else if (event.key === "ArrowLeft" && dx === 0) { dx = -box; dy = 0; }
    else if (event.key === "ArrowRight" && dx === 0) { dx = box; dy = 0; }
}

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "lime" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    let newX = snake[0].x + dx;
    let newY = snake[0].y + dy;

    if (newX === food.x && newY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } else {
        snake.pop();
    }

    if (newX < 0 || newY < 0 || newX >= canvas.width || newY >= canvas.height || snake.some(segment => segment.x === newX && segment.y === newY)) {
        alert("Game Over! Your score: " + score);
        document.location.reload();
    }

    snake.unshift({ x: newX, y: newY });
}

setInterval(drawGame, 100);
