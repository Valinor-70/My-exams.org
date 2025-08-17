import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const subjects = [
    { name: 'Mathematics', code: 'maths', icon: '🔢' },
    { name: 'Biology', code: 'biology', icon: '🧬' },
    { name: 'Chemistry', code: 'chemistry', icon: '⚗️' },
    { name: 'Physics', code: 'physics', icon: '⚡' },
    { name: 'English Literature', code: 'english-lit', icon: '📚' },
    { name: 'English Language', code: 'english-lang', icon: '✍️' },
    { name: 'Geography', code: 'geography', icon: '🌍' },
    { name: 'Geology', code: 'geology', icon: '🏔️' },
    { name: 'Computer Science', code: 'computer-science', icon: '💻' },
    { name: 'Religious Education', code: 'religious-education', icon: '✝️' },
    { name: 'History', code: 'history', icon: '🏛️' },
  ];

  return (
    <Navbar expand="lg" bg={theme} variant={theme} sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🎓 MyExams.org
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            
            {user && (
              <>
                <NavDropdown title="Subjects" id="subjects-dropdown">
                  {subjects.map((subject) => (
                    <NavDropdown.Item
                      key={subject.code}
                      as={Link}
                      to={`/subjects/${subject.code}`}
                    >
                      {subject.icon} {subject.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
                
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/tests">Tests</Nav.Link>
              </>
            )}
          </Nav>
          
          <Nav>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleTheme}
              className="me-2"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>
            
            {user ? (
              <NavDropdown title={`Hi, ${user.firstName}`} id="user-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/notes">
                  My Notes
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;