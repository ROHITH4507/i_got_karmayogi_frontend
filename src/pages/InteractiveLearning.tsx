import { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lightbulb,
  Brain,
  Target,
  RotateCcw,
  Award,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import ProgressBar from '@/components/ui/ProgressBar';

interface LearnSection {
  type: 'concept' | 'quickcheck' | 'scenario' | 'knowledge';
  title: string;
  content: string;
  question?: string;
  options?: string[];
  correctAnswer?: number;
  feedback?: string;
}

const sections: LearnSection[] = [
  {
    type: 'concept',
    title: 'Concept: Descriptive Analytics',
    content: 'Descriptive analytics is the foundation of data analysis in government. It involves summarizing historical data to understand what happened in the past. Common techniques include calculating averages, identifying trends, and creating summary reports. For example, analyzing the total number of citizens who used a digital service last quarter helps understand service adoption patterns.',
  },
  {
    type: 'quickcheck',
    title: 'Quick Check',
    content: 'Let\'s see if you understood the concept.',
    question: 'What is the primary purpose of descriptive analytics?',
    options: ['To predict future outcomes', 'To summarize and understand past data', 'To build machine learning models', 'To encrypt government data'],
    correctAnswer: 1,
    feedback: 'Correct! Descriptive analytics focuses on summarizing historical data to understand what has already happened.',
  },
  {
    type: 'scenario',
    title: 'Real-World Scenario',
    content: 'You are working on a government digital service portal. Your supervisor asks you to analyze citizen usage patterns over the past 6 months and present findings to the department head.',
    question: 'What would be your first step in this analysis?',
    options: [
      'Immediately build a predictive model',
      'Collect and clean the usage data, then create summary statistics',
      'Skip analysis and just present raw data',
      'Wait for more data before starting',
    ],
    correctAnswer: 1,
    feedback: 'Excellent choice! Before any advanced analysis, you need to collect, clean, and understand the data through descriptive statistics. This forms the foundation for any further analysis.',
  },
  {
    type: 'knowledge',
    title: 'Knowledge Check',
    content: 'Final assessment question to test your understanding.',
    question: 'Which of the following is an example of descriptive analytics in governance?',
    options: [
      'Predicting next year\'s tax revenue',
      'Summarizing last year\'s citizen service ratings by department',
      'Building an AI chatbot for citizen queries',
      'Implementing a new cybersecurity protocol',
    ],
    correctAnswer: 1,
    feedback: 'Correct! Summarizing past citizen service ratings is a classic example of descriptive analytics — it helps understand what happened without making predictions.',
  },
];

const typeConfig = {
  concept: { label: 'Learn', icon: BookOpen, color: 'from-primary-500 to-blue-700' },
  quickcheck: { label: 'Practice', icon: Target, color: 'from-amber-500 to-orange-600' },
  scenario: { label: 'Apply', icon: Lightbulb, color: 'from-cyan-500 to-blue-600' },
  knowledge: { label: 'Test', icon: Brain, color: 'from-violet-500 to-purple-700' },
};

export default function InteractiveLearning() {
  const { showToast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  const section = sections[currentSection];
  const config = typeConfig[section.type];
  const Icon = config.icon;
  const progress = ((currentSection + (showFeedback ? 1 : 0)) / sections.length) * 100;

  const handleAnswer = (idx: number) => {
    if (showFeedback) return;
    setSelectedAnswer(idx);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
      showToast('Interactive learning completed! +50 XP earned', 'success');
    }
  };

  const handleRestart = () => {
    setCurrentSection(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <div className="card p-8 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-success-400 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg animate-scale-in">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Learning Module Complete!</h1>
          <p className="text-slate-500 mt-2">You've completed all sections of this interactive learning module.</p>
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50">
            <p className="text-3xl font-bold text-primary-600">+50 XP</p>
            <p className="text-sm text-slate-500 mt-1">Data Analytics competency improved by +3%</p>
          </div>
          <div className="flex gap-3 justify-center mt-6">
            <button onClick={handleRestart} className="btn-secondary">
              <RotateCcw className="w-4 h-4" /> Restart
            </button>
            <button onClick={() => window.history.back()} className="btn-primary">
              Continue Learning <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">Interactive Learning</h1>
        <p className="mt-1 text-slate-500">Learn · Practice · Test · Reflect — an engaging way to master new concepts.</p>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-700">Section {currentSection + 1} of {sections.length}</span>
          <span className="text-sm text-slate-400">{Math.round(progress)}%</span>
        </div>
        <ProgressBar value={progress} color="primary" />
      </div>

      {/* Section indicators */}
      <div className="flex gap-2">
        {sections.map((s, i) => {
          const sc = typeConfig[s.type];
          const SIcon = sc.icon;
          return (
            <div key={i} className={`flex-1 flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${i === currentSection ? 'bg-primary-50' : i < currentSection ? 'bg-success-50' : 'bg-slate-50'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === currentSection ? 'bg-primary-600 text-white' : i < currentSection ? 'bg-success-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                {i < currentSection ? <CheckCircle className="w-4 h-4" /> : <SIcon className="w-4 h-4" />}
              </div>
              <span className={`text-[10px] font-semibold ${i === currentSection ? 'text-primary-700' : i < currentSection ? 'text-success-600' : 'text-slate-400'}`}>{sc.label}</span>
            </div>
          );
        })}
      </div>

      {/* Content Card */}
      <div className="card p-6 lg:p-8">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${config.color} text-white text-xs font-bold mb-4`}>
          <Icon className="w-3.5 h-3.5" /> {config.label}
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{section.content}</p>

        {/* Question */}
        {section.question && section.options && (
          <div className="mt-6">
            <p className="text-base font-semibold text-slate-900 mb-4">{section.question}</p>
            <div className="space-y-2.5">
              {section.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === section.correctAnswer;
                let className = 'border-slate-200 hover:border-primary-300 hover:bg-primary-50/30';
                if (showFeedback) {
                  if (isCorrect) className = 'border-success-300 bg-success-50';
                  else if (isSelected) className = 'border-error-300 bg-error-50';
                  else className = 'border-slate-100 opacity-60';
                } else if (isSelected) {
                  className = 'border-primary-500 bg-primary-50 ring-2 ring-primary-200';
                }
                return (
                  <button key={idx} onClick={() => handleAnswer(idx)} disabled={showFeedback} className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center gap-3 ${className}`}>
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${showFeedback && isCorrect ? 'bg-success-500 text-white' : showFeedback && isSelected ? 'bg-error-500 text-white' : isSelected ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm text-slate-700">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && section.feedback && (
          <div className="mt-5 p-4 rounded-xl bg-primary-50 border border-primary-100 animate-slide-up">
            <div className="flex gap-2">
              <Sparkles className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-primary-700 mb-1">AI Feedback</p>
                <p className="text-sm text-slate-600 leading-relaxed">{section.feedback}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
          <button
            onClick={() => currentSection > 0 && setCurrentSection(currentSection - 1)}
            disabled={currentSection === 0}
            className="btn-ghost"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          {!showFeedback && section.question ? (
            <button onClick={handleSubmit} disabled={selectedAnswer === null} className="btn-primary">
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary">
              {currentSection < sections.length - 1 ? 'Next Section' : 'Complete'} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
