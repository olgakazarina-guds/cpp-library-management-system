import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { CodeExplorer } from './components/CodeExplorer';
import { UMLVisualizer } from './components/UMLVisualizer';
import { PyVsCppGuide } from './components/PyVsCppGuide';
import { AiUsageReport } from './components/AiUsageReport';
import { DeliverablesModal } from './components/DeliverablesModal';
import { virtualRuntime } from './services/virtualCppRuntime';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('simulator');
  const [isDeliverablesOpen, setIsDeliverablesOpen] = useState<boolean>(false);
  const [isRunningSuite, setIsRunningSuite] = useState<boolean>(false);

  const handleRunTestSuite = async () => {
    if (isRunningSuite) return;
    setIsRunningSuite(true);
    setActiveTab('simulator');
    await virtualRuntime.runFullTestSuite();
    setIsRunningSuite(false);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-800 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunTestSuite={handleRunTestSuite}
        onOpenDeliverablesModal={() => setIsDeliverablesOpen(true)}
        isRunningSuite={isRunningSuite}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'simulator' && (
          <InteractiveSimulator
            onRunTestSuite={handleRunTestSuite}
            isRunningSuite={isRunningSuite}
          />
        )}

        {activeTab === 'code' && <CodeExplorer />}

        {activeTab === 'uml' && <UMLVisualizer />}

        {activeTab === 'guide' && <PyVsCppGuide />}

        {activeTab === 'ai' && <AiUsageReport />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-medium text-slate-600">C++ Library System • Russian Literature Edition</span>
          <span className="text-slate-500">OOP Mini-Project (Weeks 3 &amp; 4)</span>
        </div>
      </footer>

      {/* Deliverables Modal */}
      <DeliverablesModal
        isOpen={isDeliverablesOpen}
        onClose={() => setIsDeliverablesOpen(false)}
      />
    </div>
  );
}

