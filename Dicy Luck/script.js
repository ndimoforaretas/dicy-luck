"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnPass = document.querySelector(".btn--pass");
const throws0El = document.getElementById("throws--0");
const throws1El = document.getElementById("throws--1");
const againMessage = document.querySelector(".message--winner");
const nextMessage = document.querySelector(".message--next");
const overlay = document.querySelector(".overlay");
const okButton = document.getElementById("ok--2");

// Overlay
const showOverlay = function () {
  overlay.classList.remove("hidden");
};
const hideOverlay = function () {
  overlay.classList.add("hidden");
};

// Next Player message
const closeNextMessage = function () {
  nextMessage.classList.add("hidden");
  hideOverlay();
};
const openNextMessage = function () {
  nextMessage.classList.remove("hidden");
  showOverlay();
};

const resetThrowCounter = function () {
  throwsLeft = document.getElementById(
    `throws--${activePlayer}`
  ).textContent = 3;
};

let scores, currentScore, activePlayer, playing, throwsLeft;

// Switching player
const switchPlayer = function () {
  // Add current score to active player Score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  // Displays next player mesage
  openNextMessage();
  // Click of the OK button
  okButton.addEventListener("click", function () {
    closeNextMessage();
  });

  // Check if player's score is >= 100
  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add("hidden");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  }
  // swaps players
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  throwsLeft = 3;
  resetThrowCounter();
};
// Starting conditions

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  throwsLeft = 3;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  throws0El.textContent = 3;
  throws1El.textContent = 3;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
}
init();

// Dice roll functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // Generate a random number between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // Add dice roll to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    //check for rolled 6
    dice === 6 ? throwsLeft++ : throwsLeft--;

    //Updates the throws counter
    document.getElementById(`throws--${activePlayer}`).textContent = throwsLeft;

    if (scores[activePlayer] < 100 && throwsLeft === 0) {
      switchPlayer();
    }
  }
});
// The Pass button
btnPass.addEventListener("click", switchPlayer);

// the new game button
btnNew.addEventListener("click", init);
