  
var towerImg, tower;
var doorImg, door, doorsGroup;
var coins,coinImg,coinsGroup;
var climberImg, climber, climbersGroup;
var endImg,gameOver;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var CoinsCollection;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  coinImg = loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png");
  ghostImg = loadImage("ghost.png");
  endImg = loadImage("gameOver.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 5;
  
  gameOver = createSprite(300,300)
  gameOver.addImage("Running",endImg);
  gameOver.visible=false

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  ghost.debug=false;
  ghost.setCollider("circle",0,0,95)

  CoinsCollection=0;

  coinsGroup = new Group();
}


function draw() {
  background(255);
  
  

  if (gameState === PLAY) {
    
    if(keyDown("LEFT_ARROW")){
  
      // write a code to move left when left arrow is pressed
      ghost.x=ghost.x-8

    }
    if(coinsGroup.isTouching(ghost))
    {
      coinsGroup.destroyEach();
      CoinsCollection=CoinsCollection+1;
    }
     
    
    
    if(keyDown("RIGHT_ARROW")){
  
     
      // write a code to move left when right arrow is pressed
       ghost.x=ghost.x+8
    }
    if(keyDown("space")){
  
      
      // write a code to move up when space arrow is pressed
      ghost.velocityY=-8

    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
   
      //write a condition for infinte scrolling tower
    
       if(tower.y>400)
      {
        tower.y=300;
      }
      
      spawnDoors();

  
      //write a code to make climbersGroup collide with ghost change the ghost velocity  
       if(climbersGroup.isTouching(ghost))
      {
        ghost.velocityY=0;
      }
 
      //write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
  
       if(invisibleBlockGroup.isTouching(ghost))
      {
        gameState=END;
        gameOver.visible=true;
      }

       if(ghost.y>600)
      {
        gameState=END;
        gameOver.visible=true;
      }
   
        createCoins();

      drawSprites();
}

if (gameState === "end"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over", 230,250)
}


textSize(20);
  fill("white");
  text("Coins Collected : "+ CoinsCollection, 200,50);

 
}

function spawnDoors()
 {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //add the random function
    door.x=Math.round(random(120,400))
    climber.x=door.x
    invisibleBlock.x=door.x
    //
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1; 
    //change the depth of the ghost and door
    ghost.depth=door.depth+1;
  
      
    //assign lifetime to the obstacle.lifetime = 300; here  obstacle are door, climber and invisible block
     door.lifetime=800;
     climber.lifetime=800;
     invisibleBlock.lifetime=800;
    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block
     doorsGroup.add(door); 
     invisibleBlockGroup.add(invisibleBlock);
     climbersGroup.add(climber);
  }}  
  
  function createCoins(){
    if (World.frameCount % 210 == 0) 
  {
    var coins = createSprite(Math.round(random(250,-150)));
    coins.addAnimation("Running",coinImg);
    coins.scale=0.3;
    coins.velocityY = 5;
    coinsGroup.add(coins);
  }
}
    


