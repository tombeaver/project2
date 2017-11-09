//-----------//
// Variables //
//-----------//

// creates a variable that sets width and height to the 'canvas' tag in html to be the entire width and height of browser window
var canvas = document.querySelector("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

// creates a vaiable that will be used often within canvas. the 'getContext' method allows two dimensional objects to be drawn
var ctx = canvas.getContext("2d");

// creates a set of variables that will hold the amount of lives the player has and their score
var score = 0;
var lives = 3;

//// creates a set of variables that will allow the creation of a moving ball
// x and y defines where the ball will originally be drawn... such as .width / 2 is equal to half the page and .height - 30 is 30 px up from the bottom of the page
var x = canvas.width/2;
var y = canvas.height-30;
// dx and dy determines the speed at which the ball moves
var dx = 5;
var dy = -6;
// ballRadius is what it sounds like.... sets the radius of the ball
var ballRadius = 10;

//// creates a set of variables that will allow the creation of the moving paddle
// paddleHeight and paddleWidth sets the size of the paddle
var paddleHeight = 10;
var paddleWidth = 75;
// paddleX defines where the paddle will oringinally be drawn on the X axis
var paddleX = (canvas.width - paddleWidth)/2;
// keyDown variables which willow allow a function to move the paddle to the left or right upon pressing either key
var rightPress = false;
var leftPress = false;
// creates event listeners for keyUp and keyDown actions that will be linked with rightPress and leftPress later
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//// creates a set of variables that will allow the creation of a brick wall.... to be built by Trump
// brickRowCount and brickColumnCount defines how many bricks will span the canvas... increasing the size of browser window will increase the amount of bricks that will originally be generated
var brickRowCount = window.innerHeight / 100;
var brickColumnCount = window.innerHeight / 50;
// brickWidth and brickHeight defines the size of the bricks that will be generated
var brickWidth = 75;
var brickHeight = 20;
// brickPadding puts space between the bricks
var brickPadding = 10;
// ---------------------------------------------------------------------------------------------------------------------------------
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
 
// var bricks creates an Array that will hold the set of bricks in the brick wall
var bricks = [];
// creates a loop that cycles through each column and places them into a vaible of 'c'
for(c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    // creates another loop to cycle through each row and places them into a variable of 'r'
    for(r = 0; r < brickRowCount; r++) {
    	// ---------------------------------------------------------------------------------------------------------------------------------
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

//-----------//
// Functions //
//-----------//

// Reset Button //
function reset() {
	location.reload();
}

// Key Down Handlers //

// two functions that utilize the event listener added to keyDownHandler and keyUpHandler and passes and event called 'e'
function keyDownHandler(e) {
	// if in the event that keyCode 39 (right arrow key) is pushed 'down'...
	if (e.keyCode == 39) {
		// ... then change var rightPress to true
		rightPress = true;
		// and if in the event that keyCode 37 (left arrow key) is pushed 'down'...
	}	else if (e.keyCode == 37) {
		// ... then change var leftPress to true
		leftPress = true;
	}
}

function keyUpHandler(e) {
	// however if the keyCode 39 (right arrown key) is not pushed 'down'...
	if (e.keyCode == 39) {
		// ... then return the value of var rightPress to false
		rightPress = false;
		// and also if the keyCode 37 (left arrow key) is not pushed 'down'...
	}	else if (e.keyCode == 37) {
		// ... then return the value of var leftPredd to fals
		leftPress = false;
	}
}


// the Ball //

// creates a function to create the ball
function drawBall() {
	
	// beginPath() is a method that when called canvas knows to start drawing a path and waits for further commands as where to draw the path
	ctx.beginPath();
	// arc() is the method to tell canvas to draw a curve not a straight line. passing 5 arguments to tell canvas what kind of curve is needed
	// x and y are variables being pulled from up above. They state where the path should be placed on the canvas
	// ballRadius is another vairable pulled from up above and says how long the path should be around
	// the 3rd argument says where the path's angle should be started, 0 is at the top
	// the 4th argument says where the path's angle should end... Math.PI*2 is the algarithm set by JS that justifies this arc being a circle.
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	// filStyle allows for color to fill the circle
	ctx.fillStyle = "#0095dd";
	// fill() fills the circle with the color defined in fillStyle
	ctx.fill();
	// closePath() is the method that tells canvas when the drawing has ended.
	ctx.closePath();
}


// the Paddle //

// creates a function to create the paddle
function drawPaddle() {

	ctx.beginPath();
	// rect() is the method to tell canvas to draw a rectangle and passes 4 arguments
	// paddleX and canvas.height-paddleHeight state where the paddle will be drawn and are pulled from variables from up above...
	// ...with (paddleX) is the x axis and (canvas.height - paddleHeight) is the y axis
	// paddleWidth and paddleHeight states how tall and how wide the rectangle will be 
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "0095dd";
	ctx.fill();
	ctx.closePath();
}


// the Bricks //

// creates a function to create the brick field 
function drawBricks() {
	// 'for' every c varible created in every column...
    for (c = 0; c < brickColumnCount; c++) {
    	// ...that meets an r variable created in every row...
        for (r = 0; r < brickRowCount; r++) {
        	// ...and 'if' that status of that brick is 1 (no collision detected yet)...
        	if (bricks[c][r].status == 1) {
        		// ...then this loop will create a brick passing these parameters
        		// brickX and brickY are the x and y values used in the rect() method
        		// brickX is defined here by the width and padding of the brick and setting the left origin point making a line from left to right of brick
	            var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
	            // brickY is defined here by the height and padding of the brick and setting the top as the origin point making a line from top to bottom of brick
	            var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
	            // each brick in the arrays [c] and [r] will have the settings of brickY and brickX
	            bricks[c][r].x = brickX;
	            bricks[c][r].y = brickY;
	            ctx.beginPath();
	            ctx.rect(brickX, brickY, brickWidth, brickHeight);
	            ctx.fillStyle = "#0095DD";
	            ctx.fill();
	            ctx.closePath();
	        }
        }
    }
}


// Collision Detection //

// creates a function to detect the collision of the ball and the bricks in the brick field and destroy the brick
function collisionDetection() {
	// looping through each brick in the brick field 
	for (c = 0; c < brickColumnCount; c++) {
		for (r = 0; r < brickRowCount; r++) {
			// var b represents each brick in the loop
			var b = bricks[c][r];
			// 'if' the status of this brick is 1, the brick is present
			if (b.status == 1) {
				// 'if' 
				if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					dy = -dy;
					// if this is the case, the set the status to 0, the brick is not present
					b.status = 0;
					// as per project requirement, changing the status of b to 0 results in an increment of 10 points in score.
					score += 10;
					if (!brickRowCount && !brickColumnCount){
						// if there are no bricks in brickRowCount and no bricks in brickColumnCount, then run the youWin() function...
						youWin();
						// ... and cancel game function with clearRect()
						clearRect();
					}
				}
			}
		}
	}
}

// Score //

// creates a function the tallie the score of the user
function drawScore() {
	// sets the font to Arial @ 16px
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095dd";
	// fillText() is a method that fills the field with the text within the argument, and position which is 8px from left side of canvas and 20px from top
	ctx.fillText("Score: " + score, 8, 20);
}

// Lives //

// creates a function like drawScore, to display how many lives user has...
function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095dd";
	// ... but places the content on the right side of canvas
	ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Game Over //

// creates a function to display "Game Over" if you lose game.
function gameOver() {
	var message = "Game Over";
	ctx.font = "60px Arial";
	ctx.fillStyle = "#0095dd";
	ctx.fillText(message, (canvas.width/2) - 150, canvas.height/2);
}

// You Win //

// creates a function to display "Congrats! You Win" if you clear all bricks on screen
function youWin() {
	ctx.font = "60px Arial";
	ctx.fillStyle = "#0095dd";
	ctx.fillText("Congrats! You Win!", (canvas.width/2) - 150, canvas.height/2);
}

// Draw Code //

// creates the function to draw all functions above and what the ball does
function draw() {
	// .clearRect() is a method that clears the previous drawing of a movable object like the ball and paddle so it appears as if its moving
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    
    // creates the movement of the ball and collision with the borders of the canvas and/or paddle and essentially makes it so none of the ball absorbs into the walls but bounces truely like a real ball would off the outter edges of the ball.
    // this if conditional says if the future placement of the ball (x being current location and dx is how much length is added to that location), is more than the width of the screen OR '||' if its less than the size of the ball, then reverse direction.  The first one refers to the right side of the screen, whereas the second if refers to the left side of screen
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    // same as above but dealing with the y axis, and if the future placement of the ball is going to be less than the size of the ball (referring to the top of the screen) then reverse direction
    	// should be noted that the bottom of the screen "(y + dy > canvas.height - ballRadius)" is not included because thats the side we are trying to keep the ball from entering using the paddle
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    // as stated above, if the ball passes the canvas.height, 1 of 2 things could happen...
    else if(y + dy > canvas.height - ballRadius) {
    	// ... first being, if the paddle gets in the way to block the ball... the if statement draws up the left and right side of the paddle and if the ball hits between those two points.
    	// if the location of the ball is greater than the beginning position of the paddle(left most point) AND less than the end position of the paddle (right most point), and...
        if(x > paddleX && x < paddleX + paddleWidth) {
        	// ... if the ball hits the top of the paddle, then...
           	if(y = y - paddleHeight){
           		// ... reverse direction
            	dy = -dy;
       		}
       	// or second being, the paddle doesn't block the ball and it passes the bottom wall
        } else {
        	// minus one life...
        	lives--;
        	// ... and you lose 25 points to the score
        	score -= 25;
        	// if by chance, you have no more lives, the program will stop...
        	if (!lives) {
        		// ... and run the gameOver() function
	            gameOver();
	            // ... and clear canvas
	            clearRect();
	        }	else {
	        		// if though, you lose a life and still have lifes left, then the paddle and ball will reset to original position
	        		x = canvas.width/2;
                	y = canvas.height-30;
                	paddleX = (canvas.width-paddleWidth)/2;
	        }
        }
    }
    
    // this if conditional refers to the keyDown on the left and right buttons on keyboard.
    // so if you press the right button AND the paddle is less than the width of the screen...
    if(rightPress && paddleX < canvas.width - paddleWidth) {
    	// ... move the paddle 7 pixels to the right
        paddleX += 7;
    }
    // and if you press the left button AND the paddle is greater than the left most side of the screen...
    else if(leftPress && paddleX > 0) {
    	// ... move the paddle 7 pixels to the left
        paddleX -= 7;
    }	
    
    // with all this going on, keep moving the ball (x || y) by (dx || dy)
    x += dx;
    y += dy;
    // a better and smoother function than setInterval that runs the draw() function fluidly over and over again
    requestAnimationFrame(draw);
}

// call the draw() function.
draw();














































