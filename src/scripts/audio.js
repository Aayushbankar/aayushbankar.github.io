/* Web Audio API procedural sound engine
   100% zero-asset, zero-network, ultra-lightweight mechanical cybernetic haptics.
   Progressive enhancement: Muted by default or respects user choice stored in localStorage. */

let audioCtx = null;
let soundEnabled = false;

export function isAudioEnabled() {
  return soundEnabled;
}

export function initAudio() {
  if (typeof window === 'undefined') return;
  soundEnabled = localStorage.getItem('dossier_sfx') === 'true';
  updateSoundUI();

  const toggleBtn = document.getElementById('dossier-sound-toggle');
  if (toggleBtn) {
    toggleBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleAudio();
    };
  }
}

export function toggleAudio() {
  soundEnabled = !soundEnabled;
  if (typeof window !== 'undefined') {
    localStorage.setItem('dossier_sfx', String(soundEnabled));
  }
  updateSoundUI();
  if (soundEnabled) {
    ensureContext();
    playBleep(880, 0.08, 'sine');
  }
}

function ensureContext() {
  if (typeof window === 'undefined') return;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export function playBleep(freq = 1100, duration = 0.05, type = 'sine') {
  if (!soundEnabled) return;
  try {
    ensureContext();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

export function playSelect() {
  if (!soundEnabled) return;
  playBleep(880, 0.04, 'sine');
  setTimeout(() => playBleep(1320, 0.06, 'sine'), 50);
}

export function playSuccess() {
  if (!soundEnabled) return;
  playBleep(990, 0.05, 'triangle');
  setTimeout(() => playBleep(1485, 0.08, 'triangle'), 60);
}

export function playOpen() {
  if (!soundEnabled) return;
  try {
    ensureContext();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(640, audioCtx.currentTime + 0.09);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (e) {}
}

export function updateSoundUI() {
  if (typeof document === 'undefined') return;
  const toggleBtn = document.getElementById('dossier-sound-toggle');
  const soundLabel = document.getElementById('sound-label');
  if (soundLabel) {
    soundLabel.textContent = soundEnabled ? 'SFX ON' : 'SFX';
  }
  if (toggleBtn) {
    toggleBtn.classList.toggle('sfx-active', soundEnabled);
    toggleBtn.setAttribute('title', soundEnabled ? 'Audio FX: Active (click to mute)' : 'Audio FX: Muted (click to enable)');
    toggleBtn.setAttribute('aria-pressed', String(soundEnabled));
  }
}
