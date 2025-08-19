import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/layout/Navigation';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import TestPage from './components/test/TestPage';
import FlashcardPage from './components/test/FlashcardPage';

// Import individual subject pages
import {
  MathematicsPage,
  BiologyPage,
  ChemistryPage,
  PhysicsPage,
  ComputerSciencePage,
  EnglishLiteraturePage,
  EnglishLanguagePage,
  GeographyPage,
  GeologyPage,
  HistoryPage,
  ReligiousEducationPage
} from './pages/subjects';

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
              
              {/* Individual subject pages */}
              <Route path="/subjects/mathematics" element={<MathematicsPage />} />
              <Route path="/subjects/biology" element={<BiologyPage />} />
              <Route path="/subjects/chemistry" element={<ChemistryPage />} />
              <Route path="/subjects/physics" element={<PhysicsPage />} />
              <Route path="/subjects/computer-science" element={<ComputerSciencePage />} />
              <Route path="/subjects/english-lit" element={<EnglishLiteraturePage />} />
              <Route path="/subjects/english-lang" element={<EnglishLanguagePage />} />
              <Route path="/subjects/geography" element={<GeographyPage />} />
              <Route path="/subjects/geology" element={<GeologyPage />} />
              <Route path="/subjects/history" element={<HistoryPage />} />
              <Route path="/subjects/religious-education" element={<ReligiousEducationPage />} />
              
              {/* Test and flashcard routes */}
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
