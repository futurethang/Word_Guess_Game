let game = {
    // GAME CONDITION OPERATORS
    gameOver: true,
    gameWon: false,

    answers: [
        "Wyatt Earp",
        "Billy the Kid",
        "Buffalo Bill",
        "Butch Cassidy",
        "Bill Pickett",
        "Dalton Gang",
        "Doc Holliday",
        "TESTING TESTING"
    ],

    setGame: function(input) {
        this.answerZone = [];
        let randomPick = this.answers[Math.floor(Math.random()*this.answers.length)];
        return randomPick;
        // randomly select string from "answers" array;
        // convert string to array;
    },

    analyzeEntry: function(input) {
        // check the user input to match within an updated answer array
        // do not permit and send message for already correct guesses
        // conditional that determines whether to run correctGuess() or incorrectGuess() with input
    },

    correctGuess: function() {
        // what to do when the guess is right. write to the answeZone
        // called from analyzeEntry()
    },

    incorrectGuess: function() {
        // what to do when the answer is wrong
        // called from analyzeEntry()
    },

    //TEST FUNCTIONS
    testFunc1: function() {
        return "this is a test";
    },

    testFunc2: function() {
        return 1234;
    },

    // TEXT FORMATTING FUNCTIONS:
    "arrayToString" : function() {
        //can convert any array to a display string, both answers and guesses
    },

    "stringToArray" : function() {
        // used to set the random answer selection to an array the game can use
    },

    // the parts that write to the HTML
    "answerZone" : [],
    "wrongGuesses" : [],
    "attempts" : 13,

    // GAMEPLAY VARIABLES
    "newGuess" : "", //onkey event
}

let html_answer_zone = document.getElementById("answer_zone");
let html_wrong_guesses = document.getElementById("wrong_guesses");
let html_attemptsRemaining = document.getElementById("attempts_remaining");
let html_startButton = document.getElementById("game_start");

alert("javascrip loaded");

// set a start game button, that might prevent the META issue.
document.getElementById("game_start").onclick = function() {
    game.setGame(); // this initializes the new game
    game.gameOver = false;
    game.runGame(); // this is the function that contains the onkey event and game logic
}

//CONTAIN INSIDE A WHILE LOOP TO CONTROL GAME START AND END TRIGGERED BY GAME STATE BOOLEAN

while (game.gameOver === false) {
    // run the game until GAMEOVER fires on a win or a loss
    // then pause and bring back a GAME RESET button
}

document.onkeyup = function(event) {
    html_startButton.style = "visibility: hidden;";
    
    // SETTING USER INPUT
    let userInput = event.key;
    game.newGuess = userInput
    console.log("newGuess set to: " + game.newGuess);

    //CORRECT GUESSES
    // writing to answerZone - update to run function to check for correct
    game.analyzeEntry(userInput);

    // COUNTER
    // for each onkeyup guess that is WRONG, iterate down
    // add conditional to increment only for incorrect guesses
    game.attempts--;


    // GAME OVER 
    if (game.attempts == 0) {
        game.gameOver = true;
        // write a "Game Over" message tot he screen and prompt a new game
    }

    // WRITE TO HTML DURING GAMEPLAY
    html_wrong_guesses.textContent = game.answerZone; // change to format not as an array
    // html_attemptsRemaining.textContent = game.attempts; 
    game.answerZone.push(userInput.toUpperCase());
    console.log("answerZone state: " + game.answerZone);
    let test = game.setGame();
    html_attemptsRemaining.textContent = test; 

}