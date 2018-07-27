import Field from './field.js'
import Game from './game.js'

const appEl = document.querySelector('.app')
const container = document.querySelector('.field-container')
const canvasEl = document.getElementById('field')
const scoresEl = document
    .getElementById('scores')
    .querySelector('span')
const modal = document.getElementById('modal')
const themeButtons = modal.querySelector('.modal-themes')
const gameoverScoresEl = modal.querySelector('.gameover-scores span')

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
        this.debug = false

        this.config = {
            blockSize: 40,
            theme: localStorage.getItem('theme') || 'forest',
            lineWidth: 2,
            directions: {
                up: 'h',
                right: 'v',
                down: 'h',
                left: 'v',
            }
        }

        this.sound = {
            bg: new Audio('sound/song.mp3'),
            over: new Audio('sound/gameover.mp3')
        }
        this.sound.bg.loop = true

        Object.keys(this.sound).map(key => {
            this.sound[key].volume  = 0.3
        })


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

        this.setTheme(this.config.theme)
        
        this.startListeners()
    }

    setCanvasParams() {
        let {blockSize} = this.config
        let horizontal = Math.floor(container.offsetWidth / blockSize)
        let vertical = Math.floor(container.offsetHeight / blockSize)
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
        console.log(this.scores)
        scoresEl.textContent = this.scores
    }

    gameOver() {
        this.sound.over.play()
        modal.classList.add('modal-gameover')
        this.game.toggle()
        this.modalToggle()
        this.clearGameData()
    }

    clearGameData() {
        this.game.started = false
        this.sound.bg.currentTime = 0
        gameoverScoresEl.textContent = this.scores
        this.scores = 0
        scoresEl.textContent = 0
    }


    startListeners() {
        modal.addEventListener('click', (e) => {
            let classes = e.target.classList
            if (classes.contains('game-start')) {
                this.field.clear()
                this.game.toggle()
                this.game.snake.defineCoords()
                this.modalToggle()
                modal.classList.remove('modal-gameover')
            } else if (classes.contains('theme')) {
                this.setTheme(e.target.dataset.theme)
                this.field.reloadImages()

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
                    this.modalToggle()
                    break
            }
        })
    }

    modalToggle() {
        modal.classList.toggle('active')
    }

    setTheme(theme) {
        this.theme = theme
        console.log(this.theme)
        localStorage.setItem('theme', this.theme)
        this.field.theme = this.theme

        let prevThemeEl = themeButtons.querySelector('.active')
        if (prevThemeEl) {
            prevThemeEl.classList.remove('active')
            appEl.classList.remove(prevThemeEl.dataset.theme)
        }
        appEl.classList.add(this.theme)
        themeButtons.querySelector(`[data-theme=${this.theme}]`).classList.add('active')

        this.clearGameData()
    }

}

function adjustCanvasSize(canvas) {
    console.log('adjusting', canvas)
    canvasEl.classList.add('adjusted')
    canvasEl.setAttribute("width", canvas.width)
    canvasEl.setAttribute("height", canvas.height)
}