import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, Building, ArrowRight, Phone } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

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
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-8 h-0.5 ${step > s ? 'bg-primary-600' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <h1 className="font-display text-2xl font-bold text-slate-900 text-center">Create your account</h1>
              <p className="mt-1 text-sm text-slate-500 text-center">Step 1: Personal Information</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input className="input pl-10" placeholder="Arjun Sharma" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input className="input pl-10" placeholder="arjun.sharma@gov.in" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="password" className="input pl-10" placeholder="••••••••" />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="btn-primary w-full py-3">Continue <ArrowRight className="w-4 h-4" /></button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="font-display text-2xl font-bold text-slate-900 text-center">Government Details</h1>
              <p className="mt-1 text-sm text-slate-500 text-center">Step 2: Employment Information</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Employee ID</label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input className="input pl-10" placeholder="GOV-2021-45821" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department</label>
                  <input className="input" placeholder="Digital Services" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Organization</label>
                  <input className="input" placeholder="Ministry of Electronics & IT" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input className="input pl-10" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-secondary flex-1 py-3">Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary flex-1 py-3">Continue</button>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="font-display text-2xl font-bold text-slate-900 text-center">Verify OTP</h1>
              <p className="mt-1 text-sm text-slate-500 text-center">Step 3: Enter the 6-digit code sent to your email</p>
              <div className="mt-6 space-y-4">
                <div className="flex gap-2 justify-center">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-slate-500">Didn't receive the code? <button className="font-semibold text-primary-600">Resend OTP</button></p>
                <button onClick={() => navigate('/dashboard')} className="btn-primary w-full py-3">Verify & Create Account</button>
                <button onClick={() => setStep(2)} className="btn-secondary w-full py-3">Back</button>
              </div>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="font-semibold text-primary-600 hover:text-primary-700">Sign in</button>
        </p>
      </div>
    </div>
  );
}
