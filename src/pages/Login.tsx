import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, User, Building } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600 p-12 flex-col justify-between">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-white">Karmasetu</span>
        </div>
        <div className="relative">
          <h2 className="font-display text-4xl font-bold text-white leading-tight">AI-Powered Learning<br />for Better Competencies</h2>
          <p className="mt-4 text-white/80 text-lg max-w-md">Identify competency gaps, get personalized training, and generate quizzes from your learning materials.</p>
          <div className="mt-8 space-y-3">
            {['Personalized AI learning paths', 'Competency gap analysis', 'iGOT Karmayogi integration'].map((t) => (
              <div key={t} className="flex items-center gap-3 text-white/90">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-white/60 text-sm">SIH 2026 · Smart India Hackathon</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900">Karmasetu</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-500">Sign in to continue your learning journey</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email or Employee ID</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arjun.sharma@gov.in"
                  className="input pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pl-10 pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Toggle password">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                Remember me
              </label>
              <button type="button" onClick={() => navigate('/forgot-password')} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                Forgot password?
              </button>
            </div>
            <button type="submit" className="btn-primary w-full text-base py-3">
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary w-full text-base py-3">
              Demo Login
            </button>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <div className="relative flex justify-center"><span className="bg-slate-50 px-3 text-xs text-slate-400">or</span></div>
            </div>
            <button type="button" className="btn-secondary w-full text-base py-3">
              <Building className="w-4 h-4" /> Continue with iGOT Karmayogi
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <button onClick={() => navigate('/register')} className="font-semibold text-primary-600 hover:text-primary-700">
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
