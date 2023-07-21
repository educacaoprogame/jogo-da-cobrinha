document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.querySelector('.game-area');
    const snake = document.getElementById('snake');
    const food = document.getElementById('food');
    let snakeLeft = 0;
    let snakeTop = 0;
    let foodLeft = 0;
    let foodTop = 0;
    let maçasPegas = 0;
    const scoreDisplay = document.getElementById('score'); 

    function drawSnake() {
        snake.style.left = snakeLeft + 'px';
        snake.style.top = snakeTop + 'px';
    }

    function drawFood() {
        food.style.left = foodLeft + 'px';
        food.style.top = foodTop + 'px';
    }

    function contarMacas() {
        maçasPegas++;
        scoreDisplay.textContent = `Maçãs coletadas: ${maçasPegas}`; // Atualiza o texto com a contagem de maçãs
    }

    function gerarNovaComida() {
        // Gera novas posições para a maçã até que ela não esteja na mesma posição que a cobra
        do {
            foodLeft = Math.floor(Math.random() * 20) * 20;
            foodTop = Math.floor(Math.random() * 20) * 20;
        } while (foodLeft === snakeLeft && foodTop === snakeTop);

        drawFood();
    }

    function moveSnake(event) {
        const key = event.key;
        const directions = {
            'ArrowUp': { top: -20, left: 0 },
            'ArrowDown': { top: 20, left: 0 },
            'ArrowLeft': { top: 0, left: -20 },
            'ArrowRight': { top: 0, left: 20 }
        };

        if (key in directions) {
            const direction = directions[key];
            const newSnakeTop = snakeTop + direction.top;
            const newSnakeLeft = snakeLeft + direction.left;

            if (newSnakeLeft < 0 || newSnakeLeft >= gameArea.offsetWidth || newSnakeTop < 0 || newSnakeTop >= gameArea.offsetHeight) {
                alert('Game Over!');
                return;
            }

            snakeTop = newSnakeTop;
            snakeLeft = newSnakeLeft;
            drawSnake();

            if (snakeLeft === foodLeft && snakeTop === foodTop) {
                gerarNovaComida();
                contarMacas();
            }
        }
    }

    document.addEventListener('keydown', moveSnake);

    // Gera a posição inicial da maçã
    gerarNovaComida();

    drawSnake();
});
