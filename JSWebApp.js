var graveyardList = [] // Global variable
var inAnswer = [] // Words in the final answer
var users = [
    {name: "Bob", wins: 22},
    {name: "Joe", wins: 60},
    {name: "Kat", wins: 49}
];  // List of users and their number of wins
var lives = 6
const answer = "hangman"    // The answer for the game

window.onload = lifeCount(lives)

function newGame() {
    // Resets the game
    //graveyardList = []
    //inAnswer = []
    //document.getElementById("graveyard").innerHTML = graveyardList;
    //document.getElementById("lettersInAnswer").innerHTML = inAnswer;
    //document.getElementById("winLose").innerHTML = "";
    //document.getElementById("answer").innerHTML = "";
    window.location.reload();
}

function lifeCount(count) {
    if (lives >= 0) {
        document.getElementById("lives").innerHTML = "Lives Left: " + lives;
    }
    else {
        document.getElementById("lives").innerHTML = "You lose";
        document.getElementById("userGuess").innerHTML = "Click new game to try again!"
        document.getElementById("winLose").innerHTML = "You lose";
        document.getElementById("answer").innerHTML = "The word was: " + answer;
        //newGame()

    }
}

function userGuess() {
    var guess = document.getElementById("letter").value.toLowerCase();
    var len = guess.length;
    var contains = graveyardList.includes(guess);
    var answerContains = answer.split("").includes(guess);
    var err = "This isn't a letter";
    var err2 = "You've already guessed this letter"

    if (len != 1) { // Gives an error if the guess is multiple letters
        alert(err);
    }
    else {
        
        if (!contains) {    // Gives an error if the letter was already guessed

            graveyardList.push(guess); // Puts guess in the array
            document.getElementById("graveyard").innerHTML = graveyardList;

            // If guess is in the answer: no lives lost
            // Else: life lost

            if (answerContains) {
                inAnswer.push(guess)
                document.getElementById("lettersInAnswer").innerHTML = inAnswer;
            }
            else {
                lives = lives - 1; // Counts down the user's lives
                lifeCount(lives);
            }

            if (answer.split("").every(ai => graveyardList.includes(ai))) {
                document.getElementById("winLose").innerHTML = "YOU WIN"
                document.getElementById("answer").innerHTML = "The word was: " + answer;
                saveScore()
                displayTop()
                //newGame()               
            }       
        }
        else{
            alert(err2)
        }
    }
}

function saveScore() { 
    var promptName = window.prompt("You won! Enter you're name for the high score list");
    var account = users.find(acc => acc.name === promptName);
    
    if (account) {
        account.wins = account.wins + 1;
        console.log(account.wins);
    }
    else {
        users.push({name: promptName, wins: 1});
        console.log(users);
    }
}

function displayTop() {
    temp = 0
    topName = ""
    for (const user of users) {
        //console.log(user.wins)
        if (temp < user.wins) {
            temp = user.wins;
            topName = user.name;
        }
    }
    document.getElementById("winLose").innerHTML = "Top player is: " + topName + " with " + temp + " wins!" 
}
