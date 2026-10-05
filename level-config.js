/**
 * Level Configurations for Match The Pair
 * Defines all levels with their pair associations and display names.
 * Easily editable and extensible for new educational matching themes.
 */
export const LEVELS_CONFIG = [
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
