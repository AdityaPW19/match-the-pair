/**
 * Game Logic & Core Engine for Match The Pair
 * Handles Sound Engine, Flower Particle FX, Mascot Sparky Controller,
 * Progress LocalStorage, and Pairing Game Engine.
 */

import { GAME_CONFIG } from './game-config.js';
import { LEVELS_CONFIG } from './level-config.js';

/* ==========================================================================
   1. SOUND & AUDIO ENGINE (Voice Dialogues, BGM, SFX)
   ========================================================================== */
export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgm = null;
    this.currentDialogueAudio = null;
    this.finishDialogue = null;
    this.audioCache = new Map();
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (!this.bgm) {
      this.bgm = new Audio(GAME_CONFIG.audio.bgMusic);
      this.bgm.loop = true;
      this.bgm.volume = GAME_CONFIG.audio.bgMusicVolume;
    }
  }

  startBGM() {
    this.init();
    if (this.bgm && !this.muted) {
      this.bgm.play().catch(() => {});
    }
  }

  stopBGM() {
    if (this.bgm) {
      this.bgm.pause();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.bgm) {
      this.bgm.muted = this.muted;
      if (!this.muted && this.bgm.paused) {
        this.bgm.play().catch(() => {});
      }
    }
    if (this.currentDialogueAudio) {
      this.currentDialogueAudio.muted = this.muted;
    }
    return this.muted;
  }

  setMute(isMuted) {
    this.muted = isMuted;
    if (this.bgm) {
      this.bgm.muted = this.muted;
    }
    if (this.currentDialogueAudio) {
      this.currentDialogueAudio.muted = this.muted;
    }
  }

  playDialogue(audioSrc) {
    this.stopDialogue();
    if (this.muted) return Promise.resolve();

    return new Promise((resolve) => {
      try {
        let audio = this.audioCache.get(audioSrc);
        if (!audio) {
          audio = new Audio(audioSrc);
          this.audioCache.set(audioSrc, audio);
        }

        audio.volume = GAME_CONFIG.audio.dialogueVolume;
        audio.currentTime = 0;
        this.currentDialogueAudio = audio;

        let finished = false;
        const onEnd = () => {
          if (finished) return;
          finished = true;
          audio.removeEventListener('ended', onEnd);
          audio.removeEventListener('error', onEnd);
          if (this.currentDialogueAudio === audio) {
            this.currentDialogueAudio = null;
          }
          if (this.finishDialogue === onEnd) this.finishDialogue = null;
          resolve();
        };

        this.finishDialogue = onEnd;
        audio.addEventListener('ended', onEnd);
        audio.addEventListener('error', onEnd);

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            onEnd();
          });
        }
      } catch (e) {
        this.stopDialogue();
        resolve();
      }
    });
  }

  stopDialogue() {
    if (this.currentDialogueAudio) {
      this.currentDialogueAudio.pause();
      this.currentDialogueAudio.currentTime = 0;
      this.currentDialogueAudio = null;
    }
    if (this.finishDialogue) this.finishDialogue();
  }

  playTap() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(560, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.08);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  playSelect() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(640, now);
      osc.frequency.exponentialRampToValueAtTime(920, now + 0.11);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  playMatchSuccess() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.065;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.28, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.32);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.33);
      });
    } catch (e) {}
  }

  playMatchWrong() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.22);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.23);
    } catch (e) {}
  }

  playLevelComplete() {
    if (this.muted) return;
    try {
      const audio = new Audio(GAME_CONFIG.audio.levelCompleteMusic);
      audio.volume = 0.55;
      audio.play().catch(() => {});
    } catch (e) {}
  }
}

/* ==========================================================================
   2. FLOWER & SPARKLE PARTICLE SYSTEM
   ========================================================================== */
