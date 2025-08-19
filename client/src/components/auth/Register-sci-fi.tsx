import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import '../../styles/animations.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    school: '',
    yearGroup: 'Year 11'
  });
  
  const [validationError, setValidationError] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { register, loading, error } = useAuth();
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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setValidationError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return;
    }

    const { confirmPassword, ...userData } = formData;
    const success = await register(userData);
    
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

      {/* Advanced Sci-Fi Geometric Shapes */}
      <div className="sci-fi-shapes">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={i % 4 === 0 ? 'hexagon-shape' : i % 4 === 1 ? 'triangle-shape' : i % 4 === 2 ? 'diamond-shape' : 'hexagon-shape'}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              filter: `hue-rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.4, 0.1],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: Math.random() * 25 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Enhanced Energy Flow Particles */}
      <div className="energy-particles">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="energy-particle"
            style={{
              left: Math.random() * 100 + '%',
              background: i % 4 === 0 ? 'var(--neon-cyan)' : 
                         i % 4 === 1 ? 'var(--neon-purple)' : 
                         i % 4 === 2 ? 'var(--neon-green)' : 'var(--neon-pink)',
              boxShadow: `0 0 10px currentColor, 0 0 20px currentColor`,
              animationDelay: Math.random() * 10 + 's',
            }}
            animate={{
              y: [window.innerHeight, -100],
              x: [0, Math.random() * 300 - 150],
              scale: [0, 1.2, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          />
        ))}
      </div>

      {/* Holographic Mouse Follower */}
      <motion.div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: `conic-gradient(from 0deg, 
            rgba(0, 255, 255, 0.1), 
            rgba(128, 0, 255, 0.1), 
            rgba(255, 0, 128, 0.1), 
            rgba(0, 255, 65, 0.1), 
            rgba(0, 255, 255, 0.1))`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(2px)',
        }}
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
          rotate: [0, 360],
        }}
        transition={{
          x: { type: "spring", stiffness: 15, damping: 40 },
          y: { type: "spring", stiffness: 15, damping: 40 },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      />

      <Container className="py-5" style={{ position: 'relative', zIndex: 10 }}>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Col xs={12} sm={11} md={9} lg={7} xl={6}>
            <motion.div
              initial={{ scale: 0.2, opacity: 0, rotateX: -90, z: -1000 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0, z: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 50,
                damping: 20,
                duration: 2
              }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div
                className="holo-card-3d"
                style={{
                  padding: '3.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                animate={{
                  rotateX: isHovered ? 3 : 0,
                  rotateY: isHovered ? 3 : 0,
                  scale: isHovered ? 1.01 : 1,
                }}
                transition={{ duration: 0.4 }}
              >
                {/* HUD Status Indicators */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    right: '15px',
                    height: '2px',
                    background: 'var(--success-gradient)',
                    borderRadius: '1px',
                  }}
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <Card.Body style={{ position: 'relative', zIndex: 2, padding: 0 }}>
                  <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.9 }}
                    className="text-center mb-5"
                  >
                    <motion.h2 
                      className="sci-fi-hero-title glitch-text"
                      data-text="USER REGISTRATION"
                      style={{ 
                        fontSize: '2.8rem',
                        fontWeight: '900',
                        marginBottom: '0.5rem',
                        fontFamily: 'Orbitron, sans-serif',
                      }}
                    >
                      USER REGISTRATION
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
                        duration: 2.5,
                        repeat: Infinity,
                      }}
                    >
                      &gt; INITIALIZING NEURAL INTERFACE...
                    </motion.div>
                    <motion.p
                      style={{ 
                        color: 'var(--neon-cyan)',
                        fontSize: '1.2rem',
                        marginBottom: 0,
                        fontFamily: 'Roboto Mono, monospace',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.9 }}
                    >
                      Establish Connection to GCSE Neural Network
                    </motion.p>
                  </motion.div>
                  
                  <AnimatePresence>
                    {(error || validationError) && (
                      <motion.div
                        initial={{ x: -30, opacity: 0, scale: 0.8 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: 30, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
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
                          NEURAL_ERROR: {error || validationError}
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <motion.div
                          initial={{ x: -60, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.9 }}
                          style={{ marginBottom: '2rem' }}
                        >
                          <Form.Group>
                            <motion.label
                              className="sci-fi-label"
                              style={{ 
                                display: 'block',
                                marginBottom: '0.75rem',
                              }}
                              animate={{ x: formData.firstName ? 10 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              First Name
                            </motion.label>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Form.Control
                                type="text"
                                name="firstName"
                                placeholder="neural.user.001"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="sci-fi-form-control"
                                style={{
                                  padding: '16px 22px',
                                  fontSize: '1.1rem',
                                  transition: 'all 0.3s ease',
                                }}
                              />
                            </motion.div>
                          </Form.Group>
                        </motion.div>
                      </Col>
                      <Col md={6}>
                        <motion.div
                          initial={{ x: 60, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.9 }}
                          style={{ marginBottom: '2rem' }}
                        >
                          <Form.Group>
                            <motion.label
                              className="sci-fi-label"
                              style={{ 
                                display: 'block',
                                marginBottom: '0.75rem',
                              }}
                              animate={{ x: formData.lastName ? 10 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              Last Name
                            </motion.label>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Form.Control
                                type="text"
                                name="lastName"
                                placeholder="interface.handler"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="sci-fi-form-control"
                                style={{
                                  padding: '16px 22px',
                                  fontSize: '1.1rem',
                                  transition: 'all 0.3s ease',
                                }}
                              />
                            </motion.div>
                          </Form.Group>
                        </motion.div>
                      </Col>
                    </Row>

                    <motion.div
                      initial={{ x: -60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.9 }}
                      style={{ marginBottom: '2rem' }}
                    >
                      <Form.Group>
                        <motion.label
                          className="sci-fi-label"
                          style={{ 
                            display: 'block',
                            marginBottom: '0.75rem',
                          }}
                          animate={{ x: formData.username ? 10 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          Neural ID
                        </motion.label>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Form.Control
                            type="text"
                            name="username"
                            placeholder="neural_id_unique"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="sci-fi-form-control"
                            style={{
                              padding: '16px 22px',
                              fontSize: '1.1rem',
                              transition: 'all 0.3s ease',
                            }}
                          />
                        </motion.div>
                      </Form.Group>
                    </motion.div>

                    <motion.div
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.9 }}
                      style={{ marginBottom: '2rem' }}
                    >
                      <Form.Group>
                        <motion.label
                          className="sci-fi-label"
                          style={{ 
                            display: 'block',
                            marginBottom: '0.75rem',
                          }}
                          animate={{ x: formData.email ? 10 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          Communication Channel
                        </motion.label>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="user@neural.network"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="sci-fi-form-control"
                            style={{
                              padding: '16px 22px',
                              fontSize: '1.1rem',
                              transition: 'all 0.3s ease',
                            }}
                          />
                        </motion.div>
                      </Form.Group>
                    </motion.div>

                    <Row>
                      <Col md={6}>
                        <motion.div
                          initial={{ x: -60, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.8, duration: 0.9 }}
                          style={{ marginBottom: '2rem' }}
                        >
                          <Form.Group>
                            <motion.label
                              className="sci-fi-label"
                              style={{ 
                                display: 'block',
                                marginBottom: '0.75rem',
                              }}
                              animate={{ x: formData.password ? 10 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              Security Protocol
                            </motion.label>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Form.Control
                                type="password"
                                name="password"
                                placeholder="••••••••••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="sci-fi-form-control"
                                style={{
                                  padding: '16px 22px',
                                  fontSize: '1.1rem',
                                  transition: 'all 0.3s ease',
                                }}
                              />
                            </motion.div>
                          </Form.Group>
                        </motion.div>
                      </Col>
                      <Col md={6}>
                        <motion.div
                          initial={{ x: 60, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.9, duration: 0.9 }}
                          style={{ marginBottom: '2rem' }}
                        >
                          <Form.Group>
                            <motion.label
                              className="sci-fi-label"
                              style={{ 
                                display: 'block',
                                marginBottom: '0.75rem',
                              }}
                              animate={{ x: formData.confirmPassword ? 10 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              Verify Protocol
                            </motion.label>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="••••••••••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="sci-fi-form-control"
                                style={{
                                  padding: '16px 22px',
                                  fontSize: '1.1rem',
                                  transition: 'all 0.3s ease',
                                }}
                              />
                            </motion.div>
                          </Form.Group>
                        </motion.div>
                      </Col>
                    </Row>

                    <motion.div
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.0, duration: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ marginBottom: '2rem' }}
                    >
                      <motion.button
                        className="w-100 holo-btn"
                        type="submit"
                        disabled={loading}
                        style={{ 
                          padding: '18px 35px',
                          fontSize: '1.2rem',
                          fontWeight: '700',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        animate={{
                          boxShadow: loading 
                            ? '0 8px 20px rgba(0, 0, 0, 0.2)' 
                            : '0 15px 35px var(--neon-green)',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {loading ? (
                          <motion.div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <div className="sci-fi-spinner me-3" style={{ width: '20px', height: '20px' }}></div>
                            <span>ESTABLISHING NEURAL LINK...</span>
                          </motion.div>
                        ) : (
                          <motion.span
                            className="neon-text"
                            style={{
                              fontFamily: 'Orbitron, sans-serif',
                              letterSpacing: '2px',
                              color: 'var(--neon-green)',
                            }}
                          >
                            INITIALIZE INTERFACE
                          </motion.span>
                        )}
                      </motion.button>
                    </motion.div>
                  </Form>
                  
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.9 }}
                    className="text-center"
                  >
                    <p style={{ 
                      color: 'var(--neon-cyan)', 
                      fontSize: '1.05rem',
                      fontFamily: 'Roboto Mono, monospace',
                    }}>
                      Neural interface already active?{' '}
                      <Link 
                        to="/login" 
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
                          target.style.textShadow = '0 0 15px var(--neon-purple)';
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          const target = e.target as HTMLAnchorElement;
                          target.style.borderBottomColor = 'transparent';
                          target.style.textShadow = 'none';
                        }}
                      >
                        Access Terminal
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

export default Register;