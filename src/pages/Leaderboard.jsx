import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Star, Clock, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import { environments } from '../data/environments';

export default function Leaderboard() {
  const [selectedEnv, setSelectedEnv] = useState('all');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchLeaderboard();
  }, [selectedEnv]);
  
  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const url = selectedEnv === 'all' 
        ? '/api/leaderboard' 
        : `/api/leaderboard/${selectedEnv}`;
      const res = await fetch(url);
      const data = await res.json();
      setLeaderboard(data);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
      // Mock data for demo
      setLeaderboard([
        { rank: 1, name: 'CosmicExplorer', score: 2450, environment: 'space', time: 145 },
        { rank: 2, name: 'MazeRunner99', score: 2280, environment: 'ocean', time: 167 },
        { rank: 3, name: 'PuzzleMaster', score: 2150, environment: 'city', time: 189 },
        { rank: 4, name: 'AdventureSeeker', score: 1980, environment: 'nature', time: 201 },
        { rank: 5, name: 'StarNavigator', score: 1850, environment: 'space', time: 215 },
        { rank: 6, name: 'DeepDiver', score: 1720, environment: 'ocean', time: 234 },
        { rank: 7, name: 'CitySlicker', score: 1650, environment: 'city', time: 256 },
        { rank: 8, name: 'ForestWalker', score: 1580, environment: 'nature', time: 278 },
        { rank: 9, name: 'IceBreaker', score: 1490, environment: 'arctic', time: 290 },
        { rank: 10, name: 'LavaJumper', score: 1420, environment: 'volcano', time: 312 },
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{rank}</span>;
    }
  };
  
  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30';
      default:
        return 'bg-surface/50 border-border';
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Leaderboard</h1>
          <p className="text-gray-400">Top maze adventurers from around the world</p>
        </motion.div>
        
        {/* Environment Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <button
            onClick={() => setSelectedEnv('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedEnv === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface text-gray-400 hover:text-white'
            }`}
          >
            All Worlds
          </button>
          {environments.map((env) => (
            <button
              key={env.id}
              onClick={() => setSelectedEnv(env.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                selectedEnv === env.id
                  ? 'text-white'
                  : 'bg-surface text-gray-400 hover:text-white'
              }`}
              style={{
                background: selectedEnv === env.id ? env.colors.primary : undefined
              }}
            >
              <span>{env.icon}</span>
              <span className="hidden sm:inline">{env.name}</span>
            </button>
          ))}
        </motion.div>
        
        {/* Leaderboard List */}
        <div className="space-y-3">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-2xl bg-surface/50 animate-pulse"
              />
            ))
          ) : (
            leaderboard.map((entry, index) => {
              const env = environments.find(e => e.id === entry.environment);
              return (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border ${getRankStyle(entry.rank)}`}
                >
                  {/* Rank */}
                  <div className="w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center">
                    {getRankIcon(entry.rank)}
                  </div>
                  
                  {/* Player Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{entry.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      {env && (
                        <>
                          <span>{env.icon}</span>
                          <span>{env.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{formatTime(entry.time)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-xl font-bold text-white">{entry.score}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
