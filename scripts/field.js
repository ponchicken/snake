import { generateRandomCoords, pickRandomObjKey, removeDuplicates } from './helpers.js'

const sources = [
    {
        title: 'head',
        src: `/images/snake/head.svg`
    },
    {
        title: 'body',
        src: `/images/snake/body.svg`
    },
    {
        title: 'curve',
        src: `/images/snake/curve.svg`
    },
    {
        title: 'tail',
        src: `/images/snake/tail.svg`
    },
    {
        title: 'little',
        src: `/images/snake/little.svg`
    }
]

export default class Field {
    constructor(ctx, config, canvas) {
        this.ctx = ctx
        this.config = config
        this.canvas = canvas
        this.food = []

        this.foodTypes = {
            mushroom: {
                color: 'rgba(255, 152, 155, 0.5)',
                scores: 20
            },
            apple: {
                color: 'rgba(152, 255, 155, 0.5)',
                scores: 30
            },
            banana: {
                color: 'yellow',
                scores: 40
            }
        }

        addFoodTypesToImages(this.foodTypes)

        
        loadImages(sources)
            .then(images => this.images = images)
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
        // let coords = getSmallerCoords(this.config.blockSize, food)
        // this.ctx.drawImage(this.images[food.type], coords.x, coords.y, coords.size, coords.size)
        this.ctx.drawImage(this.images[food.type], food.x, food.y, this.config.blockSize, this.config.blockSize)
            // this.ctx.fillStyle = foodType.color
            // this.drawCircle(food)
    }

    displayAllFood() {
        this.food.forEach(coords => {
            this.displayFood(coords)
        })
    }



    displaySnake(snake, from, to) {
        const ctx = this.ctx
        const size = this.config.blockSize
        
        let filtered = removeDuplicates(snake.coords)
        filtered.forEach((coord, index) => {
                //TODO check directions from and to
                let img
                if (filtered.length == 1) {
                    img = this.images['little']
                }
                else if (index == 0) {
                    img = this.images['tail']
                }
                else if (index == filtered.length - 1) {
                    img = this.images['head']
                }
                else {
                    img = this.images['body']
                }


                ctx.drawImage(img, coord.x, coord.y, size, size)
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

    drawCrescent(coords) {
        ctx.beginPath();
        ctx.moveTo(50,20);
        ctx.bezierCurveTo(230, 30, 150, 60, 50, 100);
        ctx.bezierCurveTo(230, 30, 150, 60, 50, 100);
        ctx.fill();
    }

}



function addFoodTypesToImages(foodTypes){
    Object.keys(foodTypes).forEach(type => {
        sources.push({
            title: type,
            src: `/images/food2/${type}.svg`
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