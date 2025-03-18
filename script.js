const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let intervalId = null;
let isRunning = false;
let lapCount = 0;
let lastLapTime = 0;
let laps = [];

function updateDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    millisecondsDisplay.textContent = milliseconds.toString().padStart(2, '0');
}

function getCurrentTime() {
    return minutes * 60000 + seconds * 1000 + milliseconds * 10;
}

function formatTime(time) {
    const mins = Math.floor(time / 60000);
    const secs = Math.floor((time % 60000) / 1000);
    const ms = Math.floor((time % 1000) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
}

function addLap() {
    if (!isRunning) return;
    
    const currentTime = getCurrentTime();
    const lapTime = currentTime - lastLapTime;
    lastLapTime = currentTime;
    
    lapCount++;
    laps.push({
        number: lapCount,
        time: lapTime,
        totalTime: currentTime
    });
    
    // Keep only the last 10 laps
    if (laps.length > 10) {
        laps.shift();
    }
    
    updateLapsDisplay();
}

function updateLapsDisplay() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-item';
        lapElement.innerHTML = `
            <span class="lap-number">Lap ${lap.number}</span>
            <span>${formatTime(lap.time)}</span>
            <span>${formatTime(lap.totalTime)}</span>
        `;
        lapsList.appendChild(lapElement);
    });
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(() => {
            milliseconds++;
            if (milliseconds === 100) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10);
    }
}

function stopStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
    }
}

function resetStopwatch() {
    stopStopwatch();
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    lapCount = 0;
    lastLapTime = 0;
    laps = [];
    updateDisplay();
    updateLapsDisplay();
}

startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', addLap); 