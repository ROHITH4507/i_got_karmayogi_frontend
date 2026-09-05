interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'accent';
}

const sizes = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-3.5',
};

const colors = {
  primary: 'bg-primary-600',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  error: 'bg-error-500',
  accent: 'bg-accent-500',
};

export default function ProgressBar({
  value,
  max = 100,
  className = '',
  barClassName = '',
  size = 'md',
  showLabel = false,
  color = 'primary',
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-slate-500">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full ${sizes[size]} bg-slate-100 rounded-full overflow-hidden`}>
        <div
          className={`${sizes[size]} ${colors[color]} ${barClassName} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
