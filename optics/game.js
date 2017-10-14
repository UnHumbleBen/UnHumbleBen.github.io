/* global createCanvas */
/* global background */
/* global width */
/* global height */
/* global createSprite */
/* global drawSprites */
/* global rect */
/* global fill */
/* global ellipse */
/* global arc */
/* global noFill */
/* global fill */
/* global stroke */
/* global keyDown */
/* global RIGHT_ARROW */
/* global LEFT_ARROW */
/* global UP_ARROW */
/* global DOWN_ARROW */
/* global text */
/* global line */
/* global sqrt */
var object;
var objectHeight = 40;
var objectDistance;
var mirror;
var mirrorDiameter;
var image;
var focus;
var focalLength;
var imageDistance; 
var imageHeight;
var speed = 2;
function setup() {
    createCanvas(1000, 600);
    fill(255,0,255);
    objectDistance =  width/4;
    object = createSprite(width/2 - objectDistance, height/2 - objectHeight/2, 5, objectHeight);
    //object = rect(width/2 - objectDistance, height/2 - objectHeight , 5, objectHeight);

    mirrorDiameter = 400;
}
function draw() {
   background(255, 255, 255);
    var x = 0; 
    while (x <= width) {
        rect(x, height/2, 15, 1);
        x += 30
    }
    
    noFill();
    mirror = ellipse(width/2 - mirrorDiameter/2, height/2 , mirrorDiameter, mirrorDiameter);
    focus = ellipse (width/2 - focalLength, height/2, 10, 10);
    
    focalLength = mirrorDiameter/4;
    fill (0,0,0);
    objectDistance = (width/2 - object.position.x);
    
    imageDistance = (objectDistance * focalLength)/(objectDistance - focalLength); 
    imageHeight = -1 * (imageDistance/objectDistance) * objectHeight;
    
    /*
    image = createSprite(width/2 - imageDistance , height/2 - imageHeight/2, 5, imageHeight);
    */
    // adjusting mirror
    if (keyDown(90)) {
        mirrorDiameter++;
    }
    if (keyDown(88)) {
        mirrorDiameter--;
    }
    
    
    image = rect(width/2 - imageDistance, height/2 - imageHeight, 5, imageHeight);
    
    // changing object distance
    if (keyDown(RIGHT_ARROW)) { 
        object.position.x = object.position.x + speed;
    }
    if (keyDown(LEFT_ARROW)) {
        object.position.x = object.position.x - speed;
    }
    
    // changing object height
    if (keyDown(UP_ARROW)) {
        objectHeight++;
        object.height++;
        object.position.y-= 0.5;
    }
    if (keyDown(DOWN_ARROW)) {
        objectHeight--;
        object.height--;
        object.position.y+= 0.5;
    }
    drawSprites();
    
    if (keyDown)
    
    // data table
    var isConcave = "CONCAVE ";
    if (objectDistance >= 0 && mirrorDiameter <= 0 || objectDistance <= 0 && mirrorDiameter >= 0) {
        isConcave = "CONVEX ";
    }
    
    var mirrorDataX = 700;
    text(isConcave + "MIRROR", mirrorDataX, 100);
    text("Diameter: " + mirrorDiameter, mirrorDataX, 120);
    text("Focal Length " + focalLength, mirrorDataX, 140);
    
    var objectDataX = 700;
    text("OBJECT" , objectDataX, 160);
    text("Height: " + object.height, objectDataX, 180);
    text("Distance from Mirror " + objectDistance, objectDataX, 200);
    
    var imageDataX = 700;
    text("IMAGE" , imageDataX, 220);
    text("Height: " + imageHeight, imageDataX, 240);
    text("Distance from Mirror " + imageDistance, imageDataX, 260);
    // real or virtual image
    var isReal = "Real ";
    var magnification = imageHeight/object.height; 
    if (magnification > 0) isReal = "Virtual ";
    text(isReal + "Image", 700, 280); 
    
    var magnificationDataX = 700;
    text("MAGNIFICATION: " + magnification, magnificationDataX, 300);
    
    text ("left and right arrow keys to move object \n z key to increase mirror size \n x key to decrease mirror size", 700, 340);
    
    // drawing first light rays
    stroke(255,255,0);
    line(object.position.x, object.position.y - object.height/2, width/2, height/2);
    line(width/2 - imageDistance, height/2 - imageHeight, width/2, height/2);
    
    stroke(255,0,0);
    // drawing second light ray from object
    var aX =  sqrt(mirrorDiameter * mirrorDiameter/4 - (object.height) * (object.height)) + 1/2 * (width - mirrorDiameter);
    line(object.position.x, object.position.y - object.height/2, aX, object.position.y - object.height/2);
    line(width/2 - imageDistance, height/2 - imageHeight,  aX, object.position.y - object.height/2);
    
    stroke(0,255,0);
    // drawing third light ray from object
    var bX = sqrt(mirrorDiameter * mirrorDiameter/4 - (imageHeight) * (imageHeight)) + 1/2 * (width - mirrorDiameter);
    line(object.position.x, object.position.y - object.height/2, bX,  height/2 - imageHeight);
    line(width/2 - imageDistance, height/2 - imageHeight,  bX,  height/2 - imageHeight);   
    
}