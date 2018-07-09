export default class Field {
    constructor(ctx, config) {
        this.ctx = ctx
        this.config = config
        console.log(this.config.block.amount)
    }

    
    getCanvasParams(container) {
        let { block, canvas } = this.config
        let horizontal = Math.floor(container.offsetWidth / block.size)
        let vertical = Math.floor(container.offsetHeight / block.size)
        return {
            canvas: {
                width: horizontal * block.size, 
                height: vertical * block.size
            },
            blocks: {
                horizontal, 
                vertical, 
                sum: horizontal * vertical 
            }
        }
    }

    adjustSize(container, canvas) {
        let adjusted = this.getCanvasParams(container)
        canvas.classList.add('adjusted')
        canvas.setAttribute("width", adjusted.canvas.width)
        canvas.setAttribute("height", adjusted.canvas.height)
        return {
            width: adjusted.canvas.width,
            height: adjusted.canvas.height
        }
    }


    displaySnake(snake) {
        // console.log(snake)
        let headCoords = snake.coords[snake.coords.length - 1]
        let size = this.config.block.size
        this.ctx.fillStyle = 'rgba(55, 152, 200, 0.5)'
        this.ctx.fillRect( headCoords.x, headCoords.y, size, size )
    }

    clearRect(snake) {
        let tailCoords = snake.coords[0]
        let size = this.config.block.size
        this.ctx.clearRect( tailCoords.x, tailCoords.y, size, size )
    }
}