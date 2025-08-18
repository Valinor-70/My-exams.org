import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topic: string;
}

interface TestResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  difficultQuestions: string[];
}

const TestPage: React.FC = () => {
  const { subjectCode, topicId } = useParams<{ subjectCode: string; topicId?: string }>();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [startTime] = useState(Date.now());
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes

  // Mock questions data - in real app would come from API
  const generateQuestions = (subject: string, topic?: string): Question[] => {
    const questionBank: { [key: string]: Question[] } = {
      'mathematics': [
        {
          id: '1',
          question: 'What is the square root of 64?',
          options: ['6', '8', '10', '12'],
          correctAnswer: 1,
          explanation: 'The square root of 64 is 8 because 8 × 8 = 64.',
          difficulty: 'Beginner',
          topic: 'Number Systems'
        },
        {
          id: '2',
          question: 'Solve for x: 2x + 5 = 13',
          options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
          correctAnswer: 1,
          explanation: '2x + 5 = 13, so 2x = 8, therefore x = 4.',
          difficulty: 'Intermediate',
          topic: 'Algebraic Expressions'
        },
        {
          id: '3',
          question: 'What is the gradient of the line y = 3x - 2?',
          options: ['3', '-2', '1', '0'],
          correctAnswer: 0,
          explanation: 'In the form y = mx + c, the gradient m is 3.',
          difficulty: 'Intermediate',
          topic: 'Coordinate Geometry'
        },
        {
          id: '4',
          question: 'If a triangle has sides of length 3 and 4, what is the length of the hypotenuse?',
          options: ['5', '6', '7', '8'],
          correctAnswer: 0,
          explanation: 'Using the Pythagorean theorem: 3² + 4² = 9 + 16 = 25, so c = 5.',
          difficulty: 'Intermediate',
          topic: 'Coordinate Geometry'
        },
        {
          id: '5',
          question: 'What is 15% of 80?',
          options: ['10', '12', '15', '18'],
          correctAnswer: 1,
          explanation: '15% of 80 = 0.15 × 80 = 12.',
          difficulty: 'Beginner',
          topic: 'Number Systems'
        }
      ],
      'biology': [
        {
          id: '1',
          question: 'What is the powerhouse of the cell?',
          options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
          correctAnswer: 1,
          explanation: 'Mitochondria produce ATP energy for cellular processes.',
          difficulty: 'Beginner',
          topic: 'Cell Structure'
        },
        {
          id: '2',
          question: 'Which molecule carries genetic information?',
          options: ['RNA', 'DNA', 'Protein', 'Lipid'],
          correctAnswer: 1,
          explanation: 'DNA (Deoxyribonucleic acid) stores genetic information.',
          difficulty: 'Beginner',
          topic: 'Genetics'
        },
        {
          id: '3',
          question: 'What process describes changes in species over time?',
          options: ['Adaptation', 'Evolution', 'Selection', 'Mutation'],
          correctAnswer: 1,
          explanation: 'Evolution is the change in heritable traits over successive generations.',
          difficulty: 'Intermediate',
          topic: 'Evolution'
        },
        {
          id: '4',
          question: 'Which organelle contains chlorophyll?',
          options: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Ribosome'],
          correctAnswer: 2,
          explanation: 'Chloroplasts contain chlorophyll and are responsible for photosynthesis.',
          difficulty: 'Beginner',
          topic: 'Cell Structure'
        }
      ],
      'computer-science': [
        {
          id: '1',
          question: 'Which of these is a loop structure in programming?',
          options: ['if statement', 'for loop', 'function', 'variable'],
          correctAnswer: 1,
          explanation: 'A for loop repeatedly executes code for a specified number of iterations.',
          difficulty: 'Beginner',
          topic: 'Programming Fundamentals'
        },
        {
          id: '2',
          question: 'What data structure uses LIFO (Last In, First Out)?',
          options: ['Queue', 'Stack', 'Array', 'List'],
          correctAnswer: 1,
          explanation: 'A stack follows LIFO principle - the last item added is the first one removed.',
          difficulty: 'Intermediate',
          topic: 'Data Structures'
        }
      ]
    };

    const subjectQuestions = questionBank[subject] || [];
    
    // Return random 5 questions for testing
    const shuffled = [...subjectQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(5, shuffled.length));
  };

  useEffect(() => {
    if (subjectCode) {
      const generatedQuestions = generateQuestions(subjectCode, topicId);
      setQuestions(generatedQuestions);
    }
  }, [subjectCode, topicId]);

  useEffect(() => {
    if (timeRemaining > 0 && !showResults) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleFinishTest();
    }
  }, [timeRemaining, showResults]);

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishTest = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    let correctAnswers = 0;
    const difficultQuestions: string[] = [];

    questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      } else if (userAnswer !== undefined) {
        difficultQuestions.push(question.id);
      }
    });

    const result: TestResult = {
      score: Math.round((correctAnswers / questions.length) * 100),
      totalQuestions: questions.length,
      correctAnswers,
      timeSpent,
      difficultQuestions
    };

    setTestResult(result);
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  if (questions.length === 0) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="info">
          <h4>Test Coming Soon!</h4>
          <p>We're preparing questions for this topic. Please check back later.</p>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Alert>
      </Container>
    );
  }

  if (showResults && testResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ minHeight: '100vh', background: 'var(--warm-beige)', padding: '2rem 0' }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
                <Card.Header className="bg-primary text-white text-center" style={{ borderRadius: '15px 15px 0 0' }}>
                  <h3 className="mb-0">🎉 Test Results</h3>
                </Card.Header>
                <Card.Body className="p-4">
                  <Row className="text-center mb-4">
                    <Col md={3}>
                      <div className="mb-2">
                        <h2 className={`text-${getScoreColor(testResult.score)}`}>
                          {testResult.score}%
                        </h2>
                        <small className="text-muted">Final Score</small>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="mb-2">
                        <h4>{testResult.correctAnswers}</h4>
                        <small className="text-muted">Correct Answers</small>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="mb-2">
                        <h4>{testResult.totalQuestions}</h4>
                        <small className="text-muted">Total Questions</small>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="mb-2">
                        <h4>{formatTime(testResult.timeSpent)}</h4>
                        <small className="text-muted">Time Spent</small>
                      </div>
                    </Col>
                  </Row>

                  <ProgressBar 
                    variant={getScoreColor(testResult.score)}
                    now={testResult.score} 
                    className="mb-4"
                    style={{ height: '10px' }}
                  />

                  <div className="text-center mb-4">
                    {testResult.score >= 80 ? (
                      <Alert variant="success">
                        <strong>Excellent work!</strong> You've mastered this topic.
                      </Alert>
                    ) : testResult.score >= 60 ? (
                      <Alert variant="warning">
                        <strong>Good job!</strong> Review the questions you missed to improve further.
                      </Alert>
                    ) : (
                      <Alert variant="danger">
                        <strong>Keep practicing!</strong> Consider reviewing the study materials before retaking.
                      </Alert>
                    )}
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Button 
                      variant="primary" 
                      onClick={() => window.location.reload()}
                    >
                      Retake Test
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      onClick={() => navigate(`/subjects/${subjectCode}`)}
                    >
                      Back to Subject
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => navigate('/dashboard')}
                    >
                      Dashboard
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </motion.div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ minHeight: '100vh', background: 'var(--warm-beige)', padding: '2rem 0' }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            {/* Header */}
            <Card className="mb-3 border-0 shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={8}>
                    <div className="d-flex align-items-center">
                      <span className="badge bg-primary me-3">
                        Question {currentQuestionIndex + 1} of {questions.length}
                      </span>
                      <span className="badge bg-secondary me-3">
                        {currentQuestion.difficulty}
                      </span>
                      <span className="text-muted">{currentQuestion.topic}</span>
                    </div>
                  </Col>
                  <Col md={4} className="text-end">
                    <div className="d-flex align-items-center justify-content-end">
                      <span className="me-3">🕒 {formatTime(timeRemaining)}</span>
                    </div>
                  </Col>
                </Row>
                <ProgressBar now={progress} className="mt-2" style={{ height: '5px' }} />
              </Card.Body>
            </Card>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
                  <Card.Header className="bg-light border-0" style={{ borderRadius: '15px 15px 0 0' }}>
                    <h4 className="mb-0 text-dark">{currentQuestion.question}</h4>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <div className="d-grid gap-3">
                      {currentQuestion.options.map((option, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant={selectedAnswers[currentQuestion.id] === index ? 'primary' : 'outline-primary'}
                            className="text-start p-3 w-100"
                            style={{ borderRadius: '10px' }}
                            onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                          >
                            <strong>{String.fromCharCode(65 + index)}.</strong> {option}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <Card className="mt-3 border-0 shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col>
                    <Button
                      variant="outline-secondary"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      ← Previous
                    </Button>
                  </Col>
                  <Col className="text-center">
                    <small className="text-muted">
                      {Object.keys(selectedAnswers).length} of {questions.length} answered
                    </small>
                  </Col>
                  <Col className="text-end">
                    {currentQuestionIndex === questions.length - 1 ? (
                      <Button
                        variant="success"
                        onClick={handleFinishTest}
                        disabled={Object.keys(selectedAnswers).length !== questions.length}
                      >
                        Finish Test ✓
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={handleNextQuestion}
                      >
                        Next →
                      </Button>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default TestPage;