var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY - 50, hitSize: 25, damage: 10, image: "img/sawblade.png"},
          { type: "sawblade", x: 600, y: groundY - 50, hitSize: 25, damage: 10, image: "img/sawblade.png"},
          { type: "sawblade", x: 900, y: groundY - 50, hitsize: 25, damage: 10, image: "img/sawblade.png"},

          { type: "enemy", x: 900, y: groundY - 50, hitsize: 25, health: 10},
          { type: "enemy", x: 900, y: groundY - 50, hitsize: 25, health: 10},
          { type: "enemy", x: 900, y: groundY - 50, hitsize: 25, health: -30},

          {type: "reward", x: 500, y: groundY - 100, speed: 3, health: 10},

          {type: "level", x: 500, Y: groundY - 10, speed: 3, health: 10 }
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY },
          { type: "sawblade", x: 600, y: groundY },
          { type: "sawblade", x: 900, y: groundY },
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
