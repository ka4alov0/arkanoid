const game = document.getElementById("arkanoid")
const ctx = game.getContext("2d")

const platform = {
    x: game.width/2 - 50,
    y: game.height - 30,
    width: 100,
    height: 15,
    speed: 6,
}

const ball = {
    x: game.width/2,
    y: game.height/2 + 80,
    radius: 10,
    dx: 2,
    dy: 2,
}

const brickRows = 4

const brickColumns = 8

const brickWidth = 60

const brickHeight = 20

const brickPad = 10

const brickPadTop = 25

const brickPadLeft = 25

const bricks = []

for(let i = 0; i < brickRows; i++){
    bricks[i] = []
    for(let j = 0; j < brickColumns; j++){
        const brickX = j * (brickWidth + brickPad) + brickPadLeft
        const brickY = i * (brickHeight + brickPad) + brickPadTop
        bricks[i][j] = {
            x: brickX,
            y: brickY,
            width: brickWidth,
            height: brickHeight,
            status: true
        }
    }
}

function drawPlatform() {
    ctx.fillStyle = 'black'
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
}

function drawBall() {
    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
}

function drawBricks() {
    for(let i = 0; i < brickRows; i++){
        for(let j = 0; j < brickColumns; j++){
            const brick = bricks[i][j]
            if(brick.status) {
                ctx.fillStyle = 'black'
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
            }  
        }
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y -= ball.dy;
    if(ball.x + ball.radius >= game.width) {
        ball.dx = -ball.dx
    }
    if(ball.y - ball.radius < 0) {
        ball.dy = -ball.dy
    }
    if(ball.x - ball.radius < 0) {
        ball.dx = -ball.dx
    }
    if(ball.x + ball.radius >= platform.x &&
        ball.x + ball.radius <= platform.x + platform.width &&
        ball.y + ball.radius >= platform.y &&
        ball.y + ball.radius <= platform.y + platform.height
    ) {
        ball.dy = -ball.dy
    }
}

function draw() {
    ctx.clearRect(0, 0, game.width, game.height)
    drawPlatform()
    drawBall()
    drawBricks()
    moveBall()
    requestAnimationFrame(draw)
}

draw()