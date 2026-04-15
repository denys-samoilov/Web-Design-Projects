'use strict';
let playerScore = 0;
let playerLives = 3;
let gunmanLives = 3;
let gameLevel = 1;
let timeCoeff = 300;


let gameMenu = document.querySelector('.game-menu');
let startBtn = document.querySelector('.button-start-game');

let wrapper = document.querySelector('.wrapper');
let gameScreen = document.querySelector('.game-screen');

let gunman = document.querySelector('.gunman');

startBtn.addEventListener('click', () => {
  startGame();
});

function startGame() {
    alert('Game started!');
    gameMenu.style.display = 'none';
    wrapper.style.display = 'block';
    gameScreen.style.display = 'block';
    gunman.classList.add('gunman-level-1');
    gunman.classList.add('gunman-level-1__walk');
}

function restartGame() {

}

function nextLevel() {

}

function moveGunman() {

}

function prepareForDuel() {

}

function timeCounter() {

}

function gunmanShootsPlayer() {

}

function playerShootsGunman() {

}

function scoreCount() {

}
