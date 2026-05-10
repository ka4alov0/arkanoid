const game = document.getElementById("arkanoid")
const ctx = game.getContext("2d")

const platform = {
    x: game.width/2 - 50,
    y: game.height - 30,
    width: 100,
    height: 15,
    speed: 6,
}

function drawPlatform() {
    ctx.fillStyle = 'black'
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
}

function draw() {
    drawPlatform()
}

draw()