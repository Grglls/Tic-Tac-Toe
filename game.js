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
        ['','',''], //Row? 0
        ['','',''], //Column 1
        ['','',''], //Column 2
    ]
    state.turn = 1;
    state.winner = null;
    render();
}

function handleClick (event) {
    console.log('click detected');
    console.log(event.target);

    //Check if the sqaure is occupied:
    if (event.target.innerText !== '') {
        console.log('This square is occupied');
        return;
    }

    //Find the index number (as a 1D array):
    const index = [...elements.squares].indexOf(event.target);
    // if (index === -1) {
    //     return; // Exit the function <------------------ is this necessary for this game?
    // }
    console.log(index);

    //Find the column and row indices from the 1D index:
    const columnIndex = index % 3;
    const rowIndex = (index - columnIndex)/3;
    console.log(columnIndex, rowIndex);

    // //Find the column and row indices from the 1D index: BACKUP
    // const columnIndex = index % 3;
    // const rowIndex = (index - columnIndex)/3;
    // console.log(columnIndex, rowIndex);

    //Find the column from the board array:
    const row = state.board[rowIndex];

    //Assign the spot to the current player:
    row[columnIndex] = players[state.turn];
    console.table(state.board);

    //Change who's turn it is:
    state.turn *= -1;

    //Check for winner:
    state.winner = checkWinner();

    //Run render():
    render();
}

function checkWinner() {
    //to be completed:
}

function render() {
    renderBoard();
    // renderMessage();
    // renderControls();
}

function renderBoard() {
    state.board.forEach((row, rowIndex) => {
        row.forEach((letter, columnIndex) => {
            const id = `c${ columnIndex }r${ rowIndex }`;
            console.log(id);
            const spot = document.getElementById(id);
            console.log(spot);
            spot.innerText = state.board[rowIndex][columnIndex];
        });
    });
}

function renderMessage() {
    //to be completed...
}

function renderControls() {
    //to be completed...
}