import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Flame, Target, Menu, ChevronDown, Settings, User, LogOut, CheckCircle } from 'lucide-react';
import { currentUser, notifications } from '@/data/mockData';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const weeklyProgress = (currentUser.weeklyHoursDone / currentUser.weeklyGoalHours) * 100;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="flex items-center gap-3 px-4 lg:px-6 h-16">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-slate-100" aria-label="Open menu">
          <Menu className="w-5 h-5 text-slate-600" />
        </button>

        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, materials, quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setTimeout(() => setShowSearch(false), 200)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>
          {showSearch && searchQuery && (
            <div className="absolute top-full mt-2 w-full card p-3 animate-scale-in z-30">
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Quick Results</p>
              <div className="space-y-1">
                <button onClick={() => navigate('/explore')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-left">
                  <Search className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-700">Search "{searchQuery}" in courses</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-700">{currentUser.streak}</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-50">
            <Target className="w-4 h-4 text-primary-600" />
            <div className="flex items-center gap-1.5">
              <div className="w-12 h-1.5 bg-primary-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-600 rounded-full" style={{ width: `${weeklyProgress}%` }} />
              </div>
              <span className="text-xs font-bold text-primary-700">{Math.round(weeklyProgress)}%</span>
            </div>
          </div>

          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-error-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotif && (
              <div className="absolute top-full right-0 mt-2 w-80 card p-3 animate-scale-in z-30 max-h-96 overflow-y-auto scrollbar-thin">
                <div className="flex items-center justify-between px-2 py-1 mb-2">
                  <p className="text-sm font-bold text-slate-900">Notifications</p>
                  <span className="text-xs text-primary-600 font-semibold">{unreadCount} new</span>
                </div>
                {notifications.slice(0, 5).map((n) => (
                  <div key={n.id} className={`flex gap-3 px-2 py-2.5 rounded-lg hover:bg-slate-50 cursor-pointer ${!n.read ? 'bg-primary-50/50' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${n.read ? 'bg-slate-100' : 'bg-primary-100'}`}>
                      <CheckCircle className={`w-4 h-4 ${n.read ? 'text-slate-400' : 'text-primary-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{n.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-2">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
                <button onClick={() => { navigate('/notifications'); setShowNotif(false); }} className="w-full text-center text-sm text-primary-600 font-semibold py-2 hover:bg-slate-50 rounded-lg mt-1">
                  View all notifications
                </button>
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-1 pr-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                {currentUser.avatar}
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden lg:block" />
            </button>
            {showProfile && (
              <div className="absolute top-full right-0 mt-2 w-56 card p-2 animate-scale-in z-30">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                </div>
                <button onClick={() => { navigate('/profile'); setShowProfile(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm text-slate-700">
                  <User className="w-4 h-4 text-slate-400" /> My Profile
                </button>
                <button onClick={() => { navigate('/settings'); setShowProfile(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm text-slate-700">
                  <Settings className="w-4 h-4 text-slate-400" /> Settings
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-error-50 text-sm text-error-600">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
