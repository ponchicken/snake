export default class Snake {
    constructor(config) {
        this.config = config
        this.coords = [{
            x: 0,
            y: 0
        }]
        this.size = 1
    }

    move(direction) {
        let size = this.config.block.size
        let width = this.config.canvas.width - size
        let height = this.config.canvas.height - size
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
        this.coords.push({x, y})
        return this.coords
    }
}