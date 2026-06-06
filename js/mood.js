/* ============================================================
   TravelNest - Travel Mood Page JavaScript
   Handles: Web Audio API ambient sounds, visited/planned tracking
   ============================================================ */

/* ---- Web Audio API Ambient Sounds ---- */

/*
 * We use the Web Audio API which is built into all modern browsers.
 * It lets us generate sounds mathematically — no audio files needed.
 * Each sound is white noise filtered in different ways:
 *   Beach: low-pass filter (only low frequencies = rolling waves)
 *   Forest: band-pass filter (mid frequencies = rain and wind)
 *   City:  multiple oscillators (bass hum of traffic and buildings)
 */

var audioCtx      = null;
var currentNodes  = [];   /* Tracks active audio nodes so we can stop them */
var currentSound  = null; /* Name of the currently playing sound */

/* Creates and returns an AudioContext (lazy init to comply with browser rules) */
function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

/* Stops all currently playing audio nodes */
function stopAllSounds() {
    currentNodes.forEach(function(node) {
        try { node.stop(); } catch (e) { /* already stopped */ }
    });
    currentNodes = [];
    currentSound = null;

    /* Reset button styles */
    document.querySelectorAll('.sound-btn').forEach(function(btn) {
        btn.classList.remove('playing');
        btn.setAttribute('aria-pressed', 'false');
    });

    var statusEl = document.getElementById('sound-status');
    if (statusEl) statusEl.textContent = 'No sound playing.';
}

/* Creates a white noise buffer source (used for all ambient sounds) */
function createNoiseSource(ctx) {
    var bufferSize = ctx.sampleRate * 3; /* 3-second looping buffer */
    var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    var data = buffer.getChannelData(0);

    /* Fill with random values — this is white noise */
    for (var i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    var source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    return source;
}

/* Plays the Beach Waves sound (low-pass filtered noise) */
function playBeach() {
    var ctx = getAudioContext();

    var source = createNoiseSource(ctx);
    var filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 450;

    var gain = ctx.createGain();
    gain.gain.value = 0.25;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();

    currentNodes = [source];
}

/* Plays the Forest Rain sound (band-pass filtered noise) */
function playForest() {
    var ctx = getAudioContext();

    var source = createNoiseSource(ctx);
    var filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 0.3;

    var gain = ctx.createGain();
    gain.gain.value = 0.2;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();

    currentNodes = [source];
}

/* Plays the City Hum sound (oscillator + filtered noise) */
function playCity() {
    var ctx = getAudioContext();

    /* Low hum: oscillator at a low frequency */
    var osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 60;

    var oscGain = ctx.createGain();
    oscGain.gain.value = 0.04;

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start();

    /* Background traffic noise */
    var noise = createNoiseSource(ctx);
    var filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 280;

    var noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.12;

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start();

    currentNodes = [osc, noise];
}

/* Plays the selected sound and updates button state */
function playSound(soundName) {
    stopAllSounds();

    if (!soundName) return;

    if (soundName === 'beach')  playBeach();
    if (soundName === 'forest') playForest();
    if (soundName === 'city')   playCity();

    currentSound = soundName;

    /* Update button visual state */
    var activeBtn = document.getElementById('sound-' + soundName);
    if (activeBtn) {
        activeBtn.classList.add('playing');
        activeBtn.setAttribute('aria-pressed', 'true');
    }

    var soundNames = { beach: 'Beach Waves', forest: 'Forest Rain', city: 'City Hum' };
    var statusEl = document.getElementById('sound-status');
    if (statusEl) statusEl.textContent = 'Now playing: ' + (soundNames[soundName] || soundName);
}

/* ---- Destination Tracking ---- */

/* Renders the list of all destinations with Visited / Planned buttons */
function renderMoodDestinations() {
    var grid = document.getElementById('mood-dest-grid');
    if (!grid) return;

    var visited = loadFromStorage('tn_visited') || [];
    var planned  = loadFromStorage('tn_planned')  || [];

    var html = '';
    destinations.forEach(function(dest) {
        var isVisited = visited.includes(dest.id);
        var isPlanned  = planned.includes(dest.id);

        html += '<div class="mood-dest-item reveal" data-id="' + dest.id + '">';
        html += '  <img class="mood-dest-img" src="' + dest.image + '" alt="' + dest.name + '" width="64" height="64" loading="lazy">';
        html += '  <div class="mood-dest-info">';
        html += '    <strong>' + dest.name + '</strong>';
        html += '    <span>' + dest.country + '</span>';
        html += '    <div class="mood-dest-status">';
        if (isVisited) html += '<span class="status-badge badge-visited">&#10003; Visited</span>';
        if (isPlanned)  html += '<span class="status-badge badge-planned">&#128197; Planned</span>';
        html += '    </div>';
        html += '  </div>';
        html += '  <div class="mood-dest-actions">';
        html += '    <button type="button" class="btn btn-sm ' + (isVisited ? 'btn-primary' : 'btn-outline') + '" data-action="visited" data-id="' + dest.id + '" aria-label="Mark ' + dest.name + ' as visited">';
        html += isVisited ? '&#10003; Visited' : 'Visited';
        html += '    </button>';
        html += '    <button type="button" class="btn btn-sm ' + (isPlanned ? 'btn-accent' : 'btn-outline') + '" data-action="planned" data-id="' + dest.id + '" aria-label="Mark ' + dest.name + ' as planned">';
        html += isPlanned ? '&#128197; Planned' : 'Plan';
        html += '    </button>';
        html += '  </div>';
        html += '</div>';
    });

    grid.innerHTML = html;
    initScrollReveal();

    /* Add click listeners to all tracking buttons */
    grid.querySelectorAll('button[data-action]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var action = btn.getAttribute('data-action');
            var id     = parseInt(btn.getAttribute('data-id'));
            toggleTracking(action, id);
        });
    });
}

