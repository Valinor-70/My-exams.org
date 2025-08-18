# MyExams.org - GCSE Revision Platform

![MyExams.org Logo](docs/screenshots/homepage-light-mode.png)

## 🎓 Overview

MyExams.org is a comprehensive, production-ready GCSE revision website designed to help students excel in their exams. Built with modern web technologies, it provides interactive lessons, practice tests, and progress tracking for all core GCSE subjects.

## ✨ Features

### 🔐 **Secure Authentication System**
- User registration and login with JWT-based authentication
- Password hashing using bcrypt with salt for maximum security
- Persistent user sessions with secure token management

### 📚 **Complete Subject Coverage**
Our platform covers all 11 core GCSE subjects:
- **Mathematics** - Algebra, Geometry, Statistics, Number Theory
- **Sciences** - Biology, Chemistry, Physics with comprehensive topic coverage
- **English** - Literature and Language with poetry analysis and creative writing
- **Geography** - Physical and human geography including climate change
- **Geology** - Rock cycle, Earth processes, and mineral studies
- **Computer Science** - Programming fundamentals, algorithms, and systems
- **Religious Education** - Ethics, morality, and world religions
- **History** - Major historical events and periods

### 🎯 **Interactive Testing System**
- **Random Test Generation** - Pull questions from extensive database
- **Multiple Question Types** - Multiple choice, short answer, essay questions
- **Instant Feedback** - Immediate scoring with detailed explanations
- **Unlimited Retakes** - Practice with different question sets

### 📊 **Progress Tracking**
- Personal dashboard showing study progress
- Weak area identification and recommendations
- Test history and performance analytics
- Note-taking and bookmarking functionality

### 🎨 **Modern User Interface**
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode Toggle** - Choose your preferred theme
- **Bootstrap Components** - Clean, professional design
- **Intuitive Navigation** - Easy access to all subjects and features

## 🔧 Technology Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Bootstrap 5** for responsive UI components
- **React Router** for client-side routing
- **Axios** for API communication
- **Context API** for state management

### Backend
- **Node.js** with Express.js framework
- **ES Modules** for modern JavaScript
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **express-validator** for input validation
- **helmet** and **CORS** for security

### Security Features
- Rate limiting to prevent abuse
- Input validation and sanitization
- Protection against SQL injection, XSS, and CSRF
- Secure HTTP headers with Helmet.js
- Environment variable management

## 📱 Screenshots

### Homepage (Light Mode)
![Homepage Light Mode](docs/screenshots/homepage-light-mode.png)

### Homepage (Dark Mode)
![Homepage Dark Mode](docs/screenshots/homepage-dark-mode.png)

### User Registration
![Register Page](docs/screenshots/register-page.png)

### User Login
![Login Page](docs/screenshots/login-page.png)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Valinor-70/My-exams.org.git
   cd My-exams.org
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/myexams
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   NODE_ENV=development
   ```

   Create `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud service
   ```

6. **Seed the Database**
   ```bash
   cd server
   node database/seed-data/seedDatabase.js
   ```

7. **Start the Development Servers**
   
   Terminal 1 (Backend):
   ```bash
   cd server
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd client
   npm run dev
   ```

8. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api

## 📁 Project Structure

```
MyExams.org/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── auth/      # Authentication components
│   │   │   ├── layout/    # Layout components (Navigation)
│   │   │   ├── subjects/  # Subject-related components
│   │   │   ├── tests/     # Test components
│   │   │   └── dashboard/ # Dashboard components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Utility functions
│   ├── package.json
│   └── vite.config.ts
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   ├── package.json
│   └── index.js          # Entry point
├── database/
│   └── seed-data/        # Database seeding scripts
├── docs/
│   └── screenshots/      # Application screenshots
└── README.md
```

## 🗃️ Database Schema

### Users Collection
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  school: String,
  yearGroup: String,
  progress: [{ subject, topic, completed, score, lastStudied }],
  testHistory: [{ subject, topic, score, totalQuestions, dateTaken }],
  notes: [{ subject, topic, content, createdAt }],
  preferences: { theme, notifications }
}
```

