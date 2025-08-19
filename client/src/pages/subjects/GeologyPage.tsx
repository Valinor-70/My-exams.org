import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GeologyPage: React.FC = () => {
  const navigate = useNavigate();
  
  const topics = [
    { id: 'earth-structure', name: 'Earth Structure & Processes', icon: '🌋', questions: 156 },
    { id: 'rocks-minerals', name: 'Rocks & Minerals', icon: '🗿', questions: 142 },
    { id: 'plate-tectonics', name: 'Plate Tectonics', icon: '🌍', questions: 134 },
    { id: 'geological-time', name: 'Geological Time & Fossils', icon: '🦴', questions: 123 },
    { id: 'environmental', name: 'Environmental Geology', icon: '♻️', questions: 145 },
  ];

  return (
    <div style={{ background: 'linear-gradient(135deg, #8b4513 0%, #a0522d 100%)', minHeight: '100vh' }}>
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="display-1 mb-3">🗿</div>
          <h1 className="display-4 fw-bold text-white mb-3">Geology Field Station</h1>
          <p className="lead text-white-50">
            Explore rocks, minerals and Earth processes through deep time
          </p>
          <div className="mt-4">
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">🗿 5 Core Areas</Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">🔬 700 Specimens</Badge>
            <Badge bg="light" text="dark" className="px-3 py-2">🌍 4.6 Billion Years</Badge>
          </div>
        </motion.div>

        <Row className="mb-5">
          {[
            { icon: '🔬', title: 'Rock Analysis', desc: 'Identify & classify specimens', action: () => navigate('/test/geology') },
            { icon: '📋', title: 'Field Guide', desc: 'Geological terms & processes', action: () => navigate('/flashcards/geology') },
            { icon: '📊', title: 'Field Data', desc: 'Track geological studies', action: () => navigate('/dashboard') },
          ].map((item, index) => (
            <Col md={4} key={index} className="mb-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                  <Card.Body className="text-center p-4">
                    <div className="display-6 mb-3">{item.icon}</div>
                    <h5>{item.title}</h5>
                    <p className="text-muted small">{item.desc}</p>
                    <button className="btn" style={{ backgroundColor: '#8b4513', color: 'white' }} onClick={item.action}>
                      {index === 0 ? 'Start Analysis' : index === 1 ? 'View Guide' : 'View Data'}
                    </button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h2 className="text-white mb-4">🌍 Geological Studies</h2>
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
                      <p className="text-muted small mb-3">🗿 {topic.questions} specimens</p>
                      <div className="progress mb-3" style={{ height: '6px' }}>
                        <div className="progress-bar" style={{ width: '0%', backgroundColor: '#8b4513' }}></div>
                      </div>
                      <button 
                        className="btn btn-sm w-100"
                        style={{ backgroundColor: '#8b4513', color: 'white' }}
                        onClick={() => navigate(`/test/geology/${topic.id}`)}
                      >
                        Study Topic
                      </button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </div>
  );
};

export default GeologyPage;