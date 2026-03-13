const child = document.getElementById('loading-mason');
const parent = document.getElementById('window-loading-mason');
const normalTabs = document.getElementById('normal-tabs');
const normalBody = document.getElementById('normal-body');

const fs = require('fs');

const aboutPath = 'about.txt';
if (child && parent) {
    child.addEventListener('animationend', () => {
    // This code runs exactly when the child's animation stops
    parent.classList.add('loading-mason-finished');
    normalTabs.style.visibility = 'visible';
    normalBody.style.visibility = 'visible';
    displayText(readFile(aboutPath));
    });
} else if (!child) {
    console.error("Could not find child element.");
} else if (!parent) {
    console.error("Could not find parent element.");
}

function readFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
        } else {
            console.log("File content:", data);
            return data;
        }
    });
}

function displayText(text) {
    const mainBody = document.getElementById('main-body');
    mainBody.textContent = text;
}
