import express from 'express';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { firstName, lastName, school, yearGroup, preferences } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, school, yearGroup, preferences },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user progress
router.get('/progress', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('progress');
    res.json(user.progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's weak areas
router.get('/weak-areas', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const weakAreas = user.getWeakAreas();
    res.json(weakAreas);
  } catch (error) {
    console.error('Error fetching weak areas:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save/update note
router.post('/notes', authenticateToken, async (req, res) => {
  try {
    const { subject, topic, content } = req.body;
    const user = await User.findById(req.user._id);

    const existingNote = user.notes.find(n => n.subject === subject && n.topic === topic);
    
    if (existingNote) {
      existingNote.content = content;
      existingNote.updatedAt = new Date();
    } else {
      user.notes.push({ subject, topic, content });
    }

    await user.save();
    res.json({ message: 'Note saved successfully' });
  } catch (error) {
    console.error('Error saving note:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get notes
router.get('/notes', authenticateToken, async (req, res) => {
  try {
    const { subject, topic } = req.query;
    const user = await User.findById(req.user._id).select('notes');
    
    let notes = user.notes;
    if (subject) notes = notes.filter(n => n.subject === subject);
    if (topic) notes = notes.filter(n => n.topic === topic);

    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete note
router.delete('/notes/:noteId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.notes = user.notes.filter(n => n._id.toString() !== req.params.noteId);
    await user.save();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;