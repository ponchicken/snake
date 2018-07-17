import Snake from "./snake.js";


let opposites = {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left'
}

export default class Game {

    constructor(app) {
        this.field = app.field
        this.app = app

        this.prevDirection
        this.started = false
        this.pause = true
    }

    toggle() {
        if (!this.started) {
            this.started = true
            this.start()
        }

        this.pause = !this.pause

        if (!this.app.debug) {
            if (this.pause) {
                this.stopMovement()
            } else {
                this.startMovement()
            }
        }
    }

    start() {
        this.snake = new Snake(this.app.config, this.app.canvas)
        this.field.displayAllFood()
        this.field.displaySnake(this.snake)

        
        document.addEventListener('click', () => {
            this.field.createFood(this.snake.coords)
            try{
            } catch (err) {
                console.log(err.message)
            }
        })
    }

    moveSnake() {
        try {
            this.snake.move(this.direction, this.prevDirection)
            this.snake.coords.pop()
        } catch (err) {
            console.log(err.message)
        }
        this.checkFood()
        this.field.clear()
        this.field.displayAllFood()
        this.field.displaySnake(this.snake)
    }

    checkFood() {
        let snakeHead = this.snake.coords[0]
        let foodIndex = this.field.food.findIndex(food => {
            return (food.x == snakeHead.x && food.y == snakeHead.y)
        })
        if (foodIndex != -1) {
            let existedFood = this.field.food[foodIndex] 
            if (this.field.food.length < 3) {
                this.field.createFood(this.snake.coords)
            }
            let foodType = this.field.foodTypes[existedFood.type]
            this.app.addScores(foodType.scores)
            this.snake.size += 1
            let coords = {
                x: existedFood.x,
                y: existedFood.y
            }
            this.snake.coords.push(coords)
            this.field.food.splice(foodIndex, 1)
        }
    }

    startMovement() {
        this.movementInterval = setInterval(() => {
            this.moveSnake()
        }, 50)
        this.foodAppearInterval = setInterval(() => {
            try{
                this.field.createFood(this.snake.coords)
            } catch (err) {
                console.log(err.message)
            }
        }, 2000)
    }

    stopMovement() {
        clearInterval(this.movementInterval)
        clearInterval(this.foodAppearInterval)
    }

    changeDirection(direction) {
        if (!this.pause) {
            let directions = this.app.config.directions
            this.prevDirection = this.direction
            if (directions[direction] != directions[this.prevDirection]) {
                this.direction = direction
            }
            
            if (this.app.debug) 
                this.moveSnake(this.direction)
        }
    }

}