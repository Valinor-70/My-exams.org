import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [showExamBoardModal, setShowExamBoardModal] = useState(false);
  const [selectedExamBoard, setSelectedExamBoard] = useState<string>('');

  const examBoards = [
    { code: 'AQA', name: 'AQA History', description: 'Thematic studies with diverse historical periods', color: '#795548' },
    { code: 'PEARSON', name: 'Pearson Edexcel', description: 'British and world history with depth studies', color: '#8d6e63' },
    { code: 'OCR', name: 'OCR History', description: 'Explaining the Modern World approach', color: '#a1887f' },
    { code: 'EDUQAS', name: 'Eduqas History', description: 'Welsh and British history perspectives', color: '#bcaaa4' },
  ];

  const topics = [
    { id: 'medieval', name: 'Medieval Britain', icon: '🏰', questions: 156 },
    { id: 'early-modern', name: 'Early Modern Period', icon: '⚔️', questions: 142 },
    { id: 'industrial', name: 'Industrial Revolution', icon: '🏭', questions: 167 },
    { id: 'world-wars', name: 'World Wars Era', icon: '✈️', questions: 189 },
    { id: 'modern-world', name: 'Modern World', icon: '🌍', questions: 134 },
  ];

  const handleStartStudy = () => {
    if (!selectedExamBoard) {
      setShowExamBoardModal(true);
    } else {
      navigate(`/test/history`);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #795548 0%, #8d6e63 100%)', minHeight: '100vh' }}>
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="display-1 mb-3">🏛️</div>
          <h1 className="display-4 fw-bold text-white mb-3">History Archive</h1>
          <p className="lead text-white-50">
            Explore past events, civilizations and historical turning points
          </p>
          <div className="mt-4">
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">📚 5 Historical Periods</Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">📜 788 Questions</Badge>
            <Badge bg="light" text="dark" className="px-3 py-2">🗓️ Timeline Analysis</Badge>
          </div>
        </motion.div>

        <Row className="mb-5">
          {[
            { icon: '📜', title: 'Historical Analysis', desc: 'Source analysis & interpretation', action: () => navigate('/test/history') },
            { icon: '📚', title: 'Timeline Notes', desc: 'Key dates & events reference', action: () => navigate('/flashcards/history') },
            { icon: '📊', title: 'Study Progress', desc: 'Track historical knowledge', action: () => navigate('/dashboard') },
          ].map((item, index) => (
            <Col md={4} key={index} className="mb-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                  <Card.Body className="text-center p-4">
                    <div className="display-6 mb-3">{item.icon}</div>
                    <h5>{item.title}</h5>
                    <p className="text-muted small">{item.desc}</p>
                    <button className="btn" style={{ backgroundColor: '#795548', color: 'white' }} onClick={item.action}>
                      {index === 0 ? 'Start Analysis' : index === 1 ? 'View Timeline' : 'View Progress'}
                    </button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h2 className="text-white mb-4">📚 Historical Periods</h2>
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
                      <div className="display-6 mb-3">{topic.icon}</div>
                      <h5>{topic.name}</h5>
                      <p className="text-muted small mb-3">📜 {topic.questions} historical sources</p>
                      <div className="progress mb-3" style={{ height: '6px' }}>
                        <div className="progress-bar" style={{ width: '0%', backgroundColor: '#795548' }}></div>
                      </div>
                      <button 
                        className="btn btn-sm w-100"
                        style={{ backgroundColor: '#795548', color: 'white' }}
                        onClick={() => navigate(`/test/history/${topic.id}`)}
                      >
                        Study Period
                      </button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>

      <Modal show={showExamBoardModal} onHide={() => setShowExamBoardModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>🏛️ Choose Your History Specification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-grid gap-3">
            {examBoards.map((board) => (
              <div
                key={board.code}
                className={`p-3 rounded border ${selectedExamBoard === board.code ? 'border-primary bg-light' : 'border-light'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedExamBoard(board.code)}
              >
                <strong style={{ color: board.color }}>{board.name}</strong>
                <div className="small text-muted">{board.description}</div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowExamBoardModal(false)}>Cancel</button>
          <button 
            className="btn" 
            style={{ backgroundColor: '#795548', color: 'white' }}
            onClick={handleStartStudy} 
            disabled={!selectedExamBoard}
          >
            Enter Archive
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HistoryPage;