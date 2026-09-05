import { useState } from 'react';
import {
  Trophy,
  Flame,
  Target,
  BookOpen,
  Rocket,
  Brain,
  Star,
  Medal,
  Sparkles,
  Lock,
  X,
} from 'lucide-react';
import { achievements } from '@/data/mockData';

const iconMap: Record<string, typeof Trophy> = {
  Trophy, Flame, Target, BookOpen, Rocket, Brain, Star, Medal, Sparkles, Lock,
};

const rarityColors: Record<string, string> = {
  Common: 'from-slate-400 to-slate-500',
  Rare: 'from-blue-500 to-blue-700',
  Epic: 'from-violet-500 to-purple-700',
  Legendary: 'from-amber-400 to-orange-600',
};

const rarityBorder: Record<string, string> = {
  Common: 'border-slate-200',
  Rare: 'border-blue-200',
  Epic: 'border-violet-200',
  Legendary: 'border-amber-200',
};

export default function Achievements() {
  const [celebrate, setCelebrate] = useState<string | null>(null);
  const unlocked = achievements.filter((a) => a.unlocked);
  const locked = achievements.filter((a) => !a.unlocked);
  const celebrateAchievement = achievements.find((a) => a.id === celebrate);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">Achievements</h1>
        <p className="mt-1 text-slate-500">Unlock badges by completing courses, maintaining streaks, and mastering competencies.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-5 text-center">
          <p className="text-3xl font-bold text-slate-900">{unlocked.length}</p>
          <p className="text-xs text-slate-400 mt-1">Unlocked</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-3xl font-bold text-slate-400">{locked.length}</p>
          <p className="text-xs text-slate-400 mt-1">Locked</p>
        </div>
        <div className="card p-5 text-center">
          <p className="text-3xl font-bold text-slate-900">{Math.round((unlocked.length / achievements.length) * 100)}%</p>
          <p className="text-xs text-slate-400 mt-1">Completion</p>
        </div>
      </div>

      {/* Unlocked */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">Unlocked Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {unlocked.map((a, i) => {
            const Icon = iconMap[a.icon] || Trophy;
            return (
              <div
                key={a.id}
                onClick={() => setCelebrate(a.id)}
                className={`card p-5 text-center cursor-pointer hover:shadow-glow transition-all hover:-translate-y-1 border-2 ${rarityBorder[a.rarity]} animate-slide-up`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${rarityColors[a.rarity]} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{a.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{a.description}</p>
                <div className="mt-2">
                  <span className={`chip text-[10px] ${a.rarity === 'Legendary' ? 'bg-amber-50 text-amber-700' : a.rarity === 'Epic' ? 'bg-violet-50 text-violet-700' : a.rarity === 'Rare' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                    {a.rarity}
                  </span>
                </div>
                {a.date && <p className="text-[10px] text-slate-400 mt-2">Earned on {new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Locked */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">Locked Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {locked.map((a, i) => {
            const Icon = iconMap[a.icon] || Trophy;
            return (
              <div key={a.id} className="card p-5 text-center opacity-60 border-2 border-dashed border-slate-200">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-7 h-7 text-slate-400" />
                </div>
                <h3 className="text-sm font-bold text-slate-500">{a.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{a.description}</p>
                <div className="mt-2">
                  <span className="chip text-[10px] bg-slate-100 text-slate-500">{a.rarity}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Celebration Modal */}
      {celebrateAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setCelebrate(null)} />
          <div className="relative card p-8 text-center max-w-sm animate-scale-in">
            <button onClick={() => setCelebrate(null)} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100" aria-label="Close">
              <X className="w-5 h-5 text-slate-400" />
            </button>
            <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${rarityColors[celebrateAchievement.rarity]} flex items-center justify-center mx-auto mb-4 shadow-xl animate-float`}>
              {(() => { const Icon = iconMap[celebrateAchievement.icon] || Trophy; return <Icon className="w-12 h-12 text-white" />; })()}
            </div>
            <p className="text-sm font-semibold text-primary-600 mb-1">Achievement Unlocked!</p>
            <h2 className="font-display text-2xl font-bold text-slate-900">{celebrateAchievement.title}</h2>
            <p className="text-sm text-slate-500 mt-2">{celebrateAchievement.description}</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-amber-700">+100 XP Earned!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
