const table = document.querySelector('.cards');
const startButton = document.querySelector('.start-btn');
const settingsButton = document.querySelector('.settings-btn');
const modal = document.getElementById('settingsModal');
const closeModal = document.getElementById('closeModal');
const applySettings = document.getElementById('applySettings');
const timerElement = document.querySelector('.timer');

const smallValueSize = {
    values: ['js', 'js', 'html', 'html', 'css', 'css', 'php', 'php', 'python', 'python', 'java', 'java', 'csharp', 'csharp', 'cplus', 'cplus'],
    rows: 4,
    cols: 4,
    time: 180
};
const mediumValueSize = {
    values: ['js', 'js', 'html', 'html', 'css', 'css', 'php', 'php', 'python', 'python', 'java', 'java', 'csharp', 'csharp', 'cplus', 'cplus', 'postman', 'postman', 'docker', 'docker'],
    rows: 4,
    cols: 5,
    time: 120
};
const bigValueSize = {
    values: ['js', 'js', 'html', 'html', 'css', 'css', 'php', 'php', 'python', 'python', 'java', 'java', 'csharp', 'csharp', 'cplus', 'cplus', 'postman', 'postman', 'docker', 'docker', 'ruby', 'ruby', 'rust', 'rust'],
    rows: 4,
    cols: 6,
    time: 60
};

let firstCard = null;
let secondCard = null;
let lock = false;
let timerInterval = null;




settingsButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

applySettings.addEventListener('click', () => {
    const gridSize = document.getElementById('gridSize').value;
    const difficulty = document.getElementById('difficulty').value;

    let values, rows, cols;

    if (gridSize === 'small') {
        values = smallValueSize.values;
        rows = smallValueSize.rows;
        cols = smallValueSize.cols;
    } else if (gridSize === 'medium') {
        values = mediumValueSize.values;
        rows = mediumValueSize.rows;
        cols = mediumValueSize.cols;
    } else if (gridSize === 'big') {
        values = bigValueSize.values;
        rows = bigValueSize.rows;
        cols = bigValueSize.cols;
    }

    if (difficulty === 'easy') {
        time = 180;
    } else if (difficulty === 'medium') {
        time = 120;
    } else if (difficulty === 'hard') {
        time = 60;
    }

    clearTable();
    createTable(values, rows, cols, );
    modal.classList.add('hidden');
});


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createTable(values, rows, cols) {
    const shuffled = shuffle([...values]);

    let index = 0;

    for (let i = 0; i < rows; i++) {
        const tr = document.createElement('tr');

        for (let j = 0; j < cols; j++) {
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
    if (lock || card === firstCard) return;

    card.classList.add('flip');

    if (!firstCard) {
        firstCard = card;
    }

    else {
        secondCard = card;
        lock = true;
    }

    checkMatch(firstCard, secondCard);
}

function checkMatch(firstCard, secondCard) {
    if (!firstCard || !secondCard) return;
    if (firstCard.dataset.type === secondCard.dataset.type) {
        reset();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            reset();
        }, 500);
    }
}

function launchTimer(time) {
    let remainingTime = time;

    if (timerInterval) clearInterval(timerInterval);

    timerElement.textContent = remainingTime;

    timerInterval = setInterval(() => {
        remainingTime--;
        timerElement.textContent = remainingTime;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Game Over";
        }
    }, 1000);
}

function clearTable() {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

function reset() {
    firstCard = null;
    secondCard = null;
    lock = false;
}

createTable(smallValueSize.values, smallValueSize.rows, smallValueSize.cols);
launchTimer(smallValueSize.time);