import {
  User as UserIcon,
  Mail,
  Building,
  Briefcase,
  Award,
  Flame,
  Zap,
  BookOpen,
  Target,
  Clock,
  Trophy,
  Pencil,
} from 'lucide-react';
import { currentUser, competencies, achievements } from '@/data/mockData';
import ProgressBar from '@/components/ui/ProgressBar';

const levelColors: Record<string, string> = {
  Strong: 'bg-success-50 text-success-700',
  Developing: 'bg-warning-50 text-warning-700',
  'Needs Improvement': 'bg-error-50 text-error-700',
};

const stats = [
  { label: 'Courses Completed', value: currentUser.coursesCompleted, icon: BookOpen, color: 'text-success-600' },
  { label: 'Quizzes Completed', value: currentUser.quizzesCompleted, icon: Target, color: 'text-primary-600' },
  { label: 'Learning Hours', value: currentUser.learningHours, icon: Clock, color: 'text-accent-600' },
  { label: 'Avg Quiz Score', value: `${currentUser.averageQuizScore}%`, icon: Award, color: 'text-amber-600' },
  { label: 'Certificates', value: currentUser.certificatesEarned, icon: Trophy, color: 'text-violet-600' },
];

export default function Profile() {
  const unlockedBadges = achievements.filter((a) => a.unlocked);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header */}
      <div className="card overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
              {currentUser.avatar}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl font-bold text-slate-900">{currentUser.name}</h1>
              <p className="text-sm text-slate-500">{currentUser.designation} · {currentUser.organization}</p>
            </div>
            <button className="btn-secondary">
              <Pencil className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Personal Info */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Personal Information</h2>
          <div className="space-y-3">
            {[
              { icon: UserIcon, label: 'Employee ID', value: currentUser.employeeId },
              { icon: Mail, label: 'Email', value: currentUser.email },
              { icon: Building, label: 'Department', value: currentUser.department },
              { icon: Briefcase, label: 'Designation', value: currentUser.designation },
              { icon: Building, label: 'Organization', value: currentUser.organization },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-slate-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-900 truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Stats */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Learning Statistics</h2>
          <div className="space-y-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-sm text-slate-600">{s.label}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{s.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-accent-400" />
              <span className="text-sm font-semibold">Level {currentUser.level} — {currentUser.levelTitle}</span>
            </div>
            <p className="text-2xl font-bold">{currentUser.xp.toLocaleString()} XP</p>
            <ProgressBar value={currentUser.xp} max={currentUser.xpToNext} color="accent" className="mt-2" />
          </div>
        </div>

        {/* Competencies */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Competencies</h2>
          <div className="space-y-3">
            {competencies.map((c) => (
              <div key={c.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{c.name}</span>
                  <span className={`chip text-[10px] ${levelColors[c.level]}`}>{c.score}%</span>
                </div>
                <ProgressBar value={c.score} size="sm" color={c.score >= 75 ? 'success' : c.score >= 50 ? 'warning' : 'error'} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Achievements ({unlockedBadges.length})</h2>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-bold text-slate-900">{currentUser.streak} Day Streak</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {unlockedBadges.map((a) => (
            <div key={a.id} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-50 hover:bg-primary-50 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-slate-700 text-center max-w-[80px]">{a.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Learning Preferences</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-400 mb-1">Interests</p>
            <div className="flex flex-wrap gap-1.5">
              {currentUser.preferences.interests.map((i) => (
                <span key={i} className="chip bg-primary-50 text-primary-700">{i}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Preferred Duration</p>
            <p className="text-sm font-semibold text-slate-900">{currentUser.preferences.preferredDuration}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Preferred Difficulty</p>
            <p className="text-sm font-semibold text-slate-900">{currentUser.preferences.preferredDifficulty}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Preferred Language</p>
            <p className="text-sm font-semibold text-slate-900">{currentUser.preferences.preferredLanguage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
