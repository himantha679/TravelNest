/* ============================================================
   TravelNest - Trip Budget Planner JavaScript
   Handles: form validation, cost calculation, progress bar,
   animated counter, saving budgets to localStorage
   ============================================================ */

/* Stores the last calculated result so it can be saved */
var lastResult = null;

/* ---- Populate Destination Dropdown ---- */

/* Fills the destination select element with options from the data file */
function populateDestinationDropdown() {
    var select = document.getElementById('budget-destination');
    if (!select) return;

    destinations.forEach(function(dest) {
        var option = document.createElement('option');
        option.value = dest.id;
        option.textContent = dest.name + ' (' + dest.country + ')';
        select.appendChild(option);
    });
}

/* ---- Animated Counter ---- */

/*
 * Counts up a number from 0 to 'target' over a set duration.
 * Updates the text content of the given element on each frame.
 */
function animateCounter(element, target, duration) {
    var start = 0;
    var startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var current = Math.floor(progress * target);
        element.textContent = '£' + current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            element.textContent = '£' + target.toLocaleString();
        }
    }

    requestAnimationFrame(step);
}

/* ---- Determine Budget Status ---- */

/*
 * Classifies the daily budget as low, moderate, or luxury.
 * Returns an object with a label, CSS class, and progress percentage.
 */
function getBudgetStatus(dailyBudget) {
    if (dailyBudget <= 50) {
        return { label: 'Budget / Low', cssClass: 'status-low', fillClass: 'fill-low', percent: Math.round((dailyBudget / 50) * 35) };
    } else if (dailyBudget <= 150) {
        return { label: 'Moderate', cssClass: 'status-moderate', fillClass: 'fill-moderate', percent: Math.round(35 + ((dailyBudget - 50) / 100) * 40) };
    } else {
        return { label: 'Luxury', cssClass: 'status-luxury', fillClass: 'fill-luxury', percent: Math.min(100, Math.round(75 + ((dailyBudget - 150) / 150) * 25)) };
    }
}

/* ---- Form Validation ---- */

/* Returns true if the form is valid, otherwise shows error messages */
function validateBudgetForm() {
    var isValid = true;

    var destEl   = document.getElementById('budget-destination');
    var daysEl   = document.getElementById('budget-days');
    var dailyEl  = document.getElementById('budget-daily');

    var errDest  = document.getElementById('err-destination');
    var errDays  = document.getElementById('err-days');
    var errDaily = document.getElementById('err-daily');

    /* Clear previous errors */
    errDest.textContent  = '';
    errDays.textContent  = '';
    errDaily.textContent = '';
    destEl.classList.remove('input-error');
    daysEl.classList.remove('input-error');
    dailyEl.classList.remove('input-error');

    /* Validate destination */
    if (!destEl.value) {
        errDest.textContent = 'Please select a destination.';
        destEl.classList.add('input-error');
        isValid = false;
    }

    /* Validate number of days */
    var days = parseInt(daysEl.value);
    if (!daysEl.value || isNaN(days) || days < 1) {
        errDays.textContent = 'Please enter a valid number of days (minimum 1).';
        daysEl.classList.add('input-error');
        isValid = false;
    } else if (days > 365) {
        errDays.textContent = 'Trip cannot be longer than 365 days.';
        daysEl.classList.add('input-error');
        isValid = false;
    }

    /* Validate daily budget */
    var daily = parseFloat(dailyEl.value);
    if (!dailyEl.value || isNaN(daily) || daily < 1) {
        errDaily.textContent = 'Please enter a valid daily budget (minimum £1).';
        dailyEl.classList.add('input-error');
        isValid = false;
    }

    return isValid;
}

/* ---- Calculate and Display Results ---- */

