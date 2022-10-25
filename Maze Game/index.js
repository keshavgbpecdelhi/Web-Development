const { Engine, Render, Runner, World, Bodies, Body, Events }  = Matter

const WIDTH = window.innerWidth - 3.5
const HEIGHT = window.innerHeight - 3.5
const M = 3, N = 3
const UNIT_LENGTH_X = WIDTH / M
const UNIT_LENGTH_Y = HEIGHT / N

const engine = Engine.create()
engine.world.gravity.y = 0
const { world } = engine
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width: WIDTH,
        height: HEIGHT
    }
})
Render.run(render)
Runner.run(Runner.create(), engine)

// walls
const walls = [
    Bodies.rectangle(WIDTH/2, 0, WIDTH, 2, {
        isStatic: true
    }),
    Bodies.rectangle(WIDTH/2, HEIGHT, WIDTH, 2, {
        isStatic: true
    }),
    Bodies.rectangle(0, HEIGHT/2, 2, HEIGHT, {
        isStatic: true
    }),
    Bodies.rectangle(WIDTH, HEIGHT/2, 2, HEIGHT, {
        isStatic: true
    })
]
World.add(world, walls)


const grid = Array(M).fill(null).map(() => Array(N).fill(false))
// console.log(grid)

const verticals = Array(M).fill(null).map(() => Array(N-1).fill(false))
// console.log(verticals)

const horizontals = Array(N-1).fill(null).map(() => Array(M).fill(false))
// console.log(horizontals)

const shuffle = (arr) => {
    let counter = arr.length

    while (counter > 0) {
        const i = Math.floor(Math.random()*counter)   

        counter--

        const temp = arr[counter]
        arr[counter] = arr[i]
        arr[i] = temp
    }

    return arr
}

const recurse = (row, column) => {
    if (grid[row][column])
        return

    grid[row][column] = true  // is visited

    const neighbours = shuffle([
        [row-1, column, 'up'],
        [row, column+1, 'right'],
        [row+1, column, 'down'],
        [row, column-1, 'left']
    ])

    neighbours.forEach(neighbour => {
        const [nextRow, nextColumn, direction] = neighbour

        if (nextRow<0 || nextRow>=M || nextColumn<0 || nextColumn>=N)
            return  // same as continue clause
            
        if (grid[nextRow][nextColumn])  // is visited
            return

        if (direction === 'left')
            verticals[row][column-1] = true
        else if (direction === 'right')
            verticals[row][column] = true
        else if (direction === 'up')
            horizontals[row-1][column] = true
        else  // down
            horizontals[row][column] = true

        recurse(nextRow, nextColumn)
    })  

}

const startRow = Math.floor(Math.random()*M)
const startColumn = Math.floor(Math.random()*N)
recurse(startRow, startColumn)

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open)
            return
        
        const wall = Bodies.rectangle(
            columnIndex*UNIT_LENGTH_X + UNIT_LENGTH_X/2,
            rowIndex*UNIT_LENGTH_Y + UNIT_LENGTH_Y,
            UNIT_LENGTH_X,
            5,
            {
                isStatic: true,
                label: 'wall',
                render: {
                    fillStyle: 'red'
                }
            }
        )

        World.add(world, wall)
    })
})

verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open)
            return
        
        const wall = Bodies.rectangle(
            columnIndex*UNIT_LENGTH_X + UNIT_LENGTH_X,
            rowIndex*UNIT_LENGTH_Y + UNIT_LENGTH_Y/2,
            5,
            UNIT_LENGTH_Y,
            {
                isStatic: true,
                label: 'wall',
                render: {
                    fillStyle: 'red'
                }
            }
        )

        World.add(world, wall)
    })
})

// object to be taken to the goal
const object = Bodies.circle(
    UNIT_LENGTH_X/2,
    UNIT_LENGTH_Y/2,
    Math.min(UNIT_LENGTH_X, UNIT_LENGTH_Y)/4,  // ball radius
    {
        label: 'object',
        render: {
            fillStyle: 'blue'
        }
    }
)
World.add(world, object)

// goal
const goal = Bodies.rectangle(
    WIDTH - UNIT_LENGTH_X/2,
    HEIGHT - UNIT_LENGTH_Y/2,
    UNIT_LENGTH_X/2,
    UNIT_LENGTH_Y/2,
    {
        isStatic: true,
        label: 'goal',
        render: {
            fillStyle: 'green'
        }
    }
)
World.add(world, goal)

// detecting keypresses for movement
document.addEventListener('keydown', (event) => {
    const {x, y} = object.velocity 
    if (event.key === 'w' || event.key === 'ArrowUp'){
        Body.setVelocity(object, {x: x, y:y-5})
    }
    else if (event.key === 'd' || event.key === 'ArrowRight'){
        Body.setVelocity(object, {x: x+5, y: y})
    }
    else if (event.key === 's' || event.key === 'ArrowDown'){
        Body.setVelocity(object, {x: x, y: y+5})
        
    }
    else if (event.key === 'a' || event.key === 'ArrowLeft'){
        Body.setVelocity(object, {x: x-5, y: y})
    }
})
// document.addEventListener('keyup', event =>{
//     const {x, y} = object.velocity 
//     if (event.key === 'w' || event.key === 'ArrowUp'){
//         Body.setVelocity(object, {x: x, y:0})
//     }
//     else if (event.key === 'd' || event.key === 'ArrowRight'){
//         Body.setVelocity(object, {x: 0, y: y})
//     }
//     else if (event.key === 's' || event.key === 'ArrowDown'){
//         Body.setVelocity(object, {x: x, y:0})
        
//     }
//     else if (event.key === 'a' || event.key === 'ArrowLeft'){
//         Body.setVelocity(object, {x: 0, y: y})
//     }
// })

// win condition (collision of object with goal)
Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach(collision => {
        const labels = ['object', 'goal']

        if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyA.label)) {
            console.log('Won!!')

            world.gravity.y = 1

            world.bodies.forEach(body => {
                if (body.label === 'wall') {
                    // walls are no longer static
                    Body.setStatic(body, false)
                }
            })

            document.querySelector('.winner').classList.remove('hidden')
        }
    })
})
