import express from 'express';
import { loadDB, saveDB } from '../data/store.js';

const router = express.Router();

// GET /api/v1/events - Fetch all events (with optional category & search filters)
router.get('/', (req, res) => {
  const { category, search, status } = req.query;
  const db = loadDB();
  let events = db.events || [];

  if (status) {
    events = events.filter(e => e.status === status);
  }

  if (category && category !== 'all') {
    events = events.filter(e => e.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    events = events.filter(e => 
      e.title.toLowerCase().includes(q) ||
      e.clubName.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: events.length, data: events });
});

// GET /api/v1/events/:id - Get single event
router.get('/:id', (req, res) => {
  const db = loadDB();
  const event = db.events.find(e => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  res.json({ success: true, data: event });
});

// POST /api/v1/events - Create new event proposal
router.post('/', (req, res) => {
  const db = loadDB();
  const newEvent = {
    id: `evt-${Date.now()}`,
    title: req.body.title || 'Untitled Event',
    clubId: req.body.clubId || 'unihub_club',
    clubName: req.body.clubName || 'Student Club',
    date: req.body.date || new Date().toISOString().split('T')[0],
    time: req.body.time || '10:00 AM',
    venue: req.body.venue || 'Campus Auditorium',
    category: req.body.category || 'tech',
    capacity: Number(req.body.capacity) || 100,
    registeredCount: 0,
    queueCount: 0,
    status: req.body.status || 'pending',
    banner: req.body.banner || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    description: req.body.description || '',
    requirements: req.body.requirements || ['Student ID Card'],
    prizes: req.body.prizes || ['Certificate of Participation'],
    registrants: []
  };

  db.events.unshift(newEvent);
  saveDB(db);

  res.status(201).json({ success: true, message: 'Event proposal created successfully', data: newEvent });
});

// PATCH /api/v1/events/:id/status - Approve or Reject Event (Admin)
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status' });
  }

  const db = loadDB();
  const event = db.events.find(e => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  event.status = status;
  saveDB(db);

  res.json({ success: true, message: `Event status updated to ${status}`, data: event });
});

// POST /api/v1/events/:id/register - Student Registration for Event
router.post('/:id/register', (req, res) => {
  const { name, email, rollNo, department } = req.body;

  if (!name || !email || !rollNo) {
    return res.status(400).json({ success: false, message: 'Name, Email, and Roll Number are required' });
  }

  const db = loadDB();
  const event = db.events.find(e => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  if (!event.registrants) event.registrants = [];

  // Check if already registered
  const existing = event.registrants.find(r => r.email === email || r.rollNo === rollNo);
  if (existing) {
    return res.status(400).json({ 
      success: false, 
      message: 'Student already registered for this event',
      data: existing
    });
  }

  const isFull = event.registrants.length >= event.capacity;
  const registrationStatus = isFull ? 'queue' : 'approved';
  const passId = `ES-${Math.floor(100000 + Math.random() * 900000)}`;

  const newReg = {
    id: `reg-${Date.now()}`,
    passId,
    name,
    email,
    rollNo,
    department: department || 'General',
    status: registrationStatus,
    timestamp: new Date().toISOString()
  };

  event.registrants.push(newReg);

  if (registrationStatus === 'approved') {
    event.registeredCount = (event.registeredCount || 0) + 1;
  } else {
    event.queueCount = (event.queueCount || 0) + 1;
  }

  saveDB(db);

  res.status(201).json({
    success: true,
    message: registrationStatus === 'approved' ? 'Pass issued successfully!' : 'Added to waiting queue',
    registration: newReg,
    event
  });
});

// DELETE /api/v1/events/:id - Delete Event
router.delete('/:id', (req, res) => {
  const db = loadDB();
  const idx = db.events.findIndex(e => e.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Event not found' });
  }

  db.events.splice(idx, 1);
  saveDB(db);

  res.json({ success: true, message: 'Event deleted successfully' });
});

export default router;
