'use strict';
let playerScore = 0;
let playerLives = 3;
let gunmanLives = 3;
let gameLevel = 1;
let time = 1400;

let wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let gameMenu = document.querySelector('.game-menu');
let startBtn = document.querySelector('.button-start-game');

let wrapper = document.querySelector('.wrapper');
let gameScreen = document.querySelector('.game-screen');

let gunman = document.querySelector('.gunman');
let message = document.querySelector('.message');

let allowShooting = false;
let playerWon = false;

startBtn.addEventListener('click', () => {
  startGame();
});

gunman.addEventListener('click', () => {
  playerShootsGunman();
});

async function startGame() {
    alert('Game started!');
    
    gameMenu.style.opacity = '0';
    gameMenu.style.visibility = 'hidden';
    wrapper.style.opacity = '1';
    wrapper.style.visibility = 'visible';
    gameScreen.style.opacity = '1';
    gameScreen.style.visibility = 'visible';

    await moveGunman();
  
    await prepareForDuel();  
}


function restartGame() {

}

function nextLevel() {

}

async function moveGunman() {
  gunman.classList.add('gunman-level-1', 'gunman-level-1__walk', 'moving');
  await wait(5000);
  gunman.classList.remove('moving', 'gunman-level-1__walk');
  gunman.classList.add('standing');
  await wait(1000);
}

async function prepareForDuel() {
  gunman.classList.remove('standing');
  gunman.classList.add('gunman-level-1__shooting');
  message.classList.add('message--fire');

  allowShooting = true;

  await wait(time);

  message.classList.remove('message--fire');

  if(!playerWon) {
    gunmanShootsPlayer();
    message.classList.add('message--dead');
  }

  else {
    scoreCount();
    nextLevel();
    message.classList.add('message--win');
  }


}

function timeCounter() {

}

function gunmanShootsPlayer() {

}

function playerShootsGunman() {
  if(allowShooting) {
    console.log('Player shoots gunman!');
    gunman.classList.remove('gunman-level-1__shooting');
    gunman.classList.add('gunman-level-1__death');
    allowShooting = false;
    playerWon = true;
  }

}

function scoreCount() {

}
