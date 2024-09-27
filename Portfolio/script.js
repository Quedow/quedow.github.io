const moreToolsBtn = document.querySelector("#moreToolsBtn");
moreToolsBtn.addEventListener("click", showMoreTools);

const moreTools = document.querySelector("#more-tools"); 
moreTools.style.display = "none";

function showMoreTools() {
    moreTools.style.display = moreTools.style.display === "none" ? "block" : "none";
}

const moreLangBtn = document.querySelector("#moreLangBtn");
moreLangBtn.addEventListener("click", showMoreLang);

const moreLang = document.querySelector("#more-lang");
moreLang.style.display = "none";

function showMoreLang() {
    moreLang.style.display = moreLang.style.display === "none" ? "block" : "none";
}

const moreSoftwaresBtn = document.querySelector("#moreSoftwaresBtn");
moreSoftwaresBtn.addEventListener("click", showMoreSoftwares);

const moreSoftwares = document.querySelector("#more-softwares"); 
moreSoftwares.style.display = "none";

function showMoreSoftwares() {
    moreSoftwares.style.display = moreSoftwares.style.display === "none" ? "block" : "none";
}

window.onload = function() {
    loadProjects(apps, 0);
    loadProjects(games, 1);
    loadSkills(main, 2);
    loadSkills(frameworks, 3);
    loadSkills(languages, 4);
    loadSkills(tools, 5);
};

function loadProjects(projects, index) {
    const container = document.querySelectorAll('.grid-container')[index];
    
    if (!container) { return; }

    projects.forEach(project => {
        const divProject = document.createElement('div');
        const img = document.createElement('img');
        const a = document.createElement('a');
        const divOverlay = document.createElement('div');
        const h1 = document.createElement('h1');
        const pType = document.createElement('p');
        const pDate = document.createElement('p');

        divProject.className = 'image-project';
        img.src = project.imgSrc;
        img.alt = project.imgAlt;
        a.target = '_blank';
        a.href = project.link;
        divOverlay.className = 'overlay';
        h1.textContent = project.title;
        pType.className = 'type';
        pType.textContent = project.type;
        pDate.textContent = project.date;

        divOverlay.appendChild(h1);
        divOverlay.appendChild(pType);
        divOverlay.appendChild(pDate);
        a.appendChild(divOverlay);
        divProject.appendChild(img);
        divProject.appendChild(a);
        container.appendChild(divProject);
    });
}

function loadSkills(skills, index) {
    const container = document.querySelectorAll('.grid-container')[index];

    skills.forEach(skill => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        const p = document.createElement('p');

        img.src = skill.imgSrc;
        img.alt = skill.imgAlt;
        p.textContent = skill.name;

        div.appendChild(img);
        div.appendChild(p);
        container.appendChild(div);
    });
}