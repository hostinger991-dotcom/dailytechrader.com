import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types/article';
import { InfographicHero } from './InfographicHero';
import { 
  X, Clock, Calendar, Bookmark, BookmarkCheck, Share2, 
  CheckCircle2, ThumbsUp, MessageSquare, ArrowLeft, 
  ExternalLink, Layers, ShieldCheck, ChevronRight, Check, Sparkles, Maximize2
} from 'lucide-react';
import { resolveImageUrl } from '../utils/imageUtils';

interface ArticleReaderModalProps {
  article: Article;
  onClose: () => void;
  onSelectRelated: (article: Article) => void;
  allArticles: Article[];
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

interface Comment {
  id: string;
  author: string;
  role: string;
  date: string;
  text: string;
  likes: number;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  onSelectRelated,
  allArticles,
  isBookmarked,
  onToggleBookmark
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [copiedLink, setCopiedLink] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  // Comments state
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      author: 'Julian M. Krause',
      role: 'Staff Systems Architect',
      date: '2 hours ago',
      text: 'The architectural breakdown here is spot on. The transition from legacy monolithic models to sparse Mixture-of-Experts has completely transformed our latency budgets in production.',
      likes: 8
    },
    {
      id: 'c2',
      author: 'Dr. Sarah Henderson',
      role: 'Cybersecurity Analyst',
      date: '5 hours ago',
      text: 'Glad you explicitly highlighted the difference between client-side zero-knowledge encryption and marketing no-logs claims. Too many users confuse the two.',
      likes: 14
    }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentRole, setNewCommentRole] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Related articles (same category, excluding current)
  const relatedArticles = allArticles
    .filter(a => a.categorySlug === article.categorySlug && a.id !== article.id)
    .slice(0, 3);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        const progress = (scrollTop / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Update URL hash for direct bookmarking/sharing
  useEffect(() => {
    window.location.hash = `article-${article.id}`;
    return () => {
      window.location.hash = '';
    };
  }, [article.id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setLikeCount(prev => prev + 1);
    } else {
      setHasLiked(false);
      setLikeCount(prev => prev - 1);
    }
  };

  const toggleStep = (stepKey: string) => {
    setCheckedSteps(prev => ({
      ...prev,
      [stepKey]: !prev[stepKey]
    }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    setCommentSubmitting(true);
    setTimeout(() => {
      const commentObj: Comment = {
        id: `c_${Date.now()}`,
        author: newCommentName.trim(),
        role: newCommentRole.trim() || 'Verified Reader',
        date: 'Just now',
        text: newCommentText.trim(),
        likes: 1
      };
      setComments([commentObj, ...comments]);
      setNewCommentName('');
      setNewCommentRole('');
      setNewCommentText('');
      setCommentSubmitting(false);
    }, 400);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const element = document.getElementById(sectionId);
    if (element && contentRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const fontSizeClasses = {
    normal: 'text-sm md:text-base leading-relaxed',
    large: 'text-base md:text-lg leading-relaxed',
    larger: 'text-lg md:text-xl leading-loose'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end md:justify-center p-0 md:p-6 overflow-hidden animate-in fade-in duration-200">
      {/* Container Card */}
      <div 
        className="w-full max-w-5xl h-[95vh] md:h-[90vh] bg-[#081c18] border border-[#5fdee7]/30 rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
        style={{
          boxShadow: '0 0 50px rgba(95,222,231,0.15), 0 20px 40px rgba(0,0,0,0.8)'
        }}
      >
        {/* Sticky Reading Progress Bar */}
        <div className="h-1 w-full bg-[#0b2721] relative z-40">
          <div 
            className="h-full bg-gradient-to-r from-[#5fdee7] via-[#ffcc00] to-[#ffd700] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Modal Header Controls */}
        <div className="p-4 md:px-8 border-b border-[#5fdee7]/20 bg-[#061411]/90 flex items-center justify-between gap-3 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#0b2721] hover:bg-[#5fdee7]/20 text-[#5fdee7] border border-[#5fdee7]/30 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Journal</span>
            </button>

            <span className="hidden md:flex items-center gap-2">
              <span className="text-xs font-black font-display text-white tracking-tight">
                dailytech<span className="text-[#5fdee7]">rader</span>
              </span>
              <span className="text-slate-600">/</span>
            </span>

            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-[#0b2721] text-[#5fdee7] border border-[#5fdee7]/30">
              {article.category}
            </span>
          </div>

          {/* Reader controls: Font Size, Bookmark, Share, Close */}
          <div className="flex items-center gap-2">
            {/* Font Size Selector */}
            <div className="flex items-center rounded-lg bg-[#0b2721] border border-[#5fdee7]/20 p-0.5 text-xs font-mono">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'normal' ? 'bg-[#5fdee7] text-black font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Normal Font Size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'large' ? 'bg-[#5fdee7] text-black font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Large Font Size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('larger')}
                className={`px-2 py-1 rounded transition-colors ${fontSize === 'larger' ? 'bg-[#5fdee7] text-black font-bold' : 'text-slate-400 hover:text-white'}`}
                title="Largest Font Size"
              >
                A++
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked 
                  ? 'bg-[#ffcc00]/20 border-[#ffcc00] text-[#ffcc00]' 
                  : 'bg-[#0b2721] border-[#5fdee7]/30 text-slate-300 hover:text-[#ffcc00]'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Bookmark Report'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-[#ffcc00]" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Share link button */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg bg-[#0b2721] border border-[#5fdee7]/30 text-slate-300 hover:text-[#5fdee7] transition-colors cursor-pointer relative"
              title="Copy Report Link"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] font-mono bg-[#ffcc00] text-black font-bold shadow-lg whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#0b2721] border border-white/20 text-slate-300 hover:text-red-400 hover:border-red-400 transition-colors cursor-pointer"
              title="Close Report (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto p-5 md:p-10 space-y-8 scroll-smooth"
        >
          {/* Article Header & Metadata */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded bg-[#0b2721] border border-[#5fdee7]/40 text-[#5fdee7] font-bold">
                {article.keyword.toUpperCase()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#5fdee7]" /> {article.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {article.publishDate}
              </span>
              <span>•</span>
              <span className="text-[#ffcc00] font-bold">
                {article.wordCount} words (Full In-Depth Report)
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold font-display uppercase tracking-tight text-white leading-tight">
              {article.title}
            </h1>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed font-sans border-l-2 border-[#5fdee7] pl-4 italic">
              {article.excerpt}
            </p>

            {/* Author & Verification Card */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#0b2721]/60 border border-[#5fdee7]/20">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#5fdee7]"
                />
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    {article.author.name}
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#5fdee7]/20 text-[#5fdee7]">
                      Author
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">
                    {article.author.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{article.author.verifiedReviewer}</span>
              </div>
            </div>
          </div>

          {/* Primary High-Resolution Photorealistic Infographic Showcase */}
          <div className="max-w-4xl mx-auto space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-[#5fdee7] font-bold flex items-center gap-1.5 uppercase">
                <Sparkles className="w-4 h-4 text-[#ffcc00]" />
                <span>Photorealistic AI Infographic Blueprint</span>
              </span>
              <span className="text-slate-400">PROMPT SPECIFICATION #{article.infographic.promptNumber}</span>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[#5fdee7]/40 shadow-2xl bg-black group">
              <img
                src={resolveImageUrl(article.imageSrc)}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover max-h-[520px]"
                loading="eager"
                onError={(e) => {
                  const target = e.currentTarget;
                  const filename = article.imageSrc.split('/').pop();
                  if (filename && !target.src.endsWith(`/images/${filename}`)) {
                    target.src = `/images/${filename}`;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="font-bold text-white uppercase font-display tracking-wide">
                  {article.infographic.title}
                </span>
                <span className="text-[#ffcc00] font-bold text-[11px] bg-black/70 px-2.5 py-1 rounded border border-[#ffcc00]/40 backdrop-blur-sm">
                  8K Realistic Render
                </span>
              </div>
            </div>
          </div>

          {/* Full Interactive 6-Panel Infographic Visual (Technical Breakdown) */}
          <div className="max-w-4xl mx-auto">
            <InfographicHero spec={article.infographic} isCompact={false} />
          </div>

          {/* Executive Key Takeaways Callout */}
          <div className="max-w-4xl mx-auto p-5 md:p-6 rounded-xl bg-gradient-to-br from-[#0c2e27] to-[#071916] border border-[#5fdee7]/40 shadow-lg">
            <div className="flex items-center gap-2 text-sm font-mono font-bold uppercase text-[#5fdee7] mb-3">
              <CheckCircle2 className="w-4 h-4 text-[#5fdee7]" />
              <span>Executive Engineering Takeaways</span>
            </div>
            <ul className="space-y-2.5">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffcc00] mt-2 shrink-0" />
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Table of Contents Jump Links */}
          <div className="max-w-4xl mx-auto p-4 rounded-lg bg-black/40 border border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#5fdee7]" /> Jump to Section:
            </span>
            {article.sections.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="px-2 py-1 rounded bg-[#0b2721] hover:bg-[#5fdee7]/20 text-[#5fdee7] border border-[#5fdee7]/30 transition-colors cursor-pointer"
              >
                0{idx + 1}. {sec.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Core Technical Sections (1200+ word deep-dive report) */}
          <div className="max-w-4xl mx-auto space-y-10">
            {article.sections.map((section, idx) => (
              <section 
                key={section.id} 
                id={section.id}
                className="scroll-mt-6 border-t border-white/10 pt-8"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#5fdee7] mb-2 uppercase tracking-widest">
                  <span>SECTION 0{idx + 1}</span>
                  <span>//</span>
                  <span>TECHNICAL ANALYSIS</span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold font-display text-white mb-4">
                  {section.title}
                </h2>

                <div className={`text-slate-200 font-sans space-y-4 whitespace-pre-line ${fontSizeClasses}`}>
                  {section.content}
                </div>

                {/* Callout Box if present */}
                {section.callout && (
                  <div className={`mt-5 p-4 rounded-lg border flex items-start gap-3 ${
                    section.callout.type === 'warning' 
                      ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' 
                      : section.callout.type === 'benchmark'
                      ? 'bg-purple-950/40 border-purple-500/40 text-purple-200'
                      : 'bg-[#0b2721] border-[#5fdee7]/40 text-slate-200'
                  }`}>
                    <div className="shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5 text-[#5fdee7]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-1 text-[#5fdee7]">
                        {section.callout.title}
                      </h4>
                      <p className="text-xs leading-relaxed">
                        {section.callout.text}
                      </p>
                    </div>
                  </div>
                )}

                {/* Interactive Step-by-Step Procedure if present */}
                {section.steps && section.steps.length > 0 && (
                  <div className="mt-6 p-4 rounded-xl bg-black/50 border border-[#5fdee7]/25 space-y-3">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#ffcc00] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#ffcc00]" />
                      <span>Recommended Implementation Procedure:</span>
                    </div>

                    <div className="space-y-2">
                      {section.steps.map((st) => {
                        const stepKey = `${section.id}_step_${st.step}`;
                        const isDone = !!checkedSteps[stepKey];

                        return (
                          <div
                            key={st.step}
                            onClick={() => toggleStep(stepKey)}
                            className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                              isDone 
                                ? 'bg-emerald-950/30 border-emerald-500/40 line-through text-slate-400' 
                                : 'bg-[#0b2721]/70 border-white/10 hover:border-[#5fdee7]/40 text-slate-200'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                              isDone ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-500 bg-black/40'
                            }`}>
                              {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div className="text-xs">
                              <span className="font-bold text-white font-mono block mb-0.5">
                                Step {st.step}: {st.title}
                              </span>
                              <span className="leading-relaxed">
                                {st.instruction}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Benchmark Comparison Matrix Table */}
          {article.benchmarks && article.benchmarks.length > 0 && (
            <div className="max-w-4xl mx-auto space-y-3 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#5fdee7] tracking-wider">
                  BENCHMARK LAB METRICS & EMPIRICAL COMPARISONS
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#5fdee7]/30 bg-black/50">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#0b2721] text-[#5fdee7] uppercase tracking-wider border-b border-[#5fdee7]/30">
                    <tr>
                      <th className="p-3">Evaluation Parameter</th>
                      <th className="p-3">Candidate / Model A</th>
                      <th className="p-3">Candidate / Model B</th>
                      <th className="p-3">Candidate / Model C</th>
                      <th className="p-3">Engineering Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-slate-300">
                    {article.benchmarks.map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-bold text-white whitespace-nowrap">{row.metric}</td>
                        <td className="p-3">{row.itemA}</td>
                        <td className="p-3">{row.itemB}</td>
                        <td className="p-3">{row.itemC}</td>
                        <td className="p-3 text-[#ffcc00] font-sans text-xs">{row.verdict}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pros & Cons Grid */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <h4 className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Engineering Strengths & Pros</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-200">
                {article.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">+</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/30">
              <h4 className="text-xs font-mono font-bold uppercase text-red-400 tracking-wider flex items-center gap-2 mb-3">
                <X className="w-4 h-4 text-red-400" />
                <span>Trade-offs & Considerations</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-200">
                {article.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">-</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Specifications Summary */}
          {article.specsSummary && (
            <div className="max-w-4xl mx-auto p-5 rounded-xl bg-[#0b2721]/50 border border-white/10">
              <h4 className="text-xs font-mono font-bold uppercase text-[#5fdee7] tracking-wider mb-3">
                LAB SPECIFICATIONS MATRIX
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                {Object.entries(article.specsSummary).map(([key, val], idx) => (
                  <div key={idx} className="p-2.5 rounded bg-black/40 border border-white/5">
                    <span className="text-slate-400 block text-[10px] uppercase">{key}</span>
                    <span className="text-white font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive FAQ Accordion */}
          {article.faq && article.faq.length > 0 && (
            <div className="max-w-4xl mx-auto space-y-3 pt-6 border-t border-white/10">
              <h3 className="text-lg font-bold font-display text-white uppercase tracking-wider">
                Frequently Asked Engineering Questions
              </h3>
              <div className="space-y-2">
                {article.faq.map((item, idx) => (
                  <details
                    key={idx}
                    className="group rounded-lg bg-[#0b2721]/60 border border-[#5fdee7]/20 p-3.5 transition-colors open:border-[#5fdee7]/60"
                  >
                    <summary className="font-bold text-xs md:text-sm text-slate-200 cursor-pointer list-none flex items-center justify-between gap-2">
                      <span>{item.question}</span>
                      <ChevronRight className="w-4 h-4 text-[#5fdee7] group-open:rotate-90 transition-transform shrink-0" />
                    </summary>
                    <p className="mt-2.5 text-xs text-slate-300 leading-relaxed font-sans border-t border-white/10 pt-2">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="max-w-4xl mx-auto flex flex-wrap gap-1.5 pt-4">
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-400 hover:text-[#ffcc00] hover:border-[#ffcc00]/40 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Like & Reaction Bar */}
          <div className="max-w-4xl mx-auto py-6 border-y border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  hasLiked 
                    ? 'bg-[#ffcc00] text-black shadow-[0_0_20px_rgba(255,204,0,0.5)]' 
                    : 'bg-[#0b2721] text-slate-200 border border-[#5fdee7]/30 hover:border-[#ffcc00]'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{hasLiked ? 'Insightful!' : 'Mark Insightful'} ({likeCount})</span>
              </button>

              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                  isBookmarked 
                    ? 'bg-[#ffcc00]/20 text-[#ffcc00] border border-[#ffcc00]' 
                    : 'bg-[#0b2721] text-slate-300 border border-white/10 hover:border-white/30'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isBookmarked ? 'Saved to Vault' : 'Save for Later'}</span>
              </button>
            </div>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 text-xs font-mono text-[#5fdee7] hover:text-[#ffcc00] transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Permanent Citation Link</span>
            </button>
          </div>

          {/* Interactive Comments & Peer Discussion Section */}
          <div className="max-w-4xl mx-auto space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-white uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#5fdee7]" />
                <span>Peer Discussion & Technical Verification ({comments.length})</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                Moderated by Editorial Staff
              </span>
            </div>

            {/* Comment Submission Form */}
            <form onSubmit={handleAddComment} className="p-4 rounded-xl bg-[#0b2721]/50 border border-[#5fdee7]/25 space-y-3">
              <div className="text-xs font-mono text-[#5fdee7] font-semibold">
                Contribute to this Technical Review
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Marcus Vance)"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5fdee7]"
                />
                <input
                  type="text"
                  placeholder="Your Title / Role (e.g. Hardware Engineer)"
                  value={newCommentRole}
                  onChange={(e) => setNewCommentRole(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5fdee7]"
                />
              </div>
              <textarea
                placeholder="Share technical observations, benchmarks, or clarifications on this analysis..."
                rows={3}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                required
                className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5fdee7]"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={commentSubmitting}
                  className="px-4 py-2 rounded text-xs font-mono font-bold bg-[#5fdee7] hover:bg-[#ffcc00] text-black transition-colors cursor-pointer disabled:opacity-50"
                >
                  {commentSubmitting ? 'Posting Verification...' : 'Post Commentary'}
                </button>
              </div>
            </form>

            {/* Existing Comments List */}
            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white font-mono">{c.author}</span>
                      <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.2 rounded bg-white/5">
                        {c.role}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{c.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Articles in Same Category */}
          {relatedArticles.length > 0 && (
            <div className="max-w-4xl mx-auto pt-8 border-t border-white/10 space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#5fdee7]">
                Related Investigations in {article.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 rounded-lg bg-[#0b2721]/60 border border-white/10 hover:border-[#ffcc00] transition-colors cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-[#5fdee7] group-hover:text-[#ffcc00] block mb-1">
                        {rel.readTime}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-[#ffcc00] line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-white flex items-center gap-1 mt-2">
                      Read Report <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Report Footer Citation */}
          <div className="max-w-4xl mx-auto pt-8 pb-4 text-center text-xs font-mono text-slate-500 border-t border-white/5">
            <p>dailytechrader Technical Journal • Peer-Reviewed Digital Publication</p>
            <p className="text-[10px] mt-1">Archived under DOI/W3C Web Standards • Copyright © 2026 dailytechrader</p>
          </div>
        </div>
      </div>
    </div>
  );
};
