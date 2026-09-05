import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${sizeClasses[size]} card max-h-[90vh] overflow-y-auto scrollbar-thin animate-scale-in`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Close">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        )}
        {!title && (
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-colors z-10" aria-label="Close">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
