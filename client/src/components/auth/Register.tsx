import React, { useState } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import '../../styles/study-theme.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    wantsReminders: false
  });
  const [isAllocating, setIsAllocating] = useState(false);
  const [allocationStep, setAllocationStep] = useState(0);
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const allocationSteps = [
    'Reserving your room...',
    'Stocking flashcards & notes...',
    'Personalizing your desk...',
    'Handover complete — Welcome home.'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      alert('Try a longer password — 8+ characters.');
      return;
    }

    setIsAllocating(true);
    
    // Simulate room allocation process
    for (let i = 0; i < allocationSteps.length; i++) {
      setAllocationStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    const success = await register({
      username: formData.email, // Use email as username for now
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      yearGroup: 'Year 11' // Default year group
    });

    if (success) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setIsAllocating(false);
    }
  };

  if (isAllocating) {
    return (
      <div className="grand-entrance" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8} className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {/* Estate Agent Sign */}
                <motion.div
                  className="study-room-card mx-auto mb-4"
                  style={{
                    width: '400px',
                    padding: '2rem',
                    background: 'var(--paper-white)',
                  }}
                  animate={{ rotateY: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏠</div>
                  <h3 style={{ color: 'var(--rich-mahogany)', fontFamily: 'Georgia, serif' }}>
                    Allocating your study room
                  </h3>
                  <p style={{ color: 'var(--soft-brown)', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                    Housing is free
                  </p>
                  
                  {/* Progress Map */}
                  <div style={{ margin: '2rem 0' }}>
                    <div 
                      style={{
                        background: 'var(--warm-beige)',
                        height: '20px',
                        borderRadius: '10px',
                        border: '2px solid var(--study-gold)',
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                    >
                      <motion.div
                        style={{
                          background: 'var(--study-primary)',
                          height: '100%',
                          borderRadius: '8px',
                        }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${((allocationStep + 1) / allocationSteps.length) * 100}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    <p style={{ 
                      color: 'var(--rich-mahogany)', 
                      fontFamily: 'Georgia, serif',
                      marginTop: '1rem',
                      fontSize: '1.1rem'
                    }}>
                      {allocationSteps[allocationStep]}
                    </p>
                    <p style={{ 
                      color: 'var(--soft-brown)', 
                      fontFamily: 'Georgia, serif',
                      fontSize: '0.9rem'
                    }}>
                      {Math.round(((allocationStep + 1) / allocationSteps.length) * 100)}% complete
                    </p>
                  </div>
                </motion.div>

                <motion.p
                  style={{
                    color: 'var(--deep-forest)',
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    fontSize: '1.1rem'
                  }}
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Allocating your study room. Housing is free — we'll set it up with your top topics right now.
                </motion.p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="grand-entrance" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-4"
            >
              {/* Estate Agent Sign */}
              <motion.div
                style={{
                  display: 'inline-block',
                  background: 'var(--study-wood)',
                  padding: '1rem 2rem',
                  borderRadius: '10px',
                  border: '3px solid var(--study-gold)',
                  color: 'var(--paper-white)',
                  fontFamily: 'Georgia, serif',
                  marginBottom: '2rem',
                  transform: 'rotate(-2deg)',
                }}
                whileHover={{ rotate: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏠</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>Create account — housing is free</div>
                <div style={{ fontSize: '0.9rem', fontStyle: 'italic', opacity: 0.9 }}>
                  Personalize and sync across devices
                </div>
              </motion.div>
            </motion.div>

            <Row>
              <Col lg={6}>
                <motion.div
                  className="study-room-card"
                  style={{ padding: '2rem', background: 'var(--paper-white)' }}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h3 style={{ 
                    color: 'var(--rich-mahogany)', 
                    fontFamily: 'Georgia, serif',
                    marginBottom: '1rem'
                  }}>
                    Claim your study room
                  </h3>
                  <p style={{ 
                    color: 'var(--soft-brown)', 
                    fontFamily: 'Georgia, serif',
                    marginBottom: '1.5rem'
                  }}>
                    Housing is free. Personalize and sync across devices.
                  </p>

                  {error && (
                    <Alert 
                      variant="danger"
                      style={{
                        background: 'rgba(230, 126, 34, 0.1)',
                        border: '1px solid var(--focus-orange)',
                        color: 'var(--focus-orange)'
                      }}
                    >
                      {error}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ color: 'var(--rich-mahogany)', fontFamily: 'Georgia, serif' }}>
                            First Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="study-paper"
                            style={{
                              background: 'var(--paper-white)',
                              border: '1px solid var(--soft-brown)',
                              borderRadius: '5px',
                              fontFamily: 'Georgia, serif'
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ color: 'var(--rich-mahogany)', fontFamily: 'Georgia, serif' }}>
                            Last Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="study-paper"
                            style={{
                              background: 'var(--paper-white)',
                              border: '1px solid var(--soft-brown)',
                              borderRadius: '5px',
                              fontFamily: 'Georgia, serif'
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: 'var(--rich-mahogany)', fontFamily: 'Georgia, serif' }}>
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="study-paper"
                        style={{
                          background: 'var(--paper-white)',
                          border: '1px solid var(--soft-brown)',
                          borderRadius: '5px',
                          fontFamily: 'Georgia, serif'
                        }}
                        placeholder="Please enter a valid email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: 'var(--rich-mahogany)', fontFamily: 'Georgia, serif' }}>
                        Create Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="study-paper"
                        style={{
                          background: 'var(--paper-white)',
                          border: '1px solid var(--soft-brown)',
                          borderRadius: '5px',
                          fontFamily: 'Georgia, serif'
                        }}
                        placeholder="8+ characters required"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: 'var(--rich-mahogany)', fontFamily: 'Georgia, serif' }}>
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="study-paper"
                        style={{
                          background: 'var(--paper-white)',
                          border: '1px solid var(--soft-brown)',
                          borderRadius: '5px',
                          fontFamily: 'Georgia, serif'
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        name="wantsReminders"
                        checked={formData.wantsReminders}
                        onChange={handleChange}
                        label="Yes — I'd like reminders & progress emails (optional)"
                        style={{ color: 'var(--soft-brown)', fontFamily: 'Georgia, serif' }}
                      />
                    </Form.Group>

                    <div className="d-grid gap-2 mb-3">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <button
                          type="submit"
                          className="btn btn-study"
                          disabled={loading}
                          style={{
                            background: 'var(--study-primary)',
                            border: '2px solid var(--rich-mahogany)',
                            fontFamily: 'Georgia, serif',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            padding: '12px'
                          }}
                        >
                          {loading ? 'Creating Account...' : 'Claim my room (free)'}
                        </button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => navigate('/dashboard')}
                          style={{
                            borderColor: 'var(--cozy-amber)',
                            color: 'var(--cozy-amber)',
                            fontFamily: 'Georgia, serif',
                          }}
                        >
                          Continue as Guest
                        </button>
                      </motion.div>
                    </div>

                    <div className="text-center">
                      <p style={{ color: 'var(--soft-brown)', fontSize: '0.9rem', fontFamily: 'Georgia, serif' }}>
                        Already have an account?{' '}
                        <Link 
                          to="/login" 
                          style={{ 
                            color: 'var(--study-gold)', 
                            textDecoration: 'none',
                            fontWeight: '600'
                          }}
                        >
                          Enter your studio
                        </Link>
                      </p>
                      <p style={{ 
                        color: 'var(--soft-brown)', 
                        fontSize: '0.8rem', 
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                        marginTop: '1rem'
                      }}>
                        We'll never rent your data — privacy first.
                      </p>
                    </div>
                  </Form>
                </motion.div>
              </Col>

              <Col lg={6}>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {/* Study Room Preview */}
                  <div 
                    className="study-room-card"
                    style={{ 
                      padding: '2rem', 
                      background: 'var(--warm-beige)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏠</div>
                    <h4 style={{ color: 'var(--rich-mahogany)', fontFamily: 'Georgia, serif' }}>
                      Your Study Studio Preview
                    </h4>
                    <p style={{ color: 'var(--soft-brown)', fontFamily: 'Georgia, serif', fontSize: '0.9rem' }}>
                      Your free study room will include:
                    </p>
                    
                    <div style={{ textAlign: 'left', margin: '1.5rem 0' }}>
                      {[
                        '📚 Personal study desk with materials',
                        '📝 Synchronized notes across devices',
                        '🎯 Customized practice tests',
                        '📊 Progress tracking and analytics',
                        '🔄 Automatic cloud backup'
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          style={{
                            color: 'var(--deep-forest)',
                            fontFamily: 'Georgia, serif',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem'
                          }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + (index * 0.1) }}
                        >
                          {feature}
                        </motion.div>
                      ))}
                    </div>

                    <p style={{ 
                      color: 'var(--study-gold)', 
                      fontFamily: 'Georgia, serif',
                      fontWeight: '600',
                      fontStyle: 'italic'
                    }}>
                      All completely free forever!
                    </p>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;