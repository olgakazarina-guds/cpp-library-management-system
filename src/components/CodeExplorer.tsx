import React, { useState } from 'react';
import { 
  FileCode2, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Layers, 
  Eye, 
  Code2, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { CPP_CODEBASE } from '../data/cppCodebase';
import { CPPFile } from '../types';

export const CodeExplorer: React.FC = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>('book_hpp');
  const [copied, setCopied] = useState(false);
  const [selectedConceptFilter, setSelectedConceptFilter] = useState<string>('all');

  const activeFile = CPP_CODEBASE.find(f => f.id === selectedFileId) || CPP_CODEBASE[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAll = () => {
    let combined = `// =========================================================\n`;
    combined += `// C++ LIBRARY MANAGEMENT SYSTEM - UNIFIED SOURCE CODE\n`;
    combined += `// Week 4 Exercise Submission\n`;
    combined += `// =========================================================\n\n`;

    CPP_CODEBASE.forEach(f => {
      combined += `// =========================================================\n`;
      combined += `// FILE: ${f.name}\n`;
      combined += `// =========================================================\n`;
      combined += f.content + `\n\n`;
    });

    const blob = new Blob([combined], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LibraryManagementSystem_OOP.cpp';
    a.click();
    URL.revokeObjectURL(url);
  };

  const categories = [
    { id: 'all', label: 'All Files (10)' },
    { id: 'header', label: 'Headers (.hpp)' },
    { id: 'source', label: 'Implementation (.cpp)' },
    { id: 'main', label: 'Driver (main.cpp)' },
  ];

  const concepts = [
    { id: 'all', label: 'All Principles' },
    { id: 'Encapsulation', label: 'Encapsulation' },
    { id: 'Inheritance', label: 'Inheritance' },
    { id: 'Abstraction', label: 'Abstraction' },
    { id: 'Composition', label: 'Composition' },
    { id: 'Association', label: 'Association' },
  ];

  const filteredFiles = CPP_CODEBASE.filter(f => {
    if (selectedConceptFilter === 'all') return true;
    return f.annotations?.some(a => a.concept.includes(selectedConceptFilter));
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight uppercase">C++ OOP Source Codebase</h2>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase">
              C++17 Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1 max-w-2xl">
            Cleanly structured header (.hpp) declarations and implementation (.cpp) definitions demonstrating all required Object-Oriented Programming principles.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-white border border-gray-300 text-slate-700 hover:bg-gray-50 shadow-sm transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied File!' : 'Copy Current File'}</span>
          </button>

          <button
            onClick={handleDownloadAll}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All (.cpp)</span>
          </button>
        </div>
      </div>

      {/* Principle Filter Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-wrap items-center gap-2 shadow-sm">
        <span className="text-xs font-bold text-slate-700 px-2 flex items-center space-x-1 uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Highlight Principle:</span>
        </span>
        {concepts.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedConceptFilter(c.id)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              selectedConceptFilter === c.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Code Viewer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar: File List */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider px-2 mb-2">
            Project Files ({CPP_CODEBASE.length})
          </h3>

          <div className="space-y-1">
            {CPP_CODEBASE.map(file => {
              const isActive = file.id === selectedFileId;
              const isHpp = file.name.endsWith('.hpp');
              return (
                <button
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all ${
                    isActive
                      ? 'bg-blue-50 border border-blue-200 text-blue-900 font-bold'
                      : 'hover:bg-slate-50 text-slate-600 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <FileCode2 className={`w-4 h-4 shrink-0 ${isHpp ? 'text-blue-600' : 'text-slate-700'}`} />
                    <span className="text-xs font-mono truncate">{file.name}</span>
                  </div>

                  {file.annotations && file.annotations.length > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                      {file.annotations.length} OOP
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Code Window */}
        <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          
          {/* File Header */}
          <div className="bg-slate-50 border-b border-gray-200 px-5 py-3 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold font-mono text-slate-900">{activeFile.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-gray-200 uppercase">
                  {activeFile.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{activeFile.description}</p>
            </div>

            <button
              onClick={handleCopy}
              className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-2xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          {/* Annotations Callout Banner */}
          {activeFile.annotations && activeFile.annotations.length > 0 && (
            <div className="bg-blue-50/60 border-b border-blue-100 px-5 py-3 space-y-2">
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Key OOP Concept Annotations in this File:</span>
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {activeFile.annotations.map((ann, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-lg border border-blue-200 text-xs">
                    <span className="font-bold text-blue-800 block">Line {ann.line}: {ann.label}</span>
                    <p className="text-slate-600 font-medium text-[11px] mt-0.5">{ann.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Area with Line Numbers */}
          <div className="p-4 font-mono text-xs overflow-x-auto text-slate-200 leading-relaxed custom-scrollbar bg-slate-900">
            <pre className="flex">
              {/* Line Numbers */}
              <div className="pr-4 border-r border-slate-800 text-slate-500 text-right select-none space-y-0.5">
                {activeFile.content.split('\n').map((_, idx) => (
                  <div key={idx} className="h-5 leading-5">{idx + 1}</div>
                ))}
              </div>

              {/* Code Lines */}
              <div className="pl-4 space-y-0.5 w-full">
                {activeFile.content.split('\n').map((line, idx) => {
                  const lineNum = idx + 1;
                  const ann = activeFile.annotations?.find(a => a.line === lineNum);
                  
                  let lineStyle = 'text-slate-300';
                  if (line.trim().startsWith('#')) lineStyle = 'text-blue-300 font-semibold';
                  else if (line.trim().startsWith('//')) lineStyle = 'text-slate-500 italic';
                  else if (line.includes('class ') || line.includes('struct ')) lineStyle = 'text-blue-400 font-bold';
                  else if (line.includes('virtual ') || line.includes('override')) lineStyle = 'text-sky-300 font-semibold';
                  else if (line.includes('private:') || line.includes('public:') || line.includes('protected:')) lineStyle = 'text-amber-300 font-bold';

                  return (
                    <div
                      key={idx}
                      className={`h-5 leading-5 px-1 rounded flex items-center justify-between ${
                        ann ? 'bg-blue-900/40 border-l-2 border-blue-400' : 'hover:bg-slate-800/50'
                      }`}
                    >
                      <span className={lineStyle}>{line || ' '}</span>
                      {ann && (
                        <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded bg-blue-600 text-white shrink-0 ml-4">
                          {ann.concept}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
};
