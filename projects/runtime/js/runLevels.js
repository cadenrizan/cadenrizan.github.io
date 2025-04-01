var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createobstacles(x, y, hitSize, damage, image, xscale, yscale) {
      var hitZoneSize = hitSize; //define the size of the hitzone and assign to a variable
      var damageFromObstacle = damage; // defines the amount of damage obstacle causes and assigns to variable
      var obstacleHitZone = game.createObstacle(
        hitZoneSize,
        damageFromObstacle
      ); // creates the obsticle hitzone using the size and damage as parameters and assigns it to a variable
      obstacleHitZone.x = x; // sets the x cordinate of the obstacle
      obstacleHitZone.y = y; // sets the y cordinate of the obstacle
      game.addGameItem(obstacleHitZone); // adds the obstacle hitzone to the game
      var obstacleImage = draw.bitmap(image); // draw the image bitmap
      obstacleHitZone.addChild(obstacleImage); // attach the image to the obstacle
      obstacleImage.x = -25; // position the image on the hitzone's value by moving it left 25 pixels
      obstacleImage.y = -25; // position of the image on the hitzones y value by moving it up 25 pixels
      obstacleImage.scaleX = xscale;
      obstacleImage.scaleY = yscale;
      obstacleHitZone.rotationalvolicity = 10;
    }

    function createEnemy(x, y, speed, health) {
      var enemy = game.createGameItem("enemy", 25); // creates enemy game item and adds it to game
      var redSquare = draw.rect(50, 50, "red"); // creates a red square and stores it in the variable red square
      redSquare.x = -25; // offsets the image from the hitzone by -25 pixels
      redSquare.y = -25; // offsets the image from the hitzone by -25 pixels
      enemy.addChild(redSquare); // add the red square to our child as a enemy variable
      enemy.x = x; // pos of x
      enemy.y = y; // pos of y
      game.addGameItem(enemy); // enemy to game
      enemy.velocityX -= speed; // controlling how fast the enemy moves on the x plane
      enemy.rotationalvelocity = 10; // sets the rotational volcity of the enemy
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(health); // subtracts 10 health from halleBot's HUD
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100); // increases your score when halle shoots the enemy
        enemy.fadeOut(); // enemy fades out when halle shoots enemy
        //enemy.shrink.();
        //enemy.fadeOut();
      };
    }

    function createReward(x, y, speed, health) {
      var reward = game.createGameItem("reward", 25); // creates enemy game item and adds it to game
      var blueSquare = draw.rect(50, 50, "blue"); // creates a red square and stores it in the variable red square
      blueSquare.x = -25; // offsets the image from the hitzone by -25 pixels
      blueSquare.y = -25; // offsets the image from the hitzone by -25 pixels
      reward.addChild(blueSquare); // add the red square to our child as a enemy variable
      reward.x = x; // pos of x
      reward.y = y; // pos of y
      game.addGameItem(reward); // enemy to game
      reward.velocityX -= speed; // controlling how fast the enemy moves on the x plane
      reward.rotationalvelocity = 10; // sets the rotational volcity of the enemy
      reward.onPlayerCollision = function () {
        game.changeIntegrity(health); // subtracts 10 health from halleBot's HUD
      };
      reward.onProjectileCollision = function () {
        game.increaseScore(100); // increases your score when halle shoots the enemy
        reward.fadeOut(); // enemy fades out when halle shoots enemy
        //enemy.shrink.();
        //enemy.fadeOut();
      };
    }
    createReward(500, groundY - 100, 3, 40);

    function createLevel(x, y, speed) {
      var level = game.createGameItem("level", 25); // creates enemy game item and adds it to game
      var yellowSquare = draw.rect(50, 50, "yellow"); // creates a red square and stores it in the variable yellowsquare
      yellowSquare.x = -25; // offsets the image from the hitzone by -25 pixels
      yellowSquare.y = -25; // offsets the image from the hitzone by -25 pixels
      level.addChild(yellowSquare); // add the red square to our child as a enemy variable
      level.x = x; // pos of x
      level.y = y; // pos of y
      game.addGameItem(level); // enemy to game
      level.velocityX -= speed; // controlling how fast the enemy moves on the x plane
      level.rotationalvelocity = 10; // sets the rotational volcity of the enemy
      level.onPlayerCollision = function () {
        game.changeIntegrity(10); // subtracts 10 health from halleBot's HUD
      };
      level.onProjectileCollision = function () {
        game.increaseScore(100); // increases your score when halle shoots the enemy
        reward.fadeOut(); // enemy fades out when halle shoots enemy
        //enemy.shrink.();
        startLevel();
      };
    }

    function startLevel() {
      // TODO 13 goes below here

      var level = levelData[currentLevel]; // fetches the currwentLevel from the levelData  and stores it in var levels
      var levelObjects = level.gameItems; // retrives the array of gameItems and stores it in levelObjects

      for (var i = 0; i < levelObjects.length; i++) {
        var element = levelObjects[i];

        if (element.type === "sawblade" || element.type === "nail") { // checks the type key:value of the game item onjects to determine how it creates
         
        createobstacles(element.x, element.y,  element.hitSize,  element.damage, element.image, element.xscale, element.yscale); // if the condition is true it will call the relavant function
         
        }
       
        if (element.type === "enemy") {  
          createEnemy(element.x, element.y, element.speed, element.health);
           
         }
   
         if (element.type === "reward") {
         createReward(element.x, element.y, element.speed, element.health);
   
         }
   
         if (element.type === "level") {
         createLevel(element.x, element.y, element.speed);
   
         }
      }
      
       

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
