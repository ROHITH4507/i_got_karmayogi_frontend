import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Lock,
  Play,
  Clock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import { learningPath } from '@/data/mockData';
import Modal from '@/components/ui/Modal';
import ProgressBar from '@/components/ui/ProgressBar';

const statusConfig = {
  Completed: { color: 'bg-success-100 text-success-700', border: 'border-success-200', icon: CheckCircle },
  'In Progress': { color: 'bg-primary-100 text-primary-700', border: 'border-primary-200', icon: Play },
  Recommended: { color: 'bg-warning-100 text-warning-700', border: 'border-warning-200', icon: Sparkles },
  Locked: { color: 'bg-slate-100 text-slate-400', border: 'border-slate-200', icon: Lock },
};

export default function PersonalizedPath() {
  const navigate = useNavigate();
  const [reasonModal, setReasonModal] = useState<string | null>(null);
  const selectedModule = learningPath.find((m) => m.id === reasonModal);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">My Personalized Learning Path</h1>
        <p className="mt-1 text-slate-500">AI-recommended learning based on your competency gaps, quiz performance, and learning behavior.</p>
      </div>

      {/* AI Summary Banner */}
      <div className="card p-5 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-100">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Your AI-Generated Learning Path</p>
            <p className="text-sm text-slate-600 mt-1">This path was created based on your role as Assistant Director, your competency scores in Data Analytics (51%) and Cybersecurity (42%), and your previous course completions. Follow the sequence below to close your competency gaps.</p>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="card p-6 lg:p-8">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200" />

          <div className="space-y-6">
            {learningPath.map((module, index) => {
              const config = statusConfig[module.status];
              const StatusIcon = config.icon;
              return (
                <div key={module.id} className="relative pl-16 animate-slide-up" style={{ animationDelay: `${index * 80}ms` }}>
                  {/* Node */}
                  <div className={`absolute left-0 w-11 h-11 rounded-xl ${config.color} ${config.border} border-2 flex items-center justify-center shadow-sm`}>
                    <StatusIcon className="w-5 h-5" />
                  </div>

                  {/* Card */}
                  <div className={`card p-5 ${module.status === 'Locked' ? 'opacity-60' : ''} hover:shadow-glow transition-shadow`}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`chip ${config.color}`}>{module.status}</span>
                          <span className="chip bg-slate-100 text-slate-600">{module.difficulty}</span>
                          <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {module.duration}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900">{module.title}</h3>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {module.skills.map((s) => (
                            <span key={s} className="chip bg-primary-50 text-primary-600">{s}</span>
                          ))}
                        </div>
                        {module.status === 'In Progress' && (
                          <div className="mt-3">
                            <ProgressBar value={module.progress} showLabel size="sm" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 sm:items-end">
                        {module.status !== 'Locked' && module.status !== 'Completed' && (
                          <button
                            onClick={() => navigate('/learning/course3')}
                            className="btn-primary text-sm whitespace-nowrap"
                          >
                            {module.status === 'In Progress' ? 'Continue' : 'Start'} <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {module.status === 'Completed' && (
                          <span className="text-sm font-semibold text-success-600 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Completed
                          </span>
                        )}
                        <button
                          onClick={() => setReasonModal(module.id)}
                          className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
                        >
                          <HelpCircle className="w-3.5 h-3.5" /> Why is this recommended?
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Connector arrow */}
                  {index < learningPath.length - 1 && (
                    <div className="absolute left-3 -bottom-3 text-slate-300 text-xl">↓</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reason Modal */}
      <Modal isOpen={!!reasonModal} onClose={() => setReasonModal(null)} title="Why is this recommended?" size="md">
        {selectedModule && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{selectedModule.title}</h3>
                <p className="text-sm text-slate-500">{selectedModule.competency} · {selectedModule.difficulty}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700 leading-relaxed">{selectedModule.reason}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Skills you'll gain</p>
              <div className="flex flex-wrap gap-2">
                {selectedModule.skills.map((s) => (
                  <span key={s} className="chip bg-primary-50 text-primary-700">{s}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
