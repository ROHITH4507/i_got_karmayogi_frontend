import { useState } from 'react';
import {
  Globe,
  RefreshCw,
  CheckCircle,
  Loader2,
  ExternalLink,
  BookOpen,
  Clock,
  TrendingUp,
  Wifi,
  Sparkles,
} from 'lucide-react';
import { igotCourses } from '@/data/mockData';
import ProgressBar from '@/components/ui/ProgressBar';
import { useToast } from '@/components/ui/Toast';

export default function IGotKarmayogi() {
  const { showToast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);
  const [synced, setSynced] = useState(true);

  const handleSync = () => {
    setIsSyncing(true);
    setSynced(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSynced(true);
      showToast('Successfully synced with iGOT Karmayogi!', 'success');
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">iGOT Karmayogi</h1>
        <p className="mt-1 text-slate-500">Connect with the iGOT Karmayogi ecosystem to access government courses and track your learning.</p>
      </div>

      {/* Connection Status */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-md">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">iGOT Karmayogi</h2>
                <span className="chip bg-success-50 text-success-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-500" /> Connected
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">Last synchronized: Today, 10:42 AM</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSync} disabled={isSyncing} className="btn-primary">
              {isSyncing ? <><Loader2 className="w-4 h-4 animate-spin" /> Syncing...</> : <><RefreshCw className="w-4 h-4" /> Sync Courses</>}
            </button>
            <button onClick={() => showToast('Opening iGOT Karmayogi portal...', 'info')} className="btn-secondary">
              <ExternalLink className="w-4 h-4" /> Open Portal
            </button>
          </div>
        </div>

        {/* Sync animation */}
        {isSyncing && (
          <div className="mt-4 p-4 rounded-xl bg-primary-50 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-primary-600 animate-spin" />
                <span className="text-sm font-semibold text-primary-700">Syncing courses...</span>
              </div>
            </div>
            <div className="mt-2 space-y-1 text-xs text-slate-500">
              <p className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-success-500" /> Fetching course catalog</p>
              <p className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-success-500" /> Updating progress</p>
              <p className="flex items-center gap-1.5 opacity-50">Syncing competencies...</p>
            </div>
          </div>
        )}

        {synced && !isSyncing && (
          <div className="mt-4 p-4 rounded-xl bg-success-50 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success-600" />
            <span className="text-sm font-semibold text-success-700">Successfully Synced · All courses up to date</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-5 h-5 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{igotCourses.length}</p>
          <p className="text-xs text-slate-400">iGOT Courses</p>
        </div>
        <div className="card p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-success-100 flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-5 h-5 text-success-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{igotCourses.filter(c => c.progress === 100).length}</p>
          <p className="text-xs text-slate-400">Completed</p>
        </div>
        <div className="card p-5 text-center">
          <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-5 h-5 text-accent-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{igotCourses.filter(c => c.progress > 0 && c.progress < 100).length}</p>
          <p className="text-xs text-slate-400">In Progress</p>
        </div>
      </div>

      {/* Recommended iGOT Courses */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-bold text-slate-900">Recommended iGOT Courses</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {igotCourses.map((course, i) => (
            <div key={course.id} className="card p-5 hover:shadow-glow transition-all animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{course.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
                    <Clock className="w-3 h-3" /> {course.duration}
                    <span className="text-slate-300">·</span>
                    <span className="chip bg-primary-50 text-primary-600 text-[10px]">{course.competency}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Globe className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-400">{course.source}</span>
                  </div>
                  {course.progress > 0 && (
                    <div className="mt-3">
                      <ProgressBar value={course.progress} showLabel size="sm" color={course.progress === 100 ? 'success' : 'primary'} />
                    </div>
                  )}
                  <button className={`mt-3 w-full text-sm py-2 rounded-xl font-semibold transition-colors ${course.progress === 100 ? 'bg-success-50 text-success-700' : 'bg-primary-600 text-white hover:bg-primary-700'}`}>
                    {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Info */}
      <div className="card p-5 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-100">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Wifi className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Integration Layer</p>
            <p className="text-xs text-slate-500 mt-1">This is a simulated integration with the iGOT Karmayogi ecosystem. The frontend is built with a clean API service layer that can be connected to the real iGOT Karmayogi API when available.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
