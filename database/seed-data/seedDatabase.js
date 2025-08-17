import mongoose from 'mongoose';
import Subject from '../models/Subject.js';
import Question from '../models/Question.js';
import dotenv from 'dotenv';

dotenv.config();

const subjects = [
  {
    name: 'Mathematics',
    code: 'maths',
    description: 'GCSE Mathematics covering algebra, geometry, statistics, and number theory',
    color: '#28a745',
    icon: 'calculator',
    topics: [
      {
        name: 'Algebra',
        slug: 'algebra',
        description: 'Solving equations, factoring, and algebraic manipulation',
        content: {
          explanation: 'Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols. In algebra, those symbols (often letters) represent quantities without fixed values, known as variables.',
          examples: [
            'Solve for x: 2x + 5 = 15. Answer: x = 5',
            'Factor: x² - 9. Answer: (x + 3)(x - 3)',
            'Expand: (x + 4)². Answer: x² + 8x + 16'
          ],
          keyPoints: [
            'Variables represent unknown quantities',
            'Equations show relationships between variables',
            'Use inverse operations to solve equations',
            'BIDMAS/BODMAS order of operations applies'
          ],
          summary: 'Algebra provides tools for solving problems with unknown values by using symbols and mathematical operations.'
        },
        difficulty: 'Intermediate',
        estimatedTime: 45
      },
      {
        name: 'Geometry',
        slug: 'geometry',
        description: 'Shapes, angles, area, volume, and geometric proofs',
        content: {
          explanation: 'Geometry is the branch of mathematics concerned with the properties and relations of points, lines, surfaces, solids, and higher dimensional analogs.',
          examples: [
            'Area of circle: π × r². For radius 5cm: π × 25 = 78.5cm²',
            'Angle sum in triangle: Always 180°',
            'Pythagoras theorem: a² + b² = c²'
          ],
          keyPoints: [
            'Learn formulas for areas and volumes',
            'Understand angle relationships',
            'Practice using Pythagoras theorem',
            'Know properties of different shapes'
          ],
          summary: 'Geometry helps us understand spatial relationships and calculate measurements of shapes and solids.'
        },
        difficulty: 'Intermediate',
        estimatedTime: 50
      }
    ]
  },
  {
    name: 'Biology',
    code: 'biology',
    description: 'GCSE Biology covering cells, genetics, ecology, and human biology',
    color: '#20c997',
    icon: 'leaf',
    topics: [
      {
        name: 'Cell Biology',
        slug: 'cell-biology',
        description: 'Cell structure, function, and processes',
        content: {
          explanation: 'Cells are the basic units of life. All living organisms are made up of one or more cells, which carry out the essential functions of life.',
          examples: [
            'Plant cells have chloroplasts for photosynthesis',
            'Animal cells have centrosomes for cell division',
            'Both have nuclei containing DNA'
          ],
          keyPoints: [
            'Cell membrane controls what enters and exits',
            'Nucleus contains genetic material (DNA)',
            'Mitochondria produce energy (ATP)',
            'Plant cells have cell walls and chloroplasts'
          ],
          summary: 'Understanding cell structure and function is fundamental to all biology topics.'
        },
        difficulty: 'Beginner',
        estimatedTime: 40
      },
      {
        name: 'Genetics',
        slug: 'genetics',
        description: 'Inheritance, DNA, and genetic variation',
        content: {
          explanation: 'Genetics is the study of heredity and the variation of inherited characteristics. It explains how traits are passed from parents to offspring.',
          examples: [
            'Dominant alleles are expressed over recessive ones',
            'Punnett squares predict offspring ratios',
            'DNA carries genetic information in sequences'
          ],
          keyPoints: [
            'Genes are sections of DNA that code for traits',
            'Alleles are different versions of the same gene',
            'Dominant alleles mask recessive alleles',
            'Genetic variation leads to evolution'
          ],
          summary: 'Genetics explains inheritance patterns and the molecular basis of heredity.'
        },
        difficulty: 'Advanced',
        estimatedTime: 55
      }
    ]
  },
  {
    name: 'Chemistry',
    code: 'chemistry',
    description: 'GCSE Chemistry covering atoms, bonding, reactions, and analysis',
    color: '#6f42c1',
    icon: 'flask',
    topics: [
      {
        name: 'Atomic Structure',
        slug: 'atomic-structure',
        description: 'Atoms, elements, and the periodic table',
        content: {
          explanation: 'Atoms are the smallest units of matter that retain the properties of an element. They consist of protons, neutrons, and electrons.',
          examples: [
            'Carbon has 6 protons, 6 neutrons, 6 electrons',
            'Electron shells: 2 in first, 8 in second, 8 in third',
            'Atomic number = number of protons'
          ],
          keyPoints: [
            'Protons have positive charge, electrons negative',
            'Neutrons have no charge',
            'Electrons orbit in shells around the nucleus',
            'Periodic table arranges elements by atomic number'
          ],
          summary: 'Atomic structure explains the building blocks of all matter and chemical behavior.'
        },
        difficulty: 'Beginner',
        estimatedTime: 35
      }
    ]
  },
  {
    name: 'Physics',
    code: 'physics',
    description: 'GCSE Physics covering forces, energy, waves, and electricity',
    color: '#dc3545',
    icon: 'bolt',
    topics: [
      {
        name: 'Forces and Motion',
        slug: 'forces-motion',
        description: 'Newton\'s laws, velocity, acceleration, and momentum',
        content: {
          explanation: 'Forces cause changes in motion. Newton\'s laws describe the relationship between forces acting on a body and its motion.',
          examples: [
            'F = ma (Force = mass × acceleration)',
            'Every action has an equal and opposite reaction',
            'Objects at rest stay at rest unless acted upon by a force'
          ],
          keyPoints: [
            'Force is measured in Newtons (N)',
            'Acceleration = change in velocity / time',
            'Momentum = mass × velocity',
            'Forces can be balanced or unbalanced'
          ],
          summary: 'Understanding forces and motion is essential for describing how objects move and interact.'
        },
        difficulty: 'Intermediate',
        estimatedTime: 45
      }
    ]
  },
  {
    name: 'English Literature',
    code: 'english-lit',
    description: 'GCSE English Literature covering poetry, prose, and drama analysis',
    color: '#fd7e14',
    icon: 'book-open',
    topics: [
      {
        name: 'Poetry Analysis',
        slug: 'poetry-analysis',
        description: 'Techniques for analyzing poems, themes, and literary devices',
        content: {
          explanation: 'Poetry analysis involves examining the structure, language, and themes of poems to understand their meaning and effect.',
          examples: [
            'Metaphor: comparing two things without using "like" or "as"',
            'Alliteration: repetition of consonant sounds',
            'Rhyme scheme: pattern of rhymes (ABAB, AABB, etc.)'
          ],
          keyPoints: [
            'Identify literary devices and their effects',
            'Consider the poem\'s structure and form',
            'Analyze themes and their development',
            'Understand historical and cultural context'
          ],
          summary: 'Poetry analysis helps us appreciate the craft of poetry and understand deeper meanings.'
        },
        difficulty: 'Intermediate',
        estimatedTime: 40
      }
    ]
  },
  {
    name: 'English Language',
    code: 'english-lang',
    description: 'GCSE English Language covering reading, writing, and communication skills',
    color: '#17a2b8',
    icon: 'pen',
    topics: [
      {
        name: 'Creative Writing',
        slug: 'creative-writing',
        description: 'Narrative techniques, character development, and descriptive writing',
        content: {
          explanation: 'Creative writing involves crafting original stories, descriptions, and narratives using various literary techniques.',
          examples: [
            'Show don\'t tell: "Her hands trembled" vs "She was nervous"',
            'Sensory details: describing what characters see, hear, smell, taste, touch',
            'Dialogue: making characters speak naturally and distinctively'
          ],
          keyPoints: [
            'Use varied sentence structures',
            'Create engaging openings and endings',
            'Develop characters through actions and dialogue',
            'Use figurative language effectively'
          ],
          summary: 'Creative writing skills help express ideas effectively and engage readers through compelling narratives.'
        },
        difficulty: 'Intermediate',
        estimatedTime: 50
      }
    ]
  },
  {
    name: 'Geography',
    code: 'geography',
    description: 'GCSE Geography covering physical and human geography',
    color: '#28a745',
    icon: 'globe',
    topics: [
      {
        name: 'Climate Change',
        slug: 'climate-change',
        description: 'Causes, effects, and responses to global climate change',
        content: {
          explanation: 'Climate change refers to long-term shifts in global temperatures and weather patterns, primarily caused by human activities.',
          examples: [
            'Greenhouse gases trap heat in the atmosphere',
            'Rising sea levels threaten coastal areas',
            'Extreme weather events become more frequent'
          ],
          keyPoints: [
            'Human activities increase greenhouse gases',
            'Temperature rise affects ice caps and sea levels',
            'Mitigation and adaptation strategies are needed',
            'International cooperation is essential'
          ],
          summary: 'Understanding climate change is crucial for addressing one of the biggest challenges facing humanity.'
        },
        difficulty: 'Intermediate',
        estimatedTime: 45
      }
    ]
  },
  {
    name: 'Geology',
    code: 'geology',
    description: 'GCSE Geology covering rocks, minerals, and Earth processes',
    color: '#6c757d',
    icon: 'mountain',
    topics: [
      {
        name: 'Rock Cycle',
        slug: 'rock-cycle',
        description: 'Formation and transformation of igneous, sedimentary, and metamorphic rocks',
        content: {
          explanation: 'The rock cycle describes the process by which rocks are continuously formed, broken down, and reformed through geological processes.',
          examples: [
            'Igneous rocks form from cooling magma/lava',
            'Sedimentary rocks form from compressed sediments',
            'Metamorphic rocks form under heat and pressure'
          ],
          keyPoints: [
            'Three main types of rocks exist',
            'Rocks can transform from one type to another',
            'Weathering and erosion break down rocks',
            'Plate tectonics drive rock formation'
          ],
          summary: 'The rock cycle shows how Earth\'s materials are continuously recycled through geological processes.'
        },
        difficulty: 'Beginner',
        estimatedTime: 35
      }
    ]
  },
  {
    name: 'Computer Science',
    code: 'computer-science',
    description: 'GCSE Computer Science covering programming, algorithms, and systems',
    color: '#007bff',
    icon: 'laptop-code',
    topics: [
      {
        name: 'Programming Fundamentals',
        slug: 'programming-fundamentals',
        description: 'Variables, data types, control structures, and basic algorithms',
        content: {
          explanation: 'Programming fundamentals are the basic concepts and constructs used in all programming languages to create software.',
          examples: [
            'Variables store data: age = 16',
            'If statements make decisions: if age >= 18 then "adult"',
            'Loops repeat actions: for i = 1 to 10 do print(i)'
          ],
          keyPoints: [
            'Variables store and manipulate data',
            'Selection statements control program flow',
            'Iteration allows repetition of code',
            'Algorithms are step-by-step solutions'
          ],
          summary: 'Programming fundamentals provide the building blocks for creating any software program.'
        },
        difficulty: 'Beginner',
        estimatedTime: 60
      }
    ]
  },
  {
    name: 'Religious Education',
    code: 'religious-education',
    description: 'GCSE Religious Education covering world religions and ethical issues',
    color: '#6f42c1',
    icon: 'cross',
    topics: [
      {
        name: 'Ethics and Morality',
        slug: 'ethics-morality',
        description: 'Moral decision-making and religious perspectives on ethical issues',
        content: {
          explanation: 'Ethics and morality deal with questions of right and wrong behavior, and how religious teachings guide moral decision-making.',
          examples: [
            'Golden Rule: treat others as you want to be treated',
            'Sanctity of life: all life is sacred',
            'Justice: fairness and equality for all'
          ],
          keyPoints: [
            'Religious texts provide moral guidance',
            'Different religions have similar core values',
            'Ethical dilemmas require careful consideration',
            'Actions have consequences for individuals and society'
          ],
          summary: 'Understanding ethics and morality helps us make informed decisions about right and wrong.'
        },
        difficulty: 'Intermediate',
        estimatedTime: 40
      }
    ]
  },
  {
    name: 'History',
    code: 'history',
    description: 'GCSE History covering significant events, people, and periods',
    color: '#dc3545',
    icon: 'landmark',
    topics: [
      {
        name: 'World War II',
        slug: 'world-war-ii',
        description: 'Causes, events, and consequences of the Second World War',
        content: {
          explanation: 'World War II (1939-1945) was a global conflict that involved most of the world\'s nations and resulted in significant political and social changes.',
          examples: [
            'Invasion of Poland triggered Britain\'s declaration of war',
            'D-Day landings marked the beginning of the end',
            'Holocaust demonstrated the horrors of genocide'
          ],
          keyPoints: [
            'Multiple causes led to the outbreak of war',
            'Technology and tactics evolved rapidly',
            'Civilian populations were heavily affected',
            'The war reshaped the global political order'
          ],
          summary: 'World War II was a defining moment in modern history with lasting impacts on international relations.'
        },
        difficulty: 'Intermediate',
        estimatedTime: 50
      }
    ]
  }
];