export class FlowerParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animating = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement || document.body;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
  }

  spawnPop(x, y, color = '#ff4d6d') {
    this.resize();
    const flowerCount = 12;
    const flowerPalettes = GAME_CONFIG.flowerPalettes;

    for (let i = 0; i < flowerCount; i++) {
      const angle = (i / flowerCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = 3.5 + Math.random() * 5.5;
      const pal = flowerPalettes[Math.floor(Math.random() * flowerPalettes.length)];
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        gravity: 0.12,
        size: 18 + Math.random() * 12,
        color: pal.petals,
        centerColor: pal.center,
        petalCount: 5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.18,
        alpha: 1,
        decay: 0.016 + Math.random() * 0.014,
        shape: 'flower'
      });
    }

    // Soft sparkling stars
    for (let j = 0; j < 8; j++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.05,
        size: 6 + Math.random() * 6,
        color: '#ffffff',
        alpha: 1,
        decay: 0.03 + Math.random() * 0.02,
        shape: 'sparkle'
      });
    }

    if (!this.animating) {
      this.animating = true;
      this.animate();
    }
  }

  spawnCelebrationBurst() {
    this.resize();
    const flowerPalettes = GAME_CONFIG.flowerPalettes;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. Center fountain explosion of tumbling flowers
    for (let i = 0; i < 38; i++) {
      const pal = flowerPalettes[Math.floor(Math.random() * flowerPalettes.length)];
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
      const speed = 7 + Math.random() * 10;
      this.particles.push({
        x: w * 0.5 + (Math.random() - 0.5) * 60,
        y: h * 0.45,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.22,
        size: 22 + Math.random() * 14,
        color: pal.petals,
        centerColor: pal.center,
        petalCount: 5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.16,
        alpha: 1,
        decay: 0.006 + Math.random() * 0.004,
        shape: 'flower'
      });
    }

    // 2. Cascade of falling flowers from above
    for (let i = 0; i < 30; i++) {
      const pal = flowerPalettes[Math.floor(Math.random() * flowerPalettes.length)];
      this.particles.push({
        x: Math.random() * w,
        y: -20 - Math.random() * 180,
        vx: (Math.random() - 0.5) * 3.5,
        vy: 2.2 + Math.random() * 3.5,
        gravity: 0.08,
        size: 18 + Math.random() * 14,
        color: pal.petals,
        centerColor: pal.center,
        petalCount: 5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.12,
        alpha: 1,
        decay: 0.004 + Math.random() * 0.003,
        shape: 'flower'
      });
    }

    // 3. Golden sparkles floating around
    for (let j = 0; j < 25; j++) {
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.7,
        vx: (Math.random() - 0.5) * 3,
        vy: -1 - Math.random() * 4,
        gravity: 0.06,
        size: 8 + Math.random() * 8,
        color: Math.random() > 0.3 ? '#ffe082' : '#ffffff',
        alpha: 1,
        decay: 0.012 + Math.random() * 0.01,
        shape: 'sparkle'
      });
    }

    if (!this.animating) {
      this.animating = true;
      this.animate();
    }
  }

  spawnTitleFlowers(originX, originY) {
    this.resize();
    const flowerPalettes = GAME_CONFIG.flowerPalettes;
    const cx = originX !== undefined ? originX : this.canvas.width * 0.5;
    const cy = originY !== undefined ? originY : this.canvas.height * 0.35;
    const count = 16;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const speed = 2.8 + Math.random() * 4.6;
      const pal = flowerPalettes[Math.floor(Math.random() * flowerPalettes.length)];
      this.particles.push({
        x: cx + (Math.random() - 0.5) * 80,
        y: cy + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        gravity: 0.09,
        size: 18 + Math.random() * 12,
        color: pal.petals,
        centerColor: pal.center,
        petalCount: 5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.16,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.01,
        shape: 'flower'
      });
    }

    for (let j = 0; j < 10; j++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.8 + Math.random() * 3.5;
      this.particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.04,
        size: 7 + Math.random() * 7,
        color: Math.random() > 0.4 ? '#fde047' : '#ffffff',
        alpha: 1,
        decay: 0.02 + Math.random() * 0.015,
        shape: 'sparkle'
      });
    }

    if (!this.animating) {
      this.animating = true;
      this.animate();
    }
  }

  drawFlower(x, y, radius, petalColor, centerColor, rotation, petalCount = 5) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    const petalDist = radius * 0.52;
    const petalRadius = radius * 0.44;

    for (let i = 0; i < petalCount; i++) {
      const angle = (i * 2 * Math.PI) / petalCount;
      const px = Math.cos(angle) * petalDist;
      const py = Math.sin(angle) * petalDist;

      // Dark stroke
      ctx.beginPath();
      ctx.arc(px, py, petalRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#20243c';
      ctx.fill();

      // Petal color
      ctx.beginPath();
      ctx.arc(px, py, petalRadius - 1.5, 0, Math.PI * 2);
      ctx.fillStyle = petalColor;
      ctx.fill();

      // Petal highlight
      ctx.beginPath();
      ctx.arc(px - petalRadius * 0.25, py - petalRadius * 0.25, petalRadius * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fill();
    }

    // Flower Center
    const centerR = radius * 0.38;
    ctx.beginPath();
    ctx.arc(0, 0, centerR, 0, Math.PI * 2);
    ctx.fillStyle = '#20243c';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, centerR - 1.5, 0, Math.PI * 2);
    ctx.fillStyle = centerColor;
    ctx.fill();

    // Specular shine
    ctx.beginPath();
    ctx.arc(-centerR * 0.3, -centerR * 0.3, centerR * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fill();

    ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.gravity) p.vy += p.gravity;
      if (p.rotSpeed) p.rotation += p.rotSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);

      if (p.shape === 'flower') {
        this.drawFlower(p.x, p.y, p.size / 2, p.color, p.centerColor, p.rotation, p.petalCount);
      } else if (p.shape === 'sparkle') {
        this.ctx.translate(p.x, p.y);
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        const s = p.size;
        this.ctx.moveTo(0, -s);
        this.ctx.quadraticCurveTo(0, 0, s, 0);
        this.ctx.quadraticCurveTo(0, 0, 0, s);
        this.ctx.quadraticCurveTo(0, 0, -s, 0);
        this.ctx.quadraticCurveTo(0, 0, 0, -s);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.animate());
    } else {
      this.animating = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

/* ==========================================================================
   3. PROGRESS & LOCAL STORAGE MANAGER
   ========================================================================== */
export class ProgressManager {
  constructor(storageKey = GAME_CONFIG.storageKey) {
    this.storageKey = storageKey;
    this.unlockedLevel = 1;
    this.currentLevel = 1;
    this.stars = 0;
    this.soundMuted = false;
    this.load();
  }

  load() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKey));
      if (data) {
        this.unlockedLevel = Math.max(1, Math.min(data.unlockedLevel || 1, LEVELS_CONFIG.length));
        this.currentLevel = Math.max(1, Math.min(data.currentLevel || 1, this.unlockedLevel));
        this.stars = data.stars || 0;
        this.soundMuted = !!data.soundMuted;
      }
    } catch (e) {
      this.unlockedLevel = 1;
      this.currentLevel = 1;
      this.stars = 0;
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify({
        unlockedLevel: this.unlockedLevel,
        currentLevel: this.currentLevel,
        stars: this.stars,
        soundMuted: this.soundMuted
      }));
    } catch (e) {}
  }

  unlockLevel(levelNum) {
    if (levelNum > this.unlockedLevel && levelNum <= LEVELS_CONFIG.length) {
      this.unlockedLevel = levelNum;
      this.save();
    }
  }

  addStar() {
    this.stars += 1;
    this.save();
    return this.stars;
  }

  isUnlocked(levelNum) {
    return levelNum <= this.unlockedLevel;
  }
}

