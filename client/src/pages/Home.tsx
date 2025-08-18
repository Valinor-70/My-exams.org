import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Hero3DScene from '../components/3d/Hero3DScene';
import '../styles/study-theme.css';

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Initialize AOS (Animate On Scroll) effects
  useEffect(() => {
    import('aos').then(AOS => {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
      });
    });
  }, []);

  const subjects = [
    { name: 'Mathematics', code: 'mathematics', icon: '📊', description: 'Master numbers, algebra, geometry and more' },
    { name: 'Biology', code: 'biology', icon: '🧬', description: 'Explore life, cells, genetics and ecosystems' },
    { name: 'Chemistry', code: 'chemistry', icon: '⚗️', description: 'Understand atoms, molecules and reactions' },
    { name: 'Physics', code: 'physics', icon: '⚡', description: 'Discover forces, energy and the universe' },
    { name: 'English Literature', code: 'english-lit', icon: '📚', description: 'Analyze texts, poetry and drama' },
    { name: 'English Language', code: 'english-lang', icon: '✍️', description: 'Master writing, speaking and grammar' },
    { name: 'Geography', code: 'geography', icon: '🌍', description: 'Study places, environments and maps' },
    { name: 'Geology', code: 'geology', icon: '🗿', description: 'Explore rocks, minerals and Earth processes' },
    { name: 'Computer Science', code: 'computer-science', icon: '💻', description: 'Learn programming and computational thinking' },
    { name: 'Religious Education', code: 'religious-education', icon: '🕊️', description: 'Study beliefs, ethics and worldviews' },
    { name: 'History', code: 'history', icon: '🏛️', description: 'Explore past events and civilizations' },
  ];

  return (
    <div className="grand-entrance">
      {/* Hero Section - Smart Door Landing */}
      <div 
        style={{ 
          background: 'var(--study-warm)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1 
                  className="study-hero-title"
                  style={{ 
                    fontSize: '4rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    fontFamily: 'Georgia, serif',
                    color: 'var(--rich-mahogany)',
                  }}
                >
                  myexams.org
                </motion.h1>
                <motion.div
                  style={{
                    color: 'var(--deep-forest)',
                    fontSize: '1.4rem',
                    fontFamily: 'Georgia, serif',
                    marginBottom: '1.5rem',
                    fontStyle: 'italic',
                  }}
                  animate={{
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  Step into your Study Studio
                </motion.div>
                <motion.p 
                  className="lead"
                  style={{
                    color: 'var(--soft-brown)',
                    fontSize: '1.1rem',
                    fontFamily: 'Georgia, serif',
                    lineHeight: '1.6',
                    maxWidth: '500px',
                    marginBottom: '2rem'
                  }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Welcome to myexams.org — your Study Studio. Step up to the door when you're ready. 
                  Choose any door to enter a study room and begin your GCSE journey.
                </motion.p>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {!user ? (
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button 
                          className="btn btn-lg btn-study"
                          onClick={() => navigate('/login')}
                          style={{
                            padding: '15px 30px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                          }}
                        >
                          Enter
                        </button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button 
                          className="btn btn-lg btn-outline-secondary btn-study"
                          onClick={() => navigate('/register')}
                          style={{
                            padding: '15px 30px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            borderColor: 'var(--soft-brown)',
                            color: 'var(--soft-brown)',
                          }}
                        >
                          Create account — housing is free
                        </button>
                      </motion.div>
                    </div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <button 
                        className="btn btn-lg btn-study"
                        onClick={() => navigate('/dashboard')}
                        style={{
                          padding: '15px 30px',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                        }}
                      >
                        Enter Your Study Studio
                      </button>
                    </motion.div>
                  )}
                </motion.div>
                <motion.p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--soft-brown)',
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    marginTop: '1rem',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Prefer a quick visit? Try Demo Mode.
                </motion.p>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Hero3DScene />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Study Studio Features Section */}
      <div style={{ background: 'var(--paper-white)', padding: '5rem 0' }}>
        <Container>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Row className="text-center mb-5">
              <Col>
                <motion.h2 
                  className="study-hero-title"
                  style={{ 
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    fontFamily: 'Georgia, serif',
                    color: 'var(--rich-mahogany)',
                  }}
                >
                  Your Personal Study Studio
                </motion.h2>
                <motion.p 
                  style={{ 
                    fontSize: '1.1rem', 
                    color: 'var(--soft-brown)', 
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                  }}
                >
                  A complete study environment designed for GCSE success
                </motion.p>
              </Col>
            </Row>
            <Row>
              <Col md={4} className="mb-4">
                <motion.div
                  className="study-room-card text-center p-4 h-100"
                  whileHover={{ y: -5 }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
                  <h4 style={{ color: 'var(--rich-mahogany)', fontFamily: 'Georgia, serif' }}>
                    Complete Study Rooms
                  </h4>
                  <p style={{ color: 'var(--soft-brown)', fontFamily: 'Georgia, serif' }}>
                    Fully equipped study rooms for all 11 core GCSE subjects with structured 
                    topic pages, clear explanations, and practice materials.
                  </p>
                </motion.div>
              </Col>
              <Col md={4} className="mb-4">
                <motion.div
                  className="study-room-card text-center p-4 h-100"
                  whileHover={{ y: -5 }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
                  <h4 style={{ color: 'var(--rich-mahogany)', fontFamily: 'Georgia, serif' }}>
                    Personalized Testing
                  </h4>
                  <p style={{ color: 'var(--soft-brown)', fontFamily: 'Georgia, serif' }}>
                    Generate infinite practice tests with instant feedback, scoring, 
                    and detailed explanations to track your progress.
                  </p>
                </motion.div>
              </Col>
              <Col md={4} className="mb-4">
                <motion.div
                  className="study-room-card text-center p-4 h-100"
                  whileHover={{ y: -5 }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                  <h4 style={{ color: 'var(--rich-mahogany)', fontFamily: 'Georgia, serif' }}>
                    Progress Tracking
                  </h4>
                  <p style={{ color: 'var(--soft-brown)', fontFamily: 'Georgia, serif' }}>
                    Monitor your learning journey with detailed analytics, progress 
                    visualization, and personalized study recommendations.
                  </p>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </div>

      {/* Grand Entrance Hall - Subject Doors */}
      <div style={{ background: 'var(--warm-beige)', padding: '5rem 0' }}>
        <Container>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Row className="text-center mb-5">
              <Col>
                <motion.h2 
                  className="study-hero-title"
                  style={{ 
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    fontFamily: 'Georgia, serif',
                    color: 'var(--rich-mahogany)',
                  }}
                >
                  Grand Entrance Hall
                </motion.h2>
                <motion.p 
                  style={{ 
                    fontSize: '1.1rem', 
                    color: 'var(--soft-brown)', 
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                  }}
                >
                  Choose a door to enter a Study Room
                </motion.p>
              </Col>
            </Row>
            <Row>
              {subjects.map((subject, index) => (
                <Col lg={4} md={6} className="mb-4" key={subject.code}>
                  <motion.div
                    className="stagger-item"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="study-door h-100" 
                      style={{ 
                        cursor: 'pointer',
                        padding: '2rem 1.5rem',
                        minHeight: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                      onClick={() => navigate(`/subjects/${subject.code}`)}
                    >
                      {/* Room Status */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: '15px',
                          right: '15px',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: 'var(--focus-orange)',
                          boxShadow: '0 0 10px var(--focus-orange)',
                        }}
                        animate={{
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />

                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{subject.icon}</div>
                      
                      <h5 
                        style={{ 
                          color: 'var(--paper-white)', 
                          fontFamily: 'Georgia, serif',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                        }}
                      >
                        {subject.name.toUpperCase()}
                      </h5>
                      
                      <p 
                        style={{ 
                          color: 'rgba(254, 252, 247, 0.9)', 
                          fontFamily: 'Georgia, serif',
                          fontSize: '0.9rem',
                          marginBottom: '1rem',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                        }}
                      >
                        {subject.description}
                      </p>

                      <motion.div
                        style={{
                          background: 'var(--focus-orange)',
                          color: 'var(--paper-white)',
                          padding: '8px 16px',
                          borderRadius: '5px',
                          fontSize: '0.8rem',
                          fontFamily: 'Georgia, serif',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        ROOM READY
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </div>

      {/* Call to Action - Estate Agent Section */}
      <div style={{ background: 'var(--study-primary)', padding: '5rem 0', color: 'var(--paper-white)' }}>
        <Container>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 
              style={{ 
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                fontFamily: 'Georgia, serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Claim Your Study Room
            </h2>
            <p 
              style={{ 
                fontSize: '1.2rem', 
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                marginBottom: '2rem',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              Housing is free. Personalize and sync across devices.
            </p>
            {!user && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  className="btn btn-lg btn-study"
                  onClick={() => navigate('/register')}
                  style={{
                    background: 'var(--paper-white)',
                    border: '2px solid var(--paper-white)',
                    color: 'var(--rich-mahogany)',
                    fontFamily: 'Georgia, serif',
                    fontWeight: '600',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                  }}
                >
                  Claim my room (free)
                </button>
              </motion.div>
            )}
            <p 
              style={{ 
                fontSize: '0.9rem', 
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                marginTop: '1rem',
                opacity: 0.8
              }}
            >
              We'll never rent your data — privacy first.
            </p>
          </motion.div>
        </Container>
      </div>
    </div>
  );
};

export default Home;