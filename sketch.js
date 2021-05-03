var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver, restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1400, 600);
  
  trex = createSprite(50,480,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided", trex_collided);
  ground = createSprite(200,480,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  gameOver = createSprite(600,350);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  restart = createSprite(600,300);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  invisibleGround = createSprite(200,490,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  score.scale = 5.5;
}

function draw() {
  background(180);
  
  
  if(gameState === PLAY){
    /*score = score + Math.round(getFrameRate()/60);
  text("score: "+ score, 400,50);*/
  
    
    if(keyDown("space") && trex.y>=459) {
      
    trex.velocityY = -14;
  }
    trex.velocityY = trex.velocityY + 0.6
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
     trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
     if(obstaclesGroup.isTouching(trex)){
     // playSound("jump.mp3");
      gameState = END;
     // playSound("die.mp3");
    }
    
  }
  else if(gameState===END){
    
    gameOver.visible = true;
    restart.visible = true;
    score=0;
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)&& gameState===END){
      score=0;
     reset(); 
      
    }
    
  }
          
  
 
  drawSprites();
  score = score + Math.round(getFrameRate()/60);
  text("score: "+ score, 1200,200);
  
    
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,420,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,465,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
gameState= PLAY;
gameOver.visible=false;
restart.visible= false;
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
trex.changeAnimation("running",trex_running);
score = 0;
}