import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Hero3DScene from '../components/3d/Hero3DScene';
import '../styles/animations.css';

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
    { name: 'Mathematics', code: 'maths', icon: '🔢', color: 'success', emoji: '⚡' },
    { name: 'Biology', code: 'biology', icon: '🧬', color: 'info', emoji: '🔬' },
    { name: 'Chemistry', code: 'chemistry', icon: '⚗️', color: 'warning', emoji: '⚛️' },
    { name: 'Physics', code: 'physics', icon: '⚡', color: 'danger', emoji: '🌌' },
    { name: 'English Literature', code: 'english-lit', icon: '📚', color: 'primary', emoji: '📖' },
    { name: 'English Language', code: 'english-lang', icon: '✍️', color: 'secondary', emoji: '📝' },
    { name: 'Geography', code: 'geography', icon: '🌍', color: 'success', emoji: '🗺️' },
    { name: 'Geology', code: 'geology', icon: '🏔️', color: 'dark', emoji: '⛰️' },
    { name: 'Computer Science', code: 'computer-science', icon: '💻', color: 'info', emoji: '🤖' },
    { name: 'Religious Education', code: 'religious-education', icon: '✝️', color: 'warning', emoji: '🕊️' },
    { name: 'History', code: 'history', icon: '🏛️', color: 'danger', emoji: '⚔️' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ background: 'var(--dark-bg)', minHeight: '100vh' }}
    >
      {/* Sci-Fi Background Effects */}
      <div className="circuit-bg"></div>
      <div className="hologram-particles"></div>
      <div className="scanlines"></div>

      {/* Advanced Sci-Fi Geometric Shapes */}
      <div className="sci-fi-shapes">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={i % 5 === 0 ? 'hexagon-shape' : i % 5 === 1 ? 'triangle-shape' : i % 5 === 2 ? 'diamond-shape' : 'hexagon-shape'}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              filter: `hue-rotate(${Math.random() * 360}deg) brightness(${0.5 + Math.random() * 0.5})`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.4, 1],
              opacity: [0.05, 0.2, 0.05],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="morphing-bg text-white py-5" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1 
                  className="sci-fi-hero-title glitch-text"
                  data-text="MYEXAMS.ORG"
                  style={{ 
                    fontSize: '4rem',
                    fontWeight: '900',
                    marginBottom: '1rem',
                    fontFamily: 'Orbitron, sans-serif',
                  }}
                >
                  MYEXAMS.ORG
                </motion.h1>
                <motion.div
                  style={{
                    color: 'var(--neon-green)',
                    fontSize: '1.2rem',
                    fontFamily: 'Roboto Mono, monospace',
                    marginBottom: '1rem',
                  }}
                  animate={{
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  &gt; NEURAL GCSE ENHANCEMENT PROTOCOL ACTIVE
                </motion.div>
                <motion.p 
                  className="lead mb-4"
                  style={{
                    color: 'var(--neon-cyan)',
                    fontSize: '1.3rem',
                    fontFamily: 'Roboto Mono, monospace',
                    lineHeight: '1.6',
                  }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Interface with the ultimate GCSE neural network. Enhance cognitive patterns, 
                  access quantum lesson matrices, and accelerate learning algorithms.
                </motion.p>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {!user ? (
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <motion.button 
                        className="holo-btn"
                        onClick={() => navigate('/register')}
                        style={{
                          padding: '15px 30px',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="neon-text" style={{ color: 'var(--neon-green)' }}>
                          INITIALIZE NEURAL LINK
                        </span>
                      </motion.button>
                      <motion.button 
                        className="holo-btn"
                        onClick={() => navigate('/login')}
                        style={{
                          padding: '15px 30px',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          borderColor: 'var(--neon-purple)',
                          color: 'var(--neon-purple)',
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: 'var(--neon-purple)',
                          color: 'var(--dark-bg)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span style={{ fontFamily: 'Orbitron, sans-serif', letterSpacing: '1px' }}>
                          ACCESS TERMINAL
                        </span>
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button 
                      className="holo-btn"
                      onClick={() => navigate('/dashboard')}
                      style={{
                        padding: '15px 30px',
                        fontSize: '1.1rem',
                        fontWeight: '700',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="neon-text" style={{ color: 'var(--neon-cyan)' }}>
                        NEURAL DASHBOARD
                      </span>
                    </motion.button>
                  )}
                </motion.div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-center"
              >
                <Hero3DScene />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Row className="text-center mb-5">
            <Col>
              <motion.h2 
                className="sci-fi-hero-title"
                style={{ 
                  fontSize: '3rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  fontFamily: 'Orbitron, sans-serif',
                  color: 'var(--neon-cyan)',
                }}
              >
                NEURAL ENHANCEMENT PROTOCOLS
              </motion.h2>
              <motion.div
                style={{
                  color: 'var(--neon-green)',
                  fontSize: '1.1rem',
                  fontFamily: 'Roboto Mono, monospace',
                }}
                animate={{
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                &gt; Advanced cognitive enhancement algorithms for GCSE optimization
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Row className="g-4 mb-5">
            <Col md={4}>
              <motion.div variants={itemVariants}>
                <motion.div
                  className="holo-card-3d h-100 text-center"
                  style={{ padding: '2rem' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    style={{ fontSize: '4rem', color: 'var(--neon-cyan)' }} 
                    className="mb-3"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      filter: 'drop-shadow(0 0 20px var(--neon-cyan))'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    🧠
                  </motion.div>
                  <h3 style={{ 
                    fontFamily: 'Orbitron, sans-serif', 
                    color: 'var(--neon-cyan)',
                    marginBottom: '1rem',
                  }}>
                    NEURAL SYLLABUS MATRIX
                  </h3>
                  <p style={{ 
                    color: 'var(--neon-cyan)', 
                    fontFamily: 'Roboto Mono, monospace',
                    opacity: 0.8,
                  }}>
                    Complete cognitive mapping of all 11 core GCSE subjects with 
                    quantum-enhanced explanations and neural pathway optimization.
                  </p>
                </motion.div>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div variants={itemVariants}>
                <motion.div
                  className="holo-card-3d h-100 text-center"
                  style={{ padding: '2rem' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    style={{ fontSize: '4rem', color: 'var(--neon-purple)' }} 
                    className="mb-3"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: -360,
                      filter: 'drop-shadow(0 0 20px var(--neon-purple))'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    ⚡
                  </motion.div>
                  <h3 style={{ 
                    fontFamily: 'Orbitron, sans-serif', 
                    color: 'var(--neon-purple)',
                    marginBottom: '1rem',
                  }}>
                    QUANTUM TEST SIMULATION
                  </h3>
                  <p style={{ 
                    color: 'var(--neon-purple)', 
                    fontFamily: 'Roboto Mono, monospace',
                    opacity: 0.8,
                  }}>
                    Generate infinite practice simulations with instant neural feedback, 
                    scoring algorithms, and adaptive difficulty protocols.
                  </p>
                </motion.div>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div variants={itemVariants}>
                <motion.div
                  className="holo-card-3d h-100 text-center"
                  style={{ padding: '2rem' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    style={{ fontSize: '4rem', color: 'var(--neon-green)' }} 
                    className="mb-3"
                    whileHover={{ 
                      scale: 1.2, 
                      y: -10,
                      filter: 'drop-shadow(0 0 20px var(--neon-green))'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    📊
                  </motion.div>
                  <h3 style={{ 
                    fontFamily: 'Orbitron, sans-serif', 
                    color: 'var(--neon-green)',
                    marginBottom: '1rem',
                  }}>
                    COGNITIVE ANALYTICS
                  </h3>
                  <p style={{ 
                    color: 'var(--neon-green)', 
                    fontFamily: 'Roboto Mono, monospace',
                    opacity: 0.8,
                  }}>
                    Advanced neural pattern monitoring, cognitive weakness detection, 
                    and progress optimization through machine learning algorithms.
                  </p>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>

      {/* Subjects Section */}
      <div style={{ background: 'var(--dark-surface)', padding: '5rem 0' }}>
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
                  className="sci-fi-hero-title"
                  style={{ 
                    fontSize: '3rem',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    fontFamily: 'Orbitron, sans-serif',
                    color: 'var(--neon-cyan)',
                  }}
                >
                  SUBJECT NEURAL NETWORKS
                </motion.h2>
                <motion.div
                  style={{
                    color: 'var(--neon-green)',
                    fontSize: '1.1rem',
                    fontFamily: 'Roboto Mono, monospace',
                  }}
                  animate={{
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  &gt; Neural interface modules for all core GCSE knowledge domains
                </motion.div>
              </Col>
            </Row>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Row className="g-3">
              {subjects.map((subject, index) => (
                <Col key={subject.code} lg={3} md={4} sm={6}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`stagger-item`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <motion.div
                      className="sci-fi-subject-card h-100" 
                      style={{ 
                        cursor: (user || subject.code === 'geology') ? 'pointer' : 'default',
                        padding: '1.5rem',
                        background: 'rgba(26, 26, 46, 0.8)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onClick={() => (user || subject.code === 'geology') && navigate(`/subjects/${subject.code}`)}
                      whileHover={{
                        backgroundColor: 'rgba(26, 26, 46, 0.95)',
                        boxShadow: `0 10px 30px var(--neon-cyan)`,
                      }}
                    >
                      {/* Status indicator */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: (user || subject.code === 'geology') ? 'var(--neon-green)' : 'var(--neon-pink)',
                          boxShadow: `0 0 10px currentColor`,
                        }}
                        animate={{
                          opacity: [1, 0.3, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />

                      <div className="text-center">
                        <motion.div 
                          style={{ 
                            fontSize: '3rem', 
                            marginBottom: '1rem',
                            filter: 'drop-shadow(0 0 10px currentColor)',
                          }} 
                          whileHover={{ 
                            scale: 1.3, 
                            rotate: [0, -10, 10, -10, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          <span style={{ color: 'var(--neon-cyan)' }}>{subject.emoji}</span>
                        </motion.div>
                        <h5 style={{ 
                          fontFamily: 'Orbitron, sans-serif',
                          color: 'var(--neon-cyan)',
                          marginBottom: '1rem',
                          fontSize: '1.1rem',
                        }}>
                          {subject.name.toUpperCase()}
                        </h5>
                        {user || subject.code === 'geology' ? (
                          <motion.button 
                            className="holo-btn"
                            style={{
                              padding: '8px 16px',
                              fontSize: '0.9rem',
                              borderColor: 'var(--neon-green)',
                              color: 'var(--neon-green)',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/subjects/${subject.code}`);
                            }}
                            whileHover={{ 
                              backgroundColor: 'var(--neon-green)',
                              color: 'var(--dark-bg)'
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            NEURAL LINK ACTIVE
                          </motion.button>
                        ) : (
                          <div style={{
                            padding: '8px 16px',
                            background: 'rgba(255, 0, 128, 0.1)',
                            border: '1px solid var(--neon-pink)',
                            color: 'var(--neon-pink)',
                            fontFamily: 'Roboto Mono, monospace',
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                          }}>
                            NEURAL AUTH REQUIRED
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </div>

      {/* CTA Section */}
      {!user && (
        <div style={{ background: 'var(--dark-panel)', padding: '5rem 0' }}>
          <Container className="text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="sci-fi-hero-title glitch-text"
                data-text="INITIATE NEURAL ENHANCEMENT"
                style={{ 
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  fontFamily: 'Orbitron, sans-serif',
                  color: 'var(--neon-cyan)',
                }}
              >
                INITIATE NEURAL ENHANCEMENT
              </motion.h2>
              <motion.div
                style={{
                  color: 'var(--neon-green)',
                  fontSize: '1.2rem',
                  fontFamily: 'Roboto Mono, monospace',
                  marginBottom: '2rem',
                }}
                animate={{
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                &gt; Join thousands of enhanced cognitive patterns in the GCSE neural network
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button 
                  className="holo-btn"
                  onClick={() => navigate('/register')}
                  style={{
                    padding: '20px 40px',
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    position: 'relative',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px var(--neon-cyan)',
                      '0 0 40px var(--neon-cyan)',
                      '0 0 20px var(--neon-cyan)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <span className="neon-text" style={{ color: 'var(--neon-cyan)' }}>
                    ACTIVATE NEURAL INTERFACE
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </Container>
        </div>
      )}
    </motion.div>
  );
};

export default Home;