import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Alert, Spinner } from 'react-bootstrap';
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
      className="login-immersive-container"
      style={{ 
        minHeight: '100vh', 
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      }}
    >
      {/* Advanced Particle System */}
      <div className="advanced-particle-system">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="floating-particle"
            style={{
              position: 'absolute',
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              borderRadius: '50%',
              background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.1, 0.8, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Interactive Floating Geometric Shapes */}
      <div className="geometric-shapes-container">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="geometric-shape"
            style={{
              position: 'absolute',
              width: Math.random() * 120 + 60 + 'px',
              height: Math.random() * 120 + 60 + 'px',
              background: `linear-gradient(45deg, 
                rgba(255, 255, 255, 0.1), 
                rgba(255, 255, 255, 0.05))`,
              borderRadius: i % 2 === 0 ? '50%' : '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={{
              scale: 1.5,
              rotate: 180,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Effect */}
      <motion.div
        className="mouse-follower"
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{
          type: "spring",
          stiffness: 20,
          damping: 10,
        }}
      />

      <Container className="py-5" style={{ position: 'relative', zIndex: 10 }}>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <motion.div
              initial={{ scale: 0.3, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 50,
                damping: 15,
                duration: 1.2
              }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div
                className="login-card-3d"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(25px)',
                  borderRadius: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: `
                    0 25px 50px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `,
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
                {/* Animated Background Gradient */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    borderRadius: '30px',
                  }}
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                      'linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))',
                      'linear-gradient(225deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1))',
                      'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
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
                      className="hero-title"
                      style={{ 
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        background: 'linear-gradient(45deg, #fff, #f0f9ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '0.5rem',
                      }}
                      animate={{
                        textShadow: [
                          '0 0 20px rgba(255, 255, 255, 0.3)',
                          '0 0 30px rgba(255, 255, 255, 0.5)',
                          '0 0 20px rgba(255, 255, 255, 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    >
                      Welcome Back
                    </motion.h2>
                    <motion.p
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '1.1rem',
                        marginBottom: 0,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      Continue your GCSE journey with MyExams.org
                    </motion.p>
                  </motion.div>
                  
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ x: -20, opacity: 0, scale: 0.8 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: 20, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                        style={{ marginBottom: '1.5rem' }}
                      >
                        <Alert 
                          variant="danger" 
                          style={{
                            background: 'rgba(220, 53, 69, 0.1)',
                            border: '1px solid rgba(220, 53, 69, 0.3)',
                            color: '#fff',
                            borderRadius: '15px',
                          }}
                        >
                          {error}
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <Form onSubmit={handleSubmit}>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      style={{ marginBottom: '1.5rem' }}
                    >
                      <Form.Group>
                        <motion.label
                          style={{ 
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '1rem',
                            fontWeight: '500',
                            marginBottom: '0.5rem',
                            display: 'block',
                          }}
                          animate={{ x: email ? 5 : 0 }}
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
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                              borderRadius: '15px',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              background: 'rgba(255, 255, 255, 0.1)',
                              backdropFilter: 'blur(10px)',
                              color: '#fff',
                              fontSize: '1.1rem',
                              padding: '15px 20px',
                              transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = 'rgba(102, 126, 234, 0.8)';
                              e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
                              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                              e.target.style.boxShadow = 'none';
                              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                            }}
                          />
                        </motion.div>
                      </Form.Group>
                    </motion.div>

                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      style={{ marginBottom: '2rem' }}
                    >
                      <Form.Group>
                        <motion.label
                          style={{ 
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '1rem',
                            fontWeight: '500',
                            marginBottom: '0.5rem',
                            display: 'block',
                          }}
                          animate={{ x: password ? 5 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          Password
                        </motion.label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                              borderRadius: '15px',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              background: 'rgba(255, 255, 255, 0.1)',
                              backdropFilter: 'blur(10px)',
                              color: '#fff',
                              fontSize: '1.1rem',
                              padding: '15px 20px',
                              transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = 'rgba(102, 126, 234, 0.8)';
                              e.target.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
                              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                              e.target.style.boxShadow = 'none';
                              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
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
                        className="w-100"
                        type="submit"
                        disabled={loading}
                        style={{ 
                          borderRadius: '15px', 
                          padding: '15px 30px',
                          background: loading 
                            ? 'rgba(108, 117, 125, 0.3)' 
                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none',
                          color: 'white',
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        }}
                        animate={{
                          boxShadow: loading 
                            ? '0 5px 15px rgba(0, 0, 0, 0.2)' 
                            : '0 10px 30px rgba(102, 126, 234, 0.4)',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Button shine effect */}
                        <motion.div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                          }}
                          animate={{
                            left: loading ? '-100%' : ['100%', '-100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />
                        
                        {loading ? (
                          <motion.div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Spinner size="sm" className="me-2" />
                            <span>Logging in...</span>
                          </motion.div>
                        ) : (
                          <motion.span
                            animate={{
                              textShadow: [
                                '0 0 0px rgba(255, 255, 255, 0)',
                                '0 0 10px rgba(255, 255, 255, 0.5)',
                                '0 0 0px rgba(255, 255, 255, 0)',
                              ],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1,
                            }}
                          >
                            Login to MyExams.org
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
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem' }}>
                      Don't have an account?{' '}
                      <Link 
                        to="/register" 
                        style={{ 
                          color: '#fff',
                          textDecoration: 'none',
                          fontWeight: '600',
                          borderBottom: '1px solid transparent',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderBottomColor = '#fff';
                          e.target.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderBottomColor = 'transparent';
                          e.target.style.textShadow = 'none';
                        }}
                      >
                        Register here
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