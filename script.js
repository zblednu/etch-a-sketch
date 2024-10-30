let fieldDimension = parseInt(prompt("enter the size of the board:"));
fieldDimension = fieldDimension > 0 ? fieldDimension : 10;
fieldDimension = Math.min(...[fieldDimension, 60]);
console.log(fieldDimension);

const gameField = document.querySelector(".gameField");
gameField.style.display = "grid";
gameField.style.gridTemplateColumns = `repeat(${fieldDimension}, 1fr)`;
gameField.style.gridTemplateRows = `repeat(${fieldDimension}, 1fr)`;
gameField.style.gap = "0px";


const drawModeStatus = document.querySelector("#drawModeStatus");
drawModeStatus.style.width = "150px";

let drawMode = false;
function enableDrawMode() {
        drawMode = true;
        drawModeStatus.textContent = `drawing is ${drawMode}`;
        drawModeStatus.style.backgroundColor = "green";
}

function disableDrawMode() {
        drawMode = false;
        drawModeStatus.textContent = `drawing is ${"disabled"}`;
        drawModeStatus.style.backgroundColor = "red";
}

function toggleDrawMode() {
    if (drawMode) {
        disableDrawMode();
    }
    else {
        enableDrawMode();
    }
}


document.addEventListener("mousedown", toggleDrawMode);
document.addEventListener("touchstart", enableDrawMode);
document.addEventListener("touchend", disableDrawMode);

document.addEventListener("touchmove", (e) => {
        if (drawMode) {
            e.preventDefault();  // Prevent scrolling
            const touch = e.touches[0];
            const targetTile = document.elementFromPoint(touch.clientX, touch.clientY);
            if (targetTile && targetTile.classList.contains("tile")) {
                targetTile.classList.add("visited-tile");
            }
        }
});

for (let i = 0; i < fieldDimension ** 2; ++i) {
    const box = document.createElement("div");
    
    box.className = "tile";

    box.addEventListener("mouseover", () => {
        if (drawMode) {
                box.classList.add("visited-tile");
        }
    });


    gameField.appendChild(box);
}

let resetButton = document.createElement("button");
resetButton.textContent = "clean";
resetButton.style.fontSize = "20px";
resetButton.style.width = "60px";
resetButton.onmousedown = (event) => {   
    event.stopPropagation();
    const tiles = document.querySelectorAll(".visited-tile");
    for (const tile of tiles) {
        tile.className = "tile";
    }
};
document.body.appendChild(resetButton);

document.body.addEventListener("mousedown", (event) => {
    event.preventDefault();
});

