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
  
  // Mock data - in real app would come from API - All 11 GCSE subjects
  const [subjectProgress] = useState<SubjectProgress[]>([
    { subject: 'Mathematics', progress: user ? 75 : 0, grade: user ? 'B+' : '-', testsCompleted: user ? 12 : 0, lastActivity: user ? '2 hours ago' : 'Not started', examBoard: 'AQA' },
    { subject: 'Biology', progress: user ? 85 : 0, grade: user ? 'A-' : '-', testsCompleted: user ? 8 : 0, lastActivity: user ? '1 day ago' : 'Not started', examBoard: 'PEARSON', scienceType: 'Triple' },
    { subject: 'Chemistry', progress: user ? 60 : 0, grade: user ? 'C+' : '-', testsCompleted: user ? 6 : 0, lastActivity: user ? '3 days ago' : 'Not started', examBoard: 'OCR', scienceType: 'Triple' },
    { subject: 'Physics', progress: user ? 70 : 0, grade: user ? 'B' : '-', testsCompleted: user ? 9 : 0, lastActivity: user ? '1 day ago' : 'Not started', examBoard: 'EDUQAS', scienceType: 'Double' },
    { subject: 'English Literature', progress: user ? 90 : 0, grade: user ? 'A' : '-', testsCompleted: user ? 15 : 0, lastActivity: user ? '4 hours ago' : 'Not started', examBoard: 'WJEC' },
    { subject: 'English Language', progress: user ? 88 : 0, grade: user ? 'A-' : '-', testsCompleted: user ? 13 : 0, lastActivity: user ? '5 hours ago' : 'Not started', examBoard: 'AQA' },
    { subject: 'Geography', progress: user ? 55 : 0, grade: user ? 'C' : '-', testsCompleted: user ? 4 : 0, lastActivity: user ? '1 week ago' : 'Not started', examBoard: 'IGCSE PEARSON' },
    { subject: 'Geology', progress: user ? 65 : 0, grade: user ? 'B-' : '-', testsCompleted: user ? 7 : 0, lastActivity: user ? '2 days ago' : 'Not started', examBoard: 'OCR' },
    { subject: 'Computer Science', progress: user ? 82 : 0, grade: user ? 'A-' : '-', testsCompleted: user ? 11 : 0, lastActivity: user ? '6 hours ago' : 'Not started', examBoard: 'AQA' },
    { subject: 'Religious Education', progress: user ? 73 : 0, grade: user ? 'B' : '-', testsCompleted: user ? 9 : 0, lastActivity: user ? '3 days ago' : 'Not started', examBoard: 'EDUQAS' },
    { subject: 'History', progress: user ? 78 : 0, grade: user ? 'B+' : '-', testsCompleted: user ? 10 : 0, lastActivity: user ? '1 day ago' : 'Not started', examBoard: 'PEARSON' },
  ]);

  const [overallStats] = useState({
    totalStudyTime: user ? '147 hours' : '0 hours',
    totalTests: user ? 54 : 0,
    averageGrade: user ? 'B+' : '-',
    streak: user ? 12 : 0,
    weakestSubject: user ? 'Geography' : 'Not started',
    strongestSubject: user ? 'English Literature' : 'Not started'
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

  // Create guest user data for demo mode
  const guestUser = {
    firstName: 'Guest',
    id: 'guest',
    username: 'guest',
    email: 'guest@demo.com',
    lastName: 'User',
    yearGroup: 'Year 11'
  };

  const currentUser = user || guestUser;

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
            Welcome back, {currentUser.firstName}! 🎓
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
                                  onClick={() => {
                                    const subjectCode = subject.subject.toLowerCase()
                                      .replace(/\s+/g, '-')
                                      .replace('mathematics', 'mathematics')
                                      .replace('english-literature', 'english-literature')
                                      .replace('english-language', 'english-language')
                                      .replace('computer-science', 'computer-science')
                                      .replace('religious-education', 'religious-education');
                                    navigate(`/subjects/${subjectCode}`);
                                  }}
                                  style={{
                                    borderRadius: '8px',
                                    padding: '6px 12px'
                                  }}
                                >
                                  {user ? 'Continue Study' : 'Start Learning'}
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