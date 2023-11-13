const gameboard = (function() {
  let boardArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  const getBoard = () => boardArray;
  const boardChange = (index, value) => {
    this.boardArray[index] = value;
  }
  return {getBoard, boardChange};
})();

function createPlayer(name) {
  let score = 0;
  const getName = () => name;
  const getScore = () => score;
  const increaseScore = () => score++;
  return {getName, getScore, increaseScore};
}

const gameController = (function() {
  return {};
})();

const displayController = (function() {
  return {};
})();