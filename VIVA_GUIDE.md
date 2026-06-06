# TravelNest — Viva Guide
## COMP40053 Assignment 3

Read this before your viva. After reading it you should be able to answer any question your lecturer asks.

---

## 1. What is TravelNest and what does it do?

TravelNest is a travel planning website I built using only HTML, CSS, and JavaScript. It has 6 pages: a Home page, a Destination Explorer, a Budget Planner, a Random Trip Generator, a Travel Mood page, and a Feedback page. The whole idea is to let users explore travel destinations, plan their budget, and keep track of places they want to visit — all in one place.

---

## 2. File Structure — How is the project organised?

```
TravelNest/
├── index.html, destinations.html, budget.html,
│   generator.html, mood.html, feedback.html   ← the 6 pages
├── css/style.css        ← all the styling in one file
├── js/data.js           ← all destination data (12 destinations)
├── js/utils.js          ← shared functions used on every page
├── js/home.js, destinations.js, budget.js,
│   generator.js, mood.js, feedback.js         ← page-specific JS
├── manifest.json + sw.js  ← makes it a PWA
└── images/favicon.svg, icon.svg
```

I separated the JS into individual files because it keeps the code clean and easier to manage. `utils.js` holds functions that are shared across all pages (like saving to localStorage and showing toast notifications).

---

## 3. HTML — How did you structure each page?

I used **semantic HTML**, which means I used tags that describe what the content actually is, not just how it looks.

- `<header>` — wraps the navigation bar
- `<nav>` — marks the navigation links
- `<main>` — wraps the main content of each page
- `<section>` — a distinct section of a page (e.g. hero, features)
- `<article>` — a self-contained piece of content (e.g. a feature card)
- `<footer>` — wraps the page footer

This matters because screen readers and search engines understand the page better when you use semantic tags.

Every page also has:
- `<!DOCTYPE html>` — tells the browser it's HTML5
- `<html lang="en">` — tells screen readers the language is English
- `<meta charset="UTF-8">` — sets the character encoding
- `<meta name="viewport">` — makes it work properly on mobile
- `<meta name="description">` — a short description for SEO

---

## 4. CSS — How did you style the site?

All styling is in one file: `css/style.css`. I organised it into labelled sections using comments so it's easy to find things.

### CSS Custom Properties (Variables)
At the top of the CSS file I defined colour and font variables using `:root`:
```css
:root {
    --primary: #1e40af;   /* blue */
    --accent: #f59e0b;    /* amber/orange */
}
```
This means if I want to change the main blue colour, I only change it in one place and it updates everywhere.

### Mobile-First Design
I wrote the base CSS for small screens first (mobile), then used `@media (min-width: 768px)` to add styles for larger screens. This is called mobile-first design — you start small and add more as the screen gets bigger.

### Flexbox
I used Flexbox for the navigation bar and anywhere I needed items side by side. For example:
```css
.navbar { display: flex; justify-content: space-between; align-items: center; }
```
Flexbox makes it easy to line things up horizontally and control spacing.

### CSS Grid
I used CSS Grid for the hero section (text on the left, image on the right as the assignment requires):
```css
.hero-grid { display: grid; grid-template-columns: 1fr 1fr; }
```
On mobile it's `1fr` (single column, stacks vertically). On desktop it becomes `1fr 1fr` (two equal columns).

### CSS Animations
I wrote custom `@keyframes` animations. For example:
```css
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes spin   { to { transform: rotate(360deg); } }
@keyframes bounce { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }
```
These are used on buttons (hover), the loading spinner, and the "Surprise Me Again" button.

---

## 5. JavaScript — General Concepts

### Event Listeners
I use `addEventListener` to react to user actions. For example:
```javascript
button.addEventListener('click', function() { /* do something */ });
```
This is how all buttons, form submissions, and keyboard interactions work.

### DOM Manipulation
DOM stands for Document Object Model — it's basically the HTML page as a JavaScript object. I use `document.getElementById()` to find an element, then change its content:
```javascript
document.getElementById('dotd-name').textContent = 'Paris';
```

### Functions
I broke the code into small functions, each doing one job. This makes the code easier to read and reuse.

---

## 6. data.js — How is the destination data stored?

All 12 destination objects are in a JavaScript array called `destinations`. Each object has the same structure:
```javascript
{
    id: 1,
    name: "Paris",
    country: "France",
    continent: "Europe",
    image: "https://images.unsplash.com/...",
    description: "Paris is...",
    attractions: ["Eiffel Tower", "The Louvre", ...],
    costs: [
        { category: "Accommodation", budget: "£40/night", moderate: "£100/night", luxury: "£300+/night" },
        ...
    ],
    travelType: ["cultural", "relaxation"],
    budgetRange: ["medium", "high"]
}
```
Using an array of objects means I can loop through them, filter them, and display them dynamically with JavaScript — I never hard-code destination details in the HTML.

