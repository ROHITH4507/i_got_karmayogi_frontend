import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Flame,
  BookOpen,
  Clock,
  Target,
  Brain,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Lock,
  Zap,
} from 'lucide-react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { currentUser, competencies, learningPath, learningProgressData, streakDays } from '@/data/mockData';
import ProgressBar from '@/components/ui/ProgressBar';

const stats = [
  { label: 'Overall Progress', value: '72%', icon: TrendingUp, color: 'from-blue-500 to-blue-700' },
  { label: 'Current Streak', value: '12 Days', icon: Flame, color: 'from-orange-500 to-red-500' },
  { label: 'Courses Completed', value: '8', icon: BookOpen, color: 'from-emerald-500 to-teal-600' },
  { label: 'Learning Hours', value: '24.5 hrs', icon: Clock, color: 'from-cyan-500 to-blue-600' },
  { label: 'Quiz Score', value: '82%', icon: Target, color: 'from-violet-500 to-purple-600' },
  { label: 'Competencies', value: '4', icon: Brain, color: 'from-amber-500 to-orange-600' },
];

const radarData = competencies.map((c) => ({ subject: c.name.split(' ')[0], score: c.score, fullMark: 100 }));

const levelColors: Record<string, string> = {
  Strong: 'bg-success-50 text-success-700',
  Developing: 'bg-warning-50 text-warning-700',
  'Needs Improvement': 'bg-error-50 text-error-700',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const weeklyProgress = (currentUser.weeklyHoursDone / currentUser.weeklyGoalHours) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">
          {greeting}, {currentUser.name.split(' ')[0]}
        </h1>
        <p className="mt-1 text-slate-500">Continue your learning journey and build the competencies you need for your role.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className="card p-4 lg:p-5 hover:shadow-glow transition-shadow animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-md`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Competency Radar */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Competency Insights</h2>
              <p className="text-sm text-slate-500">Your competency profile across key domains</p>
            </div>
            <button onClick={() => navigate('/personalized-path')} className="btn-ghost text-sm">
              View Path <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2.5">
              {competencies.map((c) => (
                <div key={c.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{c.name}</span>
                    <span className={`chip ${levelColors[c.level]}`}>{c.score}%</span>
                  </div>
                  <ProgressBar value={c.score} size="sm" color={c.score >= 75 ? 'success' : c.score >= 50 ? 'warning' : 'error'} />
                </div>
              ))}
            </div>
          </div>
          {/* AI Insight */}
          <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1">AI Insight</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your competency assessment indicates that <strong>Data Analytics</strong> and <strong>Cybersecurity</strong> require additional development. We've created a personalized learning path to help close these gaps.
                </p>
                <button onClick={() => navigate('/personalized-path')} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700">
                  View Personalized Learning Path <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Weekly Goal */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">Weekly Goal</h3>
              <Target className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-3xl font-bold text-slate-900">{currentUser.weeklyHoursDone}</span>
              <span className="text-sm text-slate-400 mb-1">/ {currentUser.weeklyGoalHours} hours</span>
            </div>
            <ProgressBar value={weeklyProgress} color="primary" />
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Courses</span><span className="font-semibold text-slate-700">{currentUser.weeklyCoursesDone}/{currentUser.weeklyGoalCourses}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Quizzes</span><span className="font-semibold text-slate-700">{currentUser.weeklyQuizzesDone}/{currentUser.weeklyGoalQuizzes}</span></div>
            </div>
          </div>

          {/* Streak */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900">Daily Streak</h3>
              <div className="flex items-center gap-1.5">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-lg font-bold text-orange-600">{currentUser.streak} days</span>
              </div>
            </div>
            <div className="flex justify-between gap-1.5">
              {streakDays.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${d.completed ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' : 'bg-slate-100 text-slate-300'}`}>
                    {d.completed ? <CheckCircle className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-slate-300" />}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">{d.day}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-center text-slate-500 italic">"You're on fire! Keep your streak alive today."</p>
          </div>

          {/* XP */}
          <div className="card p-5 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-accent-400" />
              <span className="text-sm font-semibold text-slate-300">Level {currentUser.level}</span>
            </div>
            <p className="text-2xl font-bold text-white">{currentUser.xp.toLocaleString()} XP</p>
            <p className="text-xs text-slate-400 mb-3">{currentUser.levelTitle}</p>
            <ProgressBar value={currentUser.xp} max={currentUser.xpToNext} color="accent" />
            <p className="text-xs text-slate-400 mt-2">{currentUser.xpToNext - currentUser.xp} XP to Level {currentUser.level + 1}</p>
          </div>
        </div>
      </div>

      {/* Learning Path Preview + Activity Chart */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Continue Learning</h2>
            <button onClick={() => navigate('/personalized-path')} className="text-sm font-semibold text-primary-600 hover:text-primary-700">View all</button>
          </div>
          <div className="space-y-3">
            {learningPath.filter((m) => m.status === 'In Progress' || m.status === 'Recommended').slice(0, 3).map((m) => (
              <div key={m.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate('/personalized-path')}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${m.status === 'In Progress' ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-400'}`}>
                  {m.status === 'Locked' ? <Lock className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{m.title}</p>
                  <p className="text-xs text-slate-400">{m.duration} · {m.difficulty}</p>
                  {m.status === 'In Progress' && <ProgressBar value={m.progress} size="sm" className="mt-1.5" />}
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Learning Activity</h2>
            <span className="text-xs text-slate-400">Last 8 weeks</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={learningProgressData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Area type="monotone" dataKey="hours" stroke="#2563eb" strokeWidth={2} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
