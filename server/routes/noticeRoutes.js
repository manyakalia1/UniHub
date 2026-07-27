import express from 'express';
import { loadDB, saveDB } from '../data/store.js';

const router = express.Router();

// GET /api/v1/notices - Fetch all notices
router.get('/', (req, res) => {
  const db = loadDB();
  res.json({ success: true, count: db.notices.length, data: db.notices });
});

// POST /api/v1/notices - Post new notice
router.post('/', (req, res) => {
  const db = loadDB();
  const newNotice = {
    id: `not-${Date.now()}`,
    title: req.body.title || 'Campus Announcement',
    content: req.body.content || '',
    category: req.body.category || 'general',
    author: req.body.author || 'Admin Board',
    date: new Date().toISOString().split('T')[0]
  };

  db.notices.unshift(newNotice);
  saveDB(db);

  res.status(201).json({ success: true, message: 'Notice posted successfully', data: newNotice });
});

export default router;
