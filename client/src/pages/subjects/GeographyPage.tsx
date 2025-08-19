import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/animations.css';

interface Topic {
  id: string;
  name: string;
  description: string;
  scale: 'Local' | 'National' | 'Global' | 'Mixed';
  progress: number;
  questions: number;
  icon: string;
  fieldworkSkills: string[];
}

const GeographyPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [showExamBoardModal, setShowExamBoardModal] = useState(false);
  const [selectedExamBoard, setSelectedExamBoard] = useState<string>('');

  // Geography exam boards
  const examBoards = [
    { code: 'AQA', name: 'AQA Geography', description: 'Issue-based geography with UK and global case studies', color: '#16a085' },
    { code: 'PEARSON', name: 'Pearson Edexcel', description: 'Dynamic planet approach with contemporary issues', color: '#1abc9c' },
    { code: 'OCR', name: 'OCR Geography', description: 'Geographical processes and human-environment interactions', color: '#48c9b0' },
    { code: 'EDUQAS', name: 'Eduqas Geography', description: 'Welsh and global perspectives on geographical themes', color: '#76d7c4' },
    { code: 'IGCSE_PEARSON', name: 'IGCSE Geography', description: 'International geography with diverse case studies', color: '#a3e4d7' },
  ];

  // Geography-specific topics
  const topics: Topic[] = [
    {
      id: 'physical-landscapes',
      name: 'Physical Landscapes',
      description: 'Rivers, coasts, glaciation and weathering processes shaping our planet',
      scale: 'Mixed',
      progress: 0,
      questions: 167,
      icon: '🏔️',
      fieldworkSkills: ['Field sketching', 'Measuring river velocity', 'Coastal profiling', 'Weather monitoring']
    },
    {
      id: 'urban-environments',
      name: 'Urban Environments',
      description: 'City growth, urban challenges and sustainable development solutions',
      scale: 'Local',
      progress: 0,
      questions: 154,
      icon: '🏙️',
      fieldworkSkills: ['Land use mapping', 'Quality of life surveys', 'Traffic counts', 'Housing surveys']
    },
    {
      id: 'natural-hazards',
      name: 'Natural Hazards',
      description: 'Earthquakes, volcanoes, extreme weather and hazard management',
      scale: 'Global',
      progress: 0,
      questions: 143,
      icon: '🌋',
      fieldworkSkills: ['Risk assessment', 'Hazard mapping', 'Impact analysis', 'Emergency planning']
    },
    {
      id: 'ecosystems',
      name: 'Ecosystems & Biodiversity',
      description: 'Tropical rainforests, hot deserts and ecosystem management',
      scale: 'Global',
      progress: 0,
      questions: 136,
      icon: '🌿',
      fieldworkSkills: ['Species identification', 'Quadrat sampling', 'Soil testing', 'Climate measurement']
    },
    {
      id: 'development-inequality',
      name: 'Development & Inequality',
      description: 'Global development patterns, inequality and aid effectiveness',
      scale: 'Global',
      progress: 0,
      questions: 128,
      icon: '🌍',
      fieldworkSkills: ['Development indicators', 'Statistical analysis', 'Case study research', 'Data interpretation']
    },
    {
      id: 'resource-management',
      name: 'Resource Management',
      description: 'Water, energy and food security in a changing world',
      scale: 'National',
      progress: 0,
      questions: 145,
      icon: '⚡',
      fieldworkSkills: ['Resource surveys', 'Sustainability assessment', 'Energy audits', 'Water quality testing']
    },
    {
      id: 'climate-change',
      name: 'Climate Change',
      description: 'Causes, consequences and responses to our changing climate',
      scale: 'Global',
      progress: 0,
      questions: 119,
      icon: '🌡️',
      fieldworkSkills: ['Weather data analysis', 'Carbon footprinting', 'Adaptation strategies', 'Mitigation planning']
    }
  ];

  const handleStartStudy = () => {
    if (!selectedExamBoard) {
      setShowExamBoardModal(true);
    } else {
      navigate(`/test/geography`);
    }
  };

  const handleSelectExamBoard = (boardCode: string) => {
    setSelectedExamBoard(boardCode);
    setShowExamBoardModal(false);
  };

  const getScaleBadgeColor = (scale: string) => {
    switch(scale) {
      case 'Local': return 'success';
      case 'National': return 'warning';
      case 'Global': return 'primary';
      default: return 'info';
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #16a085 0%, #1abc9c 100%)', 
      minHeight: '100vh'
    }}>
      <Container className="py-5">
        {/* Exploration Center Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="display-1 mb-3">🌍</div>
          <h1 className="display-4 fw-bold text-white mb-3">Exploration Center</h1>
          <p className="lead text-white-50">
            Discover our planet's patterns, processes and people
          </p>
          
          {/* Global stats display */}
          <div className="mt-4 p-3 bg-dark bg-opacity-25 rounded">
            <Row className="text-white-50 small">
              <Col md={3} className="mb-2">
                <div className="fw-bold">🌍 Population</div>
                <div>8.1 billion people</div>
              </Col>
              <Col md={3} className="mb-2">
                <div className="fw-bold">🌡️ Global Temp</div>
                <div>+1.1°C since 1880</div>
              </Col>
              <Col md={3} className="mb-2">
                <div className="fw-bold">🏙️ Urban Population</div>
                <div>56% and rising</div>
              </Col>
              <Col md={3} className="mb-2">
                <div className="fw-bold">🌿 Forest Cover</div>
                <div>31% of land area</div>
              </Col>
            </Row>
          </div>
          
          <div className="mt-4">
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              🗺️ 7 Key Themes
            </Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              📊 992 Case Studies
            </Badge>
            <Badge bg="light" text="dark" className="px-3 py-2">
              🔬 Fieldwork Skills
            </Badge>
          </div>
        </motion.div>

        {/* Field Station - Quick Actions */}
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">🗺️</div>
                  <h5>Field Investigation</h5>
                  <p className="text-muted small">Case studies & geographical analysis</p>
                  <button 
                    className="btn btn-info"
                    onClick={() => navigate('/test/geography')}
                  >
                    Start Fieldwork
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
                  <h5>Field Notes</h5>
                  <p className="text-muted small">Key terms & geographical concepts</p>
                  <button 
                    className="btn btn-outline-info"
                    onClick={() => navigate('/flashcards/geography')}
                  >
                    Review Notes
                  </button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">📈</div>
                  <h5>Survey Results</h5>
                  <p className="text-muted small">Track geographical studies</p>
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

        {/* Geographical Investigations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-white mb-4">🔬 Field Investigations</h2>
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
                        <Badge bg={getScaleBadgeColor(topic.scale)}>
                          {topic.scale}
                        </Badge>
                      </div>
                      
                      <h5 className="card-title">{topic.name}</h5>
                      <p className="text-muted small mb-3">{topic.description}</p>
                      
                      {/* Fieldwork skills */}
                      <div className="mb-3">
                        <small className="text-muted">Fieldwork skills:</small>
                        <div className="mt-1">
                          {topic.fieldworkSkills.slice(0, 3).map((skill, idx) => (
                            <Badge key={idx} bg="light" text="dark" className="me-1 mb-1 small">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between small text-muted mb-3">
                        <span>📊 {topic.questions} studies</span>
                        <span>Progress: {topic.progress}%</span>
                      </div>
                      
                      <div className="progress mb-3" style={{ height: '6px' }}>
                        <div 
                          className="progress-bar bg-info" 
                          style={{ width: `${topic.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="d-grid gap-2">
                        <button 
                          className="btn btn-info btn-sm"
                          onClick={() => navigate(`/test/geography/${topic.id}`)}
                        >
                          Investigate Topic
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Geographical skills guidance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5"
        >
          <Card className="border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
            <Card.Body className="p-4">
              <h5 className="text-info mb-3">🗺️ Geographical Skills Mastery</h5>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">📊 <strong>Data analysis:</strong> Interpret graphs, maps and statistical information effectively</li>
                    <li className="mb-2">🗺️ <strong>Map skills:</strong> Use OS maps, atlases and GIS for spatial analysis</li>
                    <li className="mb-2">📝 <strong>Case studies:</strong> Learn specific examples at different scales</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">🔬 <strong>Fieldwork:</strong> Practice observation, measurement and data collection</li>
                    <li className="mb-2">🌍 <strong>Global awareness:</strong> Connect local patterns to global processes</li>
                    <li className="mb-2">💭 <strong>Evaluate solutions:</strong> Assess the effectiveness of management strategies</li>
                  </ul>
                </Col>
              </Row>
              
              {/* Essential geographical concepts */}
              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="text-info">🌍 Core Geographical Concepts</h6>
                <Row className="mt-3">
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">📍 Location</div>
                    <small className="text-muted">Where places are</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🔄 Process</div>
                    <small className="text-muted">How things work</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">⚖️ Scale</div>
                    <small className="text-muted">Level of analysis</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🔗 Connection</div>
                    <small className="text-muted">Links between places</small>
                  </Col>
                </Row>
              </div>
              
              {/* Field equipment reference */}
              <div className="mt-3 p-3 bg-info bg-opacity-10 rounded">
                <h6 className="text-info">🎒 Essential Field Equipment</h6>
                <Row className="mt-2">
                  <Col md={4} className="small mb-1">📐 Clinometer - measuring angles</Col>
                  <Col md={4} className="small mb-1">📏 Measuring tape - distances</Col>
                  <Col md={4} className="small mb-1">🧭 Compass - direction finding</Col>
                  <Col md={4} className="small mb-1">📱 GPS device - coordinates</Col>
                  <Col md={4} className="small mb-1">🌡️ Thermometer - temperature</Col>
                  <Col md={4} className="small mb-1">💧 pH strips - water quality</Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>

      {/* Exam Board Selection Modal */}
      <Modal show={showExamBoardModal} onHide={() => setShowExamBoardModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🌍 Choose Your Geography Expedition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-4">Select your exam board to access region-specific case studies and fieldwork requirements.</p>
          <div className="d-grid gap-3">
            {examBoards.map((board) => (
              <div
                key={board.code}
                className={`exam-board-option p-3 rounded border ${selectedExamBoard === board.code ? 'border-info bg-light' : 'border-light'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelectExamBoard(board.code)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong style={{ color: board.color }}>{board.name}</strong>
                    <div className="small text-muted">{board.description}</div>
                  </div>
                  {selectedExamBoard === board.code && (
                    <div className="text-info">✓</div>
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
            className="btn btn-info" 
            onClick={handleStartStudy}
            disabled={!selectedExamBoard}
          >
            Begin Expedition
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GeographyPage;