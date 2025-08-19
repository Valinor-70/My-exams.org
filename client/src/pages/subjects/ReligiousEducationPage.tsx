import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ReligiousEducationPage: React.FC = () => {
  const navigate = useNavigate();
  
  const topics = [
    { id: 'christianity', name: 'Christianity', icon: '✝️', questions: 167 },
    { id: 'islam', name: 'Islam', icon: '☪️', questions: 154 },
    { id: 'philosophy', name: 'Philosophy of Religion', icon: '💭', questions: 142 },
    { id: 'ethics', name: 'Ethics & Morality', icon: '⚖️', questions: 156 },
    { id: 'world-religions', name: 'World Religions', icon: '🕊️', questions: 134 },
  ];

  return (
    <div style={{ background: 'linear-gradient(135deg, #6c5ce7 0%, #74b9ff 100%)', minHeight: '100vh' }}>
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="display-1 mb-3">🕊️</div>
          <h1 className="display-4 fw-bold text-white mb-3">Philosophy & Ethics Study</h1>
          <p className="lead text-white-50">
            Explore beliefs, ethics, and worldviews with critical thinking
          </p>
          <div className="mt-4">
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">🕊️ 5 Core Areas</Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">💭 753 Questions</Badge>
            <Badge bg="light" text="dark" className="px-3 py-2">⚖️ Ethics & Philosophy</Badge>
          </div>
        </motion.div>

        <Row className="mb-5">
          {[
            { icon: '💭', title: 'Philosophical Analysis', desc: 'Critical thinking & evaluation', action: () => navigate('/test/religious-education') },
            { icon: '📚', title: 'Study Guide', desc: 'Beliefs & ethical concepts', action: () => navigate('/flashcards/religious-education') },
            { icon: '📊', title: 'Reflection Progress', desc: 'Track philosophical studies', action: () => navigate('/dashboard') },
          ].map((item, index) => (
            <Col md={4} key={index} className="mb-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                  <Card.Body className="text-center p-4">
                    <div className="display-6 mb-3">{item.icon}</div>
                    <h5>{item.title}</h5>
                    <p className="text-muted small">{item.desc}</p>
                    <button className="btn" style={{ backgroundColor: '#6c5ce7', color: 'white' }} onClick={item.action}>
                      {index === 0 ? 'Start Analysis' : index === 1 ? 'View Guide' : 'View Progress'}
                    </button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h2 className="text-white mb-4">🕊️ Areas of Study</h2>
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
                      <p className="text-muted small mb-3">💭 {topic.questions} discussion points</p>
                      <div className="progress mb-3" style={{ height: '6px' }}>
                        <div className="progress-bar" style={{ width: '0%', backgroundColor: '#6c5ce7' }}></div>
                      </div>
                      <button 
                        className="btn btn-sm w-100"
                        style={{ backgroundColor: '#6c5ce7', color: 'white' }}
                        onClick={() => navigate(`/test/religious-education/${topic.id}`)}
                      >
                        Explore Topic
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

export default ReligiousEducationPage;