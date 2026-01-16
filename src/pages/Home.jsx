import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gamepad2, Trophy, Users, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import EnvironmentCard from '../components/EnvironmentCard';
import { environments } from '../data/environments';
import { useGameStore } from '../store/gameStore';

export default function Home() {
  const { bestScores, totalGamesPlayed, user, setUser } = useGameStore();
  const [showUsernameModal, setShowUsernameModal] = useState(!user);
  const [username, setUsername] = useState('');
  
  const totalScore = Object.values(bestScores).reduce((sum, s) => sum + (s?.score || 0), 0);
  
  const handleSetUsername = async () => {
    if (username.trim()) {
      const newUser = { id: Date.now().toString(), name: username.trim() };
      setUser(newUser);
      setShowUsernameModal(false);
      
      // Register user in backend
      try {
        await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        });
      } catch (err) {
        console.error('Failed to register user:', err);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Floating particles */}
        {['🚀', '🌊', '🌲', '🦁', '❄️', '🌋', '🍭', '🌃'].map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          >
            {emoji}
          </motion.span>
        ))}
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium"> Unique Worlds to Explore</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Maze Adventure
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Navigate through breathtaking environments, collect treasures, and challenge yourself 
              in this immersive maze experience. From cosmic odysseys to volcanic depths!
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface/50 border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-white">{totalScore}</p>
                  <p className="text-sm text-gray-500">Total Score</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface/50 border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-white">{totalGamesPlayed}</p>
                  <p className="text-sm text-gray-500">Games Played</p>
                </div>
              </motion.div>
              
              {user && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-surface/50 border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-white">{user.name}</p>
                    <p className="text-sm text-gray-500">Player</p>
                  </div>
                </motion.div>
              )}
            </div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-8 h-8 mx-auto text-gray-500" />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Environments Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your World
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Each environment offers unique challenges and aesthetics. 
              Unlock new worlds by earning points!
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {environments.map((env, index) => (
              <EnvironmentCard key={env.id} environment={env} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Username Modal */}
      {showUsernameModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-8 rounded-3xl bg-surface border border-border"
          >
            <div className="text-center mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎮
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome, Adventurer!</h2>
              <p className="text-gray-400">Enter your name to begin your journey</p>
            </div>
            
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSetUsername()}
              placeholder="Your name..."
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors mb-4"
              autoFocus
            />
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSetUsername}
              disabled={!username.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Adventure
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
