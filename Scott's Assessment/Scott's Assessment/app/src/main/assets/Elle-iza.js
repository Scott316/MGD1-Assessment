var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

window.requestAnimationFrame = requestAnimationFrame;

var canvasContext
var canvas = document.getElementById("gameCanvas");
//sets the width of the canvas width to 1400 pixels
var width = 1400;
//sets the height of the canvas width to 700 pixels
var height = 700;
var ctx = canvas.getContext("2d");
//sets a player object to contain the player's information
var player = {
//sets this players x position
x: width / 2,
//sets the y position
y: height / 1.65,
//sets the width
width: 100,
//sets the height
height: 100,
//sets the starting velocity along the x axis
velX: 0,
//sets the starting velocity along the 7 axis
velY: 0
};
var soundMgr;
//sets a enemy object to contain the enemy's information
var enemy = {
//sets the x position
x: width / 1,
//sets the y position
y: height / 1.65,
//sets the width
width: 100,
//sets the height
height: 100,
//sets the starting velocity along the x axis
velX: 0,
//sets the starting velocity along the y axis
velY: 0
};
//sets a collectible object to contain the collectible information
var collectible = {
//sets the x position
x: width /1.5,
//sets the y position
y: height / 1.65,
//sets the width
width: 100,
//sets the height
height: 100
};
//sets the health to equal 100
var health = 100;
var keys = [];
var friction = 0.8;
//sets a variable to manage the theme music
var themeMusic;
//sets a variable to manage the sound effects
var soundEffect;
var startTimeMS = 0;
var frameX = 0;
var frameXMax = 3;
var frameY = 0;
var frameYMax = 4;
var frame = 0;
var frameMax = 9;
var frameTimer = 0.18;
var frameTimeMax = 0.2;
var spriteWidth = 183;
var spriteHeight = 310;
var enemySpritewidth = 307;
var enemySpriteHeight = 485;
//sets up an image variable for the player
var img = new Image();
//sets up an image variable for the enemy
var enemyimg = new Image();
//sets up an image variable for the collectible
var collectImage = new Image();
var isKeyPressed = false;
var level = 5;
//USED FOR THE TIMER, EXTENSION MATERIAL////////////////////////////////////////
//sets the amount of time on the timer at the start
const minutesAtStart = 2;
//counts every second involved in the two minutes
let time = minutesAtStart * 60;
//END OF EXTENSION MATERIAL ATTEMPT//////////////////////////////////////////////
//sets the variable scoreAmount to equal 0
var scoreAmount = 0;
//these are for the menu===========================================================================
var buttonX = [550, 700, 550, 700];
var buttonY = [350, 350, 350, 350];
var buttonWidth = [100, 100, 100, 100];
var buttonHeight = [100, 100, 100, 100];
var mouseX;
var mouseY;
var replayButton = new Image();
var playImage = new Image();
var quit = new Image();
var WASD = new Image();
var AlexanderMenu = new Image();
var ElleMenu = new Image();
var buttonClicked;
//====================================================================================================

function load() {
console.log("tests");
}

window.addEventListener("load", function () {
init();
showMenu();
});

function init()
{
   canvas.width = width;
   canvas.height = height;
   buttonClicked = 0;
   if(soundMgr != null) soundMgr.playMusic(0);
}

document.body.addEventListener("keydown", function (e) {
keys[e.keyCode] = true;
isKeyPressed = true;
});

document.body.addEventListener("keyup", function (e) {
keys[e.keyCode] = false;
isKeyPressed = false;
});

function startGame() {
//sets the source image for the player image
img.src = 'Elle.png';
//sets the source image for the collectible image
collectImage.src = "Health plus.png";
//sets the source image for the enemy image
enemyimg.src = 'Alexander.png';
//loads the sound effect file "Yoda.mp3" using the sound constructor
soundEffect = new sound("Yoda.mp3");
//loads the theme music file "Circle Of Life.mp3" using the sound constructor
themeMusic = new sound("Circle Of Life.mp3");
//plays the theme music
themeMusic.play();
if (canvas.getContext)
   {
     window.addEventListener("touchstart", touchingDown, false);
     window.addEventListener("touchmove", touchXY, true);
     window.addEventListener("touchend", touchUp, false);
   }

   update();
   //COUNTDOWN TIMER /////////////////////////////////////////////////////////////
   //calls the update timer function every second after the game has started
   setInterval(updateTimer, 1000);
   //END OF COUNTDOWN TIMER ///////////////////////////////////////////////////////////////////
}

