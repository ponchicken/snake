import Field from './field.js'
import Snake from './snake.js'
import Game from './Game.js'

const appContainer = document.getElementById('app')
const container = document.querySelector('.field-container')
const canvas = document.getElementById('field')
const ctx = canvas.getContext('2d')




function ready() {
    let config = {
        block: {
            size: 40
        },
        canvas: {
            width: canvas.offsetWidth,
            height: canvas.offsetHeight
        }
    }


    console.log(config)

    let field = new Field(ctx, config)
    config.canvas = field.adjustSize(container, canvas)

    let snake = new Snake(config)
    let game = new Game({
        ctx, field, snake
    })



}




document.addEventListener("DOMContentLoaded", ready);