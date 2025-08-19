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
  equations: string[];
}

const ChemistryPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [showExamBoardModal, setShowExamBoardModal] = useState(false);
  const [showScienceTypeModal, setShowScienceTypeModal] = useState(false);
  const [selectedExamBoard, setSelectedExamBoard] = useState<string>('');
  const [selectedScienceType, setSelectedScienceType] = useState<string>('');

  // Chemistry-specific exam boards
  const examBoards = [
    { code: 'AQA', name: 'AQA Chemistry', description: 'Quantitative approach with practical skills', color: '#8e44ad' },
    { code: 'PEARSON', name: 'Pearson Edexcel', description: 'Industrial applications and real-world chemistry', color: '#9b59b6' },
    { code: 'OCR', name: 'OCR Gateway Chemistry', description: 'Chemistry in context and everyday applications', color: '#bb8fce' },
    { code: 'EDUQAS', name: 'Eduqas Chemistry', description: 'Welsh perspective on chemical science', color: '#d2b4de' },
    { code: 'IGCSE_PEARSON', name: 'IGCSE Chemistry', description: 'International chemistry with global examples', color: '#e8daef' },
  ];

  // Science type options for Chemistry
  const scienceTypes = [
    { code: 'Triple', name: 'Triple Science Chemistry', description: 'Separate Chemistry GCSE - comprehensive coverage' },
    { code: 'Double', name: 'Combined Science Chemistry', description: 'Chemistry element of Double Award Science' }
  ];

  // Chemistry-specific topics with chemical equations
  const topics: Topic[] = [
    {
      id: 'atomic-structure',
      name: 'Atomic Structure & Periodic Table',
      description: 'Atoms, elements, compounds and the periodic table',
      tier: 'Both',
      progress: 0,
      questions: 156,
      icon: '⚛️',
      equations: ['2H₂ + O₂ → 2H₂O', 'CaCO₃ → CaO + CO₂']
    },
    {
      id: 'bonding-structure',
      name: 'Bonding & Structure',
      description: 'Ionic, covalent and metallic bonding, and their properties',
      tier: 'Both',
      progress: 0,
      questions: 134,
      icon: '🔗',
      equations: ['Na + Cl → Na⁺Cl⁻', 'C + O₂ → CO₂']
    },
    {
      id: 'quantitative-chemistry',
      name: 'Quantitative Chemistry',
      description: 'Chemical calculations, moles and chemical equations',
      tier: 'Higher',
      progress: 0,
      questions: 178,
      icon: '⚖️',
      equations: ['n = m/Mr', 'Percentage yield = (actual/theoretical) × 100']
    },
    {
      id: 'chemical-changes',
      name: 'Chemical Changes',
      description: 'Reactivity series, acids and bases, electrolysis',
      tier: 'Both',
      progress: 0,
      questions: 165,
      icon: '⚗️',
      equations: ['Mg + 2HCl → MgCl₂ + H₂', '2NaCl → 2Na + Cl₂']
    },
    {
      id: 'energy-changes',
      name: 'Energy Changes',
      description: 'Exothermic and endothermic reactions, reaction profiles',
      tier: 'Both',
      progress: 0,
      questions: 123,
      icon: '🔥',
      equations: ['CH₄ + 2O₂ → CO₂ + 2H₂O', 'ΔH = products - reactants']
    },
    {
      id: 'rate-equilibrium',
      name: 'Rate of Reaction & Equilibrium',
      description: 'Factors affecting reaction rates and chemical equilibrium',
      tier: 'Higher',
      progress: 0,
      questions: 142,
      icon: '⏱️',
      equations: ['N₂ + 3H₂ ⇌ 2NH₃', 'Rate = k[A][B]']
    },
    {
      id: 'organic-chemistry',
      name: 'Organic Chemistry',
      description: 'Hydrocarbons, alcohols, polymers and natural products',
      tier: 'Both',
      progress: 0,
      questions: 189,
      icon: '🧪',
      equations: ['C₂H₄ + H₂O → C₂H₅OH', 'CₙH₂ₙ₊₂']
    },
    {
      id: 'chemical-analysis',
      name: 'Chemical Analysis',
      description: 'Testing for ions, chromatography and instrumental methods',
      tier: 'Both',
      progress: 0,
      questions: 117,
      icon: '🔬',
      equations: ['AgNO₃ + NaCl → AgCl + NaNO₃', 'Rf = distance moved by spot / distance moved by solvent']
    }
  ];

  const handleStartStudy = () => {
    if (!selectedExamBoard) {
      setShowExamBoardModal(true);
    } else if (!selectedScienceType) {
      setShowScienceTypeModal(true);
    } else {
      navigate(`/test/chemistry`);
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
    <div style={{ background: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)', minHeight: '100vh' }}>
      <Container className="py-5">
        {/* Chemistry Laboratory Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="display-1 mb-3">⚗️</div>
          <h1 className="display-4 fw-bold text-white mb-3">Chemistry Laboratory</h1>
          <p className="lead text-white-50">
            Discover the molecular world through reactions, equations and analysis
          </p>
          <div className="mt-4">
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              🧪 8 Core Topics
            </Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">
              ⚛️ 1,204 Questions
            </Badge>
            <Badge bg="light" text="dark" className="px-3 py-2">
              📊 Calculations & Practicals
            </Badge>
          </div>
        </motion.div>

        {/* Laboratory Workstation - Quick Actions */}
        <Row className="mb-5">
          <Col md={4} className="mb-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <Card.Body className="text-center p-4">
                  <div className="display-6 mb-3">🧪</div>
                  <h5>Chemical Tests</h5>
                  <p className="text-muted small">Reactions & calculations</p>
                  <button 
                    className="btn"
                    style={{ backgroundColor: '#8e44ad', color: 'white' }}
                    onClick={() => navigate('/test/chemistry')}
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
                  <h5>Reference Cards</h5>
                  <p className="text-muted small">Equations & formula sheet</p>
                  <button 
                    className="btn btn-outline-purple"
                    style={{ borderColor: '#8e44ad', color: '#8e44ad' }}
                    onClick={() => navigate('/flashcards/chemistry')}
                  >
                    View Formula
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
                  <h5>Lab Reports</h5>
                  <p className="text-muted small">Track experimental progress</p>
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

        {/* Chemical Topics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-white mb-4">🧪 Chemical Studies</h2>
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
                      
                      {/* Sample equations */}
                      <div className="mb-3">
                        <small className="text-muted">Key equations:</small>
                        <div className="mt-1">
                          {topic.equations.slice(0, 2).map((equation, idx) => (
                            <div key={idx} className="small font-monospace text-primary mb-1">
                              {equation}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between small text-muted mb-3">
                        <span>⚗️ {topic.questions} problems</span>
                        <span>Progress: {topic.progress}%</span>
                      </div>
                      
                      <div className="progress mb-3" style={{ height: '6px' }}>
                        <div 
                          className="progress-bar" 
                          style={{ width: `${topic.progress}%`, backgroundColor: '#8e44ad' }}
                        ></div>
                      </div>
                      
                      <div className="d-grid gap-2">
                        <button 
                          className="btn btn-sm"
                          style={{ backgroundColor: '#8e44ad', color: 'white' }}
                          onClick={() => navigate(`/test/chemistry/${topic.id}`)}
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

        {/* Chemistry-specific study guidance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-5"
        >
          <Card className="border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
            <Card.Body className="p-4">
              <h5 style={{ color: '#8e44ad' }} className="mb-3">⚗️ Chemistry Mastery Guide</h5>
              <Row>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">🧮 <strong>Master calculations:</strong> Practice mole calculations and percentage yield daily</li>
                    <li className="mb-2">⚖️ <strong>Balance equations:</strong> Start with simple reactions, then complex ones</li>
                    <li className="mb-2">🔬 <strong>Know your practicals:</strong> Understand methods, safety and observations</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <ul className="list-unstyled">
                    <li className="mb-2">📊 <strong>Learn trends:</strong> Periodic table patterns help predict properties</li>
                    <li className="mb-2">🎯 <strong>Use chemical tests:</strong> Know how to identify ions and compounds</li>
                    <li className="mb-2">⚛️ <strong>Think particles:</strong> Visualize what happens to atoms in reactions</li>
                  </ul>
                </Col>
              </Row>
              
              {/* Essential chemical formulas */}
              <div className="mt-4 p-3 bg-light rounded">
                <h6 style={{ color: '#8e44ad' }}>🧪 Essential Chemical Formulas</h6>
                <Row className="mt-3">
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">⚖️ Moles</div>
                    <small className="text-muted font-monospace">n = m/Mr</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">📊 Concentration</div>
                    <small className="text-muted font-monospace">c = n/V</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">🔥 Energy Change</div>
                    <small className="text-muted font-monospace">q = mcΔT</small>
                  </Col>
                  <Col md={3} className="text-center mb-2">
                    <div className="fw-bold">⚗️ Yield</div>
                    <small className="text-muted font-monospace">(actual/theoretical) × 100</small>
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
          <Modal.Title>⚗️ Choose Your Chemistry Exam Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-4">Select your exam board for specification-aligned content and calculations.</p>
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
                    <div style={{ color: '#8e44ad' }}>✓</div>
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
          <Modal.Title>🧪 Choose Your Science Pathway</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-4">Are you studying Chemistry as a separate subject or as part of Combined Science?</p>
          <div className="d-grid gap-3">
            {scienceTypes.map((type) => (
              <div
                key={type.code}
                className={`science-type-option p-3 rounded border ${selectedScienceType === type.code ? 'bg-light' : 'border-light'}`}
                style={{ 
                  cursor: 'pointer',
                  borderColor: selectedScienceType === type.code ? '#8e44ad' : undefined
                }}
                onClick={() => handleSelectScienceType(type.code)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong style={{ color: '#8e44ad' }}>{type.name}</strong>
                    <div className="small text-muted">{type.description}</div>
                  </div>
                  {selectedScienceType === type.code && (
                    <div style={{ color: '#8e44ad' }}>✓</div>
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
            className="btn"
            style={{ backgroundColor: '#8e44ad', color: 'white' }}
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

export default ChemistryPage;