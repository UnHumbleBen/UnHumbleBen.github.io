var player;
var enemy;
function setup() {
    createCanvas(250, 250);
    player = createSprite(width/2,height-25,50,50);
    enemy = createSprite(width/2, 0, 10, 30);
    isGameOver = false;
}

function draw() {
    if (isGameOver) {
        gameOver();
    }
    else {
         background(0,0,100);
       //player.position.x = player.position.x + 1;
       if (keyDown(RIGHT_ARROW) && player.position.x < width-25) {
           player.position.x = player.position.x + 1;
       }
       if (keyDown(LEFT_ARROW) && player.position.x > 25) {
           player.position.x = player.position.x - 1;
       }
       
        drawSprites();
        
        if (enemy.position.y > height) {
            enemy.position.y = 0;
            enemy.position.x = random(5, width - 5);
        }
        enemy.position.y = enemy.position.y + 3;
        
        if (player.overlap(enemy)) {
            isGameOver = true;
     
            
        }
        
    
    }
  
}

function gameOver () {
    background(0);
    textAlign(CENTER);
    fill("white");
    text("Game Over!", width/2, height/2)
    text ("Click anywyere to try again", width/2, 3*height/4);
}

function mouseClicked () {
    if (isGameOver) {
              isGameOver = false;
        player.position.x = width/2;
         player.position.y = height-25;
        enemy.position.x = width/2;
        enemy.position.y = 0;
    }

}

