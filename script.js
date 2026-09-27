// ---- floating petals on the gate ----
const gate = document.getElementById('gate');
const petalChars = ['🌸', '🌿', '✿'];
for (let i = 0; i < 10; i++) {
  const p = document.createElement('span');
  p.className = 'petal';
  p.textContent = petalChars[i % petalChars.length];
  p.style.left = Math.random() * 100 + '%';
  p.style.animationDuration = (10 + Math.random() * 8) + 's';
  p.style.animationDelay = (Math.random() * 6) + 's';
  p.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
  gate.appendChild(p);
}

// ---- music: try the real song file first, fall back to a gentle synthesized pad ----
const bgSong = document.getElementById('bgSong');
let usingRealSong = true;
let musicOn = false;

let audioCtx, masterGain, ambientNodes = [];
function startAmbientFallback() {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.0001;
    masterGain.connect(audioCtx.destination);
    masterGain.gain.exponentialRampToValueAtTime(0.11, audioCtx.currentTime + 3);

    const chord = [196.00, 246.94, 293.66, 392.00];
    chord.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const voiceGain = audioCtx.createGain();
      voiceGain.gain.value = 0.22 / (i + 1);

      const lfo = audioCtx.createOscillator();
      lfo.frequency.value = 0.06 + i * 0.015;
      const lfoGain = audioCtx.createGain();
      lfoGain.gain.value = 0.06;
      lfo.connect(lfoGain);
      lfoGain.connect(voiceGain.gain);

      osc.connect(voiceGain);
      voiceGain.connect(masterGain);
      osc.start();
      lfo.start();
      ambientNodes.push(osc, lfo);
    });
  } catch (e) { console.warn('Ambient audio unavailable', e); }
}
function stopAmbientFallback() {
  if (!audioCtx) return;
  masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
  setTimeout(() => {
    ambientNodes.forEach(n => { try { n.stop(); } catch (e) {} });
    ambientNodes = [];
    audioCtx.close();
    audioCtx = null;
  }, 1100);
}

function startMusic() {
  bgSong.volume = 0.5;
  const playPromise = bgSong.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => { usingRealSong = true; })
      .catch(() => { usingRealSong = false; startAmbientFallback(); });
  }
  musicOn = true;
}
function stopMusic() {
  if (usingRealSong) { bgSong.pause(); }
  else { stopAmbientFallback(); }
  musicOn = false;
}

document.getElementById('musicToggle').addEventListener('click', () => {
  if (musicOn) { stopMusic(); document.getElementById('musicToggle').textContent = '🔈'; }
  else { startMusic(); document.getElementById('musicToggle').textContent = '🔊'; }
});

// ---- name gate submit ----
document.getElementById('nameForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('nameInput').value.trim() || 'Guest';
  document.getElementById('greeting').textContent = 'Dear ' + name + ',';
  document.getElementById('gate').classList.add('hidden');
  document.getElementById('main').classList.add('show');
  startMusic();
});

// ---- lightbox ----
const cardImg = document.querySelector('#cardFrame img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.getElementById('cardFrame').addEventListener('click', () => {
  lightboxImg.src = cardImg.src;
  lightbox.classList.add('show');
});
lightbox.addEventListener('click', () => lightbox.classList.remove('show'));

// ---- RSVP / Contact placeholders ----
document.getElementById('rsvpBtn').addEventListener('click', (e) => {
  e.preventDefault();
  alert('RSVP form goes here — connect this to your form or sheet of choice.');
});
document.getElementById('contactBtn').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'mailto:host@example.com?subject=Freshers%20Party%20-%20Question';
});
