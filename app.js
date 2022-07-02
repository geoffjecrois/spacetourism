createDestinationTabs();
createDestinationArticle();
createCrewDots();


// mobile nav bar

const navToggle = document.querySelector('.navbar-toggle');
const navBar = document.querySelector('.primary-navigation');

navToggle.addEventListener('click', () => {
    if (navToggle.getAttribute('aria-expanded') === "false") {
        navBar.style.transform = 'translateX(0%)';
        navToggle.setAttribute('aria-expanded', "true");

    } 
    else {
        navBar.style.transform = 'translateX(100%)';
        navToggle.setAttribute('aria-expanded', 'false');

    }
})


//navigation

const navBtns = document.querySelectorAll('.navbar-btn');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');

    document.querySelectorAll('main').forEach(el => el.hidden = true);  

    let pageToDisplayName = btn.getAttribute('data-btn');

    let pageToDisplay = document.querySelector(`[data-page="${pageToDisplayName}"]`);
    pageToDisplay.hidden = false;
    changeBackgroundImage(pageToDisplayName);

    });

});

//explore btn

const exploreBtn = document.querySelector('.large-btn');

exploreBtn.addEventListener('click', () => {
    console.log('click');

    document.querySelector('[data-page="destination"]').hidden = false;
    document.querySelector('[data-page="home"]').hidden = true;
    navBtns.forEach(btn => btn.classList.remove('active'));
    navBtns[1].classList.add("active");
    changeBackgroundImage('destination');



});

//background img change

const body = document.querySelector('body');

function changeBackgroundImage(name) {
    if (window.matchMedia("(min-width: 35rem)").matches)
    {body.style.backgroundImage = `url(./assets/${name}/background-${name}-tablet.jpg)`}
    if (window.matchMedia("(min-width: 45rem)").matches)
    {body.style.backgroundImage = `url(./assets/${name}/background-${name}-desktop.jpg)`}
    else {body.style.backgroundImage = `url(./assets/${name}/background-${name}-mobile.jpg)`}
}

const activePage = document.querySelector('main:not([hidden])')
changeBackgroundImage(activePage.getAttribute("data-page"))

//json data fetch

async function fetchData() {
    const response = await fetch("./data.json");
    try {
        const data = await response.json();
        return data
    } catch (e) {
        console.log('error', e)
    }
}

//Destination page content

const tabsContainer = document.querySelector('.tabs');
const tabs = document.querySelectorAll('.tabs li');

async function createDestinationTabs() {
    const data = await fetchData();
    const destinationsData = data.destinations

    destinationsData.forEach( dest => {
        tabsContainer.innerHTML += `<li>${dest.name}</li>`
    })
    //add the active class on the first tab
    tabsContainer.firstChild.nextElementSibling.classList.add('active')

    tabsContainer.addEventListener("click", event => {
        document.querySelectorAll('.tabs li')
                .forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
        createDestinationArticle();
    })
}

async function createDestinationArticle() {
    const data = await fetchData();
    const destinationsData = data.destinations
    let planet = tabsContainer.querySelector('.active').innerHTML.toLowerCase();
    const planetData = destinationsData.filter(obj => obj.name.toLowerCase() === planet )[0];


    const article = document.querySelector('article');
    const planetImg = document.querySelector('img');

    planetImg.setAttribute("src", planetData.images.webp); //ajouter le changement d'image responsive
    article.innerHTML = `<h1 class="ff-serif text-white fs-800 small-lh uppercase planet-name">${planetData.name}</h1>
    <p class="text-light ff-sans fs-400 letter-spacing-2 big-lh planet-infos">${planetData.description}</p>
    <div class="divider"></div>
    <div class="distance">
    <p class="text-light fs-500 ff-sans-cond uppercase ">avg. distance</p>
    <p class=" text-white fs-600 ff-serif letter-spacing-2 uppercase">${planetData.distance}</p>
    </div>
    <div class="travel">
    <p class="text-light fs-500 ff-sans-cond uppercase">est.travel time</p>
    <p class=" text-white fs-600 ff-serif letter-spacing-2 uppercase">${planetData.travel}</p>
    </div>`
}


//crewpage content
const dotsContainer = document.querySelector('.dots');

async function createCrewDots() {
    const data = await fetchData();
    const crewData = data.crew;

    crewData.forEach(member => {
    dotsContainer.innerHTML += `<button data-crewmember="${member.name}"></button>`
});
    //add active class on the first one
    dotsContainer.firstChild.nextElementSibling.classList.add('active');
    //toggle active class when clicked
    dotsContainer.addEventListener('click', event => {
        document.querySelectorAll('.dots button')
                .forEach(dot => dot.classList.remove('active'));
        event.target.classList.add('active');
        createCrewArticle();
    })
}

async function createCrewArticle() {
    const data = await fetchData();
    const crewData = data.crew;

    let crewMember = dotsContainer.querySelector('.active').getAttribute("data-crewmember")


    const crewMemberData = crewData.filter(obj => obj.name === crewMember)[0];
    const article = document.querySelector('.crew-article');
    const img = document.querySelector('.crew-img');
    img.setAttribute('src', crewMemberData.images.webp)
    article.innerHTML = `
    <div>
        <p class="text-white ff-serif letter-spacing-2 fs-500 uppercase role">${crewMemberData.role}</p>
        <h2 class="text-white ff-serif letter-spacing-2 fs-600 uppercase">${crewMemberData.name}</h2>
    </div>
        <p class="text-light ff-sans fs-400 letter-spacing-2 big-lh">${crewMemberData.bio}</p>`
}

createCrewArticle()