//COUNTDOWN TIMER ///////////////////////////////////////////////////////////////
function updateTimer(){
//sets the minute counter to return the largest number of the remaining time divided by 60
const minuteCounter = Math.floor(time/60);
//sets the seconds to equal the value left after the division
let seconds = time % 60;
//if there is time remaining,
if(minuteCounter != -1 && seconds != -1)
{
//time will be taken away every second
time--;
}
//if the time runs out
if (minuteCounter == 0 & seconds == 0)
{
//the window will close
window.close();
}
}
//END OF COUNTDOWN TIMER/////////////////////////////////////////////////////////
function update() {
ctx.clearRect(0, 20, width, height);
//sets the size to 30 pixels and the font to Comic Sans MS
ctx.font = "30px Comic Sans MS";
//sets the colour to yellow
ctx.fillStyle = "yellow";
//aligns the text to the centre
ctx.textAlign - "center";
//sets the message "score: " and the player score to be displayed at the specified position
ctx.fillText("score: " + scoreAmount, 50, 60);
//sets the font colour to red
ctx.fillStyle = "red";
//sets the message "health: " and the player health to be displayed at the specified position
ctx.fillText("health: " + health, 1000, 60);
//the text will be set to pink
ctx.fillStyle = "pink";
//sets the message "time left: " and the time amount to be displayed at the specified position
ctx.fillText("time left: " + time, 550, 60);
//if the ESCAPE key is pressed
if (keys[27])
{
//the web browser window is closed
window.close();
}

//if the S button is pressed and the player is within the vertical position range,
if (keys[83] && player.y < (canvas.height - player.height - 100)) {
//the player will move down the screen
player.velY++;
}

//if the W key is pressed and the
if (keys[87] && player.y > 405) {
player.velY--;
}

//if the D button is pressed,
if (keys[68] && player.x < (canvas.width - player.width - 20)) {
//the player will be moved towards the right of the screen
player.velX++;
}
//if the A button is pressed,
if (keys[65] && player.x > player.width) {
//the player will be moved towards the left of the screen
player.velX--;
}
//if the pause/play button is pressed,
if (keys[179]){
//the theme music will stop
themeMusic.stop();
}
//the friction is added to movement along the axes
player.velX *= friction;
player.velY *= friction;
//the velocity is added to modify the positions
player.x += player.velX;
player.y += player.velY;


//if the movement keys are pressed,
if (keys[65] || keys[68] || keys[83] || keys[87]) {
//the animation frame method will be called
animationFrame();
//and the animation spritesheet will be played
ctx.drawImage(img, spriteWidth * frameX, spriteHeight * frameY, spriteWidth, spriteHeight, player.x, player.y, player.width, player.height);
scoreAmount += 5;
//EXTENSION WORK*****************************************
//If the current is larger than the currently saved high score,
if(scoreAmount > localStorage.getItem("high score"))
{
//the new score is saved as the high score.
localStorage.setItem("high score", scoreAmount);
}
//END OF EXTENSION WORK*********************************
} else
//the sprite is shown without animation
ctx.drawImage(img, spriteWidth * 2, spriteHeight * 1, spriteWidth, spriteHeight, player.x, player.y, player.width, player.height);
//draws the collectible to the screen
ctx.drawImage(collectImage, spriteWidth * 2, spriteHeight * 1, spriteWidth, spriteHeight, collectible.x, collectible.y, collectible.width, collectible.height);
//if the x value is larger than the width value,
if (enemy.x > enemy.width) {
//the enemy is animated and moves toward the left of the screen
animationFrame();
ctx.drawImage(enemyimg, enemySpritewidth * frameX, enemySpriteHeight * frameY, enemySpritewidth, enemySpriteHeight, enemy.x, enemy.y, enemy.width, enemy.height);
enemy.velX--;
//if not,
} else {
//the enemy will be displayed on screen as a stationary object
ctx.drawImage(enemyimg,  enemySpritewidth * 2, enemySpriteHeight * 1,  enemySpritewidth, enemySpriteHeight, enemy.x, enemy.y, enemy.width, enemy.height);
}
//friction added to enemy movement
enemy.velX *= friction;
enemy.velY *= friction;
//velocity added to the position to move the object
enemy.x += enemy.velX;
enemy.y += enemy.velY;

//draws a green box around the player that will be used for checking collisions
ctx.beginPath();
ctx.lineWidth = "4";
ctx.strokeStyle = "green";
ctx.rect(player.x, player.y, player.width, player.height);
ctx.stroke();

//draws a green box around the enemy that will be used for checking collisions
ctx.beginPath();
ctx.lineWidth = "4";
ctx.strokeStyle = "green";
ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
ctx.stroke();

//draws a green box around the collectible that will be used for checking collisions
ctx.beginPath();
ctx.lineWidth = "4";
ctx.strokeStyle = "red";
ctx.rect(collectible.x, collectible.y, collectible.width, collectible.height);
ctx.stroke();
//checks if the player has collided with the collectible
var collectDir = colCheck(player, collectible);
//if it has,
if(collectDir)
{
//and the score is below 0,
if(scoreAmount < 0)
{
//20 points will be added to score
scoreAmount += 20;
}
//if the health is less than 100,
if (health < 100)
{
//100 points will be added to the health
health += 100;
}
//the sound effect will play
soundEffect.play();
}
//checks the collision between the player and the enemy
var dir = colCheck(player, enemy);
//if a collision has taken place,
if(dir) {
//the console will display a message informing the user of the collision
console.log("player collide with enemy");
//if the health value is more than 0
if (health > 0)
{
//0.5 points will be taken from the score
health -= 0.5;
}
//if the health equal 0 or less,
if(health <= 0)
{
//LOCAL STORAGE EXTENSION WORK/////////////////////////////
//if the score amount is greater than the highest saved score
if (scoreAmount > localStorage.getItem("high score"))
{
//the new value is set as the high score
localStorage.setItem("high score", scoreAmount);
}
//sets the worst score saved as 1000 points
localStorage.setItem("worst score ever", 1000);
//if the current score is less than the worst score saved
if (scoreAmount < localStorage.getItem("worst score ever"))
{
//the new score will be saved as the new worst score
localStorage.setItem("worst score ever", scoreAmount);
}
//END OF LOCAL STORAGE EXTENSION WORK
//the game over screen will be displayed
showGameOverScreen();
}
//it subtracts 100 points from the score
scoreAmount -= 100;
//the sound effect will play
soundEffect.play();
}
requestAnimationFrame(update);
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function animationFrame() {
var elapsed = (Date.now() - startTimeMS) / 1000;
startTimeMS = Date.now();

//only update frames when timer is below 0
frameTimer = frameTimer - elapsed;
if (frameTimer <= 0) {
frameTimer = frameTimeMax;
frameX++;
if (frameX > frameXMax) {
frameX = 0;
frameY++;
//end of row, move down to next row in sheet
if (frameY > frameYMax) {
frameY = 0;
}
}
frame++;
//reset frames to 0 in event that there are empty spaces on sprite sheet
if (frame > frameMax) {
frame = 0;
frameX = 0;
frameY = 0;
}
}
}

function touchUp(evt)
{
   evt.preventDefault();

   var touchX = evt.touches[0].pageX - canvas.offsetLeft;
   var touchY = evt.touches[0].pageY - canvas.offsetTop;

   lastPt = null;
}

function touchingDown(evt)
{
    evt.preventDefault();
    touchXY(evt);
}

function touchXY(evt)
{
   evt.preventDefault();
   if (lastPt!=null)
   {
      var touchX = evt.touches[0].pageX - canvas.offsetLeft;
      var touchY = evt.touches[0].pageY - canvas.offsetTop;
      player.x = touchX - (player.width / 8);
   }
   lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY};
}

