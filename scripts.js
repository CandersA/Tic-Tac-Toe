const boxes = Array.from(document.getElementsByClassName('grid-box'));
const inputO = document.getElementById('player-o');
const inputX = document.getElementById('player-x');
const startBtn = document.getElementById('startbtn');
const displayStatus = document.querySelector('.warn');
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
        displayStatus.textContent = `${playerOne.getName()} is the winner`;
      } else {
        displayStatus.textContent = `${playerTwo.getName()} is the winner`;
      }
      displayStatus.style.fontSize = '20px';
      startBtn.classList.add('resetButton');
      startBtn.textContent = 'Reset';
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

  function activateGame() {
    if (displayController.checkInputO && displayController.checkInputX) {
      startBtn.classList.add('active');
    }
  }

  return {
    displayMarker, activateGame,
  };
})();

startBtn.addEventListener('click', () => {
  if (startBtn.classList.contains('resetButton')) {
    window.location.reload();
  } else if (startBtn.classList.contains('active')) {
    displayStatus.textContent = 'The game has started!';
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
  }
});

inputO.addEventListener('input', () => {
  playerOne = player(inputO.value, 'o');
  displayController.checkInputO = true;
  displayController.activateGame();
  return playerOne;
});

inputX.addEventListener('input', () => {
  playerTwo = player(inputX.value, 'x');
  displayController.checkInputX = true;
  displayController.activateGame();
  return playerTwo;
});
