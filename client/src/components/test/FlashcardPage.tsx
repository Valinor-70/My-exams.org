import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ProgressBar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topic: string;
  subject: string;
}

const FlashcardPage: React.FC = () => {
  const { subjectCode, topicId } = useParams<{ subjectCode: string; topicId?: string }>();
  const navigate = useNavigate();
  
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [reviewCards, setReviewCards] = useState<Set<string>>(new Set());

  // Mock flashcard data - in real app would come from API
  const generateFlashcards = (subject: string, topic?: string): FlashcardData[] => {
    const flashcardBank: { [key: string]: FlashcardData[] } = {
      'mathematics': [
        {
          id: '1',
          question: 'What is the Pythagorean theorem?',
          answer: 'a² + b² = c², where c is the hypotenuse and a and b are the other two sides of a right triangle.',
          difficulty: 'Intermediate',
          topic: 'Coordinate Geometry',
          subject: 'Mathematics'
        },
        {
          id: '2',
          question: 'What is the quadratic formula?',
          answer: 'x = (-b ± √(b² - 4ac)) / 2a, used to solve quadratic equations of the form ax² + bx + c = 0.',
          difficulty: 'Advanced',
          topic: 'Quadratic Equations',
          subject: 'Mathematics'
        },
        {
          id: '3',
          question: 'What is the formula for the area of a circle?',
          answer: 'A = πr², where r is the radius of the circle.',
          difficulty: 'Beginner',
          topic: 'Geometry',
          subject: 'Mathematics'
        },
        {
          id: '4',
          question: 'What is a prime number?',
          answer: 'A natural number greater than 1 that has no positive divisors other than 1 and itself.',
          difficulty: 'Beginner',
          topic: 'Number Systems',
          subject: 'Mathematics'
        }
      ],
      'biology': [
        {
          id: '1',
          question: 'What is photosynthesis?',
          answer: 'The process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen. Equation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂',
          difficulty: 'Intermediate',
          topic: 'Plant Biology',
          subject: 'Biology'
        },
        {
          id: '2',
          question: 'What is DNA?',
          answer: 'Deoxyribonucleic acid - a molecule that carries genetic instructions for development, functioning, and reproduction of all living organisms.',
          difficulty: 'Beginner',
          topic: 'Genetics',
          subject: 'Biology'
        },
        {
          id: '3',
          question: 'What is natural selection?',
          answer: 'The process by which organisms with favorable traits are more likely to survive and reproduce, passing these traits to their offspring.',
          difficulty: 'Advanced',
          topic: 'Evolution',
          subject: 'Biology'
        },
        {
          id: '4',
          question: 'What is the function of mitochondria?',
          answer: 'Mitochondria are the powerhouses of the cell, producing ATP (energy) through cellular respiration.',
          difficulty: 'Beginner',
          topic: 'Cell Structure',
          subject: 'Biology'
        }
      ],
      'computer-science': [
        {
          id: '1',
          question: 'What is an algorithm?',
          answer: 'A step-by-step procedure or formula for solving a problem or completing a task.',
          difficulty: 'Beginner',
          topic: 'Programming Fundamentals',
          subject: 'Computer Science'
        },
        {
          id: '2',
          question: 'What is the difference between a stack and a queue?',
          answer: 'Stack follows LIFO (Last In, First Out) principle, while Queue follows FIFO (First In, First Out) principle.',
          difficulty: 'Intermediate',
          topic: 'Data Structures',
          subject: 'Computer Science'
        },
        {
          id: '3',
          question: 'What is binary search?',
          answer: 'An efficient algorithm for finding an item in a sorted list by repeatedly dividing the search interval in half.',
          difficulty: 'Advanced',
          topic: 'Algorithms',
          subject: 'Computer Science'
        },
        {
          id: '4',
          question: 'What is a variable in programming?',
          answer: 'A named storage location that can hold data and whose value can be changed during program execution.',
          difficulty: 'Beginner',
          topic: 'Programming Fundamentals',
          subject: 'Computer Science'
        }
      ],
      'chemistry': [
        {
          id: '1',
          question: 'What is an atom?',
          answer: 'The smallest unit of a chemical element, consisting of a nucleus (protons and neutrons) surrounded by electrons.',
          difficulty: 'Beginner',
          topic: 'Atomic Structure',
          subject: 'Chemistry'
        },
        {
          id: '2',
          question: 'What is a covalent bond?',
          answer: 'A chemical bond formed by the sharing of electrons between two atoms.',
          difficulty: 'Intermediate',
          topic: 'Chemical Bonding',
          subject: 'Chemistry'
        },
        {
          id: '3',
          question: 'What is pH?',
          answer: 'A scale from 0-14 that measures how acidic or basic a solution is. pH < 7 is acidic, pH = 7 is neutral, pH > 7 is basic.',
          difficulty: 'Intermediate',
          topic: 'Acids and Bases',
          subject: 'Chemistry'
        }
      ],
      'physics': [
        {
          id: '1',
          question: 'What is Newton\'s First Law of Motion?',
          answer: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
          difficulty: 'Beginner',
          topic: 'Forces and Motion',
          subject: 'Physics'
        },
        {
          id: '2',
          question: 'What is the formula for kinetic energy?',
          answer: 'KE = ½mv², where m is mass and v is velocity.',
          difficulty: 'Intermediate',
          topic: 'Energy',
          subject: 'Physics'
        },
        {
          id: '3',
          question: 'What is the speed of light?',
          answer: 'Approximately 3.00 × 10⁸ meters per second (or 300,000 km/s) in a vacuum.',
          difficulty: 'Intermediate',
          topic: 'Waves',
          subject: 'Physics'
        }
      ]
    };

    const subjectCards = flashcardBank[subject] || [];
    
    // Filter by topic if specified
    if (topic && topicId) {
      return subjectCards.filter(card => card.topic.toLowerCase().includes(topic.toLowerCase()));
    }
    
    return subjectCards;
  };

  useEffect(() => {
    if (subjectCode) {
      const generatedCards = generateFlashcards(subjectCode, topicId);
      setFlashcards(generatedCards);
    }
  }, [subjectCode, topicId]);

  const currentCard = flashcards[currentCardIndex];
  const progress = flashcards.length > 0 ? ((currentCardIndex + 1) / flashcards.length) * 100 : 0;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleMarkKnown = () => {
    setKnownCards(prev => new Set([...prev, currentCard.id]));
    if (currentCardIndex < flashcards.length - 1) {
      handleNext();
    }
  };

  const handleMarkReview = () => {
    setReviewCards(prev => new Set([...prev, currentCard.id]));
    if (currentCardIndex < flashcards.length - 1) {
      handleNext();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'danger';
      default: return 'secondary';
    }
  };

  const getCardStatus = (cardId: string) => {
    if (knownCards.has(cardId)) return 'known';
    if (reviewCards.has(cardId)) return 'review';
    return 'unseen';
  };

  if (flashcards.length === 0) {
    return (
      <Container className="py-5 text-center">
        <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
          <Card.Body className="p-5">
            <h4>📚 Flashcards Coming Soon!</h4>
            <p className="text-muted">We're preparing flashcards for this subject. Please check back later.</p>
            <Button variant="primary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ minHeight: '100vh', background: 'var(--warm-beige)', padding: '2rem 0' }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            {/* Header */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={8}>
                    <div className="d-flex align-items-center">
                      <h4 className="mb-0 me-3">📚 Flashcards</h4>
                      <Badge bg={getDifficultyColor(currentCard.difficulty)} className="me-2">
                        {currentCard.difficulty}
                      </Badge>
                      <span className="text-muted">{currentCard.topic}</span>
                    </div>
                  </Col>
                  <Col md={4} className="text-end">
                    <span className="badge bg-primary">
                      {currentCardIndex + 1} of {flashcards.length}
                    </span>
                  </Col>
                </Row>
                <ProgressBar now={progress} className="mt-3" style={{ height: '8px' }} />
                
                {/* Progress Summary */}
                <Row className="mt-3">
                  <Col className="text-center">
                    <small className="text-success me-3">
                      ✓ Known: {knownCards.size}
                    </small>
                    <small className="text-warning me-3">
                      ⚠️ Review: {reviewCards.size}
                    </small>
                    <small className="text-muted">
                      👁️ Remaining: {flashcards.length - knownCards.size - reviewCards.size}
                    </small>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Flashcard */}
            <Row className="justify-content-center">
              <Col md={8}>
                <motion.div
                  style={{ perspective: '1000px' }}
                  className="mb-4"
                >
                  <motion.div
                    style={{
                      transformStyle: 'preserve-3d',
                      height: '400px',
                      position: 'relative',
                    }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Front of card */}
                    <Card
                      className="shadow-lg border-0 position-absolute w-100 h-100"
                      style={{
                        borderRadius: '15px',
                        backfaceVisibility: 'hidden',
                        background: getCardStatus(currentCard.id) === 'known' ? 
                          'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)' :
                          getCardStatus(currentCard.id) === 'review' ?
                          'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)' :
                          'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                        cursor: 'pointer'
                      }}
                      onClick={handleFlip}
                    >
                      <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-4">
                        <div className="mb-3">
                          <span className="display-4">🤔</span>
                        </div>
                        <h3 className="mb-4" style={{ color: 'var(--ink-black)' }}>
                          {currentCard.question}
                        </h3>
                        <p className="text-muted">Click to reveal answer</p>
                      </Card.Body>
                    </Card>

                    {/* Back of card */}
                    <Card
                      className="shadow-lg border-0 position-absolute w-100 h-100"
                      style={{
                        borderRadius: '15px',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                        cursor: 'pointer'
                      }}
                      onClick={handleFlip}
                    >
                      <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-4">
                        <div className="mb-3">
                          <span className="display-4">💡</span>
                        </div>
                        <h5 className="mb-3" style={{ color: 'var(--ink-black)' }}>
                          {currentCard.answer}
                        </h5>
                        <p className="text-muted">Click to see question again</p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </motion.div>

                {/* Controls */}
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col>
                        <Button
                          variant="outline-secondary"
                          onClick={handlePrevious}
                          disabled={currentCardIndex === 0}
                        >
                          ← Previous
                        </Button>
                      </Col>
                      
                      {isFlipped && (
                        <Col className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={handleMarkReview}
                                disabled={reviewCards.has(currentCard.id)}
                              >
                                📚 Need Review
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={handleMarkKnown}
                                disabled={knownCards.has(currentCard.id)}
                              >
                                ✅ I Know This
                              </Button>
                            </motion.div>
                          </div>
                        </Col>
                      )}
                      
                      <Col className="text-end">
                        {currentCardIndex === flashcards.length - 1 ? (
                          <Button
                            variant="success"
                            onClick={() => navigate(`/subjects/${subjectCode}`)}
                          >
                            Complete ✓
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={handleNext}
                          >
                            Next →
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Session Summary */}
                {knownCards.size + reviewCards.size > 0 && (
                  <Card className="mt-4 border-0 shadow-sm">
                    <Card.Body>
                      <h6 className="mb-3">📊 Session Progress</h6>
                      <Row>
                        <Col md={6}>
                          <div className="d-flex justify-content-between">
                            <span>Known cards:</span>
                            <Badge bg="success">{knownCards.size}</Badge>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="d-flex justify-content-between">
                            <span>Need review:</span>
                            <Badge bg="warning">{reviewCards.size}</Badge>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default FlashcardPage;