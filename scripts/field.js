export default class Field {
    constructor(config) {
        this.config = config
        this.config.block.amount = this.getBlocksAmount(this.config)
        console.log(this.config.block.amount)
    }

    
    getBlocksAmount(config) {
        let { block, canvas } = config
        let horizontal = Math.floor(canvas.width / block.size)
        let vertical = Math.floor(canvas.height / block.size)
        return { 
            horizontal, 
            vertical, 
            sum: horizontal * vertical 
        }
    }


    displaySnake(ctx, snake) {
        console.log(snake)
        let headCoords = snake.coords[snake.coords.length - 1]
        let size = this.config.block.size
        ctx.fillStyle = 'rgba(55, 152, 200, 0.5)'
        ctx.fillRect( headCoords.x, headCoords.y, size, size )
    }

    clearRect(ctx, snake) {
        let tailCoords = snake.coords[0]
        let size = this.config.block.size
        ctx.clearRect( tailCoords.x, tailCoords.y, size, size )
    }
}