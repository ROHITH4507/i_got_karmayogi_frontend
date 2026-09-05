import { Sparkles, MessageSquare, Bot, Send } from 'lucide-react';

export default function AIAssistantPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">AI Learning Assistant</h1>
        <p className="mt-1 text-slate-500">Your personal AI tutor for competency gaps, course recommendations, and quiz preparation.</p>
      </div>

      <div className="card p-8 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Bot className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Chat with your AI Assistant</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          The AI Learning Assistant is available as a floating button at the bottom-right corner of every page. Click it to start a conversation about your learning journey.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 gap-3 text-left">
          {[
            { icon: MessageSquare, title: 'Explain topics', desc: 'Get clear explanations of any concept' },
            { icon: Sparkles, title: 'Course recommendations', desc: 'Find what to learn next based on your gaps' },
            { icon: Bot, title: 'Quiz preparation', desc: 'Practice questions and study tips' },
            { icon: Send, title: 'Competency insights', desc: 'Understand your strengths and weaknesses' },
          ].map((f) => (
            <div key={f.title} className="p-4 rounded-xl bg-slate-50 hover:bg-primary-50/50 transition-colors">
              <f.icon className="w-5 h-5 text-primary-600 mb-2" />
              <p className="text-sm font-bold text-slate-900">{f.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100">
          <p className="text-sm text-slate-600">
            <Sparkles className="w-4 h-4 text-primary-600 inline mr-1" />
            Look for the floating <strong className="text-primary-700">AI Assistant</strong> button at the bottom-right of your screen to start chatting!
          </p>
        </div>
      </div>
    </div>
  );
}
