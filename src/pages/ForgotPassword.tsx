import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md animate-slide-up">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-slate-900">Karmasetu</span>
        </div>

        <div className="card p-8">
          {!sent ? (
            <>
              <h1 className="font-display text-2xl font-bold text-slate-900 text-center">Forgot password?</h1>
              <p className="mt-2 text-sm text-slate-500 text-center">Enter your email address and we'll send you a reset link</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input className="input pl-10" placeholder="arjun.sharma@gov.in" />
                  </div>
                </div>
                <button onClick={() => setSent(true)} className="btn-primary w-full py-3">Send Reset Link <ArrowRight className="w-4 h-4" /></button>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-success-50 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-success-500" />
              </div>
              <h1 className="font-display text-2xl font-bold text-slate-900 text-center">Check your email</h1>
              <p className="mt-2 text-sm text-slate-500 text-center">We've sent a password reset link to your email address. Please check your inbox.</p>
              <button onClick={() => navigate('/login')} className="btn-primary w-full py-3 mt-6">Back to Login</button>
            </>
          )}
          <button onClick={() => navigate('/login')} className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700">
            <ArrowLeft className="w-4 h-4" /> Back to login
          </button>
        </div>
      </div>
    </div>
  );
}
