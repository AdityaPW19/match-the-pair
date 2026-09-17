/* ==========================================================================
   MATCH THE PAIR - GAME ENGINE & LOGIC
   Mobile-First Educational Logic Game for Kids
   ========================================================================== */

// 1. GAME DATA: 30 Educational Pairing Levels
const LEVELS = [
  // Levels 1-5: Very Easy & Familiar (3 pairs)
  {
    level: 1,
    pairs: [
      { id: "p1", left: "shoe", right: "sock", leftName: "Shoe", rightName: "Sock" },
      { id: "p2", left: "toothbrush", right: "tooth", leftName: "Toothbrush", rightName: "Tooth" },
      { id: "p3", left: "lock", right: "key", leftName: "Lock", rightName: "Key" }
    ]
  },
  {
    level: 2,
    pairs: [
      { id: "p1", left: "cup", right: "teapot", leftName: "Cup", rightName: "Teapot" },
      { id: "p2", left: "pencil", right: "notebook", leftName: "Pencil", rightName: "Notebook" },
      { id: "p3", left: "bed", right: "couch", leftName: "Bed", rightName: "Couch" }
    ]
  },
  {
    level: 3,
    pairs: [
      { id: "p1", left: "plate", right: "spoon", leftName: "Plate", rightName: "Spoon" },
      { id: "p2", left: "soap", right: "bathtub", leftName: "Soap", rightName: "Bathtub" },
      { id: "p3", left: "bulb", right: "flashlight", leftName: "Light Bulb", rightName: "Flashlight" }
    ]
  },
  {
    level: 4,
    pairs: [
      { id: "p1", left: "door", right: "key", leftName: "Door", rightName: "Key" },
      { id: "p2", left: "chair", right: "couch", leftName: "Chair", rightName: "Couch" },
      { id: "p3", left: "baby", right: "baby_bottle", leftName: "Baby", rightName: "Bottle" }
    ]
  },
  {
    level: 5,
    pairs: [
      { id: "p1", left: "cooking_pot", right: "spoon", leftName: "Pot", rightName: "Spoon" },
      { id: "p2", left: "book", right: "bookmark", leftName: "Book", rightName: "Bookmark" },
      { id: "p3", left: "bowl", right: "spoon", leftName: "Bowl", rightName: "Spoon" }
    ]
  },

  // Levels 6-10: Home & Living (3-4 pairs)
  {
    level: 6,
    pairs: [
      { id: "p1", left: "bed", right: "couch", leftName: "Bed", rightName: "Couch" },
      { id: "p2", left: "plate", right: "fork", leftName: "Plate", rightName: "Fork" },
      { id: "p3", left: "soap", right: "sponge", leftName: "Soap", rightName: "Sponge" }
    ]
  },
  {
    level: 7,
    pairs: [
      { id: "p1", left: "door", right: "window", leftName: "Door", rightName: "Window" },
      { id: "p2", left: "bulb", right: "flashlight", leftName: "Bulb", rightName: "Flashlight" },
      { id: "p3", left: "chair", right: "couch", leftName: "Chair", rightName: "Couch" },
      { id: "p4", left: "bathtub", right: "soap", leftName: "Bathtub", rightName: "Soap" }
    ]
  },
  {
    level: 8,
    pairs: [
      { id: "p1", left: "pan", right: "egg", leftName: "Pan", rightName: "Egg" },
      { id: "p2", left: "book", right: "bookmark", leftName: "Book", rightName: "Bookmark" },
      { id: "p3", left: "lock", right: "key", leftName: "Lock", rightName: "Key" },
      { id: "p4", left: "bowl", right: "spoon", leftName: "Bowl", rightName: "Spoon" }
    ]
  },
  {
    level: 9,
    pairs: [
      { id: "p1", left: "cup", right: "teapot", leftName: "Cup", rightName: "Teapot" },
      { id: "p2", left: "toothbrush", right: "tooth", leftName: "Toothbrush", rightName: "Tooth" },
      { id: "p3", left: "shoe", right: "sock", leftName: "Shoe", rightName: "Sock" },
      { id: "p4", left: "baby", right: "baby_bottle", leftName: "Baby", rightName: "Bottle" }
    ]
  },
  {
    level: 10,
    pairs: [
      { id: "p1", left: "sponge", right: "soap", leftName: "Sponge", rightName: "Soap" },
      { id: "p2", left: "fork", right: "plate", leftName: "Fork", rightName: "Plate" },
      { id: "p3", left: "door", right: "key", leftName: "Door", rightName: "Key" },
      { id: "p4", left: "bulb", right: "flashlight", leftName: "Bulb", rightName: "Flashlight" }
    ]
  },

  // Levels 11-15: School & Learning (4 pairs)
  {
    level: 11,
    pairs: [
      { id: "p1", left: "pencil", right: "notebook", leftName: "Pencil", rightName: "Notebook" },
      { id: "p2", left: "crayon", right: "paper", leftName: "Crayon", rightName: "Paper" },
      { id: "p3", left: "scissors", right: "paperclip", leftName: "Scissors", rightName: "Paperclip" },
      { id: "p4", left: "backpack", right: "books", leftName: "Backpack", rightName: "Books" }
    ]
  },
  {
    level: 12,
    pairs: [
      { id: "p1", left: "paintbrush", right: "palette", leftName: "Paintbrush", rightName: "Palette" },
      { id: "p2", left: "scissors", right: "paperclip", leftName: "Scissors", rightName: "Paperclip" },
      { id: "p3", left: "ruler", right: "pencil", leftName: "Ruler", rightName: "Pencil" },
      { id: "p4", left: "book", right: "bookmark", leftName: "Book", rightName: "Bookmark" }
    ]
  },
  {
    level: 13,
    pairs: [
      { id: "p1", left: "crayon", right: "paper", leftName: "Crayon", rightName: "Paper" },
      { id: "p2", left: "backpack", right: "books", leftName: "Backpack", rightName: "Books" },
      { id: "p3", left: "pencil", right: "ruler", leftName: "Pencil", rightName: "Ruler" },
      { id: "p4", left: "paintbrush", right: "palette", leftName: "Paintbrush", rightName: "Palette" }
    ]
  },
  {
    level: 14,
    pairs: [
      { id: "p1", left: "notebook", right: "pencil", leftName: "Notebook", rightName: "Pencil" },
      { id: "p2", left: "paperclip", right: "paper", leftName: "Paperclip", rightName: "Paper" },
      { id: "p3", left: "backpack", right: "ruler", leftName: "Backpack", rightName: "Ruler" },
      { id: "p4", left: "book", right: "bookmark", leftName: "Book", rightName: "Bookmark" }
    ]
  },
  {
    level: 15,
    pairs: [
      { id: "p1", left: "paintbrush", right: "palette", leftName: "Paintbrush", rightName: "Palette" },
      { id: "p2", left: "crayon", right: "notebook", leftName: "Crayon", rightName: "Notebook" },
      { id: "p3", left: "scissors", right: "paper", leftName: "Scissors", rightName: "Paper" },
      { id: "p4", left: "backpack", right: "books", leftName: "Backpack", rightName: "Books" }
    ]
  },

  // Levels 16-20: Animals & Habitats (4 pairs)
  {
    level: 16,
    pairs: [
      { id: "p1", left: "bird", right: "nest", leftName: "Bird", rightName: "Nest" },
      { id: "p2", left: "bee", right: "honey", leftName: "Honeybee", rightName: "Honey" },
      { id: "p3", left: "fish", right: "wave", leftName: "Fish", rightName: "Water" },
      { id: "p4", left: "dog", right: "bone", leftName: "Dog", rightName: "Bone" }
    ]
  },
  {
    level: 17,
    pairs: [
      { id: "p1", left: "rabbit", right: "carrot", leftName: "Rabbit", rightName: "Carrot" },
      { id: "p2", left: "spider", right: "web", leftName: "Spider", rightName: "Web" },
      { id: "p3", left: "cat", right: "mouse", leftName: "Cat", rightName: "Mouse" },
      { id: "p4", left: "bee", right: "sunflower", leftName: "Bee", rightName: "Sunflower" }
    ]
  },
  {
    level: 18,
    pairs: [
      { id: "p1", left: "butterfly", right: "tulip", leftName: "Butterfly", rightName: "Flower" },
      { id: "p2", left: "dog", right: "bone", leftName: "Dog", rightName: "Bone" },
      { id: "p3", left: "bird", right: "nest", leftName: "Bird", rightName: "Nest" },
      { id: "p4", left: "fish", right: "wave", leftName: "Fish", rightName: "Water" }
    ]
  },
  {
    level: 19,
    pairs: [
      { id: "p1", left: "rabbit", right: "carrot", leftName: "Rabbit", rightName: "Carrot" },
      { id: "p2", left: "spider", right: "web", leftName: "Spider", rightName: "Web" },
      { id: "p3", left: "cat", right: "mouse", leftName: "Cat", rightName: "Mouse" },
      { id: "p4", left: "bee", right: "honey", leftName: "Bee", rightName: "Honey" }
    ]
  },
  {
    level: 20,
    pairs: [
      { id: "p1", left: "butterfly", right: "sunflower", leftName: "Butterfly", rightName: "Sunflower" },
      { id: "p2", left: "dog", right: "bone", leftName: "Dog", rightName: "Bone" },
      { id: "p3", left: "bird", right: "nest", leftName: "Bird", rightName: "Nest" },
      { id: "p4", left: "rabbit", right: "carrot", leftName: "Rabbit", rightName: "Carrot" }
    ]
  },

  // Levels 21-25: Food & Delicacies (4 pairs)
  {
    level: 21,
    pairs: [
      { id: "p1", left: "bread", right: "butter", leftName: "Bread", rightName: "Butter" },
      { id: "p2", left: "cookie", right: "milk", leftName: "Cookie", rightName: "Milk" },
      { id: "p3", left: "cupcake", right: "ice_cream", leftName: "Cupcake", rightName: "Ice Cream" },
      { id: "p4", left: "cup", right: "teapot", leftName: "Cup", rightName: "Teapot" }
    ]
  },
  {
    level: 22,
    pairs: [
      { id: "p1", left: "pan", right: "egg", leftName: "Pan", rightName: "Egg" },
      { id: "p2", left: "bowl", right: "spoon", leftName: "Bowl", rightName: "Spoon" },
      { id: "p3", left: "bread", right: "butter", leftName: "Bread", rightName: "Butter" },
      { id: "p4", left: "cookie", right: "milk", leftName: "Cookie", rightName: "Milk" }
    ]
  },
  {
    level: 23,
    pairs: [
      { id: "p1", left: "cupcake", right: "ice_cream", leftName: "Cupcake", rightName: "Ice Cream" },
      { id: "p2", left: "cooking_pot", right: "spoon", leftName: "Pot", rightName: "Spoon" },
      { id: "p3", left: "fork", right: "plate", leftName: "Fork", rightName: "Plate" },
      { id: "p4", left: "bread", right: "butter", leftName: "Bread", rightName: "Butter" }
    ]
  },
  {
    level: 24,
    pairs: [
      { id: "p1", left: "pan", right: "egg", leftName: "Pan", rightName: "Egg" },
      { id: "p2", left: "cookie", right: "milk", leftName: "Cookie", rightName: "Milk" },
      { id: "p3", left: "cup", right: "teapot", leftName: "Cup", rightName: "Teapot" },
      { id: "p4", left: "bowl", right: "spoon", leftName: "Bowl", rightName: "Spoon" }
    ]
  },
  {
    level: 25,
    pairs: [
      { id: "p1", left: "bread", right: "butter", leftName: "Bread", rightName: "Butter" },
      { id: "p2", left: "cupcake", right: "ice_cream", leftName: "Cupcake", rightName: "Ice Cream" },
      { id: "p3", left: "pan", right: "egg", leftName: "Pan", rightName: "Egg" },
      { id: "p4", left: "fork", right: "plate", leftName: "Fork", rightName: "Plate" }
    ]
  },

  // Levels 26-30: Nature, Fun & Functional Associations (4 to 5 pairs)
  {
    level: 26,
    pairs: [
      { id: "p1", left: "rain", right: "umbrella", leftName: "Rain", rightName: "Umbrella" },
      { id: "p2", left: "sun", right: "sunglasses", leftName: "Sun", rightName: "Sunglasses" },
      { id: "p3", left: "moon", right: "star", leftName: "Moon", rightName: "Star" },
      { id: "p4", left: "fire", right: "wood", leftName: "Fire", rightName: "Wood" }
    ]
  },
  {
    level: 27,
    pairs: [
      { id: "p1", left: "train", right: "track", leftName: "Train", rightName: "Track" },
      { id: "p2", left: "plant", right: "seedling", leftName: "Plant", rightName: "Seedling" },
      { id: "p3", left: "drum", right: "guitar", leftName: "Drum", rightName: "Guitar" },
      { id: "p4", left: "gift", right: "balloon", leftName: "Gift", rightName: "Balloon" }
    ]
  },
  {
    level: 28,
    pairs: [
      { id: "p1", left: "crown", right: "gem", leftName: "Crown", rightName: "Gem" },
      { id: "p2", left: "trophy", right: "medal", leftName: "Trophy", rightName: "Medal" },
      { id: "p3", left: "rain", right: "umbrella", leftName: "Rain", rightName: "Umbrella" },
      { id: "p4", left: "sun", right: "sunglasses", leftName: "Sun", rightName: "Sunglasses" },
      { id: "p5", left: "moon", right: "star", leftName: "Moon", rightName: "Star" }
    ]
  },
  {
    level: 29,
    pairs: [
      { id: "p1", left: "fire", right: "wood", leftName: "Fire", rightName: "Wood" },
      { id: "p2", left: "train", right: "track", leftName: "Train", rightName: "Track" },
      { id: "p3", left: "drum", right: "guitar", leftName: "Drum", rightName: "Guitar" },
      { id: "p4", left: "gift", right: "balloon", leftName: "Gift", rightName: "Balloon" },
      { id: "p5", left: "plant", right: "seedling", leftName: "Plant", rightName: "Seedling" }
    ]
  },
  {
    level: 30,
    pairs: [
      { id: "p1", left: "crown", right: "gem", leftName: "Crown", rightName: "Gem" },
      { id: "p2", left: "trophy", right: "medal", leftName: "Trophy", rightName: "Medal" },
      { id: "p3", left: "sun", right: "sunglasses", leftName: "Sun", rightName: "Sunglasses" },
      { id: "p4", left: "train", right: "track", leftName: "Train", rightName: "Track" },
      { id: "p5", left: "rain", right: "umbrella", leftName: "Rain", rightName: "Umbrella" }
    ]
  }
];

