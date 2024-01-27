const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const turnInfo = document.getElementById('turn');
const winnerPopup = document.getElementById('winner-popup');
const winnerMessage = document.getElementById('winner-message');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

board.addEventListener('click', handleCellClick);

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (boardState[index] === '' && gameActive) {
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnInfo.textContent = 'Turn: ' + currentPlayer;
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            announceWinner(boardState[a]);
            return;
        }
    }

    if (!boardState.includes('')) {
        announceWinner('It\'s a tie!');
    }
}
function announceWinner(winner) {
    gameActive = false;
    if (winner === 'It\'s a tie!') {
        winnerMessage.textContent = 'It\'s a tie!';
    } else {
        winnerMessage.textContent = winner + ' wins!';
    }
    winnerPopup.style.display = 'block';
}

function startNewGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
    });

    winnerPopup.style.display = 'none';
    turnInfo.textContent = 'Turn: ' + currentPlayer;
}

function resetGame() {
    startNewGame();
}
