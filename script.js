aboutSection = "Mason is a Masters student (and self-proclaimed coffee snob) at Binghamton University with an emphasis in Artificial Intelligence and Machine Learning. He boasts broad experience in both ML and software design, from data analysis to MERN stack."
contactSection = "this person can currently be found through:\nmtipton...b/in/g/h/amton(.)edu\nlinkedin\na very motivated pigeon carrier"
const map = new Map();

map.set("about", aboutSection);
map.set("projects", "Projects content");
map.set("contact", contactSection);
map.set("blog", "Blog content");

const child = document.getElementById('loading-mason');
const parent = document.getElementById('window-loading-mason');
const normalTabs = document.getElementById('normal-tabs');
const normalBody = document.getElementById('normal-body');



const aboutPath = 'about.txt';
if (child && parent) {
    child.addEventListener('animationend', () => {
    // This code runs exactly when the child's animation stops
    parent.classList.add('loading-mason-finished');
    normalTabs.style.visibility = 'visible';
    normalBody.style.visibility = 'visible';
    baseLoad("about");
    });
} else if (!child) {
    console.error("Could not find child element.");
} else if (!parent) {
    console.error("Could not find parent element.");
}

function displayText(filePath) {
    loadContent(filePath).then(text => {
        const mainBody = document.getElementById('main-body');
        mainBody.textContent = text;
    });
}

async function loadContent(filePath) {
    try {
        const response = await fetch(filePath); // Fetch the file
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlText = await response.text(); // Get the response as text
        return htmlText; // Return the HTML content
    } catch (error) {
        console.error('Could not load the HTML snippet:', error);
    }
}

function baseLoad(key) {
    const mainBody = document.getElementById('main-body');
    mainBody.textContent = map.get(key);
}
function functest(element, key) {
    var whoHasAriaSelected = document.querySelector('[aria-selected="true"]');
    if (whoHasAriaSelected) {
        whoHasAriaSelected.setAttribute('aria-selected', 'false');
    }
    console.log(element);
    element.parentElement.setAttribute('aria-selected', 'true');
    const mainBody = document.getElementById('main-body');
    mainBody.textContent = map.get(key);
}