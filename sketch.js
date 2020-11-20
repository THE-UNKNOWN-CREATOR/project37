let player, 
    gravity = 0.8, 
    jumpHeight = -15, 
    ground, 
    jumpSpace = 360, 
    obstacle = [], 
    spawnRate = 2; 
    enemySpeed = 3, 
    score = 0,
    scoreIncrement = 1,
    start = 0, play = 1, end = 2,
    gameState = start;
    
function setup()
{
  createCanvas(400, 400);
  player = createSprite(20, height/2, 20, 20);
  ground = createSprite(width/2, 390, width+2000, 10);
}

function draw()
{
  
  if(gameState === start)
  {
    background(255, 0, 0)
    var heading = createElement("h1");
    heading.html(" BOX JUMPING ");
    heading.position(75, 20);
    var startButton = createButton(" START ");
    startButton.position(165, 200);

    startButton.mousePressed(() =>
    {
      removeElements();
      frameCount = 0;
      gameState = play;
    })
  }

  if(gameState === play)
  {
  background(0);
  ground.x = player.x;

  player.velocityY += gravity;
  player.velocityX = enemySpeed;
  player.collide(ground);

  camera.position.x = player.x;
  camera.position.y = player.y;

  drawSprites();
  textSize(20);
  text(score, player.x, player.y-100);

  if(frameCount % 100 === 0)
  {
    obstacle.push(createSprite(player.x+250, 390, 40, 40));
  }

  if(frameCount % 60 === 0)
  {
    score+=scoreIncrement;
    //obstacle.shift();
  }

  for(var i = 0; i<obstacle.length; i++)
  {
    obstacle[i].collide(ground);
    obstacle[i].shapeColor = "red";
    obstacle[i].velocityY = gravity;
    obstacle[i].velocityX = -2;

    if(frameCount%600 === 0)
    {
      obstacle[i].destroy();
      //obstacle.pop();
      //score++;
    }
    if(obstacle[i].isTouching(player))
    {
      player.destroy();
      scoreIncrement = 0;
      enemySpeed = 0;
      obstacle[i].destroy;
      gameState = end;
      //remove();
    }
  }
  }

  if(gameState === end)
  {
    /*createCanvas(400, 400);*/
    background(255);
    obstacle = [];
    score = 0;
    var gameOver = createElement("h2");
    gameOver.html("GAME OVER");
    gameOver.position(150, 20);
    var returnButton = createButton(" Return To Start");
    returnButton.position(165, 200);

    returnButton.mousePressed(() =>
    {
      removeElements();
      gameState = start;
      setup();
      scoreIncrement = 1;
      enemySpeed = 3;
    })
  }
}

function keyPressed()
{
  if(player.y > jumpSpace && key == ' ')
  {
    player.velocityY = jumpHeight;
  }
}