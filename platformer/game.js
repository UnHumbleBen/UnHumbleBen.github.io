/*global createCanvas*/
/*global background*/
/*global Group*/
/*global width*/
/*global createSprite*/
/*global height*/
/*global drawSprites*/
/*global camera*/
/*global keyDown*/
/*global UP_ARROW*/
/*global random*/
var gravity = 0.3;
var JUMP = -5;

var groundSprites;
var GROUND_SPRITES_WIDTH = 50;
var GROUND_SPRITES_HEIGHT = 50;
var numGroundSprites;

var player;
var obstacleSprites;
function setup() {
    createCanvas(400,300);
    background(150,200,250);
    groundSprites = new Group();
    
    numGroundSprites = width/GROUND_SPRITES_WIDTH + 1;
    for (var n = 0; n < numGroundSprites; n++) {
        var groundSprite = createSprite(n*50,height-25,GROUND_SPRITES_WIDTH,GROUND_SPRITES_HEIGHT);
        groundSprites.add(groundSprite);
    }
    
    player = createSprite(100, height-75, 50, 50);
    obstacleSprites = new Group();
}
function draw() {
    background(150,200,250);
    player.velocity.y += gravity;
    
    if (groundSprites.overlap(player)) {
        player.velocity.y = 0;
        player.position.y = (height-50) - (player.height/2);
    }
    
    if (keyDown(UP_ARROW)) {
        player.velocity.y = JUMP;
    }
    player.position.x += 5;
    camera.position.x = player.position.x + width/4;
    var firstGroundSprite = groundSprites[0];
    if (firstGroundSprite.position.x <= camera.position.x - width/2-firstGroundSprite.width/2) {
        groundSprites.remove(firstGroundSprite);
        firstGroundSprite.position.x += numGroundSprites*firstGroundSprite.width;
        groundSprites.add(firstGroundSprite);
    }
    if (random() > 0.95) {
        var obstacle = createSprite(camera.position.x + width, height-50-15, 30, 30);
        obstacleSprites.add(obstacle);    
    }
    
    var firstObstacle = obstacleSprites[0];
    if (obstacleSprites.length > 0 && firstObstacle.position.x < camera.position.x - width/2 - firstObstacle.width/2) {
        obstacleSprites.remove(firstObstacle);
    }
    
    obstacleSprites.overlap(player, endGame);
    drawSprites();
}

function endGame() {
    console.log("Game Over!");
}