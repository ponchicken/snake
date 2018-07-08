export default class Field {
    constructor(config) {
        this.config = config
        this.config.block.amount = this.getBlocksAmount(this.config)
        console.log(this.config.block.amount)
        // this.coords = this.getFieldCoords()
        // console.table(this.coords)
    }

    
    getBlocksAmount(config) {
        let { block, canvas } = config
        let horizontal = Math.floor(canvas.width / block.size)
        let vertical = Math.floor(canvas.height / block.size)
        return { 
            horizontal, 
            vertical, 
            sum: horizontal * vertical 
        }
    }


    displaySnake(ctx, snake) {
        console.log(snake)
        let headCoords = snake.coords[0]
        let size = this.config.block.size
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
        ctx.fillRect( headCoords.x, headCoords.y, 20, 20)
        ctx.fillRect(10, 10, 100, 100);
    }


    // getFieldCoords() {
    //     let coords = []
    //     let value = 0;
    //     for ( let i=0; i<this.config.blocksAmount.vertical; i++) {
    //         coords[i] = []
    //         for ( let j=0; j<this.config.blocksAmount.horizontal; j++) {
    //             coords[i][j] = value  
    //             value += this.config.block.size
    //         }
    //     }
    //     return coords
    // }

    // displayBlocks(ctx, config) {
    //     let { block, canvas, blocksAmount } = config
    //     for ( let i = 0; i < blocksAmount; i++ ) {
    //         let coords = {
    //             x: i * block.size,
    //             y: 
    //         }
    //         ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
    //         ctx.fillRect()
    //     }
    // }
}