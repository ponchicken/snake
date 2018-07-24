import Snake from "./snake.js";

export default class Game {

    constructor(app) {
        this.field = app.field
        this.app = app

        this.direction = 'right'
        this.prevDirection = 'right'
        this.started = false
        this.pause = true

    }

    toggle() {
        if (!this.started) {
            this.started = true
            this.start()
        }

        this.pause = !this.pause

        if (this.pause) {
            this.app.sound.bg.pause()
        } else {
            this.app.sound.bg.play()
        }

        if (!this.app.debug) {
            if (this.pause) {
                this.stopMovement()
            } else {
                this.startMovement()
            }
        }
    }

    start() {
        this.field.food = []
        this.snake = new Snake(this.app.config, this.app.canvas)
        this.field.createFood(this.snake.coords)
        this.field.displayAllFood()
        this.field.displaySnake(this.snake)

        
        if (this.app.debug) {
            document.addEventListener('click', () => {
                this.field.createFood(this.snake.coords)
                try{
                } catch (err) {
                    console.log(err.message)
                }
            })
        }
    }

    moveSnake() {
        try {
            this.snake.move(this.direction, this.prevDirection)
            this.snake.coords.pop()
        } catch (err) {
            this.app.gameOver()
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
            this.app.addScores(foodType.size)
            this.snake.size += foodType.size
            let coords = {
                x: existedFood.x,
                y: existedFood.y
            }
            for (let i=0; i<foodType.size; i++) {
                this.snake.coords.push(coords)
            }
            this.field.food.splice(foodIndex, 1)
        }
    }

    startMovement() {
        this.movementInterval = setInterval(() => {
            this.moveSnake()
            this.changeDirection(this.direction, true)
        }, 80)
        this.foodAppearTimeout = setTimeout(() => {
            this.foodAppearTimeout = setTimeout(() => {
                try{
                    if (this.field.food.length < 4)
                        this.field.createFood(this.snake.coords)
                } catch (err) {
                    console.log(err.message)
                }
            }, 5000)
        }, 5000)
    }

    stopMovement() {
        clearInterval(this.movementInterval)
        clearTimeout(this.foodAppearTimeout)
    }

    changeDirection(direction, changePrev) {
        if (!this.pause) {
            if (this.app.debug || changePrev) {
                this.prevDirection = this.direction
            }

            let directions = this.app.config.directions
            if (directions[direction] != directions[this.prevDirection]) {
                this.direction = direction
            }
            
            if (this.app.debug) 
                this.moveSnake()
        }
    }

}