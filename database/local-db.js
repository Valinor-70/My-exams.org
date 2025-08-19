import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'myexams.db');
const db = new Database(dbPath);

// Create tables for local database
export const initializeDatabase = () => {
  try {
    // Users table
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        progress TEXT DEFAULT '{}',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Subjects table
    db.exec(`
      CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        description TEXT,
        topics TEXT DEFAULT '[]',
        unlocked BOOLEAN DEFAULT false
      )
    `);

    // Questions table
    db.exec(`
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_code TEXT NOT NULL,
        topic TEXT NOT NULL,
        question TEXT NOT NULL,
        type TEXT NOT NULL,
        options TEXT,
        correct_answer TEXT NOT NULL,
        explanation TEXT,
        difficulty TEXT DEFAULT 'medium'
      )
    `);

    // Test results table
    db.exec(`
      CREATE TABLE IF NOT EXISTS test_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        subject_code TEXT NOT NULL,
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        duration INTEGER,
        answers TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    // Notes table
    db.exec(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        subject_code TEXT NOT NULL,
        topic TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    console.log('Local database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

// Seed initial data
export const seedDatabase = () => {
  try {
    // Insert subjects
    const subjects = [
      { code: 'mathematics', name: 'Mathematics', icon: '📊', description: 'Master numbers, algebra, geometry and more', unlocked: true },
      { code: 'biology', name: 'Biology', icon: '🧬', description: 'Explore life, cells, genetics and ecosystems', unlocked: true },
      { code: 'chemistry', name: 'Chemistry', icon: '⚗️', description: 'Understand atoms, molecules and reactions', unlocked: true },
      { code: 'physics', name: 'Physics', icon: '⚡', description: 'Discover forces, energy and the universe', unlocked: true },
      { code: 'english-lit', name: 'English Literature', icon: '📚', description: 'Analyze texts, poetry and drama', unlocked: true },
      { code: 'english-lang', name: 'English Language', icon: '✍️', description: 'Master writing, speaking and grammar', unlocked: true },
      { code: 'geography', name: 'Geography', icon: '🌍', description: 'Study places, environments and maps', unlocked: true },
      { code: 'geology', name: 'Geology', icon: '🗿', description: 'Explore rocks, minerals and Earth processes', unlocked: true },
      { code: 'computer-science', name: 'Computer Science', icon: '💻', description: 'Learn programming and computational thinking', unlocked: true },
      { code: 'religious-education', name: 'Religious Education', icon: '🕊️', description: 'Study beliefs, ethics and worldviews', unlocked: true },
      { code: 'history', name: 'History', icon: '🏛️', description: 'Explore past events and civilizations', unlocked: true }
    ];

    const insertSubject = db.prepare(`
      INSERT OR REPLACE INTO subjects (code, name, icon, description, unlocked) 
      VALUES (?, ?, ?, ?, ?)
    `);

    subjects.forEach(subject => {
      insertSubject.run(subject.code, subject.name, subject.icon, subject.description, subject.unlocked ? 1 : 0);
    });

    console.log('Database seeded successfully');
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    return false;
  }
};

// Database operations
export const getDatabase = () => db;

export const getAllSubjects = () => {
  try {
    const stmt = db.prepare('SELECT * FROM subjects ORDER BY name');
    return stmt.all();
  } catch (error) {
    console.error('Error getting subjects:', error);
    return [];
  }
};

export const getSubjectByCode = (code) => {
  try {
    const stmt = db.prepare('SELECT * FROM subjects WHERE code = ?');
    return stmt.get(code);
  } catch (error) {
    console.error('Error getting subject:', error);
    return null;
  }
};

export const createUser = (userData) => {
  try {
    const stmt = db.prepare(`
      INSERT INTO users (firstName, lastName, email, password) 
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(userData.firstName, userData.lastName, userData.email, userData.password);
    return { id: result.lastInsertRowid, ...userData };
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const getUserByEmail = (email) => {
  try {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const getUserById = (id) => {
  try {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Initialize database on import
initializeDatabase();
seedDatabase();

export default db;