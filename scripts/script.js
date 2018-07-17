import App from './app.js'
import { removeDuplicates } from './helpers.js'


function ready() {
    let app = new App()



    if (app.debug) {
        document.addEventListener('click', () => {
            console.log(app.scores)
        })
    }

}


document.addEventListener("DOMContentLoaded", ready);