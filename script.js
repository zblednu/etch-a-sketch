"use strict"

const gameField = document.querySelector(".game-field");

/* BOARD INIT */
const lowResDim = 20;
const highResDim = 35;
document.querySelector(".low-res-btn").addEventListener("click", (event) => {
    event.stopPropagation();
    initBoard(lowResDim);
});

document.querySelector(".high-res-btn").addEventListener("click", (event) => {
    event.stopPropagation();
    initBoard(highResDim);
});

function initBoard(dim) {
    gameField.innerHTML = "";
    gameField.style.gridTemplateColumns = `repeat(${dim}, 1fr)`;
    gameField.style.gridTemplateRows = `repeat(${dim}, 1fr)`;

    for (let i = 0; i < dim ** 2; ++i) {
        const tile = document.createElement("div");
        tile.className = "tile";
        gameField.appendChild(tile);
    }
}

initBoard(lowResDim);

/* DRAWING LOGIC */
document.addEventListener("touchmove", (event) => {
    event.preventDefault();  // Prevent scrolling
    const touch = event.touches[0];
    const targetTile = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetTile && targetTile.classList.contains("tile")) {
            targetTile.classList.add("visited");
    }
}, {passive: false});

document.querySelector(".reset").addEventListener("click", (e) => resetBoard(e));

function resetBoard(e) {
    if (e !== undefined) {
        e.stopPropagation();
    }
    const tiles = document.querySelectorAll(".visited");
    for (const tile of tiles) {
        tile.className = "tile";
    }
}

/* HISTORY */
const history = [];

document.addEventListener("touchstart", (event) => {
    event.stopPropagation();
    saveCurrentState();
});

function saveCurrentState() {
    const currentState = Array.from(document.querySelectorAll(".tile")).map((tile) => tile.classList.contains("visited") ? true : false);
    history.push(currentState);
}

const stepBackBtn = document.querySelector(".go-back");
stepBackBtn.addEventListener("click", loadFromHistory);

function loadFromHistory() {
    const previousState = history.pop();
    if (!previousState) {
        resetBoard();
        return;
    }

    let counter = 0;
    for (const tile of document.querySelectorAll(".tile")) {
            tile.className = `tile ${previousState[counter++] == true ? "visited": ""}`;
    }
}

for (const btn of document.querySelectorAll("button")) {
    btn.addEventListener("touchstart", (event) => {event.stopPropagation()});
}
