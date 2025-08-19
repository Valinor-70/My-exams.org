import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/animations.css';

interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: 'Foundation' | 'Higher';
  progress: number;
  questions: number;
  icon: string;
}

const MathematicsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [showExamBoardModal, setShowExamBoardModal] = useState(false);
  const [selectedExamBoard, setSelectedExamBoard] = useState<string>('');

  // Mathematics-specific exam boards
  const examBoards = [
    { code: 'AQA', name: 'AQA Mathematics', description: 'Linear pathway with rich problem solving', color: '#c0392b' },
    { code: 'PEARSON', name: 'Pearson Edexcel', description: 'Clear structure with practical applications', color: '#8e44ad' },
    { code: 'OCR', name: 'OCR Mathematics', description: 'Investigative approach to mathematical thinking', color: '#27ae60' },
    { code: 'EDUQAS', name: 'Eduqas Mathematics', description: 'Coherent and enjoyable mathematical experience', color: '#f39c12' },
    { code: 'WJEC', name: 'WJEC Mathematics', description: 'Welsh exam board with bilingual support', color: '#e67e22' },
  ];

  // Mathematics-specific topics
  const topics: Topic[] = [
    {
      id: 'number',
      name: 'Number & Calculation',
      description: 'Master arithmetic, fractions, decimals, percentages, and ratio',
      difficulty: 'Foundation',
      progress: 0,
      questions: 150,
      icon: '🔢'
    },
    {
      id: 'algebra',
      name: 'Algebra & Equations',
      description: 'Solve equations, work with expressions and understand functions',
      difficulty: 'Higher',
      progress: 0,
      questions: 180,
      icon: '📐'
    },
    {
      id: 'geometry',
      name: 'Geometry & Measures',
      description: 'Explore shapes, angles, area, volume and coordinate geometry',
      difficulty: 'Foundation',
      progress: 0,
      questions: 165,
      icon: '📏'
    },
    {
      id: 'statistics',
      name: 'Statistics & Probability',
      description: 'Analyze data, understand probability and interpret graphs',
      difficulty: 'Foundation',
      progress: 0,
      questions: 120,
      icon: '📊'
    },
    {
      id: 'trigonometry',
      name: 'Trigonometry',
      description: 'Master sine, cosine, tangent and solve complex triangles',
      difficulty: 'Higher',
      progress: 0,
      questions: 95,
      icon: '🔺'
    },
    {
      id: 'calculus-intro',
      name: 'Introduction to Calculus',
      description: 'Basic differentiation and integration for Higher tier',
      difficulty: 'Higher',
      progress: 0,
      questions: 75,
      icon: '∫'
    }
  ];

  const handleStartStudy = () => {
    if (!selectedExamBoard) {
      setShowExamBoardModal(true);
    } else {
      // Navigate to first topic or show study options
      navigate(`/test/mathematics`);
    }
  };

  const handleSelectExamBoard = (boardCode: string) => {
    setSelectedExamBoard(boardCode);
    setShowExamBoardModal(false);
  };

  const getTierBadgeColor = (difficulty: string) => {
    return difficulty === 'Higher' ? 'primary' : 'success';
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <Container className="py-5">
        {/* Room Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="display-1 mb-3">🔢</div>
          <h1 className="display-4 fw-bold text-white mb-3">Mathematics Study Room</h1>
          <p className="lead text-white-50">
            Master the language of numbers, patterns, and logical reasoning
          </p>
          <div className="mt-4">
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              📚 6 Core Topics
            </Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              🎯 785 Practice Questions
            </Badge>
            <Badge bg="light" text="dark" className="px-3 py-2">
              ⏱️ Exam Preparation
            </Badge>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">🎯</div>
                  <h5>Practice Tests</h5>
                  <p className="text-muted small">Mixed questions from all topics</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/test/mathematics')}
                  >
                    Start Test
                  </button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">📚</div>
                  <h5>Study Cards</h5>
                  <p className="text-muted small">Formulas, definitions & methods</p>
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => navigate('/flashcards/mathematics')}
                  >
                    View Cards
                  </button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">📊</div>
                  <h5>Progress</h5>
                  <p className="text-muted small">Track your mathematical journey</p>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/dashboard')}
                  >
                    View Stats
                  </button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Study Topics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-white mb-4">📚 Study Topics</h2>
          <Row>
            {topics.map((topic, index) => (
              <Col lg={6} xl={4} key={topic.id} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="display-6">{topic.icon}</div>
                        <Badge bg={getTierBadgeColor(topic.difficulty)}>
                          {topic.difficulty}
                        </Badge>
                      </div>
                      
                      <h5 className="card-title">{topic.name}</h5>
                      <p className="text-muted small mb-3">{topic.description}</p>
                      
                      <div className="d-flex justify-content-between small text-muted mb-3">
                        <span>📝 {topic.questions} questions</span>
                        <span>Progress: {topic.progress}%</span>
                      </div>
                      
                      <div className="progress mb-3" style={{ height: '6px' }}>
                        <div 
                          className="progress-bar" 
                          style={{ width: `${topic.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="d-grid gap-2">
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/test/mathematics/${topic.id}`)}
                        >
                          Practice This Topic
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Mathematics-specific study tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5"
        >
          <Card className="border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
            <Card.Body className="p-4">
              <h5 className="text-primary mb-3">💡 Mathematical Study Tips</h5>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">🧮 <strong>Practice regularly:</strong> Mathematics builds on itself - consistent practice prevents gaps</li>
                    <li className="mb-2">📝 <strong>Show your working:</strong> Clear working helps you spot mistakes and gets you method marks</li>
                    <li className="mb-2">🔍 <strong>Check your answers:</strong> Substitute back into equations or use estimation to verify</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">📊 <strong>Learn from mistakes:</strong> Understand why you got something wrong, not just the right answer</li>
                    <li className="mb-2">⏰ <strong>Time management:</strong> Practice under exam conditions to improve your pace</li>
                    <li className="mb-2">🎯 <strong>Focus on understanding:</strong> Memorize formulas but understand when and how to use them</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>

      {/* Exam Board Selection Modal */}
      <Modal show={showExamBoardModal} onHide={() => setShowExamBoardModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Choose Your Mathematics Exam Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-4">Select your exam board to get tailored content and practice questions.</p>
          <div className="d-grid gap-3">
            {examBoards.map((board) => (
              <div
                key={board.code}
                className={`exam-board-option p-3 rounded border ${selectedExamBoard === board.code ? 'border-primary bg-light' : 'border-light'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelectExamBoard(board.code)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong style={{ color: board.color }}>{board.name}</strong>
                    <div className="small text-muted">{board.description}</div>
                  </div>
                  {selectedExamBoard === board.code && (
                    <div className="text-primary">✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowExamBoardModal(false)}>
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleStartStudy}
            disabled={!selectedExamBoard}
          >
            Start Studying
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MathematicsPage;