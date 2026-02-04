//elements of dom
const drawBtn = document.getElementById("draw-btn");
const eraseBtn = document.getElementById("erase-btn");
const rectangleBtn = document.getElementById("rectangle-btn");
const colorPickerBtn = document.getElementById("picker-btn");
const clearBtn = document.getElementById("clear-btn");
const saveBtn = document.getElementById("save-btn");
const colorPicker = document.getElementById("color-picker");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 380;
canvas.height = 200;


const MODES = {
    DRAW: "draw",
    ERASE: "erase",
    RECTANGLE: "rectangle",
    PICKER: "picker",
};


//canvas variables
let isDrawing = false;
let isLeftButtonMousePressed = false;
let startX, startY;
let lastX = 0;
let lastY = 0;
let currentMode = MODES.DRAW;
let imageData;


//events
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

colorPicker.addEventListener("change", changeColor);
clearBtn.addEventListener("click", clearCanvas);

document.addEventListener("keydown", ({ key }) => {
  isLeftButtonMousePressed = key === "shift";
});

document.addEventListener("keyup", ({ key }) => {
  if (key === "shift") isLeftButtonMousePressed = false;
});

colorPickerBtn.addEventListener("click", () => {
  setMode(MODES.PICKER);
});

rectangleBtn.addEventListener("click", () => {
  setMode(MODES.RECTANGLE);
});

drawBtn.addEventListener("click", () => {
  setMode(MODES.DRAW);
});

eraseBtn.addEventListener("click", () => {
  setMode(MODES.ERASE);
});

saveBtn.addEventListener("click",saveDraw);

function startDrawing(event) {
  isDrawing = true;
  const { offsetX, offsetY } = event;
  [startX, startY] = [offsetX, offsetY];
  [lastX, lastY] = [offsetX, offsetY];
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function draw(event) {
  if (!isDrawing) return;
  const { offsetX, offsetY } = event;
  if (currentMode === MODES.DRAW || currentMode === MODES.ERASE) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
    [lastX, lastY] = [offsetX, offsetY];
    return;
  }
  if (currentMode === MODES.RECTANGLE) {
    ctx.putImageData(imageData, 0, 0);
    let width = offsetX - startX;
    let height = offsetY - startY;

    if (isLeftButtonMousePressed) {
        const sideLength=Math.min(Math.abs(width),Math.abs(height));

        width=width>0?sideLength:-sideLength;
        height=height>0?sideLength:-sideLength;
    }

    ctx.beginPath();
    ctx.rect(startX, startY, width, height);
    ctx.stroke();
    ctx.closePath();
    return;
  }
}

function stopDrawing() {
  isDrawing = false;
  ctx.closePath();
}

function changeColor() {
  const { value } = colorPicker;
  ctx.strokeStyle = value;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDraw() {
    ctx.globalCompositeOperation='destination-over';
    ctx.fillStyle='white';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    const link=document.createElement('a');
    link.href=canvas.toDataURL();
    link.download='draw.png';
    link.click();
}

async function setMode(newmode) {
    currentMode = newmode;
    ctx.lineWidth=2;
    const { value } = colorPicker;
    ctx.strokeStyle = value;
    canvas.style.cursor =
      currentMode === MODES.ERASE
        ? "url(./assets/erase.png), auto"
        : "url(./assets/point.png), auto";

    if (currentMode === MODES.DRAW) {
      drawBtn.classList.add("active");
      eraseBtn.classList.remove("active");
      rectangleBtn.classList.remove("active");
      colorPickerBtn.classList.remove("active");
      return;
    }
    
    if (currentMode === MODES.ERASE) {
      drawBtn.classList.remove("active");
      eraseBtn.classList.add("active");
      rectangleBtn.classList.remove("active");
      colorPickerBtn.classList.remove("active");
      ctx.lineWidth=5;
      ctx.strokeStyle = "white";
      return;
    } 
    
    if (currentMode === MODES.RECTANGLE) {
      drawBtn.classList.remove("active");
      eraseBtn.classList.remove("active");
      rectangleBtn.classList.add("active");
      colorPickerBtn.classList.remove("active");
      return;
    }
    
    if (currentMode === MODES.PICKER) {
      drawBtn.classList.remove("active");
      eraseBtn.classList.remove("active");
      rectangleBtn.classList.remove("active");
      colorPickerBtn.classList.add("active");
      
      const eyeDropper=new window.EyeDropper();

      try{
        const result=await eyeDropper.open();
        const {sRGBHex}=result;
        ctx.strokeStyle=sRGBHex;
        colorPicker.value=sRGBHex;
      }catch(e){
        console.log('colorpickerbtn'+e);
      }finally{
        setMode(MODES.DRAW);
      }
      return;
    }
}

setMode(currentMode);