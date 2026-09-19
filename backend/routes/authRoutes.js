import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'eventsync_rm_enterprises_secret_key_2026';

const AUTH_USERS = [
  { username: 'admin', password: 'password', role: 'admin', name: 'Manya Kalia (Admin)', clubId: null },
  { username: 'stacatos', password: 'password', role: 'club', name: 'Stacatos Dance Club', clubId: 'stacatos' },
  { username: 'cu_arcs', password: 'password', role: 'club', name: 'CU Arcs Sports Club', clubId: 'cu_arcs' },
  { username: 'ieee', password: 'password', role: 'club', name: 'IEEE Tech Society', clubId: 'ieee' }
];

// POST /api/v1/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  const user = AUTH_USERS.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { username: user.username, role: user.role, clubId: user.clubId },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      username: user.username,
      name: user.name,
      role: user.role,
      clubId: user.clubId
    }
  });
});

export default router;
