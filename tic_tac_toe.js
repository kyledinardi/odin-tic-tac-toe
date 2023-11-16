const gameboard = (function() {
  const board = [
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

  return {getBoard, addMark, containsSpace};
})();

function createPlayer(name, mark) {
  const getName = () => name;
  const getMark = () => mark;
  return {getName, getMark};
}

const gameController = (function(playerOneName, playerTwoName) {
  const playerOne = createPlayer(playerOneName, 'X');
  const playerTwo = createPlayer(playerTwoName, 'O');
  let isGameOver = false;
  let currentPlayer = playerOne;
  let message = `${currentPlayer.getName()}'s Turn.`
  const getCurrentPlayer = () => currentPlayer;
  const getMessage = () => message;

  const changeTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
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
  
  return {getCurrentPlayer, getMessage, playRound};
})('Player 1', 'Player 2');

const displayController = (function() {
  const message = document.querySelector('.message');
  const boardDiv = document.querySelector('.board')

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
  }

  function clickHandler(e) {
    const row = e.target.dataset.row;
    const column = e.target.dataset.column;
    
    if(!row || !column) return;

    gameController.playRound(e.target.dataset.row, e.target.dataset.column);
    buildBoard();
  }

  boardDiv.addEventListener('click', clickHandler);
  buildBoard();
})();
