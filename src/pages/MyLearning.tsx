import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, Star, Users, ArrowRight, CheckCircle, Play, Lock, Trophy } from 'lucide-react';
import { courses, currentUser } from '@/data/mockData';
import ProgressBar from '@/components/ui/ProgressBar';

export default function MyLearning() {
  const navigate = useNavigate();
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);
  const completed = courses.filter((c) => c.progress === 100);
  const notStarted = courses.filter((c) => c.progress === 0);

  const sections = [
    { title: 'Continue Learning', courses: inProgress, empty: 'No courses in progress.' },
    { title: 'Not Started', courses: notStarted, empty: 'All caught up!' },
    { title: 'Completed', courses: completed, empty: 'No completed courses yet.' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">My Learning</h1>
        <p className="mt-1 text-slate-500">Track your enrolled courses and continue where you left off.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-primary-600">{inProgress.length}</p>
          <p className="text-xs text-slate-400 mt-1">In Progress</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-success-600">{completed.length}</p>
          <p className="text-xs text-slate-400 mt-1">Completed</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-2xl font-bold text-slate-700">{currentUser.learningHours}h</p>
          <p className="text-xs text-slate-400 mt-1">Total Hours</p>
        </div>
      </div>

      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-lg font-bold text-slate-900 mb-3">{section.title}</h2>
          {section.courses.length === 0 ? (
            <p className="text-sm text-slate-400 py-4">{section.empty}</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.courses.map((course) => (
                <div key={course.id} className="card overflow-hidden hover:shadow-glow transition-all cursor-pointer" onClick={() => navigate(`/learning/${course.id}`)}>
                  <div className={`h-24 bg-gradient-to-br ${course.thumbnail} relative flex items-center justify-center`}>
                    <BookOpen className="w-8 h-8 text-white/80" />
                    {course.progress === 100 && (
                      <div className="absolute top-2 right-2 chip bg-white/90 text-success-700"><Trophy className="w-3 h-3" /> Done</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{course.title}</h3>
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                      <Clock className="w-3 h-3" /> {course.duration}
                      <Star className="w-3 h-3 text-amber-400" /> {course.rating}
                    </div>
                    {course.progress > 0 && course.progress < 100 && (
                      <div className="mt-3">
                        <ProgressBar value={course.progress} showLabel size="sm" />
                        <button className="btn-primary w-full mt-3 text-xs py-2">Continue <Play className="w-3 h-3" /></button>
                      </div>
                    )}
                    {course.progress === 0 && (
                      <button className="btn-secondary w-full mt-3 text-xs py-2">Start Course <ArrowRight className="w-3 h-3" /></button>
                    )}
                    {course.progress === 100 && (
                      <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-success-600">
                        <CheckCircle className="w-4 h-4" /> Completed
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
