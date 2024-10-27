let fieldDimension = parseInt(prompt("enter the size of the board:"));
fieldDimension = fieldDimension > 0 ? fieldDimension : 10;
fieldDimension = Math.min(...[fieldDimension, 60]);
console.log(fieldDimension);

const gameField = document.querySelector(".gameField");
gameField.style.display = "grid";
gameField.style.gridTemplateColumns = `repeat(${fieldDimension}, 1fr)`;
gameField.style.gridTemplateRows = `repeat(${fieldDimension}, 1fr)`;
gameField.style.gap = "0px";


let isLeftButtonPressed = false;
document.addEventListener("mouseup", () => {
    isLeftButtonPressed = false;
});
document.addEventListener("touchend", () => {
    isLeftButtonPressed = false;
});
document.addEventListener("mousedown", () => {
        isLeftButtonPressed = true;
});
document.addEventListener("touchstart", () => {
        isLeftButtonPressed = true;
});

for (let i = 0; i < fieldDimension ** 2; ++i) {
    const box = document.createElement("div");
    
    box.className = "tile";

    box.addEventListener("mousemove", () => {
        if (isLeftButtonPressed) {
                box.classList.add("visited-tile");
        }
    });
    box.addEventListener("touchmove", () => {
        if (isLeftButtonPressed) {
                box.classList.add("visited-tile");
        }
    });

    gameField.appendChild(box);
}

let btn = document.createElement("button");
btn.textContent = "clean";
btn.style.fontSize = "20px";
btn.onmousedown = () => {   
    const tiles = document.querySelectorAll(".visited-tile");
    for (const tile of tiles) {
        tile.className = "tile";
    }
};
document.body.appendChild(btn);

document.body.addEventListener("mousedown", (event) => {
    event.preventDefault();
});

