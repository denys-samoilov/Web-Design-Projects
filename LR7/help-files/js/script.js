'use strict';
let playerScore = 0;
let playerLives = 3;
let gunmanLives = 3;
let gameLevel = 1;
let gunmanTime = 1400; 
let playerTime = 0;

let wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let gameMenu = document.querySelector('.game-menu');
let startBtn = document.querySelector('.button-start-game');

let wrapper = document.querySelector('.wrapper');
let gameScreen = document.querySelector('.game-screen');

let timePanelGunman = document.querySelector('.time-panel__gunman');
let timePanelYou = document.querySelector('.time-panel__you');
let scorePanel = document.querySelector('.score-panel__score');

let gunman = document.querySelector('.gunman');
let message = document.querySelector('.message');

let allowShooting = false;
let playerWon = false;
let duelEnded = false;

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

    timePanelGunman.textContent = (gunmanTime / 1000).toFixed(2);
    timePanelYou.textContent = (playerTime / 1000).toFixed(2);

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
  console.log('Prepare for duel!');

  gunman.classList.remove('standing');
  gunman.classList.add('gunman-level-1__shooting');
  message.classList.add('message--fire');

  allowShooting = true;

  let startTime = Date.now();

  while (!duelEnded) {
    let elapsed = Date.now() - startTime;

    timePanelYou.textContent = (elapsed / 1000).toFixed(2);

    playerTime = elapsed;

    if (elapsed >= gunmanTime) {
      timePanelYou.textContent = (gunmanTime / 1000).toFixed(2);
      gunmanShootsPlayer();
      break;
    }

    await wait(16); 
  }


  allowShooting = false;
}

function timeCounter() {

}

function gunmanShootsPlayer() {
  if (duelEnded) return;

  console.log('Gunman shoots player!');
  gunman.classList.add('gunman-level-1__shooting');
  gunman.classList.remove('gunman-level-1__death');
  gunman.classList.remove('gunman-level-1__walk');
  gunman.classList.remove('moving');
  gunman.style.left = gunman.offsetLeft + 'px';
  message.classList.remove('message--fire');
  message.classList.add('message--dead');
  duelEnded = true;
}

function playerShootsGunman() {
  if (duelEnded) return;

  if (allowShooting) {
    console.log('Player shoots gunman!');
    gunman.classList.remove('gunman-level-1__shooting');
    gunman.classList.add('gunman-level-1__death');
    message.classList.remove('message--fire');
    message.classList.add('message--win');

    allowShooting = false;
    playerWon = true;
    duelEnded = true;

    scoreCount();
  } 

  else {
    gunmanShootsPlayer();
  }
}

function scoreCount() {
  let timeDifference = gunmanTime - playerTime;

  let score = timeDifference * 10;
  scorePanel.textContent = "Score: " + score;
}