/* Toggles a destination's visited or planned status */
function toggleTracking(action, id) {
    var key  = action === 'visited' ? 'tn_visited' : 'tn_planned';
    var list = loadFromStorage(key) || [];
    var dest = destinations.find(function(d) { return d.id === id; });

    var index = list.indexOf(id);
    if (index === -1) {
        list.push(id);
        showToast(dest.name + ' marked as ' + action + '!', 'success');
    } else {
        list.splice(index, 1);
        showToast(dest.name + ' removed from ' + action + '.', 'info');
    }

    saveToStorage(key, list);
    renderMoodDestinations();
    updateTrackingSummary();
    renderTrackingLists();
}

/* Updates the visited and planned count badges */
function updateTrackingSummary() {
    var visited  = loadFromStorage('tn_visited') || [];
    var planned   = loadFromStorage('tn_planned')  || [];

    var vCount = document.getElementById('visited-count');
    var pCount = document.getElementById('planned-count');

    if (vCount) vCount.textContent = visited.length;
    if (pCount) pCount.textContent  = planned.length;
}

/* Renders the visited and planned summary tag lists */
function renderTrackingLists() {
    var visited  = loadFromStorage('tn_visited') || [];
    var planned   = loadFromStorage('tn_planned')  || [];

    var vList = document.getElementById('visited-list');
    var pList = document.getElementById('planned-list');

    /* Visited list */
    if (vList) {
        if (visited.length === 0) {
            vList.innerHTML = '<p style="color: var(--text-light); font-size: 0.9rem;">No visited destinations yet.</p>';
        } else {
            var vHtml = '';
            visited.forEach(function(id) {
                var dest = destinations.find(function(d) { return d.id === id; });
                if (dest) vHtml += '<span class="tracking-tag">&#10003; ' + dest.name + '</span>';
            });
            vList.innerHTML = vHtml;
        }
    }

    /* Planned list */
    if (pList) {
        if (planned.length === 0) {
            pList.innerHTML = '<p style="color: var(--text-light); font-size: 0.9rem;">No planned destinations yet.</p>';
        } else {
            var pHtml = '';
            planned.forEach(function(id) {
                var dest = destinations.find(function(d) { return d.id === id; });
                if (dest) pHtml += '<span class="tracking-tag planned-tag">&#128197; ' + dest.name + '</span>';
            });
            pList.innerHTML = pHtml;
        }
    }
}

/* ---- Initialise Mood Page ---- */
document.addEventListener('DOMContentLoaded', function() {

    /* Render destination tracking grid */
    renderMoodDestinations();
    updateTrackingSummary();
    renderTrackingLists();

    /* Sound button listeners */
    document.querySelectorAll('.sound-btn[data-sound]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var sound = btn.getAttribute('data-sound');
            /* If this sound is already playing, stop it (toggle off) */
            if (currentSound === sound) {
                stopAllSounds();
            } else {
                playSound(sound);
            }
        });
    });

    /* Stop sound button */
    var stopBtn = document.getElementById('sound-off');
    if (stopBtn) {
        stopBtn.addEventListener('click', stopAllSounds);
    }

    /* Reset tracking button */
    var clearBtn = document.getElementById('clear-tracking-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            saveToStorage('tn_visited', []);
            saveToStorage('tn_planned',  []);
            renderMoodDestinations();
            updateTrackingSummary();
            renderTrackingLists();
            showToast('Tracking reset.', 'info');
        });
    }
});
