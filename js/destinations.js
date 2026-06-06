/* ============================================================
   TravelNest - Destination Explorer JavaScript
   Handles: rendering cards, filtering, search, modal popup
   ============================================================ */

/* ---- Render Destination Cards ---- */

/*
 * Takes an array of destination objects and builds HTML cards.
 * Each card shows an image, name, country, and continent badge.
 */
function renderCards(list) {
    var grid = document.getElementById('cards-grid');
    var countEl = document.getElementById('results-count');

    if (!grid) return;

    /* Show count of results */
    if (countEl) {
        countEl.textContent = 'Showing ' + list.length + ' destination' + (list.length !== 1 ? 's' : '');
    }

    /* Show "no results" message if list is empty */
    if (list.length === 0) {
        grid.innerHTML = '<p class="no-results">No destinations found. Try a different search or filter.</p>';
        return;
    }

    /* Build a card for each destination */
    var html = '';
    list.forEach(function(dest) {
        html += '<article class="dest-card reveal" data-id="' + dest.id + '" tabindex="0" role="button" aria-label="View details for ' + dest.name + '">';
        html += '  <img src="' + dest.image + '" alt="' + dest.name + ', ' + dest.country + '" width="600" height="200" loading="lazy">';
        html += '  <div class="dest-card-body">';
        html += '    <h3>' + dest.name + '</h3>';
        html += '    <p class="dest-country">' + dest.country + '</p>';
        html += '    <span class="dest-continent-badge">' + dest.continent + '</span>';
        html += '  </div>';
        html += '</article>';
    });

    grid.innerHTML = html;

    /* Re-run scroll reveal for newly created cards */
    initScrollReveal();

    /* Add click and keyboard events to each card */
    grid.querySelectorAll('.dest-card').forEach(function(card) {
        card.addEventListener('click', function() {
            openModal(parseInt(card.getAttribute('data-id')));
        });
        /* Allow keyboard users to open modal with Enter or Space */
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal(parseInt(card.getAttribute('data-id')));
            }
        });
    });
}

/* ---- Filter Logic ---- */

/*
 * Reads the current search text and continent dropdown values,
 * then filters the destinations array and re-renders the cards.
 */
function filterDestinations() {
    var searchVal = document.getElementById('search-input').value.toLowerCase().trim();
    var continentVal = document.getElementById('continent-filter').value;

    var filtered = destinations.filter(function(dest) {
        var matchesName = dest.name.toLowerCase().includes(searchVal) ||
                          dest.country.toLowerCase().includes(searchVal);
        var matchesContinent = continentVal === 'all' || dest.continent === continentVal;
        return matchesName && matchesContinent;
    });

    renderCards(filtered);
}

/* ---- Modal ---- */

/* Opens the modal and fills it with the selected destination's data */
function openModal(id) {
    var dest = destinations.find(function(d) { return d.id === id; });
    if (!dest) return;

    /* Fill in the modal content */
    document.getElementById('modal-img').src = dest.image;
    document.getElementById('modal-img').alt = dest.name + ', ' + dest.country;
    document.getElementById('modal-title').textContent = dest.name;
    document.getElementById('modal-subtitle').textContent = dest.country + ' · ' + dest.continent;
    document.getElementById('modal-description').textContent = dest.description;

    /* Build attractions list */
    var attractionsEl = document.getElementById('modal-attractions');
    var attractionsHtml = '';
    dest.attractions.forEach(function(attraction) {
        attractionsHtml += '<li>' + attraction + '</li>';
    });
    attractionsEl.innerHTML = attractionsHtml;

    /* Build cost comparison table rows */
    var costsEl = document.getElementById('modal-costs');
    var costsHtml = '';
    dest.costs.forEach(function(row) {
        costsHtml += '<tr>';
        costsHtml += '  <td>' + row.category + '</td>';
        costsHtml += '  <td>' + row.budget + '</td>';
        costsHtml += '  <td>' + row.moderate + '</td>';
        costsHtml += '  <td>' + row.luxury + '</td>';
        costsHtml += '</tr>';
    });
    costsEl.innerHTML = costsHtml;

    /* Show the modal */
    var overlay = document.getElementById('modal-overlay');
    overlay.classList.add('modal-open');
    document.body.style.overflow = 'hidden'; /* Prevent background scrolling */

    /* Move focus to the close button for accessibility */
    setTimeout(function() {
        document.getElementById('modal-close').focus();
    }, 100);
}

/* Closes the modal and restores page scrolling */
function closeModal() {
    var overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('modal-open');
    document.body.style.overflow = '';
}

/* ---- Initialise Destinations Page ---- */
document.addEventListener('DOMContentLoaded', function() {

    /* Show spinner briefly, then load cards */
    var spinner = document.getElementById('spinner');
    setTimeout(function() {
        if (spinner) spinner.style.display = 'none';
        renderCards(destinations);
    }, 500);

    /* Search input - filter on every keystroke */
    var searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', filterDestinations);
    }

    /* Continent dropdown - filter on change */
    var continentFilter = document.getElementById('continent-filter');
    if (continentFilter) {
        continentFilter.addEventListener('change', filterDestinations);
    }

    /* Close modal with the X button */
    var closeBtn = document.getElementById('modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    /* Close modal by clicking the dark overlay behind it */
    var overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) {
                closeModal();
            }
        });
    }

    /* Close modal with the Escape key */
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});
