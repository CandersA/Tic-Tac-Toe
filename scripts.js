const boxes = Array.from(document.getElementsByClassName('grid-box'));
const inputO = document.getElementById('player-o');
const inputX = document.getElementById('player-x');

const player = (playerName, marker) => {
  const getName = () => playerName;
  const getMarker = () => marker;
  return { getName, getMarker };
};

const gameBoard = (() => {
  const markerArray = [];
  let currentMarker = 'o';

  function switchTurns() {
    if (currentMarker === 'o') {
      currentMarker = 'x';
    } else {
      currentMarker = 'o';
    }
  }

  return {
    addToArray: (id) => {
      markerArray[id] = currentMarker;
    },
    logArray: () => {
      console.log(markerArray);
    },
    switchTurns,
    currentMarker,
    markerArray,
  };
})();

const displayController = (() => {
  const { markerArray } = gameBoard;

  function displayMarker(appendTo) {
    const marker = document.createElement('img');
    if (markerArray[appendTo.id - 1] === 'x') {
      marker.src = 'assets/icons/close.svg';
    } else {
      marker.src = 'assets/icons/circle-outline.svg';
    }
    appendTo.appendChild(marker);
  }

  return { displayMarker };
})();

let playerOne;
let playerTwo;

inputO.addEventListener('input', () => {
  playerOne = player(inputO.value, 'o');
  return playerOne;
});

inputX.addEventListener('input', () => {
  playerTwo = player(inputX.value, 'x');
  return playerTwo;
});

const game = (() => {

})();

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    gameBoard.addToArray(box.id - 1);
    gameBoard.logArray();
    gameBoard.switchTurns();
    displayController.displayMarker(box);
  });
});
