let html_answer_zone = document.getElementById("answer_zone");
let html_wrong_guesses = document.getElementById("wrong_guesses");
let html_bad_guess_alert = document.getElementById("bad_guess_alert");
let html_attemptsRemaining = document.getElementById("attempts_remaining");
let html_startButton = document.getElementById("game_start");
let html_sub_header = document.getElementById("sub_header");
let show = "visibility: visible;";
let hide = "visibility: hidden;";
let userInput;


// AUDIO VARIABLES
let ricochet1 = 'assets/sounds/ric_1.mp3';
let ricochet2 = "assets/sounds/ric_2.m4a";
let ricochet3 = "assets/sounds/ric_3.m4a";
let ricochet4 = "assets/sounds/ric_4.m4a";
let horse = "assets/sounds/horse1.m4a";
let noWay = "assets/sounds/no_way_dude.m4a";
let nope = "assets/sounds/nope.m4a";
let somElse = "assets/sounds/something_else.m4a";
let yeehaw = "assets/sounds/yeehaw.m4a";
let huckleberry = "assets/sounds/huckleberry.m4a";

let ricochets = [ricochet1, ricochet2, ricochet3, ricochet4];
let wrongAgainSound = [horse, noWay, nope];
let correctSound = [somElse, yeehaw];

// set a start game button, that might prevent the META issue.
document.getElementById("game_start").onclick = function() {
    game.setGame(); // this initializes the new game
    // game.gameOver = false;
    // game.runGame(); // this is the function that contains the onkey event and game logic
}

