class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage(car1img);
    car2 = createSprite(300,200);
    car2.addImage(car2img);
    car3 = createSprite(500,200);
    car3.addImage(car3img);
    car4 = createSprite(700,200);
    car4.addImage(car4img);
    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(ground);
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index = 0;
      var x= 175;
      var y;
      for(var plr in allPlayers){
       index+=1;
       x=x+250;
       y=displayHeight-allPlayers[plr].distance;
       cars[index-1].x= x;
       cars[index-1].y= y;   
       if(index==player.index){
         stroke(10);
         fill("red");
         ellipse(x,y,60,60);
         text(player.name,x-20,y+100);
         cars[index-1].shapeColor="red";
         camera.position.x = displayWidth/2;
         camera.position.y = cars[index-1].y;
       }
      }
    }
    
    if(keyIsDown(UP_ARROW) && player.index !== null){
      console.log(player.distance);
      player.distance +=10;
      player.update();
    }
    if(player.distance>4650){
      gameState=2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
      text("Game Over",displayWidth/2-50,y-80);
      text("Player Rank: " + player.rank,displayWidth/2-50,y-120);
    }
    drawSprites();
  }
  end(){
    console.log("GameEnded");
    console.log(player.rank);
  }

}
