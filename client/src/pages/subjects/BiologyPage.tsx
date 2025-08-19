import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/animations.css';

interface Topic {
  id: string;
  name: string;
  description: string;
  tier: 'Foundation' | 'Higher' | 'Both';
  progress: number;
  questions: number;
  icon: string;
  keyWords: string[];
}

const BiologyPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [showExamBoardModal, setShowExamBoardModal] = useState(false);
  const [showScienceTypeModal, setShowScienceTypeModal] = useState(false);
  const [selectedExamBoard, setSelectedExamBoard] = useState<string>('');
  const [selectedScienceType, setSelectedScienceType] = useState<string>('');

  // Biology-specific exam boards with science focus
  const examBoards = [
    { code: 'AQA', name: 'AQA Biology', description: 'Clear progression with practical investigations', color: '#27ae60' },
    { code: 'PEARSON', name: 'Pearson Edexcel', description: 'Real-world applications and case studies', color: '#2ecc71' },
    { code: 'OCR', name: 'OCR Gateway Biology', description: 'Context-led approach to biological science', color: '#58d68d' },
    { code: 'EDUQAS', name: 'Eduqas Biology', description: 'Coherent study of living organisms', color: '#82e0aa' },
    { code: 'IGCSE_PEARSON', name: 'IGCSE Biology', description: 'International perspective on biological sciences', color: '#a9dfbf' },
  ];

  // Science type options for Biology
  const scienceTypes = [
    { code: 'Triple', name: 'Triple Science Biology', description: 'Separate Biology GCSE - full content coverage' },
    { code: 'Double', name: 'Combined Science Biology', description: 'Biology component of Double Award Science' }
  ];

  // Biology-specific topics with biological terminology
  const topics: Topic[] = [
    {
      id: 'cells-organisation',
      name: 'Cell Biology & Organisation',
      description: 'Cell structure, cell division, organisation and microscopy',
      tier: 'Both',
      progress: 0,
      questions: 145,
      icon: '🧬',
      keyWords: ['cytoplasm', 'nucleus', 'mitochondria', 'cell membrane', 'mitosis', 'stem cells']
    },
    {
      id: 'transport-systems',
      name: 'Transport Systems',
      description: 'Circulatory system, blood, heart and transport in plants',
      tier: 'Both',
      progress: 0,
      questions: 132,
      icon: '❤️',
      keyWords: ['arteries', 'veins', 'plasma', 'red blood cells', 'xylem', 'phloem']
    },
    {
      id: 'health-disease',
      name: 'Health, Disease & Medicine',
      description: 'Communicable diseases, immune system and drug development',
      tier: 'Both',
      progress: 0,
      questions: 158,
      icon: '🦠',
      keyWords: ['pathogens', 'antibodies', 'vaccination', 'antibiotics', 'immune system']
    },
    {
      id: 'coordination-control',
      name: 'Coordination & Control',
      description: 'Nervous system, hormones and maintaining internal environment',
      tier: 'Both',
      progress: 0,
      questions: 167,
      icon: '🧠',
      keyWords: ['neurons', 'synapses', 'hormones', 'homeostasis', 'reflex actions']
    },
    {
      id: 'photosynthesis-respiration',
      name: 'Photosynthesis & Respiration',
      description: 'Energy transfers, limiting factors and metabolic processes',
      tier: 'Both',
      progress: 0,
      questions: 124,
      icon: '🌱',
      keyWords: ['chlorophyll', 'glucose', 'oxygen', 'carbon dioxide', 'enzymes', 'ATP']
    },
    {
      id: 'inheritance-evolution',
      name: 'Inheritance & Evolution',
      description: 'Genetics, natural selection and classification',
      tier: 'Higher',
      progress: 0,
      questions: 189,
      icon: '🧪',
      keyWords: ['DNA', 'genes', 'alleles', 'natural selection', 'species', 'variation']
    },
    {
      id: 'ecology-environment',
      name: 'Ecology & Environment',
      description: 'Ecosystems, biodiversity and environmental interactions',
      tier: 'Both',
      progress: 0,
      questions: 143,
      icon: '🌍',
      keyWords: ['ecosystems', 'food chains', 'biodiversity', 'carbon cycle', 'predator-prey']
    }
  ];

  const handleStartStudy = () => {
    if (!selectedExamBoard) {
      setShowExamBoardModal(true);
    } else if (!selectedScienceType) {
      setShowScienceTypeModal(true);
    } else {
      navigate(`/test/biology`);
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

  const getTierBadgeColor = (tier: string) => {
    if (tier === 'Higher') return 'primary';
    if (tier === 'Foundation') return 'success';
    return 'info';
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)', minHeight: '100vh' }}>
      <Container className="py-5">
        {/* Biology Room Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="display-1 mb-3">🧬</div>
          <h1 className="display-4 fw-bold text-white mb-3">Biology Laboratory</h1>
          <p className="lead text-white-50">
            Explore the fascinating world of living organisms and life processes
          </p>
          <div className="mt-4">
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              🔬 7 Core Topics
            </Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              🧪 1,058 Questions
            </Badge>
            <Badge bg="light" text="dark" className="px-3 py-2">
              📊 Triple/Double Science
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
                  <h5>Practical Tests</h5>
                  <p className="text-muted small">Experiment-based questions</p>
                  <button 
                    className="btn btn-success"
                    onClick={() => navigate('/test/biology')}
                  >
                    Start Investigation
                  </button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">🧪</div>
                  <h5>Study Cards</h5>
                  <p className="text-muted small">Key terms & biological processes</p>
                  <button 
                    className="btn btn-outline-success"
                    onClick={() => navigate('/flashcards/biology')}
                  >
                    Review Terms
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
                  <h5>Progress Report</h5>
                  <p className="text-muted small">Track your biological studies</p>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/dashboard')}
                  >
                    View Results
                  </button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Research Topics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-white mb-4">🔬 Research Areas</h2>
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
                        <Badge bg={getTierBadgeColor(topic.tier)}>
                          {topic.tier}
                        </Badge>
                      </div>
                      
                      <h5 className="card-title">{topic.name}</h5>
                      <p className="text-muted small mb-3">{topic.description}</p>
                      
                      {/* Key vocabulary preview */}
                      <div className="mb-3">
                        <small className="text-muted">Key terms:</small>
                        <div className="mt-1">
                          {topic.keyWords.slice(0, 3).map((word, idx) => (
                            <Badge key={idx} bg="light" text="dark" className="me-1 mb-1 small">
                              {word}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between small text-muted mb-3">
                        <span>🧪 {topic.questions} experiments</span>
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
                          onClick={() => navigate(`/test/biology/${topic.id}`)}
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

        {/* Biology-specific study guidance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5"
        >
          <Card className="border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
            <Card.Body className="p-4">
              <h5 className="text-success mb-3">🧬 Biology Study Strategies</h5>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">📝 <strong>Learn the vocabulary:</strong> Biology is a language - master the scientific terms</li>
                    <li className="mb-2">🔗 <strong>Make connections:</strong> Link biological processes across different topics</li>
                    <li className="mb-2">📊 <strong>Practice diagrams:</strong> Draw and label biological structures regularly</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">🧪 <strong>Understand practicals:</strong> Know the methods and results of key experiments</li>
                    <li className="mb-2">📖 <strong>Use examples:</strong> Learn specific examples for each biological concept</li>
                    <li className="mb-2">🎯 <strong>Application questions:</strong> Practice applying knowledge to new scenarios</li>
                  </ul>
                </Col>
              </Row>
              
              {/* Biology-specific key processes */}
              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="text-success">🔬 Essential Biological Processes</h6>
                <Row className="mt-3">
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🌱 Photosynthesis</div>
                    <small className="text-muted">Light → Chemical Energy</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🫁 Respiration</div>
                    <small className="text-muted">Glucose → ATP</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🧬 Protein Synthesis</div>
                    <small className="text-muted">DNA → RNA → Protein</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🔄 Cell Division</div>
                    <small className="text-muted">Mitosis & Meiosis</small>
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
          <Modal.Title>🧬 Choose Your Biology Exam Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-4">Select your exam board to access specification-matched content.</p>
          <div className="d-grid gap-3">
            {examBoards.map((board) => (
              <div
                key={board.code}
                className={`exam-board-option p-3 rounded border ${selectedExamBoard === board.code ? 'border-success bg-light' : 'border-light'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelectExamBoard(board.code)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong style={{ color: board.color }}>{board.name}</strong>
                    <div className="small text-muted">{board.description}</div>
                  </div>
                  {selectedExamBoard === board.code && (
                    <div className="text-success">✓</div>
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
          <p className="text-muted mb-4">Are you studying Biology as a separate subject or as part of Combined Science?</p>
          <div className="d-grid gap-3">
            {scienceTypes.map((type) => (
              <div
                key={type.code}
                className={`science-type-option p-3 rounded border ${selectedScienceType === type.code ? 'border-success bg-light' : 'border-light'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelectScienceType(type.code)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong className="text-success">{type.name}</strong>
                    <div className="small text-muted">{type.description}</div>
                  </div>
                  {selectedScienceType === type.code && (
                    <div className="text-success">✓</div>
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
            className="btn btn-success" 
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

export default BiologyPage;