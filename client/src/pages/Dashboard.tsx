import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/animations.css';

interface SubjectProgress {
  subject: string;
  progress: number;
  grade: string;
  testsCompleted: number;
  lastActivity: string;
  examBoard: string;
  scienceType?: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Mock data - in real app would come from API
  const [subjectProgress] = useState<SubjectProgress[]>([
    { subject: 'Mathematics', progress: 75, grade: 'B+', testsCompleted: 12, lastActivity: '2 hours ago', examBoard: 'AQA' },
    { subject: 'Biology', progress: 85, grade: 'A-', testsCompleted: 8, lastActivity: '1 day ago', examBoard: 'PEARSON', scienceType: 'Triple' },
    { subject: 'Chemistry', progress: 60, grade: 'C+', testsCompleted: 6, lastActivity: '3 days ago', examBoard: 'OCR', scienceType: 'Triple' },
    { subject: 'Physics', progress: 70, grade: 'B', testsCompleted: 9, lastActivity: '1 day ago', examBoard: 'EDUQAS', scienceType: 'Double' },
    { subject: 'English Literature', progress: 90, grade: 'A', testsCompleted: 15, lastActivity: '4 hours ago', examBoard: 'WJEC' },
    { subject: 'Geography', progress: 55, grade: 'C', testsCompleted: 4, lastActivity: '1 week ago', examBoard: 'IGCSE PEARSON' },
  ]);

