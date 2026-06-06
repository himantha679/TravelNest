/* ============================================================
   TravelNest - Random Trip Generator JavaScript
   Handles: destination filtering, random selection,
   "Surprise Me Again" animation, wishlist management
   ============================================================ */

/* Stores the currently displayed destination */
var currentDestination = null;

/* ---- Generate a Random Destination ---- */

/*
 * Filters the destinations array based on the selected travel type
 * and budget range, then picks one at random.
 */
function generateDestination() {
    var travelType  = document.getElementById('travel-type').value;
    var budgetRange = document.getElementById('budget-range').value;
    var errEl       = document.getElementById('gen-error');

    /* Clear any previous error */
    if (errEl) errEl.textContent = '';

    /* Filter by travel type and budget range */
    var filtered = destinations.filter(function(dest) {
        var typeMatch   = travelType === 'any'  || dest.travelType.includes(travelType);
        var budgetMatch = budgetRange === 'any' || dest.budgetRange.includes(budgetRange);
        return typeMatch && budgetMatch;
    });

    /* If no destinations match the filters, show an error */
    if (filtered.length === 0) {
        if (errEl) errEl.textContent = 'No destinations match your selection. Try a different combination!';
        return null;
    }

    /* Pick a random destination from the filtered list */
    var randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
}

/* ---- Display the Generated Destination ---- */

function showGeneratedDestination(dest) {
    if (!dest) return;

    currentDestination = dest;

    /* Hide placeholder, show card */
    var placeholder = document.getElementById('gen-placeholder');
    var card        = document.getElementById('generated-card');

    if (placeholder) placeholder.style.display = 'none';
    if (card) {
        card.classList.add('visible');
        /* Trigger the pulse animation by removing and re-adding the class */
        card.style.animation = 'none';
        card.offsetHeight; /* Trigger browser reflow */
        card.style.animation = '';
    }

    /* Update card content */
    document.getElementById('gen-img').src      = dest.image;
    document.getElementById('gen-img').alt      = dest.name + ', ' + dest.country;
    document.getElementById('gen-name').textContent      = dest.name;
    document.getElementById('gen-country').textContent   = dest.country + ' · ' + dest.continent;
    document.getElementById('gen-continent').textContent = dest.continent;
    document.getElementById('gen-quote').textContent     = '"' + dest.quote + '"';
}

/* ---- Wishlist Management ---- */

/* Adds the currently displayed destination to the wishlist in localStorage */
function addToWishlist() {
    if (!currentDestination) {
        showToast('Generate a destination first!', 'info');
        return;
    }

    var wishlist = loadFromStorage('tn_wishlist') || [];

    /* Check if already in wishlist */
    var alreadySaved = wishlist.some(function(item) {
        return item.id === currentDestination.id;
    });

    if (alreadySaved) {
        showToast(currentDestination.name + ' is already in your wishlist!', 'info');
        return;
    }

    /* Save the destination name, country, and id */
    wishlist.push({
        id: currentDestination.id,
        name: currentDestination.name,
        country: currentDestination.country,
        continent: currentDestination.continent,
        savedOn: new Date().toLocaleDateString()
    });

    saveToStorage('tn_wishlist', wishlist);
    showToast(currentDestination.name + ' added to your wishlist!', 'success');
    loadWishlist();
}

/* Loads and displays the wishlist from localStorage */
function loadWishlist() {
    var wishlist   = loadFromStorage('tn_wishlist') || [];
    var listEl     = document.getElementById('wishlist-list');
    var noMsg      = document.getElementById('no-wishlist-msg');
    var clearBtn   = document.getElementById('clear-wishlist-btn');

    if (!listEl) return;

    if (wishlist.length === 0) {
        listEl.innerHTML = '';
        if (noMsg)    noMsg.style.display    = 'block';
        if (clearBtn) clearBtn.style.display = 'none';
        return;
    }

    if (noMsg)    noMsg.style.display    = 'none';
    if (clearBtn) clearBtn.style.display = 'inline-block';

    var html = '';
    wishlist.forEach(function(item, index) {
        html += '<div class="wishlist-item">';
        html += '  <div>';
        html += '    <strong>' + item.name + '</strong>';
        html += '    <p style="font-size: 0.82rem; color: var(--text-light); margin-top: 0.1rem;">' + item.country + ' · Added ' + item.savedOn + '</p>';
        html += '  </div>';
        html += '  <button type="button" class="btn btn-danger btn-sm" data-index="' + index + '" aria-label="Remove ' + item.name + ' from wishlist">Remove</button>';
        html += '</div>';
    });

    listEl.innerHTML = html;

    /* Add remove button listeners */
    listEl.querySelectorAll('.btn-danger').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var index = parseInt(btn.getAttribute('data-index'));
            removeFromWishlist(index);
        });
    });
}

/* Removes a wishlist item at a given index */
function removeFromWishlist(index) {
    var wishlist = loadFromStorage('tn_wishlist') || [];
    var removed  = wishlist.splice(index, 1);
    saveToStorage('tn_wishlist', wishlist);
    if (removed.length > 0) showToast(removed[0].name + ' removed from wishlist.', 'info');
    loadWishlist();
}

/* ---- Initialise Generator Page ---- */
document.addEventListener('DOMContentLoaded', function() {

    loadWishlist();

    /* Generate button */
    var generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            var dest = generateDestination();
            showGeneratedDestination(dest);
        });
    }

    /* Surprise Me Again button — generates and adds a bounce animation */
    var surpriseBtn = document.getElementById('surprise-btn');
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', function() {
            /* Add bounce class for animation */
            surpriseBtn.classList.add('bouncing');

            /* Remove it after animation completes so it can re-trigger next click */
            setTimeout(function() {
                surpriseBtn.classList.remove('bouncing');
            }, 500);

            var dest = generateDestination();
            showGeneratedDestination(dest);
        });
    }

    /* Add to wishlist button */
    var wishlistBtn = document.getElementById('add-wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', addToWishlist);
    }

    /* Clear wishlist button */
    var clearBtn = document.getElementById('clear-wishlist-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            saveToStorage('tn_wishlist', []);
            loadWishlist();
            showToast('Wishlist cleared.', 'info');
        });
    }
});
