/* Web Audio API procedural sound engine
   100% zero-asset, zero-network, ultra-lightweight mechanical cybernetic haptics.
   Progressive enhancement: Muted by default or respects user choice stored in localStorage. */

let audioCtx = null;
let soundEnabled = false;

export function isAudioEnabled() {
  if (soundEnabled) return true;
  if (typeof window !== 'undefined' && localStorage.getItem('dossier_sfx') === 'true') {
    soundEnabled = true;
    updateSoundUI();
    return true;
  }
  return false;
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
    ensureAudioContext();
    playBleep(880, 0.08, 'sine');
  }
}

export function ensureAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!soundEnabled && localStorage.getItem('dossier_sfx') !== 'true') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playBleep(freq = 1100, duration = 0.05, type = 'sine') {
  if (!soundEnabled) return;
  try {
    ensureAudioContext();
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
    ensureAudioContext();
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

export function playAirlockLatch() {
  if (!isAudioEnabled()) return;
  try {
    ensureAudioContext();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    // Sub-bass blast door mechanical thump (deep hydraulic contact)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(160, now);
    osc1.frequency.exponentialRampToValueAtTime(36, now + 0.22);
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.22);

    // Resonant metallic latch clamp / interlocking teeth engagement
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(750, now + 0.02);
    osc2.frequency.exponentialRampToValueAtTime(260, now + 0.18);
    gain2.gain.setValueAtTime(0.05, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now + 0.02);
    osc2.stop(now + 0.18);
  } catch (e) {}
}

export function playAirlockRelease() {
  if (!isAudioEnabled()) return;
  try {
    ensureAudioContext();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    // Pneumatic depressurization / weighted glide release
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(460, now);
    osc1.frequency.exponentialRampToValueAtTime(160, now + 0.24);
    gain1.gain.setValueAtTime(0.04, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.24);

    // Sub-bass hydraulic disengage pulse
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(80, now);
    osc2.frequency.exponentialRampToValueAtTime(35, now + 0.18);
    gain2.gain.setValueAtTime(0.04, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now);
    osc2.stop(now + 0.18);
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
