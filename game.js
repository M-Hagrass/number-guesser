// Assign UI variables
const game = document.querySelector("#game"),
      minNum = document.querySelector(".minNum"),
      maxNum = document.querySelector(".maxNum"),
      inputGuess = document.querySelector("#inputGuess"),
      btnSubmit = document.querySelector(".btnSubmit"),
      results = document.querySelector(".results");
// Game values variables
let winningNum = 5,
  min = 1;
    (max = 10), (guessesLeft = 3);

// assign what is the max and min numbers
maxNum.textContent = max;
minNum.textContent = min;

// Add the listener to the form
game.addEventListener("submit", (e) => {
  e.preventDefault();
  let guesserNumber = parseInt(inputGuess.value);
  // Hide the resultMessage if it's exists
  hideResultMessage();
  if (btnSubmit.value === "Guess") {
    // validation
    validation(guesserNumber);

  } else {
    window.location.reload();
  }
});

// Create validation function
let validation = (guesserNumber) => {
  if (isNaN(guesserNumber) || guesserNumber < 1 || guesserNumber > 10) {
    resultMessage(
      `Not valid number, the number should be from ${min} to ${max}`,
      "red"
    );
  } else {
    // check the game
    checkGame(guesserNumber);
    console.log("FALSE");
  }
};

// Create resultMessage function
let resultMessage = (message, color) => {
  results.textContent = message;
  results.style.color = color;
  inputGuess.style.borderColor = color;
};

// Create hideResultMessage
let hideResultMessage = () => {
  results.textContent = "";
  inputGuess.style.borderColor = "initial";
};

// Create checkGame function
let checkGame = (guesserNumber) => {
  // Win case
  if(winningNum === guesserNumber){
    resultMessage(`${winningNum} is correct, YOU WIN!`, 'green');
    playAgain();
  }

  // Loss case
  if(winningNum !== guesserNumber){
    guessesLeft -= 1;
    resultMessage(`${guesserNumber} is not correct, ${guessesLeft} guesses left`, 'red');
    if(guessesLeft === 0){
      resultMessage(`Game Over, you lost. The correct number was ${winningNum}`, 'red');
      playAgain();
    }
  }
}

// Create playAgain function
let playAgain = ()=>{
  inputGuess.disabled = true;
  btnSubmit.value = 'Play Again';
}