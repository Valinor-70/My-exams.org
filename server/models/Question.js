import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'short-answer', 'essay', 'true-false'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    text: String,
    isCorrect: Boolean
  }], // For multiple choice questions
  correctAnswer: String, // For short answer questions
  explanation: String,
  points: {
    type: Number,
    default: 1
  },
  tags: [String],
  createdBy: {
    type: String,
    default: 'system'
  }
}, {
  timestamps: true
});

// Index for efficient querying
questionSchema.index({ subject: 1, topic: 1, difficulty: 1 });

export default mongoose.model('Question', questionSchema);