import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/layout/Navigation';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import SubjectPage from './pages/SubjectPage';
import TestPage from './components/test/TestPage';
import FlashcardPage from './components/test/FlashcardPage';
import './App.css';
import './styles/study-theme.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="App">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/subjects" element={<Navigate to="/dashboard" replace />} />
              <Route path="/subjects/:subjectCode" element={<SubjectPage />} />
              <Route path="/test/:subjectCode" element={<TestPage />} />
              <Route path="/test/:subjectCode/:topicId" element={<TestPage />} />
              <Route path="/flashcards/:subjectCode" element={<FlashcardPage />} />
              <Route path="/flashcards/:subjectCode/:topicId" element={<FlashcardPage />} />
              {/* More routes will be added here */}
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
