const modal = document.getElementById("modal");
const closeButton = document.getElementById("close-button");

// Open the modal when the page loads
window.addEventListener("load", function () {
  modal.style.display = "block";
});

// Close the modal when the close button is clicked
closeButton.addEventListener("click", function () {
  modal.style.display = "none";
  startFlashing();
});

const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");

const getRandomNumber = () => {
  const number = [one, two, three, four, five, six, seven, eight, nine];
  return number[parseInt(Math.random() * number.length)];
};

let sequence = [
  getRandomNumber(),
  getRandomNumber(),
  getRandomNumber(),
  getRandomNumber(),
];

let sequenceToGuess = [...sequence];

// Regenerate sequence and copy to sequenceToGuess
const restart = async () => {
  sequence = [
    getRandomNumber(),
    getRandomNumber(),
    getRandomNumber(),
    getRandomNumber(),
  ];
  sequenceToGuess = [...sequence];
  startFlashing();
};

const flash = (number) => {
  return new Promise((resolve) => {
    number.className += " active";
    setTimeout(() => {
      number.className = number.className.replace("active", "");
      setTimeout(() => {
        resolve();
      }, 250);
    }, 1000);
  });
};

let canClick = false;
const numberClicked = (numberClicked) => {
  if (!canClick) return;

  const expectedNumber = sequenceToGuess.shift();
  // restart after correctly guessing the whole sequence or
  // incorrectly guessing anything
  if (expectedNumber === numberClicked && sequenceToGuess.length === 0) {
    console.log(sequenceToGuess, sequence);
    message.innerHTML = `correct`;
    sequenceToGuess = sequence;
    updateCorrectAttempts();
    restart();
  } else if (expectedNumber !== numberClicked) {
    message.innerHTML = `wrong`;
    sequenceToGuess = [...sequence];
    updateIncorrectAttempts();
    restart();
  }
};
const startFlashing = async () => {
  canClick = false;
  // make numbers unclickable in css
  for (const number of sequence) {
    await flash(number);
  }
  canClick = true;
};

let attempts = 0;
let correctAttempts = 0;
let incorrectAttempts = 0;

// update attempts
const _updateAttempts = () => {
  attempts++;
  document.getElementById("attempt").innerHTML = attempts;
};

// update correct attempts
const updateCorrectAttempts = () => {
  _updateAttempts();
  correctAttempts++;
  document.getElementById("correctAttempt").innerHTML = correctAttempts;
};

// update incorrect attempts
const updateIncorrectAttempts = () => {
  _updateAttempts();
  incorrectAttempts++;
  document.getElementById("incorrectAttempt").innerHTML = incorrectAttempts;
};