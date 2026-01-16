import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import MazeRenderer from '../components/MazeRenderer';
import GameHUD from '../components/GameHUD';
import VictoryModal from '../components/VictoryModal';
import { getEnvironmentById, environments } from '../data/environments';
import { generateMaze, solveMaze } from '../utils/mazeGenerator';
import { useGameStore } from '../store/gameStore';

export default function Game() {
  const { environment: envId } = useParams();
  const navigate = useNavigate();
  const environment = getEnvironmentById(envId);
  
  const { updateScore, incrementGamesPlayed, bestScores } = useGameStore();
  
  const [mazeData, setMazeData] = useState(null);
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintPath, setHintPath] = useState([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  
  const timerRef = useRef(null);
  
  // Redirect if environment not found
  useEffect(() => {
    if (!environment) {
      navigate('/');
    }
  }, [environment, navigate]);
  
  // Initialize maze
  const initializeMaze = useCallback(() => {
    const size = 15 + environment.difficulty * 4;
    const maze = generateMaze(size, size, environment.difficulty);
    setMazeData(maze);
    setPlayerPos(maze.start);
    setScore(0);
    setMoves(0);
    setTime(0);
    setIsPlaying(true);
    setShowVictory(false);
    setShowHint(false);
    setHintPath([]);
    setHintsUsed(0);
  }, [environment]);
  
  useEffect(() => {
    if (environment) {
      initializeMaze();
    }
  }, [environment, initializeMaze]);
  
  // Timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);
  
  // Movement handler
  const movePlayer = useCallback((dx, dy) => {
    if (!isPlaying || !mazeData) return;
    
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;
    
    // Check bounds and walls
    if (
      newX >= 0 && 
      newX < mazeData.width && 
      newY >= 0 && 
      newY < mazeData.height && 
      mazeData.maze[newY][newX] === 0
    ) {
      setPlayerPos({ x: newX, y: newY });
      setMoves(m => m + 1);
      setShowHint(false);
      
      // Check for collectibles
      const collectible = mazeData.collectibles.find(
        c => c.x === newX && c.y === newY && !c.collected
      );
      
      if (collectible) {
        collectible.collected = true;
        setScore(s => s + collectible.value);
        setMazeData({ ...mazeData });
      }
      
      // Check for goal
      if (newX === mazeData.end.x && newY === mazeData.end.y) {
        handleVictory();
      }
    }
  }, [isPlaying, mazeData, playerPos]);
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          movePlayer(1, 0);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer]);
  
  // Victory handler
  const handleVictory = () => {
    setIsPlaying(false);
    clearInterval(timerRef.current);
    
    // Calculate final score with bonuses
    const timeBonus = Math.max(0, 300 - time) * 2;
    const moveBonus = Math.max(0, 200 - moves);
    const collectibleBonus = mazeData.collectibles.filter(c => c.collected).length * 50;
    const finalScore = score + timeBonus + moveBonus + collectibleBonus;
    
    setScore(finalScore);
    updateScore(envId, finalScore, time);
    incrementGamesPlayed();
    setShowVictory(true);
  };
  
  // Hint handler
  const handleHint = () => {
    if (hintsUsed >= 3 || !mazeData) return;
    
    const path = solveMaze(mazeData.maze, playerPos, mazeData.end);
    setHintPath(path.slice(0, 10)); // Show next 10 steps
    setShowHint(true);
    setHintsUsed(h => h + 1);
    setScore(s => Math.max(0, s - 20)); // Penalty for using hint
    
    setTimeout(() => setShowHint(false), 3000);
  };
  
  // Get next environment
  const currentIndex = environments.findIndex(e => e.id === envId);
  const nextEnvironment = environments[currentIndex + 1];
  
  const isNewBest = bestScores[envId] ? score > bestScores[envId].score : true;
  
  if (!environment || !mazeData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }
  
  return (
    <div 
      className="min-h-screen environment-gradient"
      style={{ background: environment.background }}
    >
      {/* Ambient particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {environment.particles.map((particle, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2
            }}
          >
            {particle}
          </motion.span>
        ))}
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <span className="text-5xl mb-2 block">{environment.icon}</span>
          <h1 className="text-3xl font-bold text-white">{environment.name}</h1>
        </motion.div>
        
        {/* HUD */}
        <div className="mb-6">
          <GameHUD
            score={score}
            time={time}
            moves={moves}
            environment={environment}
            onReset={initializeMaze}
            onHint={handleHint}
            hintsUsed={hintsUsed}
          />
        </div>
        
        {/* Maze */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-6"
        >
          <MazeRenderer
            mazeData={mazeData}
            playerPos={playerPos}
            environment={environment}
            showHint={showHint}
            hintPath={hintPath}
          />
        </motion.div>
        
        {/* Mobile Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center md:hidden"
        >
          <div className="grid grid-cols-3 gap-2">
            <div />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => movePlayer(0, -1)}
              className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center active:bg-white/20"
            >
              <ArrowUp className="w-8 h-8 text-white" />
            </motion.button>
            <div />
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => movePlayer(-1, 0)}
              className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center active:bg-white/20"
            >
              <ArrowLeft className="w-8 h-8 text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => movePlayer(0, 1)}
              className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center active:bg-white/20"
            >
              <ArrowDown className="w-8 h-8 text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => movePlayer(1, 0)}
              className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center active:bg-white/20"
            >
              <ArrowRight className="w-8 h-8 text-white" />
            </motion.button>
          </div>
        </motion.div>
        
        {/* Controls hint */}
        <p className="text-center text-gray-400 text-sm mt-4 hidden md:block">
          Use Arrow Keys or WASD to move
        </p>
      </div>
      
      {/* Victory Modal */}
      <VictoryModal
        isOpen={showVictory}
        score={score}
        time={time}
        moves={moves}
        environment={environment}
        isNewBest={isNewBest}
        onPlayAgain={initializeMaze}
        nextEnvironment={nextEnvironment}
      />
    </div>
  );
}
