/**
 * MATCH THE PAIR - MAIN CLIENT CONTROLLER
 * Connects UI, Event Handlers, Sound, Mascot Sparky, and Level Progression.
 */

import { GAME_CONFIG } from './game-config.js';
import { LEVELS_CONFIG } from './level-config.js';
import {
  SoundEngine,
  FlowerParticleSystem,
  ProgressManager,
  SparkyController
} from './game-logic.js';

class MatchPairApp {
  constructor() {
    this.levels = LEVELS_CONFIG;
    this.sound = new SoundEngine();
    this.progress = new ProgressManager(GAME_CONFIG.storageKey);
    this.sparky = new SparkyController(this.sound);

    // Particle FX
    const fxCanvas = document.getElementById('fx-canvas');
    const titleCanvas = document.getElementById('title-fx-canvas');
    this.fx = new FlowerParticleSystem(fxCanvas);
    this.titleFx = new FlowerParticleSystem(titleCanvas);

    // Connection Canvas & Context
    this.connCanvas = document.getElementById('connection-canvas');
    this.connCtx = this.connCanvas.getContext('2d');

    // Gameplay State
    this.currentLevelIndex = 0;
    this.selectedCard = null;
    this.matchedPairsCount = 0;
    this.totalPairsCount = 0;
    this.isPaused = false;
    this.isInputBlocked = false;
    this.dialogueSession = 0;

    // Drag pairing state
    this.isDragging = false;
    this.dragStartPos = { x: 0, y: 0 };
    this.dragCurrentPos = { x: 0, y: 0 };

    // Tutorial helper
    this.tutorialInterval = null;

    this.init();
  }

  init() {
    // Sync sound state from saved progress
    if (this.progress.soundMuted) {
      this.sound.setMute(true);
    }
    this.updateSoundButtonsUI();
    this.updateRibbonStats();

    // Set initial mascot faces
    this.sparky.setSpriteFrame(document.getElementById('game-sparky-face'), 'idle');
    this.sparky.setSpriteFrame(document.getElementById('pause-sparky-face'), 'peeking');
    this.sparky.setSpriteFrame(document.getElementById('complete-sparky-face'), 'celebrate');

    this.bindDOMEvents();
  }

  updateSoundButtonsUI() {
    const isMuted = this.sound.muted;
    const menuIcon = document.getElementById('menu-sound-icon');
    const gameIcon = document.getElementById('game-sound-icon');
    if (menuIcon) {
      menuIcon.innerHTML = isMuted
        ? `<svg class="sound-speaker-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" opacity="0.3"/>
            <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
           </svg>`
        : `<svg class="sound-speaker-svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
           </svg>`;
    }
    // Reuse the same illustrated speaker in both the menu and gameplay HUD.
    if (gameIcon && menuIcon) gameIcon.innerHTML = menuIcon.innerHTML;
    ['btn-sound-menu', 'btn-sound'].forEach((id) => {
      const button = document.getElementById(id);
      if (button) {
        button.setAttribute('aria-label', isMuted ? 'Turn sound on' : 'Turn sound off');
        button.setAttribute('aria-pressed', String(isMuted));
      }
    });
  }

  updateRibbonStats() {
    const levelInd = document.getElementById('menu-level-indicator');
    const starInd = document.getElementById('menu-star-indicator');
    const xpVal = document.getElementById('hud-xp-val');

    if (levelInd) {
      levelInd.textContent = `${this.progress.unlockedLevel}/${this.levels.length}`;
    }
    if (starInd) {
      starInd.textContent = this.progress.xp || this.progress.stars || 0;
    }
    if (xpVal) {
      xpVal.textContent = this.progress.xp || 0;
    }
  }

