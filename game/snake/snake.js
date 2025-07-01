const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let food;

(function setup() {
  snake = new Snake();
  food = new Food();
  food.pickLocation();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    food.draw();
    snake.update();
    snake.draw();

    if (snake.eat(food)) {
      food.pickLocation();
    }

    snake.checkCollision();
  }, 150);
})();

window.addEventListener("keydown", e => {
  const direction = e.key.replace('Arrow', '');
  snake.changeDirection(direction);
});

function Snake() {
  this.body = [{ x: 10, y: 10 }];
  this.xSpeed = scale * 1;
  this.ySpeed = 0;
  this.total = 0;

  this.draw = function() {
    ctx.fillStyle = "#4CAF50";
    for (let i = 0; i < this.body.length; i++) {
      ctx.fillRect(this.body[i].x * scale, this.body[i].y * scale, scale, scale);
    }
  };

  this.update = function() {
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i] = { ...this.body[i - 1] };
    }
    this.body[0].x += this.xSpeed / scale;
    this.body[0].y += this.ySpeed / scale;

    // wrap around
    if (this.body[0].x >= columns) this.body[0].x = 0;
    if (this.body[0].y >= rows) this.body[0].y = 0;
    if (this.body[0].x < 0) this.body[0].x = columns - 1;
    if (this.body[0].y < 0) this.body[0].y = rows - 1;
  };

  this.changeDirection = function(direction) {
    switch(direction) {
      case 'Up':
        if (this.ySpeed === 0) {
          this.xSpeed = 0;
          this.ySpeed = -scale * 1;
        }
        break;
      case 'Down':
        if (this.ySpeed === 0) {
          this.xSpeed = 0;
          this.ySpeed = scale * 1;
        }
        break;
      case 'Left':
        if (this.xSpeed === 0) {
          this.xSpeed = -scale * 1;
          this.ySpeed = 0;
        }
        break;
      case 'Right':
        if (this.xSpeed === 0) {
          this.xSpeed = scale * 1;
          this.ySpeed = 0;
        }
        break;
    }
  };

  this.eat = function(food) {
    if (this.body[0].x === food.x && this.body[0].y === food.y) {
      this.body.push({});
      return true;
    }
    return false;
  };

  this.checkCollision = function() {
    for (let i = 1; i < this.body.length; i++) {
      if (this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y) {
        alert("Game Over!");
        this.body = [{ x: 10, y: 10 }];
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        break;
      }
    }
  };
}

function Food() {
  this.x;
  this.y;

  this.pickLocation = function() {
    this.x = Math.floor(Math.random() * columns);
    this.y = Math.floor(Math.random() * rows);
  };

  this.draw = function() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
  };
}