let game = {
    // the parts that write to the HTML
    answerZone: [], // WHERE CORRECT ANSWERS ARE WRITTEN TO THE DOM !!! ONLY FOR DOM JUST BEFORE WRITE !!!
    wrongGuesses: [], // WHERE INCORRECT ANSWERS ARE WRITTEN TO THE DOM
    
    // GAMEPLAY VARIABLES
    userInput: "", // PLACEHOLDER FOR OBJECT-WIDE AVAILABLE CURRENT ONKEY ENTRY
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
        let randomPick = this.answers[Math.floor(Math.random()*this.answers.length)];
        this.answerSpace = [];
        this.answerZone = [];
        this.stringToArray(randomPick);
        this.attempts = 9;
        this.wrongGuesses = [];
        html_startButton.style = show;
        html_sub_header.style = show;
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
        // used to set the random answer selection to an array the game can use.
        console.log("string to array before: " + str);
        game.answerSpace = str.toUpperCase().replace(" ", "_").split("");
        console.log(game.answerSpace);
        for (let i = 0 ; i < this.answerSpace.length ; i++) {
            game.answerZone.push("_");
        };

        // console.log("STRING TO ARRAY FIRE: AFTER FUNC: " + game.answerZone);
        // console.log("ANSWER ZONE: " + this.answerZone.length);
        // console.log("ANSWER SPACE: " + this.answerSpace.length);
    },

    analyzeEntry: function(arr, val) {
        if (game.badGuess(val)) { // FIRST CHECK VALIDITY OF ANSWER
            // CREATE ARRAY OF LETTER INDICES TO CHECK AGAINST
            let analyzeIndices = [];
            for(let i = 0; i < arr.length; i++) {
                if (arr[i] === val) {
                    analyzeIndices.push(i);
                }
            };
            console.log("ANALYZE ENTRY: " + analyzeIndices);
            if (analyzeIndices.length !== 0) {
                game.correctGuess(analyzeIndices);
                // new Audio(sound).play();   
            } else {
                game.incorrectGuess(val);
            }
        } else {
            html_bad_guess_alert.textContent = "That ain't even a letter, dude!";
            html_bad_guess_alert.style = show;
        }
        
        // check the user input to match within an updated answer array
        // do not permit and send message for already correct guesses
        // conditional that determines whether to run correctGuess() or incorrectGuess() with input
    },

    correctGuess: function(indices) {
        if (game.alreadyCorrect(game.userInput)) {
            html_bad_guess_alert.textContent = "Ya got that one already, pardner.";
            html_bad_guess_alert.style = show;
        } else {
            for (let i = 0 ; i < indices.length ; i++ ) {
                game.answerZone[indices[i]] = game.userInput;
            }
        }
    },

    incorrectGuess: function(val) {
        if (game.alreadyWrong(val)) {
            html_bad_guess_alert.textContent = "Wrong again, lil' doggie.";
            html_bad_guess_alert.style = show;
            let sound = wrongAgainSound[(Math.floor(Math.random()*wrongAgainSound.length))];
            console.log("SOUNDS: " + sound); 
            new Audio(sound).play();
        } else {
            game.wrongGuesses.push(val.toUpperCase());
            game.attempts --;
            let sound = ricochets[(Math.floor(Math.random()*ricochets.length))];
            console.log("SOUNDS: " + sound); 
            new Audio(sound).play();
        }
    },

    badGuess: function(val) {
        // CHECK THE USER INPUT FOR ALPHA ENTRY, REJECT OTHER
        if (val.length === 1 && val.match(/[a-z]/i)) {
            return true;
        } else {return false;}
    },

    // BOOLEAN CHECK FUNCTIONS FOR ALREADY GUESSED LETTERS
    alreadyCorrect: function(val) {
        return game.answerZone.includes(val);
    },

    alreadyWrong: function(val) {
        return game.wrongGuesses.includes(val);
    },

    // CHECK WIN STATE - A FUNCTION TO RUN AT THE END OF ANALYZE TO DETERMINE A COMPLETE ANSWER, AND ALSO TRIGGER THE GAME OVER STATE.

    gameOverState: function() {
        // IS THE GUESS COUNTER DOWN TO ZERO? ELSE IF PERFECT MATCH? SEND APPROPRIATE FUNCTION
        if (game.attempts == 0) {
            game.failState();
        } else if (game.answerSpace.join(",") == game.answerZone.join(",")) {
            game.successState();
        }
    },

    failState: function() {
        alert("Out of luck, Cowgirl.");
        html_startButton.style = show;
    },

    successState: function() {
        new Audio(huckleberry).play();
        alert("You did it!");
        html_startButton.style = show;
    },

    //--------------------------------------------------------

    // GAME APPLICATION:

    runGame: function() {
        html_startButton.style = hide;
        html_sub_header.style = hide;
        document.onkeyup = function(event) {
            
            // SETTING USER INPUT
            game.userInput = event.key.toUpperCase();
            console.log("userInput set to: " + game.userInput);
            
            // CLEAR ANY ERROR MESSAGES
            html_bad_guess_alert.style = hide;

            // ANALYZE GUESSES
            game.analyzeEntry(game.answerSpace, game.userInput);
        
            // WRITE TO HTML DURING GAMEPLAY
            
            // console.log("wrongGuesses state: " + game.wrongGuesses);
            console.log("ANSWER SPACE: " + game.answerSpace);
            console.log("ANSWER ZONE: " + game.answerZone);
            html_answer_zone.textContent = game.arrayToString(game.answerZone);
            html_wrong_guesses.textContent =  game.arrayToString(game.wrongGuesses);
            html_attemptsRemaining.textContent = game.attempts;
            
            // GAME OVER 
            game.gameOverState();
            
        }
    },
};

// REMAINING PROJECT GOALS:

// ADD A GAME WINNING MESSAGE WHEN CORRECT

// ADD A HANGMAN DRAWING TO PROGRESS THE WRONG GUESSES

// CHANGE ATTEMPT COUNTER TO BULLET HOLES

// TRIGGER RICOCHET AUDIO FOR MISSES, YEEHAWS AND HORSE WHINNEYS AND SUCH FOR CORRECT GUESSES

// EXTRA MILE, RECORD VOICE AUFIO FOR ALERTS AND ERROR MESSAGES