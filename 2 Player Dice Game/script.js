'use strict';
// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Starting Conditions
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Display
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check for 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});
// Hold The Score Button
btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      current0El.textContent = 0;
      current1El.textContent = 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      switchPlayer();
    }
  }
});
// New Game Button
btnNew.addEventListener('click', init);

// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');
// score = [0, 0];
// currentScore = 0;
// activePlayer = 0;
// playing = true;
// document.querySelector(`.player--0`).classList.remove('player--winner');
// document.querySelector(`.player--1`).classList.remove('player--winner');
// player0El.classList.add('player--active');
// player1El.classList.remove('player--active');
