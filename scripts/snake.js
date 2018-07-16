import { checkCoords } from './helpers.js'


export default class Snake {
    constructor(config, canvas) {
        this.config = config
        this.canvas = canvas
        this.coords = [{
            x: 0,
            y: 0
        }]
        this.size = 1
    }

    move(direction) {
        let size = this.config.blockSize
        let width = this.canvas.width - size
        let height = this.canvas.height - size
        let lastCoords = this.coords[this.coords.length - 1]
        let {x, y} = lastCoords 
        
        switch (direction) {
            case 'up':
                y = lastCoords.y - size
                y = (y < 0) ? height : y
                break
            case 'down': 
                y = lastCoords.y + size
                y = (y > height ) ? 0 : y
                break
            case 'left':
                x = lastCoords.x - size
                x = (x < 0) ? width : x
                break
            case 'right':
                x = lastCoords.x + size 
                x = (x > width ) ? 0 : x
                break
        }
        
        if (checkCoords(this.coords, {x, y}))
            throw new Error('BUM!!')
        
        this.coords.push({x,y})
        
        return this.coords
    }


}

