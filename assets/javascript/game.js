let game = {
    "answers" : [
        "Wyatt Earp",
        "Billy the Kid",
        "Buffalo Bill",
        "Butch Cassidy",
        "Bill Pickett",
        "Dalton Gang",
        "Doc Holliday"
    ],

    "setGame" : function() {
        // randopmly select string from "answers" array;
        // convert string to array;
    },

    "answerZone" : [],

    "newGuess" : "hold", //onkey event

    "attempts" : 0,

    "wrongGuesses" : [],

}

let html_wrong_guesses = document.getElementById("wrong_guesses");


alert("javascrip loaded");

document.onkeyup = function(event) {
    // setting userInput
    let userInput = event.key;
    game.newGuess = userInput
    console.log("newGuess set to: " + game.newGuess);

    // writing to answerZone   -  update to run function to check for correct, only push to array if incorrect
    game.answerZone.push(userInput.toUpperCase());
    console.log("answerZone state: " + game.answerZone)

    html_wrong_guesses.textContent = game.answerZone; // change to format not as an array

}