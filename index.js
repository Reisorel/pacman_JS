const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Boundary {
  static width = 40
  static heigth = 40
  constructor({ position }) {
    this.position = position
    this.width = 40
    this.height = 40
  }

  draw() {
    c.fillStyle = 'blue'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

class Player {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.radius = 15
  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0,
      Math.PI * 2)
    c.fillStyle = 'yellow',
      c.fill()
    c.closePath()
  }
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}


const boundaries = []

const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.heigth + Boundary.heigth / 2,
  },
  velocity: {
    x: 0,
    y: 0
  }
})
const keys = {
  z: {
    pressed: false
  },
  q: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

let lastKey = ''

const map = [
  ['-', '-', '-', '-', '-', '-', '-',],
  ['-', ' ', ' ', ' ', ' ', ' ', '-',],
  ['-', ' ', '-', ' ', '-', ' ', '-',],
  ['-', ' ', ' ', ' ', ' ', ' ', '-',],
  ['-', '-', '-', '-', '-', '-', '-',]
]

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case '-':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.heigth * i
            }
          }))
        break
    }
  })
})
function circleCollideWithRectangel({
  circle,
  rectangle
}) {
  return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height
    && circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x
    && circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y
    && circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
  )
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  if (keys.z.pressed && lastKey == 'z') {
    player.velocity.y = -5
  } else if (keys.q.pressed && lastKey == 'q') {
    player.velocity.x = -5
  } else if (keys.s.pressed && lastKey == 's') {
    player.velocity.y = 5
  } else if (keys.d.pressed && lastKey == 'd') {
    player.velocity.x = 5
  }

  boundaries.forEach((boundary) => {
    boundary.draw()

    if (
      circleCollideWithRectangel({
        circle: player,
        player: boundary
      })
    ) {
      console.log('we are colliding');
      player.velocity.x = 0
      player.velocity.y = 0
    }
  })
  player.update()
  // player.velocity.x = 0
  // player.velocity.y = 0


}

animate()

addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'z':
      keys.z.pressed = true
      lastKey = 'z'
      break
    case 'q':
      keys.q.pressed = true
      lastKey = 'q'
      break
    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break
    case 'd':
      lastKey = 'd'
      keys.d.pressed = true
      break
  }
  console.log(keys.d.pressed)
  console.log(keys.s.pressed)
})

addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'z':
      keys.z.pressed = false
      break
    case 'q':
      keys.q.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }
  console.log(keys.d.pressed)
  console.log(keys.s.pressed);
})
