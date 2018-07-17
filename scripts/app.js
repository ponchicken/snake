import Field from './field.js'
import Game from './game.js'

const container = document.querySelector('.field-container')
const canvasEl = document.getElementById('field')
const scoresEl = document
    .getElementById('scores')
    .querySelector('span')
const modal = document.getElementById('modal')

let keyCode = {
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    space: 32,
    enter: 13
}

export default class App {
    constructor() {
        this.debug = true

        this.config = {
            blockSize: 50,
            lineWidth: 2,
            directions: {
                up: 'h',
                right: 'v',
                down: 'h',
                left: 'v',
            }
        }


        this.ctx = canvasEl.getContext('2d')
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'
        this.ctx.lineWidth = this.config.lineWidth
        this.ctx.lineJoin = 'round'
        this.ctx.lineCap = 'round'

        this.scores = 0
        this.gameIsRunning = false
        this.setCanvasParams()
        adjustCanvasSize(this.canvas)

        this.field = new Field(this.ctx, this.config, this.canvas, this)
        this.game = new Game(this)
        
        this.startListeners()
    }

    setCanvasParams() {
        let {blockSize} = this.config
        let horizontal = Math.floor(container.offsetWidth / blockSize)
        let vertical = Math.floor(container.offsetHeight / blockSize)
        console.log(blockSize)
        this.canvas = {
            width: horizontal * blockSize,
            height: vertical * blockSize
        }
        this.config.blocksAmount = {
            horizontal,
            vertical,
            sum: horizontal * vertical
        }
    }

    addScores(scores) {
        this.scores += scores
        scoresEl.textContent = this.scores
    }

    gameOver() {}


    startListeners() {
        modal.addEventListener('click', function (e) {
            let classes = e.target.classList
            if (classes.includes('game-start')) {
                // this.game.start()
                console.log('game start')
            }
        })
        
        document.addEventListener('keydown', (e) => {
            e.preventDefault()
            switch (e.keyCode) {
                case keyCode.up:
                    this.game.changeDirection('up')
                    break
                case keyCode.down:
                    this.game.changeDirection('down')
                    break
                case keyCode.left:
                    this.game.changeDirection('left')
                    break
                case keyCode.right: 
                    this.game.changeDirection('right')
                    break
                case keyCode.space:
                    this.game.toggle()
                    break
            }
        })
    }

}

function adjustCanvasSize(canvas) {
    console.log('adjusting', canvas)
    canvasEl.classList.add('adjusted')
    canvasEl.setAttribute("width", canvas.width)
    canvasEl.setAttribute("height", canvas.height)
}