const sampleQuestions = [
  // Maths - Algebra
  {
    subject: 'Mathematics',
    topic: 'Algebra',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'Solve for x: 3x + 7 = 22',
    options: [
      { text: 'x = 3', isCorrect: false },
      { text: 'x = 5', isCorrect: true },
      { text: 'x = 7', isCorrect: false },
      { text: 'x = 9', isCorrect: false }
    ],
    explanation: 'Subtract 7 from both sides: 3x = 15. Then divide by 3: x = 5.',
    points: 1
  },
  {
    subject: 'Mathematics',
    topic: 'Algebra',
    type: 'short-answer',
    difficulty: 'medium',
    question: 'Expand and simplify: (x + 3)(x - 2)',
    correctAnswer: 'x² + x - 6',
    explanation: 'Use FOIL: x² - 2x + 3x - 6 = x² + x - 6',
    points: 2
  },
  // Biology - Cell Biology
  {
    subject: 'Biology',
    topic: 'Cell Biology',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'Which organelle controls what enters and exits the cell?',
    options: [
      { text: 'Nucleus', isCorrect: false },
      { text: 'Cell membrane', isCorrect: true },
      { text: 'Mitochondria', isCorrect: false },
      { text: 'Chloroplast', isCorrect: false }
    ],
    explanation: 'The cell membrane is selectively permeable and controls the movement of substances.',
    points: 1
  },
  {
    subject: 'Biology',
    topic: 'Cell Biology',
    type: 'true-false',
    difficulty: 'easy',
    question: 'Plant cells have cell walls but animal cells do not.',
    correctAnswer: 'true',
    explanation: 'Plant cells have rigid cell walls made of cellulose, while animal cells only have flexible cell membranes.',
    points: 1
  },
  // Chemistry - Atomic Structure
  {
    subject: 'Chemistry',
    topic: 'Atomic Structure',
    type: 'multiple-choice',
    difficulty: 'easy',
    question: 'What is the atomic number of carbon?',
    options: [
      { text: '6', isCorrect: true },
      { text: '8', isCorrect: false },
      { text: '12', isCorrect: false },
      { text: '14', isCorrect: false }
    ],
    explanation: 'Carbon has 6 protons, which determines its atomic number.',
    points: 1
  },
  // Physics - Forces and Motion
  {
    subject: 'Physics',
    topic: 'Forces and Motion',
    type: 'short-answer',
    difficulty: 'medium',
    question: 'Calculate the force needed to accelerate a 5kg object at 2m/s²',
    correctAnswer: '10N',
    explanation: 'Using F = ma: F = 5kg × 2m/s² = 10N',
    points: 2
  },
  // English Literature - Poetry Analysis
  {
    subject: 'English Literature',
    topic: 'Poetry Analysis',
    type: 'multiple-choice',
    difficulty: 'medium',
    question: 'What literary device compares two things without using "like" or "as"?',
    options: [
      { text: 'Simile', isCorrect: false },
      { text: 'Metaphor', isCorrect: true },
      { text: 'Alliteration', isCorrect: false },
      { text: 'Personification', isCorrect: false }
    ],
    explanation: 'A metaphor directly compares two things, while a simile uses "like" or "as".',
    points: 1
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myexams');
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Subject.deleteMany({});
    await Question.deleteMany({});
    console.log('Cleared existing data');

    // Insert subjects
    await Subject.insertMany(subjects);
    console.log('Inserted subjects');

    // Insert questions
    await Question.insertMany(sampleQuestions);
    console.log('Inserted sample questions');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

export default seedDatabase;

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}