import React, { useState, useEffect } from 'react';
import { 
  FileCode2, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Layers, 
  Eye, 
  Filter,
  CheckCircle2,
  ArrowRight
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

  const concepts = [
    { id: 'all', label: 'All Principles' },
    { id: 'Encapsulation', label: 'Encapsulation' },
    { id: 'Inheritance', label: 'Inheritance' },
    { id: 'Abstraction', label: 'Abstraction' },
    { id: 'Composition', label: 'Composition' },
    { id: 'Association', label: 'Association' },
  ];

  // Helper to check if a file relates to a concept
  const doesFileMatchConcept = (file: CPPFile, concept: string): boolean => {
    if (concept === 'all') return true;
    
    // Check annotations
    const hasAnnotation = file.annotations?.some(a => 
      a.concept.toLowerCase().includes(concept.toLowerCase())
    );
    if (hasAnnotation) return true;

    // Check code keywords
    const content = file.content;
    if (concept === 'Encapsulation') {
      return content.includes('private:') || content.includes('protected:') || content.includes('get_') || content.includes('set_');
    }
    if (concept === 'Inheritance') {
      return content.includes(': public') || content.includes('class RegularMember') || content.includes('class PremiumMember') || content.includes('override');
    }
    if (concept === 'Abstraction') {
      return content.includes('AbstractLibrary') || content.includes('virtual') || content.includes('= 0');
    }
    if (concept === 'Composition') {
      return content.includes('BookRepository') || content.includes('unordered_map') || content.includes('repository.');
    }
    if (concept === 'Association') {
      return content.includes('borrow_book') || content.includes('return_book') || content.includes('register_member');
    }

    return false;
  };

  // Helper to check if an individual line matches the concept filter
  const doesLineMatchConcept = (line: string, lineNum: number, file: CPPFile, concept: string): boolean => {
    if (concept === 'all') return false;

    // Direct annotation match
    const ann = file.annotations?.find(a => a.line === lineNum);
    if (ann && ann.concept.toLowerCase().includes(concept.toLowerCase())) {
      return true;
    }

    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*')) return false;

    if (concept === 'Encapsulation') {
      return trimmed.includes('private:') || trimmed.includes('protected:') || (trimmed.includes('std::string get_') && trimmed.includes('const;')) || trimmed.includes('set_');
    }
    if (concept === 'Inheritance') {
      return trimmed.includes(': public') || trimmed.includes('override') || trimmed.includes('class RegularMember') || trimmed.includes('class PremiumMember');
    }
    if (concept === 'Abstraction') {
      return trimmed.includes('virtual ') || trimmed.includes('= 0;') || trimmed.includes('AbstractLibrary');
    }
    if (concept === 'Composition') {
      return trimmed.includes('BookRepository repository;') || trimmed.includes('std::unordered_map<std::string, Book>') || trimmed.includes('repository.add_book');
    }
    if (concept === 'Association') {
      return trimmed.includes('member->borrow_book') || trimmed.includes('book->set_borrowed') || trimmed.includes('borrow_book(const std::string');
    }

    return false;
  };

  // Auto switch file if selected concept is not present in active file
  const handleConceptSelect = (conceptId: string) => {
    setSelectedConceptFilter(conceptId);
    if (conceptId !== 'all') {
      if (!doesFileMatchConcept(activeFile, conceptId)) {
        const firstMatch = CPP_CODEBASE.find(f => doesFileMatchConcept(f, conceptId));
        if (firstMatch) {
          setSelectedFileId(firstMatch.id);
        }
      }
    }
  };

  // Calculate matching lines count in current active file
  const activeFileLines = activeFile.content.split('\n');
  const matchedLineIndices = activeFileLines
    .map((line, idx) => doesLineMatchConcept(line, idx + 1, activeFile, selectedConceptFilter) ? idx : -1)
    .filter(idx => idx !== -1);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">C++ OOP Source Codebase</h2>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              10 Files (.hpp / .cpp)
            </span>
          </div>
          <p className="text-xs text-slate-600 font-normal mt-1 max-w-2xl">
            Clean header (.hpp) declarations and implementation (.cpp) definitions demonstrating all required Object-Oriented Programming principles.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied File!' : 'Copy Current File'}</span>
          </button>

          <button
            onClick={handleDownloadAll}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All (.cpp)</span>
          </button>
        </div>
      </div>

      {/* Principle Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-900 px-1 flex items-center space-x-1.5 uppercase tracking-wider">
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Highlight Principle:</span>
            </span>
            {concepts.map(c => {
              const isActive = selectedConceptFilter === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleConceptSelect(c.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>

          {selectedConceptFilter !== 'all' && (
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-200 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>
                Found {matchedLineIndices.length} line highlights in {activeFile.name}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Code Viewer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar: File List */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Project Files ({CPP_CODEBASE.length})
            </h3>
            {selectedConceptFilter !== 'all' && (
              <span className="text-[10px] font-bold text-blue-600 uppercase">
                Filtered by {selectedConceptFilter}
              </span>
            )}
          </div>

          <div className="space-y-1">
            {CPP_CODEBASE.map(file => {
              const isActive = file.id === selectedFileId;
              const isHpp = file.name.endsWith('.hpp');
              const isMatch = doesFileMatchConcept(file, selectedConceptFilter);

              return (
                <button
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : isMatch
                      ? 'hover:bg-slate-100 text-slate-900 border border-slate-200 font-medium'
                      : 'hover:bg-slate-50 text-slate-400 border border-transparent opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <FileCode2 className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : isHpp ? 'text-blue-600' : 'text-slate-600'}`} />
                    <span className="text-xs font-mono truncate">{file.name}</span>
                  </div>

                  {selectedConceptFilter !== 'all' && isMatch && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-blue-800 text-blue-100' : 'bg-amber-100 text-amber-800'
                    }`}>
                      Match
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Code Window */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col overflow-hidden">
          
          {/* File Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold font-mono text-slate-900">{activeFile.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 uppercase">
                  {activeFile.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{activeFile.description}</p>
            </div>

            <button
              onClick={handleCopy}
              className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          {/* Active Highlight Banner */}
          {selectedConceptFilter !== 'all' && (
            <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-amber-900">
                  Highlighting [{selectedConceptFilter}] in {activeFile.name}: {matchedLineIndices.length} lines highlighted in yellow.
                </span>
              </div>
              <button
                onClick={() => setSelectedConceptFilter('all')}
                className="text-[11px] font-bold text-amber-800 hover:underline"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Annotations Callout Banner */}
          {activeFile.annotations && activeFile.annotations.length > 0 && selectedConceptFilter === 'all' && (
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
          <div className="p-4 font-mono text-xs overflow-x-auto text-slate-200 leading-relaxed custom-scrollbar bg-slate-900 min-h-[400px]">
            <pre className="flex">
              {/* Line Numbers */}
              <div className="pr-4 border-r border-slate-800 text-slate-500 text-right select-none space-y-0.5">
                {activeFileLines.map((_, idx) => (
                  <div key={idx} className="h-5 leading-5">{idx + 1}</div>
                ))}
              </div>

              {/* Code Lines */}
              <div className="pl-4 space-y-0.5 w-full">
                {activeFileLines.map((line, idx) => {
                  const lineNum = idx + 1;
                  const isConceptMatch = doesLineMatchConcept(line, lineNum, activeFile, selectedConceptFilter);
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
                      className={`h-5 leading-5 px-1.5 rounded flex items-center justify-between transition-colors ${
                        isConceptMatch
                          ? 'bg-amber-500/20 border-l-4 border-amber-400 text-amber-100 font-semibold'
                          : ann && selectedConceptFilter === 'all'
                          ? 'bg-blue-900/40 border-l-2 border-blue-400'
                          : 'hover:bg-slate-800/50'
                      }`}
                    >
                      <span className={isConceptMatch ? 'text-amber-200 font-bold' : lineStyle}>
                        {line || ' '}
                      </span>
                      
                      {isConceptMatch && (
                        <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 shrink-0 ml-4 shadow-2xs">
                          {selectedConceptFilter}
                        </span>
                      )}

                      {!isConceptMatch && ann && selectedConceptFilter === 'all' && (
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
