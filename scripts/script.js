import Field from './field.js'
import Snake from './snake.js'
import Game from './Game.js'

const appContainer = document.getElementById('app')
const canvas = document.getElementById('field')
const ctx = canvas.getContext('2d')




function ready() {
    let config = {
        block: {
            size: 20
        },
        canvas: {
            width: canvas.offsetWidth,
            height: canvas.offsetHeight
        }
    }

    canvas.setAttribute("width", config.canvas.width)
    canvas.setAttribute("height", config.canvas.height)

    let field = new Field(config)
    // field.displayBlocks(ctx, field.config)

    let snake = new Snake()
    let game = new Game({
        ctx, field, snake
    })


    // let field = {
    //     width: getFieldWidth(),
    //     height: getFieldHeight()
    // }
    // let blocks = getBlocksAmount()

    // while ( blocks > 0 ) {
    //     let block = document.createElement('div')
    //     block.className = 'block'
    //     fieldContainer.appendChild(block)
    //     blocks--;
    // }


}




document.addEventListener("DOMContentLoaded", ready);