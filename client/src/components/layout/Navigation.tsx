import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const subjects = [
    { name: 'Mathematics', code: 'maths', icon: '📊' },
    { name: 'Biology', code: 'biology', icon: '🧬' },
    { name: 'Chemistry', code: 'chemistry', icon: '⚗️' },
    { name: 'Physics', code: 'physics', icon: '⚡' },
    { name: 'English Literature', code: 'english-lit', icon: '📚' },
    { name: 'English Language', code: 'english-lang', icon: '✍️' },
    { name: 'Geography', code: 'geography', icon: '🌍' },
    { name: 'Geology', code: 'geology', icon: '🗿' },
    { name: 'Computer Science', code: 'computer-science', icon: '💻' },
    { name: 'Religious Education', code: 'religious-education', icon: '🕊️' },
    { name: 'History', code: 'history', icon: '🏛️' },
  ];

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Navbar 
        expand="lg" 
        sticky="top" 
        className="study-nav shadow-lg"
        style={{ 
          background: 'linear-gradient(145deg, var(--study-wood), var(--soft-brown))',
          backdropFilter: 'blur(20px)',
          borderBottom: '3px solid var(--rich-mahogany)',
        }}
      >
        <Container>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Navbar.Brand 
              as={Link} 
              to="/" 
              style={{
                fontFamily: 'Georgia, serif',
                fontWeight: '700',
                fontSize: '1.5rem',
                color: 'var(--paper-white)',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                textDecoration: 'none',
              }}
              className="study-nav-link"
            >
              📚 MYEXAMS.ORG
            </Navbar.Brand>
          </motion.div>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            style={{
              borderColor: 'var(--study-gold)',
              filter: 'brightness(1.2)',
            }}
          />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Nav.Link 
                  as={Link} 
                  to="/"
                  className="study-nav-link"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: 'var(--paper-white)',
                    fontSize: '1rem',
                  }}
                >
                  Home
                </Nav.Link>
              </motion.div>
              
              {user && (
                <>
                  <NavDropdown 
                    title="Study Rooms" 
                    id="subjects-dropdown"
                    className="study-nav-link"
                    style={{
                      fontFamily: 'Georgia, serif',
                      color: 'var(--paper-white)',
                    }}
                  >
                    {subjects.map((subject) => (
                      <motion.div
                        key={subject.code}
                        whileHover={{ x: 5, backgroundColor: 'rgba(212, 165, 116, 0.1)' }}
                      >
                        <NavDropdown.Item
                          as={Link}
                          to={`/subjects/${subject.code}`}
                          style={{
                            fontFamily: 'Georgia, serif',
                            color: 'var(--rich-mahogany)',
                            background: 'var(--paper-white)',
                            border: '1px solid rgba(139, 115, 85, 0.2)',
                            borderRadius: '3px',
                            margin: '2px',
                          }}
                        >
                          {subject.icon} {subject.name}
                        </NavDropdown.Item>
                      </motion.div>
                    ))}
                  </NavDropdown>
                  
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Nav.Link 
                      as={Link} 
                      to="/dashboard"
                      className="study-nav-link"
                      style={{
                        fontFamily: 'Georgia, serif',
                        color: 'var(--study-gold)',
                        fontSize: '1rem',
                      }}
                    >
                      My Studio
                    </Nav.Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Nav.Link 
                      as={Link} 
                      to="/tests"
                      className="study-nav-link"
                      style={{
                        fontFamily: 'Georgia, serif',
                        color: 'var(--gentle-blue)',
                        fontSize: '1rem',
                      }}
                    >
                      Practice Tests
                    </Nav.Link>
                  </motion.div>
                </>
              )}
            </Nav>
            
            <Nav>
              {user ? (
                <NavDropdown 
                  title={
                    <span style={{
                      fontFamily: 'Georgia, serif',
                      color: 'var(--study-gold)',
                      fontWeight: '600',
                    }}>
                      👋 {user.firstName}
                    </span>
                  }
                  id="user-dropdown" 
                  align="end"
                  className="study-nav-link"
                >
                  <motion.div whileHover={{ x: 5, backgroundColor: 'rgba(212, 165, 116, 0.1)' }}>
                    <NavDropdown.Item 
                      as={Link} 
                      to="/profile"
                      style={{
                        fontFamily: 'Georgia, serif',
                        color: 'var(--rich-mahogany)',
                        background: 'var(--paper-white)',
                        border: '1px solid rgba(139, 115, 85, 0.2)',
                        borderRadius: '3px',
                        margin: '2px',
                      }}
                    >
                      📝 My Profile
                    </NavDropdown.Item>
                  </motion.div>
                  <motion.div whileHover={{ x: 5, backgroundColor: 'rgba(212, 165, 116, 0.1)' }}>
                    <NavDropdown.Item 
                      as={Link} 
                      to="/notes"
                      style={{
                        fontFamily: 'Georgia, serif',
                        color: 'var(--rich-mahogany)',
                        background: 'var(--paper-white)',
                        border: '1px solid rgba(139, 115, 85, 0.2)',
                        borderRadius: '3px',
                        margin: '2px',
                      }}
                    >
                      📔 Study Notes
                    </NavDropdown.Item>
                  </motion.div>
                  <NavDropdown.Divider style={{ borderColor: 'var(--study-gold)' }} />
                  <motion.div whileHover={{ x: 5, backgroundColor: 'rgba(230, 126, 34, 0.1)' }}>
                    <NavDropdown.Item 
                      onClick={handleLogout}
                      style={{
                        fontFamily: 'Georgia, serif',
                        color: 'var(--focus-orange)',
                        background: 'var(--paper-white)',
                        border: '1px solid rgba(230, 126, 34, 0.2)',
                        borderRadius: '3px',
                        margin: '2px',
                      }}
                    >
                      🚪 Leave Studio
                    </NavDropdown.Item>
                  </motion.div>
                </NavDropdown>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Nav.Link 
                      as={Link} 
                      to="/login"
                      className="study-nav-link"
                      style={{
                        fontFamily: 'Georgia, serif',
                        color: 'var(--gentle-blue)',
                        fontSize: '1rem',
                      }}
                    >
                      Enter
                    </Nav.Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Nav.Link 
                      as={Link} 
                      to="/register"
                      className="study-nav-link"
                      style={{
                        fontFamily: 'Georgia, serif',
                        color: 'var(--study-gold)',
                        fontSize: '1rem',
                      }}
                    >
                      Claim Your Room
                    </Nav.Link>
                  </motion.div>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default Navigation;