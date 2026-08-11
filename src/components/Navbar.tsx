import React from 'react';
import { 
  BookOpen, 
  Code2, 
  Network, 
  ArrowLeftRight, 
  FileText, 
  Play, 
  FolderArchive,
  Book
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRunTestSuite: () => void;
  onOpenDeliverablesModal: () => void;
  isRunningSuite: boolean;
}

/**
 * Navbar Component
 * 
 * Top navigation bar providing tabs to switch between views (Simulator, C++ Codebase, UML Architecture, Python vs C++ Guide, AI Usage Report)
 * and quick actions to run the virtual C++ test suite or open deliverables.
 */
export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onRunTestSuite,
  onOpenDeliverablesModal,
  isRunningSuite
}) => {
  const tabs = [
    { id: 'simulator', label: 'Visual Simulator', icon: BookOpen },
    { id: 'code', label: 'C++ Codebase', icon: Code2 },
    { id: 'uml', label: 'UML Architecture', icon: Network },
    { id: 'guide', label: 'Python vs C++', icon: ArrowLeftRight },
    { id: 'ai', label: 'AI Usage Report', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 py-2.5">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => setActiveTab('simulator')}>
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-xs shrink-0">
              <Book className="w-5 h-5" />
            </div>
            <div className="shrink-0">
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 whitespace-nowrap">
                  C++ Library System
                </h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap hidden lg:inline-block">
                  Russian Classics
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal whitespace-nowrap hidden sm:block">
                OOP Mini-Project (Weeks 3 &amp; 4)
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/90 p-1 rounded-xl border border-gray-200 shrink">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 shrink-0 ml-auto md:ml-0">
            <button
              onClick={onRunTestSuite}
              disabled={isRunningSuite}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition disabled:opacity-50"
              title="Execute full C++ test harness in virtual runtime"
            >
              <Play className={`w-3.5 h-3.5 ${isRunningSuite ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isRunningSuite ? 'Running...' : 'Run Test Suite'}</span>
            </button>

            <button
              onClick={onOpenDeliverablesModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-slate-700 hover:bg-gray-50 shadow-xs transition"
              title="Download C++ Zip, Execution Report, and AI Framework"
            >
              <FolderArchive className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Deliverables</span>
            </button>
          </div>

        </div>

        {/* Mobile Tab Bar */}
        <div className="md:hidden flex overflow-x-auto space-x-1 pb-2 pt-1 border-t border-gray-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

