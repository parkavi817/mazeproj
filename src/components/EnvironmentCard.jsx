import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

export default function EnvironmentCard({ environment, index }) {
  const navigate = useNavigate();
  const { bestScores, totalGamesPlayed } = useGameStore();
  
  const totalScore = Object.values(bestScores).reduce((sum, s) => sum + (s?.score || 0), 0);
  const isUnlocked = totalScore >= environment.unlockRequirement || environment.unlockRequirement === 0;
  const bestScore = bestScores[environment.id];
  
  const handleClick = () => {
    if (isUnlocked) {
      navigate(`/game/${environment.id}`);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={isUnlocked ? { scale: 1.02, y: -5 } : {}}
      onClick={handleClick}
      className={`relative group cursor-pointer ${!isUnlocked && 'opacity-60'}`}
    >
      <div 
        className="absolute inset-0 rounded-3xl opacity-50 blur-xl transition-opacity duration-300 group-hover:opacity-80"
        style={{ background: environment.background }}
      />
      
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/50 backdrop-blur-sm">
        {/* Header with gradient */}
        <div 
          className="h-32 relative overflow-hidden"
          style={{ background: environment.background }}
        >
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {environment.particles.map((particle, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                initial={{ 
                  x: Math.random() * 100 + '%', 
                  y: Math.random() * 100 + '%',
                  opacity: 0.6
                }}
                animate={{ 
                  y: [null, '-20%', null],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              >
                {particle}
              </motion.span>
            ))}
          </div>
          
          {/* Environment icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span 
              className="text-6xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {environment.icon}
            </motion.span>
          </div>
          
          {/* Lock overlay */}
          {!isUnlocked && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-center">
                <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-400">
                  {environment.unlockRequirement - totalScore} points to unlock
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-white">{environment.name}</h3>
            <div className="flex items-center gap-1">{Array.from({ length: environment.difficulty }).map((_, i) => (
                <Star 
                  key={i} 
                  className="w-4 h-4" 
                  style={{ color: environment.colors.primary }}
                  fill={environment.colors.primary}
                />
              ))}
            </div>
          </div>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {environment.description}
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-between">
            {bestScore ? (
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-300">Best: {bestScore.score}</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">Not played yet</span>
            )}
            
            {isUnlocked && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{ 
                  background: `linear-gradient(135deg, ${environment.colors.primary}, ${environment.colors.accent})`,
                  color: 'white'
                }}
              >
                Play Now
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
