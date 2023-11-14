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

  return {getBoard, addMark, printBoard};
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
    changeTurn();
    startNewRound();
  };

  startNewRound();
  return {getCurrentPlayer, playRound};
})('Player one', 'Player two');

gameController.playRound(0, 0);
gameController.playRound(0, 1);