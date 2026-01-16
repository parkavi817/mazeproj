import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create(
  persist(
    (set, get) => ({
      user: null,
      currentScore: 0,
      totalGamesPlayed: 0,
      bestScores: {},
      unlockedEnvironments: ['space'],
      
      setUser: (user) => set({ user }),
      
      updateScore: (environment, score, time) => {
        const { bestScores, user } = get();
        const currentBest = bestScores[environment] || { score: 0, time: Infinity };
        
        if (score > currentBest.score || (score === currentBest.score && time < currentBest.time)) {
          const newBestScores = {
            ...bestScores,
            [environment]: { score, time }
          };
          set({ bestScores: newBestScores });
          
          // Sync with backend
          if (user) {
            fetch('/api/scores', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                oderId: user.id,
                environment,
                score,
                time
              })
            }).catch(console.error);
          }
        }
      },
      
      incrementGamesPlayed: () => set((state) => ({ 
        totalGamesPlayed: state.totalGamesPlayed + 1 
      })),
      
      unlockEnvironment: (env) => set((state) => ({
        unlockedEnvironments: [...new Set([...state.unlockedEnvironments, env])]
      })),
      
      resetProgress: () => set({
        currentScore: 0,
        totalGamesPlayed: 0,
        bestScores: {},
        unlockedEnvironments: ['space']
      })
    }),
    {
      name: 'maze-adventure-storage'
    }
  )
);
