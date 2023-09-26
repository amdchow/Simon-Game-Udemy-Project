var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function newSequence() {
  // 6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;
  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  // chosen color will flash
  var animatedChosenColor = $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

//1. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
  // plays sound of the chosen color
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour) {
  //3. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("." + currentColour).addClass("pressed");
  //4. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  function animationTimeout() {
    $("." + currentColour).removeClass("pressed");
  }
  setTimeout(animationTimeout, 100);
}

//2. Create a new variable called level and start at level 0.
var level = -1;
var keypress = 0
//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.

$(document).keypress(function() {
  $("level-title").text(keypress += 1);
  if (keypress === 1) {
    newSequence();
    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("h1").html("Level 0");
  }
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  // 3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
   {
    console.log("success");

    // 4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (gamePattern.length === userClickedPattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        newSequence();
      }, 1000);

    }

  } else {
    playSound("wrong")
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  keypress = 0;
}
