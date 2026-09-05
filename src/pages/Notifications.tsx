import { useState } from 'react';
import {
  Bell,
  CheckCircle,
  Sparkles,
  Flame,
  Target,
  BookOpen,
  TrendingUp,
  Brain,
  CheckCheck,
} from 'lucide-react';
import { notifications as initialNotifications } from '@/data/mockData';

const iconMap: Record<string, typeof Bell> = {
  Sparkles, Flame, Target, BookOpen, TrendingUp, Brain, CheckCircle,
};

const typeColors: Record<string, string> = {
  ai: 'bg-primary-100 text-primary-600',
  streak: 'bg-orange-100 text-orange-600',
  igot: 'bg-accent-100 text-accent-600',
  goal: 'bg-violet-100 text-violet-600',
  achievement: 'bg-amber-100 text-amber-600',
  quiz: 'bg-success-100 text-success-600',
  competency: 'bg-cyan-100 text-cyan-600',
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">Notifications</h1>
          <p className="mt-1 text-slate-500">Stay updated on your learning journey.</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="btn-secondary text-sm">
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`chip ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`chip ${filter === 'unread' ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600'}`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="card p-8 text-center">
            <CheckCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">You're all caught up! No unread notifications.</p>
          </div>
        ) : (
          filtered.map((n, i) => {
            const Icon = iconMap[n.icon] || Bell;
            return (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`card p-4 flex gap-3 cursor-pointer transition-all hover:shadow-glow animate-slide-up ${!n.read ? 'border-l-4 border-primary-500' : ''}`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[n.type] || 'bg-slate-100 text-slate-500'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-slate-900">{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{n.time}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
