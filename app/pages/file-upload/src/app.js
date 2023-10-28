import Clock from './deps/clock.js';
import View from './view.js'

const view = new View()

const clock = new Clock()

let took = ''

view.configureOnFileChange(file => {
    clock.start((time) => {
        took = time;
        view.updateElapsdeTime(`Process started ${time}`)
    })

    setTimeout(() => {
        clock.stop()
        view.updateElapsdeTime(`Process took ${took.replace('ago', '')}`)
    }, 5000)
})