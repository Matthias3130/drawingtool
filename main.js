const drawingScreen = document.querySelector('#drawing-screen');
drawingScreen.width = window.innerWidth*0.90;
drawingScreen.height = window.innerHeight;
const ctx = drawingScreen.getContext('2d');

let isDrawing = false
let drawings = [];
let lastPoint = null;

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

function drawSmoothLine(fromX, fromY, toX, toY) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();
}

function redraw() {
    ctx.clearRect(0, 0, drawingScreen.width, drawingScreen.height); 
    drawings.forEach(([x, y, a, b]) => drawSmoothLine(x, y, a, b));
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
    lastPoint = { x: event.clientX, y: event.clientY }; 
}

function stopDrawing() {
    isDrawing = false;
    lastPoint = null; 
}

function drawWhileMoving(event) {
    addCircle(event.clientX, event.clientY);
}

function draw(event) {
    if (!isDrawing) return;

    const currentPoint = { x: event.clientX, y: event.clientY };
    drawings.push([lastPoint.x, lastPoint.y, currentPoint.x, currentPoint.y]);
    drawSmoothLine(lastPoint.x, lastPoint.y, currentPoint.x, currentPoint.y);
    lastPoint = currentPoint; 
}

drawingScreen.addEventListener('mousemove', drawToolOutline);
drawingScreen.addEventListener('mousedown', startDrawing);
drawingScreen.addEventListener('mouseup', stopDrawing);
drawingScreen.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        requestAnimationFrame(() => draw(event));
    }
});
