export default class Snake {
    constructor() {
        this.coords = [{
            x: 0,
            y: 0
        }]
        this.size = 1
    }

    move(direction) {
        switch (direction) {
            case 'up':
                this.coords[0].y -= 20
                break
            case 'down': 
                this.coords[0].y += 20
                break
            case 'left':
                this.coords[0].x -= 20
                break
            case 'right':
                this.coords[0].x += 20 
        }
        return this.coords[0]
    }
}