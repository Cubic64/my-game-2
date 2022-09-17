var bgImg,playerImg,player2Img,player3Img,ground,borderImg;
var player,score,cloudImage,obstaclesGroup,coinsGroup;


function preload(){

coinImg = loadImage("./assets/coin.png");
bgImg =loadImage("./assets/background img.jfif");
playerImg = loadImage("./assets/mario 2.2.png");
player2Img = loadImage("./assets/mario 1.2.png");
player3Img = loadImage("./assets/mario 1.2.2.png");
borderImg = loadImage("./assets/border.png");
cloudImage = loadImage("./assets/cloud.png");
obstacle1 = loadImage("./assets/mushroom.png");

}

function setup() {
createCanvas(windowWidth,windowHeight);

player = createSprite(displayWidth-1280, displayHeight-330, 50, 50);
player.addImage(playerImg)
player.scale = 0.5



ground = createSprite(displayWidth/2+100, displayHeight+360,500,50);
ground.addImage(bgImg)
ground.visible = false;
ground.scale = 7

score = 0;

obstaclesGroup = new Group ();
coinsGroup = new Group();
}

function draw() {
  background(bgImg); 
  player.addImage(playerImg);

  player.collide(ground)

  if(keyDown("space")&& player.y >= 380){
  player.velocityY = player.velocityY - 12
  }

  player.velocityY = player.velocityY + 4;

  fill("red");
  textSize(25);
  text("score: "+score,100,100,80,80);

  spawnClouds();
  obstacles();
  coins();

    if(player.x > 1500){
     player.x=displayWidth-1280;
     
  };

  if(player.x < 0){
    player.x=displayWidth-1280;
 };

  if(player.isTouching(coinsGroup)){
    score += 1;
    coin.destroy();
  };

  if (player.isTouching(obstaclesGroup)){
    //player.destroy();
  }

  if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-15
  player.addImage(player3Img);
  };

  if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+15
  player.addImage(player2Img);
  };

  if(keyWentDown("space")){
  player.y = player.y +0.2
  };

drawSprites();

}

function obstacles () {
  if (frameCount %150 === 0){
    var obstacle = createSprite(1290,469,10,40);
    obstacle.addImage(obstacle1);
    obstacle.velocityX = -(6 + score/100);
 
     obstacle.scale = 0.5;
     obstacle.lifetime = 300;    

     obstaclesGroup.add(obstacle)
  }
};

function coins () {
  if (frameCount %120 === 0){
     coin = createSprite(1290,469,10,40);
    coin.addImage(coinImg);
    coin.velocityX = -(6 + score/100);
 
     coin.scale = 0.5;
     coin.lifetime = 300; 
     
     coinsGroup.add(coin)
  }
};

function spawnClouds() {
  if (frameCount % 90 === 0) {
     cloud = createSprite(1280,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 300;
    
    cloud.depth = player.depth;
    player.depth = player.depth + 1;
  }
}
