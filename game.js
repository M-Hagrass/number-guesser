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
