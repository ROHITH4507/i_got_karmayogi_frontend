import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Brain,
  Route,
  FileText,
  HelpCircle,
  Globe,
  Trophy,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { competencies } from '@/data/mockData';

const features = [
  { icon: Brain, title: 'AI Competency Analysis', desc: 'Identify skill gaps with AI-powered competency assessments tailored to your role.', color: 'from-blue-500 to-blue-700' },
  { icon: Route, title: 'Personalized Learning', desc: 'Get AI-recommended learning paths based on your competency gaps and goals.', color: 'from-cyan-500 to-blue-600' },
  { icon: FileText, title: 'AI Summaries', desc: 'Upload any material and get instant AI-generated summaries and key concepts.', color: 'from-emerald-500 to-teal-700' },
  { icon: HelpCircle, title: 'Quiz & MCQ Generation', desc: 'Automatically generate quizzes and MCQs from your uploaded learning materials.', color: 'from-amber-500 to-orange-600' },
  { icon: Globe, title: 'iGOT Integration', desc: 'Seamlessly connect with the iGOT Karmayogi ecosystem for government courses.', color: 'from-indigo-500 to-blue-700' },
  { icon: Trophy, title: 'Gamified Learning', desc: 'Earn XP, unlock achievements, and compete on the local leaderboard.', color: 'from-orange-500 to-red-600' },
];

const radarData = competencies.map((c) => ({ subject: c.name.split(' ')[0], score: c.score, fullMark: 100 }));

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50/30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />
        </div>
        <nav className="relative max-w-7xl mx-auto px-4 lg:px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-slate-900 leading-none">Karmasetu</h1>
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">AI Learning Platform</p>
            </div>
          </div>
          <button onClick={() => navigate('/login')} className="btn-secondary">
            Sign In
          </button>
        </nav>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 pt-12 pb-20 lg:pt-20 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-6">
                <Zap className="w-3.5 h-3.5 text-primary-600" />
                <span className="text-xs font-semibold text-primary-700">SIH 2026 · Powered by AI</span>
              </div>
              <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Learn Smarter.<br />
                Build Competencies.<br />
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Serve Better.</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 max-w-md leading-relaxed">
                An AI-powered personalized learning platform connected with the iGOT Karmayogi ecosystem for government employees.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => navigate('/login')} className="btn-primary text-base px-6 py-3">
                  Start Learning <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => navigate('/dashboard')} className="btn-secondary text-base px-6 py-3">
                  Explore Platform
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" /> 12,000+ Learners
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" /> 500+ Courses
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="relative animate-scale-in">
              <div className="card p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase">Competency Profile</p>
                    <h3 className="text-lg font-bold text-slate-900">Your Skills Overview</h3>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-success-50 text-success-700 text-xs font-bold">Live</div>
                </div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                      <Radar dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.3} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">72%</p>
                    <p className="text-xs text-slate-400">Overall</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">8</p>
                    <p className="text-xs text-slate-400">Courses</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">2,450</p>
                    <p className="text-xs text-slate-400">XP Earned</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 card px-3 py-2 flex items-center gap-2 shadow-lg animate-float">
                <ShieldCheck className="w-4 h-4 text-success-500" />
                <span className="text-xs font-semibold text-slate-700">iGOT Connected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Platform Features</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900">Everything you need to grow</h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">A comprehensive learning platform designed for government employees to build competencies and advance their careers.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="card p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-md`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">The Learning Journey</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900">From gaps to growth</h2>
          </div>
          <div className="space-y-1">
            {['Login & Assess Competencies', 'Get AI-Powered Learning Path', 'Learn with AI-Generated Summaries', 'Practice with Smart Quizzes', 'Track Progress & Earn Achievements'].map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {i + 1}
                  </div>
                  {i < 4 && <div className="w-0.5 h-10 bg-slate-200" />}
                </div>
                <p className="text-base font-semibold text-slate-700 py-2">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 p-10 lg:p-16 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <TrendingUp className="w-12 h-12 text-white/80 mx-auto mb-4" />
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">Ready to start your learning journey?</h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">Join thousands of government employees building competencies with AI-powered personalized learning.</p>
            <button onClick={() => navigate('/login')} className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-primary-700 font-bold text-base hover:scale-105 transition-transform shadow-lg">
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-700">Karmasetu</span>
          </div>
          <p className="text-xs text-slate-400">SIH 2026 · AI-Powered Personalized Learning Platform · Connected with iGOT Karmayogi</p>
        </div>
      </footer>
    </div>
  );
}
