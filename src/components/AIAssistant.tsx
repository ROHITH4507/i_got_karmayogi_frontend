import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot } from 'lucide-react';
import { aiAssistantSuggestions, aiAssistantResponses } from '@/data/mockData';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      text: 'Hi! I\'m your AI Learning Assistant. I can help you with competency gaps, course recommendations, quiz preparation, and more. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = aiAssistantResponses[text] ||
        'I understand you\'re asking about "' + text + '". Based on your learning profile, I recommend focusing on your competency gaps in Data Analytics and Cybersecurity. Would you like me to create a personalized study plan or generate practice questions for you?';
      setMessages((prev) => [...prev, { id: Date.now().toString() + 'a', role: 'assistant', text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold shadow-glow hover:scale-105 transition-transform animate-float"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="w-5 h-5" />
          <span className="hidden sm:inline">AI Assistant</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[32rem] card flex flex-col overflow-hidden animate-scale-in">
          <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-primary-600 to-accent-500 text-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm">AI Learning Assistant</p>
                <p className="text-[10px] text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300" /> Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors" aria-label="Close assistant">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-primary-600 text-white rounded-br-md'
                    : 'bg-white text-slate-700 border border-slate-100 rounded-bl-md'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {aiAssistantSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="chip bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="p-3 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask me anything..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={() => handleSend(input)}
              className="p-2.5 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
