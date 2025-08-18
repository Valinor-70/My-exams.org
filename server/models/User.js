import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  school: {
    type: String,
    trim: true
  },
  yearGroup: {
    type: String,
    enum: ['Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13'],
    default: 'Year 11'
  },
  progress: [{
    subject: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    lastStudied: {
      type: Date,
      default: Date.now
    }
  }],
  testHistory: [{
    subject: String,
    topic: String,
    score: Number,
    totalQuestions: Number,
    correctAnswers: Number,
    timeSpent: Number, // in seconds
    dateTaken: {
      type: Date,
      default: Date.now
    }
  }],
  notes: [{
    subject: String,
    topic: String,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    notifications: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Get user's weak areas
userSchema.methods.getWeakAreas = function() {
  const weakAreas = this.progress.filter(p => p.score < 60 || !p.completed);
  return weakAreas.map(area => ({
    subject: area.subject,
    topic: area.topic,
    score: area.score
  }));
};

export default mongoose.model('User', userSchema);