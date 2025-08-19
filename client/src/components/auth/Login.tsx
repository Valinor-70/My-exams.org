import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import '../../styles/study-theme.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUnlocking(true);
    
    const success = await login(email, password);
    if (success) {
      // Door unlocking animation
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } else {
      setAttemptCount(prev => prev + 1);
      setIsUnlocking(false);
    }
  };

  const handleBiometric = () => {
    // Placeholder for biometric authentication
    alert('Biometric authentication not available in demo mode. Please use email and password.');
  };

  const handleGuestAccess = () => {
    // Allow guest access to dashboard/subject selection
    navigate('/dashboard');
  };

  return (
    <div className="grand-entrance" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-4"
            >
              {/* Smart Door Visual */}
              <motion.div
                className="study-door mx-auto"
                style={{
                  width: '400px',
                  height: '500px',
                  position: 'relative',
                  margin: '0 auto 2rem',
                }}
                animate={isUnlocking ? { rotateY: [-5, 0] } : {}}
                transition={{ duration: 1.5 }}
              >
                {/* Door Lock Panel */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'var(--paper-white)',
                    padding: '2rem',
                    borderRadius: '10px',
                    border: '2px solid var(--study-gold)',
                    boxShadow: 'var(--study-shadow-medium)',
                    width: '300px',
                  }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 
                    style={{ 
                      color: 'var(--rich-mahogany)', 
                      fontFamily: 'Georgia, serif',
                      marginBottom: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    Smart Lock
                  </h3>
                  <p 
                    style={{ 
                      color: 'var(--soft-brown)', 
                      fontFamily: 'Georgia, serif',
                      fontSize: '0.9rem',
                      textAlign: 'center',
                      marginBottom: '1.5rem'
                    }}
                  >
                    Secure your session
                  </p>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Alert 
                        variant="danger" 
                        style={{ 
                          background: 'rgba(230, 126, 34, 0.1)',
                          border: '1px solid var(--focus-orange)',
                          color: 'var(--focus-orange)',
                          fontSize: '0.9rem'
                        }}
                      >
                        {attemptCount >= 3 ? 'Too many attempts. Try Reset via email.' : 'Incorrect credentials — try again.'}
                      </Alert>
                    </motion.div>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: 'var(--rich-mahogany)', fontFamily: 'Georgia, serif' }}>
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="study-paper"
                        style={{
                          background: 'var(--paper-white)',
                          border: '1px solid var(--soft-brown)',
                          borderRadius: '5px',
                          fontFamily: 'Georgia, serif',
                          color: 'var(--ink-black)'
                        }}
                        placeholder="Enter your email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: 'var(--rich-mahogany)', fontFamily: 'Georgia, serif' }}>
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="study-paper"
                        style={{
                          background: 'var(--paper-white)',
                          border: '1px solid var(--soft-brown)',
                          borderRadius: '5px',
                          fontFamily: 'Georgia, serif',
                          color: 'var(--ink-black)'
                        }}
                        placeholder="Enter your password"
                      />
                    </Form.Group>

                    <div className="d-grid gap-2 mb-3">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <button
                          type="submit"
                          className="btn btn-study"
                          disabled={loading || isUnlocking}
                          style={{
                            background: 'var(--study-primary)',
                            border: '2px solid var(--rich-mahogany)',
                            fontFamily: 'Georgia, serif',
                            fontWeight: '600',
                          }}
                        >
                          {isUnlocking ? 'Unlocking Door...' : loading ? 'Authenticating...' : 'Enter Studio'}
                        </button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={handleBiometric}
                          style={{
                            borderColor: 'var(--gentle-blue)',
                            color: 'var(--gentle-blue)',
                            fontFamily: 'Georgia, serif',
                          }}
                        >
                          🔒 Use Biometrics
                        </button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={handleGuestAccess}
                          style={{
                            borderColor: 'var(--cozy-amber)',
                            color: 'var(--cozy-amber)',
                            fontFamily: 'Georgia, serif',
                          }}
                        >
                          👤 Continue as Guest
                        </button>
                      </motion.div>
                    </div>
                  </Form>

                  <div className="text-center">
                    <p style={{ color: 'var(--soft-brown)', fontSize: '0.9rem', fontFamily: 'Georgia, serif' }}>
                      Don't have an account?{' '}
                      <Link 
                        to="/register" 
                        style={{ 
                          color: 'var(--study-gold)', 
                          textDecoration: 'none',
                          fontWeight: '600'
                        }}
                      >
                        Claim your room (free)
                      </Link>
                    </p>
                    <p style={{ color: 'var(--soft-brown)', fontSize: '0.8rem', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                      Create account anytime — housing is free.
                    </p>
                    {attemptCount >= 3 && (
                      <p style={{ color: 'var(--focus-orange)', fontSize: '0.8rem', fontFamily: 'Georgia, serif' }}>
                        <Link to="/reset-password" style={{ color: 'var(--focus-orange)' }}>
                          Try Reset via email
                        </Link>
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Door Handle */}
                <motion.div
                  style={{
                    position: 'absolute',
                    right: '30px',
                    top: '50%',
                    width: '20px',
                    height: '20px',
                    background: 'var(--study-gold)',
                    borderRadius: '50%',
                    boxShadow: '0 0 15px rgba(201, 168, 118, 0.5)',
                    transform: 'translateY(-50%)',
                  }}
                  animate={isUnlocking ? {
                    backgroundColor: ['var(--study-gold)', 'var(--focus-orange)', 'var(--study-gold)'],
                    boxShadow: [
                      '0 0 15px rgba(201, 168, 118, 0.5)',
                      '0 0 25px rgba(230, 126, 34, 0.8)',
                      '0 0 15px rgba(201, 168, 118, 0.5)'
                    ]
                  } : {}}
                  transition={{ duration: 1.5, repeat: isUnlocking ? 1 : 0 }}
                />
              </motion.div>
            </motion.div>

            {isUnlocking && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
                style={{ color: 'var(--deep-forest)', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
              >
                <p>The door is opening. Welcome to your Grand Entrance...</p>
              </motion.div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;