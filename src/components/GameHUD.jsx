import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Zap, Map, RotateCcw, Home, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GameHUD({ 
  score, 
  time, 
  moves, 
  environment, 
  onReset, 
  onHint,
  hintsUsed,
  maxHints = 3
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-surface/80 backdrop-blur-xl border border-border"
    >
      {/* Stats */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${environment.colors.primary}20` }}
          >
            <Star className="w-5 h-5" style={{ color: environment.colors.primary }} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Score</p>
            <p className="text-lg font-bold text-white">{score}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${environment.colors.accent}20` }}
          >
            <Clock className="w-5 h-5" style={{ color: environment.colors.accent }} />
          </div>
          <div>
            <p className="text-xs text-gray-500">Time</p>
            <p className="text-lg font-bold text-white">{formatTime(time)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${environment.colors.secondary}40` }}
          >
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Moves</p>
            <p className="text-lg font-bold text-white">{moves}</p>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onHint}
          disabled={hintsUsed >= maxHints}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Lightbulb className="w-5 h-5" />
          <span className="text-sm font-medium">{maxHints - hintsUsed}</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-5 h-5 text-gray-400" />
        </motion.button>
        
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Home className="w-5 h-5 text-gray-400" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
