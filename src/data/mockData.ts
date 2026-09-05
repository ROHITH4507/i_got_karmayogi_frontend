export interface User {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  designation: string;
  organization: string;
  level: number;
  levelTitle: string;
  xp: number;
  xpToNext: number;
  streak: number;
  avatar: string;
  joinDate: string;
  learningHours: number;
  coursesCompleted: number;
  quizzesCompleted: number;
  averageQuizScore: number;
  certificatesEarned: number;
  competenciesAcquired: number;
  weeklyGoalHours: number;
  weeklyGoalCourses: number;
  weeklyGoalQuizzes: number;
  weeklyHoursDone: number;
  weeklyCoursesDone: number;
  weeklyQuizzesDone: number;
  preferences: {
    interests: string[];
    preferredDuration: string;
    preferredDifficulty: string;
    preferredLanguage: string;
    reminderTime: string;
    dailyReminder: boolean;
    weeklyReminder: boolean;
  };
}

export const currentUser: User = {
  id: 'u001',
  name: 'Arjun Sharma',
  email: 'arjun.sharma@gov.in',
  employeeId: 'GOV-2021-45821',
  department: 'Digital Services',
  designation: 'Assistant Director',
  organization: 'Ministry of Electronics & IT',
  level: 8,
  levelTitle: 'Knowledge Explorer',
  xp: 2450,
  xpToNext: 3000,
  streak: 12,
  avatar: 'AS',
  joinDate: '2024-03-15',
  learningHours: 24.5,
  coursesCompleted: 8,
  quizzesCompleted: 14,
  averageQuizScore: 82,
  certificatesEarned: 5,
  competenciesAcquired: 4,
  weeklyGoalHours: 6,
  weeklyGoalCourses: 3,
  weeklyGoalQuizzes: 5,
  weeklyHoursDone: 4.5,
  weeklyCoursesDone: 2,
  weeklyQuizzesDone: 4,
  preferences: {
    interests: ['Digital Governance', 'Data Analytics', 'Cybersecurity'],
    preferredDuration: '30-60 min',
    preferredDifficulty: 'Intermediate',
    preferredLanguage: 'English',
    reminderTime: '09:00',
    dailyReminder: true,
    weeklyReminder: true,
  },
};

export interface Competency {
  id: string;
  name: string;
  score: number;
  level: 'Strong' | 'Developing' | 'Needs Improvement';
  icon: string;
  color: string;
  beforeScore: number;
}

export const competencies: Competency[] = [
  { id: 'c1', name: 'Digital Governance', score: 90, level: 'Strong', icon: 'Landmark', color: '#2563eb', beforeScore: 65 },
  { id: 'c2', name: 'Leadership', score: 72, level: 'Developing', icon: 'Users', color: '#0891b2', beforeScore: 55 },
  { id: 'c3', name: 'Communication', score: 78, level: 'Developing', icon: 'MessageSquare', color: '#16a34a', beforeScore: 60 },
  { id: 'c4', name: 'Data Analytics', score: 51, level: 'Needs Improvement', icon: 'BarChart3', color: '#d97706', beforeScore: 35 },
  { id: 'c5', name: 'Cybersecurity', score: 42, level: 'Needs Improvement', icon: 'ShieldCheck', color: '#dc2626', beforeScore: 28 },
  { id: 'c6', name: 'Project Management', score: 68, level: 'Developing', icon: 'ClipboardList', color: '#7c3aed', beforeScore: 50 },
];

export interface Course {
  id: string;
  title: string;
  description: string;
  provider: string;
  duration: string;
  durationHours: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolled: number;
  progress: number;
  competency: string;
  skills: string[];
  type: 'Course' | 'Module' | 'Assessment';
  source: 'Karmasetu' | 'iGOT Karmayogi';
  language: string;
  recommended: boolean;
  thumbnail: string;
  icon: string;
}

