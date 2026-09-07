// Drawing Canvas Setup and Functionality

// Get elements
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const brushButton = document.getElementById('brushButton');
const drawingControls = document.getElementById('drawingControls');
const clearBtn = document.getElementById('clearCanvas');
const saveBtn = document.getElementById('saveDrawing');
const brushSizeInput = document.getElementById('brushSize');
const sizeDisplay = document.getElementById('sizeDisplay');
const colorOptions = document.querySelectorAll('.color-option');
const eraserBtn = document.getElementById('eraserBtn');
const container = document.querySelector('.container');

// Drawing state
let isDrawing = false;
let drawingEnabled = false;
let currentColor = '#000000';
let brushSize = 5;
let isEraser = false;

// Set canvas size to match container
function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    
    // Save current drawing
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCtx.drawImage(canvas, 0, 0);

    // Resize canvas
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Restore drawing
    ctx.drawImage(tempCanvas, 0, 0);
}

// Initialize canvas
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Toggle drawing mode when brush button is clicked
brushButton.addEventListener('click', () => {
    drawingEnabled = !drawingEnabled;
    canvas.classList.toggle('active', drawingEnabled);
    brushButton.classList.toggle('active', drawingEnabled);
    drawingControls.classList.toggle('show', drawingEnabled);
    
    // Update button appearance
    if (drawingEnabled) {
        brushButton.textContent = '✖️';
    } else {
        brushButton.textContent = '🖌️';
    }
});

// Color selection
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        currentColor = option.dataset.color;
        isEraser = false;
        eraserBtn.classList.remove('active');
    });
});

// Brush size control
brushSizeInput.addEventListener('input', (e) => {
    brushSize = e.target.value;
    sizeDisplay.textContent = brushSize + 'px';
});

// Eraser toggle
eraserBtn.addEventListener('click', () => {
    isEraser = !isEraser;
    eraserBtn.classList.toggle('active', isEraser);
    if (isEraser) {
        colorOptions.forEach(opt => opt.classList.remove('active'));
    }
});

// Drawing functions
function getCanvasCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function startDrawing(e) {
    if (!drawingEnabled) return;
    isDrawing = true;
    const coords = getCanvasCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
}

function draw(e) {
    if (!isDrawing || !drawingEnabled) return;
    
    e.preventDefault();
    const coords = getCanvasCoordinates(e);

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = currentColor;
    }

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
}

function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
    ctx.beginPath();
}

// Mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch events for mobile
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDrawing(e);
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e);
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    stopDrawing();
}, { passive: false });

// Clear canvas
clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all drawings?')) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

// Save drawing
saveBtn.addEventListener('click', () => {
    // Create a temporary canvas with white background
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    
    // Fill with white background
    tempCtx.fillStyle = 'white';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    
    // Draw the current canvas on top
    tempCtx.drawImage(canvas, 0, 0);
    
    // Download
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    link.download = `drawing-${timestamp}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
});

// Close controls when clicking outside
document.addEventListener('click', (e) => {
    if (drawingEnabled && 
        !brushButton.contains(e.target) && 
        !drawingControls.contains(e.target) &&
        !canvas.contains(e.target)) {
        // Optional: could auto-close controls here
        // For now, keeping them open for better UX
    }
});