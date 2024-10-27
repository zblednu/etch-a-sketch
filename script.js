let fieldDimension = parseInt(prompt("enter the size of the board:"));
fieldDimension = fieldDimension > 0 ? fieldDimension : 10;
fieldDimension = Math.min(...[fieldDimension, 50]);
console.log(fieldDimension);

const gameField = document.querySelector(".gameField");
gameField.style.display = "grid";
gameField.style.gridTemplateColumns = `repeat(${fieldDimension}, 1fr)`;
gameField.style.gridTemplateRows = `repeat(${fieldDimension}, 1fr)`;
gameField.style.gap = "1px";

for (let i = 0; i < fieldDimension ** 2; ++i) {
    const box = document.createElement("div");
    
    box.className = "tile";
    box.addEventListener("mouseenter", () => {box.classList.add("visited-tile")});

    gameField.appendChild(box);
}

let btn = document.createElement("button");
btn.textContent = "remove it all";
btn.style.fontSize = "20px";
btn.addEventListener("click", () => {   gameField.parentNode.removeChild(gameField);
                                        btn.parentNode.removeChild(btn);
                                    });