/* ==========================================================================
   4. SPARKY MASCOT & DIALOGUE CONTROLLER
   ========================================================================== */
export class SparkyController {
  constructor(soundEngine) {
    this.sound = soundEngine;
    this.speechTimeout = null;
    this.idleTimer = null;
    this.idleEnabled = false;
    this.dialogueVersion = 0;
    this.moodTimeout = null;
    this.onIdleCallback = null;
    this.lastDialogueIndex = {};
  }

  setSpriteFrame(element, mood) {
    if (!element) return;
    const bgPos = GAME_CONFIG.sprites.positions[mood] || GAME_CONFIG.sprites.positions.idle;
    element.className = element.className.replace(/\bsparky--\w+/g, '').trim();
    element.classList.add(`sparky--${mood}`);
    element.style.backgroundImage = `url('${GAME_CONFIG.sprites.sheet}')`;
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundSize = '300% 300%';
    element.style.backgroundPosition = bgPos;
  }

  showSpeech(text, duration = 3200) {
    const bubble = document.getElementById('sparky-speech-bubble');
    const textEl = document.getElementById('sparky-speech-text');
    if (!bubble || !textEl) return;

    textEl.textContent = text;
    bubble.classList.add('speech-pulse');
    setTimeout(() => bubble.classList.remove('speech-pulse'), 300);

    clearTimeout(this.speechTimeout);
    this.speechTimeout = setTimeout(() => {
      this.hideSpeech();
    }, duration);
  }

