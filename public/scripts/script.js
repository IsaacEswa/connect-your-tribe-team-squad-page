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




//######################## Seb ################################

let dark = document.querySelector('.1j');
let light = document.querySelector('.1i')

dark.addEventListener('click', function(){
    dark.classList.add('dark-color')
    light.classList.add('opacity-text')
    dark.classList.remove('opacity-text')
})

light.addEventListener('click', function(){
    dark.classList.remove('dark-color')
    dark.classList.add('opacity-text')
    light.classList.remove('opacity-text')
})