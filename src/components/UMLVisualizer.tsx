import React, { useState } from 'react';
import { 
  Network, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  BookOpen, 
  Users, 
  Building2, 
  Code2,
  Sparkles
} from 'lucide-react';
import { UML_NODES, UML_LINKS } from '../data/umlData';
import { UMLClassNode, UMLLink } from '../types';

export const UMLVisualizer: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('MyLibrary');
  const [selectedConcept, setSelectedConcept] = useState<string>('all');

  const selectedNode = UML_NODES.find(n => n.id === selectedNodeId) || UML_NODES[0];

  const concepts = [
    { id: 'all', label: 'All Principles' },
    { id: 'Encapsulation', label: 'Encapsulation' },
    { id: 'Inheritance', label: 'Inheritance' },
    { id: 'Abstraction', label: 'Abstraction' },
    { id: 'Composition', label: 'Composition' },
    { id: 'Association', label: 'Association' },
  ];

  const filteredNodes = UML_NODES.filter(n => {
    if (selectedConcept === 'all') return true;
    return n.conceptRole === selectedConcept;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      
      {/* Header Bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">UML Architecture Diagram</h2>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              Interactive Class Map
            </span>
          </div>
          <p className="text-xs text-slate-600 font-normal mt-1 max-w-2xl">
            Visual map of C++ class hierarchies, pure virtual interfaces, composition wrappers, member aggregation, and borrowing associations.
          </p>
        </div>

        {/* Concept Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {concepts.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedConcept(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedConcept === c.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Diagram & Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Visual Class Grid */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase flex items-center space-x-2">
              <Network className="w-4 h-4 text-blue-600" />
              <span>Class Hierarchy & Structural Relationships</span>
            </h3>
            <span className="text-xs font-medium text-slate-500">Click any class to inspect details</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNodes.map(node => {
              const isSelected = node.id === selectedNodeId;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/50 border-blue-600 ring-2 ring-blue-600/20 shadow-sm'
                      : 'bg-slate-50/60 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      {node.stereotype && (
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">
                          &lt;&lt;{node.stereotype}&gt;&gt;
                        </span>
                      )}
                      <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                        <span>{node.name}</span>
                        {node.isAbstract && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200 uppercase">
                            abstract
                          </span>
                        )}
                      </h4>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-200 uppercase">
                      {node.conceptRole}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 font-medium mt-2 line-clamp-2">
                    {node.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-gray-200 flex items-center justify-between text-[10px] text-slate-500 font-mono font-semibold">
                    <span>Attr: {node.attributes.length}</span>
                    <span>Methods: {node.methods.length}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Relationship Legend Cards */}
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Modeled Object Relationships
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
              {UML_LINKS.map(link => (
                <div key={link.id} className="bg-slate-50 p-3 rounded-lg border border-gray-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 font-mono font-bold text-blue-900 text-[11px]">
                      <span>{link.from}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span>{link.to}</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-gray-200 uppercase">
                      {link.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{link.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Class Inspector Details */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
              Selected Class Inspector
            </span>
            <div className="flex items-center justify-between mt-1">
              <h3 className="text-lg font-bold text-slate-900 uppercase">{selectedNode.name}</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-600 text-white uppercase">
                {selectedNode.conceptRole}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-2">{selectedNode.description}</p>
          </div>

          {/* Attributes List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Attributes ({selectedNode.attributes.length})</span>
            </h4>
            <div className="bg-slate-900 rounded-lg p-3 border border-slate-800 space-y-1 font-mono text-[11px] text-emerald-300">
              {selectedNode.attributes.length === 0 ? (
                <p className="text-slate-500 italic">No direct member variables declared.</p>
              ) : (
                selectedNode.attributes.map((attr, idx) => (
                  <div key={idx}>{attr}</div>
                ))
              )}
            </div>
          </div>

          {/* Methods List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Member Functions ({selectedNode.methods.length})</span>
            </h4>
            <div className="bg-slate-900 rounded-lg p-3 border border-slate-800 space-y-1 font-mono text-[11px] text-sky-300">
              {selectedNode.methods.map((method, idx) => (
                <div key={idx}>{method}</div>
              ))}
            </div>
          </div>

          {/* Concept Explanation Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-xs">
            <div className="flex items-center space-x-1.5 font-bold text-blue-900 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>C++ Implementation Insight</span>
            </div>
            <p className="text-slate-700 font-medium text-[11px] leading-relaxed">
              {selectedNode.id === 'Book' && 'Demonstrates encapsulation: Private variables `title`, `author`, `isbn` can only be altered through checked setter functions.'}
              {selectedNode.id === 'Member' && 'Acts as base class with virtual destructor and pure virtual `get_max_borrow_limit() = 0` enforcing subclass specialization.'}
              {selectedNode.id === 'RegularMember' && 'Inherits from Member, overriding `get_max_borrow_limit()` to enforce the 3-book limit constraint.'}
              {selectedNode.id === 'PremiumMember' && 'Inherits from Member, overriding `get_max_borrow_limit()` to expand borrowing quota up to 5 books.'}
              {selectedNode.id === 'AbstractLibrary' && 'Defines pure virtual methods `add_book()`, `borrow_book()`, and `return_book()`, serving as standard C++ interface.'}
              {selectedNode.id === 'BookRepository' && 'Composition wrapper around `std::unordered_map<std::string, Book>` delegating collection management.'}
              {selectedNode.id === 'MyLibrary' && 'Owns BookRepository (Composition), manages registered Members (Aggregation), and orchestrates book borrowing (Association).'}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
