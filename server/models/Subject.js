import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#007bff'
  },
  icon: {
    type: String,
    default: 'book'
  },
  topics: [{
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    description: String,
    content: {
      explanation: String,
      examples: [String],
      keyPoints: [String],
      summary: String
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate'
    },
    estimatedTime: {
      type: Number, // in minutes
      default: 30
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model('Subject', subjectSchema);