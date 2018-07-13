export default class Field {
    constructor(ctx, config) {
        this.ctx = ctx
        this.config = config
        console.log(this.config.block.amount)
   
        this.food = [
            { x: 40, y: 0 },
            { x: 160, y: 0 }
        ]
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
        let size = this.config.block.size
        this.ctx.fillStyle = 'rgba(55, 152, 200, 0.5)'
        snake.coords.forEach(coord => {
            // console.log(coord)
            this.ctx.fillRect( coord.x, coord.y, size, size )
        })
    }

    displayFood() {
        let size = this.config.block.size
        this.ctx.fillStyle = 'rgba(255, 152, 155, 0.5)'
        this.food.forEach(el => {
            this.ctx.fillRect( el.x, el.y, size, size )
        })
    }

    clearRect(snake) {
        let tailCoords = snake.coords[0]
        let size = this.config.block.size
        // size + 1 fixes stripe from cleared rectangle
        this.ctx.clearRect( tailCoords.x, tailCoords.y, size + 1, size + 1 )
    }

    clear() {
        let { width, height } = this.config.canvas
        this.ctx.clearRect(0, 0, width, height)
    }
}