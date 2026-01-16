import React, { useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MazeRenderer = memo(({ 
  mazeData, 
  playerPos, 
  environment, 
  cellSize = 24,
  showHint = false,
  hintPath = []
}) => {
  const { maze, end, collectibles } = mazeData;
  const containerRef = useRef(null);
  
  // Auto-scroll to keep player in view
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const playerX = playerPos.x * cellSize;
      const playerY = playerPos.y * cellSize;
      
      const scrollX = playerX - container.clientWidth / 2 + cellSize / 2;
      const scrollY = playerY - container.clientHeight / 2 + cellSize / 2;
      
      container.scrollTo({
        left: Math.max(0, scrollX),
        top: Math.max(0, scrollY),
        behavior: 'smooth'
      });
    }
  }, [playerPos, cellSize]);
  
  const hintSet = new Set(hintPath.map(p => `${p.x},${p.y}`));
  
  return (
    <div 
      ref={containerRef}
      className="relative overflow-auto rounded-2xl border-2 max-h-[70vh]"
      style={{ 
        borderColor: environment.colors.primary,
        background: environment.colors.path
      }}
    >
      <div 
        className="relative"
        style={{ 
          width: maze[0].length * cellSize,
          height: maze.length * cellSize
        }}
      >
        {/* Maze cells */}
        {maze.map((row, y) => (
          row.map((cell, x) => {
            const isWall = cell === 1;
            const isEnd = x === end.x && y === end.y;
            const isHint = showHint && hintSet.has(`${x},${y}`);
            const collectible = collectibles.find(c => c.x === x && c.y === y && !c.collected);
            
            return (
              <div
                key={`${x}-${y}`}
                className="absolute maze-cell"
                style={{
                  left: x * cellSize,
                  top: y * cellSize,
                  width: cellSize,
                  height: cellSize,
                  background: isWall 
                    ? environment.colors.wall 
                    : isHint 
                      ? `${environment.colors.primary}30`
                      : environment.colors.path,
                  borderRadius: isWall ? '4px' : '0',
                  boxShadow: isWall ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                {/* Goal */}
                {isEnd && (
                  <motion.div
                    className="absolute inset-1 rounded-lg flex items-center justify-center"
                    style={{ background: environment.colors.goal }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        `0 0 10px ${environment.colors.goal}`,
                        `0 0 20px ${environment.colors.goal}`,
                        `0 0 10px ${environment.colors.goal}`
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-xs">🏆</span>
                  </motion.div>
                )}
                
                {/* Collectible */}
                {collectible && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      y: [0, -3, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-sm">
                      {environment.particles[Math.floor(Math.random() * environment.particles.length)]}
                    </span>
                  </motion.div>
                )}
              </div>
            );
          })
        ))}
        
        {/* Player */}
        <motion.div
          className="absolute rounded-full player-glow z-10"
          style={{
            width: cellSize - 4,
            height: cellSize - 4,
            background: `radial-gradient(circle, ${environment.colors.player}, ${environment.colors.primary})`,
            color: environment.colors.player
          }}
          animate={{
            left: playerPos.x * cellSize + 2,
            top: playerPos.y * cellSize + 2
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ background: environment.colors.player }}
          />
        </motion.div>
      </div>
    </div>
  );
});

MazeRenderer.displayName = 'MazeRenderer';

export default MazeRenderer;
