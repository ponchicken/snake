export default class Field {
    constructor(ctx, config) {
        this.ctx = ctx
        this.config = config
        console.log(this.config.block.amount)
   
        this.food = [
            { x: 40, y: 0 },
            { x: 160, y: 0 },
            { x: 200, y: 40 },
            { x: 160, y: 120 }
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


    displaySnake(snake, ctx = this.ctx) {
        const size = this.config.block.size
        this.ctx.fillStyle = 'rgba(55, 152, 200, 0.5)'
        snake.coords.forEach((coord, index) => {
            this.ctx.fillRect( coord.x, coord.y, size, size )
        })
    }

    displayFood() {
        const size = this.config.block.size
        this.ctx.fillStyle = 'rgba(255, 152, 155, 0.5)'
        this.food.forEach(coords => {
            this.drawCircle(coords)
            // this.ctx.fillRect( el.x, el.y, size, size )
        })
    }

    clear() {
        let { width, height } = this.config.canvas
        this.ctx.clearRect(0, 0, width, height)
    }


    drawCircle(coords) {
        const ctx = this.ctx
        const radius = this.config.block.size / 2
        const center = {
            x: coords.x + radius,
            y: coords.y + radius
        }
    
        ctx.beginPath()
        ctx.arc(center.x, center.y, radius / 2, 0, Math.PI * 2)
        ctx.fill()
    }

}
