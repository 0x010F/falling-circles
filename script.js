const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const score = document.querySelector('#score span');

var ref;
let speed = 1;
let isGameOver = false;

class Circle {
    constructor(x, y, radius, speed, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.color = color;
    }
    update() {
        this.y += this.speed;
        // console.log(this.y);
        if (!isGameOver) {
            if (this.y + this.radius > HEIGHT) {
                // console.log(score.textContent);
                isGameOver = true;
                score.textContent = 'Game over, Your score: ' + score.textContent;
                cancelAnimationFrame(ref);
            } else {
                this.render();
            }
        }
    }
    render() {
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2,
            false
        );
        ctx.fillStyle = this.color;
        ctx.fill()
    }
}

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;

// let SCORE = 0;

// Score is first set to zero
score.textContent = 0;

canvas.width = WIDTH;
canvas.height = HEIGHT;

// Radius
let r = 20 + Math.floor(Math.random() * 50)

let circle = new Circle(
    // x coordinate
    r + Math.floor(Math.random() * (WIDTH - 2 * r)),
    // y coordinate
    r,
    r,
    speed,
    randomColorGenerator()
)

function randomColorGenerator() {
    return `rgba(
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)}
    )`
}

function animate() {
    ctx.clearRect(0,0, WIDTH, HEIGHT);
    circle.update();
    ref = requestAnimationFrame(animate);
}

function generateNewCircle() {
    let r = 20 + Math.floor(Math.random() * 50)
    circle = new Circle(
        // x coordinate
        r + Math.floor(Math.random() * (WIDTH - 2 * r)),
        // y coordinate
        r,
        r,
        speed,
        randomColorGenerator()
    );
}

window.onclick = function(e) {
    console.log('Circle coordinates: ', circle.x, circle.y);
    console.log('Mouse coordinates: ', e.clientX, e.clientY);

    // distance
    let d = Math.sqrt(
        Math.pow((circle.x - e.clientX), 2) + Math.pow((circle.y - e.clientY), 2)
    )

    if (d <= circle.radius) {
        score.textContent = parseInt(score.textContent, 10) + 1;
        speed = Math.ceil(parseInt(score.textContent, 10) / 10);
        generateNewCircle();
    }
}

ref = requestAnimationFrame(animate);
// console.log(ref);