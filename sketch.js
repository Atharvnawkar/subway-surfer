  var jake,jake_r;
  var ground, groundimg;
  var coin, coinI, coinG;
  var power, powerI, powerG;
  var bomb, bombI, bombG;
  var score = 0;
  var PLAY = 0;
  var END = 1;
  var gameState = PLAY; 
  var gamo,gmoi;
  function preload(){
  jake_r = loadAnimation("Jake1.png","Jake2.png","jake3.png","jake4.PNG" ,"jake5.png");
  gmoi = loadImage("go.png");
  groundimg = loadImage("path.png");
  coinI = loadImage("coin.png");
  powerI = loadImage("energyDrink.png");
  bombI = loadImage("bomb.png");
  }

  function setup(){
  createCanvas(400,400);
  coinG = new Group();
  powerG = new Group();
  bombG = new Group();
    
  ground = createSprite(200,330,400,400);  
  ground.addImage("img",groundimg);
  ground.velocityY = 4;
  ground.scale = 1.3;
  
  jake = createSprite(200,330,20,50);
  jake.addAnimation("running", jake_r);
  jake.scale = 0.8;
  //jake.debug = true;
  
  gmo = createSprite(200,200);
  gmo.addImage(gmoi);
    
  edges = createEdgeSprites();
  score = 0;
  
  } 

  function draw(){
  
  background("black");
  if(gameState === PLAY){
    gmo.visible = false;
    jake.visible = true;
    
    jake.x= mouseX;
    
  //console.log(jake.y);
    
  if (ground.y > 400) {
    ground.y = ground.width / 2;
  }
    
    if(jake.isTouching(coinG)){
      coinG.destroyEach();
      score++;
    }
    
    if(jake.isTouching(powerG)){
      powerG.destroyEach();
      ground.velocityY++;
      coinG.velocityY++;
      powerG.velocityY++;
    }
    
    ground.velocityY = 4;
    
    coinf();
    powerf();
    bombf();
    
    if(jake.isTouching(bombG)){
      gameState = END;
    }
    //textSize(20);
    //fill(255);
    //text("score: "+ score,200,30);
    //score.depth = ground.depth;
  }
    if(gameState === END){
      gmo.visible = true;
      bombG.destroyEach();
      coinG.destroyEach();
      powerG.destroyEach();
      ground.velocityY = 0;
      jake.visible = false;
      if(mousePressedOver(gmo)){
        reset();
      }
    }
  drawSprites();
  
}

function coinf(){
  if(frameCount % 150 === 0){
    coin = createSprite(Math.round(random(50,350)));
    coin.velocityY = 4;
    coin.scale = 0.3;
    coin.lifetime = 120;
    jake.depth = coin.depth;
    jake.depth++;
    coin.addImage(coinI);
    coinG.add(coin);
  }
}
function powerf(){
  if(frameCount % 300 === 0){
    power = createSprite(Math.round(random(50,350)));
    power.velocityY = 4;
    power.addImage(powerI);
    power.scale = 0.1;
    jake.depth = power.depth;
    jake.depth++;
    powerG.add(power);
    power.lifetime = 120;
    power.setCollider("rectangle",0,0,150,power.height)
  }
}
function bombf(){
  if(frameCount % 200 === 0){
    bomb = createSprite(Math.round(random(50,350)));
    bomb.addImage(bombI);
    bomb.velocityY = 4;
    bomb.scale = 0.1;
    jake.depth = bomb.depth;
    jake.depth++;
    bombG.add(bomb);
  }
}
function reset(){
  gameState = PLAY;
}