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

  const printBoard = () => {
    console.table(board);
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

  return {getBoard, addMark, printBoard, containsSpace};
})();

function createPlayer(name, mark) {
  const getName = () => name;
  const getMark = () => mark;
  return {getName, getMark};
}

const gameController = (function(playerOneName, playerTwoName) {
  const playerOne = createPlayer(playerOneName, 'x');
  const playerTwo = createPlayer(playerTwoName, '○');
  let currentPlayer = playerOne;
  const getCurrentPlayer = () => currentPlayer;
  let isWin = false;

  const changeTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const startNewRound = () => {
    gameboard.printBoard();
    console.log(`${currentPlayer.getName()}'s turn.`)
  };

  const playRound = (row, column) => {
    if(isWin) return;
    if(gameboard.getBoard()[row][column] !== ' '){
      console.log('That space is already marked.');
      return;
    }

    gameboard.addMark(row, column, currentPlayer.getMark());

    if(checkWin(row, column)){
      gameboard.printBoard();
      console.log(`${currentPlayer.getName()} wins.`)
      isWin = true;
    } else if(!gameboard.containsSpace()) {
      gameboard.printBoard();
      console.log('All spaces filled. Game ends in a draw.')
    } else {
    changeTurn();
    startNewRound();
    }
  };

  const checkWin = (row, column) => {
    const board = gameboard.getBoard();

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

  startNewRound();
  return {getCurrentPlayer, playRound};
})('Player one', 'Player two');