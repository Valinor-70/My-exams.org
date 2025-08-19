import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EnglishLanguagePage: React.FC = () => {
  const navigate = useNavigate();
  
  const topics = [
    { id: 'reading', name: 'Reading & Comprehension', icon: '📖', questions: 145 },
    { id: 'writing', name: 'Creative & Transactional Writing', icon: '✍️', questions: 167 },
    { id: 'speaking', name: 'Speaking & Listening', icon: '🗣️', questions: 123 },
    { id: 'language-analysis', name: 'Language Analysis', icon: '🔍', questions: 134 },
  ];

  return (
    <div style={{ background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)', minHeight: '100vh' }}>
      <Container className="py-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="display-1 mb-3">✍️</div>
          <h1 className="display-4 fw-bold text-white mb-3">Language Workshop</h1>
          <p className="lead text-white-50">
            Master writing, speaking and language analysis skills
          </p>
          <div className="mt-4">
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">✍️ 4 Core Skills</Badge>
            <Badge bg="light" text="dark" className="me-2 px-3 py-2">📝 569 Exercises</Badge>
            <Badge bg="light" text="dark" className="px-3 py-2">🗣️ Communication Focus</Badge>
          </div>
        </motion.div>

        <Row className="mb-5">
          {[
            { icon: '📝', title: 'Writing Tasks', desc: 'Creative & non-fiction writing', action: () => navigate('/test/english-lang') },
            { icon: '📚', title: 'Language Guide', desc: 'Grammar & language techniques', action: () => navigate('/flashcards/english-lang') },
            { icon: '📊', title: 'Writing Progress', desc: 'Track language development', action: () => navigate('/dashboard') },
          ].map((item, index) => (
            <Col md={4} key={index} className="mb-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="h-100 border-0 shadow" style={{ background: 'rgba(255,255,255,0.95)' }}>
                  <Card.Body className="text-center p-4">
                    <div className="display-6 mb-3">{item.icon}</div>
                    <h5>{item.title}</h5>
                    <p className="text-muted small">{item.desc}</p>
                    <button className="btn" style={{ backgroundColor: '#f39c12', color: 'white' }} onClick={item.action}>
                      {index === 0 ? 'Start Writing' : index === 1 ? 'View Guide' : 'View Progress'}
                    </button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h2 className="text-white mb-4">✍️ Language Skills</h2>
          <Row>
            {topics.map((topic, index) => (
              <Col lg={6} xl={3} key={topic.id} className="mb-4">
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
                      <p className="text-muted small mb-3">📝 {topic.questions} practice tasks</p>
                      <div className="progress mb-3" style={{ height: '6px' }}>
                        <div className="progress-bar" style={{ width: '0%', backgroundColor: '#f39c12' }}></div>
                      </div>
                      <button 
                        className="btn btn-sm w-100"
                        style={{ backgroundColor: '#f39c12', color: 'white' }}
                        onClick={() => navigate(`/test/english-lang/${topic.id}`)}
                      >
                        Practice Skill
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

export default EnglishLanguagePage;