export const courses: Course[] = [
  {
    id: 'course1',
    title: 'Digital Governance Fundamentals',
    description: 'Understand e-governance principles, digital service delivery, and citizen-centric design in government services.',
    provider: 'iGOT Karmayogi',
    duration: '4 hours',
    durationHours: 4,
    difficulty: 'Beginner',
    rating: 4.8,
    enrolled: 12450,
    progress: 100,
    competency: 'Digital Governance',
    skills: ['E-Governance', 'Digital Services', 'Citizen Engagement'],
    type: 'Course',
    source: 'iGOT Karmayogi',
    language: 'English',
    recommended: false,
    thumbnail: 'from-blue-500 to-blue-700',
    icon: 'Landmark',
  },
  {
    id: 'course2',
    title: 'Data Analytics for Government',
    description: 'Learn to analyze government data, create dashboards, and make data-driven policy decisions.',
    provider: 'iGOT Karmayogi',
    duration: '6 hours',
    durationHours: 6,
    difficulty: 'Intermediate',
    rating: 4.6,
    enrolled: 8230,
    progress: 100,
    competency: 'Data Analytics',
    skills: ['Data Analysis', 'Visualization', 'Policy Insights'],
    type: 'Course',
    source: 'iGOT Karmayogi',
    language: 'English',
    recommended: false,
    thumbnail: 'from-amber-500 to-orange-600',
    icon: 'BarChart3',
  },
  {
    id: 'course3',
    title: 'Data Visualization with Power BI',
    description: 'Master data visualization techniques to communicate insights effectively to stakeholders and citizens.',
    provider: 'Karmasetu',
    duration: '3 hours',
    durationHours: 3,
    difficulty: 'Intermediate',
    rating: 4.7,
    enrolled: 5640,
    progress: 45,
    competency: 'Data Analytics',
    skills: ['Power BI', 'Data Visualization', 'Dashboards'],
    type: 'Course',
    source: 'Karmasetu',
    language: 'English',
    recommended: true,
    thumbnail: 'from-cyan-500 to-blue-600',
    icon: 'TrendingUp',
  },
  {
    id: 'course4',
    title: 'Cybersecurity Essentials for Officers',
    description: 'Protect government systems from cyber threats. Learn security best practices and threat mitigation.',
    provider: 'iGOT Karmayogi',
    duration: '5 hours',
    durationHours: 5,
    difficulty: 'Intermediate',
    rating: 4.5,
    enrolled: 9870,
    progress: 0,
    competency: 'Cybersecurity',
    skills: ['Threat Analysis', 'Security Protocols', 'Risk Management'],
    type: 'Course',
    source: 'iGOT Karmayogi',
    language: 'English',
    recommended: true,
    thumbnail: 'from-red-500 to-rose-700',
    icon: 'ShieldCheck',
  },
  {
    id: 'course5',
    title: 'Effective Communication in Governance',
    description: 'Develop communication skills for inter-departmental coordination and public engagement.',
    provider: 'Karmasetu',
    duration: '2.5 hours',
    durationHours: 2.5,
    difficulty: 'Beginner',
    rating: 4.4,
    enrolled: 7120,
    progress: 100,
    competency: 'Communication',
    skills: ['Public Speaking', 'Written Communication', 'Stakeholder Management'],
    type: 'Course',
    source: 'Karmasetu',
    language: 'English',
    recommended: false,
    thumbnail: 'from-green-500 to-emerald-700',
    icon: 'MessageSquare',
  },
  {
    id: 'course6',
    title: 'Advanced Data Analytics & AI',
    description: 'Apply machine learning and AI techniques to government data for predictive governance.',
    provider: 'iGOT Karmayogi',
    duration: '8 hours',
    durationHours: 8,
    difficulty: 'Advanced',
    rating: 4.9,
    enrolled: 3450,
    progress: 0,
    competency: 'Data Analytics',
    skills: ['Machine Learning', 'AI in Governance', 'Predictive Analytics'],
    type: 'Course',
    source: 'iGOT Karmayogi',
    language: 'English',
    recommended: true,
    thumbnail: 'from-violet-500 to-purple-700',
    icon: 'BrainCircuit',
  },
  {
    id: 'course7',
    title: 'Project Management for Government Initiatives',
    description: 'Plan, execute, and monitor government projects using modern project management frameworks.',
    provider: 'iGOT Karmayogi',
    duration: '4.5 hours',
    durationHours: 4.5,
    difficulty: 'Intermediate',
    rating: 4.3,
    enrolled: 6780,
    progress: 30,
    competency: 'Project Management',
    skills: ['Agile', 'PMP Basics', 'Stakeholder Management'],
    type: 'Course',
    source: 'iGOT Karmayogi',
    language: 'English',
    recommended: false,
    thumbnail: 'from-indigo-500 to-blue-700',
    icon: 'ClipboardList',
  },
  {
    id: 'course8',
    title: 'Leadership in Public Administration',
    description: 'Build leadership capabilities for driving transformation in government organizations.',
    provider: 'Karmasetu',
    duration: '5 hours',
    durationHours: 5,
    difficulty: 'Advanced',
    rating: 4.7,
    enrolled: 4320,
    progress: 0,
    competency: 'Leadership',
    skills: ['Strategic Leadership', 'Change Management', 'Team Building'],
    type: 'Course',
    source: 'Karmasetu',
    language: 'English',
    recommended: true,
    thumbnail: 'from-teal-500 to-cyan-700',
    icon: 'Users',
  },
  {
    id: 'course9',
    title: 'Cyber Threat Intelligence',
    description: 'Advanced techniques for identifying and responding to sophisticated cyber threats in government networks.',
    provider: 'iGOT Karmayogi',
    duration: '6 hours',
    durationHours: 6,
    difficulty: 'Advanced',
    rating: 4.6,
    enrolled: 2180,
    progress: 0,
    competency: 'Cybersecurity',
    skills: ['Threat Intelligence', 'Incident Response', 'Network Security'],
    type: 'Course',
    source: 'iGOT Karmayogi',
    language: 'English',
    recommended: true,
    thumbnail: 'from-slate-600 to-slate-800',
    icon: 'Lock',
  },
  {
    id: 'course10',
    title: 'Digital India: Policies & Implementation',
    description: 'Explore Digital India initiatives and their implementation across government departments.',
    provider: 'iGOT Karmayogi',
    duration: '3.5 hours',
    durationHours: 3.5,
    difficulty: 'Beginner',
    rating: 4.5,
    enrolled: 11200,
    progress: 100,
    competency: 'Digital Governance',
    skills: ['Digital India', 'Policy Implementation', 'E-Governance'],
    type: 'Course',
    source: 'iGOT Karmayogi',
    language: 'English',
    recommended: false,
    thumbnail: 'from-blue-600 to-indigo-800',
    icon: 'Globe',
  },
  {
    id: 'course11',
    title: 'Citizen-Centric Service Design',
    description: 'Design government services that put citizens at the center of the experience.',
    provider: 'Karmasetu',
    duration: '2 hours',
    durationHours: 2,
    difficulty: 'Beginner',
    rating: 4.4,
    enrolled: 3890,
    progress: 0,
    competency: 'Digital Governance',
    skills: ['Service Design', 'UX Research', 'Citizen Engagement'],
    type: 'Course',
    source: 'Karmasetu',
    language: 'English',
    recommended: false,
    thumbnail: 'from-emerald-500 to-teal-700',
    icon: 'HeartHandshake',
  },
  {
    id: 'course12',
    title: 'Statistical Methods for Policy Analysis',
    description: 'Apply statistical techniques to evaluate policy impact and government program effectiveness.',
    provider: 'iGOT Karmayogi',
    duration: '7 hours',
    durationHours: 7,
    difficulty: 'Advanced',
    rating: 4.2,
    enrolled: 1670,
    progress: 0,
    competency: 'Data Analytics',
    skills: ['Statistics', 'Policy Analysis', 'Impact Assessment'],
    type: 'Course',
    source: 'iGOT Karmayogi',
    language: 'English',
    recommended: false,
    thumbnail: 'from-orange-500 to-red-600',
    icon: 'Calculator',
  },
];

