import { useNavigate, useParams } from 'react-router-dom';
import {
  Sparkles,
  FileText,
  Lightbulb,
  ListChecks,
  Tag,
  Target,
  Gauge,
  Download,
  HelpCircle,
  Brain,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { sampleMaterial } from '@/data/mockData';
import { useToast } from '@/components/ui/Toast';

export default function MaterialSummary() {
  const navigate = useNavigate();
  const { materialId } = useParams();
  const { showToast } = useToast();
  const material = sampleMaterial;
  const summary = material.summary!;

  const diffColors = {
    Beginner: 'bg-success-50 text-success-700',
    Intermediate: 'bg-warning-50 text-warning-700',
    Advanced: 'bg-error-50 text-error-700',
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-900">AI Learning Summary</h1>
              <p className="text-sm text-slate-500">{material.name} · {material.size}</p>
            </div>
          </div>
        </div>
        <button onClick={() => showToast('Summary downloaded as PDF', 'success')} className="btn-secondary">
          <Download className="w-4 h-4" /> Download Summary
        </button>
      </div>

      {/* Executive Summary */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Executive Summary</h2>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{summary.executiveSummary}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Key Concepts */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-accent-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Key Concepts</h2>
          </div>
          <div className="space-y-3">
            {summary.keyConcepts.map((c, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-primary-50/50 transition-colors">
                <p className="text-sm font-bold text-slate-900">{c.title}</p>
                <p className="text-xs text-slate-500 mt-1">{c.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Points */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-warning-100 flex items-center justify-center">
              <ListChecks className="w-4 h-4 text-warning-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Important Points</h2>
          </div>
          <ul className="space-y-2.5">
            {summary.importantPoints.map((p, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Terms */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-success-100 flex items-center justify-center">
            <Tag className="w-4 h-4 text-success-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Key Terms</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {summary.keyTerms.map((t) => (
            <span key={t} className="chip bg-slate-100 text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors cursor-default">{t}</span>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Learning Objectives */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
              <Target className="w-4 h-4 text-primary-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Learning Objectives</h2>
          </div>
          <ul className="space-y-3">
            {summary.learningObjectives.map((o, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                  <Target className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{o}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Difficulty Analysis */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
              <Gauge className="w-4 h-4 text-violet-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">AI Difficulty Analysis</h2>
          </div>
          <div className="space-y-3">
            {['Beginner', 'Intermediate', 'Advanced'].map((d) => (
              <div key={d} className={`p-3 rounded-xl border-2 flex items-center justify-between ${d === summary.difficulty ? 'border-primary-300 bg-primary-50' : 'border-slate-100 opacity-50'}`}>
                <span className="text-sm font-semibold text-slate-700">{d}</span>
                {d === summary.difficulty && <span className={`chip ${diffColors[d as keyof typeof diffColors]}`}>Recommended</span>}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">Based on content complexity, vocabulary level, and concept density.</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">What would you like to do next?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button onClick={() => navigate('/quiz')} className="btn-primary justify-start">
            <HelpCircle className="w-4 h-4" /> Generate Quiz <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </button>
          <button onClick={() => navigate('/mcq-generator')} className="btn-primary justify-start">
            <ListChecks className="w-4 h-4" /> Generate MCQs <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </button>
          <button onClick={() => showToast('Flashcards created!', 'success')} className="btn-secondary justify-start">
            <Layers className="w-4 h-4" /> Create Flashcards <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </button>
          <button onClick={() => navigate('/interactive-learning')} className="btn-secondary justify-start">
            <Brain className="w-4 h-4" /> Start Interactive Learning <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </button>
          <button onClick={() => showToast('Summary downloaded', 'success')} className="btn-secondary justify-start">
            <Download className="w-4 h-4" /> Download Summary <ArrowRight className="w-3.5 h-3.5 ml-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}