function calculateBudget() {
    if (!validateBudgetForm()) return;

    var destId  = parseInt(document.getElementById('budget-destination').value);
    var days    = parseInt(document.getElementById('budget-days').value);
    var daily   = parseFloat(document.getElementById('budget-daily').value);
    var total   = days * daily;
    var status  = getBudgetStatus(daily);
    var dest    = destinations.find(function(d) { return d.id === destId; });

    /* Store result for saving later */
    lastResult = {
        destination: dest ? dest.name : 'Unknown',
        days: days,
        daily: daily,
        total: total,
        status: status.label,
        savedOn: new Date().toLocaleDateString()
    };

    /* Show the results card */
    var resultsEl = document.getElementById('budget-results');
    resultsEl.classList.add('visible');

    /* Animate the total counter */
    animateCounter(document.getElementById('result-total'), total, 1200);

    /* Set the budget status badge */
    var badge = document.getElementById('budget-status-badge');
    badge.textContent = status.label;
    badge.className = 'budget-status-badge ' + status.cssClass;

    /* Animate the progress bar */
    var fill = document.getElementById('progress-bar-fill');
    var wrap = document.getElementById('progress-bar-wrap');
    fill.className = 'progress-bar-fill ' + status.fillClass;
    fill.style.width = '0%';
    wrap.setAttribute('aria-valuenow', status.percent);

    /* Slight delay so the transition is visible */
    setTimeout(function() {
        fill.style.width = status.percent + '%';
    }, 100);

    /* Show breakdown text */
    var breakdown = document.getElementById('result-breakdown');
    breakdown.textContent = days + ' days × £' + daily.toFixed(2) + '/day = £' + total.toLocaleString() + ' total' +
                            (dest ? ' in ' + dest.name : '');

    /* Scroll to results */
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ---- Save Budget to localStorage ---- */

function saveBudget() {
    if (!lastResult) return;

    var saved = loadFromStorage('tn_budgets') || [];
    saved.push(lastResult);
    saveToStorage('tn_budgets', saved);

    showToast('Budget saved for ' + lastResult.destination + '!', 'success');
    loadSavedBudgets();
}

/* ---- Load and Display Saved Budgets ---- */

function loadSavedBudgets() {
    var saved = loadFromStorage('tn_budgets') || [];
    var listEl = document.getElementById('saved-budgets-list');
    var noMsg  = document.getElementById('no-saved-msg');
    var clearBtn = document.getElementById('clear-all-budgets-btn');

    if (!listEl) return;

    if (saved.length === 0) {
        listEl.innerHTML = '';
        if (noMsg) noMsg.style.display = 'block';
        if (clearBtn) clearBtn.style.display = 'none';
        return;
    }

    if (noMsg) noMsg.style.display = 'none';
    if (clearBtn) clearBtn.style.display = 'inline-block';

    var html = '';
    saved.forEach(function(item, index) {
        html += '<div class="saved-budget-item">';
        html += '  <div>';
        html += '    <strong>' + item.destination + '</strong>';
        html += '    <p style="font-size: 0.82rem; color: var(--text-light); margin-top: 0.15rem;">' + item.days + ' days · £' + item.daily + '/day · ' + item.savedOn + '</p>';
        html += '  </div>';
        html += '  <span>£' + item.total.toLocaleString() + ' <small style="color: var(--text-light); font-weight: 400;">(' + item.status + ')</small></span>';
        html += '</div>';
    });

    listEl.innerHTML = html;
}

/* ---- Initialise Budget Page ---- */
document.addEventListener('DOMContentLoaded', function() {

    populateDestinationDropdown();
    loadSavedBudgets();

    /* Form submit */
    var form = document.getElementById('budget-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            calculateBudget();
        });
    }

    /* Save button */
    var saveBtn = document.getElementById('save-budget-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveBudget);
    }

    /* Clear form button */
    var clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            document.getElementById('budget-form').reset();
            document.getElementById('budget-results').classList.remove('visible');
            lastResult = null;
            /* Clear error messages */
            ['err-destination', 'err-days', 'err-daily'].forEach(function(id) {
                var el = document.getElementById(id);
                if (el) el.textContent = '';
            });
            ['budget-destination', 'budget-days', 'budget-daily'].forEach(function(id) {
                var el = document.getElementById(id);
                if (el) el.classList.remove('input-error');
            });
        });
    }

    /* Clear all saved budgets button */
    var clearAllBtn = document.getElementById('clear-all-budgets-btn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function() {
            saveToStorage('tn_budgets', []);
            loadSavedBudgets();
            showToast('All saved budgets cleared.', 'info');
        });
    }
});
