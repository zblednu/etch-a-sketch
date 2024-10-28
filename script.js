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

let drawMode = false;
document.addEventListener("mousedown", () => {
        drawMode = !drawMode;
        drawModeStatus.textContent = `drawing is ${drawMode}`;
        if (drawMode) {
            drawModeStatus.style.backgroundColor = "green";
        }
        else {
            drawModeStatus.style.backgroundColor = "red";
        }
});

for (let i = 0; i < fieldDimension ** 2; ++i) {
    const box = document.createElement("div");
    
    box.className = "tile";

    box.addEventListener("mousemove", () => {
        if (drawMode) {
                box.classList.add("visited-tile");
        }
    });

    gameField.appendChild(box);
}

let resetButton = document.createElement("button");
resetButton.textContent = "clean";
resetButton.style.fontSize = "20px";
resetButton.onmousedown = () => {   
    const tiles = document.querySelectorAll(".visited-tile");
    for (const tile of tiles) {
        tile.className = "tile";
    }
};
document.body.appendChild(resetButton);

document.body.addEventListener("mousedown", (event) => {
    event.preventDefault();
});

