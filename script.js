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

function draw() {
    drawPlatform()
    drawBall()
}

draw()