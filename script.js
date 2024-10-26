let fieldDimension = Number(prompt("enter the size of the board:"));
fieldDimension = Math.min(...[fieldDimension, 50]);

const gameField = document.querySelector(".gameField");
const margin = 1;
const boxSize = (parseFloat(window.getComputedStyle(gameField).height) - margin * (fieldDimension * 2)) / fieldDimension;

for (let i = 0; i < fieldDimension ** 2; ++i) {
    const box = document.createElement("div");
    
    box.className = "tile";
    box.style.width = boxSize + "px";
    box.style.height = boxSize + "px";
    box.style.margin = margin + "px";
    box.addEventListener("mouseenter", () => {box.classList.add("visited-tile")});

    gameField.appendChild(box);
}

let btn = document.createElement("button");
btn.textContent = "remove it all";
btn.style.fontSize = "20px";
btn.addEventListener("click", () => {   gameField.parentNode.removeChild(gameField);
                                        btn.parentNode.removeChild(btn);
                                    });
document.body.appendChild(btn);

