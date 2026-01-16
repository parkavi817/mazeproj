import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db = null;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'maze_adventure';

async function connectDB() {
  try {
    const client = new MongoClient(MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB');
    
    // Create indexes
    await db.collection('users').createIndex({ oderId: 1 }, { unique: true });
    await db.collection('scores').createIndex({ oderId: 1, environment: 1 });
    await db.collection('scores').createIndex({ score: -1 });
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('⚠️ Running without database - using in-memory storage');
  }
}

// In-memory fallback storage
const memoryStore = {
  users: [],
  scores: []
};

// Helper to get collection or memory store
const getStore = (collection) => {
  if (db) return { type: 'db', store: db.collection(collection) };
  return { type: 'memory', store: memoryStore[collection] };
};

// Routes

// Register/Update user
app.post('/api/users', async (req, res) => {
  try {
    const { id, name } = req.body;
    
    if (!id || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const { type, store } = getStore('users');
    
    if (type === 'db') {
      await store.updateOne(
        { oderId: id },
        { $set: { oderId: id, name, updatedAt: new Date() } },
        { upsert: true }
      );
    } else {
      const existingIndex = store.findIndex(u => u.oderId === id);
      if (existingIndex >= 0) {
        store[existingIndex] = { oderId: id, name, updatedAt: new Date() };
      } else {
        store.push({ oderId: id, name, createdAt: new Date() });
      }
    }
    
    res.json({ success: true, message: 'User registered' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, store } = getStore('users');
    
    let user;
    if (type === 'db') {
      user = await store.findOne({ oderId: id });
    } else {
      user = store.find(u => u.oderId === id);
    }
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Submit score
app.post('/api/scores', async (req, res) => {
  try {
    const { oderId, environment, score, time } = req.body;
    
    if (!oderId || !environment || score === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const { type, store } = getStore('scores');
    
    const scoreEntry = {
      oderId,
      environment,
      score,
      time,
      createdAt: new Date()
    };
    
    if (type === 'db') {
      // Check if this is a new best score
      const existing = await store.findOne({ 
        oderId, 
        environment,
        score: { $gte: score }
      });
      
      if (!existing) {
        await store.updateOne(
          { oderId, environment },
          { $set: scoreEntry },
          { upsert: true }
        );
      }
    } else {
      const existingIndex = store.findIndex(
        s => s.oderId === oderId && s.environment === environment
      );
      
      if (existingIndex >= 0) {
        if (store[existingIndex].score < score) {
          store[existingIndex] = scoreEntry;
        }
      } else {
        store.push(scoreEntry);
      }
    }
    
    res.json({ success: true, message: 'Score submitted' });
  } catch (error) {
    console.error('Error submitting score:', error);
    res.status(500).json({ error: 'Failed to submit score' });
  }
});

// Get leaderboard (all environments)
app.get('/api/leaderboard', async (req, res) => {
  try {
    const { type, store } = getStore('scores');
    const usersStore = getStore('users');
    
    let scores;
    if (type === 'db') {
      scores = await store.aggregate([
        {
          $group: {
            _id: '$oderId',
            totalScore: { $sum: '$score' },
            bestTime: { $min: '$time' },
            environments: { $addToSet: '$environment' }
          }
        },
        { $sort: { totalScore: -1 } },
        { $limit: 50 }
      ]).toArray();
      
      // Get user names
      const userIds = scores.map(s => s._id);
      const users = await usersStore.store.find({ oderId: { $in: userIds } }).toArray();
      const userMap = Object.fromEntries(users.map(u => [u.oderId, u.name]));
      
      scores = scores.map((s, i) => ({
        rank: i + 1,
        oderId: s._id,
        name: userMap[s._id] || 'Anonymous',
        score: s.totalScore,
        time: s.bestTime,
        environments: s.environments.length
      }));
    } else {
      // In-memory aggregation
      const scoreMap = {};
      store.forEach(s => {
        if (!scoreMap[s.oderId]) {
          scoreMap[s.oderId] = { totalScore: 0, bestTime: Infinity, environments: new Set() };
        }
        scoreMap[s.oderId].totalScore += s.score;
        scoreMap[s.oderId].bestTime = Math.min(scoreMap[s.oderId].bestTime, s.time || Infinity);
        scoreMap[s.oderId].environments.add(s.environment);
      });
      
      scores = Object.entries(scoreMap)
        .map(([oderId, data]) => {
          const user = usersStore.store.find(u => u.oderId === oderId);
          return {
            oderId,
            name: user?.name || 'Anonymous',
            score: data.totalScore,
            time: data.bestTime === Infinity ? 0 : data.bestTime,
            environments: data.environments.size
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 50)
        .map((s, i) => ({ ...s, rank: i + 1 }));
    }
    
    res.json(scores);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get leaderboard by environment
app.get('/api/leaderboard/:environment', async (req, res) => {
  try {
    const { environment } = req.params;
    const { type, store } = getStore('scores');
    const usersStore = getStore('users');
    
    let scores;
    if (type === 'db') {
      scores = await store.find({ environment })
        .sort({ score: -1, time: 1 })
        .limit(50)
        .toArray();
      
      // Get user names
      const userIds = scores.map(s => s.oderId);
      const users = await usersStore.store.find({ oderId: { $in: userIds } }).toArray();
      const userMap = Object.fromEntries(users.map(u => [u.oderId, u.name]));
      
      scores = scores.map((s, i) => ({
        rank: i + 1,
        oderId: s.oderId,
        name: userMap[s.oderId] || 'Anonymous',
        score: s.score,
        time: s.time,
        environment: s.environment
      }));
    } else {
      scores = store
        .filter(s => s.environment === environment)
        .sort((a, b) => b.score - a.score || a.time - b.time)
        .slice(0, 50)
        .map((s, i) => {
          const user = usersStore.store.find(u => u.oderId === s.oderId);
          return {
            rank: i + 1,
            oderId: s.oderId,
            name: user?.name || 'Anonymous',
            score: s.score,
            time: s.time,
            environment: s.environment
          };
        });
    }
    
    res.json(scores);
  } catch (error) {
    console.error('Error fetching environment leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get user stats
app.get('/api/stats/:oderId', async (req, res) => {
  try {
    const { oderId } = req.params;
    const { type, store } = getStore('scores');
    
    let stats;
    if (type === 'db') {
      const scores = await store.find({ oderId }).toArray();
      stats = {
        totalScore: scores.reduce((sum, s) => sum + s.score, 0),
        gamesPlayed: scores.length,
        environments: [...new Set(scores.map(s => s.environment))],
        bestScores: Object.fromEntries(
          scores.map(s => [s.environment, { score: s.score, time: s.time }])
        )
      };
    } else {
      const userScores = store.filter(s => s.oderId === oderId);
      stats = {
        totalScore: userScores.reduce((sum, s) => sum + s.score, 0),
        gamesPlayed: userScores.length,
        environments: [...new Set(userScores.map(s => s.environment))],
        bestScores: Object.fromEntries(
          userScores.map(s => [s.environment, { score: s.score, time: s.time }])
        )
      };
    }
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: db ? 'connected' : 'in-memory',
    timestamp: new Date().toISOString()
  });
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
