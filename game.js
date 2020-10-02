// Assign UI variables
const game = document.querySelector("#game");
const minNum = document.querySelector(".minNum");
const maxNum = document.querySelector(".maxNum");
const inputGuess = document.querySelector("#inputGuess");
const inputMin = document.querySelector("#inputMin");
const inputMax = document.querySelector("#inputMax");
const btnSubmit = document.querySelector(".btnSubmit");
const entries = document.querySelectorAll(".entries");
const warningForGuess = document.querySelector(".warningForGuess");
const warningForSet = document.querySelector(".warningForSet");
// Game values variables
let min = 1;
let max = 10;
let guessesLeft = 3;

// assign what is the max and min numbers
maxNum.textContent = max;
minNum.textContent = min;

// Add the listener to entries
entries.forEach(function (entry) {
  entry.addEventListener("keyup", function setEntries(e) {
    // Hide the resultMessage if it's exists
    hideResultMessage(entry, warningForSet);
    if (!entry.value.match(/^[0-9]+$/)) {
      resultMessage(
        `The value should be an integer number please recheck`,
        "red",
        entry,
        warningForSet
      );
    } else {
      if(!isNaN(parseInt(entries[0].value))) min = parseInt(entries[0].value);
      if(!isNaN(parseInt(entries[1].value))) max = parseInt(entries[1].value);
      
      // assign what is the max and min numbers
      minNum.textContent = min;
      maxNum.textContent = max;
    }
  });
});

// Add the listener to the form
game.addEventListener("submit", (e) => {
  e.preventDefault();
  entries.forEach(function (entry) {
    entry.disabled = true;
  });
  let guesserNumber = parseInt(inputGuess.value);
  // Hide the resultMessage if it's exists
  hideResultMessage(inputGuess, warningForGuess);
  if (btnSubmit.value === "Guess") {
    // validation
    validation(guesserNumber);

  } else {
    window.location.reload();
  }
});

// Create validation function
let validation = (guesserNumber) => {
  if (isNaN(guesserNumber) || guesserNumber < min || guesserNumber > max) {
    resultMessage(
      `Not valid number, the number should be from ${min} to ${max}`,
      "red",
      inputGuess,
      warningForGuess
    );
  } else {
    // check the game
    checkGame(guesserNumber);
  }
}

// Create resultMessage function
let resultMessage = (message, color, input, warning) => {
  warning.textContent = message;
  warning.style.color = color;
  input.style.borderColor = color;
  input.value = "";
};

// Create hideResultMessage
let hideResultMessage = (input, warning) => {
  warning.textContent = "";
  input.style.borderColor = "initial";
};

// Create checkGame function
let checkGame = (guesserNumber) => {
  let winningNum = getRandomNum(min, max);
  // Win case
  if(winningNum === guesserNumber){
    resultMessage(
      `${winningNum} is correct, YOU WIN!`,
      "green",
      inputGuess,
      warningForGuess
    );
    playAgain();
  }

  // Loss case
  if(winningNum !== guesserNumber){
    guessesLeft -= 1;
    resultMessage(
      `${guesserNumber} is not correct, ${guessesLeft} guesses left`,
      "red",
      inputGuess,
      warningForGuess
    );
    if(guessesLeft === 0){
      resultMessage(
        `Game Over, you lost. The correct number was ${winningNum}`,
        "red",
        inputGuess,
        warningForGuess
      );
      playAgain();
    }
  }
}

// Create playAgain function
let playAgain = ()=>{
  inputGuess.disabled = true;
  btnSubmit.className += "btn-danger";
  btnSubmit.value = 'Play Again';
}

// Create getRandomNum function
function getRandomNum (min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}