// Maze generation using recursive backtracking algorithm
export function generateMaze(width, height, difficulty = 1) {
  // Ensure odd dimensions for proper maze structure
  const w = width % 2 === 0 ? width + 1 : width;
  const h = height % 2 === 0 ? height + 1 : height;
  
  // Initialize maze with walls
  const maze = Array(h).fill(null).map(() => Array(w).fill(1));
  
  // Directions: [dx, dy]
  const directions = [
    [0, -2], // Up
    [2, 0],  // Right
    [0, 2],  // Down
    [-2, 0]  // Left
  ];
  
  // Shuffle array helper
  const shuffle = (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };
  
  // Recursive carving function
  const carve = (x, y) => {
    maze[y][x] = 0;
    
    const shuffledDirs = shuffle(directions);
    
    for (const [dx, dy] of shuffledDirs) {
      const nx = x + dx;
      const ny = y + dy;
      
      if (nx > 0 && nx < w - 1 && ny > 0 && ny < h - 1 && maze[ny][nx] === 1) {
        maze[y + dy / 2][x + dx / 2] = 0;
        carve(nx, ny);
      }
    }
  };
  
  // Start carving from (1, 1)
  carve(1, 1);
  
  // Add extra paths based on difficulty (lower difficulty = more paths)
  const extraPaths = Math.floor((w * h) / (20 * difficulty));
  for (let i = 0; i < extraPaths; i++) {
    const x = Math.floor(Math.random() * (w - 2)) + 1;
    const y = Math.floor(Math.random() * (h - 2)) + 1;
    if (maze[y][x] === 1) {
      // Check if removing this wall creates a valid path
      const neighbors = [
        maze[y - 1]?.[x] === 0,
        maze[y + 1]?.[x] === 0,
        maze[y]?.[x - 1] === 0,
        maze[y]?.[x + 1] === 0
      ].filter(Boolean).length;
      
      if (neighbors >= 2) {
        maze[y][x] = 0;
      }
    }
  }
  
  // Set start and end positions
  const start = { x: 1, y: 1 };
  const end = { x: w - 2, y: h - 2 };
  
  // Ensure end is accessible
  maze[end.y][end.x] = 0;
  if (maze[end.y - 1][end.x] === 1 && maze[end.y][end.x - 1] === 1) {
    maze[end.y - 1][end.x] = 0;
  }
  
  // Add collectibles
  const collectibles = [];
  const numCollectibles = Math.floor((w * h) / 50) + difficulty;
  
  for (let i = 0; i < numCollectibles; i++) {
    let attempts = 0;
    while (attempts < 100) {
      const cx = Math.floor(Math.random() * (w - 2)) + 1;
      const cy = Math.floor(Math.random() * (h - 2)) + 1;
      
      if (maze[cy][cx] === 0 && 
          !(cx === start.x && cy === start.y) && 
          !(cx === end.x && cy === end.y) &&
          !collectibles.some(c => c.x === cx && c.y === cy)) {
        collectibles.push({ x: cx, y: cy, collected: false, value: 10 * difficulty });
        break;
      }
      attempts++;
    }
  }
  
  return { maze, start, end, collectibles, width: w, height: h };
}

export function solveMaze(maze, start, end) {
  const visited = new Set();
  const path = [];
  
  const dfs = (x, y) => {
    if (x === end.x && y === end.y) {
      path.push({ x, y });
      return true;
    }
    
    const key = `${x},${y}`;
    if (visited.has(key) || maze[y]?.[x] !== 0) {
      return false;
    }
    
    visited.add(key);
    path.push({ x, y });
    
    const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    for (const [dx, dy] of directions) {
      if (dfs(x + dx, y + dy)) {
        return true;
      }
    }
    
    path.pop();
    return false;
  };
  
  dfs(start.x, start.y);
  return path;
}
