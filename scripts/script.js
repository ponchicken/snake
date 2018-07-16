import App from './app.js'
import { removeDuplicates } from './helpers.js'


let arr = [
    {x: 350, y: 200},
    {x: 400, y: 200},
    {x: 450, y: 200},
    {x: 450, y: 200}
]
let objectReference = {x: 450, y: 200}

console.log(removeDuplicates(arr))

function ready() {
    let app = new App()



    if (app.debug) {
        document.addEventListener('click', () => {
            console.log(app.scores)
        })
    }

}


document.addEventListener("DOMContentLoaded", ready);