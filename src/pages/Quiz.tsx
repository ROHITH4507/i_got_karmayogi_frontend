import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  HelpCircle,
  FileText,
  Clock,
  Loader2,
  ArrowRight,
  ListChecks,
  Plus,
} from 'lucide-react';
import { sampleQuiz, sampleMaterial } from '@/data/mockData';
import { useToast } from '@/components/ui/Toast';

const questionTypes = ['MCQ', 'True/False', 'Multiple Select', 'Scenario Based'];
const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const bloomLevels = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];

export default function Quiz() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [config, setConfig] = useState({
    material: sampleMaterial.name,
    numQuestions: 5,
    difficulty: 'Intermediate',
    topic: 'Data Analytics',
    questionType: 'MCQ',
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast('Quiz generated successfully!', 'success');
      navigate(`/quiz/${sampleQuiz.id}`);
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">Quizzes & MCQs</h1>
        <p className="mt-1 text-slate-500">Generate AI-powered quizzes from your uploaded learning materials.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quiz Generator */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">AI Quiz Generator</h2>
              <p className="text-sm text-slate-500">Configure and generate a custom quiz</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Source Material */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Source Material</label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={config.material}
                  onChange={(e) => setConfig({ ...config, material: e.target.value })}
                  className="input pl-10"
                >
                  <option>{sampleMaterial.name}</option>
                  <option>Digital Governance Fundamentals.pdf</option>
                  <option>Cybersecurity Essentials.docx</option>
                </select>
              </div>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Number of Questions: {config.numQuestions}</label>
              <input
                type="range"
                min="3"
                max="20"
                value={config.numQuestions}
                onChange={(e) => setConfig({ ...config, numQuestions: Number(e.target.value) })}
                className="w-full accent-primary-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>3</span><span>20</span></div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Difficulty</label>
              <div className="flex gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setConfig({ ...config, difficulty: d })}
                    className={`chip flex-1 justify-center ${config.difficulty === d ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Topic / Focus Area</label>
              <input
                value={config.topic}
                onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                className="input"
                placeholder="e.g. Data Analytics"
              />
            </div>

            {/* Question Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Question Type</label>
              <div className="grid grid-cols-2 gap-2">
                {questionTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setConfig({ ...config, questionType: t })}
                    className={`chip justify-center py-2.5 ${config.questionType === t ? 'bg-accent-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn-primary w-full py-3 text-base"
            >
              {isGenerating ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Generating Quiz...</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Generate Quiz with AI</>
              )}
            </button>

            {isGenerating && (
              <div className="space-y-2 p-4 rounded-xl bg-primary-50 animate-fade-in">
                <p className="text-xs text-primary-600 font-semibold flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Analyzing source material...</p>
                <p className="text-xs text-primary-600 font-semibold flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Identifying key concepts...</p>
                <p className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 opacity-50">Generating questions...</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="font-bold text-slate-900 mb-3">Recent Quizzes</h3>
            <div className="space-y-3">
              {[
                { title: 'Data Analytics Fundamentals', score: 82, date: '2 days ago' },
                { title: 'Digital Governance Basics', score: 95, date: '5 days ago' },
                { title: 'Communication Skills', score: 78, date: '1 week ago' },
              ].map((q, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => navigate(`/quiz/${sampleQuiz.id}`)}>
                  <p className="text-sm font-semibold text-slate-900">{q.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {q.date}</span>
                    <span className={`text-xs font-bold ${q.score >= 80 ? 'text-success-600' : 'text-warning-600'}`}>{q.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <button onClick={() => navigate('/mcq-generator')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                <ListChecks className="w-5 h-5 text-accent-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900">MCQ Generator</p>
                <p className="text-xs text-slate-400">Create custom MCQs</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 ml-auto" />
            </button>
            <button onClick={() => navigate('/interactive-learning')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors mt-1">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <Plus className="w-5 h-5 text-violet-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-900">Interactive Learning</p>
                <p className="text-xs text-slate-400">Learn · Practice · Test · Reflect</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 ml-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
