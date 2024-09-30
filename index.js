const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;
  constructor({ position }) {
    this.position = position;
    this.width = Boundary.width;
    this.height = Boundary.height;
  }

  draw() {
    c.fillStyle = 'pink';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

let lastKey = ""; // Corrected casing to match throughout the code

const map = [
  ['_', '_', '_' , '_', '_'],
  ['_', ' ', ' ', ' ', '_'],
  ['_', ' ', '_', ' ', '_'],
  ['_', ' ', ' ', ' ', '_'],
  ['_', '_', '_', '_', '_']
];

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = 'yellow';
    c.fill();
    c.closePath();
  }

  update(){
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const boundaries = [];
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2, // Offsetting player slightly
    y: Boundary.height + Boundary.height / 2
  },
  velocity: {
    x: 0,
    y: 0
  }
});

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false }
};

// Populate boundaries based on the map array
map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === '_') {
      boundaries.push(
        new Boundary({
          position: {
            x: Boundary.width * j,
            y: Boundary.height * i
          }
        })
      );
    }
  });
});

function animate() {
  // Clear the previous frame
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Redraw boundaries and player
  boundaries.forEach(boundary => {
    boundary.draw();
  });

  player.update();
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
}

// Start the animation loop
animate();

window.addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case 's':
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case 'd':
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener('keyup', ({ key }) => {
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