  hideSpeech() {
    const textEl = document.getElementById('sparky-speech-text');
    if (textEl && !textEl.textContent.includes('Find the pairs')) {
      textEl.textContent = 'Find the pairs!';
    }
  }

  getRandomDialogue(category) {
    const list = GAME_CONFIG.dialogues[category];
    if (!list || list.length === 0) return null;

    let idx = Math.floor(Math.random() * list.length);
    if (list.length > 1 && idx === this.lastDialogueIndex[category]) {
      idx = (idx + 1) % list.length;
    }
    this.lastDialogueIndex[category] = idx;
    return list[idx];
  }

  /**
   * Play a dialogue line with Sparky expression and speech bubble
   */
  async speak(category, mood = null, forceItem = null) {
    const item = forceItem || this.getRandomDialogue(category);
    if (!item) return;
    const version = ++this.dialogueVersion;
    clearTimeout(this.moodTimeout);

    // Determine mascot mood based on dialogue category
    let finalMood = mood;
    if (!finalMood) {
      if (category === 'positive') finalMood = 'thumbsUp';
      else if (category === 'wrong') finalMood = Math.random() > 0.5 ? 'wrong' : 'curious';
      else if (category === 'levelcomplete') finalMood = 'celebrate';
      else if (category === 'intro') finalMood = Math.random() > 0.5 ? 'welcome' : 'curious';
      else if (category === 'idle') finalMood = Math.random() > 0.5 ? 'curious' : 'idle';
      else finalMood = 'idle';
    }

    const mascotEl = document.getElementById('game-sparky-face');
    this.setSpriteFrame(mascotEl, finalMood);

    // Show transcription text in speech bubble
    this.showSpeech(item.text, 3400);

    // Play dialogue audio clip
    await this.sound.playDialogue(item.audio);
    if (version !== this.dialogueVersion) return;

    // After dialogue completes, gently return to idle mood unless another state active
    if (['positive', 'wrong', 'idle', 'intro'].includes(category)) {
      this.moodTimeout = setTimeout(() => {
        this.setSpriteFrame(mascotEl, 'idle');
      }, category === 'positive' ? 1600 : 600);
    }
  }

  /**
   * Start inactivity idle timer (between 6-10 seconds)
   */
  startIdleWatcher(onTrigger) {
    this.stopIdleWatcher();
    this.idleEnabled = true;
    this.onIdleCallback = onTrigger;
    this.resetIdleTimer();
  }

  resetIdleTimer() {
    clearTimeout(this.idleTimer);
    if (!this.idleEnabled) return;
    const { minGapMs, maxGapMs } = GAME_CONFIG.inactivity;
    const delay = minGapMs + Math.random() * (maxGapMs - minGapMs);
    this.idleTimer = setTimeout(() => {
      if (typeof this.onIdleCallback === 'function') {
        this.onIdleCallback();
      }
      this.resetIdleTimer();
    }, delay);
  }

  stopIdleWatcher() {
    clearTimeout(this.idleTimer);
    this.idleTimer = null;
    this.idleEnabled = false;
    this.onIdleCallback = null;
  }

  cancelDialogue() {
    this.dialogueVersion++;
    clearTimeout(this.speechTimeout);
    clearTimeout(this.moodTimeout);
    this.sound.stopDialogue();
    this.hideSpeech();
    document.getElementById('sparky-speech-bubble')?.classList.remove('speech-pulse');
  }
}
