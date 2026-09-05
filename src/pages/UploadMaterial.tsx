import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle,
  Loader2,
  Sparkles,
  File,
  Image as ImageIcon,
  Presentation,
  ArrowRight,
} from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { sampleMaterial } from '@/data/mockData';

interface UploadedFile {
  name: string;
  type: string;
  size: string;
  progress: number;
  status: 'uploading' | 'processing' | 'done';
}

const fileIcons: Record<string, typeof File> = {
  PDF: FileText,
  PPT: Presentation,
  DOC: FileText,
  TXT: FileText,
  Image: ImageIcon,
};

export default function UploadMaterial() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleFiles = (fileList: File[]) => {
    fileList.forEach((file) => {
      const ext = file.name.split('.').pop()?.toUpperCase() || 'TXT';
      const uploaded: UploadedFile = {
        name: file.name,
        type: ext,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        progress: 0,
        status: 'uploading',
      };
      setFiles((prev) => [...prev, uploaded]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.name === uploaded.name && f.progress < 100
              ? { ...f, progress: f.progress + 10 }
              : f
          )
        );
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) => (f.name === uploaded.name ? { ...f, status: 'processing' } : f))
        );
        // Simulate processing
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) => (f.name === uploaded.name ? { ...f, status: 'done' } : f))
          );
          showToast('Material processed successfully!', 'success');
        }, 2000);
      }, 2200);
    });
  };

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">AI Learning Studio</h1>
        <p className="mt-1 text-slate-500">Upload learning materials and let AI generate summaries, quizzes, and interactive lessons.</p>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`card p-8 lg:p-12 border-2 border-dashed cursor-pointer transition-all ${isDragging ? 'border-primary-500 bg-primary-50/50 scale-[1.01]' : 'border-slate-200 hover:border-primary-300 hover:bg-slate-50'}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,image/*"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
        />
        <div className="flex flex-col items-center text-center">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${isDragging ? 'bg-primary-600 scale-110' : 'bg-primary-100'}`}>
            <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-white' : 'text-primary-600'}`} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{isDragging ? 'Drop your files here' : 'Drag & drop your learning material here'}</h3>
          <p className="text-sm text-slate-500 mt-1">or</p>
          <button className="btn-primary mt-3" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
            Browse Files
          </button>
          <p className="text-xs text-slate-400 mt-4">Supports PDF, PPT/PPTX, DOC/DOCX, TXT, and Images · Max 50MB</p>
        </div>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">Uploaded Materials</h2>
          {files.map((file) => {
            const Icon = fileIcons[file.type] || File;
            return (
              <div key={file.name} className="card p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900 truncate">{file.name}</p>
                      <button onClick={() => removeFile(file.name)} className="p-1 rounded-lg hover:bg-slate-100" aria-label="Remove file">
                        <X className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400">{file.type} · {file.size}</p>

                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-600 rounded-full transition-all duration-200" style={{ width: `${file.progress}%` }} />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Uploading... {file.progress}%</p>
                      </div>
                    )}

                    {file.status === 'processing' && (
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-primary-600 font-semibold flex items-center gap-1.5">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Analyzing material...
                        </p>
                        <div className="space-y-0.5 text-xs text-slate-400">
                          <p className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-success-500" /> Content extracted</p>
                          <p className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-success-500" /> Important topics identified</p>
                          <p className="flex items-center gap-1.5 opacity-50">Key concepts generated...</p>
                          <p className="flex items-center gap-1.5 opacity-30">Quiz questions generated...</p>
                        </div>
                      </div>
                    )}

                    {file.status === 'done' && (
                      <div className="mt-2">
                        <div className="space-y-0.5 text-xs text-slate-400 mb-2">
                          <p className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-success-500" /> Content extracted</p>
                          <p className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-success-500" /> Important topics identified</p>
                          <p className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-success-500" /> Key concepts generated</p>
                          <p className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-success-500" /> Quiz questions generated</p>
                        </div>
                        <button
                          onClick={() => navigate(`/materials/${sampleMaterial.id}/summary`)}
                          className="btn-primary text-xs py-2"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> View AI Summary
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sample Material */}
      <div className="card p-5 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">Try a sample material</p>
            <p className="text-xs text-slate-500">See what AI can do with an uploaded PDF</p>
          </div>
          <button onClick={() => navigate(`/materials/${sampleMaterial.id}/summary`)} className="btn-primary text-sm">
            View Sample <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
