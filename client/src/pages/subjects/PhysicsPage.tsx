import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/animations.css';

interface Topic {
  id: string;
  name: string;
  description: string;
  complexity: 'Foundation' | 'Higher' | 'Both';
  progress: number;
  questions: number;
  icon: string;
  equations: string[];
}

const PhysicsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [showExamBoardModal, setShowExamBoardModal] = useState(false);
  const [showScienceTypeModal, setShowScienceTypeModal] = useState(false);
  const [selectedExamBoard, setSelectedExamBoard] = useState<string>('');
  const [selectedScienceType, setSelectedScienceType] = useState<string>('');

  // Physics exam boards
  const examBoards = [
    { code: 'AQA', name: 'AQA Physics', description: 'Mathematical approach with practical applications', color: '#e74c3c' },
    { code: 'PEARSON', name: 'Pearson Edexcel', description: 'Technology-focused physics with real-world contexts', color: '#c0392b' },
    { code: 'OCR', name: 'OCR Gateway Physics', description: 'Physics in everyday situations and modern technology', color: '#a93226' },
    { code: 'EDUQAS', name: 'Eduqas Physics', description: 'Comprehensive physics with Welsh perspectives', color: '#922b21' },
  ];

  // Science type options
  const scienceTypes = [
    { code: 'Triple', name: 'Triple Science Physics', description: 'Separate Physics GCSE - full specification' },
    { code: 'Double', name: 'Combined Science Physics', description: 'Physics element of Double Award Science' }
  ];

  // Physics-specific topics
  const topics: Topic[] = [
    {
      id: 'forces-motion',
      name: 'Forces & Motion',
      description: 'Newton\'s laws, momentum, work and energy in moving systems',
      complexity: 'Both',
      progress: 0,
      questions: 178,
      icon: '🚀',
      equations: ['F = ma', 'v² = u² + 2as', 'p = mv', 'KE = ½mv²']
    },
    {
      id: 'electricity',
      name: 'Electricity & Circuits',
      description: 'Current, voltage, resistance and electrical power in circuits',
      complexity: 'Both',
      progress: 0,
      questions: 156,
      icon: '⚡',
      equations: ['V = IR', 'P = IV', 'Q = It', 'E = Pt']
    },
    {
      id: 'waves',
      name: 'Waves & Electromagnetic Spectrum',
      description: 'Wave properties, sound, light and the electromagnetic spectrum',
      complexity: 'Both',
      progress: 0,
      questions: 134,
      icon: '🌊',
      equations: ['v = fλ', 'n = sin i / sin r', 'f = 1/T']
    },
    {
      id: 'energy',
      name: 'Energy Resources & Transfer',
      description: 'Energy stores, transfers, efficiency and renewable resources',
      complexity: 'Both',
      progress: 0,
      questions: 142,
      icon: '🔋',
      equations: ['efficiency = useful/total × 100%', 'GPE = mgh', 'Power = Energy/time']
    },
    {
      id: 'atomic-nuclear',
      name: 'Atomic & Nuclear Physics',
      description: 'Atomic structure, radioactivity and nuclear reactions',
      complexity: 'Higher',
      progress: 0,
      questions: 123,
      icon: '⚛️',
      equations: ['E = mc²', 'Half-life equations', 'Activity = λN']
    },
    {
      id: 'space-physics',
      name: 'Space Physics',
      description: 'Solar system, life cycle of stars and cosmology',
      complexity: 'Higher',
      progress: 0,
      questions: 98,
      icon: '🌌',
      equations: ['F = GMm/r²', 'Hubble\'s Law', 'Orbital mechanics']
    }
  ];

  const handleStartStudy = () => {
    if (!selectedExamBoard) {
      setShowExamBoardModal(true);
    } else if (!selectedScienceType) {
      setShowScienceTypeModal(true);
    } else {
      navigate(`/test/physics`);
    }
  };

  const handleSelectExamBoard = (boardCode: string) => {
    setSelectedExamBoard(boardCode);
    setShowExamBoardModal(false);
    if (!selectedScienceType) {
      setShowScienceTypeModal(true);
    }
  };

  const handleSelectScienceType = (typeCode: string) => {
    setSelectedScienceType(typeCode);
    setShowScienceTypeModal(false);
  };

  const getComplexityBadgeColor = (complexity: string) => {
    if (complexity === 'Higher') return 'danger';
    if (complexity === 'Foundation') return 'success';
    return 'warning';
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', 
      minHeight: '100vh'
    }}>
      <Container className="py-5">
        {/* Physics Laboratory Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="display-1 mb-3">⚡</div>
          <h1 className="display-4 fw-bold text-white mb-3">Physics Laboratory</h1>
          <p className="lead text-white-50">
            Uncover the fundamental laws governing matter, energy and the universe
          </p>
          
          {/* Physics constants display */}
          <div className="mt-4 p-3 bg-dark bg-opacity-25 rounded font-monospace">
            <Row className="text-white-50 small">
              <Col md={3} className="mb-2">
                <div className="fw-bold">c = 3.0 × 10⁸ m/s</div>
                <div>Speed of light</div>
              </Col>
              <Col md={3} className="mb-2">
                <div className="fw-bold">g = 9.8 m/s²</div>
                <div>Acceleration due to gravity</div>
              </Col>
              <Col md={3} className="mb-2">
                <div className="fw-bold">e = 1.6 × 10⁻¹⁹ C</div>
                <div>Elementary charge</div>
              </Col>
              <Col md={3} className="mb-2">
                <div className="fw-bold">h = 6.63 × 10⁻³⁴ J·s</div>
                <div>Planck constant</div>
              </Col>
            </Row>
          </div>
          
          <div className="mt-4">
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              ⚛️ 6 Core Areas
            </Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              🧮 831 Problems
            </Badge>
            <Badge bg="light" text="dark" className="px-3 py-2">
              📐 Mathematical Physics
            </Badge>
          </div>
        </motion.div>

        {/* Laboratory Equipment - Quick Actions */}
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">🔬</div>
                  <h5>Experiments</h5>
                  <p className="text-muted small">Physics problems & calculations</p>
                  <button 
                    className="btn btn-danger"
                    onClick={() => navigate('/test/physics')}
                  >
                    Run Experiment
                  </button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">📋</div>
                  <h5>Equation Sheet</h5>
                  <p className="text-muted small">Formulas & physics constants</p>
                  <button 
                    className="btn btn-outline-danger"
                    onClick={() => navigate('/flashcards/physics')}
                  >
                    View Equations
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
                  <h5>Lab Results</h5>
                  <p className="text-muted small">Track experimental progress</p>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/dashboard')}
                  >
                    View Data
                  </button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Physics Topics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-white mb-4">🧪 Physics Investigations</h2>
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
                        <Badge bg={getComplexityBadgeColor(topic.complexity)}>
                          {topic.complexity}
                        </Badge>
                      </div>
                      
                      <h5 className="card-title">{topic.name}</h5>
                      <p className="text-muted small mb-3">{topic.description}</p>
                      
                      {/* Key equations */}
                      <div className="mb-3">
                        <small className="text-muted">Key equations:</small>
                        <div className="mt-1">
                          {topic.equations.slice(0, 2).map((equation, idx) => (
                            <div key={idx} className="small font-monospace text-danger mb-1">
                              {equation}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between small text-muted mb-3">
                        <span>🧮 {topic.questions} problems</span>
                        <span>Progress: {topic.progress}%</span>
                      </div>
                      
                      <div className="progress mb-3" style={{ height: '6px' }}>
                        <div 
                          className="progress-bar bg-danger" 
                          style={{ width: `${topic.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="d-grid gap-2">
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => navigate(`/test/physics/${topic.id}`)}
                        >
                          Study This Topic
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Physics mastery guidance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5"
        >
          <Card className="border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
            <Card.Body className="p-4">
              <h5 className="text-danger mb-3">⚡ Physics Problem-Solving Mastery</h5>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">📐 <strong>Learn the equations:</strong> Understand when and how to apply each formula</li>
                    <li className="mb-2">🧮 <strong>Units matter:</strong> Always check units are consistent in calculations</li>
                    <li className="mb-2">📊 <strong>Draw diagrams:</strong> Visualize forces, circuits and wave interactions</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">🔢 <strong>Practice calculations:</strong> Physics is mathematical - practice regularly</li>
                    <li className="mb-2">🧪 <strong>Understand practicals:</strong> Know apparatus, methods and sources of error</li>
                    <li className="mb-2">🌌 <strong>Think conceptually:</strong> Understand the physics behind the mathematics</li>
                  </ul>
                </Col>
              </Row>
              
              {/* Essential physics equations */}
              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="text-danger">⚡ Essential Physics Equations</h6>
                <Row className="mt-3 font-monospace">
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🚀 Mechanics</div>
                    <small className="text-muted">F = ma, s = ut + ½at²</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">⚡ Electricity</div>
                    <small className="text-muted">V = IR, P = IV</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🌊 Waves</div>
                    <small className="text-muted">v = fλ, f = 1/T</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🔋 Energy</div>
                    <small className="text-muted">KE = ½mv², GPE = mgh</small>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>

      {/* Exam Board Selection Modal */}
      <Modal show={showExamBoardModal} onHide={() => setShowExamBoardModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>⚡ Choose Your Physics Specification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-4">Select your exam board for specification-matched equations and practical requirements.</p>
          <div className="d-grid gap-3">
            {examBoards.map((board) => (
              <div
                key={board.code}
                className={`exam-board-option p-3 rounded border ${selectedExamBoard === board.code ? 'border-danger bg-light' : 'border-light'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelectExamBoard(board.code)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong style={{ color: board.color }}>{board.name}</strong>
                    <div className="small text-muted">{board.description}</div>
                  </div>
                  {selectedExamBoard === board.code && (
                    <div className="text-danger">✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>

      {/* Science Type Selection Modal */}
      <Modal show={showScienceTypeModal} onHide={() => setShowScienceTypeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🔬 Choose Your Science Pathway</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-4">Are you studying Physics as a separate subject or as part of Combined Science?</p>
          <div className="d-grid gap-3">
            {scienceTypes.map((type) => (
              <div
                key={type.code}
                className={`science-type-option p-3 rounded border ${selectedScienceType === type.code ? 'border-danger bg-light' : 'border-light'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelectScienceType(type.code)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="text-danger">{type.name}</strong>
                    <div className="small text-muted">{type.description}</div>
                  </div>
                  {selectedScienceType === type.code && (
                    <div className="text-danger">✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowScienceTypeModal(false)}>
            Cancel
          </button>
          <button 
            className="btn btn-danger" 
            onClick={handleStartStudy}
            disabled={!selectedScienceType}
          >
            Enter Laboratory
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PhysicsPage;