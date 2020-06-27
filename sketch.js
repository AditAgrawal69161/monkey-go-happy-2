//Global Variables
var banana,bananaImage,foodGroup;
var obstacle,obstacleImage,obstacleGroup;
var backGround,backImage,ground,score = 0;
var player_running,player;
var score = 0;
var st= 0; 

var PLAY = 0;
var END = 1;
var gameState = PLAY;

var re,go,rei,goi;

function preload(){

player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");  

backImage = loadImage("jungle.jpg");  
bananaImage = loadImage("Banana.png"); 
obstacleImage = loadImage("stone.png");
rei = loadImage("restart.png");
goi = loadImage("gameOver.png");
}


function setup() {
  createCanvas(600,300);
 
  
backGround = createSprite(300,50 ,600,300);
backGround.addImage(backImage);
backGround.x = backGround.width /2;

re = createSprite(300,175,20,20);
re.addImage(rei);
re.scale = 0.5;
re.visible = false; 
  
go = createSprite(300,130,20,20);
go.addImage(goi);
go.scale = 0.7;
go.visible = false; 
  
ground = createSprite(300,300,600,30);
ground.visible = false;
player = createSprite(75,260,600,30);
player.addAnimation("running", player_running);
player.scale = 0.13;
  
foodGroup = new Group();
obstacleGroup = new Group();


}


function draw(){
 console.log(gameState);
 background(255); 
 player.collide(ground);
 player.velocityY = player.velocityY + 0.33;   

 if (gameState === PLAY) {
     
  backGround.velocityX = -6;
     
  st = st + Math.round(getFrameRate()/60);

    if (keyDown("space") && (player.y > 235 )) {
    player.velocityY = -8;  
    }
  console.log(player.y);
   if(backGround.x < 100 ){
   backGround.x = backGround.width/2;  
   }
  
   bananaf();
   obstaclesf();

     
     if(player.isTouching(foodGroup)){
    banana.destroy(player);   
    score = score +1;
    }
   
   switch(score){
   case 10:player.scale = 0.145;
        break;
   case 20:player.scale = 0.16;
        break;
   case 30:player.scale = 0.165;
        break;
   case 40:player.scale = 0.17;
        break;
   
        default: break;
   
   }
     
   if(player.isTouching(obstacleGroup) && score <9  ){
    gameState = END;
    }
    
     if (player.isTouching(obstacleGroup) && score > 9 ){
    player.scale = 0.13;
    score = 0;
    obstacleGroup.destroyEach();
     }
   }
     
     
 if (gameState === END){
 
backGround.velocityX = 0;
banana.velocityX = 0;  
obstacle.velocityX = 0;
player.visible = false;
banana.lifetime = -1;
obstacle.lifetime = -1;
re.visible = true; 
go.visible = true; 

   if (mousePressedOver(re)){
     reset();
   }

 }

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score = "+score ,490 ,30);
  text("Time Survived = " + st,30,30)

}

function bananaf() {
if (frameCount%117 === 0) {
banana = createSprite(610,150,600,30); 
banana.addImage(bananaImage);
banana.scale = 0.042;
var rand = Math.round(random(130,180));     
banana.y = rand;
banana.velocityX = -7;  
banana.lifetime = 140;  
foodGroup.add(banana);
}
  
}

function obstaclesf() {
if (frameCount%230 === 0) {
obstacle = createSprite(620,264,600,30);
obstacle.addImage(obstacleImage);
obstacle.scale = 0.17;      
obstacle.velocityX = -6;  
obstacle.lifetime = 210;  
obstacle.setCollider ("circle", offsetX = 0 , offsetY = 100, 250 );
obstacleGroup.add(obstacle);
}
  
}

function reset(){
  gameState = PLAY;
  
  go.visible = false;
  re.visible = false;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
  player.visible = true;
  
  score = 0;
  st = 0;
}