  const [overallStats] = useState({
    totalStudyTime: '147 hours',
    totalTests: 54,
    averageGrade: 'B+',
    streak: 12,
    weakestSubject: 'Geography',
    strongestSubject: 'English Literature'
  });

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

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'success';
    if (grade.startsWith('B')) return 'primary';
    if (grade.startsWith('C')) return 'warning';
    return 'danger';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'success';
    if (progress >= 60) return 'primary';
    if (progress >= 40) return 'warning';
    return 'danger';
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}
    >
      {/* Floating shapes background */}
      <div className="floating-shapes">
        <div className="shape" style={{ 
          width: '120px', 
          height: '120px', 
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          borderRadius: '50%',
          opacity: 0.1
        }}></div>
        <div className="shape" style={{ 
          width: '80px', 
          height: '80px', 
          background: 'linear-gradient(45deg, #f093fb, #f5576c)',
          borderRadius: '20px',
          opacity: 0.1
        }}></div>
      </div>

      <Container className="py-5">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-5"
        >
          <h1 className="display-4 fw-bold hero-title mb-3">
            Welcome back, {user.firstName}! 🎓
          </h1>
          <p className="lead text-muted">
            Track your progress and continue your GCSE journey
          </p>
        </motion.div>

        {/* Overall Stats Cards */}
        <motion.div variants={containerVariants} className="mb-5">
          <Row className="g-4">
            <Col md={3} sm={6}>
              <motion.div variants={itemVariants}>
                <Card className="h-100 border-0 shadow-sm card-3d text-center">
                  <Card.Body>
                    <motion.div
                      className="text-primary mb-2"
                      style={{ fontSize: '2.5rem' }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      ⏱️
                    </motion.div>
                    <h5 className="card-title">Study Time</h5>
                    <h3 className="text-primary">{overallStats.totalStudyTime}</h3>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={3} sm={6}>
              <motion.div variants={itemVariants}>
                <Card className="h-100 border-0 shadow-sm card-3d text-center">
                  <Card.Body>
                    <motion.div
                      className="text-success mb-2"
                      style={{ fontSize: '2.5rem' }}
                      whileHover={{ scale: 1.2, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      🎯
                    </motion.div>
                    <h5 className="card-title">Tests Completed</h5>
                    <h3 className="text-success">{overallStats.totalTests}</h3>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={3} sm={6}>
              <motion.div variants={itemVariants}>
                <Card className="h-100 border-0 shadow-sm card-3d text-center">
                  <Card.Body>
                    <motion.div
                      className="text-warning mb-2"
                      style={{ fontSize: '2.5rem' }}
                      whileHover={{ scale: 1.2, rotate: -360 }}
                      transition={{ duration: 0.5 }}
                    >
                      📊
                    </motion.div>
                    <h5 className="card-title">Average Grade</h5>
                    <h3 className="text-warning">{overallStats.averageGrade}</h3>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={3} sm={6}>
              <motion.div variants={itemVariants}>
                <Card className="h-100 border-0 shadow-sm card-3d text-center">
                  <Card.Body>
                    <motion.div
                      className="text-danger mb-2"
                      style={{ fontSize: '2.5rem' }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    >
                      🔥
                    </motion.div>
                    <h5 className="card-title">Study Streak</h5>
                    <h3 className="text-danger">{overallStats.streak} days</h3>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        {/* Subject Progress */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Row>
            <Col lg={8}>
              <Card className="border-0 shadow-lg card-3d">
                <Card.Header className="bg-primary text-white">
                  <h4 className="mb-0">📚 Subject Progress</h4>
                </Card.Header>
                <Card.Body>
                  <Row className="g-3">
                    {subjectProgress.map((subject, index) => (
                      <Col md={6} key={subject.subject}>
                        <motion.div
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * index, duration: 0.6 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Card className="h-100 border-0 shadow-sm subject-card">
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="card-title mb-0">{subject.subject}</h6>
                                <div>
                                  <Badge bg={getGradeColor(subject.grade)} className="me-1">
                                    {subject.grade}
                                  </Badge>
                                  <Badge bg="secondary" className="small">
                                    {subject.examBoard}
                                  </Badge>
                                  {subject.scienceType && (
                                    <Badge bg="info" className="ms-1 small">
                                      {subject.scienceType}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <ProgressBar 
                                variant={getProgressColor(subject.progress)}
                                now={subject.progress} 
                                className="mb-2"
                                style={{ height: '8px' }}
                              />
                              <div className="d-flex justify-content-between text-muted small">
                                <span>{subject.progress}% Complete</span>
                                <span>{subject.testsCompleted} tests</span>
                              </div>
                              <div className="text-muted small">
                                Last activity: {subject.lastActivity}
                              </div>
                              <motion.div
                                className="mt-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <button 
                                  className="btn btn-outline-primary btn-sm w-100 btn-3d"
                                  onClick={() => navigate(`/subjects/${subject.subject.toLowerCase().replace(' ', '-')}`)}
                                  style={{
                                    borderRadius: '8px',
                                    padding: '6px 12px'
                                  }}
                                >
                                  Continue Study
                                </button>
                              </motion.div>
                            </Card.Body>
                          </Card>
                        </motion.div>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Quick Actions */}
            <Col lg={4}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Card className="border-0 shadow-lg card-3d mb-4">
                  <Card.Header className="bg-success text-white">
                    <h5 className="mb-0">🚀 Quick Actions</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-grid gap-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button className="btn btn-primary btn-3d" onClick={() => navigate('/tests/random')}>
                          🎲 Random Test
                        </button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button className="btn btn-outline-primary btn-3d" onClick={() => navigate('/subjects')}>
                          📖 Browse Subjects
                        </button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button className="btn btn-outline-success btn-3d" onClick={() => navigate('/notes')}>
                          📝 My Notes
                        </button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button className="btn btn-outline-warning btn-3d" onClick={() => navigate('/profile')}>
                          ⚙️ Settings
                        </button>
                      </motion.div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Insights */}
                <Card className="border-0 shadow-lg card-3d">
                  <Card.Header className="bg-warning text-white">
                    <h5 className="mb-0">💡 Insights</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <span className="text-success me-2">💪</span>
                        <small>
                          <strong>Strongest:</strong> {overallStats.strongestSubject}
                        </small>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <span className="text-warning me-2">📈</span>
                        <small>
                          <strong>Needs Focus:</strong> {overallStats.weakestSubject}
                        </small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="text-info me-2">🎯</span>
                        <small>
                          You're on track for great results!
                        </small>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <button 
                        className="btn btn-outline-warning btn-sm w-100 btn-3d"
                        onClick={() => navigate(`/subjects/${overallStats.weakestSubject.toLowerCase()}`)}
                        style={{
                          borderRadius: '8px',
                          padding: '6px 12px'
                        }}
                      >
                        Focus on {overallStats.weakestSubject}
                      </button>
                    </motion.div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default Dashboard;