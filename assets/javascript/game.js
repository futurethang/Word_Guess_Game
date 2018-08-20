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
    answerZone: [], // WHERE CORRECT ANSWERS ARE WRITTEN TO THE DOM !!! ONLY FOR DOM JUST BEFORE WRITE !!!
    wrongGuesses: [], // WHERE INCORRECT ANSWERS ARE WRITTEN TO THE DOM
    
    // GAMEPLAY VARIABLES
    userInput: "",
    attempts: 13, // ITERATES DOWNWARD TOWARDS GAME OVER TRIGGER
    answerSpace: [], // WHERE THE ARRAY VERSION OF THE COWBOY NAME IS STORED FOR REFERENCE !!! ONLY FOR GAME, NOT FOR DOM !!!

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

    setGame: function() {
        this.answerSpace = [];
        let randomPick = this.answers[Math.floor(Math.random()*this.answers.length)];
        this.stringToArray(randomPick);
        this.attempts = 13;
        this.wrongGuesses = [];
        this.gameOver = false;
        html_startButton.style = button_show;
        html_answer_zone.textContent = game.arrayToString(game.answerZone);
        html_wrong_guesses.textContent =  game.arrayToString(game.wrongGuesses);
        this.runGame();
    },

    // TEXT FORMATTING FUNCTIONS:
    arrayToString: function(arr) {
        //can convert any array to a display string, both answers and guesses
        return arr = arr.join("");
    },

    stringToArray: function(str) {
        // used to set the random answer selection to an array the game can use
        // console.log("STRING TO ARRAY FIRE: BEFORE FUNC: " + str);
        console.log("string to array before: " + str);
        game.answerSpace = str.toUpperCase().split("");
        for (let i = 0 ; i < this.answerSpace.length ; i++) {
            game.answerZone.push("_");
        };

        // console.log("STRING TO ARRAY FIRE: AFTER FUNC: " + game.answerZone);
        // console.log("ANSWER ZONE: " + this.answerZone.length);
        // console.log("ANSWER SPACE: " + this.answerSpace.length);
    },

    analyzeEntry: function(arr, val) {
        // FIRST CHECK VALIDITY OF ANSWER:
        game.badGuess(val);
        // CREATE ARRAY OF LETTER INDICES TO CHECK AGAINST
        let analyzeIndices = [];
        for(let i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                analyzeIndices.push(i);
            } else {game.badGuess(val)}
        };
        console.log("ANALYZE ENTRY: " + analyzeIndices);
        if (analyzeIndices.length !== 0) {
            game.correctGuess(analyzeIndices);   
        } else {
            game.incorrectGuess(val);
        }
        // check the user input to match within an updated answer array
        // do not permit and send message for already correct guesses
        // conditional that determines whether to run correctGuess() or incorrectGuess() with input
    },

    correctGuess: function(indices) {
        // what to do when the guess is right. write to the answeZone
        // called from analyzeEntry()
        for (let i = 0 ; i < indices.length ; i++ ) {
            game.answerZone[indices[i]] = game.userInput;
        }
    },

    incorrectGuess: function() {
        // what to do when the answer is wrong
        // called from analyzeEntry()
        game.wrongGuesses.push(game.userInput.toUpperCase());
        game.attempts --;
    },

    badGuess: function(val) {
        // check the userinput for non-alpha entry
        if (val.length === 1 && val.match(/[a-z]/i)) {
            if (game.alreadyCorrect(val)) {
                //  HTML variable write to hidden alert box
                console.log("This is already correct: " + val);
            } else if (game.alreadyWrong(val)) {
                //  HTML variable write to hidden alert box
                console.log("This is already wrong: " + val);
            }
        } else {console.log("That is not a valid guess: " + val)}
        // check the unser input against alreadyCorrect and send message

        // ELSE check user input against alreadyWrong and send message

        return true;
    },

    // BOOLEAN CHECK FUNCTIONS FOR ALREADY GUESSED LETTERS, BOTH CORRECT AND INCORRECT

    alreadyCorrect: function(val) {
        return game.answerZone.includes(val);
    },

    alreadyWrong: function(val) {
        return game.wrongGuesses.includes(val);
    },

    // CHECK WIN STATE - A FUNCTION TO RUN AT THE END OF ANALYZE TO DETERMINE A COMPLETE ANSWER, AND ALSO TRIGGER THE GAME OVER STATE.

    runGame: function() {
        html_startButton.style = button_hide;
        console.log(this.gameOver);
        console.log("TESTING RUNGAME FIRE");
        
        // this.gameOver = true;
        
        document.onkeyup = function(event) {
            
            // SETTING USER INPUT
            game.userInput = event.key.toUpperCase();
            console.log("userInput set to: " + game.userInput);
        
            // ANALYZE GUESSES
            // writing to answerZone - update to run function to check for correct
            game.analyzeEntry(game.answerSpace, game.userInput);
            // Function triggers other functions to handle correct and incorrect cases and set arrays
        
            // GAME OVER 
            if (game.attempts == 0) {
            game.gameOver = true;
            alert("Yer days are numbered, Cowgirl.");
            game.setGame();
            }
    
            // WRITE TO HTML DURING GAMEPLAY
            
            // html_attemptsRemaining.textContent = game.attempts; 
            console.log("wrongGuesses state: " + game.wrongGuesses);
            console.log("ANSWER SPACE: " + game.answerSpace);
            console.log("ANSWER ZONE: " + game.answerZone);
            html_answer_zone.textContent = game.arrayToString(game.answerZone);
            html_wrong_guesses.textContent =  game.arrayToString(game.wrongGuesses);
            html_attemptsRemaining.textContent = game.attempts; 
        }
    },


}

// REMAINING PROJECT GOALS:

// TRIGGER GAME ACTIVE AND END STATES WITH FULL RESET, MAYBE EVEN A GAME WINS COUNTER WITH DEDICATED RESET

// ADD A GAME WINNING MESSAGE WHEN CORRECT

// IMPROVE VISUAL THEME WITH LAYOUT, COLOR, AND WESTERN THEMES

// ADD GAME HEADING

// ADD A HANGMAN DRAWING TO PROGRESS THE WRONG GUESSES

// SOLVE FOR INELIGIBLE ENTRIES, NON-ALPHAS AND ALREADY GUESSED ALPHAS