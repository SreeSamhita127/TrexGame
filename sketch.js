var trex, trex_running, trexover;
var ground,groundimage;
var invisbleground;
var cloudimage;
var cactus3, cactus1, cactus2, cactus4, cactus5, cactus6;  
var cactusgroup, cloudgroup;
var END, PLAY, gamestate;
var gameover, gameoverImage;
var restart, restartImage;
var score = 0;
var crashSound, jumpsound ,checkSound;

function preload(){
 trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
groundimage = loadImage("ground2.png");
cloudimage = loadImage("cloud.png");
cactus1 = loadImage("obstacle1.png");
cactus2 = loadImage("obstacle2.png");
cactus3 = loadImage("obstacle3.png");
cactus4 = loadImage("obstacle4.png");
cactus5 = loadImage("obstacle5.png");
cactus6 = loadImage("obstacle6.png");
gameoverImage = loadImage("gameOver.png");
restartImage = loadImage("restart.png");
trexover = loadAnimation("trex_collided.png");
crashSound = loadSound("die.mp3");
jumpSound = loadSound("jump.mp3");
checkSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(30,150,10,30);
  trex.addAnimation("trex_running",trex_running);
  trex.addAnimation("trexover",trexover);
  trex.scale = 0.5;
  ground = createSprite (300,180,600,10);
  ground.addImage("ground",groundimage);
  invisibleground = createSprite(300,185,600,10);
  cactusgroup = new Group();
  cloudsgroup = new Group();
  gameover = createSprite(300,20,20,20);
  gameover.addImage("gameoverImage", gameoverImage);
  restart = createSprite (300,60,20,20);
  restart.addImage("restartImage",restartImage);
  restart.scale = 1/2.5;
  END = 0;
  PLAY = 1;
  gamestate = PLAY;
}

function draw() {
  background(180);
  textSize(15);
  fill("black");
  text("score : " + score, 30,20);
  if(gamestate === PLAY){
  gameover.visible = false;
  restart.visible = false;  
  ground.velocityX = -8;
  score = Math.round (score + frameRate()/60);
  if (ground.x < 100){
    ground.x = ground.width/2;
  }
  if(keyDown("space") && trex.y > 150 ){
     trex.velocityY = -10; 
     jumpSound.play();
  }
  if(cactusgroup.isTouching(trex)){
     gamestate = END;
     crashSound.play();
  }
 
  trex.velocityY = trex.velocityY + 0.8;       
  
  cloudfunction();
  cactusfunction();
  }
  if(score%150 === 0 && score > 0){
  checkSound.play();     
  }
  drawSprites();
  trex.collide(invisibleground);
  invisibleground.visible = false;
  
  if(gamestate === END){
    ground.velocityX = 0
    gameover.visible = true;
    restart.visible = true; 
    cactusgroup.setVelocityXEach(0); 
    cloudsgroup.setVelocityXEach(0);
    cactusgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    trex.changeAnimation("trexover");
    trex.velocityY = 0;
    
    if(mousePressedOver(restart)){
      restart1();    
    }
  }
}

function cloudfunction (){
  if(frameCount%75 === 0 ){
  var clouds = createSprite(600,20,10,10);
  clouds.velocityX = -5;
  clouds.y = random(100,120);
  clouds.addImage(cloudimage);
  clouds.scale = 1/2;
  clouds.lifetime = 150;
  cloudsgroup.add(clouds);
  clouds.depth = trex.depth ;
  trex.depth = trex.depth + 1;
}}
function cactusfunction (){
  if(frameCount%100 === 0){ 
  var cactus = createSprite(600,170,10,10);
  cactus.velocityX = -8; 
  cactus.scale = 1/2;
  cactus.lifetime = 100;
  var rand = Math.round(random(1,6));
  switch(rand){
      case 1:cactus.addImage (cactus1);
      break;
      case 2:cactus.addImage (cactus2);
      break;
      case 3:cactus.addImage (cactus3);
      break;
      case 4:cactus.addImage (cactus4);
      break;
      case 5:cactus.addImage (cactus5);
      break;
      case 6:cactus.addImage (cactus6);
      break; 
  }
    cactusgroup.add(cactus); 
    
}}
function restart1 (){
  gamestate = PLAY;
  cactusgroup.destroyEach();
  cloudsgroup.destroyEach();
  trex.changeAnimation("trex_running");
  score = 0;
}
