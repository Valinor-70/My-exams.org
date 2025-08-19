import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/animations.css';

interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: 'Fundamental' | 'Advanced' | 'Both';
  progress: number;
  questions: number;
  icon: string;
  programmingConcepts: string[];
}

const ComputerSciencePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [showExamBoardModal, setShowExamBoardModal] = useState(false);
  const [selectedExamBoard, setSelectedExamBoard] = useState<string>('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second for that tech feel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Computer Science specific exam boards
  const examBoards = [
    { code: 'AQA', name: 'AQA Computer Science', description: 'Programming fundamentals with Python focus', color: '#2c3e50' },
    { code: 'OCR', name: 'OCR Computer Science', description: 'Computational thinking and practical programming', color: '#34495e' },
    { code: 'PEARSON', name: 'Pearson Edexcel', description: 'Industry-relevant computing skills', color: '#2f3640' },
    { code: 'EDUQAS', name: 'Eduqas Computer Science', description: 'Welsh perspective on computational methods', color: '#40407a' },
  ];

  // Computer Science specific topics
  const topics: Topic[] = [
    {
      id: 'computational-thinking',
      name: 'Computational Thinking',
      description: 'Problem decomposition, pattern recognition, abstraction and algorithms',
      difficulty: 'Fundamental',
      progress: 0,
      questions: 127,
      icon: '🧠',
      programmingConcepts: ['Decomposition', 'Abstraction', 'Pattern Recognition', 'Algorithms']
    },
    {
      id: 'programming-fundamentals',
      name: 'Programming Fundamentals',
      description: 'Variables, data types, selection, iteration and functions',
      difficulty: 'Fundamental',
      progress: 0,
      questions: 198,
      icon: '💻',
      programmingConcepts: ['Variables', 'Loops', 'Functions', 'Conditionals']
    },
    {
      id: 'data-structures',
      name: 'Data Structures',
      description: 'Arrays, lists, stacks, queues and file handling',
      difficulty: 'Advanced',
      progress: 0,
      questions: 156,
      icon: '📊',
      programmingConcepts: ['Arrays', 'Lists', 'Stacks', 'Queues', 'Records']
    },
    {
      id: 'algorithms',
      name: 'Algorithms',
      description: 'Searching, sorting, and algorithmic complexity',
      difficulty: 'Advanced',
      progress: 0,
      questions: 142,
      icon: '🔄',
      programmingConcepts: ['Binary Search', 'Bubble Sort', 'Merge Sort', 'Big O']
    },
    {
      id: 'computer-systems',
      name: 'Computer Systems',
      description: 'Hardware, software, CPU architecture and memory',
      difficulty: 'Both',
      progress: 0,
      questions: 174,
      icon: '⚙️',
      programmingConcepts: ['CPU', 'RAM', 'Storage', 'Operating Systems']
    },
    {
      id: 'networks',
      name: 'Computer Networks',
      description: 'Network topologies, protocols, and the internet',
      difficulty: 'Both',
      progress: 0,
      questions: 134,
      icon: '🌐',
      programmingConcepts: ['TCP/IP', 'HTTP', 'DNS', 'Routers', 'Switches']
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      description: 'Threats, vulnerabilities, and security measures',
      difficulty: 'Both',
      progress: 0,
      questions: 118,
      icon: '🔒',
      programmingConcepts: ['Encryption', 'Authentication', 'Firewalls', 'Malware']
    },
    {
      id: 'databases',
      name: 'Databases',
      description: 'Database design, SQL queries and data management',
      difficulty: 'Advanced',
      progress: 0,
      questions: 89,
      icon: '🗄️',
      programmingConcepts: ['SQL', 'Primary Keys', 'Relationships', 'Normalization']
    }
  ];

  const handleStartStudy = () => {
    if (!selectedExamBoard) {
      setShowExamBoardModal(true);
    } else {
      navigate(`/test/computer-science`);
    }
  };

  const handleSelectExamBoard = (boardCode: string) => {
    setSelectedExamBoard(boardCode);
    setShowExamBoardModal(false);
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    if (difficulty === 'Advanced') return 'danger';
    if (difficulty === 'Fundamental') return 'success';
    return 'primary';
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', 
      minHeight: '100vh',
      fontFamily: 'Consolas, "Courier New", monospace'
    }}>
      <Container className="py-5">
        {/* Development Environment Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="display-1 mb-3">💻</div>
          <h1 className="display-4 fw-bold text-white mb-3">Development Studio</h1>
          <p className="lead text-white-50">
            Master computational thinking, programming, and digital systems
          </p>
          
          {/* Terminal-style system info */}
          <div className="mt-4 p-3 bg-dark rounded" style={{ fontFamily: 'monospace' }}>
            <div className="text-start text-light small">
              <div className="text-success">$ system_status --check</div>
              <div className="text-white-50">
                ├── User: {user?.firstName || 'Guest'} <br/>
                ├── Session: {currentTime.toLocaleTimeString()} <br/>
                ├── Topics: 8 modules loaded <br/>
                ├── Questions: 1,338 challenges available <br/>
                └── Status: Ready for deployment ✓
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              🧠 8 Core Modules
            </Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              💻 1,338 Challenges
            </Badge>
            <Badge bg="light" text="dark" className="px-3 py-2">
              🔧 Programming + Theory
            </Badge>
          </div>
        </motion.div>

        {/* Developer Tools - Quick Actions */}
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow bg-dark text-light">
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">🔧</div>
                  <h5>Code Challenges</h5>
                  <p className="text-light small">Programming problems & algorithms</p>
                  <button 
                    className="btn btn-success"
                    onClick={() => navigate('/test/computer-science')}
                  >
                    Run Tests
                  </button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow bg-dark text-light">
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">📚</div>
                  <h5>Reference Docs</h5>
                  <p className="text-light small">Syntax & concept quick reference</p>
                  <button 
                    className="btn btn-outline-light"
                    onClick={() => navigate('/flashcards/computer-science')}
                  >
                    Open Docs
                  </button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow bg-dark text-light">
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">📊</div>
                  <h5>Analytics</h5>
                  <p className="text-light small">Track coding progress & stats</p>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/dashboard')}
                  >
                    View Metrics
                  </button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Code Modules */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-white mb-4">📁 ./modules/</h2>
          <Row>
            {topics.map((topic, index) => (
              <Col lg={6} xl={4} key={topic.id} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-100 border-0 shadow bg-dark text-light">
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="display-6">{topic.icon}</div>
                        <Badge bg={getDifficultyBadgeColor(topic.difficulty)}>
                          {topic.difficulty}
                        </Badge>
                      </div>
                      
                      <h5 className="card-title text-light">{topic.name}</h5>
                      <p className="text-light small mb-3">{topic.description}</p>
                      
                      {/* Programming concepts in terminal style */}
                      <div className="mb-3">
                        <small className="text-secondary">// Key concepts:</small>
                        <div className="mt-1 small" style={{ fontFamily: 'monospace' }}>
                          {topic.programmingConcepts.slice(0, 3).map((concept, idx) => (
                            <div key={idx} className="text-success">
                              {`> ${concept.toLowerCase().replace(' ', '_')}`}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between small text-secondary mb-3">
                        <span>💻 {topic.questions} challenges</span>
                        <span>Progress: {topic.progress}%</span>
                      </div>
                      
                      <div className="progress mb-3" style={{ height: '6px' }}>
                        <div 
                          className="progress-bar bg-success" 
                          style={{ width: `${topic.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="d-grid gap-2">
                        <button 
                          className="btn btn-success btn-sm"
                          onClick={() => navigate(`/test/computer-science/${topic.id}`)}
                        >
                          ./execute module
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Programming best practices */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5"
        >
          <Card className="border-0 shadow bg-dark text-light">
            <Card.Body className="p-4">
              <h5 className="text-success mb-3">💻 Development Best Practices</h5>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">🧠 <strong>Think before coding:</strong> Plan your algorithm with pseudocode first</li>
                    <li className="mb-2">🔄 <strong>Test frequently:</strong> Run small tests to check your logic step-by-step</li>
                    <li className="mb-2">📝 <strong>Comment your code:</strong> Explain complex logic for future reference</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">🐛 <strong>Debug systematically:</strong> Use print statements to trace execution</li>
                    <li className="mb-2">📚 <strong>Learn multiple languages:</strong> Concepts transfer between languages</li>
                    <li className="mb-2">⚡ <strong>Optimize later:</strong> Focus on correctness first, efficiency second</li>
                  </ul>
                </Col>
              </Row>
              
              {/* Code snippet examples */}
              <div className="mt-4 p-3 bg-black rounded">
                <h6 className="text-success">// Essential Programming Patterns</h6>
                <Row className="mt-3" style={{ fontFamily: 'monospace' }}>
                  <Col md={6}>
                    <div className="small text-light mb-2">
                      <div className="text-warning">// Iteration</div>
                      <div>for i in range(n):</div>
                      <div className="ps-3">print(i)</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="small text-light mb-2">
                      <div className="text-warning">// Selection</div>
                      <div>if condition:</div>
                      <div className="ps-3">execute_code()</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="small text-light mb-2">
                      <div className="text-warning">// Function</div>
                      <div>def solve_problem(data):</div>
                      <div className="ps-3">return result</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="small text-light mb-2">
                      <div className="text-warning">// Data Structure</div>
                      <div>my_list = [1, 2, 3]</div>
                      <div>my_list.append(4)</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>

      {/* Exam Board Selection Modal */}
      <Modal show={showExamBoardModal} onHide={() => setShowExamBoardModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>💻 Select Development Environment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <p className="text-secondary mb-4">Choose your exam board for specification-aligned programming challenges.</p>
          <div className="d-grid gap-3">
            {examBoards.map((board) => (
              <div
                key={board.code}
                className={`exam-board-option p-3 rounded border ${selectedExamBoard === board.code ? 'border-success bg-dark' : 'border-secondary bg-black'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelectExamBoard(board.code)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="text-success">{board.name}</strong>
                    <div className="small text-secondary">{board.description}</div>
                  </div>
                  {selectedExamBoard === board.code && (
                    <div className="text-success">✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <button className="btn btn-secondary" onClick={() => setShowExamBoardModal(false)}>
            Cancel
          </button>
          <button 
            className="btn btn-success" 
            onClick={handleStartStudy}
            disabled={!selectedExamBoard}
          >
            Initialize Environment
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ComputerSciencePage;