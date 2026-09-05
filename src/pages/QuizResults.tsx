import { useNavigate, useParams } from 'react-router-dom';
import {
  Trophy,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  RotateCcw,
  Eye,
  Sparkles,
  ArrowRight,
  Award,
} from 'lucide-react';
import { sampleQuiz } from '@/data/mockData';
import { useToast } from '@/components/ui/Toast';

export default function QuizResults() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { showToast } = useToast();
  const quiz = sampleQuiz;

  // Simulated results
  const correct = 4;
  const incorrect = quiz.questions.length - correct;
  const score = Math.round((correct / quiz.questions.length) * 100);
  const timeTaken = '8:32';
  const competencyScore = Math.round(score * 0.85);

  const circleRadius = 70;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference - (score / 100) * circleCircumference;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Congratulations */}
      <div className="card p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 opacity-50" />
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg animate-scale-in">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-slate-900">Congratulations!</h1>
          <p className="text-slate-500 mt-1">You completed the quiz</p>

          {/* Circular Progress */}
          <div className="relative w-40 h-40 mx-auto mt-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r={circleRadius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
              <circle
                cx="80" cy="80" r={circleRadius} fill="none" stroke="#2563eb" strokeWidth="10"
                strokeLinecap="round" strokeDasharray={circleCircumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-slate-900">{score}%</span>
              <span className="text-xs text-slate-400">Your Score</span>
            </div>
          </div>

          <p className="mt-4 text-lg font-semibold text-slate-700">
            {score >= 80 ? 'Excellent work!' : score >= 60 ? 'Good job!' : 'Keep practicing!'}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-success-100 flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-5 h-5 text-success-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{correct}</p>
          <p className="text-xs text-slate-400">Correct</p>
        </div>
        <div className="card p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-error-100 flex items-center justify-center mx-auto mb-2">
            <XCircle className="w-5 h-5 text-error-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{incorrect}</p>
          <p className="text-xs text-slate-400">Incorrect</p>
        </div>
        <div className="card p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{timeTaken}</p>
          <p className="text-xs text-slate-400">Time Taken</p>
        </div>
        <div className="card p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-accent-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{competencyScore}</p>
          <p className="text-xs text-slate-400">Competency Score</p>
        </div>
      </div>

      {/* AI Feedback */}
      <div className="card p-6 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-100">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 mb-1">AI Feedback</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              You performed well in <strong>Digital Governance</strong> concepts but need additional practice in <strong>Data Analytics</strong> fundamentals. Focus on understanding the difference between descriptive and predictive analytics, and practice with data visualization scenarios.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary-600" />
              <p className="text-xs text-primary-700 font-semibold">Your Data Analytics competency improved by +5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* XP Earned */}
      <div className="card p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-center">
        <Award className="w-8 h-8 text-accent-400 mx-auto mb-2" />
        <p className="text-2xl font-bold text-white">+{score * 2} XP Earned!</p>
        <p className="text-xs text-slate-400 mt-1">Keep learning to level up and unlock new achievements</p>
      </div>

      {/* Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button onClick={() => navigate(`/quiz/${quizId}`)} className="btn-secondary justify-start">
          <RotateCcw className="w-4 h-4" /> Retry Quiz
        </button>
        <button onClick={() => showToast('Reviewing answers...', 'info')} className="btn-secondary justify-start">
          <Eye className="w-4 h-4" /> Review Answers
        </button>
        <button onClick={() => navigate('/quiz')} className="btn-secondary justify-start">
          <Target className="w-4 h-4" /> Practice Quiz
        </button>
        <button onClick={() => navigate('/dashboard')} className="btn-primary justify-start">
          Continue Learning <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
