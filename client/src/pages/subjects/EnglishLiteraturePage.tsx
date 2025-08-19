import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/animations.css';

interface Topic {
  id: string;
  name: string;
  description: string;
  focus: 'Poetry' | 'Prose' | 'Drama' | 'Mixed';
  progress: number;
  questions: number;
  icon: string;
  keyWorks: string[];
}

const EnglishLiteraturePage: React.FC = () => {
  const navigate = useNavigate();
  
  const [showExamBoardModal, setShowExamBoardModal] = useState(false);
  const [selectedExamBoard, setSelectedExamBoard] = useState<string>('');

  // Literary quote rotation for ambiance
  const [currentQuote, setCurrentQuote] = useState(0);
  const quotes = [
    "\"All the world's a stage, and all the men and women merely players.\" - Shakespeare",
    "\"It was the best of times, it was the worst of times.\" - Dickens",
    "\"To be, or not to be, that is the question.\" - Hamlet",
    "\"The past is a foreign country: they do things differently there.\" - Hartley"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // English Literature specific exam boards
  const examBoards = [
    { code: 'AQA', name: 'AQA English Literature', description: 'Contemporary and classic texts with contextual study', color: '#8B4513' },
    { code: 'PEARSON', name: 'Pearson Edexcel', description: 'Diverse range of literature across historical periods', color: '#A0522D' },
    { code: 'OCR', name: 'OCR English Literature', description: 'Thematic approach to literary analysis', color: '#CD853F' },
    { code: 'EDUQAS', name: 'Eduqas English Literature', description: 'Welsh literature alongside English classics', color: '#D2691E' },
  ];

  // English Literature specific topics
  const topics: Topic[] = [
    {
      id: 'shakespeare-plays',
      name: 'Shakespearean Drama',
      description: 'Explore the depth of character, language and themes in Shakespeare\'s masterpieces',
      focus: 'Drama',
      progress: 0,
      questions: 186,
      icon: '🎭',
      keyWorks: ['Macbeth', 'Romeo and Juliet', 'Hamlet', 'Much Ado About Nothing']
    },
    {
      id: 'modern-prose',
      name: 'Modern British Fiction',
      description: 'Contemporary novels exploring identity, society and human relationships',
      focus: 'Prose',
      progress: 0,
      questions: 164,
      icon: '📚',
      keyWorks: ['An Inspector Calls', 'Animal Farm', 'Lord of the Flies', 'Of Mice and Men']
    },
    {
      id: 'poetry-anthology',
      name: 'Poetry Through the Ages',
      description: 'Analyze poetic techniques, themes and historical contexts across different periods',
      focus: 'Poetry',
      progress: 0,
      questions: 142,
      icon: '📜',
      keyWorks: ['Power and Conflict', 'Love and Relationships', 'Romantic Poetry', 'War Poetry']
    },
    {
      id: 'victorian-literature',
      name: 'Victorian Literature',
      description: 'Gothic horror, social realism and moral complexity in 19th century writing',
      focus: 'Prose',
      progress: 0,
      questions: 138,
      icon: '🏰',
      keyWorks: ['A Christmas Carol', 'Jekyll and Hyde', 'Frankenstein', 'Jane Eyre']
    },
    {
      id: 'unseen-poetry',
      name: 'Unseen Poetry Analysis',
      description: 'Develop skills to analyze unfamiliar poems with confidence and insight',
      focus: 'Poetry',
      progress: 0,
      questions: 95,
      icon: '🔍',
      keyWorks: ['Comparison Skills', 'Language Analysis', 'Form and Structure', 'Context']
    },
    {
      id: 'literary-heritage',
      name: 'Literary Heritage',
      description: 'Classic texts that have shaped English literature and cultural understanding',
      focus: 'Mixed',
      progress: 0,
      questions: 127,
      icon: '⚖️',
      keyWorks: ['Pride and Prejudice', 'Great Expectations', 'The Tempest', 'Canterbury Tales']
    }
  ];

  const handleStartStudy = () => {
    if (!selectedExamBoard) {
      setShowExamBoardModal(true);
    } else {
      navigate(`/test/english-lit`);
    }
  };

  const handleSelectExamBoard = (boardCode: string) => {
    setSelectedExamBoard(boardCode);
    setShowExamBoardModal(false);
  };

  const getFocusBadgeColor = (focus: string) => {
    switch(focus) {
      case 'Poetry': return 'info';
      case 'Drama': return 'warning';
      case 'Prose': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)', 
      minHeight: '100vh'
    }}>
      <Container className="py-5">
        {/* Literary Study Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="display-1 mb-3">📚</div>
          <h1 className="display-4 fw-bold text-white mb-3">Literature Study</h1>
          <p className="lead text-white-50">
            Journey through the greatest works of English literature
          </p>
          
          {/* Rotating literary quotes */}
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="mt-4 p-3 bg-dark bg-opacity-25 rounded"
          >
            <p className="text-white-50 fst-italic mb-0 small">
              {quotes[currentQuote]}
            </p>
          </motion.div>
          
          <div className="mt-4">
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              📖 6 Literary Areas
            </Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              ✍️ 852 Analysis Tasks
            </Badge>
            <Badge bg="light" text="dark" className="px-3 py-2">
              🎭 Poetry • Prose • Drama
            </Badge>
          </div>
        </motion.div>

        {/* Literary Tools - Quick Actions */}
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">✍️</div>
                  <h5>Literary Analysis</h5>
                  <p className="text-muted small">Essay questions & textual analysis</p>
                  <button 
                    className="btn"
                    style={{ backgroundColor: '#8B4513', color: 'white' }}
                    onClick={() => navigate('/test/english-lit')}
                  >
                    Start Analysis
                  </button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">📜</div>
                  <h5>Study Notes</h5>
                  <p className="text-muted small">Quotes, themes & character notes</p>
                  <button 
                    className="btn btn-outline-dark"
                    onClick={() => navigate('/flashcards/english-lit')}
                  >
                    View Notes
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
                  <h5>Reading Progress</h5>
                  <p className="text-muted small">Track literary studies</p>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/dashboard')}
                  >
                    View Progress
                  </button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Literary Collections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-white mb-4">📖 Literary Collections</h2>
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
                        <Badge bg={getFocusBadgeColor(topic.focus)}>
                          {topic.focus}
                        </Badge>
                      </div>
                      
                      <h5 className="card-title">{topic.name}</h5>
                      <p className="text-muted small mb-3">{topic.description}</p>
                      
                      {/* Key literary works */}
                      <div className="mb-3">
                        <small className="text-muted">Featured works:</small>
                        <div className="mt-1">
                          {topic.keyWorks.slice(0, 3).map((work, idx) => (
                            <Badge key={idx} bg="light" text="dark" className="me-1 mb-1 small">
                              {work}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between small text-muted mb-3">
                        <span>✍️ {topic.questions} exercises</span>
                        <span>Progress: {topic.progress}%</span>
                      </div>
                      
                      <div className="progress mb-3" style={{ height: '6px' }}>
                        <div 
                          className="progress-bar" 
                          style={{ width: `${topic.progress}%`, backgroundColor: '#8B4513' }}
                        ></div>
                      </div>
                      
                      <div className="d-grid gap-2">
                        <button 
                          className="btn btn-sm"
                          style={{ backgroundColor: '#8B4513', color: 'white' }}
                          onClick={() => navigate(`/test/english-lit/${topic.id}`)}
                        >
                          Study This Genre
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Literary analysis guidance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5"
        >
          <Card className="border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
            <Card.Body className="p-4">
              <h5 style={{ color: '#8B4513' }} className="mb-3">📚 Literary Analysis Mastery</h5>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">📝 <strong>Close reading:</strong> Analyze language, imagery and literary devices carefully</li>
                    <li className="mb-2">🎭 <strong>Context matters:</strong> Consider historical, social and biographical influences</li>
                    <li className="mb-2">💭 <strong>Develop interpretations:</strong> Support your ideas with textual evidence</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">🔍 <strong>Compare texts:</strong> Find links and contrasts between different works</li>
                    <li className="mb-2">✍️ <strong>Essay structure:</strong> Plan clear arguments with strong conclusions</li>
                    <li className="mb-2">📖 <strong>Learn key quotes:</strong> Memorize significant passages for analysis</li>
                  </ul>
                </Col>
              </Row>
              
              {/* Literary techniques reference */}
              <div className="mt-4 p-3 bg-light rounded">
                <h6 style={{ color: '#8B4513' }}>✨ Essential Literary Techniques</h6>
                <Row className="mt-3">
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🎨 Imagery</div>
                    <small className="text-muted">Vivid descriptive language</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🔤 Metaphor</div>
                    <small className="text-muted">Implicit comparisons</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🎵 Rhythm</div>
                    <small className="text-muted">Meter and sound patterns</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🎭 Irony</div>
                    <small className="text-muted">Contrast between appearance and reality</small>
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
          <Modal.Title>📚 Choose Your Literature Curriculum</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-4">Select your exam board to access your specific set texts and assessment requirements.</p>
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
                    <div style={{ color: '#8B4513' }}>✓</div>
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
            className="btn"
            style={{ backgroundColor: '#8B4513', color: 'white' }}
            onClick={handleStartStudy}
            disabled={!selectedExamBoard}
          >
            Enter Library
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EnglishLiteraturePage;