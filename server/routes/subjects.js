import express from 'express';
import Subject from '../models/Subject.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find().select('-topics.content');
    res.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get subject by code
router.get('/:code', async (req, res) => {
  try {
    const subject = await Subject.findOne({ code: req.params.code });
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.json(subject);
  } catch (error) {
    console.error('Error fetching subject:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get topic content
router.get('/:code/topics/:slug', async (req, res) => {
  try {
    const subject = await Subject.findOne({ code: req.params.code });
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    const topic = subject.topics.find(t => t.slug === req.params.slug);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json(topic);
  } catch (error) {
    console.error('Error fetching topic:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;