---

## 7. utils.js — What shared functions do you have?

These functions are loaded on every page and can be called from any page-specific JS file.

| Function | What it does |
|---|---|
| `saveToStorage(key, value)` | Converts value to JSON and saves it to localStorage |
| `loadFromStorage(key)` | Reads from localStorage and parses the JSON back |
| `showToast(message, type)` | Creates a small pop-up notification at the bottom of the screen |
| `initScrollReveal()` | Uses IntersectionObserver to animate elements as they scroll into view |
| `initHamburger()` | Handles the mobile hamburger menu toggle |
| `initNewsletter()` | Handles the footer newsletter form |

---

## 8. Home Page — How does the hero section work?

The hero uses a CSS Grid with two columns. Text is on the left, an image is on the right. Every 4 seconds, a `setInterval` runs the `showNextQuote()` function which:
1. Fades the text out (sets opacity to 0)
2. After 300ms, updates the quote text and author
3. Also changes the hero image to match the current destination
4. Fades back in

```javascript
setInterval(showNextQuote, 4000);
```

On mobile, CSS Grid switches to a single column so the image stacks below the text.

---

## 9. Home Page — How does Destination of the Day work?

This uses JavaScript's `Date` object to figure out what day of the year it is, then uses that number to pick a destination:

```javascript
var today = new Date();
var startOfYear = new Date(today.getFullYear(), 0, 1);
var dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));
var index = dayOfYear % destinations.length;
var dest = destinations[index];
```

The `%` (modulo) operator wraps around so it never goes out of bounds. Because we use the day of the year, the same destination shows all day and changes automatically at midnight — no manual updates needed.

---

## 10. Destination Explorer — How do the cards render?

I have a function called `renderCards(list)` that takes an array of destinations and builds HTML strings for each card, then injects them into the page:

```javascript
list.forEach(function(dest) {
    html += '<article class="dest-card">';
    html += '  <img src="' + dest.image + '" alt="' + dest.name + '">';
    html += '  <h3>' + dest.name + '</h3>';
    html += '</article>';
});
grid.innerHTML = html;
```

Then I add `click` event listeners to each card so when clicked, the `openModal()` function runs.

### How does filtering work?

The `filterDestinations()` function reads the search input and continent dropdown values, then uses JavaScript's `.filter()` method to create a new array containing only the matching destinations:

```javascript
var filtered = destinations.filter(function(dest) {
    var matchesName = dest.name.toLowerCase().includes(searchVal);
    var matchesContinent = continentVal === 'all' || dest.continent === continentVal;
    return matchesName && matchesContinent;
});
renderCards(filtered);
```

The `.includes()` method checks if one string contains another. This runs on every keystroke in the search box using an `input` event listener.

---

## 11. Destination Explorer — How does the modal work?

When a card is clicked, `openModal(id)` runs. It:
1. Finds the destination from the array using `.find()`
2. Fills in all the modal's HTML elements with that destination's data
3. Builds the attractions as `<li>` elements in a loop
4. Builds the cost table as `<tr>/<td>` elements in a loop
5. Adds the CSS class `modal-open` to make it visible

```javascript
overlay.classList.add('modal-open');
document.body.style.overflow = 'hidden'; // stops background scrolling
```

To close it: clicking the X button, clicking the dark background, or pressing Escape all call `closeModal()` which removes the class.

---

## 12. Budget Planner — How does it calculate the budget?

The form has three inputs: destination, number of days, and daily budget.

