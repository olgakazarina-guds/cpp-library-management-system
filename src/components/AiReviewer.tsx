import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Share2, 
  Copy, 
  Check, 
  Code2, 
  Send,
  Loader2,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { CPP_CODEBASE } from '../data/cppCodebase';
import { AIReviewResult } from '../types';

export const AiReviewer: React.FC = () => {
  const defaultCode = CPP_CODEBASE.map(f => `// --- ${f.name} ---\n${f.content}`).join('\n\n');

  const [codeToReview, setCodeToReview] = useState<string>(defaultCode);
  const [userNote, setUserNote] = useState<string>('Please grade against Week 4 OOP requirements and check borrowing limits (Regular = 3, Premium = 5).');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AIReviewResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedPeerReview, setCopiedPeerReview] = useState<boolean>(false);

  const handleRunReview = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: codeToReview,
          userPrompt: userNote
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'AI Code Review request failed.');
      }

      const data: AIReviewResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during AI review.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPeerReview = () => {
    if (!result?.yellowdigPeerReview) return;
    navigator.clipboard.writeText(result.yellowdigPeerReview);
    setCopiedPeerReview(true);
    setTimeout(() => setCopiedPeerReview(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-white tracking-tight">AI C++ Code Reviewer & Yellowdig Peer Review Assistant</h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Gemini AI Grader
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Evaluate your C++ code against assignment criteria (Encapsulation, Inheritance 3 vs 5 limits, Abstraction, Composition) and auto-generate constructive peer review feedback for Yellowdig with the <code className="text-amber-400">#C++ Mini-Project</code> tag.
          </p>
        </div>
      </div>

      {/* Grid Layout: Code Input vs Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Col: Code Submission Area */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col h-[650px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>C++ Submission Code</span>
            </h2>

            <button
              onClick={() => setCodeToReview(defaultCode)}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
            >
              Load Default Project Code
            </button>
          </div>

          <div className="flex-1 flex flex-col">
            <textarea
              value={codeToReview}
              onChange={e => setCodeToReview(e.target.value)}
              placeholder="Paste your C++ code here..."
              className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-indigo-500 custom-scrollbar resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-400">Optional Notes for AI Grader:</label>
            <input
              type="text"
              value={userNote}
              onChange={e => setUserNote(e.target.value)}
              placeholder="e.g. Check if my virtual destructor is implemented correctly..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={handleRunReview}
            disabled={loading || !codeToReview.trim()}
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/20 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Analyzing C++ OOP Principles & Borrowing Limits...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Code & Generate Yellowdig Peer Review</span>
              </>
            )}
          </button>

          {error && (
            <div className="bg-rose-950/40 border border-rose-900/60 rounded-xl p-3 text-xs text-rose-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Col: AI Feedback & Yellowdig Output */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 h-[650px] overflow-y-auto custom-scrollbar">
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
              <Bot className="w-12 h-12 text-slate-600" />
              <h3 className="text-sm font-bold text-slate-300">Ready for AI C++ Grading</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Click "Analyze Code & Generate Yellowdig Peer Review" to get evaluation scores, criteria checks, and copyable Yellowdig commentary.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-3">
              <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
              <h3 className="text-sm font-bold text-white">Gemini AI Engine Processing</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Evaluating Encapsulation, Member Inheritance (3 vs 5 limits), AbstractLibrary, and BookRepository composition...
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-5">
              
              {/* Score Header */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Overall Assignment Score
                  </span>
                  <p className="text-xs text-slate-300 mt-1">{result.summary}</p>
                </div>

                <div className="text-center shrink-0 ml-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-extrabold text-2xl text-white shadow-lg">
                    {result.overallScore}
                  </div>
                  <span className="text-[10px] text-slate-500 font-semibold mt-1 block">out of 100</span>
                </div>
              </div>

              {/* Criteria Checklist */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  OOP Requirements Criteria
                </h3>
                <div className="space-y-2">
                  {result.criteriaFeedback?.map((crit, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{crit.category}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            crit.status === 'pass'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : crit.status === 'warning'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {crit.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{crit.comments}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-3.5 space-y-1.5">
                  <span className="font-bold text-emerald-300 flex items-center space-x-1">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Key Strengths:</span>
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    {result.keyStrengths?.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-3.5 space-y-1.5">
                  <span className="font-bold text-amber-300 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Areas for Improvement:</span>
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    {result.areasForImprovement?.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              </div>

              {/* Yellowdig Peer Review Output Box */}
              <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs font-bold text-amber-200">
                      Generated Yellowdig Peer Review Comment (#C++ Mini-Project)
                    </h3>
                  </div>

                  <button
                    onClick={handleCopyPeerReview}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
                  >
                    {copiedPeerReview ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPeerReview ? 'Copied to Clipboard!' : 'Copy Post'}</span>
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-sans text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {result.yellowdigPeerReview}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
