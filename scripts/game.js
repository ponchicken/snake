
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
        Object.assign(this, {ctx, field, snake})
        this.start()
    }

    start() {
        this.field.displaySnake(this.snake)
        this.listenKeyboard()
    }

    listenKeyboard() {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case keyCode.up:
                    this.moveSnake(e,'up')
                    break
                case keyCode.down:
                    this.moveSnake(e,'down')
                    break
                case keyCode.left:
                    this.moveSnake(e,'left')
                    break
                case keyCode.right:
                    this.moveSnake(e,'right')
                    break
            }
        })
    }

    moveSnake(e, direction) {
        e.preventDefault()
        this.snake.move(direction)
        this.field.displaySnake(this.snake)
        this.field.clearRect(this.snake)
        this.snake.coords.splice(0, 1)
    }

}