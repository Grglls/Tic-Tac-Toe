/*----- constants -----*/
const players = {
    '1': 'X',
    '-1': 'O',
    '0': '',
};



/*----- state variables -----*/
const state = {
    board: null,
    turn: null,
    winner: null,
    movesMade: null,
};



/*----- cached elements  -----*/
const elements = {
    message: document.querySelector('H1'),
    playAgain: document.querySelector('button'),
    squares: document.querySelectorAll('div'),
}



/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleClick)



/*----- functions -----*/
init();
elements.playAgain.addEventListener('click', init);

function init() {
    //Visualise the board:
    state.board = [
        ['','',''], //Row 0
        ['','',''], //Row 1
        ['','',''], //Row 2
    ]
    state.turn = 1;
    state.winner = null;
    state.movesMade = 0;
    render();
}

function handleClick (event) {

    //Check if the sqaure is occupied:
    if (event.target.innerText !== '') {
        return;
    }

    //Find the index number (as a 1D array):
    const index = [...elements.squares].indexOf(event.target);


    //Find the column and row indices from the 1D index:
    const columnIndex = index % 3;
    const rowIndex = (index - columnIndex)/3;


    //Cache the row and column from the board array:
    const row = state.board[rowIndex];

    
    //Assign the spot to the current player:
    row[columnIndex] = players[state.turn];

    
    //Create a new array to store the state of the current column.
    const column = [state.board[0][columnIndex], state.board[1][columnIndex], state.board[2][columnIndex]]; 


    //Change who's turn it is:
    state.turn *= -1;


    //Check for winner:
    state.winner = checkWinner(row, column);

    //Tally number of turns:
    state.movesMade++;

    //Run render():
    render();
}

function checkWinner(row, column) {
    return (checkHorizontal(row) ||
    checkVertical(column) ||
    checkDiagonalLowerLeftToUpperRight() ||
    checkDiagonalUpperLeftToLowerRight()
    )
}

function checkHorizontal(row) {
    return (row[0] === row[1] && row[0] === row[2]) ? row[0] : null;
}

function checkVertical(column) {
    return (column[0] === column[1] && column[0] === column[2]) ? column[0] : null;
}

function checkDiagonalLowerLeftToUpperRight() {
    return (state.board[2][0] === state.board[1][1] && state.board[2][0] === state.board[0][2]) ? state.board[0][2] : null;
}

function checkDiagonalUpperLeftToLowerRight() {
    return (state.board[0][0] === state.board[1][1] && state.board[0][0] === state.board[2][2]) ? state.board[0][0] : null;
}

function render() {
    renderBoard();
    renderMessage();
}

function renderBoard() {
    state.board.forEach((row, rowIndex) => {
        row.forEach((letter, columnIndex) => {
            const id = `c${ columnIndex }r${ rowIndex }`;
            const spot = document.getElementById(id);
            spot.innerText = state.board[rowIndex][columnIndex];
        });
    });
}

function renderMessage() {
    //Show winner or tie or who's turn:
    if (state.winner === null && state.movesMade === 9) {
        elements.message.innerText = `It's a Tie!`;
    } else if (state.winner) {
        elements.message.innerText = `${ state.winner } wins!`;
    } else {
        elements.message.innerText = `${ players[state.turn] }'s Turn`;
    }
}