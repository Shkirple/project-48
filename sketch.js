var boy, boyRun, girl, girlRunning
var invisibleGround
var cloud, tcloud, cloudImg,tcloudImg ,cloudsGroup
var bird, birdImg, birdsGroup
var score;
var bg, bgImg
var gameState = "play"
var obstaclesGroup
var wall1
var wall2


function preload(){
   boyRun= loadAnimation("boy.png");
  bgImg = loadImage("bg4.jpg")
  cloudImg = loadImage("cloud.jpg")
  birdImg = loadImage("bird.jpg")
  tcloudImg = loadImage("tcloud.jpg")
  girlRunning = loadAnimation("girl2.jpg")
  stone = loadImage("stone.png")
  block=loadImage("roadblock.jpg")
    
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  bg = createSprite(773,300)
  bg.addImage("backgroundImage" , bgImg)
  bg.scale = 1.2
  bg.velocityX = -1
  
  boy = createSprite(100,160,20,50);
  boy.addAnimation("Run", boyRun);
  boy.scale = 0.2;

  girl2 = createSprite(50, 160, 20, 50)
  girl2.addAnimation("Running", girlRunning)
  girl2.scale = 0.04

  ground = createSprite(200,180,400,20);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  ground.visible = false

  invisibleGround = createSprite(200,700,10000,10);
  invisibleGround.visible = false;
  
  wall1 = createSprite(5,200,10,10000)
  wall1.visible = false
  wall2 = createSprite(1520,200,10,10000)
  wall2.visible=false
  var rand =  Math.round(random(1,100))
  console.log(rand)

  obstaclesGroup = createGroup()
  cloudsGroup = createGroup()
  tcloudsGroup = createGroup()
  birdsGroup = createGroup()

  girl2.setCollider("rectangle",0,0,400,girl2.height+5)
  score  = 0

  

}

function draw() {
 background("white")
 text("Score: "+ score, 50,50);
 score = score + Math.round(frameCount/60);
  if(gameState==="play"){

  
  console.log(boy.y)
  score = score + Math.round(getFrameRate()/80)
  if(bg.x < 750){
    bg.x = 773
  }
 if(keyDown("UP_ARROW")&& boy.y >=height/1.5) {
    boy.velocityY = -10;
  }

  if(keyDown("DOWN_ARROW")&& boy.y>=100){
    boy.velocityY = 20
  }

  if(keyDown("RIGHT_ARROW")) {
    boy.velocityX = +10;
  }

  if(keyDown("LEFT_ARROW")) {
    boy.velocityX = -10;
  }
  
  boy.velocityY = boy.velocityY + 0.8
  girl2.velocityY = girl2.velocityY +0.8
  
  
  boy.collide(invisibleGround);
  girl2.collide(invisibleGround)
  boy.bounceOff(wall1)
  boy.bounceOff(wall2)
  
  birdAppear()
  cloudsAppear()
   obstaclesAppear()

  if(boy.isTouching(obstaclesGroup)){
    gameState ="end"
  }
  if(boy.isTouching(birdsGroup)){
    gameState ="end"
  }
  if(boy.isTouching(girl2)){
    gameState ="end"
  }

  if(girl2.isTouching(obstaclesGroup)){
girl2.y+=-40
  }
}

else if(gameState==="end"){
text("YOU LOSE", windowWidth/2,windowHeight/2)
bg.destroy()
obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  birdsGroup.destroyEach()
  boy.destroy()
  girl.destroy()

}
  drawSprites();
}


function cloudsAppear(){
  if(frameCount%150===0){
 var cloud = createSprite(1500, Math.round(random(50,150)), 40, 10)
 cloud.velocityX = -4
 cloud.addImage(cloudImg)
 cloud.scale=.5
 cloud.depth=boy.depth
 cloud.depth = girl2.depth
 girl2.depth+=1
 boy.depth+=1
 cloudsGroup.add(cloud);
  }
  
}

function tcloudsAppear(){
  if(frameCount% Math.round(random(180,250))===0){
 var tcloud = createSprite(1500, Math.round(random(50,150)), 40, 10)
 tcloud.velocityX = -4
 tcloud.addImage(tcloudImg)
 tcloud.scale=1.5
 tcloud.depth=boy.depth
 tcloud.depth = girl2.depth
 girl2.depth+=1
 boy.depth+=1
 tcloudsGroup.add(tcloud);



  }}

function obstaclesAppear(){
  if (frameCount % Math.round(random(50,120)) === 0){
    var obstacle = createSprite(1500,650,10,10);
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;  
    obstacle.scale = 0.1
    obstaclesGroup.add(obstacle);
    
  
   var r = Math.round(random(1,2))
  switch(r){
    case 1: obstacle.addImage(stone)
    break
    case 2: obstacle.addImage(block)
    break
  }




}
  }

  function birdAppear(){
    if(frameCount% Math.round(random(100, 170))===0){
      var bird = createSprite(1500, Math.round(random(windowHeight/2, windowHeight-250)), 50, 50)
      bird.addImage(birdImg)
      bird.velocityX = -20
      bird.lifetime = 300
      bird.scale = 0.1
      birdsGroup.add(bird)
    }
  
  
  }