// Helper to construct asset paths
function getAssetPath(assetName) {
  return `assets/svgs/${assetName}.svg`;
}

// 2. AUDIO SYNTHESIZER & BGM
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgm = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.bgm) {
      this.bgm = new Audio('bgm.mp3');
      this.bgm.loop = true;
      this.bgm.volume = 0.25;
      this.bgm.play().catch(() => {});
    } else if (this.bgm.paused && !this.muted) {
      this.bgm.play().catch(() => {});
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.bgm) {
      this.bgm.muted = this.muted;
    }
    return this.muted;
  }

  playTap() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);
      gain.gain.setValueAtTime(0.3, now);
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
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  playCorrect() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.07;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.28, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.36);
      });
    } catch (e) {}
  }

  playWrong() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.23);
    } catch (e) {}
  }

  playLevelComplete() {
    if (this.muted || !this.ctx) return;
    try {
      const melody = [
        { f: 523.25, t: 0 },
        { f: 659.25, t: 0.12 },
        { f: 783.99, t: 0.24 },
        { f: 1046.5, t: 0.36 },
        { f: 880.00, t: 0.54 },
        { f: 1046.5, t: 0.72 }
      ];
      const now = this.ctx.currentTime;
      melody.forEach(item => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteStart = now + item.t;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, noteStart);
        gain.gain.setValueAtTime(0.3, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + 0.42);
      });
    } catch (e) {}
  }
}