export interface LearningPathModule {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  progress: number;
  status: 'Completed' | 'In Progress' | 'Recommended' | 'Locked';
  reason: string;
  skills: string[];
  competency: string;
  icon: string;
}

export const learningPath: LearningPathModule[] = [
  {
    id: 'lp1',
    title: 'Foundation: Digital Governance',
    difficulty: 'Beginner',
    duration: '4 hours',
    progress: 100,
    status: 'Completed',
    reason: 'Essential foundation for understanding digital governance frameworks in Indian government.',
    skills: ['E-Governance', 'Digital Services'],
    competency: 'Digital Governance',
    icon: 'Landmark',
  },
  {
    id: 'lp2',
    title: 'Data Analytics Basics',
    difficulty: 'Beginner',
    duration: '6 hours',
    progress: 100,
    status: 'Completed',
    reason: 'Builds foundational data skills needed before advancing to visualization and AI techniques.',
    skills: ['Data Analysis', 'Statistics'],
    competency: 'Data Analytics',
    icon: 'BarChart3',
  },
  {
    id: 'lp3',
    title: 'Data Visualization with Power BI',
    difficulty: 'Intermediate',
    duration: '3 hours',
    progress: 45,
    status: 'In Progress',
    reason: 'You have completed 45% of this course. Continuing will strengthen your data presentation skills.',
    skills: ['Power BI', 'Dashboards'],
    competency: 'Data Analytics',
    icon: 'TrendingUp',
  },
  {
    id: 'lp4',
    title: 'Cybersecurity Essentials for Officers',
    difficulty: 'Intermediate',
    duration: '5 hours',
    progress: 0,
    status: 'Recommended',
    reason: 'Your cybersecurity competency score is 42%. This course will help close the most critical gap in your profile.',
    skills: ['Threat Analysis', 'Security Protocols'],
    competency: 'Cybersecurity',
    icon: 'ShieldCheck',
  },
  {
    id: 'lp5',
    title: 'Advanced Data Analytics & AI',
    difficulty: 'Advanced',
    duration: '8 hours',
    progress: 0,
    status: 'Locked',
    reason: 'Complete Data Visualization first. This advanced module builds on your analytics foundation.',
    skills: ['Machine Learning', 'AI in Governance'],
    competency: 'Data Analytics',
    icon: 'BrainCircuit',
  },
  {
    id: 'lp6',
    title: 'Final Competency Assessment',
    difficulty: 'Advanced',
    duration: '2 hours',
    progress: 0,
    status: 'Locked',
    reason: 'Complete all preceding modules to unlock the final competency assessment.',
    skills: ['Assessment'],
    competency: 'Data Analytics',
    icon: 'Award',
  },
];

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  competency: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Quiz {
  id: string;
  title: string;
  sourceMaterial: string;
  questions: QuizQuestion[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  competency: string;
  createdAt: string;
}

export const sampleQuiz: Quiz = {
  id: 'quiz1',
  title: 'Data Analytics Fundamentals Quiz',
  sourceMaterial: 'Data Analytics for Government.pdf',
  difficulty: 'Intermediate',
  competency: 'Data Analytics',
  createdAt: '2026-09-03',
  questions: [
    {
      id: 'q1',
      question: 'Which statistical measure is most appropriate for understanding the central tendency of government expenditure data that contains extreme outliers?',
      options: ['Mean', 'Median', 'Mode', 'Range'],
      correctAnswer: 1,
      explanation: 'The median is resistant to outliers, making it the best measure of central tendency when extreme values are present in the dataset.',
      competency: 'Data Analytics',
      difficulty: 'Intermediate',
    },
    {
      id: 'q2',
      question: 'In the context of government data visualization, which chart type is best suited for showing the distribution of a single continuous variable?',
      options: ['Pie Chart', 'Bar Chart', 'Histogram', 'Line Chart'],
      correctAnswer: 2,
      explanation: 'A histogram displays the distribution of a continuous variable by grouping data into bins, making it ideal for this purpose.',
      competency: 'Data Analytics',
      difficulty: 'Beginner',
    },
    {
      id: 'q3',
      question: 'What is the primary purpose of a dashboard in government data analytics?',
      options: [
        'To store large datasets',
        'To provide a visual overview of key metrics and KPIs for decision-making',
        'To replace written reports entirely',
        'To encrypt sensitive government data',
      ],
      correctAnswer: 1,
      explanation: 'Dashboards consolidate key metrics and KPIs into visual formats, enabling quick decision-making by government officials.',
      competency: 'Data Analytics',
      difficulty: 'Beginner',
    },
    {
      id: 'q4',
      question: 'Which of the following is an example of predictive analytics in governance?',
      options: [
        'Summarizing last year\'s tax collection',
        'Forecasting revenue for the next fiscal year based on historical trends',
        'Creating a pie chart of department budgets',
        'Cleaning incomplete citizen survey data',
      ],
      correctAnswer: 1,
      explanation: 'Predictive analytics uses historical data and statistical models to forecast future outcomes, such as revenue projections.',
      competency: 'Data Analytics',
      difficulty: 'Intermediate',
    },
    {
      id: 'q5',
      question: 'When analyzing citizen feedback data, which technique helps identify underlying themes and sentiment?',
      options: ['Regression Analysis', 'Time Series Analysis', 'Natural Language Processing', 'Monte Carlo Simulation'],
      correctAnswer: 2,
      explanation: 'NLP techniques can extract sentiment and themes from unstructured citizen feedback text, enabling qualitative analysis at scale.',
      competency: 'Data Analytics',
      difficulty: 'Advanced',
    },
  ],
};

export interface Material {
  id: string;
  name: string;
  type: 'PDF' | 'PPT' | 'DOC' | 'TXT' | 'Image';
  size: string;
  uploadedAt: string;
  status: 'Processed' | 'Processing' | 'Failed';
  summary?: AISummary;
}

export interface AISummary {
  executiveSummary: string;
  keyConcepts: { title: string; description: string }[];
  importantPoints: string[];
  keyTerms: string[];
  learningObjectives: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const sampleMaterial: Material = {
  id: 'mat1',
  name: 'Data Analytics for Government.pdf',
  type: 'PDF',
  size: '2.4 MB',
  uploadedAt: '2026-09-03',
  status: 'Processed',
  summary: {
    executiveSummary:
      'This document covers the application of data analytics in government decision-making. It explores statistical methods, data visualization techniques, and predictive modeling for public policy. The material emphasizes the importance of data-driven governance and provides practical frameworks for implementing analytics in government departments.',
    keyConcepts: [
      { title: 'Descriptive Analytics', description: 'Analyzing historical data to understand what happened in the past and identify patterns.' },
      { title: 'Predictive Analytics', description: 'Using statistical models and machine learning to forecast future trends and outcomes.' },
      { title: 'Data Visualization', description: 'Presenting data in visual formats to communicate insights effectively to stakeholders.' },
      { title: 'Policy Impact Analysis', description: 'Measuring the effectiveness of government policies using statistical techniques.' },
    ],
    importantPoints: [
      'Government data analytics requires careful handling of sensitive citizen information',
      'Descriptive statistics form the foundation before advancing to predictive models',
      'Dashboards should focus on actionable KPIs rather than raw data dumps',
      'Data quality and completeness directly affect the reliability of insights',
      'Citizen-centric analytics improves service delivery and policy outcomes',
    ],
    keyTerms: ['Descriptive Statistics', 'Predictive Modeling', 'KPI', 'Dashboard', 'Data Governance', 'Sentiment Analysis', 'Regression', 'Time Series', 'Machine Learning', 'Data Visualization'],
    learningObjectives: [
      'Apply statistical methods to analyze government datasets',
      'Create effective data visualizations for policy communication',
      'Understand predictive analytics techniques for governance',
      'Design KPI dashboards for departmental decision-making',
    ],
    difficulty: 'Intermediate',
  },
};

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export const achievements: Achievement[] = [
  { id: 'a1', title: 'First Course', description: 'Complete your first course', icon: 'Trophy', unlocked: true, date: '2024-03-20', rarity: 'Common' },
  { id: 'a2', title: '7-Day Streak', description: 'Maintain a 7-day learning streak', icon: 'Flame', unlocked: true, date: '2024-03-27', rarity: 'Common' },
  { id: 'a3', title: 'Quiz Master', description: 'Score 90%+ on 5 quizzes', icon: 'Target', unlocked: true, date: '2024-05-15', rarity: 'Rare' },
  { id: 'a4', title: 'Knowledge Seeker', description: 'Complete 5 courses', icon: 'BookOpen', unlocked: true, date: '2024-06-10', rarity: 'Common' },
  { id: 'a5', title: 'Fast Learner', description: 'Complete 3 courses in one week', icon: 'Rocket', unlocked: true, date: '2024-07-01', rarity: 'Rare' },
  { id: 'a6', title: 'Competency Builder', description: 'Acquire 3 competencies', icon: 'Brain', unlocked: true, date: '2024-08-15', rarity: 'Epic' },
  { id: 'a7', title: '30-Day Learner', description: 'Maintain a 30-day streak', icon: 'Star', unlocked: false, rarity: 'Epic' },
  { id: 'a8', title: 'Century Club', description: 'Complete 100 courses', icon: 'Medal', unlocked: false, rarity: 'Legendary' },
  { id: 'a9', title: 'Perfect Score', description: 'Get 100% on a quiz', icon: 'Award', unlocked: false, rarity: 'Rare' },
  { id: 'a10', title: 'AI Pioneer', description: 'Upload 10 learning materials', icon: 'Sparkles', unlocked: false, rarity: 'Epic' },
];

export interface LeaderboardEntry {
  rank: number;
  name: string;
  department: string;
  xp: number;
  streak: number;
  isCurrentUser: boolean;
}

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Priya Nair', department: 'Digital Services', xp: 4820, streak: 45, isCurrentUser: false },
  { rank: 2, name: 'Rahul Verma', department: 'Finance', xp: 4560, streak: 38, isCurrentUser: false },
  { rank: 3, name: 'Anjali Reddy', department: 'Health & Family Welfare', xp: 4230, streak: 30, isCurrentUser: false },
  { rank: 4, name: 'Vikram Singh', department: 'Education', xp: 4100, streak: 22, isCurrentUser: false },
  { rank: 5, name: 'Sneha Patel', department: 'Revenue', xp: 3980, streak: 18, isCurrentUser: false },
  { rank: 6, name: 'Karthik Iyer', department: 'Transport', xp: 3960, streak: 15, isCurrentUser: false },
  { rank: 7, name: 'Arjun Sharma', department: 'Digital Services', xp: 3950, streak: 12, isCurrentUser: true },
  { rank: 8, name: 'Deepika Rao', department: 'Agriculture', xp: 3800, streak: 10, isCurrentUser: false },
  { rank: 9, name: 'Sanjay Gupta', department: 'Urban Development', xp: 3650, streak: 8, isCurrentUser: false },
  { rank: 10, name: 'Meera Krishnan', department: 'Social Justice', xp: 3500, streak: 14, isCurrentUser: false },
];

export interface AppNotification {
  id: string;
  type: 'course' | 'quiz' | 'igot' | 'goal' | 'streak' | 'achievement' | 'competency' | 'ai';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

export const notifications: AppNotification[] = [
  { id: 'n1', type: 'ai', title: 'New AI Recommendation', message: 'Based on your quiz performance, we recommend "Cybersecurity Essentials for Officers"', time: '10 min ago', read: false, icon: 'Sparkles' },
  { id: 'n2', type: 'streak', title: 'Streak Reminder', message: 'You\'re on a 12-day streak! Complete a lesson today to keep it alive.', time: '1 hour ago', read: false, icon: 'Flame' },
  { id: 'n3', type: 'igot', title: 'New iGOT Course Available', message: '"Advanced Data Analytics & AI" has been added to iGOT Karmayogi', time: '3 hours ago', read: false, icon: 'BookOpen' },
  { id: 'n4', type: 'goal', title: 'Weekly Goal Progress', message: 'You have 1.5 hours left to complete your weekly learning goal.', time: '5 hours ago', read: true, icon: 'Target' },
  { id: 'n5', type: 'achievement', title: 'Achievement Unlocked!', message: 'You earned the "Competency Builder" badge. Keep it up!', time: '1 day ago', read: true, icon: 'Brain' },
  { id: 'n6', type: 'quiz', title: 'Quiz Result Available', message: 'Your Data Analytics quiz results are ready to review.', time: '2 days ago', read: true, icon: 'CheckCircle' },
  { id: 'n7', type: 'competency', title: 'Competency Milestone', message: 'Your Digital Governance competency reached 90%. Excellent work!', time: '3 days ago', read: true, icon: 'TrendingUp' },
];

export interface iGOTCourse {
  id: string;
  title: string;
  competency: string;
  duration: string;
  progress: number;
  source: string;
}

export const igotCourses: iGOTCourse[] = [
  { id: 'ig1', title: 'Digital Governance Fundamentals', competency: 'Digital Governance', duration: '4 hours', progress: 100, source: 'iGOT Karmayogi' },
  { id: 'ig2', title: 'Data Analytics for Government', competency: 'Data Analytics', duration: '6 hours', progress: 100, source: 'iGOT Karmayogi' },
  { id: 'ig3', title: 'Cybersecurity Essentials for Officers', competency: 'Cybersecurity', duration: '5 hours', progress: 0, source: 'iGOT Karmayogi' },
  { id: 'ig4', title: 'Advanced Data Analytics & AI', competency: 'Data Analytics', duration: '8 hours', progress: 0, source: 'iGOT Karmayogi' },
  { id: 'ig5', title: 'Project Management for Government Initiatives', competency: 'Project Management', duration: '4.5 hours', progress: 30, source: 'iGOT Karmayogi' },
  { id: 'ig6', title: 'Digital India: Policies & Implementation', competency: 'Digital Governance', duration: '3.5 hours', progress: 100, source: 'iGOT Karmayogi' },
];

export const weeklyActivity = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 60 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 75 },
  { day: 'Fri', minutes: 50 },
  { day: 'Sat', minutes: 90 },
  { day: 'Sun', minutes: 25 },
];

