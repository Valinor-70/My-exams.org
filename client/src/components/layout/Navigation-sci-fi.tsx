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
    { name: 'Mathematics', code: 'maths', icon: '⚡' },
    { name: 'Biology', code: 'biology', icon: '🔬' },
    { name: 'Chemistry', code: 'chemistry', icon: '⚛️' },
    { name: 'Physics', code: 'physics', icon: '🌌' },
    { name: 'English Literature', code: 'english-lit', icon: '📖' },
    { name: 'English Language', code: 'english-lang', icon: '📝' },
    { name: 'Geography', code: 'geography', icon: '🗺️' },
    { name: 'Geology', code: 'geology', icon: '⛰️' },
    { name: 'Computer Science', code: 'computer-science', icon: '🤖' },
    { name: 'Religious Education', code: 'religious-education', icon: '🕊️' },
    { name: 'History', code: 'history', icon: '⚔️' },
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
        className="sci-fi-nav shadow-lg"
        style={{ 
          background: 'rgba(26, 26, 46, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '2px solid var(--neon-cyan)',
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
                fontFamily: 'Orbitron, sans-serif',
                fontWeight: '700',
                fontSize: '1.5rem',
                color: 'var(--neon-cyan)',
                textShadow: '0 0 10px var(--neon-cyan)',
                textDecoration: 'none',
              }}
              className="sci-fi-nav-link"
            >
              🎓 MYEXAMS.ORG
            </Navbar.Brand>
          </motion.div>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            style={{
              borderColor: 'var(--neon-cyan)',
              filter: 'brightness(2)',
            }}
          />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Nav.Link 
                  as={Link} 
                  to="/"
                  className="sci-fi-nav-link"
                  style={{
                    fontFamily: 'Orbitron, sans-serif',
                    color: 'var(--neon-cyan)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.9rem',
                  }}
                >
                  Home
                </Nav.Link>
              </motion.div>
              
              {user && (
                <>
                  <NavDropdown 
                    title="NEURAL SUBJECTS" 
                    id="subjects-dropdown"
                    className="sci-fi-nav-link"
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      color: 'var(--neon-cyan)',
                    }}
                  >
                    {subjects.map((subject) => (
                      <motion.div
                        key={subject.code}
                        whileHover={{ x: 5, backgroundColor: 'rgba(0, 255, 255, 0.1)' }}
                      >
                        <NavDropdown.Item
                          as={Link}
                          to={`/subjects/${subject.code}`}
                          style={{
                            fontFamily: 'Roboto Mono, monospace',
                            color: 'var(--neon-cyan)',
                            background: 'var(--dark-surface)',
                            border: '1px solid rgba(0, 255, 255, 0.2)',
                            borderRadius: '0',
                          }}
                        >
                          <span style={{ color: 'var(--neon-green)' }}>&gt;</span> {subject.icon} {subject.name.toUpperCase()}
                        </NavDropdown.Item>
                      </motion.div>
                    ))}
                  </NavDropdown>
                  
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Nav.Link 
                      as={Link} 
                      to="/dashboard"
                      className="sci-fi-nav-link"
                      style={{
                        fontFamily: 'Orbitron, sans-serif',
                        color: 'var(--neon-green)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '0.9rem',
                      }}
                    >
                      Neural Dashboard
                    </Nav.Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Nav.Link 
                      as={Link} 
                      to="/tests"
                      className="sci-fi-nav-link"
                      style={{
                        fontFamily: 'Orbitron, sans-serif',
                        color: 'var(--neon-purple)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '0.9rem',
                      }}
                    >
                      Quantum Tests
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
                      fontFamily: 'Orbitron, sans-serif',
                      color: 'var(--neon-green)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}>
                      <span style={{ color: 'var(--neon-cyan)' }}>&gt;</span> NEURAL_{user.firstName.toUpperCase()}
                    </span>
                  }
                  id="user-dropdown" 
                  align="end"
                  className="sci-fi-nav-link"
                >
                  <motion.div whileHover={{ x: 5, backgroundColor: 'rgba(0, 255, 255, 0.1)' }}>
                    <NavDropdown.Item 
                      as={Link} 
                      to="/profile"
                      style={{
                        fontFamily: 'Roboto Mono, monospace',
                        color: 'var(--neon-cyan)',
                        background: 'var(--dark-surface)',
                        border: '1px solid rgba(0, 255, 255, 0.2)',
                        borderRadius: '0',
                      }}
                    >
                      <span style={{ color: 'var(--neon-green)' }}>&gt;</span> Profile Interface
                    </NavDropdown.Item>
                  </motion.div>
                  <motion.div whileHover={{ x: 5, backgroundColor: 'rgba(0, 255, 255, 0.1)' }}>
                    <NavDropdown.Item 
                      as={Link} 
                      to="/notes"
                      style={{
                        fontFamily: 'Roboto Mono, monospace',
                        color: 'var(--neon-cyan)',
                        background: 'var(--dark-surface)',
                        border: '1px solid rgba(0, 255, 255, 0.2)',
                        borderRadius: '0',
                      }}
                    >
                      <span style={{ color: 'var(--neon-green)' }}>&gt;</span> Neural Notes
                    </NavDropdown.Item>
                  </motion.div>
                  <NavDropdown.Divider style={{ borderColor: 'var(--neon-cyan)' }} />
                  <motion.div whileHover={{ x: 5, backgroundColor: 'rgba(255, 0, 128, 0.1)' }}>
                    <NavDropdown.Item 
                      onClick={handleLogout}
                      style={{
                        fontFamily: 'Roboto Mono, monospace',
                        color: 'var(--neon-pink)',
                        background: 'var(--dark-surface)',
                        border: '1px solid rgba(255, 0, 128, 0.2)',
                        borderRadius: '0',
                      }}
                    >
                      <span style={{ color: 'var(--neon-pink)' }}>&gt;</span> Disconnect Neural Link
                    </NavDropdown.Item>
                  </motion.div>
                </NavDropdown>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Nav.Link 
                      as={Link} 
                      to="/login"
                      className="sci-fi-nav-link"
                      style={{
                        fontFamily: 'Orbitron, sans-serif',
                        color: 'var(--neon-purple)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '0.9rem',
                      }}
                    >
                      Access Terminal
                    </Nav.Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Nav.Link 
                      as={Link} 
                      to="/register"
                      className="sci-fi-nav-link"
                      style={{
                        fontFamily: 'Orbitron, sans-serif',
                        color: 'var(--neon-green)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontSize: '0.9rem',
                      }}
                    >
                      Initialize Neural Link
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