import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import '../../styles/animations.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Animated background */}
      <div className="particle-bg"></div>
      
      {/* Floating shapes */}
      <div className="floating-shapes">
        <div className="shape" style={{ 
          width: '80px', 
          height: '80px', 
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          borderRadius: '50%'
        }}></div>
        <div className="shape" style={{ 
          width: '60px', 
          height: '60px', 
          background: 'linear-gradient(45deg, #f093fb, #f5576c)',
          borderRadius: '20px',
          transform: 'rotate(45deg)'
        }}></div>
      </div>

      <Container className="py-5" style={{ position: 'relative', zIndex: 10 }}>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Col md={6} lg={4}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8
              }}
            >
              <Card className="shadow-lg border-0 card-3d" style={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}>
                <Card.Body className="p-4">
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <Card.Title className="text-center mb-4">
                      <h3 className="hero-title">Login to MyExams.org</h3>
                    </Card.Title>
                  </motion.div>
                  
                  {error && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Alert variant="danger">{error}</Alert>
                    </motion.div>
                  )}
                  
                  <Form onSubmit={handleSubmit}>
                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{
                            borderRadius: '10px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#667eea';
                            e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e9ecef';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </Form.Group>
                    </motion.div>

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          style={{
                            borderRadius: '10px',
                            border: '2px solid #e9ecef',
                            transition: 'all 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#667eea';
                            e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e9ecef';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </Form.Group>
                    </motion.div>

                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button
                        className="btn btn-primary w-100 btn-3d"
                        type="submit"
                        disabled={loading}
                        style={{ 
                          borderRadius: '10px', 
                          padding: '12px',
                          background: 'var(--primary-gradient)',
                          border: 'none',
                          color: 'white'
                        }}
                      >
                        {loading ? (
                          <>
                            <Spinner size="sm" className="me-2" />
                            Logging in...
                          </>
                        ) : (
                          'Login'
                        )}
                      </button>
                    </motion.div>
                  </Form>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-center mt-3"
                  >
                    <p>Don't have an account? <Link to="/register" className="text-decoration-none fw-bold">Register here</Link></p>
                  </motion.div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;