export const learningProgressData = [
  { week: 'Week 1', hours: 2.5 },
  { week: 'Week 2', hours: 3.8 },
  { week: 'Week 3', hours: 4.2 },
  { week: 'Week 4', hours: 3.1 },
  { week: 'Week 5', hours: 5.5 },
  { week: 'Week 6', hours: 4.8 },
  { week: 'Week 7', hours: 6.2 },
  { week: 'Week 8', hours: 5.9 },
];

export const quizPerformanceData = [
  { quiz: 'Quiz 1', score: 65 },
  { quiz: 'Quiz 2', score: 72 },
  { quiz: 'Quiz 3', score: 80 },
  { quiz: 'Quiz 4', score: 68 },
  { quiz: 'Quiz 5', score: 85 },
  { quiz: 'Quiz 6', score: 90 },
  { quiz: 'Quiz 7', score: 82 },
];

export const streakDays = [
  { day: 'M', completed: true },
  { day: 'T', completed: true },
  { day: 'W', completed: true },
  { day: 'T', completed: true },
  { day: 'F', completed: true },
  { day: 'S', completed: true },
  { day: 'S', completed: false },
];

export const streakMilestones = [
  { days: 7, unlocked: true, icon: 'Flame' },
  { days: 14, unlocked: false, icon: 'Flame' },
  { days: 30, unlocked: false, icon: 'Flame' },
  { days: 60, unlocked: false, icon: 'Flame' },
  { days: 100, unlocked: false, icon: 'Flame' },
];

