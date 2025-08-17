import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Modal } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SubjectHub3D from '../components/3d/SubjectHub3D';
import '../styles/animations.css';

interface ExamBoard {
  code: string;
  name: string;
  description: string;
  color: string;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  questions: number;
}

const SubjectPage: React.FC = () => {
  const { subjectCode } = useParams<{ subjectCode: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showExamBoardModal, setShowExamBoardModal] = useState(false);
  const [selectedExamBoard, setSelectedExamBoard] = useState<string>('');
  const [selectedScienceType, setSelectedScienceType] = useState<string>('');
  const [showScienceTypeModal, setShowScienceTypeModal] = useState(false);

  // Exam boards
  const examBoards: ExamBoard[] = [
    { code: 'AQA', name: 'AQA', description: 'Assessment and Qualifications Alliance', color: '#e74c3c' },
    { code: 'IGCSE_PEARSON', name: 'IGCSE Pearson', description: 'International GCSE by Pearson', color: '#3498db' },
    { code: 'PEARSON', name: 'Pearson Edexcel', description: 'Pearson Edexcel GCSE', color: '#9b59b6' },
    { code: 'WJEC', name: 'WJEC', description: 'Welsh Joint Education Committee', color: '#e67e22' },
    { code: 'OCR', name: 'OCR', description: 'Oxford Cambridge and RSA', color: '#2ecc71' },
    { code: 'EDUQAS', name: 'Eduqas', description: 'Eduqas (WJEC)', color: '#f39c12' },
  ];

  // Subject data
  const subjects = {
    'maths': {
      name: 'Mathematics',
      icon: '🔢',
      color: '#667eea',
      description: 'Master algebra, geometry, statistics and more',
      isScience: false
    },
    'biology': {
      name: 'Biology',
      icon: '🧬',
      color: '#f093fb',
      description: 'Explore life sciences from cells to ecosystems',
      isScience: true
    },
    'chemistry': {
      name: 'Chemistry',
      icon: '⚗️',
      color: '#4facfe',
      description: 'Understand atoms, molecules and chemical reactions',
      isScience: true
    },
    'physics': {
      name: 'Physics',
      icon: '⚡',
      color: '#764ba2',
      description: 'Study forces, energy, waves and matter',
      isScience: true
    },
    'english-lit': {
      name: 'English Literature',
      icon: '📚',
      color: '#f5576c',
      description: 'Analyze texts, poetry and dramatic works',
      isScience: false
    },
    'english-lang': {
      name: 'English Language',
      icon: '✍️',
      color: '#4ecdc4',
      description: 'Develop reading, writing and communication skills',
      isScience: false
    },
    'geography': {
      name: 'Geography',
      icon: '🌍',
      color: '#45b7d1',
      description: 'Study physical and human geography',
      isScience: false
    },
    'geology': {
      name: 'Geology',
      icon: '🏔️',
      color: '#8b5a3c',
      description: 'Understand Earth processes and rocks',
      isScience: false
    },
    'computer-science': {
      name: 'Computer Science',
      icon: '💻',
      color: '#6c5ce7',
      description: 'Learn programming and computational thinking',
      isScience: false
    },
    'religious-education': {
      name: 'Religious Education',
      icon: '✝️',
      color: '#fdcb6e',
      description: 'Explore world religions and ethics',
      isScience: false
    },
    'history': {
      name: 'History',
      icon: '🏛️',
      color: '#e17055',
      description: 'Study historical events and periods',
      isScience: false
    }
  };

  const currentSubject = subjectCode ? subjects[subjectCode as keyof typeof subjects] : null;

  // Mock topics data
  const [topics] = useState<Topic[]>([
    { id: '1', name: 'Number Systems', description: 'Natural numbers, integers, rational numbers', difficulty: 'Beginner', progress: 85, questions: 45 },
    { id: '2', name: 'Algebraic Expressions', description: 'Variables, coefficients, and simplification', difficulty: 'Intermediate', progress: 60, questions: 38 },
    { id: '3', name: 'Quadratic Equations', description: 'Solving quadratic equations using various methods', difficulty: 'Advanced', progress: 30, questions: 52 },
    { id: '4', name: 'Coordinate Geometry', description: 'Points, lines, and curves on coordinate plane', difficulty: 'Intermediate', progress: 70, questions: 41 },
    { id: '5', name: 'Trigonometry', description: 'Sin, cos, tan and their applications', difficulty: 'Advanced', progress: 45, questions: 35 },
    { id: '6', name: 'Statistics', description: 'Data collection, analysis and probability', difficulty: 'Beginner', progress: 90, questions: 29 },
  ]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Check if user needs to select exam board
    const userExamBoard = localStorage.getItem(`examBoard_${subjectCode}`);
    if (!userExamBoard) {
      setShowExamBoardModal(true);
    } else {
      setSelectedExamBoard(userExamBoard);
    }

    // Check for science subjects
    if (currentSubject?.isScience) {
      const userScienceType = localStorage.getItem(`scienceType_${subjectCode}`);
      if (!userScienceType && userExamBoard) {
        setShowScienceTypeModal(true);
      } else {
        setSelectedScienceType(userScienceType || '');
      }
    }
  }, [user, navigate, subjectCode, currentSubject]);

  const handleExamBoardSelect = (boardCode: string) => {
    setSelectedExamBoard(boardCode);
    localStorage.setItem(`examBoard_${subjectCode}`, boardCode);
    setShowExamBoardModal(false);

    // If it's a science subject, show science type modal
    if (currentSubject?.isScience) {
      setShowScienceTypeModal(true);
    }
  };

  const handleScienceTypeSelect = (type: string) => {
    setSelectedScienceType(type);
    localStorage.setItem(`scienceType_${subjectCode}`, type);
    setShowScienceTypeModal(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'secondary';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'success';
    if (progress >= 60) return 'primary';
    if (progress >= 40) return 'warning';
    return 'danger';
  };

  if (!currentSubject) {
    return (
      <Container className="py-5 text-center">
        <h2>Subject not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go Home</button>
      </Container>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${currentSubject.color}15 0%, #f8f9fa 100%)` }}
    >
      {/* Floating shapes */}
      <div className="floating-shapes">
        <div className="shape" style={{ 
          width: '100px', 
          height: '100px', 
          background: `linear-gradient(45deg, ${currentSubject.color}, ${currentSubject.color}80)`,
          borderRadius: '50%',
          opacity: 0.1
        }}></div>
        <div className="shape" style={{ 
          width: '80px', 
          height: '80px', 
          background: `linear-gradient(45deg, ${currentSubject.color}80, ${currentSubject.color})`,
          borderRadius: '20px',
          opacity: 0.1
        }}></div>
      </div>

      <Container className="py-5">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-5"
        >
          <motion.div
            style={{ fontSize: '4rem' }}
            className="mb-3"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {currentSubject.icon}
          </motion.div>
          <h1 className="display-4 fw-bold hero-title">
            {currentSubject.name}
          </h1>
          <p className="lead text-muted mb-4">
            {currentSubject.description}
          </p>
          
          {/* Exam Board and Science Type Display */}
          {selectedExamBoard && (
            <div className="mb-3">
              <Badge bg="primary" className="me-2 fs-6">
                {examBoards.find(b => b.code === selectedExamBoard)?.name}
              </Badge>
              {selectedScienceType && (
                <Badge bg="info" className="fs-6">
                  {selectedScienceType} Science
                </Badge>
              )}
              <button
                className="btn btn-outline-secondary btn-sm ms-2"
                onClick={() => setShowExamBoardModal(true)}
              >
                Change
              </button>
            </div>
          )}
        </motion.div>

        {/* 3D Scene */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-5"
        >
          <SubjectHub3D subjectName={currentSubject.name} subjectColor={currentSubject.color} />
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Row className="g-4">
            {topics.map((topic, index) => (
              <Col md={6} lg={4} key={topic.id}>
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="h-100"
                >
                  <Card className="h-100 border-0 shadow-sm subject-card">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="card-title">{topic.name}</h5>
                        <Badge bg={getDifficultyColor(topic.difficulty)}>
                          {topic.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="card-text text-muted small">
                        {topic.description}
                      </p>
                      
                      <div className="mb-3">
                        <div className="d-flex justify-content-between small text-muted mb-1">
                          <span>Progress</span>
                          <span>{topic.progress}%</span>
                        </div>
                        <div className="progress" style={{ height: '8px' }}>
                          <motion.div
                            className={`progress-bar bg-${getProgressColor(topic.progress)}`}
                            style={{ width: 0 }}
                            animate={{ width: `${topic.progress}%` }}
                            transition={{ duration: 1, delay: 0.2 * index }}
                          />
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <small className="text-muted">
                          {topic.questions} questions available
                        </small>
                      </div>
                      
                      <div className="d-grid gap-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <button 
                            className="btn btn-primary btn-3d"
                            onClick={() => navigate(`/topics/${topic.id}/study`)}
                          >
                            📖 Study Topic
                          </button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <button 
                            className="btn btn-outline-primary btn-3d"
                            onClick={() => navigate(`/topics/${topic.id}/test`)}
                          >
                            🎯 Take Test
                          </button>
                        </motion.div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-5"
        >
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="border-0 shadow-lg card-3d">
                <Card.Body className="p-4">
                  <h5 className="mb-4">🚀 Quick Actions</h5>
                  <Row className="g-3">
                    <Col md={3}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button 
                          className="btn btn-primary w-100 btn-3d"
                          onClick={() => navigate(`/subjects/${subjectCode}/test`)}
                        >
                          🎲 Random Test
                        </button>
                      </motion.div>
                    </Col>
                    <Col md={3}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button 
                          className="btn btn-outline-success w-100 btn-3d"
                          onClick={() => navigate(`/subjects/${subjectCode}/notes`)}
                        >
                          📝 My Notes
                        </button>
                      </motion.div>
                    </Col>
                    <Col md={3}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button 
                          className="btn btn-outline-warning w-100 btn-3d"
                          onClick={() => navigate(`/subjects/${subjectCode}/progress`)}
                        >
                          📊 View Progress
                        </button>
                      </motion.div>
                    </Col>
                    <Col md={3}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button 
                          className="btn btn-outline-info w-100 btn-3d"
                          onClick={() => navigate('/dashboard')}
                        >
                          🏠 Dashboard
                        </button>
                      </motion.div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </motion.div>
      </Container>

      {/* Exam Board Selection Modal */}
      <AnimatePresence>
        {showExamBoardModal && (
          <Modal show={showExamBoardModal} onHide={() => {}} backdrop="static" keyboard={false} centered>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Modal.Header>
                <Modal.Title>🎯 Select Your Exam Board</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="text-muted mb-4">
                  Choose your exam board to get specialized content and practice questions.
                </p>
                <div className="exam-board-selector">
                  <Row className="g-3">
                    {examBoards.map((board) => (
                      <Col md={6} key={board.code}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            className={`exam-board-card ${selectedExamBoard === board.code ? 'selected' : ''}`}
                            onClick={() => handleExamBoardSelect(board.code)}
                          >
                            <h6 className="fw-bold" style={{ color: board.color }}>
                              {board.name}
                            </h6>
                            <small className="text-muted">
                              {board.description}
                            </small>
                          </div>
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Modal.Body>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Science Type Selection Modal */}
      <AnimatePresence>
        {showScienceTypeModal && (
          <Modal show={showScienceTypeModal} onHide={() => {}} backdrop="static" keyboard={false} centered>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Modal.Header>
                <Modal.Title>🔬 Select Science Type</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p className="text-muted mb-4">
                  Are you studying Triple Science or Double Science?
                </p>
                <div className="science-type-toggle mb-4">
                  <div
                    className={`science-type-option ${selectedScienceType === 'Triple' ? 'active' : ''}`}
                    onClick={() => setSelectedScienceType('Triple')}
                  >
                    <strong>Triple Science</strong>
                    <div><small>Separate Biology, Chemistry, Physics</small></div>
                  </div>
                  <div
                    className={`science-type-option ${selectedScienceType === 'Double' ? 'active' : ''}`}
                    onClick={() => setSelectedScienceType('Double')}
                  >
                    <strong>Double Science</strong>
                    <div><small>Combined Science course</small></div>
                  </div>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-3d"
                    onClick={() => handleScienceTypeSelect(selectedScienceType)}
                    disabled={!selectedScienceType}
                  >
                    Continue with {selectedScienceType} Science
                  </button>
                </div>
              </Modal.Body>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SubjectPage;