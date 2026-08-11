import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Layers, 
  Code2,
  Compass,
  GitPullRequest,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

export const AiUsageReport: React.FC = () => {
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);
  const [copiedFullReport, setCopiedFullReport] = useState<boolean>(false);

  const aiasLevels = [
    {
      level: 1,
      name: "Level 1: No AI",
      description: "No AI tools used at any stage.",
      status: "Not Selected"
    },
    {
      level: 2,
      name: "Level 2: AI Planning & Idea Generation",
      description: "MAIN USAGE: AI was used primarily for architectural planning, mapping OOP requirements (Encapsulation, Inheritance, Abstraction, Composition), planning header/source file separation, and deciding C++ container structures.",
      status: "Main / Primary Scale"
    },
    {
      level: 3,
      name: "Level 3: AI Editing & Refinement",
      description: "AI used to proofread code comments, ensure beginner-friendly explanations, and verify general C++ naming conventions.",
      status: "Supporting / Refinement"
    },
    {
      level: 4,
      name: "Level 4: AI Collaboration (With Manual Editing & Checking)",
      description: "LIMITED SUPPORTING USE: AI was consulted for specific C++ syntax snippets with MANDATORY line-by-line human inspection, manual code editing, and g++ compiler verification.",
      status: "Selective / Limited Use"
    },
    {
      level: 5,
      name: "Level 5: Full AI Generation",
      description: "Unedited AI generation without human oversight.",
      status: "Strictly Avoided"
    }
  ];

  const samplePrompts = [
    {
      aiasLevel: "Level 2: AI Planning (Main)",
      title: "1. OOP Class Structure & Separation Strategy",
      prompt: "How should I structure a C++ Library Management System with Book, Member, and Library classes across header (.hpp) and source (.cpp) files?",
      purpose: "Architectural planning for standard C++ header and source separation and OOP design."
    },
    {
      aiasLevel: "Level 2: AI Planning (Main)",
      title: "2. Composition vs Aggregation Container Design",
      prompt: "Compare using std::vector vs std::unordered_map for BookRepository composition inside MyLibrary in C++17.",
      purpose: "Evaluating container efficiency and OOP ownership relationships prior to implementation."
    },
    {
      aiasLevel: "Level 3: AI Refinement",
      title: "3. Beginner-Friendly Explanation Proofreading",
      prompt: "Review these C++ comments in Book.cpp to ensure they explain getter/setter encapsulation in simple language suitable for peer review.",
      purpose: "Refining code readability and ensuring clear explanations for peers."
    },
    {
      aiasLevel: "Level 4: AI Collaboration (Selective)",
      title: "4. Polymorphism & Virtual Destructor Syntax",
      prompt: "What is the proper syntax for a virtual destructor in Member base class and virtual get_max_borrow_limit() in RegularMember and PremiumMember?",
      purpose: "Selective code collaboration, followed by line-by-line manual editing and local compiler testing."
    }
  ];

  const fullReportText = `===================================================================
AI USAGE DISCLOSURE REPORT (AI ASSESSMENT SCALE COMPLIANT)
C++ Library Management System (Mini-Project Weeks 3 & 4)
Framework Reference: AI Assessment Scale (aiassessmentscale.com)
===================================================================

1. AI ASSESSMENT SCALE (AIAS) CLASSIFICATION
• Level 2: AI Planning & Idea Generation (PRIMARY SCALE - MAIN USAGE)
  - Extensively used for architectural planning, designing class hierarchies (AbstractLibrary -> MyLibrary -> Member -> Subclasses).
  - Outlined header/source file separation rules (.hpp vs .cpp) and evaluated container strategies (std::vector vs std::unordered_map).

• Level 3: AI Editing & Refinement (SUPPORTING USE)
  - Proofread code comments to guarantee simple, easy-to-read language for peer reviewers and professor.

• Level 4: AI Collaboration with Mandatory Manual Editing & Checking (LIMITED/SELECTIVE USE)
  - Consulted AI for specific syntax patterns (e.g. virtual destructors, pure virtual methods).
  - MANDATORY OVERSIGHT: Every piece of generated code was line-by-line inspected, manually edited, customized, and verified using local g++ compiler builds.

2. CORE HUMAN CONTROL GUARANTEES
- Primary Author Oversight: The student directed all architectural decisions and led code development.
- Line-by-Line Editing: No AI output was accepted without manual inspection, customization, and local execution testing.
- Simple Language Comments: All comments were edited to ensure clear, beginner-friendly explanations.
- Double-Blind Compliance: All source files are completely anonymized in accordance with ORA rules.

3. SAMPLE PROMPTS & AIAS CLASSIFICATION
${samplePrompts.map(p => `• [${p.aiasLevel}] ${p.title}\n  Prompt: "${p.prompt}"\n  Purpose: ${p.purpose}`).join('\n\n')}

===================================================================`;

  const handleCopyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptIndex(idx);
    setTimeout(() => setCopiedPromptIndex(null), 2000);
  };

  const handleCopyFullReport = () => {
    navigator.clipboard.writeText(fullReportText);
    setCopiedFullReport(true);
    setTimeout(() => setCopiedFullReport(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">AI Usage Disclosure Report</h1>
              <p className="text-xs text-slate-500 font-medium flex items-center space-x-1 mt-0.5">
                <span>Aligned with AI Assessment Scale</span>
                <span className="text-slate-300">•</span>
                <a 
                  href="https://aiassessmentscale.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-600 hover:underline flex items-center space-x-0.5"
                >
                  <span>aiassessmentscale.com</span>
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-3 max-w-2xl leading-relaxed">
            This report documents AI usage based on the <strong>AI Assessment Scale</strong>. Development focused <strong>mainly on AI Planning (Level 2)</strong> for architecture and layout, with <strong>selective AI Collaboration (Level 4)</strong> backed by mandatory manual editing, line-by-line checking, and compiler validation.
          </p>
        </div>

        <button
          onClick={handleCopyFullReport}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition shrink-0"
        >
          {copiedFullReport ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copiedFullReport ? 'Copied Full Report' : 'Copy AIAS Statement'}</span>
        </button>
      </div>

      {/* AI Assessment Scale Visual Breakdown */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>AI Assessment Scale (AIAS) Level Breakdown</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Classification of project tasks according to the AI Assessment Scale framework</p>
          </div>
        </div>

        <div className="space-y-3">
          {aiasLevels.map((item) => {
            const isMain = item.level === 2;
            const isSupporting = item.level === 3 || item.level === 4;
            const isAvoided = item.level === 5;

            return (
              <div 
                key={item.level}
                className={`p-4 rounded-xl border transition flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  isMain 
                    ? 'bg-blue-50/70 border-blue-200 ring-1 ring-blue-300/50' 
                    : isSupporting 
                    ? 'bg-slate-50/80 border-slate-200' 
                    : 'bg-white border-slate-100 opacity-60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs font-bold ${isMain ? 'text-blue-950' : 'text-slate-900'}`}>
                      {item.name}
                    </span>
                    {isMain && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                        MAIN USAGE
                      </span>
                    )}
                    {isSupporting && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                        {item.level === 4 ? 'SELECTIVE USE' : 'SUPPORTING'}
                      </span>
                    )}
                    {isAvoided && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        NOT PERMITTED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                    {item.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <span className={`text-xs font-bold px-3 py-1 rounded-lg inline-block ${
                    isMain 
                      ? 'bg-blue-100 text-blue-900' 
                      : isSupporting 
                      ? 'bg-slate-100 text-slate-700' 
                      : 'bg-slate-50 text-slate-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Human Editing & Verification Pillars */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
          <GitPullRequest className="w-4 h-4 text-emerald-600" />
          <span>Manual Editing &amp; Verification Protocol</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-1.5">
            <span className="text-xs font-bold text-blue-950 block">1. Main Focus: AI Planning (Level 2)</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              AI assisted in conceptualizing class hierarchies, header/source separation, and container architecture before writing code.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
            <span className="text-xs font-bold text-slate-900 block">2. Selective AI Collaboration (Level 4)</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Used AI selectively for syntax help, followed by mandatory line-by-line manual code editing and beginner-friendly comment rewrites.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-1.5">
            <span className="text-xs font-bold text-slate-900 block">3. Local Compiler Check</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every file was checked manually and compiled with g++ against C++17 ISO standards to guarantee zero warnings or runtime bugs.
            </p>
          </div>
        </div>
      </div>

      {/* Sample Prompts Categorized by AIAS Level */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Sample Development Prompts &amp; AIAS Levels</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Documented prompts classified under the AI Assessment Scale</p>
          </div>
        </div>

        <div className="space-y-3">
          {samplePrompts.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-900">{item.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.aiasLevel.includes('Main') 
                      ? 'bg-blue-100 text-blue-900' 
                      : 'bg-slate-200 text-slate-800'
                  }`}>
                    {item.aiasLevel}
                  </span>
                </div>
                <button
                  onClick={() => handleCopyPrompt(item.prompt, idx)}
                  className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                >
                  {copiedPromptIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPromptIndex === idx ? 'Copied' : 'Copy Prompt'}</span>
                </button>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800">
                "{item.prompt}"
              </div>

              <p className="text-xs text-slate-500 font-medium">
                <strong className="text-slate-700">Purpose &amp; Human Control:</strong> {item.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