export const aiAssistantSuggestions = [
  'Explain my competency gaps',
  'What should I learn next?',
  'Summarize my latest course',
  'Create practice questions',
  'Help me prepare for my quiz',
];

export const aiAssistantResponses: Record<string, string> = {
  'Explain my competency gaps':
    'Based on your competency assessment, you have two areas that need improvement:\n\n1. **Data Analytics (51%)** — You understand the basics but need more practice with visualization and predictive techniques. I recommend continuing "Data Visualization with Power BI" and then moving to "Advanced Data Analytics & AI".\n\n2. **Cybersecurity (42%)** — This is your most critical gap. I recommend starting "Cybersecurity Essentials for Officers" as soon as possible. The course covers threat analysis, security protocols, and risk management.\n\nYour strongest areas are Digital Governance (90%) and Communication (78%). Would you like me to create a focused learning plan?',
  'What should I learn next?':
    'Based on your current progress and competency gaps, here\'s what I recommend:\n\n1. **Continue:** Data Visualization with Power BI (45% complete)\n2. **Start next:** Cybersecurity Essentials for Officers — this addresses your lowest competency score\n3. **After that:** Advanced Data Analytics & AI (currently locked, unlocks after Data Visualization)\n\nThis sequence follows your personalized learning path and will help close both your Data Analytics and Cybersecurity gaps. Shall I start the first module?',
  'Summarize my latest course':
    'Your most recent course is **Data Analytics for Government**. Here\'s a summary:\n\n• Covers descriptive and predictive analytics for government data\n• Includes practical frameworks for data-driven policy decisions\n• Teaches dashboard creation and KPI identification\n• Emphasizes data governance and citizen privacy\n\nYou completed this course with a 100% progress rate. Your quiz score was 82%, showing strong understanding. Would you like to review any specific topic?',
  'Create practice questions':
    'Here are 3 practice questions based on your learning materials:\n\n**Q1:** What is the key difference between descriptive and predictive analytics?\n- A) Descriptive uses AI, predictive does not\n- B) Descriptive analyzes past data, predictive forecasts future outcomes\n- C) There is no difference\n- D) Predictive is only for financial data\n\n**Q2:** Which visualization is best for showing trends over time?\n- A) Pie Chart\n- B) Line Chart\n- C) Scatter Plot\n- D) Bar Chart\n\nWould you like me to generate a full quiz?',
  'Help me prepare for my quiz':
    'Great idea! Here\'s a preparation plan for your upcoming quiz:\n\n**Key Topics to Review:**\n1. Statistical measures (mean, median, mode, and when to use each)\n2. Data visualization types and their use cases\n3. Predictive vs. descriptive analytics\n4. KPI dashboard design principles\n5. Data governance and privacy considerations\n\n**Quick Tips:**\n- Pay attention to scenario-based questions\n- Review the key terms from your uploaded material\n- Practice with the flashcards I generated earlier\n\nWould you like me to generate a practice quiz now?',
};
