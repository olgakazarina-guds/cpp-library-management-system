import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Code2, 
  CheckCircle2, 
  Sparkles, 
  Info, 
  Copy, 
  Check, 
  BookOpen 
} from 'lucide-react';
import { PY_VS_CPP_TOPICS } from '../data/pyVsCppComparison';

export const PyVsCppGuide: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(PY_VS_CPP_TOPICS[0].id);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeTopic = PY_VS_CPP_TOPICS.find(t => t.id === selectedTopicId) || PY_VS_CPP_TOPICS[0];

  const handleCopy = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Python vs C++ OOP Bridge</h2>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase">
              Course Transition Guide
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1 max-w-2xl">
            "Remember the Library Management System from the Python course?" Here is how Python OOP concepts translate directly into statically-typed, high-performance C++ classes!
          </p>
        </div>
      </div>

      {/* Topic Tabs */}
      <div className="flex overflow-x-auto space-x-2 pb-2 custom-scrollbar">
        {PY_VS_CPP_TOPICS.map(topic => {
          const isActive = topic.id === selectedTopicId;
          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-gray-200'
              }`}
            >
              {topic.title}
            </button>
          );
        })}
      </div>

      {/* Main Comparison Section */}
      <div className="space-y-6">
        
        {/* Topic Header & Overview */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-2">
          <h3 className="text-lg font-bold text-slate-900 uppercase">{activeTopic.title}</h3>
          <p className="text-xs text-slate-600 font-medium">{activeTopic.concept}</p>
        </div>

        {/* Side-by-Side Code Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Python Code Block */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-slate-800 border-b border-slate-700 px-4 py-2.5 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 flex items-center space-x-1.5 uppercase">
                <Code2 className="w-3.5 h-3.5" />
                <span>Python Implementation (Previous Course)</span>
              </span>
              <button
                onClick={() => handleCopy(activeTopic.pySnippet, 'py')}
                className="text-[11px] font-bold text-slate-400 hover:text-white flex items-center space-x-1"
              >
                {copiedCode === 'py' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode === 'py' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="p-4 font-mono text-xs text-amber-200/90 overflow-x-auto leading-relaxed custom-scrollbar">
              {activeTopic.pySnippet}
            </pre>
          </div>

          {/* C++ Code Block */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-slate-800 border-b border-slate-700 px-4 py-2.5 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-300 flex items-center space-x-1.5 uppercase">
                <Code2 className="w-3.5 h-3.5" />
                <span>C++ Implementation (Current Exercise)</span>
              </span>
              <button
                onClick={() => handleCopy(activeTopic.cppSnippet, 'cpp')}
                className="text-[11px] font-bold text-slate-400 hover:text-white flex items-center space-x-1"
              >
                {copiedCode === 'cpp' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode === 'cpp' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="p-4 font-mono text-xs text-blue-200/90 overflow-x-auto leading-relaxed custom-scrollbar">
              {activeTopic.cppSnippet}
            </pre>
          </div>

        </div>

        {/* Key Architectural Differences */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Key Architectural Differences & Language Rules</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {activeTopic.keyDifferences.map((diff, idx) => (
              <div key={idx} className="bg-slate-50 border border-gray-200 rounded-lg p-3.5 space-y-1">
                <div className="flex items-center space-x-1.5 text-blue-700 font-bold uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Rule #{idx + 1}</span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{diff}</p>
              </div>
            ))}
          </div>

          {/* Pro Tip Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3 text-xs">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900 block uppercase">Pro Tip for C++ Exercise Grade:</span>
              <p className="text-slate-700 font-medium mt-0.5">{activeTopic.proTip}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
