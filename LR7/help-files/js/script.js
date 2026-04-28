'use strict';


let levelConfigs = {
  1: { time: 1400, gunmanClass: 'gunman-level-1' },
  2: { time: 1000, gunmanClass: 'gunman-level-2' },
  3: { time: 800,  gunmanClass: 'gunman-level-3' }
};

let sfx = {
  death: new Audio('sfx/death.m4a'),
  fire: new Audio('sfx/fire.m4a'),
  foul: new Audio('sfx/foul.m4a'),
  intro: new Audio('sfx/intro.m4a'),
  shot: new Audio('sfx/shot.m4a'),
  wait: new Audio('sfx/wait.m4a'),
  win: new Audio('sfx/win.m4a'),
};

let gunmanTime = 1400; 
let playerTime = 0;
let score = 0;
let allowShooting = false;
let playerWon = false;
let duelEnded = false;
let level = 1;

let wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let getGunmanLevelClass = (level) => `gunman-level-${level}`;
let getGunmanShootClass = (level) => `gunman-level-${level}__shooting`;
let getGunmanDeathClass = (level) => `gunman-level-${level}__death`;

let gameMenu = document.querySelector('.game-menu');
let startBtn = document.querySelector('.button-start-game');

let wrapper = document.querySelector('.wrapper');
let gameScreen = document.querySelector('.game-screen');

let timePanelGunman = document.querySelector('.time-panel__gunman');
let timePanelYou = document.querySelector('.time-panel__you');
let scorePanel = document.querySelector('.score-panel__score');
let levelPanel = document.querySelector('.score-panel__level');

let gunman = document.querySelector('.gunman');
let message = document.querySelector('.message');

let restartBtn = document.querySelector('.button-restart');
let nextLevelBtn = document.querySelector('.button-next-level');



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
    await startLevel(1);
      
}

async function startLevel(levelNum) {
  const config = levelConfigs[levelNum];
  
  if (!config) {
    alert('Total score: ' + score);
    return restartGame();
  }

  await resetState(); 
  
  level = levelNum;
  gunmanTime = config.time;
  playerTime = 0;

  timePanelGunman.textContent = (gunmanTime / 1000).toFixed(2);
  timePanelYou.textContent = (playerTime / 1000).toFixed(2);

  sfx.intro.play();
  await moveGunman();
  await prepareForDuel();
}

async function moveGunman() {
  gunman.classList.add(getGunmanLevelClass(level));

  gunman.classList.add('moving');
  await wait(5000);
  gunman.classList.remove('moving');
  gunman.classList.add('standing');
  sfx.wait.play();
  await wait(1000);
}

async function prepareForDuel() {
  console.log('Prepare for duel!');
  stopSFX();

  gunman.classList.remove('standing');
  gunman.classList.add(getGunmanShootClass(level));
  message.classList.add('message--fire');
  sfx.fire.play();
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


async function gunmanShootsPlayer() {
  if (duelEnded) return;  
  console.log('Gunman shoots player!');
  gunman.classList.add(getGunmanShootClass(level));
  gunman.classList.remove(getGunmanDeathClass(level));
  gunman.classList.remove('moving');
  gunman.style.left = gunman.offsetLeft + 'px';
  message.classList.remove('message--fire');
  message.classList.add('message--dead');
  gameScreen.classList.remove('regular-bg');
  gameScreen.classList.add('lose-bg');

  playerWon = false;
  duelEnded = true;

  restartGame();
}

async function playerShootsGunman() {
  if (duelEnded) return;
  stopSFX();
  sfx.shot.play();
  if (allowShooting) {
    console.log('Player shoots gunman!');
    gunman.classList.remove(getGunmanShootClass(level));
    gunman.classList.add(getGunmanDeathClass(level));
    message.classList.remove('message--fire');
    message.classList.add('message--win');
    
    playerWon = true;
    duelEnded = true;

    score += scoreCount(gunmanTime, playerTime);
    scorePanel.textContent = "Score: " + score;
    restartBtn.style.display = 'block';
    nextLevelBtn.style.display = 'block';    

    await wait(500);
    sfx.win.play();
  } 

  else {
    gunmanShootsPlayer();
  }
}

function scoreCount(gunmanTime, playerTime) {
  return (gunmanTime - playerTime) * 10;
}

async function restartGame() {
  await wait(1500);
  location.reload();
}

async function nextLevel() {
  levelPanel.textContent = "Level " + (level + 1);
  await startLevel(level + 1);
}

async function resetState() {
  duelEnded = false;
  allowShooting = false;
  playerWon = false;
  playerTime = 0;

  message.classList.remove('message--win', 'message--dead', 'message--fire');

  gunman.classList.remove(
    getGunmanDeathClass(1),
    getGunmanDeathClass(2),
    getGunmanShootClass(1),
    getGunmanShootClass(2),
    'standing',
    'moving'
  );
  gunman.style.left = '';
  gameScreen.classList.remove('lose-bg', 'win-bg');
  gameScreen.classList.add('regular-bg');

  restartBtn.style.display = 'none';
  nextLevelBtn.style.display = 'none';

  await wait(50);
}

function stopSFX() {
  Object.values(sfx).forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
  })}; 