//function to show the menu
function showMenu(){
//loads and sets the images and position of the play button
playImage.src = "playbutton.png";
playImage.addEventListener('load', e => {
ctx.drawImage(playImage, buttonX[0], buttonY[0], buttonWidth[0], buttonHeight[0]);
});

//loads the source image and position of the wasd photos
WASD.src = "WASD.jpg";
WASD.addEventListener('load', e => {
ctx.drawImage(WASD, 450, 50, 150, 100)});

//sets the following messages to be displayed in 30 pixel Comic Sans font at their specified locations
ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "yellow";
ctx.textAlign - "center";
ctx.fillText("Tit-elle In Progress", 600, 70);
ctx.fillText(" - Moves the character", 600, 100);
ctx.fillText(" - Main enemy", 160, 260);
ctx.fillText(" - Main player", 560, 260);

//loads the source image and position of the Alexander photo
AlexanderMenu.src = "Alexander Menu.png";
AlexanderMenu.addEventListener('load', e => {
ctx.drawImage(AlexanderMenu, 50, 200, 150, 100)});

//loads the source image and position of the elle photos
ElleMenu.src="ElleMenu.png";
ElleMenu.addEventListener('load', e => {
ctx.drawImage(ElleMenu, 450, 200, 150, 100)});

//loads and sets the images and position of the play button
quit.src = "quitbutton.png";
quit.addEventListener('load', e => {
ctx.drawImage(quit, buttonX[1], buttonY[1], buttonWidth[1], buttonHeight[1]);
});
canvas.addEventListener("mousemove", checkPos);
canvas.addEventListener("mouseup", checkClick);
};

