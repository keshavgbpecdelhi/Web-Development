class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput
        this.startButton = startButton
        this.pauseButton = pauseButton
        if (callbacks) {  // to communicate to the outside world about the ongoing timer events
            this.onStart = callbacks.onStart
            this.onTick = callbacks.onTick
            this.onComplete = callbacks.onComplete
        }

        this.startButton.addEventListener('click', this.start)
        this.pauseButton.addEventListener('click', this.pause)
    }

    get timeRemaining() {
        return parseFloat(this.durationInput.value)
    }
    set timeRemaining(updatedTime) {
        this.durationInput.value = updatedTime.toFixed(2)
    }

    start = () => {
        console.log('start the timer')

        if (this.onStart)
            this.onStart(this.timeRemaining)

        this.tick()
        this.interval = setInterval(this.tick, 10)
        console.log(this.interval)
    }

    tick = () => {
        console.log('tick!')

        if (this.timeRemaining <= 0) {
            this.pause()

            if (this.onComplete)
                this.onComplete()
        }

        else {
            // const timeRemaining = parseFloat(this.durationInput.value)
            // this.durationInput.value = timeRemaining-1
            // setter         //  getter
            this.timeRemaining = this.timeRemaining - 0.01

            if (this.onTick)
                this.onTick(this.timeRemaining)
        }
    }

    pause = () => {
        clearInterval(this.interval)
    }
}