  bindDOMEvents() {
    // 1. Play Button on Home Screen
    const btnPlay = document.getElementById('btn-start-game');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        this.sound.startBGM();
        this.sound.playTap();
        // Start current level based on progress
        const startLvlIdx = Math.max(0, Math.min(this.progress.currentLevel - 1, this.levels.length - 1));
        this.showScreen('game-screen');
        this.startLevel(startLvlIdx);
      });
    }

    // 2. Levels Screen Opening & Closing
    const btnOpenLevels = document.getElementById('btn-open-levels');
    if (btnOpenLevels) {
      btnOpenLevels.addEventListener('click', () => {
        this.sound.playTap();
        this.openLevelsScreen();
      });
    }

    const btnCloseLevels = document.getElementById('btn-close-levels');
    if (btnCloseLevels) {
      btnCloseLevels.addEventListener('click', () => {
        this.sound.playTap();
        this.closeLevelsScreen();
      });
    }

    // 3. Hero Sparky on Home Screen (Interactive dialogue & flower burst & SparkyArt2 swap!)
    const heroSparky = document.getElementById('menu-sparky-btn');
    const heroSparkyImg = document.getElementById('menu-sparky-img');
    let heroSparkySwapTimer = null;
    if (heroSparky) {
      const triggerHeroSparky = () => {
        this.sound.init();
        this.sound.playTap();
        const rect = heroSparky.getBoundingClientRect();
        this.titleFx.spawnTitleFlowers(rect.left + rect.width / 2, rect.top + rect.height / 2);

        // Tactile press & SparkyArt2 swap (like number balloon pop benchmark)
        heroSparky.classList.add('sparky-pressed');
        setTimeout(() => heroSparky.classList.remove('sparky-pressed'), 200);

        if (heroSparkyImg) {
          heroSparkyImg.src = 'assets/SparkyArt2.png';
          clearTimeout(heroSparkySwapTimer);
          heroSparkySwapTimer = setTimeout(() => {
            heroSparkyImg.src = 'assets/SparkyArt.png';
          }, 2000);
        }

        // Play friendly greeting dialogue
        const randomMenu = this.sparky.getRandomDialogue('menuDialogue');
        if (randomMenu) {
          this.sound.playDialogue(randomMenu.audio);
        }
      };
      heroSparky.addEventListener('pointerdown', triggerHeroSparky);
    }

    // 4. Sound Toggle Buttons (Menu & Game HUD)
    const toggleSoundAction = () => {
      this.sound.init();
      const muted = this.sound.toggleMute();
      this.progress.soundMuted = muted;
      this.progress.save();
      this.updateSoundButtonsUI();
      this.sound.playTap();
    };

    const btnSoundMenu = document.getElementById('btn-sound-menu');
    if (btnSoundMenu) {
      btnSoundMenu.addEventListener('click', toggleSoundAction);
    }
    const btnSoundGame = document.getElementById('btn-sound');
    if (btnSoundGame) {
      btnSoundGame.addEventListener('click', toggleSoundAction);
    }

    // 5. In-game Pause Button & Modal
    const btnPause = document.getElementById('btn-pause');
    if (btnPause) {
      btnPause.addEventListener('click', () => {
        this.sound.playTap();
        this.pauseGame();
      });
    }

    const btnResume = document.getElementById('btn-resume');
    if (btnResume) {
      btnResume.addEventListener('click', () => {
        this.sound.playTap();
        this.resumeGame();
      });
    }

    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        this.sound.playTap();
        this.resumeGame();
        this.startLevel(this.currentLevelIndex);
      });
    }

    const btnHome = document.getElementById('btn-home');
    if (btnHome) {
      btnHome.addEventListener('click', () => {
        this.sound.playTap();
        document.getElementById('pause-modal').classList.remove('active');
        this.showScreen('start-screen');
      });
    }

    // 6. Level Complete Modal Actions
    const btnNextLevel = document.getElementById('btn-next-level');
    if (btnNextLevel) {
      btnNextLevel.addEventListener('click', () => {
        this.sound.playTap();
        document.getElementById('complete-modal').classList.remove('active');
        this.currentLevelIndex = (this.currentLevelIndex + 1) % this.levels.length;
        this.startLevel(this.currentLevelIndex);
      });
    }

    const btnReplayLevel = document.getElementById('btn-replay-level');
    if (btnReplayLevel) {
      btnReplayLevel.addEventListener('click', () => {
        this.sound.playTap();
        document.getElementById('complete-modal').classList.remove('active');
        this.startLevel(this.currentLevelIndex);
      });
    }

    const btnCompleteHome = document.getElementById('btn-complete-home');
    if (btnCompleteHome) {
      btnCompleteHome.addEventListener('click', () => {
        this.sound.playTap();
        document.getElementById('complete-modal').classList.remove('active');
        this.showScreen('start-screen');
        this.openLevelsScreen();
      });
    }

    // 7. Interactive Stage Pointer Events (Drag pairing lines)
    const stage = document.getElementById('stage-area');
    if (stage) {
      stage.addEventListener('pointermove', (e) => this.handlePointerMove(e));
      stage.addEventListener('pointerup', (e) => this.handlePointerUp(e));
      stage.addEventListener('pointercancel', (e) => this.handlePointerUp(e));
    }

    window.addEventListener('resize', () => {
      this.resizeCanvas();
      if (this.tutorialPairId) this.showTutorial(this.tutorialPairId);
    });
  }

  showScreen(id) {
    if (id !== 'game-screen') {
      this.stopGameplayDialogue();
      this.hideTutorial(true);
    }
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    const screen = document.getElementById(id);
    if (screen) {
      screen.classList.add('active');
    }
    if (id === 'game-screen') {
      this.resizeCanvas();
    }
    this.updateRibbonStats();
  }

  resizeCanvas() {
    const stage = document.getElementById('stage-area');
    if (stage && this.connCanvas) {
      this.connCanvas.width = stage.clientWidth;
      this.connCanvas.height = stage.clientHeight;
    }
  }

  openLevelsScreen() {
    this.hideTutorial(true);
    this.stopGameplayDialogue();
    this.renderLevelSelectGrid();
    const el = document.getElementById('screen-levels');
    if (el) {
      el.classList.remove('hidden');
      setTimeout(() => {
        const currentBtn = document.querySelector('.level-button--current');
        if (currentBtn) {
          currentBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }, 80);
    }
  }

  closeLevelsScreen() {
    const el = document.getElementById('screen-levels');
    if (el) {
      el.classList.add('hidden');
    }
  }

  renderLevelSelectGrid() {
    const grid = document.getElementById('levels-grid');
    if (!grid) return;
    grid.innerHTML = '';

    this.levels.forEach((lvl, idx) => {
      const levelNum = lvl.level;
      const isUnlocked = this.progress.isUnlocked(levelNum);
      const isCurrent = levelNum === this.progress.currentLevel;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `level-button ${isUnlocked ? 'level-button--unlocked' : 'level-button--locked'}${isCurrent ? ' level-button--current' : ''}`;
      btn.setAttribute('aria-label', isUnlocked ? `Level ${levelNum}${isCurrent ? ', current' : ''}` : `Level ${levelNum}, locked`);

      const content = document.createElement('span');
      content.className = 'level-button-content';

      if (isUnlocked) {
        content.textContent = String(levelNum);
        btn.addEventListener('click', () => {
          this.sound.playTap();
          this.progress.currentLevel = levelNum;
          this.progress.save();
          this.closeLevelsScreen();
          this.showScreen('game-screen');
          this.startLevel(levelNum - 1);
        });
      } else {
        content.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        `;
        btn.disabled = true;
      }

      btn.appendChild(content);
      grid.appendChild(btn);
    });
  }

  /**
   * Start a specified level
   */
  startLevel(index) {
    this.hideTutorial(true);
    this.pausedTutorialPairId = null;
    this.stopGameplayDialogue();
    this.isPaused = false;
    this.currentLevelIndex = index;
    const levelData = this.levels[index];
    this.progress.currentLevel = levelData.level;
    this.progress.save();

    this.matchedPairsCount = 0;
    this.totalPairsCount = levelData.pairs.length;
    this.selectedCard = null;
    this.isInputBlocked = false;
    this.clearLine();

    // Update HUD
    const hudLevel = document.getElementById('hud-level-text');
    if (hudLevel) {
      hudLevel.textContent = `LEVEL ${levelData.level}`;
    }

    const dotsContainer = document.getElementById('hud-dots');
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < this.totalPairsCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.id = `dot-${i}`;
        dotsContainer.appendChild(dot);
      }
    }

    // Populate Left and Right cards
    const leftCol = document.getElementById('left-cards-col');
    const rightCol = document.getElementById('right-cards-col');
    leftCol.innerHTML = '';
    rightCol.innerHTML = '';

    const leftItems = levelData.pairs.map((p) => ({
      pairId: p.id,
      side: 'left',
      key: p.left,
      name: p.leftName
    }));

    const rightItems = levelData.pairs.map((p) => ({
      pairId: p.id,
      side: 'right',
      key: p.right,
      name: p.rightName
    }));

    this.shuffle(leftItems);
    this.shuffle(rightItems);

    leftItems.forEach((item) => {
      leftCol.appendChild(this.createCardElement(item));
    });

    rightItems.forEach((item) => {
      rightCol.appendChild(this.createCardElement(item));
    });

    this.resizeCanvas();

    // 1. Play Intro Dialogue on Level Start (intro alone or combination of intro/idle as requested)
    this.playLevelStartDialogue();

    // 2. Start Inactivity Idle Watcher (6-10 sec gap between actions)
    this.sparky.startIdleWatcher(() => {
      this.triggerInactivityIdle();
    });

    // 3. Show tutorial finger on Level 1
    if (levelData.level === 1) {
      this.showTutorial(levelData.pairs[0].id);
    } else {
      this.hideTutorial();
    }
  }

  /**
   * Plays level start intro dialogue (supports intro alone or combinations of intro + idle)
   */
  async playLevelStartDialogue() {
    const session = this.dialogueSession;
    await this.sparky.speak('intro', 'welcome');
    if (session !== this.dialogueSession || !this.isGameplayActive()) return;
    // 40% chance of combination with an idle/encouragement prompt
    if (Math.random() < 0.4) {
      await new Promise(r => setTimeout(r, 400));
      if (session === this.dialogueSession && this.isGameplayActive() && !this.selectedCard && this.matchedPairsCount === 0) {
        await this.sparky.speak('idle', 'curious');
      }
    }
  }

  /**
   * Called when player is inactive for 6-10 seconds
   */
  triggerInactivityIdle() {
    if (!this.isGameplayActive() || this.isInputBlocked) return;
    // Sparky is already demonstrating a pair; do not add competing idle hints.
    if (this.tutorialPairId) return;
    const unmatched = Array.from(document.querySelectorAll('.game-card:not(.matched)'));
    if (unmatched.length === 0) return;

    // Trigger visual hint on one unmatched card pair
    const firstLeft = unmatched.find((c) => c.dataset.side === 'left');
    if (firstLeft) {
      const matchRight = unmatched.find(
        (c) => c.dataset.side === 'right' && c.dataset.pairId === firstLeft.dataset.pairId
      );
      firstLeft.classList.add('hinting');
      setTimeout(() => {
        if (!firstLeft.classList.contains('matched') && matchRight) {
          matchRight.classList.add('hinting');
        }
      }, 350);
      setTimeout(() => {
        firstLeft.classList.remove('hinting');
        if (matchRight) matchRight.classList.remove('hinting');
      }, 2500);
    }

    // Play Sparky idle encouragement voice dialogue with curious mood
    this.sparky.speak('idle', 'curious');
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  createCardElement(item) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.dataset.side = item.side;
    card.dataset.pairId = item.pairId;
    card.dataset.key = item.key;

    card.innerHTML = `
      <div class="card-svg-box">
        <img src="assets/svgs/${item.key}.svg" alt="${item.name}" loading="eager" draggable="false" />
      </div>
    `;

    card.addEventListener('pointerdown', (e) => this.handleCardPointerDown(card, e));
    return card;
  }

  handleCardPointerDown(card, e) {
    if (this.isPaused || this.isInputBlocked || card.classList.contains('matched')) return;

    // Reset inactivity idle timer on user touch
    this.sparky.resetIdleTimer();

    // Tapping already selected card cancels selection
    if (this.selectedCard && this.selectedCard.element === card) {
      this.deselectAll();
      this.sound.playTap();
      return;
    }

    // No card selected yet: Select this card and begin drag tracking
    if (!this.selectedCard) {
      this.selectCard(card);
      this.sound.playSelect();
      this.sparky.setSpriteFrame(document.getElementById('game-sparky-face'), 'curious');

      this.isDragging = true;
      const rect = card.getBoundingClientRect();
      const stageRect = document.getElementById('stage-area').getBoundingClientRect();
      this.dragStartPos = {
        x: rect.left + rect.width / 2 - stageRect.left,
        y: rect.top + rect.height / 2 - stageRect.top
      };
      this.dragCurrentPos = { ...this.dragStartPos };
      return;
    }

    // Tapping another card on the SAME side: Switch selection
    if (this.selectedCard.side === card.dataset.side) {
      this.deselectAll();
      this.selectCard(card);
      this.sound.playSelect();
      return;
    }

    // Tapping card on OPPOSITE side: Evaluate pairing match!
    this.evaluateMatch(this.selectedCard.element, card);
  }

  handlePointerMove(e) {
    if (!this.isDragging || !this.selectedCard) return;
    const stageRect = document.getElementById('stage-area').getBoundingClientRect();
    this.dragCurrentPos = {
      x: e.clientX - stageRect.left,
      y: e.clientY - stageRect.top
    };
    this.drawLine(this.dragStartPos, this.dragCurrentPos, '#f97316', 6, [8, 6]);
  }

  handlePointerUp(e) {
    if (!this.isDragging) return;
    this.isDragging = false;

    const targetEl = document.elementFromPoint(e.clientX, e.clientY);
    const targetCard = targetEl ? targetEl.closest('.game-card') : null;

    if (
      targetCard &&
      targetCard !== this.selectedCard.element &&
      !targetCard.classList.contains('matched')
    ) {
      if (targetCard.dataset.side !== this.selectedCard.side) {
        this.evaluateMatch(this.selectedCard.element, targetCard);
        return;
      }
    }

    this.clearLine();
  }

  selectCard(card) {
    card.classList.add('selected');
    this.selectedCard = {
      element: card,
      side: card.dataset.side,
      pairId: card.dataset.pairId
    };
  }

  deselectAll() {
    if (this.selectedCard) {
      this.selectedCard.element.classList.remove('selected');
      this.selectedCard = null;
    }
    this.clearLine();
  }

  evaluateMatch(cardA, cardB) {
    const isCorrect = cardA.dataset.pairId === cardB.dataset.pairId;
    this.isInputBlocked = true;
    this.sparky.resetIdleTimer();

    const stageRect = document.getElementById('stage-area').getBoundingClientRect();
    const rectA = cardA.getBoundingClientRect();
    const rectB = cardB.getBoundingClientRect();

    const pA = {
      x: rectA.left + rectA.width / 2 - stageRect.left,
      y: rectA.top + rectA.height / 2 - stageRect.top
    };
    const pB = {
      x: rectB.left + rectB.width / 2 - stageRect.left,
      y: rectB.top + rectB.height / 2 - stageRect.top
    };

    if (isCorrect) {
      // Draw solid tactile green connecting curve
      this.drawLine(pA, pB, '#22c55e', 7);
      this.sound.playMatchSuccess();

      // Flower Particle Pop Burst at both card centers!
      this.fx.spawnPop(rectA.left + rectA.width / 2, rectA.top + rectA.height / 2, '#4ade80');
      this.fx.spawnPop(rectB.left + rectB.width / 2, rectB.top + rectB.height / 2, '#38bdf8');

      // Sparky Positive Feedback Dialogue & Expression
      this.sparky.speak('positive', 'thumbsUp');

      cardA.classList.remove('selected');
      cardB.classList.remove('selected');
      cardA.classList.add('matched');
      cardB.classList.add('matched');

      this.awardMatchReward();

      const dot = document.getElementById(`dot-${this.matchedPairsCount}`);
      if (dot) dot.classList.add('filled');

      this.matchedPairsCount++;
      this.hideTutorial();

      setTimeout(() => {
        this.clearLine();
        this.selectedCard = null;
        this.isInputBlocked = false;

        if (this.matchedPairsCount >= this.totalPairsCount) {
          this.handleLevelComplete();
        }
      }, 700);
    } else {
      // Draw red dashed line and wrong shake
      this.drawLine(pA, pB, '#ef4444', 6, [8, 5]);
      this.sound.playMatchWrong();

      // Sparky Encouragement Wrong Dialogue
      this.sparky.speak('wrong');

      cardA.classList.add('wrong');
      cardB.classList.add('wrong');

      setTimeout(() => {
        cardA.classList.remove('wrong', 'selected');
        cardB.classList.remove('wrong', 'selected');
        this.clearLine();
        this.selectedCard = null;
        this.isInputBlocked = false;
      }, 650);
    }
  }

  drawLine(p1, p2, color, width = 6, dash = []) {
    this.connCtx.clearRect(0, 0, this.connCanvas.width, this.connCanvas.height);
    this.connCtx.save();
    this.connCtx.strokeStyle = color;
    this.connCtx.lineWidth = width;
    this.connCtx.lineCap = 'round';
    this.connCtx.setLineDash(dash);

    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2 - 14;

    this.connCtx.beginPath();
    this.connCtx.moveTo(p1.x, p1.y);
    this.connCtx.quadraticCurveTo(midX, midY, p2.x, p2.y);
    this.connCtx.stroke();
    this.connCtx.restore();
  }

  clearLine() {
    this.connCtx.clearRect(0, 0, this.connCanvas.width, this.connCanvas.height);
  }

  awardMatchReward() {
    this.progress.addXP(10);
    this.progress.addStar();
    this.updateRibbonStats();
  }

  handleLevelComplete() {
    this.stopGameplayDialogue();
    this.sound.playLevelComplete();

    // Celebration screen-wide flower burst
    this.fx.spawnCelebrationBurst();

    // Unlock next level in progression & save
    const completedLevelNum = this.levels[this.currentLevelIndex].level;
    this.progress.unlockLevel(completedLevelNum + 1);
    this.progress.currentLevel = Math.min(completedLevelNum + 1, this.levels.length);
    this.progress.save();
    this.updateRibbonStats();

    // Speak level complete dialogue
    this.sparky.speak('levelcomplete');

    // Update modal details and open
    setTimeout(() => {
      const sub = document.getElementById('complete-sub-text');
      if (sub) {
        sub.textContent = `Level ${completedLevelNum} Complete! ⭐`;
      }
      this.sparky.setSpriteFrame(document.getElementById('complete-sparky-face'), 'celebrate');
      document.getElementById('complete-modal').classList.add('active');
    }, 550);
  }

  showTutorial(targetPairId) {
    this.hideTutorial(true);
    const leftCard = document.querySelector(`.game-card[data-side="left"][data-pair-id="${targetPairId}"]`);
    const rightCard = document.querySelector(`.game-card[data-side="right"][data-pair-id="${targetPairId}"]`);
    if (!leftCard || !rightCard || leftCard.classList.contains('matched') || !this.isGameplayActive()) return;

    const layer = document.getElementById('tutorial-layer');
    const mascot = document.getElementById('game-sparky-face');
    const anchor = document.getElementById('game-sparky-anchor');
    const screenRect = document.getElementById('game-screen').getBoundingClientRect();
    const homeRect = mascot.getBoundingClientRect();
    this.tutorialPairId = targetPairId;
    this.tutorialHome = { x: homeRect.left - screenRect.left, y: homeRect.top - screenRect.top, scale: homeRect.width / 96 };
    anchor.classList.add('tutorial-away');
    layer.style.display = 'block';
    layer.appendChild(mascot);
    mascot.classList.add('tutorial-guide');

    const transform = (point, facing = 1, scale = 1) =>
      `translate(${point.x}px, ${point.y}px) scale(${facing * scale}, ${scale})`;
    mascot.style.transform = transform(this.tutorialHome, 1, this.tutorialHome.scale);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let step = 0;
    const pointAtCard = () => {
      const card = step === 0 ? leftCard : rightCard;
      const rect = card.querySelector('img').getBoundingClientRect();
      const facing = step === 0 ? 1 : -1;
      // The artwork's fingertip sits near the left edge, 72% down the image.
      // Mirror only the right-hand visit so Sparky points inward at both items.
      const target = {
        x: step === 0 ? rect.right - screenRect.left - 4 : rect.left - screenRect.left - 92,
        y: Math.max(0, Math.min(screenRect.height - 96, rect.top + rect.height / 2 - screenRect.top - 69))
      };
      leftCard.classList.toggle('tutorial-target', step === 0);
      rightCard.classList.toggle('tutorial-target', step === 1);
      const from = getComputedStyle(mascot).transform;
      this.tutorialMotion?.cancel();
      const to = transform(target, facing);
      mascot.style.transform = to;
      this.tutorialMotion = mascot.animate([{ transform: from }, { transform: to }], {
        duration: reducedMotion ? 0 : 850,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      });
      step = (step + 1) % 2;
    };
    pointAtCard();
    this.tutorialInterval = setInterval(pointAtCard, 2200);
  }

  hideTutorial(immediate = false) {
    clearInterval(this.tutorialInterval);
    this.tutorialInterval = null;
    this.tutorialPairId = null;
    document.querySelectorAll('.tutorial-target').forEach(card => card.classList.remove('tutorial-target'));
    const layer = document.getElementById('tutorial-layer');
    const mascot = document.getElementById('game-sparky-face');
    const anchor = document.getElementById('game-sparky-anchor');
    if (!mascot.classList.contains('tutorial-guide')) return;
    const from = getComputedStyle(mascot).transform;
    this.tutorialMotion?.cancel();
    const restore = () => {
      anchor.appendChild(mascot);
      mascot.classList.remove('tutorial-guide');
      mascot.style.removeProperty('transform');
      anchor.classList.remove('tutorial-away');
      layer.style.display = 'none';
      this.tutorialMotion = null;
    };
    if (immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      restore();
      return;
    }
    const home = anchor.getBoundingClientRect();
    const screen = document.getElementById('game-screen').getBoundingClientRect();
    const to = `translate(${home.left - screen.left}px, ${home.top - screen.top}px) scale(${home.width / 96})`;
    mascot.style.transform = to;
    this.tutorialMotion = mascot.animate([{ transform: from }, { transform: to }], {
      duration: 650,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    });
    const returnMotion = this.tutorialMotion;
    returnMotion.finished.then(() => {
      if (this.tutorialMotion === returnMotion) restore();
    }).catch(() => {}); // Navigation or a restart may cancel the return flight.
  }

  pauseGame() {
    this.pausedTutorialPairId = this.tutorialPairId;
    this.hideTutorial(true);
    this.isPaused = true;
    this.stopGameplayDialogue();
    this.sparky.setSpriteFrame(document.getElementById('pause-sparky-face'), 'peeking');
    document.getElementById('pause-modal').classList.add('active');
  }

  resumeGame() {
    this.isPaused = false;
    document.getElementById('pause-modal').classList.remove('active');
    if (this.isGameplayActive()) {
      this.sparky.startIdleWatcher(() => this.triggerInactivityIdle());
      if (this.pausedTutorialPairId) this.showTutorial(this.pausedTutorialPairId);
    }
    this.pausedTutorialPairId = null;
  }

  isGameplayActive() {
    return document.getElementById('game-screen').classList.contains('active') &&
      document.getElementById('screen-levels').classList.contains('hidden') &&
      !document.getElementById('complete-modal').classList.contains('active') &&
      !this.isPaused && this.matchedPairsCount < this.totalPairsCount;
  }

  stopGameplayDialogue() {
    this.dialogueSession++;
    this.sparky.stopIdleWatcher();
    this.sparky.cancelDialogue();
  }
}

// Instantiate game when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.gameApp = new MatchPairApp();
});

