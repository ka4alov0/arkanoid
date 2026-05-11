function ArkanoidGame() {

    const game = document.getElementById("arkanoid")
    const ctx = game.getContext("2d")

    let gameStart = false

    const platform = {
        x: game.width/2 - 50,
        y: game.height - 30,
        width: 100,
        height: 15,
        speed: 10,
    }

    const ball = {
        x: game.width/2,
        y: game.height/2 + 70,
        radius: 10,
        dx: 1,
        dy: 1,
    }

    const brickRows = 4

    const brickColumns = 8

    const brickWidth = 60

    const brickHeight = 20

    const brickPad = 10

    const brickPadTop = 25

    const brickPadLeft = 25

    const bricks = []

    let score = 0

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
        if(!gameStart) {
            return
        }
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
        ball.y + ball.radius <= platform.y + platform.height) {
            ball.dy = -ball.dy
            ball.y = platform.y - ball.radius
        }
        if(ball.y + ball.radius > game.height) {
            lose()
        }
    }

    function lose() {
        alert("Вы проиграли")
        ball.x = game.width/2
        ball.y = game.height/2 + 70
        ball.dx = 1
        ball.dy = 1
        platform.x = game.width/2 - 50
        platform.y = game.height - 30
        score = 0
        gameStart = false
        for(let i = 0; i < brickRows; i++){
            for(let j = 0; j < brickColumns; j++){
                const brick = bricks[i][j]
                if(!brick.status){
                    brick.status = true
                }
            }
        }
    }

    function win() {
        if(score === brickColumns * brickRows) {
            alert("ПОБЕДА!")
            ball.x = game.width/2
            ball.y = game.height/2 + 70
            ball.dx = 1
            ball.dy = 1
            platform.x = game.width/2 - 50
            platform.y = game.height - 30
            score = 0
            gameStart = false
            for(let i = 0; i < brickRows; i++){
                for(let j = 0; j < brickColumns; j++){
                    const brick = bricks[i][j]
                    if(!brick.status){
                        brick.status = true
                    }
                }
            }
        }
        
    }

    function collision() {
        for(let i = 0; i < brickRows; i++){
            for(let j = 0; j < brickColumns; j++){
                const brick = bricks[i][j]
                if(brick.status){
                    if(ball.x > brick.x &&
                    ball.x < brick.x + brick.width &&
                    ball.y + ball.radius > brick.y &&
                    ball.y - ball.radius < brick.y + brick.height) {
                        score++
                        ball.dy = -ball.dy
                        brick.status = false
                    }
                }
            }
        }
    }

    function scoreText() {
        ctx.font = '18px Arial';
        ctx.fillStyle = 'blue';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const x = game.width - 45
        const y = 15
        ctx.fillText("Счет: " + score, x, y)
    }

    document.addEventListener('keydown', (e) => {
        if(e.key === "ArrowLeft"){
            if (platform.x < 0) {
                platform.x = 0
            }
            else platform.x -= platform.speed
        }
        if(e.key === "ArrowRight"){
            if (platform.x + platform.width > game.width) {
                platform.x = game.width - platform.width
            }
            else platform.x += platform.speed
        }
    })

    document.addEventListener('keydown', (e) => {
        if(e.key === " "){
            gameStart = true
        }
    })

    function draw() {
        ctx.clearRect(0, 0, game.width, game.height)
        drawPlatform()
        drawBall()
        drawBricks()
        moveBall()
        collision()
        scoreText()
        win()
        requestAnimationFrame(draw)
    }

    draw()
}
ArkanoidGame()