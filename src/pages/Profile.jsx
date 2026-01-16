import React from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, Gamepad2, Star, Clock, Target, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useGameStore } from '../store/gameStore';
import { environments } from '../data/environments';

export default function Profile() {
  const { user, bestScores, totalGamesPlayed, unlockedEnvironments, resetProgress } = useGameStore();
  
  const totalScore = Object.values(bestScores).reduce((sum, s) => sum + (s?.score || 0), 0);
  const completedEnvironments = Object.keys(bestScores).length;
  
  const formatTime = (seconds) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border p-8 mb-8"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                {user?.name || 'Anonymous Player'}
              </h1>
              <p className="text-gray-400">Maze Adventurer</p>
            </div>
            
            <div className="sm:ml-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset Progress</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="p-6 rounded-2xl bg-surface border border-border text-center">
            <Trophy className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
            <p className="text-3xl font-bold text-white">{totalScore}</p>
            <p className="text-sm text-gray-500">Total Score</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-surface border border-border text-center">
            <Gamepad2 className="w-8 h-8 mx-auto mb-3 text-primary" />
            <p className="text-3xl font-bold text-white">{totalGamesPlayed}</p>
            <p className="text-sm text-gray-500">Games Played</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-surface border border-border text-center">
            <Target className="w-8 h-8 mx-auto mb-3 text-green-500" />
            <p className="text-3xl font-bold text-white">{completedEnvironments}</p>
            <p className="text-sm text-gray-500">Worlds Completed</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-surface border border-border text-center">
            <Star className="w-8 h-8 mx-auto mb-3 text-accent" />
            <p className="text-3xl font-bold text-white">{unlockedEnvironments.length}</p>
            <p className="text-sm text-gray-500">Worlds Unlocked</p>
          </div>
        </motion.div>
        
        {/* Environment Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">World Progress</h2>
          
          <div className="space-y-4">
            {environments.map((env, index) => {
              const score = bestScores[env.id];
              const isUnlocked = totalScore >= env.unlockRequirement || env.unlockRequirement === 0;
              
              return (
                <motion.div
                  key={env.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                    isUnlocked 
                      ? 'bg-surface/50 border-border' 
                      : 'bg-surface/20 border-border/50 opacity-60'
                  }`}
                >
                  {/* Environment Icon */}
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${env.colors.primary}20` }}
                  >
                    {env.icon}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white">{env.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{env.description}</p>
                  </div>
                  
                  {/* Stats */}
                  {score ? (
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{formatTime(score.time)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5" style={{ color: env.colors.primary }} />
                          <span className="text-xl font-bold text-white">{score.score}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-right">
                      {isUnlocked ? (
                        <span className="text-sm text-gray-500">Not played</span>
                      ) : (
                        <span className="text-sm text-gray-500">
                          {env.unlockRequirement - totalScore} pts to unlock
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
