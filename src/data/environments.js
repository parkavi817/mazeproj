export const environments = [
  {
    id: 'space',
    name: 'Cosmic Odyssey',
    description: 'Navigate through asteroid fields and nebulae in the vast cosmos',
    icon: '🚀',
    colors: {
      primary: '#9E7FFF',
      secondary: '#1a1a2e',
      accent: '#f472b6',
      wall: '#2d2d44',
      path: '#0f0f1a',
      player: '#00ffff',
      goal: '#ffd700'
    },
    background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #2d1b4e 100%)',
    particles: ['✨', '⭐', '🌟', '💫'],
    difficulty: 1,
    unlockRequirement: 0,
    music: 'ambient-space'
  },
  {
    id: 'ocean',
    name: 'Deep Blue Abyss',
    description: 'Dive into the mysterious depths of the ocean realm',
    icon: '🌊',
    colors: {
      primary: '#38bdf8',
      secondary: '#0c4a6e',
      accent: '#06b6d4',
      wall: '#164e63',
      path: '#082f49',
      player: '#22d3ee',
      goal: '#fbbf24'
    },
    background: 'linear-gradient(180deg, #0c4a6e 0%, #082f49 50%, #0a1628 100%)',
    particles: ['🐠', '🐙', '🦀', '🐚', '🫧'],
    difficulty: 2,
    unlockRequirement: 100,
    music: 'underwater-ambience'
  },
  {
    id: 'city',
    name: 'Neon Metropolis',
    description: 'Race through the glowing streets of a cyberpunk city',
    icon: '🌃',
    colors: {
      primary: '#f472b6',
      secondary: '#1f1f1f',
      accent: '#a855f7',
      wall: '#374151',
      path: '#111827',
      player: '#ec4899',
      goal: '#10b981'
    },
    background: 'linear-gradient(135deg, #1f1f1f 0%, #2d1b4e 50%, #1a1a2e 100%)',
    particles: ['🏙️', '🚗', '💡', '🎮'],
    difficulty: 3,
    unlockRequirement: 250,
    music: 'synthwave'
  },
  {
    id: 'nature',
    name: 'Enchanted Forest',
    description: 'Wander through magical woods filled with ancient secrets',
    icon: '🌲',
    colors: {
      primary: '#10b981',
      secondary: '#14532d',
      accent: '#84cc16',
      wall: '#166534',
      path: '#052e16',
      player: '#4ade80',
      goal: '#fbbf24'
    },
    background: 'linear-gradient(180deg, #14532d 0%, #052e16 50%, #022c22 100%)',
    particles: ['🍃', '🦋', '🌸', '🍄', '✨'],
    difficulty: 2,
    unlockRequirement: 150,
    music: 'forest-ambience'
  },
  {
    id: 'zoo',
    name: 'Wild Safari',
    description: 'Explore the savanna and encounter exotic wildlife',
    icon: '🦁',
    colors: {
      primary: '#f59e0b',
      secondary: '#78350f',
      accent: '#ea580c',
      wall: '#92400e',
      path: '#451a03',
      player: '#fbbf24',
      goal: '#22c55e'
    },
    background: 'linear-gradient(180deg, #78350f 0%, #451a03 50%, #1c1917 100%)',
    particles: ['🦒', '🐘', '🦓', '🦜', '🌴'],
    difficulty: 3,
    unlockRequirement: 300,
    music: 'safari-drums'
  },
  {
    id: 'arctic',
    name: 'Frozen Tundra',
    description: 'Brave the icy winds of the polar wilderness',
    icon: '❄️',
    colors: {
      primary: '#67e8f9',
      secondary: '#164e63',
      accent: '#a5f3fc',
      wall: '#0e7490',
      path: '#083344',
      player: '#22d3ee',
      goal: '#f97316'
    },
    background: 'linear-gradient(180deg, #164e63 0%, #083344 50%, #0c1929 100%)',
    particles: ['❄️', '🐧', '🦭', '⛄', '🌨️'],
    difficulty: 4,
    unlockRequirement: 400,
    music: 'arctic-wind'
  },
  {
    id: 'volcano',
    name: 'Inferno Depths',
    description: 'Survive the scorching heat of volcanic caverns',
    icon: '🌋',
    colors: {
      primary: '#ef4444',
      secondary: '#7f1d1d',
      accent: '#f97316',
      wall: '#991b1b',
      path: '#450a0a',
      player: '#fbbf24',
      goal: '#22d3ee'
    },
    background: 'linear-gradient(180deg, #7f1d1d 0%, #450a0a 50%, #1c0a0a 100%)',
    particles: ['🔥', '💎', '🪨', '💥'],
    difficulty: 5,
    unlockRequirement: 500,
    music: 'volcanic-rumble'
  },
  {
    id: 'candy',
    name: 'Sugar Rush Kingdom',
    description: 'A delicious world made entirely of sweets and treats',
    icon: '🍭',
    colors: {
      primary: '#ec4899',
      secondary: '#831843',
      accent: '#f472b6',
      wall: '#be185d',
      path: '#500724',
      player: '#fbbf24',
      goal: '#a855f7'
    },
    background: 'linear-gradient(135deg, #831843 0%, #701a75 50%, #4a044e 100%)',
    particles: ['🍬', '🍩', '🧁', '🍪', '🎂'],
    difficulty: 2,
    unlockRequirement: 200,
    music: 'playful-melody'
  },


  {
    id: 'time',
    name: 'Chrono Rift',
    description: 'A fractured dimension where time flows differently in every zone',
    icon: '⏳',
    colors: {
      primary: '#facc15',
      secondary: '#312e81',
      accent: '#38bdf8',
      wall: '#1e1b4b',
      path: '#0f172a',
      player: '#22d3ee',
      goal: '#f472b6'
    },
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
    particles: ['⏳', '🕰️', '✨', '🌀'],
    difficulty: 4,
    unlockRequirement: 450,
    music: 'time-distortion'
  },

  {
    id: 'dream',
    name: 'Lucid Reverie',
    description: 'A surreal dreamscape where reality feels optional',
    icon: '🌙',
    colors: {
      primary: '#c084fc',
      secondary: '#2e1065',
      accent: '#f9a8d4',
      wall: '#4c1d95',
      path: '#240046',
      player: '#fcd34d',
      goal: '#22d3ee'
    },
    background: 'linear-gradient(180deg, #2e1065 0%, #240046 50%, #12001a 100%)',
    particles: ['🌙', '☁️', '🦋', '✨'],
    difficulty: 3,
    unlockRequirement: 280,
    music: 'dream-echo'
  },

  {
    id: 'steampunk',
    name: 'Clockwork Dominion',
    description: 'A mechanical empire of gears, steam, and brass',
    icon: '⚙️',
    colors: {
      primary: '#f59e0b',
      secondary: '#3f2a1d',
      accent: '#fde68a',
      wall: '#92400e',
      path: '#451a03',
      player: '#34d399',
      goal: '#60a5fa'
    },
    background: 'linear-gradient(135deg, #3f2a1d 0%, #451a03 50%, #1c1917 100%)',
    particles: ['⚙️', '🔩', '🔥', '💨'],
    difficulty: 4,
    unlockRequirement: 380,
    music: 'steam-pulse'
  },

  {
    id: 'gravity',
    name: 'Zero-G Paradox',
    description: 'A floating realm where gravity forgets its job',
    icon: '🪐',
    colors: {
      primary: '#7dd3fc',
      secondary: '#020617',
      accent: '#a78bfa',
      wall: '#1e293b',
      path: '#020617',
      player: '#facc15',
      goal: '#22c55e'
    },
    background: 'linear-gradient(180deg, #020617 0%, #020617 40%, #1e293b 100%)',
    particles: ['🪐', '🌌', '✨', '🛰️'],
    difficulty: 5,
    unlockRequirement: 550,
    music: 'zero-gravity'
  },

  {
    id: 'glitch',
    name: 'Reality.exe',
    description: 'A corrupted simulation full of visual glitches and broken logic',
    icon: '🖥️',
    colors: {
      primary: '#22c55e',
      secondary: '#020617',
      accent: '#ef4444',
      wall: '#064e3b',
      path: '#020617',
      player: '#38bdf8',
      goal: '#facc15'
    },
    background: 'linear-gradient(135deg, #020617 0%, #020617 50%, #064e3b 100%)',
    particles: ['💾', '⚠️', '🔺', '🟩', '🟥'],
    difficulty: 5,
    unlockRequirement: 600,
    music: 'digital-chaos'
  },

  {
    id: 'skylands',
    name: 'Celestial Skylands',
    description: 'Floating islands drifting above endless clouds',
    icon: '☁️',
    colors: {
      primary: '#8bc0dd',
      secondary: '#0c4a6e',
      accent: '#fde68a',
      wall: '#0369a1',
      path: '#0c4a6e',
      player: '#f97316',
      goal: '#22c55e'
    },
    background: 'linear-gradient(180deg, #0c4a6e 0%, #38bdf8 50%, #e0f2fe 100%)',
    particles: ['☁️', '🕊️', '✨', '🌤️'],
    difficulty: 3,
    unlockRequirement: 320,
    music: 'sky-drift'
  },

  {
    id: 'library',
    name: 'Infinite Archive',
    description: 'A colossal library where knowledge bends reality',
    icon: '📚',
    colors: {
      primary: '#fde68a',
      secondary: '#3f2a1d',
      accent: '#a78bfa',
      wall: '#7c2d12',
      path: '#2a160a',
      player: '#22d3ee',
      goal: '#f97316'
    },
    background: 'linear-gradient(135deg, #3f2a1d 0%, #2a160a 50%, #120a05 100%)',
    particles: ['📜', '✨', '🪶', '📖'],
    difficulty: 3,
    unlockRequirement: 260,
    music: 'arcane-library'
  },

  {
    id: 'desert',
    name: 'Mirage Expanse',
    description: 'A blazing desert where paths shimmer and deceive',
    icon: '🏜️',
    colors: {
      primary: '#fbbf24',
      secondary: '#78350f',
      accent: '#f97316',
      wall: '#92400e',
      path: '#451a03',
      player: '#38bdf8',
      goal: '#22c55e'
    },
    background: 'linear-gradient(180deg, #78350f 0%, #451a03 50%, #1c1917 100%)',
    particles: ['🌪️', '🔥', '✨', '🐍'],
    difficulty: 3,
    unlockRequirement: 300,
    music: 'desert-wind'
  },

  {
    id: 'underworld',
    name: 'Echoes Below',
    description: 'A shadow realm where every step leaves a haunting echo',
    icon: '👁️',
    colors: {
      primary: '#a855f7',
      secondary: '#020617',
      accent: '#ef4444',
      wall: '#3b0764',
      path: '#020617',
      player: '#facc15',
      goal: '#22d3ee'
    },
    background: 'linear-gradient(135deg, #020617 0%, #3b0764 50%, #1a032e 100%)',
    particles: ['👁️', '🕯️', '💀', '✨'],
    difficulty: 5,
    unlockRequirement: 520,
    music: 'dark-echoes'
  },

  {
    id: 'festival',
    name: 'Neon Carnival',
    description: 'A dazzling fairground where chaos feels like celebration',
    icon: '🎡',
    colors: {
      primary: '#fb7185',
      secondary: '#1f2933',
      accent: '#fde047',
      wall: '#7c2d12',
      path: '#111827',
      player: '#22d3ee',
      goal: '#a3e635'
    },
    background: 'linear-gradient(135deg, #1f2933 0%, #7c2d12 50%, #3b0764 100%)',
    particles: ['🎈', '🎆', '✨', '🎭'],
    difficulty: 2,
    unlockRequirement: 180,
    music: 'festival-frenzy'
  },

  {
    id: 'ancient',
    name: 'Runes of Eternity',
    description: 'A forgotten temple glowing with ancient power',
    icon: '🗿',
    colors: {
      primary: '#84cc16',
      secondary: '#1a2e05',
      accent: '#22c55e',
      wall: '#365314',
      path: '#052e16',
      player: '#facc15',
      goal: '#38bdf8'
    },
    background: 'linear-gradient(180deg, #1a2e05 0%, #052e16 50%, #022c22 100%)',
    particles: ['🗿', '✨', '🌿', '🔥'],
    difficulty: 4,
    unlockRequirement: 420,
    music: 'ancient-ritual'
  },

  {
    id: 'storm',
    name: 'Tempest Frontier',
    description: 'A land constantly reshaped by thunder and lightning',
    icon: '⛈️',
    colors: {
      primary: '#60a5fa',
      secondary: '#020617',
      accent: '#facc15',
      wall: '#1e293b',
      path: '#020617',
      player: '#22d3ee',
      goal: '#f97316'
    },
    background: 'linear-gradient(135deg, #020617 0%, #1e293b 50%, #020617 100%)',
    particles: ['⚡', '🌩️', '🌧️', '✨'],
    difficulty: 5,
    unlockRequirement: 580,
    music: 'storm-chase'
  }
];

export const getEnvironmentById = (id) => environments.find(env => env.id === id);
