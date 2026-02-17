// UITLEG
// radius = afstand van het midden van de cirkel tot de images | hoe groter de radius, hoe verder de images van het midden af staan
// radian = de hoek van een image op de cirkel | bepaalt de positie van de image op de cirkel

// Roep de slider op
let slider = document.querySelector(".slider");

// gsap = GSAP animatie library | GSAP zet de gevonden elementen in een JS array
let images = gsap.utils.toArray(".student-card");

function sliderCircle() {
    let radius = slider.offsetWidth / 0.7; // Bereken de straal van de cirkel op basis van de breedte van de slider
    let center = slider.offsetWidth / 2; // Bereken het midden van de slider
    // offsetWidth = layout breedte van een element inclusief padding en border, maar exclusief margin

    let total = images.length; // Totaal aantal afbeeldingen
    let slice = (2 * Math.PI) / total; // Bereken de hoek tussen elke afbeelding in radialen
    // cirkel = 2 * PI
    // slice = cirkel / totaal aantal afbeeldingen
    // geen gebruik van graden, maar radialen want cos en sin functies werken met radialen

    images.forEach((item, i) => {
        let radian = i * slice; // Bereken de hoek voor de huidige afbeelding 

        let x = radius * Math.sin(radian) + center; // Bereken de x-positie (horizontaal) met de sinusfunctie
        let y = - radius * Math.cos(radian) + center; // Bereken de y-positie (verticaal) met de cosinusfunctie

        gsap.set(item, {
            rotation: radian + "rad", // Draai de afbeelding op basis van de berekende hoek
            xPercent: -50, // Centreer de afbeelding horizontaal
            yPercent: -50, // Centreer de afbeelding verticaal
            x: x, // Stel de x-positie in
            y: y // Stel de y-positie in
        });
    });
}

// Roep de functie aan om de afbeeldingen in een cirkel te plaatsen
sliderCircle();

window.addEventListener("resize", sliderCircle); // Voeg een event listener toe om de functie opnieuw aan te roepen bij het wijzigen van de grootte van het venster

// 1. target de slider
gsap.to(".slider", {
    rotate: () => -360, // Laat de slider 360 graden draaien
    ease: "none", // Geen easing, constante snelheid
    // ease: "easeInOut", // Easing voor een vloeiendere animatie
    // ease: "easeIn",
    ease: "easeOut",
    duration: images.length, // De duur van de animatie is gelijk aan het aantal afbeeldingen, zodat elke afbeelding even lang in beeld blijft
    scrollTrigger: {
        start: 0, // start de animatie vanaf het begin van de pagina
        end: "max", // eindigt wanneer het einde van de pagina is bereikt
        scrub: 1, // synchroniseert de animatie met het scrollen | bij true gaat het niet soepel    
    }
});








// // 1. selecteer student-card
// let studentCard = document.querySelector(".student-card");

// // 2. voeg  hover event toe 
// studentCard.addEventListener('pointerover', showStudentInfo);
// studentCard.addEventListener('pointerout', hideStudentInfo);

// // 3. callbackfunctie
// function showStudentInfo() {
//     studentCard.classList.add('hovered');
// }

// function hideStudentInfo() {
//     studentCard.classList.remove('hovered');
// }
// ^^^^^^^^^ WERKT NIET, want we hebben meerdere student-cards, dus we moeten een loop gebruiken om voor elke card een event listener toe te voegen

// 1. selecteer alle student-cards
let studentCards = document.querySelectorAll(".student-card");

// 2. voeg hover events toe voor elke card
studentCards.forEach((card) => {
    card.addEventListener('pointerover', showStudentInfo);
    card.addEventListener('pointerout', hideStudentInfo);
});

// 3. callbackfuncties
function showStudentInfo(event) {
    event.currentTarget.classList.add('hovered'); // alleen deze card
}

function hideStudentInfo(event) {
    event.currentTarget.classList.remove('hovered'); // alleen deze card
}




let views = document.querySelectorAll('.sort-items a');
let currentPath = window.location.pathname;

views.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('sorting-active');
    }
});



// const likeContainer = document.querySelector(".like-container");
// const likeButton = document.querySelector(".like-button");

// likeButton.addEventListener('click', addLiked);

// function addLiked() {
//     likeContainer.classList.toggle('liked');
//     likeContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M241 87.1l15 20.7 15-20.7C296 52.5 336.2 32 378.9 32 452.4 32 512 91.6 512 165.1l0 2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C139.9 410.2 0 279.9 0 167.7l0-2.6C0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1z"/></svg>
//                 <p class="like-counter">0</p>
// `
// }

// document.querySelectorAll('.like-container').forEach(container => {
//     const likeButton = container.querySelector('.like-button');
//     const likeCounter = container.querySelector('.like-counter');
//     let count = 0;

//     likeButton.addEventListener('click', () => {
//         container.classList.toggle('liked');
//         count += container.classList.contains('liked') ? 1 : -1;
//         likeCounter.textContent = count;
//     });
// });


const regularHeart = `M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z`;
const solidHeart = `M241 87.1l15 20.7 15-20.7C296 52.5 336.2 32 378.9 32 452.4 32 512 91.6 512 165.1l0 2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C139.9 410.2 0 279.9 0 167.7l0-2.6C0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1z`;

document.querySelectorAll('.like-container').forEach(container => {
    const likeButton = container.querySelector('.like-button');
    const likeCounter = container.querySelector('.like-counter');
    const heartPath = container.querySelector('.heart-path');

    let count = 0;

    likeButton.addEventListener('click', () => {
        container.classList.toggle('liked');

        const liked = container.classList.contains('liked');

        // counter
        count += liked ? 1 : -1;
        likeCounter.textContent = count;

        // heart switch (regular ↔ solid)
        heartPath.setAttribute('d', liked ? solidHeart : regularHeart);
    });
});


console.log(likeButton, likeContainer);


//######################## Seb ################################

let dark = document.querySelector('.1j');
let light = document.querySelector('.1i')

dark.addEventListener('click', function () {
    dark.classList.add('dark-color')
    light.classList.add('opacity-text')
    dark.classList.remove('opacity-text')
})

light.addEventListener('click', function () {
    dark.classList.remove('dark-color')
    dark.classList.add('opacity-text')
    light.classList.remove('opacity-text')
})