### Subjects Collection
```javascript
{
  name: String,
  code: String,
  description: String,
  color: String,
  icon: String,
  topics: [{
    name: String,
    slug: String,
    description: String,
    content: {
      explanation: String,
      examples: [String],
      keyPoints: [String],
      summary: String
    },
    difficulty: String,
    estimatedTime: Number
  }]
}
```

### Questions Collection
```javascript
{
  subject: String,
  topic: String,
  type: String, // 'multiple-choice', 'short-answer', 'essay', 'true-false'
  difficulty: String, // 'easy', 'medium', 'hard'
  question: String,
  options: [{ text: String, isCorrect: Boolean }],
  correctAnswer: String,
  explanation: String,
  points: Number,
  tags: [String]
}
```

### TestResults Collection
```javascript
{
  user: ObjectId,
  subject: String,
  topic: String,
  questions: [{
    questionId: ObjectId,
    userAnswer: String,
    isCorrect: Boolean,
    timeTaken: Number
  }],
  score: Number,
  totalQuestions: Number,
  correctAnswers: Number,
  timeSpent: Number,
  percentage: Number,
  completed: Boolean
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Subjects
- `GET /api/subjects` - Get all subjects
- `GET /api/subjects/:code` - Get specific subject
- `GET /api/subjects/:code/topics/:slug` - Get topic content

### Tests
- `GET /api/tests/generate/:subject/:topic` - Generate random test
- `POST /api/tests/submit` - Submit test answers
- `GET /api/tests/history` - Get user's test history

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/progress` - Get user progress
- `GET /api/users/weak-areas` - Get weak areas
- `POST /api/users/notes` - Save/update notes
- `GET /api/users/notes` - Get user notes
- `DELETE /api/users/notes/:noteId` - Delete note

## 🛡️ Security Features

1. **Authentication & Authorization**
   - JWT tokens with 7-day expiration
   - Secure password hashing with bcrypt (12 rounds)
   - Protected routes requiring authentication

2. **Input Validation**
   - Server-side validation using express-validator
   - Client-side form validation
   - Data sanitization to prevent injection attacks

3. **Security Middleware**
   - Helmet.js for secure HTTP headers
   - CORS configuration for cross-origin requests
   - Rate limiting to prevent abuse
   - Request size limits

4. **Environment Security**
   - Environment variables for sensitive data
   - Separate development and production configurations
   - Database connection security

## 🎯 Key Features Implementation

### Random Test Generation
The platform generates unique tests by:
1. Querying the database for questions matching subject/topic/difficulty
2. Using MongoDB's `$sample` aggregation to randomly select questions
3. Removing correct answers from the client response
4. Supporting different question types and scoring systems

### Progress Tracking
User progress is tracked through:
1. Automatic progress updates after test completion
2. Score tracking with personal best records
3. Weak area identification based on performance
4. Historical data for improvement tracking

### Responsive Design
The interface adapts to different screen sizes using:
1. Bootstrap's responsive grid system
2. Mobile-first design approach
3. Touch-friendly interface elements
4. Optimized navigation for mobile devices

## 🚀 Deployment

### Production Deployment Steps

1. **Environment Variables**
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/myexams
   JWT_SECRET=super-secure-production-secret
   ```

2. **Build the Frontend**
   ```bash
   cd client
   npm run build
   ```

3. **Server Deployment**
   - Deploy to platforms like Heroku, Railway, or DigitalOcean
   - Configure MongoDB Atlas for database hosting
   - Set up SSL certificates for HTTPS

4. **Domain Configuration**
   - Point domain to your server
   - Update CORS settings for production domain
   - Configure CDN if needed

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React** and **Node.js** communities for excellent documentation
- **Bootstrap** for the responsive design framework
- **MongoDB** for the flexible database solution
- **GCSE** curriculum providers for educational content structure

## 📞 Support

For support, questions, or feature requests:
- Create an issue on GitHub
- Email: support@myexams.org
- Documentation: Check the `/docs` folder for detailed guides

---

**MyExams.org** - Empowering students to achieve their GCSE goals through technology and comprehensive revision materials.

Built with ❤️ by the MyExams.org team