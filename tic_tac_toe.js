const gameboard = (function() {
  let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];

  const getBoard = () => board;

  const addMark = (row, column, mark) => {
    board[row][column] = mark;
  };

  const containsSpace = () => {
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(board[i][j] === ' '){
          return true;
        }
      }
    }
    return false;
  };

  const resetBoard = () => {
    board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
  };

  return {getBoard, addMark, containsSpace, resetBoard};
})();

function createPlayer(name, mark) {
  const getName = () => name;
  const getMark = () => mark;
  return {getName, getMark};
}

const gameController = (function() {
  let playerOne
  let playerTwo
  let isGameOver
  let currentPlayer
  let message
  const getCurrentPlayer = () => currentPlayer;
  const getMessage = () => message;

  const changeTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const newGame = (playerOneName, playerTwoName) => {
    playerOne = createPlayer(playerOneName, 'X');
    playerTwo = createPlayer(playerTwoName, 'O');
    currentPlayer = playerOne;
    message = `${currentPlayer.getName()}'s Turn.`;
    isGameOver = false;
    gameboard.resetBoard();
  };

  const playRound = (row, column) => {
    if(isGameOver || gameboard.getBoard()[row][column] !== ' ') return;

    gameboard.addMark(row, column, currentPlayer.getMark());

    if(checkWin(row, column)){
      message = `${currentPlayer.getName()} Wins.`;
      isGameOver = true;
    } else if(!gameboard.containsSpace()) {
      message = 'Game Over: Draw.';
      isGameOver = true;
    } else {
    changeTurn();
    message = `${currentPlayer.getName()}'s Turn.`
    }
  };

  const checkWin = (row, column) => {
    const board = gameboard.getBoard();
    row = parseInt(row);
    column = parseInt(column);

    if(
      board[row][column] === board[row][(column + 1) % 3] && 
      board[row][column] === board[row][(column + 2) % 3]
      ) {
      return true;
    }
    if(
      board[row][column] === board[(row + 1) % 3][column] && 
      board[row][column] === board[(row + 2) % 3][column]
      ) {
      return true;
    }
    if(row === column){
      if(board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return true;
      }
    }
    if(row === 2 - column){
      if(board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        return true;
      }
    }
    
    return false;
  };
  
  return {getCurrentPlayer, getMessage, newGame, playRound};
})();

const displayController = (function() {
  const resetBtn = document.querySelector('.reset');
  const message = document.querySelector('.message');
  const boardDiv = document.querySelector('.board');

  const buildBoard = () => {
    boardDiv.textContent = '';
    const board = gameboard.getBoard();
    message.textContent = gameController.getMessage();

    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        const cellBtn = document.createElement('button');
        cellBtn.setAttribute('class', 'cell');
        cellBtn.setAttribute('data-row', i);
        cellBtn.setAttribute('data-column', j);
        cellBtn.textContent = cell;
        boardDiv.appendChild(cellBtn);
      });
    });
  };

  const reset = () => {
    const modal = document.querySelector('.modal');
    const form = document.querySelector('form');
    const cancelBtn = document.querySelector('#cancel-btn')
    const playerOneInput = document.querySelector('#player-one');
    const playerTwoInput = document.querySelector('#player-two');
    modal.showModal();

    cancelBtn.addEventListener('click', () => {
      modal.close();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault
      gameController.newGame(playerOneInput.value, playerTwoInput.value);
      buildBoard();
      playerOneInput.value = '';
      playerTwoInput.value = '';
      message.textContent = gameController.getMessage();
      modal.close();
      e.stopImmediatePropagation();
    });

    buildBoard();
  };

  function clickHandler(e) {
    const row = e.target.dataset.row;
    const column = e.target.dataset.column;
    
    if(!row || !column) return;

    gameController.playRound(e.target.dataset.row, e.target.dataset.column);
    buildBoard();
  }

  resetBtn.addEventListener('click', reset);
  boardDiv.addEventListener('click', clickHandler);
  reset();
})();