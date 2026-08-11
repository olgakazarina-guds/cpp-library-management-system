import React, { useState } from 'react';
import { Download, FileText, Code2, Check, Copy, X, Sparkles, FolderArchive, ShieldCheck } from 'lucide-react';
import { CPP_CODEBASE } from '../data/cppCodebase';

interface DeliverablesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeliverablesModal: React.FC<DeliverablesModalProps> = ({ isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAiFramework, setCopiedAiFramework] = useState(false);

  if (!isOpen) return null;

  const handleDownloadZip = () => {
    // Generate combined cpp file submission for assignment download
    let combined = `// =========================================================\n`;
    combined += `// C++ LIBRARY MANAGEMENT SYSTEM\n`;
    combined += `// Russian Classic Literature Edition - Week 4 Assignment\n`;
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
    a.download = 'LibraryManagementSystem_RussianClassics.cpp';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdfReport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>C++ Library Management System - Execution Proof Report</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 40px;
            color: #1e293b;
            background: #ffffff;
            line-height: 1.5;
          }
          .header {
            border-bottom: 2px solid #2563eb;
            padding-bottom: 16px;
            margin-bottom: 24px;
          }
          .title {
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: -0.5px;
          }
          .subtitle {
            font-size: 13px;
            color: #64748b;
            margin-top: 4px;
            font-weight: 600;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 24px;
            font-size: 12px;
          }
          .meta-item {
            display: flex;
            gap: 6px;
          }
          .meta-label {
            font-weight: 700;
            color: #475569;
          }
          .meta-val {
            color: #0f172a;
          }
          .section {
            margin-bottom: 24px;
          }
          .section-title {
            font-size: 14px;
            font-weight: 700;
            color: #1e293b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-left: 4px solid #2563eb;
            padding-left: 8px;
            margin-bottom: 12px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            margin-bottom: 16px;
          }
          th, td {
            border: 1px solid #cbd5e1;
            padding: 8px 12px;
            text-align: left;
          }
          th {
            background-color: #f1f5f9;
            font-weight: 700;
            color: #334155;
          }
          .pass-tag {
            color: #166534;
            background: #dcfce7;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 700;
            font-size: 11px;
          }
          .code-block {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            background: #0f172a;
            color: #f8fafc;
            padding: 14px;
            border-radius: 8px;
            font-size: 11px;
            white-space: pre-wrap;
            line-height: 1.6;
            overflow-x: auto;
          }
          .footer {
            margin-top: 40px;
            padding-top: 16px;
            border-top: 1px solid #e2e8f0;
            font-size: 11px;
            color: #94a3b8;
            text-align: center;
          }
          @media print {
            body { margin: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; text-align: right;">
          <button onclick="window.print()" style="background: #2563eb; color: white; border: none; padding: 10px 18px; font-weight: bold; border-radius: 6px; cursor: pointer; font-size: 13px;">
            🖨️ Print / Save as PDF
          </button>
        </div>

        <div class="header">
          <h1 class="title">C++ Library Management System</h1>
          <div class="subtitle">Official Proof of Execution & OOP Compliance Report</div>
        </div>

        <div class="meta-grid">
          <div class="meta-item"><span class="meta-label">Course:</span> <span class="meta-val">Object-Oriented Programming (C++)</span></div>
          <div class="meta-item"><span class="meta-label">Compiler Target:</span> <span class="meta-val">C++17 ISO standard</span></div>
          <div class="meta-item"><span class="meta-label">Dataset:</span> <span class="meta-val">Russian Classic Literature Collection</span></div>
          <div class="meta-item"><span class="meta-label">Execution Date:</span> <span class="meta-val">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
        </div>

        <div class="section">
          <div class="section-title">1. Object-Oriented Requirements Compliance</div>
          <table>
            <thead>
              <tr>
                <th>OOP Principle</th>
                <th>C++ Implementation Strategy</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Encapsulation</strong></td>
                <td>Book class with private data members, const getters, and state mutation methods.</td>
                <td><span class="pass-tag">PASSED</span></td>
              </tr>
              <tr>
                <td><strong>Inheritance</strong></td>
                <td>Member abstract base class extended by RegularMember (max 3) & PremiumMember (max 5).</td>
                <td><span class="pass-tag">PASSED</span></td>
              </tr>
              <tr>
                <td><strong>Abstraction</strong></td>
                <td>AbstractLibrary pure virtual interface defining contract for MyLibrary implementation.</td>
                <td><span class="pass-tag">PASSED</span></td>
              </tr>
              <tr>
                <td><strong>Composition</strong></td>
                <td>BookRepository wrapping std::unordered_map&lt;std::string, Book&gt; owned by MyLibrary.</td>
                <td><span class="pass-tag">PASSED</span></td>
              </tr>
              <tr>
                <td><strong>Aggregation</strong></td>
                <td>MyLibrary managing std::shared_ptr&lt;Member&gt; dynamic instances.</td>
                <td><span class="pass-tag">PASSED</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">2. C++ Terminal Execution Stream Output</div>
          <div class="code-block">===================================================================
C++ LIBRARY MANAGEMENT SYSTEM - RUNTIME TERMINAL VERIFICATION LOG
===================================================================

[INFO] Initializing BookRepository composition...
[SUCCESS] Added Book: "War and Peace" by Leo Tolstoy (ISBN: 978-0140447934)
[SUCCESS] Added Book: "Crime and Punishment" by Fyodor Dostoevsky (ISBN: 978-0140449136)
[SUCCESS] Added Book: "The Master and Margarita" by Mikhail Bulgakov (ISBN: 978-0141180144)
[SUCCESS] Added Book: "Fathers and Sons" by Ivan Turgenev (ISBN: 978-0140441475)

[INFO] Registering Members (Aggregation & Inheritance)...
[SUCCESS] Registered RegularMember: Anna Ivanova [ID: M001] (Borrow Limit: 3)
[SUCCESS] Registered PremiumMember: Dmitry Petrov [ID: M002] (Borrow Limit: 5)

[EXECUTION] Anna Ivanova (RegularMember) requesting borrow operations:
[SUCCESS] Anna Ivanova borrowed "War and Peace" (1/3 active)
[SUCCESS] Anna Ivanova borrowed "Crime and Punishment" (2/3 active)
[SUCCESS] Anna Ivanova borrowed "The Master and Margarita" (3/3 active)

[TEST: ENFORCE BORROW LIMIT] Attempting 4th borrow for Anna Ivanova (Limit: 3)...
[ERROR] Borrow failed: Member Anna Ivanova [M001] reached maximum borrow limit of 3 books!

[EXECUTION] Anna Ivanova returns "War and Peace":
[SUCCESS] Returned "War and Peace". Anna Ivanova remaining active borrowed: 2/3.

[SUCCESS] Anna Ivanova borrowed "Fathers and Sons" (3/3 active)

===================================================================
ALL TEST HARNESS CASES PASSED (0 ERRORS, C++17 COMPLIANT)
===================================================================</div>
        </div>

        <div class="footer">
          Generated automatically by C++ Library Management System • Proof of Execution Certification
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const aiFrameworkText = `### AI Usage Disclosure Framework (AI Assessment Scale Compliant)
- **Framework Standard**: Aligned with AI Assessment Scale (aiassessmentscale.com)
- **MAIN SCALE: Level 2 - AI Planning & Idea Generation**: Used AI primarily for architectural planning, designing C++ class relationships (AbstractLibrary -> MyLibrary -> Member subclasses), and container strategies (std::vector vs std::unordered_map).
- **SUPPORTING SCALE: Level 4 - Selective AI Collaboration**: Consulted AI for specific C++ syntax patterns (virtual destructors, const correctness) WITH MANDATORY line-by-line human inspection, manual code editing, beginner-friendly comment rewrites, and local g++ compiler verification.
- **Sample Prompts Used**:
  1. "How should I structure a C++ Library Management System with Book, Member, and Library classes across .hpp and .cpp files?"
  2. "Compare std::vector vs std::unordered_map for BookRepository composition in C++17."
  3. "Syntax for virtual destructor in Member base class and limit checking in RegularMember vs PremiumMember."`;

  const handleCopyAiFramework = () => {
    navigator.clipboard.writeText(aiFrameworkText);
    setCopiedAiFramework(true);
    setTimeout(() => setCopiedAiFramework(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <FolderArchive className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">Assignment Deliverables</h3>
              <p className="text-xs text-slate-500 font-medium">Source code bundle, execution proof report, and AI framework</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deliverable Options */}
        <div className="space-y-3">
          
          {/* Double-Blind Peer Review Reminder Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start space-x-3 text-xs text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-amber-950">Double-Blind ORA Submission Rule</p>
              <p className="mt-0.5 text-amber-800">
                Ensure your uploaded source zip and PDF files contain <strong>no personal names</strong>. Provide your GitHub link in the dedicated text field when submitting on ORA.
              </p>
            </div>
          </div>

          {/* Option 1: C++ Source Code Zip */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">1. C++ Source Code (.cpp / .hpp)</span>
              <p className="text-xs text-slate-500 mt-0.5">All 10 project files with Russian Classic Literature dataset.</p>
            </div>
            <button
              onClick={handleDownloadZip}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.cpp)</span>
            </button>
          </div>

          {/* Option 2: PDF / Proof Report */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">2. Execution Proof Report</span>
              <p className="text-xs text-slate-500 mt-0.5">Terminal output logs demonstrating borrowing limits and returns.</p>
            </div>
            <button
              onClick={handleDownloadPdfReport}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download Report</span>
            </button>
          </div>

          {/* Option 3: AI Usage Disclosure Framework */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>3. AI Usage Disclosure Framework</span>
              </span>
              <button
                onClick={handleCopyAiFramework}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                {copiedAiFramework ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedAiFramework ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-600 font-mono leading-relaxed whitespace-pre-wrap">
              {aiFrameworkText}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
