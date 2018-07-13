
let keyCode = {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    space: 32,
    enter: 13
}

export default class Game {

    constructor({ctx, field, snake}) {
        this.timeout
        this.direction = 'right'
        this.block
        Object.assign(this, {ctx, field, snake})
        this.ctx.lineWidth = 5
        this.ctx.lineJoin = 'round'
        this.ctx.lineCap = 'round'
        this.start()
    }

    start() {
        this.field.displayFood()
        this.field.displaySnake(this.snake)
        this.listenKeyboard()
        // this.startMovement()
    }

    listenKeyboard() {
        document.addEventListener('keydown', (e) => {
            e.preventDefault()
            switch (e.keyCode) {
                case keyCode.up:
                    this.changeDirection('up')
                    break
                case keyCode.down:
                    this.changeDirection('down')
                    break
                case keyCode.left:
                    this.changeDirection('left')
                    break
                case keyCode.right:
                    this.changeDirection('right')
                    break
            }
        })
    }

    moveSnake(direction) {
        this.direction = direction
        this.snake.move(direction)
        this.snake.coords.splice(0, 1)
        this.checkFood()
        this.field.clear()
        this.field.displayFood()
        this.field.displaySnake(this.snake)
    }

    checkFood() {
        let snakeHead = this.snake.coords[this.snake.coords.length - 1]
        let foodIndex = this.field.food.findIndex(food => {
            return (food.x == snakeHead.x && food.y == snakeHead.y)
        })
        if (foodIndex != -1) {
            console.log('Eaten!')
            this.snake.size += 1
            this.snake.coords.push(this.field.food[foodIndex])
            this.field.food.splice(foodIndex, 1)
        }
    }

    startMovement() {
        this.timeout = setInterval(() => {
            this.moveSnake(this.direction)
        },200)
    }

    changeDirection(direction) {
        this.direction = direction
        this.moveSnake(this.direction)
    }

}