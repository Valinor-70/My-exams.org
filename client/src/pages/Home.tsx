import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold">Welcome to MyExams.org</h1>
              <p className="lead">
                Your comprehensive GCSE revision platform. Study smarter, not harder with our 
                interactive lessons, practice tests, and progress tracking.
              </p>
              {!user ? (
                <div>
                  <Button 
                    variant="light" 
                    size="lg" 
                    className="me-3"
                    onClick={() => navigate('/register')}
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outline-light" 
                    size="lg"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="light" 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </Button>
              )}
            </Col>
            <Col lg={6} className="text-center">
              <div style={{ fontSize: '8rem' }}>🎓</div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-5 fw-bold">Why Choose MyExams.org?</h2>
            <p className="lead text-muted">Everything you need to excel in your GCSEs</p>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 text-center border-0 shadow">
              <Card.Body>
                <div style={{ fontSize: '3rem' }} className="mb-3">📚</div>
                <Card.Title>Complete Syllabus Coverage</Card.Title>
                <Card.Text>
                  All 11 core GCSE subjects with comprehensive topic coverage, 
                  explanations, and worked examples.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center border-0 shadow">
              <Card.Body>
                <div style={{ fontSize: '3rem' }} className="mb-3">🎯</div>
                <Card.Title>Random Practice Tests</Card.Title>
                <Card.Text>
                  Generate unlimited practice tests with instant feedback, 
                  scoring, and detailed explanations.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center border-0 shadow">
              <Card.Body>
                <div style={{ fontSize: '3rem' }} className="mb-3">📊</div>
                <Card.Title>Progress Tracking</Card.Title>
                <Card.Text>
                  Monitor your progress, identify weak areas, and track 
                  improvements over time with detailed analytics.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Subjects Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold">Available Subjects</h2>
              <p className="lead text-muted">Comprehensive revision materials for all core GCSE subjects</p>
            </Col>
          </Row>

          <Row className="g-3">
            {subjects.map((subject) => (
              <Col key={subject.code} lg={3} md={4} sm={6}>
                <Card 
                  className="h-100 shadow-sm border-0" 
                  style={{ cursor: user ? 'pointer' : 'default' }}
                >
                  <Card.Body className="text-center">
                    <div style={{ fontSize: '2.5rem' }} className="mb-2">{subject.icon}</div>
                    <Card.Title className="h6">{subject.name}</Card.Title>
                    {user ? (
                      <Button 
                        variant={`outline-${subject.color}`}
                        size="sm"
                        onClick={() => navigate(`/subjects/${subject.code}`)}
                      >
                        Study Now
                      </Button>
                    ) : (
                      <Badge bg="secondary">Login Required</Badge>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="bg-dark text-white py-5">
          <Container className="text-center">
            <h2 className="display-6 fw-bold mb-3">Ready to Start Your GCSE Journey?</h2>
            <p className="lead mb-4">
              Join thousands of students who are already improving their grades with MyExams.org
            </p>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/register')}
            >
              Sign Up Free Today
            </Button>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Home;