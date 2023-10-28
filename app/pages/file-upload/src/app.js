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

async function fakeFetch() {
    const filePath = '/videos/frag_bunny.mp4'
    const response = await fetch(filePath)

    const file = new File([await response.blob()], filePath)

    const event = new Event('change')

    Reflect.defineProperty(
        event,
        'target',
        {
            value: {
                files: [file]
            }
        }
    )

    document.getElementById('fileUpload').dispatchEvent(event)
}

fakeFetch()