// Séléctionne l'élément canvas du doc HTML et récupère le contexte 2D
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//Définit largeur et hauteur du canvas aux dimensions de la fenêtre navigateur
canvas.width = innerWidth
canvas.height = innerHeight

class Boundary {
  static width = 40
  static height = 40
  constructor({ position, image }) {
    this.position = position
    this.width = 40
    this.height = 40
    this.image = image
  }

  draw() {
    // c.fillStyle = 'blue'
    // c.fillRect(this.position.x, this.position.y,
    // this.width, this.height)
    c.drawImage(this.image, this.position.x, this.position.y)
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
    y: Boundary.height + Boundary.height / 2,
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
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '8', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
  ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]

function createImage(src) {
  const image = new Image()
  image.src = src
  return image
}

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case '-':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeHorizontal.png')
          })
        )
        break
      case '|':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeVertical.png')
          })
        )
        break
      case '1':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeCorner1.png')
          })
        )
        break
      case '2':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeCorner2.png')
          })
        )
        break
      case '3':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeCorner3.png')
          })
        )
        break
      case '4':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeCorner4.png')
          })
        )
        break
      case 'b':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/block.png')
          })
        )
        break
      case '[':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/capLeft.png')
          })
        )
        break
      case ']':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/capRight.png')
          })
        )
        break
      case '_':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/capBottom.png')
          })
        )
        break
      case '^':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/capTop.png')
          })
        )
        break
      case '+':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeCross.png')
          })
        )
        break
      case '5':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeConnectorTop.png')
          })
        )
        break
      case '6':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeConnectorRight.png')
          })
        )
        break
      case '7':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeConnectorLeft.png')
          })
        )
        break
      case '8':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./images/pipeConnectorBottom.png')
          })
        )
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
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (circleCollideWithRectangel({
        circle: {
          ...player, velocity: {
            x: 0,
            y: -5
          }
        },
        rectangle: boundary
      })
      ) {
        player.velocity.y = 0
        break
      } else {
        player.velocity.y = -5
      }
    }

  } else if (keys.q.pressed && lastKey == 'q') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (circleCollideWithRectangel({
        circle: {
          ...player, velocity: {
            x: -5,
            y: 0
          }
        },
        rectangle: boundary
      })
      ) {
        player.velocity.x = 0
        break
      } else {
        player.velocity.x = -5
      }
    }
  } else if (keys.s.pressed && lastKey == 's') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (circleCollideWithRectangel({
        circle: {
          ...player, velocity: {
            x: 0,
            y: 5
          }
        },
        rectangle: boundary
      })
      ) {
        player.velocity.y = 0
        break
      } else {
        player.velocity.y = 5
      }
    }
  } else if (keys.d.pressed && lastKey == 'd') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if (circleCollideWithRectangel({
        circle: {
          ...player, velocity: {
            x: 5,
            y: 0
          }
        },
        rectangle: boundary
      })
      ) {
        player.velocity.x = 0
        break
      } else {
        player.velocity.x = 5
      }
    }
  }

  boundaries.forEach((boundary) => {
    boundary.draw()

    if (
      circleCollideWithRectangel({
        circle: player,
        rectangle: boundary
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
