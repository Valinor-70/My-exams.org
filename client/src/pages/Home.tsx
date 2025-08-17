import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
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
    { name: 'Mathematics', code: 'maths', icon: '🔢', color: 'success' },
    { name: 'Biology', code: 'biology', icon: '🧬', color: 'info' },
    { name: 'Chemistry', code: 'chemistry', icon: '⚗️', color: 'warning' },
    { name: 'Physics', code: 'physics', icon: '⚡', color: 'danger' },
    { name: 'English Literature', code: 'english-lit', icon: '📚', color: 'primary' },
    { name: 'English Language', code: 'english-lang', icon: '✍️', color: 'secondary' },
    { name: 'Geography', code: 'geography', icon: '🌍', color: 'success' },
    { name: 'Geology', code: 'geology', icon: '🏔️', color: 'dark' },
    { name: 'Computer Science', code: 'computer-science', icon: '💻', color: 'info' },
    { name: 'Religious Education', code: 'religious-education', icon: '✝️', color: 'warning' },
    { name: 'History', code: 'history', icon: '🏛️', color: 'danger' },
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
    >
      {/* Floating Shapes Background */}
      <div className="floating-shapes">
        <div className="shape" style={{ 
          width: '100px', 
          height: '100px', 
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          borderRadius: '20px',
          transform: 'rotate(45deg)'
        }}></div>
        <div className="shape" style={{ 
          width: '80px', 
          height: '80px', 
          background: 'linear-gradient(45deg, #f093fb, #f5576c)',
          borderRadius: '50%'
        }}></div>
        <div className="shape" style={{ 
          width: '120px', 
          height: '120px', 
          background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}></div>
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
                <h1 className="display-3 fw-bold hero-title mb-4">
                  Welcome to MyExams.org
                </h1>
                <motion.p 
                  className="lead mb-4"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Your comprehensive GCSE revision platform. Study smarter, not harder with our 
                  interactive lessons, practice tests, and progress tracking.
                </motion.p>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {!user ? (
                    <div>
                      <button 
                        className="btn btn-light btn-lg me-3 btn-3d"
                        onClick={() => navigate('/register')}
                        style={{
                          borderRadius: '12px',
                          padding: '12px 24px'
                        }}
                      >
                        Get Started
                      </button>
                      <button 
                        className="btn btn-outline-light btn-lg btn-3d"
                        onClick={() => navigate('/login')}
                        style={{
                          borderRadius: '12px',
                          padding: '12px 24px'
                        }}
                      >
                        Login
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="btn btn-light btn-lg btn-3d"
                      onClick={() => navigate('/dashboard')}
                      style={{
                        borderRadius: '12px',
                        padding: '12px 24px'
                      }}
                    >
                      Go to Dashboard
                    </button>
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
              <h2 className="display-5 fw-bold">Why Choose MyExams.org?</h2>
              <p className="lead text-muted">Everything you need to excel in your GCSEs</p>
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
                <Card className="h-100 text-center border-0 shadow card-3d glow-effect">
                  <Card.Body>
                    <motion.div 
                      style={{ fontSize: '3rem' }} 
                      className="mb-3"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      📚
                    </motion.div>
                    <Card.Title>Complete Syllabus Coverage</Card.Title>
                    <Card.Text>
                      All 11 core GCSE subjects with comprehensive topic coverage, 
                      explanations, and worked examples.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div variants={itemVariants}>
                <Card className="h-100 text-center border-0 shadow card-3d glow-effect">
                  <Card.Body>
                    <motion.div 
                      style={{ fontSize: '3rem' }} 
                      className="mb-3"
                      whileHover={{ scale: 1.2, rotate: -360 }}
                      transition={{ duration: 0.5 }}
                    >
                      🎯
                    </motion.div>
                    <Card.Title>Random Practice Tests</Card.Title>
                    <Card.Text>
                      Generate unlimited practice tests with instant feedback, 
                      scoring, and detailed explanations.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div variants={itemVariants}>
                <Card className="h-100 text-center border-0 shadow card-3d glow-effect">
                  <Card.Body>
                    <motion.div 
                      style={{ fontSize: '3rem' }} 
                      className="mb-3"
                      whileHover={{ scale: 1.2, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      📊
                    </motion.div>
                    <Card.Title>Progress Tracking</Card.Title>
                    <Card.Text>
                      Monitor your progress, identify weak areas, and track 
                      improvements over time with detailed analytics.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>

      {/* Subjects Section */}
      <div className="bg-light py-5">
        <Container>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Row className="text-center mb-5">
              <Col>
                <h2 className="display-5 fw-bold">Available Subjects</h2>
                <p className="lead text-muted">Comprehensive revision materials for all core GCSE subjects</p>
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`stagger-item`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card 
                      className="h-100 shadow-sm border-0 subject-card" 
                      style={{ cursor: user ? 'pointer' : 'default' }}
                      onClick={() => user && navigate(`/subjects/${subject.code}`)}
                    >
                      <Card.Body className="text-center">
                        <motion.div 
                          style={{ fontSize: '2.5rem' }} 
                          className="mb-2"
                          whileHover={{ 
                            scale: 1.3, 
                            rotate: [0, -10, 10, -10, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          {subject.icon}
                        </motion.div>
                        <Card.Title className="h6">{subject.name}</Card.Title>
                        {user ? (
                          <button 
                            className={`btn btn-outline-${subject.color} btn-sm btn-3d`}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/subjects/${subject.code}`);
                            }}
                            style={{
                              borderRadius: '8px',
                              padding: '6px 12px'
                            }}
                          >
                            Study Now
                          </button>
                        ) : (
                          <Badge bg="secondary">Login Required</Badge>
                        )}
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="bg-dark text-white py-5">
          <Container className="text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="display-6 fw-bold mb-3">Ready to Start Your GCSE Journey?</h2>
              <p className="lead mb-4">
                Join thousands of students who are already improving their grades with MyExams.org
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
              <button 
                className="btn btn-primary btn-lg pulse-effect"
                onClick={() => navigate('/register')}
                style={{
                  background: 'var(--primary-gradient)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  padding: '12px 24px'
                }}
              >
                Sign Up Free Today
              </button>
              </motion.div>
            </motion.div>
          </Container>
        </div>
      )}
    </motion.div>
  );
};

export default Home;