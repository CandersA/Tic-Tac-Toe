const boxes = Array.from(document.getElementsByClassName('grid-box'));
const inputO = document.getElementById('player-o');
const inputX = document.getElementById('player-x');
let playerOne;
let playerTwo;

const player = (playerName, marker) => {
  const getName = () => playerName;
  const getMarker = () => marker;
  return { getName, getMarker };
};

const game = (() => {
  const markerArray = [];
  let currentMarker = 'o';

  function switchTurns() {
    if (currentMarker === 'o') {
      currentMarker = 'x';
    } else {
      currentMarker = 'o';
    }
    return currentMarker;
  }

  function addToArray(id) {
    markerArray[id] = currentMarker;
  }

  function checkWinner() {
    console.log(currentMarker);
    if (((markerArray[0] === currentMarker)
        && (markerArray[1] === currentMarker)
        && (markerArray[2] === currentMarker))

        || ((markerArray[3] === currentMarker)
        && (markerArray[4] === currentMarker)
        && (markerArray[5] === currentMarker))

        || ((markerArray[6] === currentMarker)
        && (markerArray[7] === currentMarker)
        && (markerArray[8] === currentMarker))

        || ((markerArray[0] === currentMarker)
        && (markerArray[3] === currentMarker)
        && (markerArray[6] === currentMarker))

        || ((markerArray[1] === currentMarker)
        && (markerArray[4] === currentMarker)
        && (markerArray[7] === currentMarker))

        || ((markerArray[2] === currentMarker)
        && (markerArray[5] === currentMarker)
        && (markerArray[8] === currentMarker))

        || ((markerArray[0] === currentMarker)
        && (markerArray[4] === currentMarker)
        && (markerArray[8] === currentMarker))

        || ((markerArray[2] === currentMarker)
        && (markerArray[4] === currentMarker)
        && (markerArray[6] === currentMarker))) {
      if (currentMarker === 'o') {
        console.log(`${playerOne.getName()} is the winner`);
      } else {
        console.log(`${playerTwo.getName()} is the winner`);
      }
    }
  }

  function logArray() {
    console.log(markerArray);
  }

  return {
    checkWinner, switchTurns, addToArray, logArray, markerArray,
  };
})();

const displayController = (() => {
  const { markerArray } = game;

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

inputO.addEventListener('input', () => {
  playerOne = player(inputO.value, 'o');
  return playerOne;
});

inputX.addEventListener('input', () => {
  playerTwo = player(inputX.value, 'x');
  return playerTwo;
});

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (!box.hasChildNodes()) {
      game.addToArray(box.id - 1);
      game.logArray();
      game.checkWinner();
      game.switchTurns();
      displayController.displayMarker(box);
    }
  });
});
