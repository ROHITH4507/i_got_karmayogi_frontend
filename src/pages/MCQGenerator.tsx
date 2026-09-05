import { useState } from 'react';
import {
  Sparkles,
  Loader2,
  Plus,
  RotateCcw,
  Pencil,
  Trash2,
  Save,
  Download,
  ListChecks,
  CheckCircle,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

const bloomLevels = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];
const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const questionTypes = ['MCQ', 'True/False', 'Multiple Select'];

interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
  competency: string;
}

const generatedMCQs: MCQ[] = [
  {
    id: 'mcq1',
    question: 'What is the primary goal of data governance in government organizations?',
    options: [
      'To restrict access to all government data',
      'To ensure data quality, security, and proper usage across departments',
      'To eliminate the use of data in decision-making',
      'To store all data in physical formats only',
    ],
    correctAnswer: 1,
    explanation: 'Data governance ensures that data is managed properly in terms of quality, security, and accessibility, enabling informed decision-making across government departments.',
    difficulty: 'Beginner',
    competency: 'Data Analytics',
  },
  {
    id: 'mcq2',
    question: 'Which chart type is most suitable for comparing categorical data across different government departments?',
    options: ['Pie Chart', 'Bar Chart', 'Scatter Plot', 'Line Chart'],
    correctAnswer: 1,
    explanation: 'Bar charts are ideal for comparing categorical data as they clearly show differences in magnitude between categories.',
    difficulty: 'Beginner',
    competency: 'Data Analytics',
  },
  {
    id: 'mcq3',
    question: 'In the context of predictive analytics, what does "feature engineering" refer to?',
    options: [
      'Building machine learning infrastructure',
      'Selecting and transforming variables to improve model performance',
      'Designing the visual features of a dashboard',
      'Creating new software features for data storage',
    ],
    correctAnswer: 1,
    explanation: 'Feature engineering involves selecting, combining, and transforming input variables to create more informative features that improve the performance of predictive models.',
    difficulty: 'Advanced',
    competency: 'Data Analytics',
  },
];

export default function MCQGenerator() {
  const { showToast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [mcqs, setMcqs] = useState<MCQ[]>(generatedMCQs);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [config, setConfig] = useState({
    source: 'Data Analytics for Government.pdf',
    topic: 'Data Analytics',
    numQuestions: 5,
    difficulty: 'Intermediate',
    bloomLevel: 'Apply',
    questionType: 'MCQ',
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setMcqs(generatedMCQs);
      showToast('MCQs generated successfully!', 'success');
    }, 2500);
  };

  const handleDelete = (id: string) => {
    setMcqs(mcqs.filter((m) => m.id !== id));
    showToast('MCQ deleted', 'info');
  };

  const handleSave = () => {
    showToast('MCQs saved to your library!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">AI MCQ Generator</h1>
        <p className="mt-1 text-slate-500">Create custom multiple-choice questions from your learning materials with AI.</p>
      </div>

      {/* Config */}
      <div className="card p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Source Material</label>
            <select value={config.source} onChange={(e) => setConfig({ ...config, source: e.target.value })} className="input">
              <option>Data Analytics for Government.pdf</option>
              <option>Digital Governance Fundamentals.pdf</option>
              <option>Cybersecurity Essentials.docx</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Topic</label>
            <input value={config.topic} onChange={(e) => setConfig({ ...config, topic: e.target.value })} className="input" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Number of Questions: {config.numQuestions}</label>
            <input type="range" min="3" max="15" value={config.numQuestions} onChange={(e) => setConfig({ ...config, numQuestions: Number(e.target.value) })} className="w-full accent-primary-600" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Difficulty</label>
            <select value={config.difficulty} onChange={(e) => setConfig({ ...config, difficulty: e.target.value })} className="input">
              {difficulties.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Bloom's Taxonomy Level</label>
            <select value={config.bloomLevel} onChange={(e) => setConfig({ ...config, bloomLevel: e.target.value })} className="input">
              {bloomLevels.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Question Type</label>
            <select value={config.questionType} onChange={(e) => setConfig({ ...config, questionType: e.target.value })} className="input">
              {questionTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <button onClick={handleGenerate} disabled={isGenerating} className="btn-primary w-full mt-5 py-3">
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating MCQs...</> : <><Sparkles className="w-5 h-5" /> Generate MCQs with AI</>}
        </button>
      </div>

      {/* Generated MCQs */}
      {mcqs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Generated MCQs ({mcqs.length})</h2>
            <div className="flex gap-2">
              <button onClick={() => showToast('MCQs exported as PDF', 'success')} className="btn-secondary text-sm">
                <Download className="w-4 h-4" /> Export
              </button>
              <button onClick={handleSave} className="btn-primary text-sm">
                <Save className="w-4 h-4" /> Save All
              </button>
            </div>
          </div>

          {mcqs.map((mcq, i) => (
            <div key={mcq.id} className="card p-5 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 text-sm font-bold flex items-center justify-center">{i + 1}</span>
                  <div className="flex gap-1.5">
                    <span className="chip bg-slate-100 text-slate-600">{mcq.difficulty}</span>
                    <span className="chip bg-primary-50 text-primary-600">{mcq.competency}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => setEditingId(editingId === mcq.id ? null : mcq.id)} className="p-2 rounded-lg hover:bg-slate-100" aria-label="Edit">
                    <Pencil className="w-4 h-4 text-slate-400" />
                  </button>
                  <button onClick={() => handleDelete(mcq.id)} className="p-2 rounded-lg hover:bg-error-50" aria-label="Delete">
                    <Trash2 className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              <p className="text-sm font-semibold text-slate-900 mb-3">{mcq.question}</p>

              <div className="space-y-2">
                {mcq.options.map((opt, idx) => (
                  <div key={idx} className={`flex items-center gap-2.5 p-2.5 rounded-lg text-sm ${idx === mcq.correctAnswer ? 'bg-success-50 border border-success-200' : 'bg-slate-50'}`}>
                    <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${idx === mcq.correctAnswer ? 'bg-success-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {idx === mcq.correctAnswer ? <CheckCircle className="w-3 h-3" /> : String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-slate-600">{opt}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 p-3 rounded-lg bg-primary-50/50 border border-primary-100">
                <p className="text-xs font-semibold text-primary-700 mb-1">Explanation</p>
                <p className="text-xs text-slate-600 leading-relaxed">{mcq.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