When submitted, JavaScript validates all three fields (checks they're not empty, that days is a positive number, etc.). If valid it calculates:

```javascript
var total = days * daily;  // e.g. 7 days × £80 = £560
```

Then it classifies the budget status based on daily spend:
- **Low**: ≤ £50/day
- **Moderate**: £51–£150/day  
- **Luxury**: > £150/day

### How does the animated counter work?

I use `requestAnimationFrame` which is a browser method that calls a function before the next screen repaint (roughly 60 times per second). Each frame I increase the current number slightly until it reaches the target:

```javascript
function animateCounter(element, target, duration) {
    var startTime = null;
    function step(timestamp) {
        var progress = (timestamp - startTime) / duration;
        element.textContent = '£' + Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}
```

### How does the progress bar animate?

The progress bar is a `<div>` with `width: 0%` in CSS. After calculating the budget I set its width in JavaScript. Because the CSS has `transition: width 1.2s ease`, it smoothly animates to the new width:

```javascript
fill.style.width = '65%';  // CSS transition handles the animation
```

---

## 13. Random Trip Generator — How does it work?

The user picks a travel type (adventure, relaxation, cultural, nature) and a budget range (low, medium, high). JavaScript filters the destinations array to find matches:

```javascript
var filtered = destinations.filter(function(dest) {
    var typeMatch   = travelType === 'any' || dest.travelType.includes(travelType);
    var budgetMatch = budgetRange === 'any' || dest.budgetRange.includes(budgetRange);
    return typeMatch && budgetMatch;
});
```

Then it picks one at random:
```javascript
var randomIndex = Math.floor(Math.random() * filtered.length);
return filtered[randomIndex];
```

`Math.random()` gives a decimal between 0 and 1. Multiplying by the array length and using `Math.floor` gives a whole number index.

### How does the "Surprise Me Again" button animation work?

The button has a CSS animation called `bounce` defined in `@keyframes`. Clicking it adds a CSS class called `bouncing`, which triggers the animation. After 500ms (when the animation finishes) I remove the class so it can be re-triggered next click:

```javascript
surpriseBtn.classList.add('bouncing');
setTimeout(function() {
    surpriseBtn.classList.remove('bouncing');
}, 500);
```

---

## 14. Travel Mood — How do the ambient sounds work?

I used the **Web Audio API**, which is built into all modern browsers. It lets you generate sounds with code — no audio files needed.

The idea is:
1. Create an `AudioContext` (the audio engine)
2. Create a buffer of random numbers — this is called **white noise**
3. Connect it through a **BiquadFilter** (a sound filter) which changes the character of the noise
4. Connect that to the speakers via a **GainNode** (volume control)

```javascript
var audioCtx = new AudioContext();
var source = audioCtx.createBufferSource(); // white noise
var filter = audioCtx.createBiquadFilter();
filter.type = 'lowpass';      // only lets low frequencies through
filter.frequency.value = 450; // cuts off above 450 Hz
source.connect(filter);
filter.connect(audioCtx.destination); // destination = speakers
source.start();
```

- **Beach**: low-pass filter (low frequencies = rolling waves)
- **Forest**: band-pass filter (mid frequencies = rain and wind)
- **City**: low-pass filter + extra oscillator at 60Hz (deep traffic hum)

If you click a sound that's already playing, it stops (toggle behaviour). The "Stop" button calls `stopAllSounds()`.

---

## 15. Travel Mood — How does destination tracking work?

Each destination in the tracking grid has two buttons: `Visited` and `Planned`. When either is clicked, `toggleTracking(action, id)` runs.

It loads the current list from localStorage, checks if the destination ID is already in it, and either adds or removes it:

```javascript
var index = list.indexOf(id);
if (index === -1) {
    list.push(id);      // add it
} else {
    list.splice(index, 1); // remove it
}
saveToStorage(key, list);
```

The visited and planned lists are stored separately — `tn_visited` and `tn_planned` — so a destination can be in both, one, or neither.

---

## 16. Feedback Page — How does form validation work?

I validate the form before it submits by checking each field manually. For example:

```javascript
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    errEmail.textContent = 'Please enter a valid email address.';
}
```

The `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` is a **regular expression** (regex). It checks that the email has characters, then an `@`, then more characters, then a `.`, then more characters. If the test fails, I show an error message and stop the form from submitting.

On success, I store the feedback in localStorage and hide the form, replacing it with a green confirmation message.

---

## 17. FAQ Accordion — How does it work?

Each FAQ item has a `<button>` and a `<div>` for the answer. The answer div has `max-height: 0` and `overflow: hidden` in CSS, making it invisible.

When the button is clicked, JavaScript adds the class `accordion-open` to the answer div. The CSS then changes `max-height` to `400px`:

```css
.accordion-content.accordion-open { max-height: 400px; }
```

Because I have `transition: max-height 0.35s ease` on the element, it slides open smoothly. I also close any other open item first, so only one is open at a time.

---

## 18. localStorage — What is it and why did you use it?

`localStorage` is a storage space in the browser that keeps data even after you close the tab. I use it to store:

| Key | What it stores |
|---|---|
| `tn_subscribers` | Newsletter email addresses |
| `tn_budgets` | Saved trip budgets |
| `tn_wishlist` | Saved destinations from the generator |
| `tn_visited` | IDs of visited destinations |
| `tn_planned` | IDs of planned destinations |
| `tn_feedback` | Submitted feedback messages |

localStorage only stores strings, so I use `JSON.stringify()` to convert objects to strings before saving, and `JSON.parse()` to convert them back when loading.

---

## 19. Scroll Reveal — How do elements animate as you scroll?

I use the `IntersectionObserver` API. This watches a list of elements and fires a function whenever one enters the viewport (the visible part of the screen).

```javascript
var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // stop watching once done
        }
    });
}, { threshold: 0.12 }); // trigger when 12% of the element is visible
```

Elements start with `opacity: 0; transform: translateY(28px)` (invisible, shifted down). When the class `revealed` is added, the CSS transition animates them to `opacity: 1; transform: translateY(0)`.

---

## 20. Hamburger Menu — How does it work?

On mobile, the nav links are hidden (`display: none`). There is a hamburger button with three `<span>` bars.

When the button is clicked, JavaScript toggles the class `nav-open` on the nav list (making it visible) and `hamburger-active` on the button. The CSS transforms the three bars into an X using `transform: rotate()`:

```css
.hamburger-active .bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger-active .bar:nth-child(2) { opacity: 0; }
.hamburger-active .bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
```

On desktop (768px+), the hamburger is `display: none` and nav links are always visible as a row.

---

## 21. PWA — What is it and how did you implement it?

PWA stands for **Progressive Web App**. It means the website can be installed on a phone's home screen and works offline.

Two files make this work:

**manifest.json** — tells the browser the app's name, icon, and how it should look when installed:
```json
{
  "name": "TravelNest",
  "display": "standalone",
  "start_url": ".",
  "icons": [{ "src": "images/icon.svg", "sizes": "any" }]
}
```

**sw.js (Service Worker)** — a script that runs in the background. On the first visit it caches (saves) all the HTML, CSS, and JS files. On future visits it serves from the cache instead of downloading everything again. This makes it work offline.

```javascript
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cached) {
            return cached || fetch(event.request); // cache first, network as fallback
        })
    );
});
```

---

## 22. Accessibility — What did you do for it?

- **Skip link** — the first element on every page is `<a href="#main-content">Skip to main content</a>`. Keyboard users can jump straight to the content past the navbar.
- **Alt text** — every `<img>` has an `alt` attribute describing what it shows
- **Form labels** — every `<input>` has a `<label>` with a matching `for` attribute
- **ARIA attributes** — `aria-expanded` on the hamburger, `aria-live` on dynamic content, `aria-label` on icon buttons
- **Colour contrast** — dark text on light backgrounds, white text on dark backgrounds
- **Heading order** — I never skip heading levels (always h1 → h2 → h3)

---

## 23. Testing — How did/would you test it?

| Test | Tool | What it checks |
|---|---|---|
| HTML Validity | W3C Markup Validator (validator.w3.org) | No syntax errors in HTML |
| CSS Validity | W3C CSS Validator (jigsaw.w3.org) | No invalid CSS properties |
| Accessibility | WAVE Tool (wave.webaim.org) | Missing labels, contrast, heading order |
| Performance | Google Lighthouse (Chrome DevTools) | Load speed, SEO, accessibility score |
| Responsiveness | Chrome DevTools device toolbar | Layout at 320px, 768px, 1024px+ |

---

## 24. Quick-fire Questions & Answers

**Q: Why did you use JavaScript instead of a framework like React?**  
A: The assignment specifically requires HTML, CSS, and JavaScript only — no frameworks.

**Q: What is the difference between `var`, `let`, and `const`?**  
A: `var` is the older way to declare a variable. `let` is block-scoped (only exists inside its `{}`). `const` is for values that don't change. I mostly used `var` and `let`.

**Q: What is JSON?**  
A: JSON stands for JavaScript Object Notation. It's a text format for storing data. It looks like a JavaScript object but is always a string. I use `JSON.stringify()` to convert to JSON and `JSON.parse()` to convert back.

**Q: Why do you have a separate data.js file?**  
A: Separating the data from the logic means if I need to add a new destination, I only edit `data.js`. All pages automatically get the new destination without changing any other code.

**Q: What is `Math.random()`?**  
A: It returns a random decimal number between 0 and 1. To get a random index into an array of length N, I do `Math.floor(Math.random() * N)`. `Math.floor` rounds down to the nearest whole number.

**Q: What is `Array.filter()`?**  
A: It creates a new array containing only the items that pass a test. The test is a function that returns `true` (keep) or `false` (remove). The original array is not changed.

**Q: What is `Array.find()`?**  
A: Similar to filter but returns just the first matching item (not an array). I use it to find a single destination by ID.

**Q: What does `event.preventDefault()` do?**  
A: It stops the browser's default behaviour. On a form, the default is to reload the page when submitted. I call `preventDefault()` so I can handle the submission with JavaScript instead.

**Q: What is `this` in JavaScript?**  
A: It refers to the object that called the function. Inside an event listener, `this` is the element that was clicked.

**Q: Why does the Destination of the Day use modulo (`%`)?**  
A: There are 12 destinations. The day of the year can be up to 365. Without modulo, the index would go out of bounds. `365 % 12 = 5`, so it wraps around and always gives a valid index.

**Q: What is `requestAnimationFrame`?**  
A: It's a browser method that calls your function just before the screen repaints (about 60 times per second). It's smoother than `setInterval` for animations because it syncs with the screen's refresh rate.

---

*Good luck in your viva. You built this — you can explain it.*
