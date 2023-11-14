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
    bool = true
    board.forEach((row) => {
      bool = row.includes(' ');
    });
    return bool;
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

  const changeTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const startNewRound = () => {
    gameboard.printBoard();
    console.log(`${currentPlayer.getName()}'s turn.`)
  };

  const playRound = (row, column) => {
    if(gameboard.getBoard()[row][column] !== ' '){
      console.log('That space is already marked.');
      return;
    }

    gameboard.addMark(row, column, currentPlayer.getMark());

    if(checkWinConditions(row, column)){
      gameboard.printBoard();
      console.log(`${currentPlayer.getName()} wins.`)
    } else if(!gameboard.containsSpace()) {
      gameboard.printBoard();
      console.log('All spaces filled. Game ends in a draw.')
    } else {
    changeTurn();
    startNewRound();
    }
  };

  const checkWinConditions = (row, column) => {

  };

  startNewRound();
  return {getCurrentPlayer, playRound};
})('Player one', 'Player two');

gameController.playRound(0, 0);
gameController.playRound(0, 1);
gameController.playRound(0, 2);
gameController.playRound(1, 0);
gameController.playRound(1, 1);
gameController.playRound(1, 2);
gameController.playRound(2, 0);
gameController.playRound(2, 1);
gameController.playRound(2, 2);