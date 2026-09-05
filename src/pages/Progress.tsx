import {
  TrendingUp,
  BookOpen,
  Clock,
  Target,
  Award,
  Flame,
  Zap,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  learningProgressData,
  quizPerformanceData,
  weeklyActivity,
  competencies,
  currentUser,
} from '@/data/mockData';
import ProgressBar from '@/components/ui/ProgressBar';

const courseCompletion = [
  { name: 'Completed', value: 8, color: '#16a34a' },
  { name: 'In Progress', value: 3, color: '#2563eb' },
  { name: 'Not Started', value: 5, color: '#e2e8f0' },
];

const competencyGrowth = competencies.map((c) => ({
  name: c.name.split(' ')[0],
  before: c.beforeScore,
  after: c.score,
}));

const stats = [
  { label: 'Total Learning Hours', value: '24.5', unit: 'hrs', icon: Clock, color: 'from-cyan-500 to-blue-600' },
  { label: 'Courses Completed', value: '8', unit: 'courses', icon: BookOpen, color: 'from-emerald-500 to-teal-600' },
  { label: 'Quizzes Taken', value: '14', unit: 'quizzes', icon: Target, color: 'from-amber-500 to-orange-600' },
  { label: 'Avg Quiz Score', value: '82', unit: '%', icon: Award, color: 'from-violet-500 to-purple-600' },
];

export default function Progress() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">Progress & Analytics</h1>
        <p className="mt-1 text-slate-500">Track your learning journey, competency growth, and achievements over time.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className="card p-5 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-md`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}<span className="text-sm text-slate-400 ml-1">{stat.unit}</span></p>
            <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Learning Progress */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-bold text-slate-900">Learning Progress</h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={learningProgressData}>
              <defs>
                <linearGradient id="colorHrs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Area type="monotone" dataKey="hours" stroke="#2563eb" strokeWidth={2} fill="url(#colorHrs)" name="Learning Hours" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Course Completion Donut */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-success-600" />
            <h2 className="text-lg font-bold text-slate-900">Course Completion</h2>
          </div>
          <div className="h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={courseCompletion} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {courseCompletion.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competency Growth Bar */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-accent-600" />
            <h2 className="text-lg font-bold text-slate-900">Competency Growth</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={competencyGrowth} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="before" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Before" />
                <Bar dataKey="after" fill="#2563eb" radius={[4, 4, 0, 0]} name="After" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Weekly Activity + Quiz Performance */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-bold text-slate-900">Weekly Activity</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Bar dataKey="minutes" fill="#0891b2" radius={[6, 6, 0, 0]} name="Learning Minutes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900">Quiz Performance</h2>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={quizPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="quiz" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                <Line type="monotone" dataKey="score" stroke="#d97706" strokeWidth={2.5} dot={{ r: 4, fill: '#d97706' }} name="Score (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* XP & Level */}
      <div className="card p-6 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Level {currentUser.level} — {currentUser.levelTitle}</p>
              <p className="text-slate-400 text-sm">{currentUser.xp.toLocaleString()} XP earned</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{currentUser.xp.toLocaleString()}</p>
            <p className="text-xs text-slate-400">/ {currentUser.xpToNext.toLocaleString()} XP</p>
          </div>
        </div>
        <ProgressBar value={currentUser.xp} max={currentUser.xpToNext} color="accent" size="lg" />
        <p className="text-xs text-slate-400 mt-2">{currentUser.xpToNext - currentUser.xp} XP to reach Level {currentUser.level + 1}</p>
      </div>
    </div>
  );
}
