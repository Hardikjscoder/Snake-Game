// Selectors
const gameElement = document.getElementById('game')

// Initial variables
let inputDirection = {
    x: 0,
    y: 0
}
let SPEED = 8
let lastPainTime = 0
let snakeArray = [
    {
        x: 13,
        y: 15
    }
]
let food = {
    x: 3,
    y: 5
}
let score = 0

// Functions

function main(currentTime) {
    requestAnimationFrame(main)
    if ((currentTime - lastPainTime) / 1000 < 1 / SPEED) return
    else {
        lastPainTime = currentTime
        gameLogic()
    }
}

function isCollide(snake) {
    // If the snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            return true
        }
    }
    // If the snake collides with the wall 
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }
}

function gameLogic() {
    gameElement.innerHTML = ''

    // Update the snake array 
    if (isCollide(snakeArray)) {
        inputDirection = {
            x: 0,
            y: 0
        }
        alert('Game Over')
        snakeArray = [
            {
                x: 13,
                y: 15
            }
        ]
        score = 0
    }

    // If the snake has the eaten the food, increment the score and regenerate the food
    if (snakeArray[0].y == food.y && snakeArray[0].x == food.x) {
        snakeArray.unshift({
            x: snakeArray[0].x + inputDirection.x,
            y: snakeArray[0].y + inputDirection.y
        })
        let a = 2
        let b = 16
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        }
    }

    // Moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] }
    }

    snakeArray[0].x += inputDirection.x
    snakeArray[0].y += inputDirection.y

    // Display the snake
    snakeArray.forEach((element, index) => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = element.y
        snakeElement.style.gridColumnStart = element.x
        if (index === 0) snakeElement.classList.add('snake_head')
        else snakeElement.classList.add('snake_body')
        gameElement.appendChild(snakeElement)
    })
    // Display the food
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.setAttribute('class', 'food')
    gameElement.appendChild(foodElement)
}

// Main logic
requestAnimationFrame(main)

addEventListener('keydown', event => {
    inputDirection = {
        x: 0,
        y: 1
    }
    switch (event.key) {
        case 'ArrowUp':
            inputDirection.x = 0
            inputDirection.y = -1
            break
        case 'ArrowDown':
            inputDirection.x = 0
            inputDirection.y = 1
            break
        case 'ArrowLeft':
            inputDirection.x = -1
            inputDirection.y = 0
            break
        case 'ArrowRight':
            inputDirection.x = 1
            inputDirection.y = 0
            break

        default:
            break
    }
})