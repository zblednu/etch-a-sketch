const boxesPerRow = 100;
const boxesPerColumn = 100;

const gameFieldWidth = parseFloat(getComputedStyle(document.body).width);
const boxWidth = gameFieldWidth / boxesPerRow;

const gameFieldHeight= parseFloat(getComputedStyle(document.body).height);
const boxHeight = gameFieldHeight / boxesPerColumn;

for (let i = 0; i < boxesPerRow * boxesPerColumn; i++) {
    const newBox = document.createElement("div");
    newBox.style.boxSizing = "border-box";
    newBox.style.backgroundColor = "grey";
    newBox.style.padding = "10px";

    newBox.style.width = String(boxWidth) + "px";
    newBox.style.height = String(boxHeight) + "px";
    newBox.addEventListener("mouseenter", () => {newBox.style.backgroundColor = "yellow"});

    document.body.appendChild(newBox);
}

