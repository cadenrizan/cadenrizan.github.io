var background = function (window) {
  "use strict";

  window.opspark = window.opspark || {};
  var draw = window.opspark.draw;
  var createjs = window.createjs;

  /*
   * Create a background view for our game application
   */
  window.opspark.makeBackground = function (app, ground) {
    /* Error Checking - DO NOT DELETE */
    if (!app) {
      throw new Error("Invalid app argument");
    }
    if (!ground || typeof ground.y == "undefined") {
      throw new Error("Invalid ground argument");
    }

    // useful variables
    var canvasWidth = app.canvas.width;
    var canvasHeight = app.canvas.height;
    var groundY = ground.y;

    // container which will be returned
    var background;

    //////////////////////////////////////////////////////////////////
    // ANIMATION VARIABLES HERE //////////////////////////////////////
    //////////////////////////////////////////////////////////////////
    // TODO (several):
    var tree;
    var buildings = [];
    // called at the start of game and whenever the page is resized
    // add objects for display in background. draws each image added to the background once
    function render() {
      background.removeAllChildren();

      // TODO 1:
      // this currently fills the background with an obnoxious yellow;
      // you should modify both the height and color to suit your game
      var backgroundFill = draw.rect(canvasWidth, groundY, "grey"); // rect and width draws the background
      background.addChild(backgroundFill);

      // TODO 2: - Add a moon and starfield

      var moon = draw.bitmap("img/moon.png"); // creates a bitmap object using the moon image and stores it in the moon variable
      moon.x = canvas.width - 600; //sets the moon's x position
      moon.y = groundY - 200; //sets the moon's y position
      moon.scaleX = 0.5; //scales the moon's width
      moon.scaleY = 0.5; //scales the moon's height
      background.addChild(moon); // add the moon to the background container

      for (var i = 0; i < 100; i++) {
        var circle = draw.circle(10, "white", "LightGray", 2); // create a circle with a specified radius, border color, fill color,alpha
        circle.x = canvasWidth * Math.random(); // set random x pos within canvas width
        circle.y = groundY * Math.random(); // set random  y pos within groundy range
        background.addChild(circle); // adds the star to the background container
      }
      // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
      for (var i = 0; i < 5; i++) {
        var buildingColors = ["red", "blue", "black", "purple", "pink"];
        var buildingHeight = 300 * Math.random(); // assign 300 to the buildingHeight variable
        var building = draw.rect(
          75,
          buildingHeight,
          buildingColors[i],
          "Black",
          1
        ); //
        building.x = 200 * i; // multiply 200 by the current i value and store it as x pos for the building
        building.y = groundY - buildingHeight; // takes the groundy and subtracts the building height
        background.addChild(building); // add our building to the background container
        buildings.push(building); // add the buildings arrat for further manipulation
      }
      // TODO 3: Part 1 - Add a tree
      tree = draw.bitmap("img/tree.png"); // creates a bitmap for the tree image and stores it in the variable tree
      tree.x = canvasWidth - 300; // place the tree off-screen to the right
      tree.y = groundY - 225; // place the tree above the gorund (adjusted for tree height)
      background.addChild(tree); // add the tree to the background container
    } // end of render function - DO NOT DELETE

    // Perform background animation
    // called on each timer "tick" - 60 times per second
    function update() {
      // useful variables
      var canvasWidth = app.canvas.width;
      var canvasHeight = app.canvas.height;
      var groundY = ground.y;

      // TODO 3: Part 2 - Move the tree!
      tree.x -= 3; // moves the tree to the left by subtracting 3 from it's current x pos
      tree.x = tree.x + 1;
      if (tree.x < -200) {
        tree.x = canvasWidth - 100;
      }
      // TODO 4: Part 2 - Parallax
      for (var i = 0; i < buildings.length; i++) {
        var building = buildings[i]; // the individual index of the building stored in an array
        building.x -= 1; // subtracts 1 from building x pos; animiate to left
        if (building.x < 0) {
          // checks if the x pos of the building is less than -100
          building.x = canvasWidth; // if true, reset building x pos right of the canvas
        }
      }
    } // end of update function - DO NOT DELETE

    /* Make a createjs Container for the background and let it know about the render and upate functions*/
    background = new createjs.Container();
    background.resize = render;
    background.update = update;

    /* make the background able to respond to resizing and timer updates*/
    app.addResizeable(background);
    app.addUpdateable(background);

    /* render and return the background */
    render();
    return background;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = background;
}
