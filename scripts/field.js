import { generateRandomCoords, pickRandomObjKey, removeDuplicates, compareObjects } from './helpers.js'


export default class Field {
    constructor(ctx, config, canvas, app) {
        this.debug = app.debug
        this.ctx = ctx
        this.config = config
        this.canvas = canvas
        this.food = []

        this.foodTypes = {
            // coffee: {
            //     size: 5
            // },
            // carrot: {
            //     size: 1
            // },
            // candy: {
            //     size: 3
            // },
            // tomato: {
            //     size: 2
            // },
            // mushroom: {
            //     size: 2
            // },
            // banana: {
            //     size: 2
            // }
            pineapple: {
                size: 5
            },
            apple: {
                size: 2
            },
        }
        
        this.theme = this.config.theme
        this.defineImageSources()
        this.reloadImages()
    }


    clear() {
        let { width, height } = this.canvas
        this.ctx.clearRect(0, 0, width, height)
    }


    createFood(additionalCoords = []) {
        let foodCoords = generateRandomCoords(this.config, [...additionalCoords, ...this.food])
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

    addFoodTypesToImages(foodTypes){
        Object.keys(foodTypes).forEach(type => {
            this.sources.push({
                title: type,
                src: `images/${this.theme}/food/${type}.svg`
            })
        })
    }

    reloadImages() {
        this.defineImageSources()
        loadImages(this.sources, this.config.blockSize)
            .then(images => {
                this.images = images
            })
    }

    defineImageSources() {
        this.sources = [
            {
                title: 'head',
                src: `images/${this.theme}/snake/head.svg`
            },
            {
                title: 'body',
                src: `images/${this.theme}/snake/body.svg`
            },
            {
                title: 'curve',
                src: `images/${this.theme}/snake/curve.svg`
            },
            {
                title: 'tail',
                src: `images/${this.theme}/snake/tail.svg`
            },
            {
                title: 'little',
                src: `images/${this.theme}/snake/little.svg`
            }
        ]
        this.addFoodTypesToImages(this.foodTypes)
    }
}




function loadImages(images, size) {
    let result = {}

    return new Promise((resolve, rej) => {
        images.forEach((img, index) => {
            result[img.title] = new Image()
            result[img.title].width = size
            result[img.title].height = size
            result[img.title].onload = () => {
                if (index == images.length - 1) {
                    resolve(result)
                }
            }
            result[img.title].src = img.src
        })
    })
}