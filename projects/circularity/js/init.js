var init = function (window) {
  "use strict";
  var draw = window.opspark.draw,
    physikz = window.opspark.racket.physikz,
    app = window.opspark.makeApp(),
    canvas = app.canvas,
    view = app.view,
    fps = draw.fps("#000");

  window.opspark.makeGame = function () {
    window.opspark.game = {};
    var game = window.opspark.game;

    ////////////////////////////////////////////////////////////
    ///////////////// PROGRAM SETUP ////////////////////////////
    ////////////////////////////////////////////////////////////

    // TODO 1 : Declare and initialize our variables
    // create variables called circle and circles
    var circle; // variable to hold a single circle when creating circles / iterating
    var circles = []; // variable to store all circles in an array

    // TODO 2 : Create a function that draws a circle

    // created function called drawcircle that draws a circle

    function drawCircle() {
      // circle is telling rather circle = draw is true or not
      circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
      // seeing if circle fits on the canvas
      physikz.addRandomVelocity(circle, canvas, 5, 5);
      // veiwing circles
      view.addChild(circle);
      circles.push(circle);
    }

    // TODO 3 / 7 : Call the drawCircle() function

    // calling the function 5 times

    /*

    drawCircle();
    drawCircle();
    drawCircle();
    drawCircle();
    drawCircle();

    // using a for loop to see how manny times var will draw the circle

    */
    for (var i = 0; i <= 100; i++) {
      drawCircle();
    }

    ////////////////////////////////////////////////////////////
    ///////////////// PROGRAM LOGIC ////////////////////////////
    ////////////////////////////////////////////////////////////

    /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
    // calling function

    // calling the update function

    function update() {
      // TODO 4 : Update the circle's position //
      // updating the circles positition
      /*
      physikz.updatePosition(circles[0]);
      physikz.updatePosition(circles[1]);
      physikz.updatePosition(circles[2]);
      physikz.updatePosition(circles[3]);
      physikz.updatePosition(circles[4]);
      // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.

      // calling game.checkCirclePosition()

      game.checkCirclePosition(circles[0]);
      game.checkCirclePosition(circles[1]);
      game.checkCirclePosition(circles[2]);
      game.checkCirclePosition(circles[3]);
      game.checkCirclePosition(circles[4]);
      */
      // TODO 9 : Iterate over the array

      // creating a for loop array

      for (var i = 0; i < circles.length; i++) {
        physikz.updatePosition(circles[i]);
        game.checkCirclePosition(circles[i]);
      }
    }

    /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
    game.checkCirclePosition = function (circle) {
      // if the circle has gone past the RIGHT side of the screen then place it on the LEFT

      // using an if statment checking the circle has gone past the Right side of the screen

      if (circle.x > canvas.width) {
        circle.x = 0;
      }

      // TODO 6 : YOUR CODE STARTS HERE //////////////////////
      // checking if circle is going off page

      // using an if statment if circle is going off the page

      if (circle.x < 0) {
        circle.x = canvas.width;
      }
      // checking if it will go off or stay on the page

      // using an if statment to see if circle will go off or stay on the page

      if (circle.y > canvas.height) {
        circle.y = 0;
      }
      // checking if it come sback at the top

      // using an if statment to see if circle comes back at the top

      if (circle.y < 0) {
        circle.y = canvas.height;
      }

      // YOUR TODO 6 CODE ENDS HERE //////////////////////////
    };

    /////////////////////////////////////////////////////////////
    // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
    /////////////////////////////////////////////////////////////

    view.addChild(fps);
    app.addUpdateable(fps);

    game.circle = circle;
    game.circles = circles;
    game.drawCircle = drawCircle;
    game.update = update;

    app.addUpdateable(window.opspark.game);
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = init;
}
