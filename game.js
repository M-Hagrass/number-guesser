// Assign UI variables
const game = document.querySelector("#game"),
  minNum = document.querySelector(".minNum"),
  maxNum = document.querySelector(".maxNum"),
  inputGuess = document.querySelector("#inputGuess"),
  btnSubmit = document.querySelector(".btnSubmit"),
  results = document.querySelector(".results");
// Game values variables
let winningNum = 5,
  max = 10,
  min = 1;
guessesLeft = 3;

// assign what is the max and min numbers
maxNum.textContent = max;
minNum.textContent = min;

// Add the listener to the form
game.addEventListener("submit", (e) => {
  e.preventDefault();
  // Hide the resultMessage if it's exists
  hideResultMessage();
  if (btnSubmit.value === "Guess") {
    // validation
    validation();

  } else {
    window.location.reload();
  }
});

// Create validation function
let validation = () => {
  let guesserNumber = parseInt(inputGuess.value);
  if (isNaN(guesserNumber) || guesserNumber < 1 || guesserNumber > 10) {
    resultMessage(
      `Not valid number, the number should be from ${min} to ${max}`,
      "red"
    );
  } else {
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