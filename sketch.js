/*******************************************************************************************************************
     Complex State Machine 
    by Kiana Signey
 
  Color Palette Values:

  Pink #d81159 216, 17, 89 
  Yellow #ffbc42 255, 188, 66
  Green #679436 103, 148, 54
  Blue #0496ff  4, 150, 255
  Dark blue #006ba6 0, 107, 166
  Purple #4e148c 78, 20, 140 
  White#FFFFFF 255, 255, 252
    Uses the p5.ComplexStateMachine library. Check the README.md + source code documentation
    The index.html needs to include the line:  <script src="p5.complexStateManager.js"></script>
*********************************************************************************************************************/

var complexStateMachine;           // the ComplexStateMachine class
var clickablesManager;             // our clickables manager
var clickables;                    // an array of clickable objects

var currentStateName = "";
var StatusImage;

var bkColor = '#031927';
var textColor = '#588157';

var buttonFont;

function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  complexStateMachine = new ComplexStateMachine("data/interactionTable.csv", "data/clickableLayout.csv");

  buttonFont = loadFont("AtariClassic-ExtraSmooth.ttf");

}

// Setup code goes here
function setup() {
  createCanvas(1280, 720);
  imageMode(CENTER);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // setup the state machine with callbacks
  complexStateMachine.setup(clickablesManager, setImage, stateChanged);

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 
 }


// Draw code goes here
function draw() {
  drawBackground();
  drawImage();
  drawOther();
  drawUI();
}

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].textFont = "AtariClassic-ExtraSmooth";
    clickables[i].width = 220;
  }
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#588157";
  this.noTint = false;
  this.tint = "#588157";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#3A5A40";
}

clickableButtonPressed = function() {
  complexStateMachine.clickablePressed(this.name);
}

// this is a callback, which we use to set our display image
function setImage(imageFilename) {
  StatusImage = loadImage(imageFilename);
} 

// this is a callback, which we can use for different effects
function stateChanged(newStateName) {
    currentStateName = newStateName;
    console.log(currentStateName);
} 


//==== KEYPRESSED ====/
function mousePressed() {
  // if( currentStateName === "Instructions" ) {
  //   complexStateMachine.newState("Instructions");
  // }
}

//==== MODIFY THIS CODE FOR UI =====/

function drawBackground() {
  background(color(bkColor));
}

function drawImage() {
  if( StatusImage !== undefined ) {
    image(StatusImage, width/2, height/2);
  }  
}

function drawOther() {
  push();

  pop();
}

//-- right now, it is just the clickables
function drawUI() {
  clickablesManager.draw();
}
