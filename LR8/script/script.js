const table = document.querySelector('.cards');
const settingsButton = document.querySelector('.settings-btn');
const modal = document.getElementById('settingsModal');
const closeModal = document.getElementById('closeModal');
const applySettings = document.getElementById('applySettings');
const timerElement = document.querySelector('.timer');
const restartButton = document.querySelector('.restart-btn');
const discardButton = document.querySelector('.discard-btn');
const pvpButton = document.querySelector('.pvp-btn');
const playerInfo = document.querySelector('.player-info');
const pvpRender = document.querySelector('.pvp-render');

const smallValueSize = {
    values: ['js','js','html','html','css','css','php','php','python','python','java','java','csharp','csharp','cplus','cplus'],
    rows: 4,
    cols: 4,
};

const mediumValueSize = {
    values: ['js','js','html','html','css','css','php','php','python','python','java','java','csharp','csharp','cplus','cplus','postman','postman','docker','docker'],
    rows: 4,
    cols: 5,
};

const bigValueSize = {
    values: ['js','js','html','html','css','css','php','php','python','python','java','java','csharp','csharp','cplus','cplus','postman','postman','docker','docker','ruby','ruby','rust','rust'],
    rows: 4,
    cols: 6,
};



let gameOptions = {
    firstCard: null,
    secondCard: null,
    lock: false,
    timerInterval: null,
    turns: 0,

    gridSizeValue: smallValueSize,
    gameTime: 180,
    remainingTime: 180,
    pvpEnabled: false,
    currentPlayer: 1,
    player1: {
        name: "",
        score: 0,
        roundsWon: 0
    },
    player2: {
        name: "",
        score: 0,
        roundsWon: 0
    },

    rounds: 1,
    currentRound: 1,

    roundStats: []
};


restartButton.addEventListener('click', () => {
    restartButton.style.visibility = "hidden";
    gameOptions.currentRound = 1;
    startGame(gameOptions);
});

discardButton.addEventListener('click', () => {
    gameOptions.gridSizeValue = smallValueSize;
    gameOptions.gameTime = 180;
    startGame(gameOptions);
});

pvpButton.addEventListener('click', () => {
    gameOptions.pvpEnabled = true;
    startGame(gameOptions);
});

settingsButton.addEventListener('click', () => modal.classList.remove('hidden'));
closeModal.addEventListener('click', () => modal.classList.add('hidden'));


applySettings.addEventListener('click', () => {
    const gridSize = document.getElementById('gridSize').value;
    const difficulty = document.getElementById('difficulty').value;

    if (gridSize === 'small') gameOptions.gridSizeValue = smallValueSize;
    else if (gridSize === 'medium') gameOptions.gridSizeValue = mediumValueSize;
    else gameOptions.gridSizeValue = bigValueSize;

    if (difficulty === 'easy') gameOptions.gameTime = 180;
    else if (difficulty === 'medium') gameOptions.gameTime = 120;
    else gameOptions.gameTime = 60;

    modal.classList.add('hidden');
    startGame(gameOptions);
});


