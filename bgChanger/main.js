// Constants and variables
const notes = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 
    'F#', 'G', 'G#', 'A', 'A#', 'B'
];
const colors = [
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', 
    '#0000FF', '#4B0082', '#9400D3', '#FF1493',
    '#00FFFF', '#FF00FF', '#FFD700', '#32CD32',
    '#8A2BE2', '#FF6347', '#20B2AA', '#FF4500',
    '#7FFFD4', '#DA70D6', '#1E90FF', '#DB7093',
    '#F0E68C', '#DDA0DD', '#90EE90', '#B0C4DE',
    '#FFA07A', '#87CEFA'
];

let isDarkMode = true;

// Initialize the app
function initApp() {
    createKeyboard();
    setupEventListeners();
    setupControls();
    checkScreenSize();
    
    // Check screen size on resize
    window.addEventListener('resize', checkScreenSize);
}

// Create keyboard buttons (a-z)
function createKeyboard() {
    const keyboard = document.getElementById("keyboard");
    let start = 97; // ASCII for 'a'
    let end = 122;  // ASCII for 'z'

    while (start <= end) {
        const button = document.createElement("button");
        const letter = String.fromCharCode(start);
        const noteIndex = (start - 97) % notes.length;
        
        button.id = letter;
        button.innerHTML = `<span>${letter.toUpperCase()}</span><span>${notes[noteIndex]}</span>`;
        button.dataset.note = notes[noteIndex];
        button.dataset.color = colors[start - 97];
        
        keyboard.appendChild(button);
        start += 1;
    }
}

// Event listeners
function setupEventListeners() {
    // Keyboard events
    document.addEventListener("keypress", function(event) {
        const key = event.key.toLowerCase();
        if (key >= 'a' && key <= 'z') {
            playNote(key);
        }
    });

    document.addEventListener("keyup", function(event) {
        const key = event.key.toLowerCase();
        if (key >= 'a' && key <= 'z') {
            releaseNote(key);
        }
    });

    // Touch/mouse events for keyboard
    document.querySelectorAll('#keyboard button').forEach(button => {
        // For click/touch support
        button.addEventListener('mousedown', () => {
            playNote(button.id);
        });
        
        button.addEventListener('mouseup', () => {
            releaseNote(button.id);
        });
        
        button.addEventListener('mouseleave', () => {
            releaseNote(button.id);
        });
        
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            playNote(button.id);
        });
        
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            releaseNote(button.id);
        });
    });
}

// Setup control buttons
function setupControls() {
    // Reset button
    document.getElementById('resetBtn').addEventListener('click', () => {
        const container = document.getElementById('visualContainer');
        container.innerHTML = '';
        document.body.style.backgroundColor = isDarkMode ? '#222' : '#f5f5f5';
    });
    
    // Toggle dark/light mode
    document.getElementById('toggleModeBtn').addEventListener('click', toggleDarkMode);
}

// Check screen size and adjust layout
function checkScreenSize() {
    const isMobile = window.innerWidth <= 480;
    const keyboard = document.getElementById('keyboard');
    
    if (isMobile) {
        // For mobile, we'll organize keys in rows
        const keysPerRow = 5;
        const buttons = Array.from(keyboard.querySelectorAll('button'));
        
        keyboard.innerHTML = '';
        
        for (let i = 0; i < buttons.length; i += keysPerRow) {
            const row = document.createElement('div');
            row.className = 'keyboard-row';
            row.style.display = 'flex';
            row.style.width = '100%';
            row.style.gap = '5px';
            row.style.marginBottom = '5px';
            
            for (let j = 0; j < keysPerRow && i + j < buttons.length; j++) {
                row.appendChild(buttons[i + j]);
            }
            
            keyboard.appendChild(row);
        }
    } else {
        // For larger screens, revert to the original layout if needed
        const rows = keyboard.querySelectorAll('.keyboard-row');
        if (rows.length > 0) {
            keyboard.innerHTML = '';
            const allButtons = [];
            
            rows.forEach(row => {
                Array.from(row.querySelectorAll('button')).forEach(btn => {
                    allButtons.push(btn);
                });
            });
            
            allButtons.forEach(btn => keyboard.appendChild(btn));
        }
    }
    
    // Re-add event listeners after DOM changes
    setupEventListeners();
}

// Toggle dark/light mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.style.backgroundColor = '#222';
        document.body.style.color = 'white';
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.style.backgroundColor = '#444';
            btn.style.color = 'white';
        });
    } else {
        document.body.style.backgroundColor = '#f5f5f5';
        document.body.style.color = '#222';
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.style.backgroundColor = '#ddd';
            btn.style.color = '#222';
        });
    }
}

// Note functions
function playNote(key) {
    const element = document.getElementById(key);
    if (element) {
        // Visual feedback
        element.style.backgroundColor = element.dataset.color;
        element.classList.add('active');
        
        // Create visual effect
        createParticles(element.dataset.color, calculateParticleCount());
        
        // Background effect (subtle)
        document.body.style.backgroundColor = shadeColor(element.dataset.color, isDarkMode ? 0.8 : 1.2);
    }
}

function releaseNote(key) {
    const element = document.getElementById(key);
    if (element) {
        element.style.backgroundColor = "white";
        element.classList.remove('active');
        
        // Reset background with a delay
        setTimeout(() => {
            document.body.style.backgroundColor = isDarkMode ? '#222' : '#f5f5f5';
        }, 300);
    }
}

// Calculate particle count based on screen size
function calculateParticleCount() {
    const width = window.innerWidth;
    if (width < 480) return 6;  // Mobile
    if (width < 768) return 10; // Tablet
    return 20;                  // Desktop
}

// Visual effects
function createParticles(color, count) {
    const container = document.getElementById('visualContainer');
    const containerWidth = container.offsetWidth;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position, size and timing
        const size = Math.random() * (window.innerWidth < 480 ? 15 : 30) + 5;
        const posX = Math.random() * containerWidth;
        const duration = Math.random() * 2 + 2;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${posX}px`;
        particle.style.bottom = '0';
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (particle.parentNode === container) {
                container.removeChild(particle);
            }
        }, duration * 1000);
    }
}

// Helper function to adjust a color's brightness
function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = Math.floor(R * percent);
    G = Math.floor(G * percent);
    B = Math.floor(B * percent);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    const RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', initApp);