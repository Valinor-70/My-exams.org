import express from 'express';
import Question from '../models/Question.js';
import TestResult from '../models/TestResult.js';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Generate random test
router.get('/generate/:subject/:topic', authenticateToken, async (req, res) => {
  try {
    const { subject, topic } = req.params;
    const { count = 10, difficulty } = req.query;

    let query = { subject, topic };
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Get random questions
    const questions = await Question.aggregate([
      { $match: query },
      { $sample: { size: parseInt(count) } }
    ]);

    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this topic' });
    }

    // Remove correct answers from response
    const testQuestions = questions.map(q => ({
      _id: q._id,
      question: q.question,
      type: q.type,
      options: q.type === 'multiple-choice' ? q.options.map(opt => ({ text: opt.text })) : undefined,
      points: q.points
    }));

    res.json({
      subject,
      topic,
      questions: testQuestions,
      totalQuestions: testQuestions.length
    });

  } catch (error) {
    console.error('Error generating test:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit test answers
router.post('/submit', authenticateToken, async (req, res) => {
  try {
    const { subject, topic, answers, timeSpent } = req.body;
    const userId = req.user._id;

    // Get the original questions with correct answers
    const questionIds = Object.keys(answers);
    const questions = await Question.find({ _id: { $in: questionIds } });

    let correctAnswers = 0;
    const questionResults = [];

    // Check each answer
    for (const question of questions) {
      const userAnswer = answers[question._id.toString()];
      let isCorrect = false;

      if (question.type === 'multiple-choice') {
        const correctOption = question.options.find(opt => opt.isCorrect);
        isCorrect = correctOption && correctOption.text === userAnswer;
      } else if (question.type === 'short-answer' || question.type === 'true-false') {
        isCorrect = question.correctAnswer.toLowerCase().trim() === userAnswer.toLowerCase().trim();
      }

      if (isCorrect) correctAnswers++;

      questionResults.push({
        questionId: question._id,
        userAnswer,
        isCorrect,
        timeTaken: 0 // Could track individual question time
      });
    }

    const totalQuestions = questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Save test result
    const testResult = new TestResult({
      user: userId,
      subject,
      topic,
      questions: questionResults,
      score,
      totalQuestions,
      correctAnswers,
      timeSpent,
      percentage: score,
      completed: true
    });

    await testResult.save();

    // Update user progress
    const user = await User.findById(userId);
    const existingProgress = user.progress.find(p => p.subject === subject && p.topic === topic);

    if (existingProgress) {
      existingProgress.score = Math.max(existingProgress.score || 0, score);
      existingProgress.completed = score >= 60; // Pass threshold
      existingProgress.lastStudied = new Date();
    } else {
      user.progress.push({
        subject,
        topic,
        completed: score >= 60,
        score,
        lastStudied: new Date()
      });
    }

    // Add to test history
    user.testHistory.push({
      subject,
      topic,
      score,
      totalQuestions,
      correctAnswers,
      timeSpent,
      dateTaken: new Date()
    });

    await user.save();

    // Get correct answers for response
    const resultsWithCorrectAnswers = questionResults.map(result => {
      const question = questions.find(q => q._id.toString() === result.questionId.toString());
      return {
        ...result,
        correctAnswer: question.type === 'multiple-choice' 
          ? question.options.find(opt => opt.isCorrect)?.text 
          : question.correctAnswer,
        explanation: question.explanation
      };
    });

    res.json({
      testResult: {
        score,
        percentage: score,
        correctAnswers,
        totalQuestions,
        timeSpent,
        questions: resultsWithCorrectAnswers
      },
      message: score >= 60 ? 'Well done! You passed!' : 'Keep practicing to improve your score!'
    });

  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get test history for user
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { subject, topic } = req.query;

    let query = { user: userId };
    if (subject) query.subject = subject;
    if (topic) query.topic = topic;

    const testResults = await TestResult.find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .select('-questions');

    res.json(testResults);

  } catch (error) {
    console.error('Error fetching test history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;