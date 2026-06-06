/* ============================================================
   TravelNest - Home Page JavaScript
   Handles: auto-rotating hero quotes, Destination of the Day
   ============================================================ */

/* ---- Hero Quote Rotator ---- */

var currentQuoteIndex = 0;

/*
 * Updates the hero section with the next quote and matching
 * destination image. Called every 4 seconds by setInterval.
 */
function showNextQuote() {
    var quoteText = document.getElementById('hero-quote-text');
    var quoteAuthor = document.getElementById('hero-quote-author');
    var heroImage = document.getElementById('hero-image');

    if (!quoteText || !quoteAuthor) return;

    /* Fade out */
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    if (heroImage) heroImage.style.opacity = '0';

    /* After fade out, update the content and fade back in */
    setTimeout(function() {
        var quote = travelQuotes[currentQuoteIndex];
        quoteText.textContent = '"' + quote.text + '"';
        quoteAuthor.textContent = '— ' + quote.author;

        /* Cycle through destination images alongside quotes */
        if (heroImage) {
            var destIndex = currentQuoteIndex % destinations.length;
            heroImage.src = destinations[destIndex].image;
            heroImage.alt = destinations[destIndex].name + ', ' + destinations[destIndex].country;
        }

        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
        if (heroImage) heroImage.style.opacity = '1';

        /* Move to the next quote, looping back to the start */
        currentQuoteIndex = (currentQuoteIndex + 1) % travelQuotes.length;
    }, 300);
}

/* ---- Destination of the Day ---- */

/*
 * Uses date-based logic to pick a consistent destination for the day.
 * Calculates the day number of the year, then uses modulo to pick from
 * the destinations array. The same destination shows all day.
 */
function loadDestinationOfTheDay() {
    var today = new Date();
    var startOfYear = new Date(today.getFullYear(), 0, 1);
    var dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));
    var index = dayOfYear % destinations.length;
    var dest = destinations[index];

    /* Update the DOM elements with this destination's data */
    var nameEl    = document.getElementById('dotd-name');
    var countryEl = document.getElementById('dotd-country');
    var descEl    = document.getElementById('dotd-desc');
    var imgEl     = document.getElementById('dotd-img');

    if (nameEl)    nameEl.textContent    = dest.name;
    if (countryEl) countryEl.textContent = dest.country + ' · ' + dest.continent;
    if (descEl)    descEl.textContent    = dest.description;

    if (imgEl) {
        imgEl.src = dest.image;
        imgEl.alt = dest.name + ', ' + dest.country;
    }
}

/* ---- Initialise the home page ---- */
document.addEventListener('DOMContentLoaded', function() {
    /* Show first quote immediately */
    showNextQuote();

    /* Rotate quotes every 4 seconds */
    setInterval(showNextQuote, 4000);

    /* Load today's destination */
    loadDestinationOfTheDay();
});
