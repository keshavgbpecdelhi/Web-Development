const durationInput = document.querySelector('#duration')
const startButton = document.querySelector('#start')
const pauseButton = document.querySelector('#pause')

const circle = document.querySelector('circle')
const perimeter = circle.getAttribute('r')*2*Math.PI
circle.setAttribute('stroke-dasharray', perimeter)

let duration = 0
const timer = new Timer(durationInput, startButton, pauseButton, {
    // here we can define events for the border animation, without having to change the Timer class code
    onStart(totalDuration) {
        console.log('Timer started!')

        duration = totalDuration
    }, 
    onTick(timeRemaining) {
        console.log('Timer just ticked down!')
        
        circle.setAttribute('stroke-dashoffset', 
            ((perimeter*timeRemaining)/duration) - perimeter
        )
    }, 
    onComplete() {
        console.log('Timer completed!')
    }
})