/* ============================================================
   TravelNest - Shared Utility Functions
   These functions are used across multiple pages.
   They are loaded on every page via a script tag.
   ============================================================ */

/* ---- localStorage helpers ---- */

/* Save any value to localStorage as a JSON string */
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/* Load a value from localStorage and parse it from JSON */
function loadFromStorage(key) {
    var item = localStorage.getItem(key);
    if (item) {
        try {
            return JSON.parse(item);
        } catch (e) {
            return null;
        }
    }
    return null;
}

/* ---- Toast notification ---- */

/* Show a brief pop-up notification message at the bottom of the screen */
function showToast(message, type) {
    /* Remove any existing toast first */
    var existing = document.getElementById('tn-toast');
    if (existing) {
        existing.remove();
    }

    var toast = document.createElement('div');
    toast.id = 'tn-toast';
    toast.className = 'toast toast-' + (type || 'info');
    toast.textContent = message;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);

    /* Small delay so the CSS transition plays */
    setTimeout(function() {
        toast.classList.add('toast-show');
    }, 10);

    /* Auto-remove after 3 seconds */
    setTimeout(function() {
        toast.classList.remove('toast-show');
        setTimeout(function() {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 400);
    }, 3000);
}

/* ---- Scroll Reveal Animation ---- */

/*
 * Uses the IntersectionObserver API to watch elements with class 'reveal'.
 * When an element scrolls into the viewport, the class 'revealed' is added,
 * which triggers the CSS fade-in animation.
 */
function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal');

    /* Fallback for browsers that do not support IntersectionObserver */
    if (!('IntersectionObserver' in window)) {
        elements.forEach(function(el) {
            el.classList.add('revealed');
        });
        return;
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                /* Stop watching once the element has been revealed */
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach(function(el) {
        observer.observe(el);
    });
}

/* ---- Hamburger Menu ---- */

/* Handles the mobile navigation hamburger toggle animation and functionality */
function initHamburger() {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function() {
        var isOpen = navLinks.classList.toggle('nav-open');
        hamburger.classList.toggle('hamburger-active');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* Close menu when a nav link is clicked (mobile UX) */
    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('nav-open');
            hamburger.classList.remove('hamburger-active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    /* Close menu when clicking outside of it */
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove('nav-open');
            hamburger.classList.remove('hamburger-active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ---- Newsletter Form ---- */

/* Handles the newsletter subscription in the footer - saves email to localStorage */
function initNewsletter() {
    var form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var emailInput = document.getElementById('newsletter-email');
        var msgEl = document.getElementById('newsletter-msg');
        var email = emailInput.value.trim();

        /* Email format validation using a regular expression */
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            msgEl.textContent = 'Please enter your email address.';
            msgEl.className = 'form-message error-msg';
            return;
        }

        if (!emailRegex.test(email)) {
            msgEl.textContent = 'Please enter a valid email address.';
            msgEl.className = 'form-message error-msg';
            return;
        }

        /* Check if this email is already subscribed */
        var subscribers = loadFromStorage('tn_subscribers') || [];

        if (subscribers.includes(email)) {
            msgEl.textContent = 'You are already subscribed!';
            msgEl.className = 'form-message info-msg';
            return;
        }

        /* Save the new subscriber */
        subscribers.push(email);
        saveToStorage('tn_subscribers', subscribers);

        emailInput.value = '';
        msgEl.textContent = 'Thank you for subscribing! Travel tips coming soon.';
        msgEl.className = 'form-message success-msg';
    });
}

/* ---- Service Worker Registration (PWA) ---- */

/* Registers the service worker so the site works as a PWA */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js').catch(function(err) {
            console.log('Service Worker registration failed:', err);
        });
    });
}

/* ---- Initialise shared features on every page load ---- */
document.addEventListener('DOMContentLoaded', function() {
    initHamburger();
    initScrollReveal();
    initNewsletter();
});