const sounds = new SoundEngine();

// 3. MASCOT SPARKY GENERATOR
function getSparkySVG(mood = 'idle') {
  let eyeLeft = `<circle cx="34" cy="40" r="6" fill="#293241"/><circle cx="36" cy="38" r="2.2" fill="#FFF"/>`;
  let eyeRight = `<circle cx="46" cy="40" r="6" fill="#293241"/><circle cx="48" cy="38" r="2.2" fill="#FFF"/>`;
  let mouth = `<path d="M35 49 Q40 54 45 49" stroke="#293241" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  let arms = `
    <path d="M18 46 Q10 48 12 55" stroke="#FF6B00" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M62 46 Q70 48 68 55" stroke="#FF6B00" stroke-width="5" stroke-linecap="round" fill="none"/>
  `;
  let extras = '';

  if (mood === 'curious') {
    eyeLeft = `<circle cx="33" cy="38" r="7" fill="#293241"/><circle cx="35" cy="36" r="2.5" fill="#FFF"/>`;
    eyeRight = `<circle cx="47" cy="40" r="5" fill="#293241"/><circle cx="48" cy="39" r="1.8" fill="#FFF"/>`;
    mouth = `<ellipse cx="40" cy="50" rx="3.5" ry="4" fill="#293241"/>`;
    extras = `<text x="56" y="24" font-size="14" font-weight="900" fill="#FF8F3D">?</text>`;
  } else if (mood === 'happy') {
    eyeLeft = `<path d="M29 41 Q34 35 39 41" stroke="#293241" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    eyeRight = `<path d="M41 41 Q46 35 51 41" stroke="#293241" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    mouth = `<path d="M34 47 Q40 58 46 47 Z" fill="#FF5252" stroke="#293241" stroke-width="2"/>`;
    arms = `
      <path d="M18 44 Q10 32 14 26" stroke="#FF6B00" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M62 44 Q70 32 66 26" stroke="#FF6B00" stroke-width="5" stroke-linecap="round" fill="none"/>
    `;
    extras = `
      <circle cx="22" cy="22" r="3" fill="#FFC83D"/>
      <circle cx="58" cy="22" r="3" fill="#FFC83D"/>
    `;
  } else if (mood === 'thinking') {
    eyeLeft = `<line x1="30" y1="40" x2="38" y2="40" stroke="#293241" stroke-width="3" stroke-linecap="round"/>`;
    eyeRight = `<circle cx="46" cy="39" r="5.5" fill="#293241"/><circle cx="47" cy="37" r="2" fill="#FFF"/>`;
    mouth = `<path d="M36 51 Q40 48 44 52" stroke="#293241" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    arms = `
      <path d="M18 46 Q10 48 12 55" stroke="#FF6B00" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M62 46 Q64 40 50 48" stroke="#FF6B00" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    `;
  } else if (mood === 'celebrate') {
    eyeLeft = `<path d="M29 40 Q34 33 39 40" stroke="#293241" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    eyeRight = `<path d="M41 40 Q46 33 51 40" stroke="#293241" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
    mouth = `<path d="M33 46 Q40 60 47 46 Z" fill="#FF3B30" stroke="#293241" stroke-width="2.5"/>`;
    arms = `
      <path d="M18 40 Q8 25 15 18" stroke="#FF6B00" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M62 40 Q72 25 65 18" stroke="#FF6B00" stroke-width="5" stroke-linecap="round" fill="none"/>
    `;
    extras = `
      <polygon points="40,6 42,12 48,12 43,16 45,22 40,18 35,22 37,16 32,12 38,12" fill="#FFC83D"/>
      <circle cx="20" cy="12" r="3" fill="#70D98B"/>
      <circle cx="60" cy="12" r="3" fill="#6EC8FF"/>
    `;
  }

  return `
    <svg viewBox="0 0 80 80" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="40" y1="20" x2="40" y2="12" stroke="#293241" stroke-width="3" stroke-linecap="round"/>
      <circle cx="40" cy="10" r="5" fill="#FFC83D" stroke="#293241" stroke-width="2"/>
      ${arms}
      <rect x="20" y="20" width="40" height="42" rx="18" fill="#FF8F3D" stroke="#293241" stroke-width="3"/>
      <rect x="25" y="27" width="30" height="28" rx="10" fill="#FFF3DB" stroke="#E2C99D" stroke-width="1.5"/>
      <ellipse cx="28" cy="44" rx="3" ry="2" fill="#FFB0B0"/>
      <ellipse cx="52" cy="44" rx="3" ry="2" fill="#FFB0B0"/>
      ${eyeLeft}
      ${eyeRight}
      ${mouth}
      <rect x="15" y="34" width="5" height="12" rx="2" fill="#FFC83D" stroke="#293241" stroke-width="2"/>
      <rect x="60" y="34" width="5" height="12" rx="2" fill="#FFC83D" stroke="#293241" stroke-width="2"/>
      <rect x="29" y="60" width="7" height="10" rx="3" fill="#FF6B00" stroke="#293241" stroke-width="2.5"/>
      <rect x="44" y="60" width="7" height="10" rx="3" fill="#FF6B00" stroke="#293241" stroke-width="2.5"/>
      ${extras}
    </svg>
  `;
}

