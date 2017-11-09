var canvas = document.querySelector("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

var x = canvas.width;
var y = canvas.height;
var dx = 3;
var dy = -3;

var score = 0;
var lives = 5;

var paddleHeight = 70;
var paddleWidth = 10;
var paddleY = (canvas.height - paddleHeight) / 2;

var ballRadius = 8;

var brickRow = 10;
var brickColumn = 8;
var count = brickRow * brickColumn;
var brickHeight = 15;
var brickWidth = 40;
var brickPadding = 2;
var brickLeft = 20;
var brickTop = 30;

var bricks = [];
for (var c = 0; c < brickColumn, c++){
	bricks[c] = [];
	for (var r = 0; r < brickRow; r++) {
		bricks[c][r] = {x: 0, y: 0, status: 1};
	}
}

// the Ball
function ball() {
	c.beginPath();
	c.arc(x, y, ballRadius, 0, Math.PA * 2);
	c.fillStyle = "white";
	c.fillStroke = "white";
	c.stoke = "2";
	c.fill();
	c.closePath();
}

// the Paddle
function paddle() {
	c.beginPath();
	c.fillRect(paddleY, canvas.width - paddleWidth , paddleWidth, paddleHeight);
	c.fillStyle = "white";
	c.fill();
	c.closePath();
}

// the Bricks // AKA this is where I needed some extra help
function bricks() {
	for (var c = 0; c < brickColumn; c++) {
		for( var r = 0; r < brickRow, r++) {
			if(bricks[c][r].status == 1){
				var brickX = (c * (brickWidth + brickPadding)) + brickLeft;
				var brickY = (r * (brickHeight + brickPadding)) + brickTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				c.beginPath();
				c.fillRect(brickX, brickY, brickWidth, brickHeight);
				c.fillStyle = "white";
				c.fill();
				c.closePath();
			}
		}
	}
}

// collision






// Score









// Lives




// Draw
function draw() {
	c.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawPaddle();
	drawBall();

}

setInterval(draw, 20);




// Key Handlers Up & Down

