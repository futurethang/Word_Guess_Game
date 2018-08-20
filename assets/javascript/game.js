let html_answer_zone = document.getElementById("answer_zone");
let html_wrong_guesses = document.getElementById("wrong_guesses");
let html_attemptsRemaining = document.getElementById("attempts_remaining");
let html_startButton = document.getElementById("game_start");
let button_show = "visibility: visible;";
let button_hide = "visibility: hidden;";
let userInput;

// set a start game button, that might prevent the META issue.
document.getElementById("game_start").onclick = function() {
    game.setGame(); // this initializes the new game
    // game.gameOver = false;
    // game.runGame(); // this is the function that contains the onkey event and game logic
}

let game = {
    // GAME CONDITION OPERATORS
    gameOver: true,
    gameWon: false,

    // the parts that write to the HTML
    answerZone: [],
    wrongGuesses: [],
    attempts: 13,
    answerSpace: [],

    // GAMEPLAY VARIABLES
    newGuess: "", //onkey event
    userInput: "",

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

    runGame: function() {
        html_startButton.style = button_hide;
        console.log(this.gameOver);
        console.log("TESTING RUNGAME FIRE");
        
        // this.gameOver = true;
        
        document.onkeyup = function(event) {
            
            // SETTING USER INPUT
            game.userInput = event.key;
            console.log("newGuess set to: " + game.userInput);
        
            // ANALYZE GUESSES
            // writing to answerZone - update to run function to check for correct
            game.analyzeEntry(game.userInput);
            // Function triggers other functions to handle correct and incorrect cases and set arrays
        
            // COUNTER
            // for each onkeyup guess that is WRONG, iterate down
            // add conditional to increment only for incorrect guesses
            game.attempts--;
            console.log(game.attempts);
        
            // GAME OVER 
            if (game.attempts == 0) {
            game.gameOver = true;
            alert("Yer days are numbered, Cowgirl.");
            game.setGame();
            }
    
            // WRITE TO HTML DURING GAMEPLAY
            html_wrong_guesses.textContent = game.wrongGuesses; // change to format not as an array
            // html_attemptsRemaining.textContent = game.attempts; 
            game.wrongGuesses.push(game.userInput.toUpperCase());
            console.log("wrongGuesses state: " + game.wrongGuesses);
            // let test = game.setGame();
            html_attemptsRemaining.textContent = game.attempts; 
        }
    },

    setGame: function() {
        console.log("SETUP GAME FIRED");
        let randomPick = this.answers[Math.floor(Math.random()*this.answers.length)];
        console.log(this.gameOver);
        this.stringToArray(randomPick);
        this.attempts = 13;
        this.wrongGuesses = [];
        this.gameOver = false;
        html_startButton.style = button_show;
        console.log(this.gameOver);
        console.log(randomPick);
        this.runGame();
    },

    // TEXT FORMATTING FUNCTIONS:
    arrayToString: function() {
        //can convert any array to a display string, both answers and guesses
    },

    stringToArray: function(str) {
        // used to set the random answer selection to an array the game can use
        console.log("STRING TO ARRAY FIRE: BEFORE FUNC: " + str);
        console.log("STRING TO ARRAY FIRE: AFTER FUNC: " + str.split(""));
        game.answerZone = str.toUpperCase().split("");
        console.log("ANSWER ZONE: " + this.answerZone);
        console.log("ANSWER SPACE: " + this.answerSpace);
        for (let i = 0 ; i < this.answerZone.length ; i++) {
            console.log(i);
        };
    },
}