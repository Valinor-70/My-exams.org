import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import '../../styles/animations.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div 
      ref={containerRef}
      className="sci-fi-immersive-container"
    >
      {/* Circuit Board Background */}
      <div className="circuit-bg"></div>
      
      {/* Holographic Particles */}
      <div className="hologram-particles"></div>
      
      {/* Scanlines Effect */}
      <div className="scanlines"></div>

      {/* Sci-Fi Geometric Shapes */}
      <div className="sci-fi-shapes">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className={i % 3 === 0 ? 'hexagon-shape' : i % 3 === 1 ? 'triangle-shape' : 'diamond-shape'}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Energy Flow Particles */}
      <div className="energy-particles">
        {Array.from({ length: 80 }).map((_, i) => (
          <motion.div
            key={i}
            className="energy-particle"
            style={{
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 8 + 's',
            }}
            animate={{
              y: [window.innerHeight, -100],
              x: [0, Math.random() * 200 - 100],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Hologram */}
      <motion.div
        className="mouse-follower"
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, 
            rgba(0, 255, 255, 0.1) 0%, 
            rgba(128, 0, 255, 0.05) 50%, 
            transparent 100%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(1px)',
        }}
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{
          type: "spring",
          stiffness: 20,
          damping: 30,
        }}
      />

      <Container className="py-5" style={{ position: 'relative', zIndex: 10 }}>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <motion.div
              initial={{ scale: 0.3, opacity: 0, rotateX: -90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 60,
                damping: 20,
                duration: 1.5
              }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div
                className="holo-card-3d"
                style={{
                  padding: '3rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                animate={{
                  rotateX: isHovered ? 5 : 0,
                  rotateY: isHovered ? 5 : 0,
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* HUD Header */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    right: '15px',
                    height: '2px',
                    background: 'var(--primary-gradient)',
                    borderRadius: '1px',
                  }}
                  animate={{
                    scaleX: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <Card.Body style={{ position: 'relative', zIndex: 2, padding: 0 }}>
                  <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-center mb-5"
                  >
                    <motion.h2 
                      className="sci-fi-hero-title glitch-text"
                      data-text="ACCESS TERMINAL"
                      style={{ 
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        marginBottom: '0.5rem',
                        fontFamily: 'Orbitron, sans-serif',
                      }}
                    >
                      ACCESS TERMINAL
                    </motion.h2>
                    <motion.div
                      style={{
                        color: 'var(--neon-green)',
                        fontSize: '1rem',
                        fontFamily: 'Roboto Mono, monospace',
                        marginBottom: '0.5rem',
                      }}
                      animate={{
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      &gt; SYSTEM STATUS: ONLINE
                    </motion.div>
                    <motion.p
                      style={{ 
                        color: 'var(--neon-cyan)',
                        fontSize: '1.1rem',
                        marginBottom: 0,
                        fontFamily: 'Roboto Mono, monospace',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      Initialize MyExams.org Neural Interface
                    </motion.p>
                  </motion.div>
                  
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ x: -20, opacity: 0, scale: 0.8 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: 20, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                        style={{ marginBottom: '2rem' }}
                      >
                        <Alert 
                          variant="danger" 
                          className="terminal"
                          style={{
                            background: 'rgba(255, 0, 128, 0.1)',
                            border: '2px solid var(--neon-pink)',
                            color: 'var(--neon-pink)',
                            borderRadius: '0',
                            fontFamily: 'Roboto Mono, monospace',
                          }}
                        >
                          ERROR: {error}
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <Form onSubmit={handleSubmit}>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      style={{ marginBottom: '2rem' }}
                    >
                      <Form.Group>
                        <motion.label
                          className="sci-fi-label"
                          style={{ 
                            display: 'block',
                            marginBottom: '0.75rem',
                          }}
                          animate={{ x: email ? 10 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          Email Address
                        </motion.label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Form.Control
                            type="email"
                            placeholder="user@neural.interface"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="sci-fi-form-control"
                            style={{
                              padding: '15px 20px',
                              fontSize: '1.1rem',
                              transition: 'all 0.3s ease',
                            }}
                          />
                        </motion.div>
                      </Form.Group>
                    </motion.div>

                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      style={{ marginBottom: '2.5rem' }}
                    >
                      <Form.Group>
                        <motion.label
                          className="sci-fi-label"
                          style={{ 
                            display: 'block',
                            marginBottom: '0.75rem',
                          }}
                          animate={{ x: password ? 10 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          Security Key
                        </motion.label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Form.Control
                            type="password"
                            placeholder="••••••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="sci-fi-form-control"
                            style={{
                              padding: '15px 20px',
                              fontSize: '1.1rem',
                              transition: 'all 0.3s ease',
                            }}
                          />
                        </motion.div>
                      </Form.Group>
                    </motion.div>

                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.button
                        className="w-100 holo-btn"
                        type="submit"
                        disabled={loading}
                        style={{ 
                          padding: '15px 30px',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        animate={{
                          boxShadow: loading 
                            ? '0 5px 15px rgba(0, 0, 0, 0.2)' 
                            : '0 10px 30px var(--neon-cyan)',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {loading ? (
                          <motion.div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <div className="sci-fi-spinner me-3" style={{ width: '20px', height: '20px' }}></div>
                            <span>ACCESSING NEURAL NETWORK...</span>
                          </motion.div>
                        ) : (
                          <motion.span
                            className="neon-text"
                            style={{
                              fontFamily: 'Orbitron, sans-serif',
                              letterSpacing: '2px',
                            }}
                          >
                            INITIATE ACCESS
                          </motion.span>
                        )}
                      </motion.button>
                    </motion.div>
                  </Form>
                  
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-center mt-4"
                  >
                    <p style={{ 
                      color: 'var(--neon-cyan)', 
                      fontSize: '1rem',
                      fontFamily: 'Roboto Mono, monospace',
                    }}>
                      No neural interface detected?{' '}
                      <Link 
                        to="/register" 
                        style={{ 
                          color: 'var(--neon-purple)',
                          textDecoration: 'none',
                          fontWeight: '600',
                          borderBottom: '1px solid transparent',
                          transition: 'all 0.3s ease',
                          fontFamily: 'Orbitron, sans-serif',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          const target = e.target as HTMLAnchorElement;
                          target.style.borderBottomColor = 'var(--neon-purple)';
                          target.style.textShadow = '0 0 10px var(--neon-purple)';
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          const target = e.target as HTMLAnchorElement;
                          target.style.borderBottomColor = 'transparent';
                          target.style.textShadow = 'none';
                        }}
                      >
                        Initialize New User
                      </Link>
                    </p>
                  </motion.div>
                </Card.Body>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;