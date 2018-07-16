import { generateRandomCoords, pickRandomObjKey } from './helpers.js'

export default class Field {
    constructor(ctx, config, canvas) {
        this.ctx = ctx
        this.config = config
        this.canvas = canvas
        this.food = []

        this.foodTypes = {
            orange: {
                color: 'rgba(255, 152, 155, 0.5)',
                scores: 20
            },
            apple: {
                color: 'rgba(152, 255, 155, 0.5)',
                scores: 30
            }
        }
    }


    displaySnake(snake, ctx = this.ctx) {
        const lineWidth = this.config.lineWidth
        const size = this.config.blockSize - lineWidth * 2
        this.ctx.fillStyle = 'rgba(55, 152, 200, 0.5)'
        snake.coords.forEach((coord, index) => {
            if (index == snake.coords.length - 1)
                this.ctx.fillStyle = 'rgba(155, 152, 200, 0.5)'
            let {x,y} = {
                x: coord.x + lineWidth,
                y: coord.y + lineWidth
            }
            this.ctx.fillRect( x, y, size, size )
            this.ctx.strokeRect(x, y, size, size)
        })
    }

    createFood(additionalCoords = []) {
        let foodCoords = generateRandomCoords([...additionalCoords, ...this.food], this.config)
        let foodType = pickRandomObjKey(this.foodTypes)
        let food = { ...foodCoords, type: foodType}
        this.food.push(food)
        this.displayFood(food)
    }

    displayFood(food) {
        this.ctx.fillStyle = this.foodTypes[food.type].color
        this.drawCircle(food)
    }

    displayAllFood() {
        this.food.forEach(coords => {
            this.displayFood(coords)
        })
    }

    clear() {
        let { width, height } = this.canvas
        this.ctx.clearRect(0, 0, width, height)
    }


    drawCircle(coords) {
        // console.log('Drawing', coords)
        const ctx = this.ctx
        const radius = this.config.blockSize / 2
        const center = {
            x: coords.x + radius,
            y: coords.y + radius
        }
    
        ctx.beginPath()
        ctx.arc(center.x, center.y, radius / 2, 0, Math.PI * 2)
        ctx.fill()
    }

}
