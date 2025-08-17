import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

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
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Animated background */}
      <div className="particle-bg"></div>
      
      {/* Floating shapes */}
      <div className="floating-shapes">
        <div className="shape" style={{ 
          width: '100px', 
          height: '100px', 
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          borderRadius: '20px'
        }}></div>
        <div className="shape" style={{ 
          width: '80px', 
          height: '80px', 
          background: 'linear-gradient(45deg, #f093fb, #f5576c)',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}></div>
      </div>

      <Container className="py-5" style={{ position: 'relative', zIndex: 10 }}>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
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
                      <h3 className="hero-title">Register for MyExams.org</h3>
                    </Card.Title>
                  </motion.div>
                  
                  {(error || validationError) && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Alert variant="danger">{error || validationError}</Alert>
                    </motion.div>
                  )}
                  
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <motion.div
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                        >
                          <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              placeholder="Enter first name"
                              value={formData.firstName}
                              onChange={handleChange}
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
                      </Col>
                      <Col md={6}>
                        <motion.div
                          initial={{ x: 30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                        >
                          <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              placeholder="Enter last name"
                              value={formData.lastName}
                              onChange={handleChange}
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
                      </Col>
                    </Row>

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="Choose a username"
                          value={formData.username}
                          onChange={handleChange}
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
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleChange}
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

                    <Row>
                      <Col md={6}>
                        <motion.div
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.7, duration: 0.6 }}
                        >
                          <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={formData.password}
                              onChange={handleChange}
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
                      </Col>
                      <Col md={6}>
                        <motion.div
                          initial={{ x: 30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.8, duration: 0.6 }}
                        >
                          <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              placeholder="Confirm password"
                              value={formData.confirmPassword}
                              onChange={handleChange}
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
                      </Col>
                    </Row>

                    <motion.div
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>School (Optional)</Form.Label>
                        <Form.Control
                          type="text"
                          name="school"
                          placeholder="Enter your school name"
                          value={formData.school}
                          onChange={handleChange}
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
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.0, duration: 0.6 }}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Year Group</Form.Label>
                        <Form.Select
                          name="yearGroup"
                          value={formData.yearGroup}
                          onChange={handleChange}
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
                        >
                          <option value="Year 9">Year 9</option>
                          <option value="Year 10">Year 10</option>
                          <option value="Year 11">Year 11</option>
                          <option value="Year 12">Year 12</option>
                          <option value="Year 13">Year 13</option>
                        </Form.Select>
                      </Form.Group>
                    </motion.div>

                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.1, duration: 0.6 }}
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
                            Creating account...
                          </>
                        ) : (
                          'Register'
                        )}
                      </button>
                    </motion.div>
                  </Form>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="text-center mt-3"
                  >
                    <p>Already have an account? <Link to="/login" className="text-decoration-none fw-bold">Login here</Link></p>
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

export default Register;