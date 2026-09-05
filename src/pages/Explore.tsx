import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Clock, Users, Sparkles, SlidersHorizontal, BookOpen } from 'lucide-react';
import { courses } from '@/data/mockData';
import ProgressBar from '@/components/ui/ProgressBar';
import EmptyState from '@/components/ui/EmptyState';

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const sources = ['All', 'Karmasetu', 'iGOT Karmayogi'];
const sortOptions = ['Most Relevant', 'Recommended', 'Newest', 'Popular', 'Shortest', 'Highest Rated'];

export default function Explore() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [source, setSource] = useState('All');
  const [sortBy, setSortBy] = useState('Most Relevant');
  const [showRecommended, setShowRecommended] = useState(false);

  const filtered = useMemo(() => {
    let result = courses.filter((c) => {
      const matchSearch = !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
        c.competency.toLowerCase().includes(search.toLowerCase());
      const matchDiff = difficulty === 'All' || c.difficulty === difficulty;
      const matchSource = source === 'All' || c.source === source;
      const matchRec = !showRecommended || c.recommended;
      return matchSearch && matchDiff && matchSource && matchRec;
    });

    switch (sortBy) {
      case 'Popular': result = [...result].sort((a, b) => b.enrolled - a.enrolled); break;
      case 'Shortest': result = [...result].sort((a, b) => a.durationHours - b.durationHours); break;
      case 'Highest Rated': result = [...result].sort((a, b) => b.rating - a.rating); break;
      case 'Recommended': result = [...result].sort((a, b) => Number(b.recommended) - Number(a.recommended)); break;
    }
    return result;
  }, [search, difficulty, source, sortBy, showRecommended]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-slate-900">Explore Courses</h1>
        <p className="mt-1 text-slate-500">Discover courses tailored to your competency goals and learning preferences.</p>
      </div>

      {/* Search */}
      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by course title, skill, or competency..."
            className="input pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div className="flex items-center gap-1.5 text-sm text-slate-400 font-semibold"><SlidersHorizontal className="w-4 h-4" /> Filters:</div>
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`chip transition-colors ${difficulty === d ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {d}
            </button>
          ))}
          <div className="w-px h-5 bg-slate-200 mx-1" />
          {sources.map((s) => (
            <button
              key={s}
              onClick={() => setSource(s)}
              className={`chip transition-colors ${source === s ? 'bg-accent-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {s}
            </button>
          ))}
          <div className="w-px h-5 bg-slate-200 mx-1" />
          <button
            onClick={() => setShowRecommended(!showRecommended)}
            className={`chip transition-colors ${showRecommended ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            <Sparkles className="w-3 h-3" /> Recommended for me
          </button>
        </div>

        {/* Sort */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          <p className="text-sm text-slate-500">{filtered.length} courses found</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm font-semibold text-slate-700 bg-transparent border-0 focus:outline-none cursor-pointer"
            >
              {sortOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No courses found"
          description="Try adjusting your search or filters to find what you're looking for."
          actionLabel="Clear filters"
          onAction={() => { setSearch(''); setDifficulty('All'); setSource('All'); setShowRecommended(false); }}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course, i) => (
            <div
              key={course.id}
              className="card overflow-hidden hover:shadow-glow transition-all duration-300 hover:-translate-y-1 animate-slide-up cursor-pointer"
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => navigate(`/learning/${course.id}`)}
            >
              <div className={`h-28 bg-gradient-to-br ${course.thumbnail} relative flex items-center justify-center`}>
                <BookOpen className="w-10 h-10 text-white/80" />
                {course.recommended && (
                  <div className="absolute top-3 right-3 chip bg-white/90 text-primary-700 shadow-sm">
                    <Sparkles className="w-3 h-3" /> Recommended
                  </div>
                )}
                <div className="absolute bottom-3 left-3 chip bg-white/90 text-slate-700 shadow-sm">{course.difficulty}</div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 leading-snug line-clamp-2">{course.title}</h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{course.description}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" /> {course.rating}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {(course.enrolled / 1000).toFixed(1)}k</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {course.skills.slice(0, 3).map((s) => (
                    <span key={s} className="chip bg-slate-100 text-slate-600">{s}</span>
                  ))}
                </div>
                {course.progress > 0 && (
                  <div className="mt-3">
                    <ProgressBar value={course.progress} showLabel size="sm" color={course.progress === 100 ? 'success' : 'primary'} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
