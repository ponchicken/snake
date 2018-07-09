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
        let newCoord;
        switch (direction) {
            case 'up':
                newCoord = this.coords[0].y - this.config.block.size
                this.coords[0].y = (newCoord < 0) ? this.config.canvas.height : newCoord
                break
            case 'down': 
                newCoord = this.coords[0].y + this.config.block.size
                this.coords[0].y = (newCoord > this.config.canvas.height) ? 0 : newCoord
                break
            case 'left':
                newCoord = this.coords[0].x - this.config.block.size
                this.coords[0].x = (newCoord < 0) ? this.config.canvas.width : newCoord
                break
            case 'right':
                newCoord = this.coords[0].x + this.config.block.size 
                this.coords[0].x = (newCoord > this.config.canvas.width) ? 0 : newCoord
                break
        }
        return this.coords[0]
    }
}