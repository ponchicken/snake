import { generateRandomCoords, pickRandomObjKey, removeDuplicates, compareObjects } from './helpers.js'

const sources = [
    {
        title: 'head',
        src: `images/snake/head.svg`
    },
    {
        title: 'body',
        src: `images/snake/body.svg`
    },
    {
        title: 'curve',
        src: `images/snake/curve.svg`
    },
    {
        title: 'tail',
        src: `images/snake/tail.svg`
    },
    {
        title: 'little',
        src: `images/snake/little.svg`
    }
]

export default class Field {
    constructor(ctx, config, canvas, app) {
        this.debug = app.debug
        this.ctx = ctx
        this.config = config
        this.canvas = canvas
        this.food = []

        this.foodTypes = {
            pizza: {
                size: 5
            },
            cookie: {
                size: 1
            },
            pie: {
                size: 3
            },
            tomato: {
                size: 2
            },
            mushroom: {
                size: 2
            },
            apple: {
                size: 1
            },
            banana: {
                size: 2
            }
        }

        addFoodTypesToImages(this.foodTypes)

        
        loadImages(sources)
            .then(images => {
                this.images = images
                app.game.toggle()
            })
    }


    clear() {
        let { width, height } = this.canvas
        this.ctx.clearRect(0, 0, width, height)
    }


    createFood(additionalCoords = []) {
        let foodCoords = generateRandomCoords([...additionalCoords, ...this.food], this.config)
        let foodType = pickRandomObjKey(this.foodTypes)
        let food = { ...foodCoords, type: foodType}
        this.food.push(food)
        this.displayFood(food)
    }

    displayFood(food) {
        let foodType = this.foodTypes[food.type]
        this.ctx.drawImage(this.images[food.type], food.x, food.y, this.config.blockSize, this.config.blockSize)
    }

    displayAllFood() {
        this.food.forEach(coords => {
            this.displayFood(coords)
        })
    }



    displaySnake(snake) {
        const ctx = this.ctx
        let size = this.config.blockSize
        const radius = size / 2
        let degrees = 0
        const directions = this.config.directions
        
        let filtered = removeDuplicates(snake.coords, ['x', 'y'])
        filtered.forEach((coord, index) => {

            let img
            if (filtered.length == 1) {
                img = 'little'
            } else if (index == 0) {
                img = 'head'
            } else if (index == filtered.length - 1) {
                img = 'tail'
            } else if (coord.from != coord.to) {
                img = 'curve'

                Object.keys(this.config.directions).forEach((dir, index, directions) => {
                    let nextIndex = (directions[index + 1]) ? index + 1 : 0
                    if (coord.from == dir && coord.to == directions[nextIndex]) {
                        degrees += 90
                    }
                })
            } else {
                img = 'body'
            }

            switch (coord.to) {
                case 'up':
                    degrees += 0
                    break
                case 'right':
                    degrees += 90
                    break
                case 'down':
                    degrees += 180
                    break
                case 'left':
                    degrees += 270
                    break
            }
            if (this.debug)
                ctx.fillRect(coord.x, coord.y, 2, 2)

            ctx.save()
            ctx.translate(coord.x + radius, coord.y + radius)
            ctx.rotate(degrees*Math.PI/180)
            ctx.translate(-radius, -radius)
            ctx.drawImage(this.images[img], 0, 0, size, size)

            ctx.restore()
            degrees = 0
        })
        console.groupEnd('some')
    }

    drawCircle(coords) {
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



function addFoodTypesToImages(foodTypes){
    Object.keys(foodTypes).forEach(type => {
        sources.push({
            title: type,
            src: `images/food2/${type}.svg`
        })
    })
}

function loadImages(images) {
    let result = {}

    return new Promise((resolve, rej) => {
        images.forEach((img, index) => {
            result[img.title] = new Image()
            result[img.title].onload = () => {
                if (index == images.length - 1) {
                    console.log(result)
                    resolve(result)
                }
            }
            result[img.title].src = img.src
        })
    })
}