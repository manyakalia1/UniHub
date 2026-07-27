import express from 'express';
import { loadDB, saveDB } from '../data/store.js';

const router = express.Router();

// GET /api/v1/clubs - Fetch all clubs
router.get('/', (req, res) => {
  const db = loadDB();
  res.json({ success: true, count: db.clubs.length, data: db.clubs });
});

// POST /api/v1/clubs - Create new club
router.post('/', (req, res) => {
  const db = loadDB();
  const newClub = {
    id: req.body.id || `club-${Date.now()}`,
    name: req.body.name || 'New Society',
    logo: req.body.logo || '🌟',
    description: req.body.description || 'Student university society.',
    memberCount: Number(req.body.memberCount) || 1,
    accentColor: req.body.accentColor || '#6366f1',
    banner: req.body.banner || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    coreTeam: req.body.coreTeam || []
  };

  db.clubs.push(newClub);
  saveDB(db);

  res.status(201).json({ success: true, message: 'Club created successfully', data: newClub });
});

// GET /api/v1/clubs/requests - Get club applications
router.get('/requests', (req, res) => {
  const db = loadDB();
  res.json({ success: true, count: (db.clubRequests || []).length, data: db.clubRequests || [] });
});

// POST /api/v1/clubs/requests - Submit club application
router.post('/requests', (req, res) => {
  const db = loadDB();
  if (!db.clubRequests) db.clubRequests = [];

  const newRequest = {
    id: `req-${Date.now()}`,
    clubName: req.body.clubName,
    category: req.body.category,
    leadName: req.body.leadName,
    leadEmail: req.body.leadEmail,
    reason: req.body.reason,
    status: 'pending',
    date: new Date().toISOString().split('T')[0]
  };

  db.clubRequests.unshift(newRequest);
  saveDB(db);

  res.status(201).json({ success: true, message: 'Club request submitted for admin review', data: newRequest });
});

export default router;
