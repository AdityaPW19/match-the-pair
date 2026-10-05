/**
 * Game Configuration for Match The Pair
 * Defines storage, audio assets, Sparky dialogue lines with transcription,
 * sprite frame mapping, and particle effects settings.
 */

export const GAME_CONFIG = {
  // Local storage key for saving player progression
  storageKey: 'matchThePairProgress',

  // Background and UI Audio
  audio: {
    bgMusic: 'assets/music/bgm.mp3',
    levelCompleteMusic: 'assets/music/level-complete.mp3',
    bgMusicVolume: 0.22,
    sfxVolume: 0.6,
    dialogueVolume: 0.95
  },

  // Sparky Voice Dialogues & Subtitles
  dialogues: {
    intro: [
      { audio: 'assets/sparkyDialogues/intro/find-the-match.mp3', text: 'Find the match!' },
      { audio: 'assets/sparkyDialogues/intro/its-paring-time.mp3', text: "It's pairing time!" },
      { audio: 'assets/sparkyDialogues/intro/which-one-fits.mp3', text: 'Which one fits?' },
      { audio: 'assets/sparkyDialogues/intro/can-you-beat-this-one.mp3', text: 'Can you beat this one?' }
    ],

    idle: [
      { audio: 'assets/sparkyDialogues/idle/can-you-spot-it.mp3', text: 'Can you spot it? 👀' },
      { audio: 'assets/sparkyDialogues/idle/find-the-best-match.mp3', text: 'Find the best match! ✨' },
      { audio: 'assets/sparkyDialogues/idle/find-the-combo.mp3', text: 'Find the combo! 🧩' },
      { audio: 'assets/sparkyDialogues/idle/go-matcher-go.mp3', text: 'Go matcher, go! 🚀' },
      { audio: 'assets/sparkyDialogues/idle/lets-connect-them.mp3', text: "Let's connect them! 👆" },
      { audio: 'assets/sparkyDialogues/idle/match-em-up-friend.mp3', text: "Match 'em up, friend! 🤝" },
      { audio: 'assets/sparkyDialogues/idle/ready-match-go.mp3', text: 'Ready, match, go! 🌟' },
      { audio: 'assets/sparkyDialogues/idle/sparky-needs-your-hemp.mp3', text: 'Sparky needs your help! 🔥' },
      { audio: 'assets/sparkyDialogues/idle/which-two-belong.mp3', text: 'Which two belong? 🤔' }
    ],

    positive: [
      { audio: 'assets/sparkyDialogues/positive/great.mp3', text: 'Great! 🌟' },
      { audio: 'assets/sparkyDialogues/positive/yay.mp3', text: 'Yay! 🎉' },
      { audio: 'assets/sparkyDialogues/positive/you-got-it.mp3', text: 'You got it! 🎯' },
      { audio: 'assets/sparkyDialogues/positive/sparky-approves.mp3', text: 'Sparky approves! 👍' },
      { audio: 'assets/sparkyDialogues/positive/there-it-is.mp3', text: 'There it is! ✨' },
      { audio: 'assets/sparkyDialogues/positive/excellent-chat.mp3', text: 'Excellent! 👏' },
      { audio: 'assets/sparkyDialogues/positive/lets-do-this.mp3', text: "Let's do this! 💪" },
      { audio: 'assets/sparkyDialogues/positive/nice-attempt.mp3', text: 'Nice! Super! ⭐' },
      { audio: 'assets/sparkyDialogues/positive/yes.mp3', text: 'Yes! 🔥' },
      { audio: 'assets/sparkyDialogues/positive/yes-sir.mp3', text: 'Yes sir! 🎩' }
    ],

    wrong: [
      { audio: 'assets/sparkyDialogues/wrong/try-again.mp3', text: 'Try again! 💫' },
      { audio: 'assets/sparkyDialogues/wrong/almost.mp3', text: 'Almost! 🎈' },
      { audio: 'assets/sparkyDialogues/wrong/close-one.mp3', text: 'Close one! 🔍' },
      { audio: 'assets/sparkyDialogues/wrong/hmm-try-again.mp3', text: 'Hmm, try again! 🤔' },
      { audio: 'assets/sparkyDialogues/wrong/not-quite.mp3', text: 'Not quite! 💡' },
      { audio: 'assets/sparkyDialogues/wrong/think-think.mp3', text: 'Think, think! 🧠' },
      { audio: 'assets/sparkyDialogues/wrong/oh-tricky-one.mp3', text: 'Oh, tricky one! 👀' }
    ],

    levelcomplete: [
      { audio: 'assets/sparkyDialogues/levelcomplete/amazing-level-complete_.mp3', text: 'Amazing! Level complete! 🏆' },
      { audio: 'assets/sparkyDialogues/levelcomplete/fantastic-work.mp3', text: 'Fantastic work! ⭐' },
      { audio: 'assets/sparkyDialogues/levelcomplete/wonderful-next-level-unlocked.mp3', text: 'Wonderful! Next level unlocked! 🚀' },
      { audio: 'assets/sparkyDialogues/levelcomplete/you-did-it.mp3', text: 'You did it! 🎉' }
    ],

    menuDialogue: [
      { audio: 'assets/sparkyDialogues/menuDialogue/lets-pop.mp3', text: "Let's match! 🔥" },
      { audio: 'assets/sparkyDialogues/menuDialogue/ready-chat.mp3', text: "I'm ready! 😃" },
      { audio: 'assets/sparkyDialogues/menuDialogue/domo-domo.mp3', text: 'Domo domo! 🐾' }
    ]
  },

  // Sparky 3x3 Sprite Sheet Layout (matches number-balloon-pop benchmark)
  sprites: {
    sheet: 'assets/sparkySprites.png',
    cols: 3,
    rows: 3,
    // Exact positions:
    // row 0: (0, 0% 0) = sparky, (1, 50% 0) = curious, (2, 100% 0) = happy
    // row 1: (0, 0% 50%) = thinking/wrong, (1, 50% 50%) = celebrate, (2, 100% 50%) = speaking
    // row 2: (0, 0% 100%) = idle/waving, (1, 50% 100%) = correct/thumbsUp, (2, 100% 100%) = kind/welcome
    positions: {
      curious: '50% 0',
      happy: '100% 0',
      thinking: '0 50%',
      wrong: '0 50%',
      celebrate: '50% 50%',
      speaking: '100% 50%',
      idle: '0 100%',
      correct: '50% 100%',
      thumbsUp: '50% 100%',
      kind: '100% 100%',
      welcome: '100% 100%',
      peeking: '100% 50%'
    }
  },

  // Inactivity gap before triggering idle reminder dialogue
  inactivity: {
    minGapMs: 6000,
    maxGapMs: 10000
  },

  // Flower Particle Colors (borrowed from balloon pop benchmark)
  flowerPalettes: [
    { petals: '#ff4d6d', center: '#ffeb3b' },
    { petals: '#38bdf8', center: '#fff59d' },
    { petals: '#4ade80', center: '#ffffff' },
    { petals: '#fbbf24', center: '#ff7043' },
    { petals: '#a855f7', center: '#ffff8d' },
    { petals: '#fb923c', center: '#fff9c4' },
    { petals: '#ff80ab', center: '#ffffff' },
    { petals: '#34d399', center: '#fef08a' }
  ]
};