function shuffle(array) {
    let arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

function createTable(gameOptions) {
    const shuffled = shuffle(gameOptions.gridSizeValue.values);
    let index = 0;

    for (let i = 0; i < gameOptions.gridSizeValue.rows; i++) {
        const tr = document.createElement('tr');

        for (let j = 0; j < gameOptions.gridSizeValue.cols; j++) {
            const td = document.createElement('td');

            const value = shuffled[index++];

            const card = document.createElement('div');
            card.classList.add('flip-container');
            card.dataset.type = value;

            card.innerHTML = `
                <div class="flipper">
                    <div class="front">
                        <img src="images/Black_question_mark.png">
                    </div>
                    <div class="back">
                        <img src="images/${value}.jpeg">
                    </div>
                </div>
            `;

            card.addEventListener('click', () => flipCard(card));

            td.appendChild(card);
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
}


function flipCard(card) {
    if (gameOptions.lock || card === gameOptions.firstCard) return;

    gameOptions.turns++;

    card.classList.add('flip');

    if (!gameOptions.firstCard) {
        gameOptions.firstCard = card;
        return;
    }

    gameOptions.secondCard = card;
    gameOptions.lock = true;

    checkMatch();
    checkWin();
}

function checkMatch() {
    const { firstCard, secondCard } = gameOptions;

    if (!firstCard || !secondCard) return;

    if (firstCard.dataset.type === secondCard.dataset.type) {

        firstCard.style.pointerEvents = "none";
        secondCard.style.pointerEvents = "none";


        if (gameOptions.pvpEnabled) {
            if (gameOptions.currentPlayer === 1)
                gameOptions.player1.score++;
            else
                gameOptions.player2.score++;
            renderPlayer();
        }

        reset();

    } else {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            if (gameOptions.pvpEnabled) {
                gameOptions.currentPlayer =
                    gameOptions.currentPlayer === 1 ? 2 : 1;

                renderPlayer();
            }

            reset();
        }, 500);
    }
}

function reset() {
    gameOptions.firstCard = null;
    gameOptions.secondCard = null;
    gameOptions.lock = false;
}

function resetRound() {
    gameOptions.firstCard = null;
    gameOptions.secondCard = null;
    gameOptions.lock = false;
    gameOptions.turns = 0;
    gameOptions.remainingTime = gameOptions.gameTime;

    gameOptions.currentPlayer = 1;

    gameOptions.player1.score = 0;
    gameOptions.player2.score = 0;
}


function launchTimer() {
    let time = gameOptions.gameTime;
    gameOptions.remainingTime = time;

    if (gameOptions.timerInterval) clearInterval(gameOptions.timerInterval);

    timerElement.textContent = time;

    gameOptions.timerInterval = setInterval(() => {
        gameOptions.remainingTime--;
        timerElement.textContent = gameOptions.remainingTime;

        if (gameOptions.remainingTime <= 0) {
            clearInterval(gameOptions.timerInterval);
            gameOptions.lock = true;
            timerElement.textContent = "Game Over";
            restartButton.style.visibility = "visible";
        }
    }, 1000);
}


function checkWin() {
    const remaining = document.querySelectorAll('.flip-container:not(.flip)');

    if (remaining.length === 0) {
        clearInterval(gameOptions.timerInterval);
        gameOptions.lock = true;



        if (gameOptions.pvpEnabled) {
            const p1 = gameOptions.player1;
            const p2 = gameOptions.player2;
            gameOptions.currentRound++;


            if (p1.score > p2.score) { 
                msg = `${p1.name} wins!`;
                gameOptions.player1.roundsWon++;
            }
            else if (p2.score > p1.score) {
                pvpRender.textContent = `${p2.name} wins!`;
                gameOptions.player2.roundsWon++;
            }
            else pvpRender.textContent = "Draw!";

           if (gameOptions.currentRound <= gameOptions.rounds) {
            setTimeout(() => {
            pvpRender.textContent = `Statistics - ${p1.name}: ${p1.roundsWon} rounds won | ${p2.name}: ${p2.roundsWon} rounds won. Starting round ${gameOptions.currentRound}...`;
            }, 2000);
            setTimeout(() => {
                pvpRender.textContent = "";
                startGame(gameOptions);
            }, 2000);
                return;}

            if (gameOptions.currentRound === gameOptions.rounds + 1) {
                msg += ` Final Score - ${p1.name}: ${p1.roundsWon} | ${p2.name}: ${p2.roundsWon}`;
                startGame(gameOptions);
            }
        } else {
            msg = `You Win! Turns: ${gameOptions.turns} | Time remaining: ${gameOptions.remainingTime}s`;
        }

        timerElement.textContent = msg;
        restartButton.style.visibility = "visible";
    }
}


function renderPlayer() {
    if (!gameOptions.pvpEnabled) return;

    const current = gameOptions.currentPlayer === 1 ? gameOptions.player1 : gameOptions.player2;

    playerInfo.textContent = `Active Player: ${current.name} | Score: ${current.score}`;
}

function startGame(gameOptions) {
    clearTable();

    resetRound(); 

    restartButton.style.visibility = "hidden";

    if (gameOptions.pvpEnabled && gameOptions.currentRound === 1) {
        gameOptions.player1.name = prompt("Enter Player 1's name:");
        gameOptions.player2.name = prompt("Enter Player 2's name:");
        gameOptions.rounds = parseInt(prompt("Enter number of rounds:"));
    }
    

    createTable(gameOptions);
    launchTimer();
    renderPlayer();
}

function clearTable() {
    table.innerHTML = "";
}

startGame(gameOptions);