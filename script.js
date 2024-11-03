"use strict";

(function main () {
  const lowRes = 20;
  const highRes = 35;
  
  const tiles = [];
  const gameField = document.querySelector(".game-field");
  let stateWasSaved = false;

  let dim = highRes;
  let history = [];

  for (let i = 0; i < highRes ** 2; ++i) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tiles.push(tile);
  }

  /* event handlers */
  document.querySelector(".low-res-btn")
    .addEventListener("touchend", () => {
      history.length = 0;
      dim = lowRes;
      resetVisited();
      initBoard(dim, tiles, gameField);
    });

  document.querySelector(".high-res-btn")
    .addEventListener("touchend", () => {
      history.length = 0;
      dim = highRes;
      resetVisited();
      initBoard(dim, tiles, gameField);
    });

  document
    .addEventListener("touchmove", (event) => {
      event.preventDefault();  // Prevent scrolling
      const touch = event.touches[0];
      const targetTile = document.elementFromPoint(touch.clientX, touch.clientY);
      if (targetTile && targetTile.classList.contains("tile")) {
        if (!stateWasSaved) {
          saveToHistory(history, dim, tiles);
          stateWasSaved = true;
        }
        targetTile.classList.add("visited");
      }
    }, {passive: false});

  document
    .addEventListener("touchstart", () => stateWasSaved = false);

  document.querySelector(".reset")
    .addEventListener("touchend", () => resetVisited(history));

  document.querySelector(".go-back")
    .addEventListener("touchend", () => loadFromHistory(history, dim, tiles));

})();


function initBoard(dim, tiles, gameField) {
  gameField.innerHTML = "";
  gameField.style.gridTemplateColumns = `repeat(${dim}, 1fr)`;
  gameField.style.gridTemplateRows = `repeat(${dim}, 1fr)`;

  for (let i = 0; i < dim ** 2; ++i) {
    gameField.appendChild(tiles[i]);
  }
}

function resetVisited(history) {
  for (const tile of document.querySelectorAll(".visited")) {
    tile.className = "tile";
  }
  if (history) {
    history.length = 0;
  }
}

function saveToHistory(history, dim, tiles) {
  const drawnTiles = tiles.slice(0, dim ** 2);
  const state = drawnTiles.map(tile => tile.classList.contains("visited"));

  history.push(state);
}

function loadFromHistory(history, dim, tiles) {
  const previousState = history.pop();
  if (!previousState) {
    resetVisited();
  } else {
    for (let i = 0; i < dim ** 2; ++i) {
      tiles[i].className = `tile ${previousState[i] === true ? "visited": ""}`;
    }
  }
}

