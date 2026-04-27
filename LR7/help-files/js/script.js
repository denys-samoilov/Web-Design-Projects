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

let restartBtn = document.querySelector('.button-restart');
let nextLevelBtn = document.querySelector('.button-next-level');


let score = 0;
let allowShooting = false;
let playerWon = false;
let duelEnded = false;
let level = 1;

startBtn.addEventListener('click', () => {
  startGame();
});

gunman.addEventListener('click', () => {
  playerShootsGunman();
});

restartBtn.addEventListener('click', () => {
  restartGame();
});

nextLevelBtn.addEventListener('click', () => {
  nextLevel();
});

async function startGame() {
    alert('Game started!');
    
    gameMenu.style.opacity = '0';
    gameMenu.style.visibility = 'hidden';
    wrapper.style.opacity = '1';
    wrapper.style.visibility = 'visible';
    gameScreen.style.opacity = '1';
    gameScreen.style.visibility = 'visible';
    gameScreen.classList.add('regular-bg');
    await startLevel1();
      
}

async function startLevel1() {
  alert('Level 1 started!');
  timePanelGunman.textContent = (gunmanTime / 1000).toFixed(2);
  timePanelYou.textContent = (playerTime / 1000).toFixed(2);
  
  await moveGunman();
  await prepareForDuel();
}

async function moveGunman() {
  gunman.classList.add('gunman-level-' + level);

  gunman.classList.add('moving');
  await wait(5000);
  gunman.classList.remove('moving');
  gunman.classList.add('standing');
  await wait(1000);
}

async function prepareForDuel() {
  console.log('Prepare for duel!');

  gunman.classList.remove('standing');
  gunman.classList.add('gunman-level-' + level + '__shooting');
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

async function gunmanShootsPlayer() {
  if (duelEnded) return;

  console.log('Gunman shoots player!');
  gunman.classList.add('gunman-level-' + level + '__shooting');
  gunman.classList.remove('gunman-level-' + level + '__death');
  gunman.classList.remove('gunman-level-' + level + '__walk');
  gunman.classList.remove('moving');
  gunman.style.left = gunman.offsetLeft + 'px';
  message.classList.remove('message--fire');
  message.classList.add('message--dead');
  gameScreen.classList.remove('regular-bg');
  gameScreen.classList.add('lose-bg');

  playerWon = false;
  duelEnded = true;

  await wait(3000);
  restartGame();
}

function playerShootsGunman() {
  if (duelEnded) return;

  if (allowShooting) {
    console.log('Player shoots gunman!');
    gunman.classList.remove('gunman-level-' + level + '__shooting');
    gunman.classList.add('gunman-level-' + level + '__death');
    message.classList.remove('message--fire');
    message.classList.add('message--win');
    
    playerWon = true;
    duelEnded = true;

    scoreCount();
    restartBtn.style.display = 'block';
    nextLevelBtn.style.display = 'block';    
  } 

  else {
    gunmanShootsPlayer();
  }
}

function scoreCount() {
  let timeDifference = gunmanTime - playerTime;

  score += timeDifference * 10;
  scorePanel.textContent = "Score: " + score;
}

function restartGame() {
  location.reload();
}

async function nextLevel() {
  alert('Next level coming soon!');
  level++;
  switch(level) {
    case 2:
      gunmanTime = 1000;
      await startLevel2();
      break;
    case 3:
      gunmanTime = 800;
      await startLevel3();
      break;
    default:
      alert('No more levels available!');
      return;
  }
}

async function resetState() {
  duelEnded = false;
  allowShooting = false;
  playerWon = false;
  playerTime = 0;

  message.classList.remove('message--win', 'message--dead', 'message--fire');

  gunman.classList.remove(
    'gunman-level-1__death',
    'gunman-level-2__death',
    'gunman-level-1__shooting',
    'gunman-level-2__shooting',
    'standing',
    'moving'
  );

  gameScreen.classList.remove('lose-bg', 'win-bg');
  gameScreen.classList.add('regular-bg');

  restartBtn.style.display = 'none';
  nextLevelBtn.style.display = 'none';
}

async function startLevel2() {
  resetState();
  gunman.classList.remove('gunman-level-1');
  gunman.classList.add('gunman-level-2');
  gunman.style.left = '';
  gunman.classList.remove('moving');
  await wait(50);
  timePanelGunman.textContent = (gunmanTime / 1000).toFixed(2);
  timePanelYou.textContent = (playerTime / 1000).toFixed(2);

  await moveGunman();
  await prepareForDuel();
}
