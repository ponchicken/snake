export default class Game {

    constructor({ctx, field, snake}) {
        Object.assign(this, {ctx, field, snake})
        this.start()
    }

    start() {
        this.field.displaySnake(this.ctx, this.snake)
    }

}