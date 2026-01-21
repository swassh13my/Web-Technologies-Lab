// 1. Storage & Config
let activityLog = [];
let clickTimes = [];
const CLICK_THRESHOLD = 10; // Clicks allowed within 5 seconds
const TIME_WINDOW = 5000;

// 2. The Universal Monitor Function
function logEvent(type, target, details = "") {
    const entry = {
        timestamp: new Date().toLocaleTimeString(),
        type: type,
        target: target,
        details: details
    };
    
    activityLog.push(entry);
    updateLogUI(entry);
    checkSuspiciousActivity(type);
}

// 3. Event Listeners (Bubbling)
window.addEventListener('click', (e) => {
    logEvent('Click', e.target.tagName, `ID: ${e.target.id || 'N/A'}`);
});

window.addEventListener('keydown', (e) => {
    logEvent('Keypress', 'Window', `Key: ${e.key}`);
});

// Capture Focus/Blur (Setting 'true' enables the capturing phase)
window.addEventListener('focus', (e) => {
    logEvent('Focus', e.target.tagName, "Element gained focus");
}, true);

// 4. Suspicious Activity Detection
function checkSuspiciousActivity(type) {
    if (type === 'Click') {
        const now = Date.now();
        clickTimes.push(now);
        
        // Only keep clicks from the last 5 seconds
        clickTimes = clickTimes.filter(t => now - t < TIME_WINDOW);
        
        if (clickTimes.length > CLICK_THRESHOLD) {
            document.getElementById('sandbox').style.backgroundColor = "#ffe6e6";
            console.warn("Suspicious Activity: Rapid clicking detected!");
        }
    }
}

// 5. DOM Updates
function updateLogUI(entry) {
    const list = document.getElementById('log-list');
    const li = document.createElement('li');
    li.innerHTML = `<strong>[${entry.timestamp}]</strong> ${entry.type} on ${entry.target} <em>${entry.details}</em>`;
    
    // Prepend so latest is at top
    list.insertBefore(li, list.firstChild);
}

// 6. Export Functionality
function exportLog() {
    const formattedText = activityLog.map(e => 
        `[${e.timestamp}] ${e.type.toUpperCase()}: ${e.target} - ${e.details}`
    ).join('\n');
    
    console.log("Exporting Log...");
    alert("Check console (F12) for formatted log text!");
    console.log(formattedText);
}

function resetLog() {
    activityLog = [];
    document.getElementById('log-list').innerHTML = "";
    document.getElementById('sandbox').style.backgroundColor = "transparent";
}