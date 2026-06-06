/* ============================================================
   TravelNest - Feedback & Support Page JavaScript
   Handles: form validation, localStorage submission, FAQ accordion
   ============================================================ */

/* ---- Form Validation ---- */

/*
 * Validates all three form fields.
 * Returns true if everything is valid, false otherwise.
 * Shows specific error messages under each invalid field.
 */
function validateFeedbackForm() {
    var isValid = true;

    var nameEl    = document.getElementById('fb-name');
    var emailEl   = document.getElementById('fb-email');
    var messageEl = document.getElementById('fb-message');

    var errName    = document.getElementById('err-name');
    var errEmail   = document.getElementById('err-email');
    var errMessage = document.getElementById('err-message');

    /* Clear previous errors */
    errName.textContent    = '';
    errEmail.textContent   = '';
    errMessage.textContent = '';
    nameEl.classList.remove('input-error');
    emailEl.classList.remove('input-error');
    messageEl.classList.remove('input-error');

    /* Validate name (must be at least 2 characters) */
    var name = nameEl.value.trim();
    if (!name) {
        errName.textContent = 'Please enter your full name.';
        nameEl.classList.add('input-error');
        nameEl.focus();
        isValid = false;
    } else if (name.length < 2) {
        errName.textContent = 'Name must be at least 2 characters.';
        nameEl.classList.add('input-error');
        isValid = false;
    }

    /* Validate email using regex */
    var email = emailEl.value.trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errEmail.textContent = 'Please enter your email address.';
        emailEl.classList.add('input-error');
        if (isValid) emailEl.focus();
        isValid = false;
    } else if (!emailRegex.test(email)) {
        errEmail.textContent = 'Please enter a valid email address (e.g. name@example.com).';
        emailEl.classList.add('input-error');
        isValid = false;
    }

    /* Validate message (must be at least 10 characters) */
    var message = messageEl.value.trim();
    if (!message) {
        errMessage.textContent = 'Please enter your message.';
        messageEl.classList.add('input-error');
        if (isValid) messageEl.focus();
        isValid = false;
    } else if (message.length < 10) {
        errMessage.textContent = 'Message must be at least 10 characters long.';
        messageEl.classList.add('input-error');
        isValid = false;
    }

    return isValid;
}

/* ---- Handle Form Submission ---- */

function handleFeedbackSubmit(event) {
    event.preventDefault();

    /* Only proceed if validation passes */
    if (!validateFeedbackForm()) return;

    var name    = document.getElementById('fb-name').value.trim();
    var email   = document.getElementById('fb-email').value.trim();
    var message = document.getElementById('fb-message').value.trim();

    /* Build feedback object and save to localStorage */
    var feedback = {
        name: name,
        email: email,
        message: message,
        submittedOn: new Date().toLocaleString()
    };

    var allFeedback = loadFromStorage('tn_feedback') || [];
    allFeedback.push(feedback);
    saveToStorage('tn_feedback', allFeedback);

    /* Show confirmation message, hide the form */
    var formCard    = document.getElementById('feedback-form-card');
    var successMsg  = document.getElementById('form-success');

    if (formCard)   formCard.style.display   = 'none';
    if (successMsg) successMsg.classList.add('visible');

    /* Move focus to the confirmation for accessibility */
    if (successMsg) successMsg.focus();
}

/* ---- FAQ Accordion ---- */

/*
 * Handles the FAQ accordion click events.
 * When a question button is clicked, its answer panel slides open
 * and all other panels close (one-open-at-a-time behaviour).
 */
function initAccordion() {
    var accordion = document.getElementById('faq-accordion');
    if (!accordion) return;

    var buttons = accordion.querySelectorAll('.accordion-btn');

    buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var contentId = btn.getAttribute('aria-controls');
            var content   = document.getElementById(contentId);
            var isOpen    = btn.getAttribute('aria-expanded') === 'true';

            /* Close all other open items first */
            buttons.forEach(function(otherBtn) {
                var otherContentId = otherBtn.getAttribute('aria-controls');
                var otherContent   = document.getElementById(otherContentId);
                otherBtn.setAttribute('aria-expanded', 'false');
                if (otherContent) otherContent.classList.remove('accordion-open');
            });

            /* If this item was closed, open it now */
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                if (content) content.classList.add('accordion-open');
            }
        });
    });
}

/* ---- Initialise Feedback Page ---- */
document.addEventListener('DOMContentLoaded', function() {

    initAccordion();

    /* Form submit handler */
    var form = document.getElementById('feedback-form');
    if (form) {
        form.addEventListener('submit', handleFeedbackSubmit);
    }

    /* "Send Another Message" button resets and shows the form again */
    var sendAgainBtn = document.getElementById('send-another-btn');
    if (sendAgainBtn) {
        sendAgainBtn.addEventListener('click', function() {
            var formCard   = document.getElementById('feedback-form-card');
            var successMsg = document.getElementById('form-success');
            var form       = document.getElementById('feedback-form');

            if (form)       form.reset();
            if (successMsg) successMsg.classList.remove('visible');
            if (formCard)   formCard.style.display = 'block';

            /* Clear any lingering error messages */
            ['err-name', 'err-email', 'err-message'].forEach(function(id) {
                var el = document.getElementById(id);
                if (el) el.textContent = '';
            });
            ['fb-name', 'fb-email', 'fb-message'].forEach(function(id) {
                var el = document.getElementById(id);
                if (el) el.classList.remove('input-error');
            });
        });
    }
});
