//Hard-coded content for static site

aboutContent = "<p>Mason is a Masters student (and self-proclaimed coffee snob) at Binghamton University with an emphasis in Artificial Intelligence and Machine Learning. He boasts broad experience in both ML and software design, from data analysis to MERN stack.</p>";
contactContent = "<p>this person can currently be found through:<br>mtipton...b/in/g/h/amton(.)edu<br><a href=\"https://linkedin.com/in/masontipton/\">LinkedIn</a><br><a href=\"https://en.wikipedia.org/wiki/Homing_pigeon\">a very motivated carrier pigeon</a></p>";
blogContent = "<p>Blog content</p>";
projectContent = '<ul class="tree-view"> <li>Categories</li> <li> <details> <summary>AI/ML</summary> <ul> <li><a href="#" onclick="popupDescription(\'SOM Research Platform\')">SOM Research Platform</a></li> <li>Robotics Thesis</li> <li><a href="#" onclick="popupDescription(\'Research Foundation at SUNY\')">Research Foundation at SUNY</a></li> </ul> </details> </li> <li> <details> <summary>Software Design</summary> <ul> <li><a href="#" onclick="popupDescription(\'martak decrypted\')">Martak Decrypted</a></li> </ul> </details> </li> <li> <details> <summary>Game Dev</summary> <ul> <li><a href="#" onclick="popupDescription(\'evelyn\')">Evelyn</a></li> </ul> </details> </li> <li> <details> <summary>Music</summary> <ul> <li><a href="#" onclick="popupDescription(\'satellite-czech-one\')">satellite czech one</a></li> </ul> </details> </li> </ul>';




//Project content, also hard-coded for now
//Popup window
baselineWindow ='<div class="window" style="margin: 32px; width: 250px" id="project-window"> <div class="title-bar"> <div class="title-bar-text" id="project-title-text"> Now Loading... </div> <div class="title-bar-controls"><button aria-label="Minimize"></button> <button aria-label="Maximize"></button> <button aria-label="Close" onclick="removePopup()"></button></div></div> <div class="window-body" id="project-body"> <p id="project-description"></p> </div> </div>';


satelliteCzechOneContent = "satellite czech one was started in 2026 as an exercise in getting out of my comfort zone and falling in love with music again. what started as a daily exercise has become a love letter to hauntology greats, taking heavy inspiration from reactionary nostalgia, with a first album planned for summer 2026 release.";
evelynContent = "this rpg, made with self-made mods for the bitsy platform, was one of my first works in undergrad. while my technique has improved much since then, I like to include this project as a reminder that creating software should be fun, not just profitable.";
martakContent = "Martak Decrypted is a 2024 webseries that was unexpectedly cancelled. I oversaw the software design and implementation, as well as contributed much of the aesthetics of the webseries, creating software for real-time interaction in Java, JavaFX, Curses, Bash Scripting, and more.";
somContent = "This is currently a work in progress, but one that involves LLMs, FARM stack, and a lot of fun."
rfContent = "Due to NDA, I can't say much about my work in computational oncology, which is headed by Dr. Nancy Guo."


const tabsMap = new Map();
const projectsMap = new Map();


tabsMap.set("about", aboutContent);
tabsMap.set("projects", projectContent);
tabsMap.set("contact", contactContent);
tabsMap.set("blog", blogContent);

//map project names to buttons
projectsMap.set("satellite-czech-one", [satelliteCzechOneContent, ["Bandcamp", "https://satelliteczechone.bandcamp.com/"]]);
projectsMap.set("evelyn", [evelynContent, ["itch.io", "https://shrikepoint.itch.io/evelyn"]]);
projectsMap.set("martak decrypted", [martakContent, ["YouTube Channel", "https://www.youtube.com/@martakdecrypted"]]);
projectsMap.set("SOM Research Platform", [somContent, ["PI: Dr. Jinglu Jiang", "https://www.binghamton.edu/som/research/profile.html?id=jingluj"]]);
projectsMap.set("Research Foundation at SUNY", [rfContent, ["PI: Dr. Nancy Guo", "https://www.binghamton.edu/computer-science/people/profile.html?id=nguo1"]]);

// Site elements
const child = document.getElementById('loading-mason');
const parent = document.getElementById('window-loading-mason');
const normalTabs = document.getElementById('normal-tabs');
const normalBody = document.getElementById('normal-body');

//Dynamic content paths
const aboutPath = 'about.txt';

// Play the animation and then load the content once finished
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


// Dynamic content loading functions

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

// Static content loading functions

function baseLoad(key) {
    const mainBody = document.getElementById('main-body');

    mainBody.innerHTML = tabsMap.get(key);
}

function functest(element, key) {
    var whoHasAriaSelected = document.querySelector('[aria-selected="true"]');
    if (whoHasAriaSelected) {
        whoHasAriaSelected.setAttribute('aria-selected', 'false');
    }
    console.log(element);
    element.parentElement.setAttribute('aria-selected', 'true');
    const mainBody = document.getElementById('main-body');
    mainBody.innerHTML = tabsMap.get(key);
}


function removePopup() {
    const existingPopup = document.getElementById('project-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
}
//creates popup for project content

function popupDescription(key) {

    //check if popup already exists, if so remove it and create a new one with the new content
    removePopup();
    //snag the body element
    const body = document.getElementsByTagName('body')[0];
    console.log(body);


    //create popup and add to body, populate it with the string above
    const popup = document.createElement('div');
    popup.id = "project-popup";
    popup.innerHTML = baselineWindow;
    body.appendChild(popup);

    //populate with appropriate content
    const projectTitleText = document.getElementById('project-title-text');
    const projectDescription = document.getElementById('project-description');
    const projectBody = document.getElementById('project-body');
    //set title text to key
    projectTitleText.textContent = key;

    //look up content for value associated with key. this is either a string or a map. if it's a map, create appropriate buttons.
    const projectContent = projectsMap.get(key);
    console.log(projectContent[0]);
    if (projectContent instanceof Array) {
        //make the key of this map the projectDescription text content
        projectDescription.textContent = projectContent[0];
        console.log(projectContent.slice(1));
        //create buttons for each entry in the map
        //Todo: fix for multiple buttons
        for (const [buttonText, buttonLink] of projectContent.slice(1)) {
            const button = document.createElement('button');
            button.textContent = buttonText;
            button.onclick = () => {
                window.open(buttonLink, '_blank');
            };
            projectBody.appendChild(button);
        }
    }
    else if (typeof projectContent === 'string') {
        projectDescription.textContent = projectContent;
    }

}


