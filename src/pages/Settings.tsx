import { useState } from 'react';
import {
  Bell,
  Clock,
  Mail,
  Globe,
  Target,
  Smartphone,
  Save,
} from 'lucide-react';
import { currentUser } from '@/data/mockData';
import { useToast } from '@/components/ui/Toast';

export default function Settings() {
  const { showToast } = useToast();
  const [prefs, setPrefs] = useState(currentUser.preferences);

  const handleSave = () => {
    showToast('Settings saved successfully!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-slate-500">Manage your learning preferences, reminders, and notifications.</p>
      </div>

      {/* Weekly Goal */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Weekly Learning Goal</h2>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Weekly hours goal: {currentUser.weeklyGoalHours} hours</label>
          <input type="range" min="2" max="20" defaultValue={currentUser.weeklyGoalHours} className="w-full accent-primary-600" />
          <div className="flex justify-between text-xs text-slate-400 mt-1"><span>2 hrs</span><span>20 hrs</span></div>
        </div>
      </div>

      {/* Reminders */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Learning Reminders</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Daily Reminder</p>
                <p className="text-xs text-slate-400">Get a daily nudge to keep your streak alive</p>
              </div>
            </div>
            <button
              onClick={() => setPrefs({ ...prefs, dailyReminder: !prefs.dailyReminder })}
              className={`w-11 h-6 rounded-full transition-colors relative ${prefs.dailyReminder ? 'bg-primary-600' : 'bg-slate-300'}`}
              aria-label="Toggle daily reminder"
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${prefs.dailyReminder ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Weekly Summary</p>
                <p className="text-xs text-slate-400">Receive a weekly progress summary via email</p>
              </div>
            </div>
            <button
              onClick={() => setPrefs({ ...prefs, weeklyReminder: !prefs.weeklyReminder })}
              className={`w-11 h-6 rounded-full transition-colors relative ${prefs.weeklyReminder ? 'bg-primary-600' : 'bg-slate-300'}`}
              aria-label="Toggle weekly reminder"
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${prefs.weeklyReminder ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Preferred Reminder Time</label>
            <input type="time" defaultValue={prefs.reminderTime} className="input" />
          </div>
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-accent-100 flex items-center justify-center">
            <Globe className="w-5 h-5 text-accent-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Learning Preferences</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Preferred Difficulty</label>
            <select className="input" defaultValue={prefs.preferredDifficulty}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Preferred Language</label>
            <select className="input" defaultValue={prefs.preferredLanguage}>
              <option>English</option>
              <option>हिंदी</option>
              <option>தமிழ்</option>
              <option>తెలుగు</option>
              <option>বাংলা</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Preferred Session Duration</label>
            <select className="input" defaultValue={prefs.preferredDuration}>
              <option>15-30 min</option>
              <option>30-60 min</option>
              <option>60+ min</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-violet-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Interests</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {prefs.interests.map((i) => (
            <span key={i} className="chip bg-primary-50 text-primary-700">{i}</span>
          ))}
          <button className="chip bg-slate-100 text-slate-500 hover:bg-slate-200">+ Add Interest</button>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>
    </div>
  );
}
