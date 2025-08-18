import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Form, Alert, Spinner } from 'react-bootstrap';
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
  const [currentStep, setCurrentStep] = useState(0);
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

  const formSteps = [
    ['firstName', 'lastName'],
    ['username', 'email'],
    ['password', 'confirmPassword'],
    ['school', 'yearGroup']
  ];

  return (
    <div 
      ref={containerRef}
      className="register-immersive-container"
      style={{ 
        minHeight: '100vh', 
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 50%, #4facfe 100%)',
      }}
    >
      {/* Advanced Particle System */}
      <div className="advanced-particle-system">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="floating-particle"
            style={{
              position: 'absolute',
              width: Math.random() * 8 + 3 + 'px',
              height: Math.random() * 8 + 3 + 'px',
              borderRadius: Math.random() > 0.5 ? '50%' : '20%',
              background: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 60 - 30, 0],
              opacity: [0.1, 0.9, 0.1],
              rotate: [0, Math.random() * 360, 0],
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Interactive 3D Geometric Shapes */}
      <div className="geometric-shapes-container">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="geometric-shape"
            style={{
              position: 'absolute',
              width: Math.random() * 140 + 80 + 'px',
              height: Math.random() * 140 + 80 + 'px',
              background: `linear-gradient(45deg, 
                rgba(255, 255, 255, 0.08), 
                rgba(255, 255, 255, 0.03))`,
              borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '20px' : '0',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              clipPath: i % 4 === 3 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
              x: [0, Math.random() * 120 - 60, 0],
              y: [0, Math.random() * 120 - 60, 0],
            }}
            transition={{
              duration: Math.random() * 25 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={{
              scale: 1.6,
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
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{
          type: "spring",
          stiffness: 15,
          damping: 12,
        }}
      />

      <Container className="py-5" style={{ position: 'relative', zIndex: 10 }}>
        <Row className="justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Col xs={12} sm={11} md={9} lg={7} xl={6}>
            <motion.div
              initial={{ scale: 0.2, opacity: 0, rotateX: -90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 40,
                damping: 15,
                duration: 1.5
              }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div
                className="register-card-3d"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(30px)',
                  borderRadius: '35px',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: `
                    0 30px 60px rgba(0, 0, 0, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `,
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
                {/* Dynamic Background Gradient */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(118, 75, 162, 0.1), rgba(102, 126, 234, 0.1))',
                    borderRadius: '35px',
                  }}
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(118, 75, 162, 0.1), rgba(102, 126, 234, 0.1))',
                      'linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1))',
                      'linear-gradient(225deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))',
                      'linear-gradient(45deg, rgba(118, 75, 162, 0.1), rgba(102, 126, 234, 0.1))',
                    ],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
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
                      className="hero-title"
                      style={{ 
                        fontSize: '2.8rem',
                        fontWeight: '700',
                        background: 'linear-gradient(45deg, #fff, #e0f2fe)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '0.5rem',
                      }}
                      animate={{
                        textShadow: [
                          '0 0 25px rgba(255, 255, 255, 0.3)',
                          '0 0 40px rgba(255, 255, 255, 0.6)',
                          '0 0 25px rgba(255, 255, 255, 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                      }}
                    >
                      Join MyExams.org
                    </motion.h2>
                    <motion.p
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '1.2rem',
                        marginBottom: 0,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.9 }}
                    >
                      Start your GCSE success story today
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
                          style={{
                            background: 'rgba(220, 53, 69, 0.1)',
                            border: '1px solid rgba(220, 53, 69, 0.3)',
                            color: '#fff',
                            borderRadius: '20px',
                          }}
                        >
                          {error || validationError}
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
                          style={{ marginBottom: '1.8rem' }}
                        >
                          <Form.Group>
                            <motion.label
                              style={{ 
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '1.05rem',
                                fontWeight: '500',
                                marginBottom: '0.6rem',
                                display: 'block',
                              }}
                              animate={{ x: formData.firstName ? 8 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              First Name
                            </motion.label>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Form.Control
                                type="text"
                                name="firstName"
                                placeholder="Enter first name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                style={{
                                  borderRadius: '18px',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  backdropFilter: 'blur(10px)',
                                  color: '#fff',
                                  fontSize: '1.1rem',
                                  padding: '16px 22px',
                                  transition: 'all 0.3s ease',
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = 'rgba(79, 172, 254, 0.8)';
                                  e.target.style.boxShadow = '0 0 25px rgba(79, 172, 254, 0.3)';
                                  e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                  e.target.style.boxShadow = 'none';
                                  e.target.style.background = 'rgba(255, 255, 255, 0.08)';
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
                          style={{ marginBottom: '1.8rem' }}
                        >
                          <Form.Group>
                            <motion.label
                              style={{ 
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '1.05rem',
                                fontWeight: '500',
                                marginBottom: '0.6rem',
                                display: 'block',
                              }}
                              animate={{ x: formData.lastName ? 8 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              Last Name
                            </motion.label>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Form.Control
                                type="text"
                                name="lastName"
                                placeholder="Enter last name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                style={{
                                  borderRadius: '18px',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  backdropFilter: 'blur(10px)',
                                  color: '#fff',
                                  fontSize: '1.1rem',
                                  padding: '16px 22px',
                                  transition: 'all 0.3s ease',
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = 'rgba(79, 172, 254, 0.8)';
                                  e.target.style.boxShadow = '0 0 25px rgba(79, 172, 254, 0.3)';
                                  e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                  e.target.style.boxShadow = 'none';
                                  e.target.style.background = 'rgba(255, 255, 255, 0.08)';
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
                      style={{ marginBottom: '1.8rem' }}
                    >
                      <Form.Group>
                        <motion.label
                          style={{ 
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '1.05rem',
                            fontWeight: '500',
                            marginBottom: '0.6rem',
                            display: 'block',
                          }}
                          animate={{ x: formData.username ? 8 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          Username
                        </motion.label>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Form.Control
                            type="text"
                            name="username"
                            placeholder="Choose a username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            style={{
                              borderRadius: '18px',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              background: 'rgba(255, 255, 255, 0.08)',
                              backdropFilter: 'blur(10px)',
                              color: '#fff',
                              fontSize: '1.1rem',
                              padding: '16px 22px',
                              transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = 'rgba(79, 172, 254, 0.8)';
                              e.target.style.boxShadow = '0 0 25px rgba(79, 172, 254, 0.3)';
                              e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                              e.target.style.boxShadow = 'none';
                              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                            }}
                          />
                        </motion.div>
                      </Form.Group>
                    </motion.div>

                    <motion.div
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.9 }}
                      style={{ marginBottom: '1.8rem' }}
                    >
                      <Form.Group>
                        <motion.label
                          style={{ 
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '1.05rem',
                            fontWeight: '500',
                            marginBottom: '0.6rem',
                            display: 'block',
                          }}
                          animate={{ x: formData.email ? 8 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          Email Address
                        </motion.label>
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{
                              borderRadius: '18px',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              background: 'rgba(255, 255, 255, 0.08)',
                              backdropFilter: 'blur(10px)',
                              color: '#fff',
                              fontSize: '1.1rem',
                              padding: '16px 22px',
                              transition: 'all 0.3s ease',
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = 'rgba(79, 172, 254, 0.8)';
                              e.target.style.boxShadow = '0 0 25px rgba(79, 172, 254, 0.3)';
                              e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                              e.target.style.boxShadow = 'none';
                              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
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
                          style={{ marginBottom: '1.8rem' }}
                        >
                          <Form.Group>
                            <motion.label
                              style={{ 
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '1.05rem',
                                fontWeight: '500',
                                marginBottom: '0.6rem',
                                display: 'block',
                              }}
                              animate={{ x: formData.password ? 8 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              Password
                            </motion.label>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Form.Control
                                type="password"
                                name="password"
                                placeholder="Create password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                style={{
                                  borderRadius: '18px',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  backdropFilter: 'blur(10px)',
                                  color: '#fff',
                                  fontSize: '1.1rem',
                                  padding: '16px 22px',
                                  transition: 'all 0.3s ease',
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = 'rgba(79, 172, 254, 0.8)';
                                  e.target.style.boxShadow = '0 0 25px rgba(79, 172, 254, 0.3)';
                                  e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                  e.target.style.boxShadow = 'none';
                                  e.target.style.background = 'rgba(255, 255, 255, 0.08)';
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
                          style={{ marginBottom: '1.8rem' }}
                        >
                          <Form.Group>
                            <motion.label
                              style={{ 
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '1.05rem',
                                fontWeight: '500',
                                marginBottom: '0.6rem',
                                display: 'block',
                              }}
                              animate={{ x: formData.confirmPassword ? 8 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              Confirm Password
                            </motion.label>
                            <motion.div whileFocus={{ scale: 1.02 }}>
                              <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                style={{
                                  borderRadius: '18px',
                                  border: '1px solid rgba(255, 255, 255, 0.2)',
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  backdropFilter: 'blur(10px)',
                                  color: '#fff',
                                  fontSize: '1.1rem',
                                  padding: '16px 22px',
                                  transition: 'all 0.3s ease',
                                }}
                                onFocus={(e) => {
                                  e.target.style.borderColor = 'rgba(79, 172, 254, 0.8)';
                                  e.target.style.boxShadow = '0 0 25px rgba(79, 172, 254, 0.3)';
                                  e.target.style.background = 'rgba(255, 255, 255, 0.12)';
                                }}
                                onBlur={(e) => {
                                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                  e.target.style.boxShadow = 'none';
                                  e.target.style.background = 'rgba(255, 255, 255, 0.08)';
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
                        className="w-100"
                        type="submit"
                        disabled={loading}
                        style={{ 
                          borderRadius: '18px', 
                          padding: '18px 35px',
                          background: loading 
                            ? 'rgba(108, 117, 125, 0.3)' 
                            : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          border: 'none',
                          color: 'white',
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                        }}
                        animate={{
                          boxShadow: loading 
                            ? '0 8px 20px rgba(0, 0, 0, 0.2)' 
                            : '0 15px 35px rgba(79, 172, 254, 0.5)',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Enhanced button shine effect */}
                        <motion.div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                          }}
                          animate={{
                            left: loading ? '-100%' : ['100%', '-100%'],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />
                        
                        {loading ? (
                          <motion.div
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Spinner size="sm" className="me-3" />
                            <span>Creating your account...</span>
                          </motion.div>
                        ) : (
                          <motion.span
                            animate={{
                              textShadow: [
                                '0 0 0px rgba(255, 255, 255, 0)',
                                '0 0 15px rgba(255, 255, 255, 0.6)',
                                '0 0 0px rgba(255, 255, 255, 0)',
                              ],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              repeatDelay: 1.5,
                            }}
                          >
                            Create My Account
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
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.05rem' }}>
                      Already have an account?{' '}
                      <Link 
                        to="/login" 
                        style={{ 
                          color: '#fff',
                          textDecoration: 'none',
                          fontWeight: '600',
                          borderBottom: '1px solid transparent',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.borderBottomColor = '#fff';
                          e.target.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.borderBottomColor = 'transparent';
                          e.target.style.textShadow = 'none';
                        }}
                      >
                        Login here
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