function checkPos(event){
coords = canvas.relMouseCoords(event);
mouseX = coords.x;
mouseY = coords.y;
}


HTMLCanvasElement.prototype.relMouseCoords = function(event){
var totalOffsetX = 0;
var totalOffsetY = 0;
var canvasX = 0;
var canvasY = 0;
var currentElement = this;

do{
totalOffsetX += currentElement.offsetLeft;
totalOffsetY += currentElement.offsetTop;
}
while (currentElement = currentElement.offsetParent)

canvasX = event.pageX - totalOffsetX;
canvasY = event.pageY - totalOffsetY;

//fix for variable canvas width
canvasX = Math.round( canvasX * (this.width / this.offsetWidth));
canvasY = Math.round( canvasY * (this.height / this.offsetHeight));

return {x:canvasX, y:canvasY};
}

function checkClick(mouseEvent){
if(mouseX > buttonX[0] && mouseX < (buttonX[0] + buttonWidth[0])){
if(mouseY > buttonY[0] && mouseY < (buttonY[0] + buttonHeight[0]) ) {
buttonClicked = 1;
startGame();
}
}

if(mouseX > buttonX[1] && mouseX < (buttonX[1] + buttonWidth[1])){
if(mouseY > buttonY[1] && mouseY < (buttonY[1] + buttonHeight[1]) ) {
buttonClicked = 2;
quitGame();
}
}

if(mouseX > buttonX[2] && mouseX < (buttonX[2] + buttonWidth[1])){
if(mouseY > buttonY[2] && mouseY < (buttonY[2] + buttonHeight[1]) ) {
buttonClicked = 3;
showMenu();
}
}

if(mouseX > buttonX[3] && mouseX < (buttonX[3] + buttonWidth[1])){
if(mouseY > buttonY[3] && mouseY < (buttonY[3] + buttonHeight[1]) ) {
buttonClicked = 4;
quitGame();
}
}
 if(buttonClicked>0){
 canvas.removeEventListener("mousemove", checkPos);
 canvas.removeEventListener("mouseup", checkClick);
 }
}

function colCheck(shapeA, shapeB){
//get the vectors to check against
var vX = (shapeA.x + (shapeA.width/2)) - (shapeB.x + (shapeB.width / 2)),
    vY = (shapeA.y + (shapeA.height /2)) - (shapeB.y + (shapeB.height /2)),
    //add the half widths and half heights of the objects
    hWidths = (shapeA.width / 2) + (shapeB.width / 2),
    hHeights = (shapeA.height / 2) + (shapeB.height /2),
    colDir = null;

    //if the x and y vector are less than the half width or half height, then we must be inside the object
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights){
    colDir = true;
    }
    return colDir;
}
function showGameOverScreen()
{
ctx.clearRect(0, 20, width, height);
//sets the following messages to be displayed in 30 pixel Comic Sans font at their specified locations
ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "yellow";
ctx.textAlign - "center";
ctx.fillText("Game Over!!!!!!!!!!!!!!!!!!", 550, 30);
ctx.fillText(" YOU DIED", 600, 100);
ctx.fillText("Player Score: " + scoreAmount, 560, 260);
//stops the theme music
themeMusic.stop();
//loads and sets the images and position of the replay button
replayButton.src = "Replay.jpg";
replayButton.addEventListener('load', e => {
ctx.drawImage(replayButton, buttonX[2], buttonY[2], buttonWidth[2], buttonHeight[2]);
});
//loads and sets the images and position of the quit button
quit.src = "quitbutton.png";
quit.addEventListener('load', e => {
ctx.drawImage(quit, buttonX[3], buttonY[3], buttonWidth[3], buttonHeight[3]);
});
canvas.addEventListener("mousemove", checkPos);
canvas.addEventListener("mouseup", checkClick);
clearInterval(interval);
}


function replay()
{
  showMenu();
}

function quitGame(){
//the game stops and the window closes
window.close();
}