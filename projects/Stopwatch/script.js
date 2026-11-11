let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let laps = [];
let lastLapTime = 0;

const timeDisplay = document.getElementById('timeDisplay');
const msDisplay = document.getElementById('msDisplay');
const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsSection = document.getElementById('lapsSection');
const lapsList = document.getElementById('lapsList');

function formatTime(totalMs) {
  const hours = Math.floor(totalMs / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const centiseconds = Math.floor((totalMs % 1000) / 10);

  const pad = (n, len = 2) => String(n).padStart(len, '0');
  return {
    main: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    ms: `.${pad(centiseconds)}`
  };
}

function updateDisplay() {
  const currentElapsed = isRunning ? (Date.now() - startTime + elapsedTime) : elapsedTime;
  const formatted = formatTime(currentElapsed);
  timeDisplay.innerHTML = `${formatted.main}<span class="milliseconds" id="msDisplay">${formatted.ms}</span>`;
}

function start() {
  if (isRunning) return;
  isRunning = true;
  startTime = Date.now();
  timerInterval = setInterval(updateDisplay, 10);

  startBtn.textContent = 'Pause';
  startBtn.className = 'btn btn-pause';
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function pause() {
  if (!isRunning) return;
  isRunning = false;
  elapsedTime += Date.now() - startTime;
  clearInterval(timerInterval);

  startBtn.textContent = 'Resume';
  startBtn.className = 'btn btn-start';
  lapBtn.disabled = true;
}

function toggleStartPause() {
  if (isRunning) {
    pause();
  } else {
    start();
  }
}

function reset() {
  pause();
  elapsedTime = 0;
  startTime = 0;
  lastLapTime = 0;
  laps = [];

  updateDisplay();

  startBtn.textContent = 'Start';
  startBtn.className = 'btn btn-start';
  lapBtn.disabled = true;
  resetBtn.disabled = true;

  lapsList.innerHTML = '';
  lapsSection.style.display = 'none';
}

function recordLap() {
  if (!isRunning) return;

  const currentTotal = Date.now() - startTime + elapsedTime;
  const splitTime = currentTotal - lastLapTime;
  lastLapTime = currentTotal;

  laps.unshift({
    lapNumber: laps.length + 1,
    split: splitTime,
    total: currentTotal
  });

  renderLaps();
}

function renderLaps() {
  if (laps.length === 0) {
    lapsSection.style.display = 'none';
    return;
  }

  lapsSection.style.display = 'block';

  let minSplit = Infinity;
  let maxSplit = -Infinity;

  if (laps.length >= 2) {
    laps.forEach(l => {
      if (l.split < minSplit) minSplit = l.split;
      if (l.split > maxSplit) maxSplit = l.split;
    });
  }

  lapsList.innerHTML = laps.map(lap => {
    let highlightClass = '';
    if (laps.length >= 2) {
      if (lap.split === minSplit) highlightClass = 'fastest';
      else if (lap.split === maxSplit) highlightClass = 'slowest';
    }

    const splitFormatted = formatTime(lap.split);
    const totalFormatted = formatTime(lap.total);

    return `
      <li class="lap-item ${highlightClass}">
        <span>#${String(lap.lapNumber).padStart(2, '0')}</span>
        <span>+${splitFormatted.main}${splitFormatted.ms}</span>
        <span>${totalFormatted.main}${totalFormatted.ms}</span>
      </li>
    `;
  }).join('');
}

startBtn.addEventListener('click', toggleStartPause);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', reset);

window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  if (e.code === 'Space') {
    e.preventDefault();
    toggleStartPause();
  } else if (e.key === 'l' || e.key === 'L') {
    if (!lapBtn.disabled) recordLap();
  } else if (e.key === 'r' || e.key === 'R') {
    if (!resetBtn.disabled) reset();
  }
});
