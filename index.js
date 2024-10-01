const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;

  constructor({ position, image }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Pellet {
  constructor({ position }) {
    this.position = position;
    this.radius = 3;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "white";
    c.fill();
    c.closePath();
  }
}

const boundaries = [];
const pellets = [];
let lastKey = "";

// Map layout
const map = [
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", "p", "|"],
  ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
];

// Function to create an image
function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

// Parse the map to place boundaries and pellets
map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case "-":
        boundaries.push(
          new Boundary({
            position: { x: Boundary.width * j, y: Boundary.height * i },
            image: createImage("./img/pipeHorizontal.png"),
          })
        );
        break;
      case "|":
        boundaries.push(
          new Boundary({
            position: { x: Boundary.width * j, y: Boundary.height * i },
            image: createImage("./img/pipeVertical.png"),
          })
        );
        break;
      case "1":
        boundaries.push(
          new Boundary({
            position: { x: Boundary.width * j, y: Boundary.height * i },
            image: createImage("./img/pipeCorner1.png"),
          })
        );
        break;
      case "2":
        boundaries.push(
          new Boundary({
            position: { x: Boundary.width * j, y: Boundary.height * i },
            image: createImage("./img/pipeCorner2.png"),
          })
        );
        break;
      case "3":
        boundaries.push(
          new Boundary({
            position: { x: Boundary.width * j, y: Boundary.height * i },
            image: createImage("./img/pipeCorner3.png"),
          })
        );
        break;
      case "4":
        boundaries.push(
          new Boundary({
            position: { x: Boundary.width * j, y: Boundary.height * i },
            image: createImage("./img/pipeCorner4.png"),
          })
        );
        break;
      case "b":
        boundaries.push(
          new Boundary({
            position: { x: Boundary.width * j, y: Boundary.height * i },
            image: createImage("./img/block.png"),
          })
        );
        break;
      case "[":
        boundaries.push(
          new Boundary({
            position: { x: Boundary.width * j, y: Boundary.height * i },
            image: createImage("./img/capLeft.png"),
          })
        );
        break;
      case "]":
        boundaries.push(
          new Boundary({
            position: { x: Boundary.width * j, y: Boundary.height * i },
            image: createImage("./img/capRight.png"),
          })
        );
        break;
      case "_":
        boundaries.push(
          new Boundary({
            position: { x: Boundary.width * j, y: Boundary.height * i },
            image: createImage("./img/capBottom.png"),
          })
        );
        break;
      case "^":
        boundaries.push(
          new Boundary({
            position: { x: Boundary.width * j, y: Boundary.height * i },
            image: createImage("./img/capTop.png"),
          })
        );
        break;
      case "+":
        boundaries.push(
          new Boundary({
            position: { x: Boundary.width * j, y: Boundary.height * i },
            image: createImage("./img/pipeCross.png"),
          })
        );
        break;
      case '5':
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width,
            y: i * Boundary.height
          },
          color: 'blue',
          image: createImage('./img/pipeConnectorTop.png')
        })
      )
        break
      case '6':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorRight.png')
          })
        )
        break
      case '7':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorBottom.png')
          })
        )
        break
      case '8':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/pipeConnectorLeft.png')
          })
        )
        break
      case ".":
        pellets.push(
          new Pellet({
            position: {
              x: Boundary.width * j + Boundary.width / 2,
              y: Boundary.height * i + Boundary.height / 2,
            },
          })
        );
        break;
    }
  });
});

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = "yellow";
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: { x: 0, y: 0 },
});

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
};

// Detect collision between circle and rectangle
function circleCollidesWithRectangle({ circle, rectangle }) {
  return (
    circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
    circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width &&
    circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x
  );
}

// Animate the game
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Handle player movement and boundary collision
  player.velocity.x = 0;
  player.velocity.y = 0;

  if (keys.w.pressed && lastKey === "w") {
    player.velocity.y = -5;
  } else if (keys.a.pressed && lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.s.pressed && lastKey === "s") {
    player.velocity.y = 5;
  } else if (keys.d.pressed && lastKey === "d") {
    player.velocity.x = 5;
  }

  // Pellet logic
  for (let i = pellets.length - 1; i >= 0; i--) {
    const pellet = pellets[i];
    pellet.draw();

    // Pellet collection logic
    if (
      Math.hypot(pellet.position.x - player.position.x, pellet.position.y - player.position.y) <
      pellet.radius + player.radius
    ) {
      pellets.splice(i, 1); // Remove pellet
    }
  }

  // Boundary logic
  boundaries.forEach((boundary) => {
    boundary.draw();

    if (circleCollidesWithRectangle({ circle: player, rectangle: boundary })) {
      if (player.velocity.x > 0) {
        player.position.x = boundary.position.x - player.radius;
      } else if (player.velocity.x < 0) {
        player.position.x = boundary.position.x + boundary.width + player.radius;
      }

      if (player.velocity.y > 0) {
        player.position.y = boundary.position.y - player.radius;
      } else if (player.velocity.y < 0) {
        player.position.y = boundary.position.y + boundary.height + player.radius;
      }

      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });

  // Update player position
  player.update();
}

animate();

// Event listeners for player controls
addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case 's':
      keys.s.pressed = true;
      lastKey = 's';
      break;
    case 'd':
      keys.d.pressed = true;
      lastKey = 'd';
      break;
  }
});

addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
});

// const boundaries = [
//   new Boundaries({
//   position: {
//     x: 0,
//     y: 0
//   }
// }),
//   new Boundaries({
//   position: {
//     x: 41,
//     y: 0
//   }
// }),
// new Boundaries({
//   position: {
//     x: 82,
//     y: 0
//   }
// })
// ]



// console.log(canvas);
