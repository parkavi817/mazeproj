import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Clock, Zap, RotateCcw, Home, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from '../utils/confetti';

export default function VictoryModal({ 
  isOpen, 
  score, 
  time, 
  moves, 
  environment,
  isNewBest,
  onPlayAgain,
  nextEnvironment
}) {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (isOpen) {
      confetti();
    }
  }, [isOpen]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getGrade = () => {
    const efficiency = score / (moves + time);
    if (efficiency > 2) return { grade: 'S', color: '#ffd700' };
    if (efficiency > 1.5) return { grade: 'A', color: '#10b981' };
    if (efficiency > 1) return { grade: 'B', color: '#38bdf8' };
    if (efficiency > 0.5) return { grade: 'C', color: '#f59e0b' };
    return { grade: 'D', color: '#ef4444' };
  };
  
  const { grade, color } = getGrade();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-surface border border-border"
          >
            {/* Header */}
            <div 
              className="relative h-40 flex items-center justify-center overflow-hidden"
              style={{ background: environment.background }}
            >
              {/* Particles */}
              {environment.particles.map((particle, i) => (
                <motion.span
                  key={i}
                  className="absolute text-3xl"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ 
                    y: -100, 
                    opacity: [0, 1, 0],
                    x: Math.sin(i) * 50
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                >
                  {particle}
                </motion.span>
              ))}
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="relative z-10"
              >
                <Trophy className="w-20 h-20 text-yellow-500" />
                {isNewBest && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-green-500 text-xs font-bold text-white"
                  >
                    NEW BEST!
                  </motion.div>
                )}
              </motion.div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center text-white mb-2">
                Maze Completed!
              </h2>
              <p className="text-center text-gray-400 mb-6">
                {environment.name}
              </p>
              
              {/* Grade */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: 0.4 }}
                  className="w-24 h-24 rounded-full flex items-center justify-center text-5xl font-black"
                  style={{ 
                    background: `${color}20`,
                    color: color,
                    boxShadow: `0 0 30px ${color}40`
                  }}
                >
                  {grade}
                </motion.div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <Star className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                  <p className="text-2xl font-bold text-white">{score}</p>
                  <p className="text-xs text-gray-500">Score</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <Clock className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                  <p className="text-2xl font-bold text-white">{formatTime(time)}</p>
                  <p className="text-xs text-gray-500">Time</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <Zap className="w-6 h-6 mx-auto mb-1 text-green-500" />
                  <p className="text-2xl font-bold text-white">{moves}</p>
                  <p className="text-xs text-gray-500">Moves</p>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                <Link to="/" className="flex-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onPlayAgain}
                  className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2"
                  style={{ 
                    background: `linear-gradient(135deg, ${environment.colors.primary}, ${environment.colors.accent})` 
                  }}
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="font-semibold">Play Again</span>
                </motion.button>
              </div>
              
              {nextEnvironment && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/game/${nextEnvironment.id}`)}
                  className="w-full mt-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Next: {nextEnvironment.name}</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
