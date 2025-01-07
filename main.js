const drawingScreen = document.querySelector('#drawing-screen');
drawingScreen.width = window.innerWidth*0.90;
drawingScreen.height = window.innerHeight;
const ctx = drawingScreen.getContext('2d');

let isDrawing = false
let drawings = [];

function drawCircleOutline(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.lineWidth = 1; 
    ctx.strokeStyle = 'blue'; 
    ctx.stroke();
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.lineWidth = 1; 
    ctx.strokeStyle = 'blue';
    ctx.stroke(); 
}

function redraw() {
    ctx.clearRect(0, 0, drawingScreen.width, drawingScreen.height); 
    drawings.forEach(([x, y, radius]) => drawCircle(x, y, radius));
}

function drawToolOutline(event) {
    if (!isDrawing) {
        redraw(); 
        drawCircleOutline(event.clientX, event.clientY, 10); 
    }
}

function addCircle(x, y) {
    drawings.push([x, y, 10]); 
    redraw(); 
}

function startDrawing(event) {
    isDrawing = true;
    addCircle(event.clientX, event.clientY);
}

function stopDrawing() {
    isDrawing = false;
}

function drawWhileMoving(event) {
    if (isDrawing) {
        addCircle(event.clientX, event.clientY);
    }
}

drawingScreen.addEventListener('mousemove', drawToolOutline);
drawingScreen.addEventListener('mousedown', startDrawing);
drawingScreen.addEventListener('mouseup', stopDrawing);
drawingScreen.addEventListener('mousemove', drawWhileMoving);
