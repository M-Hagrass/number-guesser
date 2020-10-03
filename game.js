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
inputMin.value = min;
inputMax.value = max;

// assign and show what is the max and min numbers on the screen
maxNum.textContent = max;
minNum.textContent = min;

// Add the listener to set manually minimum and the maximum numbers
entries.forEach((entry) => {
  entry.addEventListener("focusout", function setEntries(e) {
    // Get the value from 'input from'
    let inputFrom = parseInt(entries[0].value);
    // Get the value from 'input to'
    let inputTo = parseInt(entries[1].value);
    if (!entry.value.match(/^[0-9]+$/) || inputFrom === inputTo) {
      resultMessage(
        `The values should be an integer number,<br>Not equal each other or empty so please recheck`,
        "red",
        entry,
        warningForSet
      );
    } else {
      if (!isNaN(inputFrom)) {
        min = inputFrom;
        hideResultMessage(entry, false);
      }
      if (!isNaN(inputTo)) {
        max = inputTo;
        hideResultMessage(entry, false);
      } 
      // assign what is the max and min numbers
      minNum.textContent = min;
      maxNum.textContent = max;
      if (!isNaN(inputFrom) && !isNaN(inputTo)) {
        hideResultMessage(entry, warningForSet);
      }
    }
  });
});

// Add the listener to check the Guess
game.addEventListener("submit", (e) => {
  e.preventDefault();
  entries.forEach(function (entry) {
    // Hide warningForSet if it's exists
    hideResultMessage(entry, warningForSet)
    entry.disabled = true;
    inputMin.value = min;
    inputMax.value = max;
  });
  let guesserNumber = parseInt(inputGuess.value);
  // Hide the warningForGuess if it's exists
  hideResultMessage(inputGuess, warningForGuess);
  if (btnSubmit.value === "Guess") {
    // Start validations
    validation(guesserNumber);

  } else {
    // play the game again
    window.location.reload();
  }
});

// Create validation function
let validation = (guesserNumber) => {
  if (isNaN(guesserNumber) || guesserNumber < Math.min(min, max) || guesserNumber > Math.max(min, max)) {
    resultMessage(
      `Not valid numbers, the numbers should be in range (${min} - ${max})`,
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
  warning.innerHTML = message;
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