import { useState } from 'react';
import { Trophy, Flame, Zap, Crown, Medal, TrendingUp } from 'lucide-react';
import { leaderboard, currentUser } from '@/data/mockData';

const filters = ['Department', 'District', 'Organization', 'Region', 'Weekly', 'Monthly', 'All Time'];
const rankIcons = [
  { icon: Crown, color: 'text-amber-500' },
  { icon: Medal, color: 'text-slate-400' },
  { icon: Medal, color: 'text-orange-600' },
];

export default function Leaderboard() {
  const [activeFilter, setActiveFilter] = useState('All Time');

  const myRank = leaderboard.find((e) => e.isCurrentUser)?.rank || 7;
  const xpToTop5 = leaderboard[4].xp - currentUser.xp + 10;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">Local Leaderboard</h1>
        <p className="mt-1 text-slate-500">See how you rank against your peers and climb the leaderboard.</p>
      </div>

      {/* My Rank Card */}
      <div className="card p-6 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-white/80">Your Rank</p>
              <p className="text-3xl font-bold">#{myRank}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/80">Your XP</p>
            <p className="text-3xl font-bold">{currentUser.xp.toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-white/80" />
          <p className="text-sm text-white/90">Only {xpToTop5} XP away from the Top 5! Keep learning to climb up.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`chip transition-colors ${activeFilter === f ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="card overflow-hidden">
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 text-xs font-bold text-slate-400 uppercase">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">Learner</div>
          <div className="col-span-3">Department</div>
          <div className="col-span-2">XP</div>
          <div className="col-span-1">Streak</div>
        </div>
        <div className="divide-y divide-slate-50">
          {leaderboard.map((entry) => {
            const RankIcon = entry.rank <= 3 ? rankIcons[entry.rank - 1].icon : null;
            const rankColor = entry.rank <= 3 ? rankIcons[entry.rank - 1].color : '';
            return (
              <div
                key={entry.rank}
                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors ${entry.isCurrentUser ? 'bg-primary-50 border-l-4 border-primary-500' : 'hover:bg-slate-50'}`}
              >
                <div className="col-span-2 sm:col-span-1 flex items-center">
                  {RankIcon ? (
                    <RankIcon className={`w-6 h-6 ${rankColor}`} />
                  ) : (
                    <span className="text-sm font-bold text-slate-400">#{entry.rank}</span>
                  )}
                </div>
                <div className="col-span-10 sm:col-span-5 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white ${entry.isCurrentUser ? 'bg-gradient-to-br from-primary-500 to-accent-500' : 'bg-slate-300'}`}>
                    {entry.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${entry.isCurrentUser ? 'text-primary-700' : 'text-slate-900'}`}>
                      {entry.name} {entry.isCurrentUser && <span className="text-xs text-primary-500">(You)</span>}
                    </p>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3 text-sm text-slate-500">{entry.department}</div>
                <div className="col-span-4 sm:col-span-2 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-sm font-bold text-slate-900">{entry.xp.toLocaleString()}</span>
                </div>
                <div className="col-span-2 sm:col-span-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span className="text-sm font-semibold text-slate-600">{entry.streak}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-center text-sm text-slate-400 italic">"Only {xpToTop5} XP away from the Top 5!"</p>
    </div>
  );
}
