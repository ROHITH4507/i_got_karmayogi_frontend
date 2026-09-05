import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Sparkles,
  AlertCircle,
  Flag,
} from 'lucide-react';
import { sampleQuiz } from '@/data/mockData';
import ProgressBar from '@/components/ui/ProgressBar';

export default function QuizExperience() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const quiz = sampleQuiz;
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const question = quiz.questions[currentQ];
  const progress = ((currentQ + (showFeedback ? 1 : 0)) / quiz.questions.length) * 100;

  const handleSelect = (idx: number) => {
    if (showFeedback) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowFeedback(true);
    setAnswers([...answers, selected]);
  };

  const handleNext = () => {
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      navigate(`/quiz/${quizId}/results`);
    }
  };

  const isCorrect = selected === question.correctAnswer;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-bold text-slate-900">{quiz.title}</h1>
          <p className="text-sm text-slate-500">Question {currentQ + 1} of {quiz.questions.length}</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${timeLeft < 60 ? 'bg-error-50 text-error-600' : 'bg-primary-50 text-primary-600'}`}>
          <Clock className="w-4 h-4" />
          <span className="font-bold text-sm">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar value={progress} color="primary" />

      {/* Question Navigator */}
      <div className="flex gap-2 flex-wrap">
        {quiz.questions.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentQ(i); setSelected(answers[i] ?? null); setShowFeedback(answers[i] !== undefined); }}
            className={`w-9 h-9 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
              i === currentQ ? 'bg-primary-600 text-white' :
              answers[i] !== undefined ? 'bg-success-100 text-success-700' :
              'bg-slate-100 text-slate-400 hover:bg-slate-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <div className="card p-6 lg:p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="chip bg-primary-50 text-primary-700">{question.competency}</span>
          <span className="chip bg-slate-100 text-slate-600">{question.difficulty}</span>
        </div>
        <h2 className="text-lg lg:text-xl font-bold text-slate-900 leading-relaxed">{question.question}</h2>

        {/* Options */}
        <div className="mt-6 space-y-3">
          {question.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isAnswerCorrect = idx === question.correctAnswer;
            let className = 'border-slate-200 hover:border-primary-300 hover:bg-primary-50/30';
            if (showFeedback) {
              if (isAnswerCorrect) className = 'border-success-300 bg-success-50';
              else if (isSelected && !isAnswerCorrect) className = 'border-error-300 bg-error-50';
              else className = 'border-slate-100 opacity-60';
            } else if (isSelected) {
              className = 'border-primary-500 bg-primary-50 ring-2 ring-primary-200';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${className}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  showFeedback && isAnswerCorrect ? 'bg-success-500 text-white' :
                  showFeedback && isSelected && !isAnswerCorrect ? 'bg-error-500 text-white' :
                  isSelected ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {showFeedback && isAnswerCorrect ? <CheckCircle className="w-4 h-4" /> :
                   showFeedback && isSelected && !isAnswerCorrect ? <XCircle className="w-4 h-4" /> :
                   String.fromCharCode(65 + idx)}
                </div>
                <span className="text-sm font-medium text-slate-700">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`mt-5 p-4 rounded-xl animate-slide-up ${isCorrect ? 'bg-success-50 border border-success-200' : 'bg-error-50 border border-error-200'}`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-success-500' : 'bg-error-500'}`}>
                {isCorrect ? <CheckCircle className="w-5 h-5 text-white" /> : <AlertCircle className="w-5 h-5 text-white" />}
              </div>
              <div>
                <p className={`text-sm font-bold ${isCorrect ? 'text-success-700' : 'text-error-700'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </p>
                <div className="mt-2 flex gap-2">
                  <Sparkles className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-600 leading-relaxed">{question.explanation}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
          <button
            onClick={() => currentQ > 0 && setCurrentQ(currentQ - 1)}
            disabled={currentQ === 0}
            className="btn-ghost"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          {!showFeedback ? (
            <button onClick={handleSubmit} disabled={selected === null} className="btn-primary">
              Submit Answer
            </button>
          ) : currentQ < quiz.questions.length - 1 ? (
            <button onClick={handleNext} className="btn-primary">
              Next Question <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={() => navigate(`/quiz/${quizId}/results`)} className="btn-primary">
              <Flag className="w-4 h-4" /> Finish Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
