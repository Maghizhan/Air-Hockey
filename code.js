var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var goal1=createSprite(200,28,100,20);
goal1.shapeColor=("yellow");
var goal2=createSprite(200,372,100,20);
goal2.shapeColor=("yellow");


// making court
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";

//making inner court
var boundary5 = createSprite(200,15,400,5);
boundary5.shapeColor = "white";
var boundary6 = createSprite(200,385,400,5);
boundary6.shapeColor = "white";
var boundary7 = createSprite(15,200,5,400);
boundary7.shapeColor = "white";
var boundary8 = createSprite(385,200,5,400);
boundary8.shapeColor = "white";

//creating inside boundaries
var boundary9 = createSprite(200,130,400,5);
boundary9.shapeColor = "white";
var boundary10 = createSprite(200,270,400,5);
boundary10.shapeColor = "white";

// creating objects and giving them colours
var striker = createSprite(200,200,10,10);
striker.shapeColor = "white";

var playerMallet = createSprite(200,50,50,10);
playerMallet.shapeColor = "black";

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "black";

//variable to store different state of game
var gameState = "serve";

//variables to keep the score
var compScore = 0;
var playerScore = 0;

function draw() 
{
  //clear the screen
  background("green");
  
  //place info text in the center and giving gamestate 
  if (gameState === "serve")
  {
    textSize(18);
    fill ("maroon");
    text("Press Space to Strike",120,180);
    computerMallet.x = 200;
    computerMallet.y = 350;
  }
  //display scores
  textSize(18);
  fill("maroon");
  text(compScore, 25,225);
  text(playerScore,25,185);
  
  //make the player paddle move with the Arrow keys
    
    if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  }
  if(keyDown("right")){
     playerMallet.x = playerMallet.x+10;
    
  }
  if(keyDown("up")){
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  if(keyDown("down")){
    
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y+10;
   }
  }
  
  
  //AI for the computer paddle
  //make it move with the striker's y position
  computerMallet.x = striker.x;
 
  
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) 
  { 
    line(i,200,i+10,200);
  }
  
  //create edge boundaries
  //make the striker bounce with the top and the bottom edges
  createEdgeSprites();
  
  striker.bounceOff(boundary7);
  striker.bounceOff(boundary8);
  striker.bounceOff(boundary5);
  striker.bounceOff(boundary6);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  
  playerMallet.bounceOff(boundary7);
  playerMallet.bounceOff(boundary8);
  playerMallet.bounceOff(boundary5);
  playerMallet.bounceOff(boundary9);
 
  computerMallet.bounceOff(boundary7);
  computerMallet.bounceOff(boundary8);
  computerMallet.collide(boundary10);
  computerMallet.collide(boundary6);



 
  
  //serve the striker when space is pressed
  if (keyDown("space") &&  gameState === "serve") 
  {
    serve();
    striker.velocityX = striker.velocityX -1;
    striker.velocityY = striker.velocityY -1;
    gameState = "play";
    
  }
  
  // Score
  if(striker.isTouching(goal1) || striker.isTouching(goal2) )
  {
    if(striker.isTouching(goal1))
      { 
        compScore = compScore + 1;
      }
      
      if(striker.isTouching(goal2))
      {
        playerScore = playerScore + 1;
      }
      
      reset();
      gameState = "serve";
  }
  
  // Game State END
  if (playerScore === 5 || compScore === 5)
  {
    gameState = "end";
    fill("maroon");
    textSize(18);
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
    playerMallet.x = 200;
    playerMallet.y = 40;
  }
  
  // Restarting the Game
  if (keyDown("r") && gameState === "end")
  {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  drawSprites();
}
function serve() 
{
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function reset() 
{
  striker.x = 200;
  striker.y = 200;
  striker.velocityX = 0;
  striker.velocityY = 0;
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
