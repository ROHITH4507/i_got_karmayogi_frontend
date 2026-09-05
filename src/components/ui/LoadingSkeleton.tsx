export default function LoadingSkeleton({ className = '', lines = 3 }: { className?: string; lines?: number }) {
  return (
    <div className={`p-6 ${className}`}>
      <div className="skeleton h-32 w-full mb-4" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton h-4 w-full mb-2" style={{ width: `${100 - i * 15}%` }} />
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="card p-5">
      <div className="skeleton h-10 w-10 rounded-xl mb-3" />
      <div className="skeleton h-8 w-20 mb-2" />
      <div className="skeleton h-4 w-32" />
    </div>
  );
}
