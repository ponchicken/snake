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

    let snake = new Snake()
    let game = new Game({
        ctx, field, snake
    })



}




document.addEventListener("DOMContentLoaded", ready);