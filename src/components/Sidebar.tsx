import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Route,
  Compass,
  Sparkles,
  Upload,
  HelpCircle,
  TrendingUp,
  Trophy,
  Award,
  Globe,
  Bell,
  User,
  Settings,
  Flame,
  LogOut,
  X,
} from 'lucide-react';
import { currentUser } from '@/data/mockData';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/learning', label: 'My Learning', icon: BookOpen },
  { to: '/personalized-path', label: 'Personalized Path', icon: Route },
  { to: '/explore', label: 'Explore Courses', icon: Compass },
  { to: '/ai-assistant', label: 'AI Assistant', icon: Sparkles },
  { to: '/upload-material', label: 'Upload Materials', icon: Upload },
  { to: '/quiz', label: 'Quizzes & MCQs', icon: HelpCircle },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/achievements', label: 'Achievements', icon: Award },
  { to: '/igot', label: 'iGOT Karmayogi', icon: Globe },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-slate-900 leading-none">Karmasetu</h1>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">AI Learning Platform</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100" aria-label="Close menu">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
            >
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-3 space-y-3">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">{currentUser.streak} Day Streak</p>
              <p className="text-[10px] text-slate-500">Keep it going!</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
              {currentUser.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{currentUser.designation}</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Logout">
              <LogOut className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