// 4. CONFETTI CELEBRATION
class ConfettiManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animating = false;
  }

  resize() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  burst() {
    this.resize();
    this.particles = [];
    const colors = ['#FF6B00', '#FFC83D', '#6EC8FF', '#70D98B', '#A88BFF', '#FF8DA1'];
    for (let i = 0; i < 75; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 80,
        y: this.canvas.height / 2 - 40,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 12 - 4,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        spin: (Math.random() - 0.5) * 12,
        shape: Math.random() > 0.4 ? 'rect' : 'circle',
        opacity: 1
      });
    }

    if (!this.animating) {
      this.animating = true;
      this.update();
    }
  }

  update() {
    if (!this.animating) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let activeCount = 0;
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4;
      p.rotation += p.spin;
      p.opacity -= 0.012;

      if (p.opacity > 0) {
        activeCount++;
        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.restore();
      }
    }

    if (activeCount > 0) {
      requestAnimationFrame(() => this.update());
    } else {
      this.animating = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// 5. GAME ENGINE
class MatchGame {
  constructor() {
    this.currentLevelIndex = 0;
    this.selectedCard = null;
    this.matchedPairsCount = 0;
    this.totalPairsCount = 0;
    this.xp = 0;
    this.isPaused = false;
    this.isInputBlocked = false;

    this.hintTimer = null;
    this.hintInterval = 6000;

    this.canvas = document.getElementById('connection-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.confetti = new ConfettiManager(document.getElementById('confetti-canvas'));

    this.isDragging = false;
    this.dragStartPos = { x: 0, y: 0 };
    this.dragCurrentPos = { x: 0, y: 0 };

    this.initMascotUI();
    this.bindEvents();
  }

  initMascotUI() {
    document.getElementById('intro-sparky-box').innerHTML = getSparkySVG('happy');
    document.getElementById('game-sparky-box').innerHTML = getSparkySVG('idle');
    document.getElementById('complete-sparky-box').innerHTML = getSparkySVG('celebrate');
    
    // Set intro cards with SVG assets
    document.getElementById('intro-shoe-box').innerHTML = `<img src="${getAssetPath('shoe')}" alt="Shoe">`;
    document.getElementById('intro-sock-box').innerHTML = `<img src="${getAssetPath('sock')}" alt="Sock">`;
  }

  setMascotMood(mood, text = null) {
    const box = document.getElementById('game-sparky-box');
    box.innerHTML = getSparkySVG(mood);

    const speech = document.getElementById('sparky-speech-bubble');
    if (text) {
      speech.textContent = text;
      speech.classList.add('active');
      clearTimeout(this.speechTimeout);
      this.speechTimeout = setTimeout(() => {
        speech.classList.remove('active');
      }, 1600);
    }
  }

  bindEvents() {
    document.getElementById('btn-start-game').addEventListener('click', () => {
      sounds.init();
      sounds.playTap();
      this.showScreen('game-screen');
      this.startLevel(0);
    });

    const btnSound = document.getElementById('btn-sound');
    btnSound.addEventListener('click', () => {
      sounds.init();
      const muted = sounds.toggleMute();
      btnSound.textContent = muted ? '🔇' : '🔊';
      sounds.playTap();
    });

    document.getElementById('btn-pause').addEventListener('click', () => {
      sounds.init();
      sounds.playTap();
      this.pauseGame();
    });

    document.getElementById('btn-resume').addEventListener('click', () => {
      sounds.playTap();
      this.resumeGame();
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
      sounds.playTap();
      this.resumeGame();
      this.startLevel(this.currentLevelIndex);
    });

    document.getElementById('btn-home').addEventListener('click', () => {
      sounds.playTap();
      this.resumeGame();
      this.showScreen('start-screen');
    });

    document.getElementById('btn-next-level').addEventListener('click', () => {
      sounds.playTap();
      document.getElementById('complete-modal').classList.remove('active');
      this.currentLevelIndex = (this.currentLevelIndex + 1) % LEVELS.length;
      this.startLevel(this.currentLevelIndex);
    });

    document.getElementById('btn-replay-level').addEventListener('click', () => {
      sounds.playTap();
      document.getElementById('complete-modal').classList.remove('active');
      this.startLevel(this.currentLevelIndex);
    });

    window.addEventListener('resize', () => this.resizeCanvas());

    const stage = document.getElementById('stage-area');
    stage.addEventListener('pointermove', (e) => this.handlePointerMove(e));
    stage.addEventListener('pointerup', (e) => this.handlePointerUp(e));
    stage.addEventListener('pointercancel', (e) => this.handlePointerUp(e));
  }

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id === 'game-screen') {
      this.resizeCanvas();
    }
  }

  resizeCanvas() {
    const stage = document.getElementById('stage-area');
    if (stage) {
      this.canvas.width = stage.clientWidth;
      this.canvas.height = stage.clientHeight;
    }
  }

  resetHintTimer() {
    clearTimeout(this.hintTimer);
    document.querySelectorAll('.game-card').forEach(c => c.classList.remove('hinting'));
    this.hintTimer = setTimeout(() => this.triggerHint(), this.hintInterval);
  }

  triggerHint() {
    if (this.isPaused || this.isInputBlocked) return;
    const unmatched = Array.from(document.querySelectorAll('.game-card:not(.matched)'));
    if (unmatched.length === 0) return;

    const firstLeft = unmatched.find(c => c.dataset.side === 'left');
    if (!firstLeft) return;
    const matchingRight = unmatched.find(c => c.dataset.side === 'right' && c.dataset.pairId === firstLeft.dataset.pairId);

    if (firstLeft && matchingRight) {
      firstLeft.classList.add('hinting');
      setTimeout(() => {
        if (!firstLeft.classList.contains('matched')) {
          matchingRight.classList.add('hinting');
        }
      }, 350);
      this.setMascotMood('curious', "Look here! 👀");
    }
  }

  startLevel(index) {
    this.currentLevelIndex = index;
    const levelData = LEVELS[index];
    this.matchedPairsCount = 0;
    this.totalPairsCount = levelData.pairs.length;
    this.selectedCard = null;
    this.isInputBlocked = false;
    this.clearLine();

    document.getElementById('hud-level-text').textContent = `LEVEL ${levelData.level}`;
    const dotsContainer = document.getElementById('hud-dots');
    dotsContainer.innerHTML = '';
    for (let i = 0; i < this.totalPairsCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.id = `dot-${i}`;
      dotsContainer.appendChild(dot);
    }

    this.setMascotMood('idle', 'Find the pairs!');

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

    this.shuffleArray(leftItems);
    this.shuffleArray(rightItems);

    leftItems.forEach(item => {
      const card = this.createCardElement(item);
      leftCol.appendChild(card);
    });

    rightItems.forEach(item => {
      const card = this.createCardElement(item);
      rightCol.appendChild(card);
    });

    this.resizeCanvas();
    this.resetHintTimer();

    if (levelData.level === 1) {
      this.showTutorial(levelData.pairs[0].id);
    } else {
      this.hideTutorial();
    }
  }

  shuffleArray(arr) {
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
        <img src="${getAssetPath(item.key)}" alt="${item.name}" loading="eager" />
      </div>
    `;

    card.addEventListener('pointerdown', (e) => this.handleCardPointerDown(card, e));
    return card;
  }

  handleCardPointerDown(card, e) {
    if (this.isPaused || this.isInputBlocked || card.classList.contains('matched')) return;
    this.resetHintTimer();

    if (this.selectedCard && this.selectedCard.element === card) {
      this.deselectAll();
      sounds.playTap();
      return;
    }

    if (!this.selectedCard) {
      this.selectCard(card);
      sounds.playSelect();
      this.setMascotMood('curious');

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

    if (this.selectedCard.side === card.dataset.side) {
      this.deselectAll();
      this.selectCard(card);
      sounds.playSelect();
      return;
    }

    this.evaluateMatch(this.selectedCard.element, card);
  }

  handlePointerMove(e) {
    if (!this.isDragging || !this.selectedCard) return;
    const stageRect = document.getElementById('stage-area').getBoundingClientRect();
    this.dragCurrentPos = {
      x: e.clientX - stageRect.left,
      y: e.clientY - stageRect.top
    };
    this.drawLine(this.dragStartPos, this.dragCurrentPos, '#FF8F3D', 5, [6, 6]);
  }

  handlePointerUp(e) {
    if (!this.isDragging) return;
    this.isDragging = false;

    const targetEl = document.elementFromPoint(e.clientX, e.clientY);
    const targetCard = targetEl ? targetEl.closest('.game-card') : null;

    if (targetCard && targetCard !== this.selectedCard.element && !targetCard.classList.contains('matched')) {
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
      this.drawLine(pA, pB, '#3EBD61', 7);
      sounds.playCorrect();
      this.setMascotMood('happy', 'Great! 🌟');

      cardA.classList.remove('selected');
      cardB.classList.remove('selected');
      cardA.classList.add('matched');
      cardB.classList.add('matched');

      this.showToastFeedback();
      this.showFloatingXP(rectA, rectB);

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
        } else {
          this.setMascotMood('idle');
          this.resetHintTimer();
        }
      }, 700);

    } else {
      this.drawLine(pA, pB, '#FF6B6B', 5, [6, 4]);
      sounds.playWrong();
      this.setMascotMood('thinking', 'Try again! 🤔');

      cardA.classList.add('wrong');
      cardB.classList.add('wrong');

      setTimeout(() => {
        cardA.classList.remove('wrong', 'selected');
        cardB.classList.remove('wrong', 'selected');
        this.clearLine();
        this.selectedCard = null;
        this.isInputBlocked = false;
        this.setMascotMood('idle');
        this.resetHintTimer();
      }, 600);
    }
  }

  drawLine(p1, p2, color, width = 6, dash = []) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.lineCap = 'round';
    this.ctx.setLineDash(dash);

    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2 - 12;

    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
    this.ctx.stroke();
    this.ctx.restore();
  }

  clearLine() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  showToastFeedback() {
    const praises = ['Great! 🌟', 'Yay! 🎉', 'Super! 🚀', 'Awesome! ✨', 'Bingo! 🎈'];
    const text = praises[Math.floor(Math.random() * praises.length)];
    const toast = document.getElementById('feedback-toast');
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 650);
  }

  showFloatingXP(rectA, rectB) {
    this.xp += 10;
    document.getElementById('hud-xp-val').textContent = this.xp;

    const stageRect = document.getElementById('stage-area').getBoundingClientRect();
    const xpFloat = document.createElement('div');
    xpFloat.className = 'floating-xp';
    xpFloat.textContent = '+10 XP';
    xpFloat.style.left = `${(rectA.left + rectB.left) / 2 - stageRect.left}px`;
    xpFloat.style.top = `${(rectA.top + rectB.top) / 2 - stageRect.top}px`;

    document.getElementById('stage-area').appendChild(xpFloat);
    setTimeout(() => xpFloat.remove(), 900);
  }

  handleLevelComplete() {
    sounds.playLevelComplete();
    this.confetti.burst();

    setTimeout(() => {
      document.getElementById('complete-sub-text').textContent = `Level ${LEVELS[this.currentLevelIndex].level} Complete! ⭐`;
      document.getElementById('complete-modal').classList.add('active');
    }, 450);
  }

  showTutorial(targetPairId) {
    const leftCard = document.querySelector(`.game-card[data-side="left"][data-pair-id="${targetPairId}"]`);
    const rightCard = document.querySelector(`.game-card[data-side="right"][data-pair-id="${targetPairId}"]`);
    if (!leftCard || !rightCard) return;

    const layer = document.getElementById('tutorial-layer');
    const hand = document.getElementById('tutorial-hand');
    layer.style.display = 'block';

    const stageRect = document.getElementById('stage-area').getBoundingClientRect();
    const lRect = leftCard.getBoundingClientRect();
    const rRect = rightCard.getBoundingClientRect();

    const posLeft = {
      x: lRect.left + lRect.width / 2 - stageRect.left - 15,
      y: lRect.top + lRect.height / 2 - stageRect.top - 10
    };
    const posRight = {
      x: rRect.left + rRect.width / 2 - stageRect.left - 15,
      y: rRect.top + rRect.height / 2 - stageRect.top - 10
    };

    let step = 0;
    hand.style.transform = `translate(${posLeft.x}px, ${posLeft.y}px)`;

    clearInterval(this.tutorialInterval);
    this.tutorialInterval = setInterval(() => {
      step = (step + 1) % 2;
      const target = step === 0 ? posLeft : posRight;
      hand.style.transform = `translate(${target.x}px, ${target.y}px)`;
    }, 1200);
  }

  hideTutorial() {
    clearInterval(this.tutorialInterval);
    const layer = document.getElementById('tutorial-layer');
    if (layer) layer.style.display = 'none';
  }

  pauseGame() {
    this.isPaused = true;
    clearTimeout(this.hintTimer);
    document.getElementById('pause-modal').classList.add('active');
  }

  resumeGame() {
    this.isPaused = false;
    document.getElementById('pause-modal').classList.remove('active');
    this.resetHintTimer();
  }
}

// Start Game Instance upon DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.game = new MatchGame();
});
