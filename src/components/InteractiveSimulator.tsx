import React, { useState } from 'react';
import { 
  Book as BookIcon, 
  UserCheck, 
  Plus, 
  Terminal, 
  RotateCcw, 
  Play, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  ShieldCheck, 
  Award,
  ArrowUpRight,
  Info,
  Trash2
} from 'lucide-react';
import { Book, Member, LogEntry } from '../types';
import { virtualRuntime } from '../services/virtualCppRuntime';

interface InteractiveSimulatorProps {
  onRunTestSuite: () => void;
  isRunningSuite: boolean;
}

/**
 * InteractiveSimulator Component
 * 
 * Demonstrates Object-Oriented Programming (OOP) concepts in action:
 * - Book Repository: Demonstrates Composition using std::unordered_map to store books by ISBN.
 * - Member Hierarchy: Demonstrates Polymorphism & Inheritance (Base Member class extended by Regular Member and Premium Member).
 * - C++ Terminal Output: Simulates standard cout logging streams for real-time operation traces.
 */
export const InteractiveSimulator: React.FC<InteractiveSimulatorProps> = ({
  onRunTestSuite,
  isRunningSuite
}) => {
  const [books, setBooks] = useState<Book[]>(virtualRuntime.getBooks());
  const [members, setMembers] = useState<Member[]>(virtualRuntime.getMembers());
  const [logs, setLogs] = useState<LogEntry[]>(virtualRuntime.getLogs());

  // Search & Filter
  const [bookSearch, setBookSearch] = useState('');
  const [logFilter, setLogFilter] = useState<'all' | 'cpp_cout' | 'error' | 'success'>('all');

  // Modal & Form States
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [selectedIsbn, setSelectedIsbn] = useState('');

  // Form Inputs
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newIsbn, setNewIsbn] = useState('');

  const [newName, setNewName] = useState('');
  const [newMemberId, setNewMemberId] = useState('');
  const [newMemberType, setNewMemberType] = useState<'regular' | 'premium'>('regular');

  const refreshState = () => {
    setBooks(virtualRuntime.getBooks());
    setMembers(virtualRuntime.getMembers());
    setLogs(virtualRuntime.getLogs());
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (virtualRuntime.addBook(newTitle, newAuthor, newIsbn)) {
      setNewTitle('');
      setNewAuthor('');
      setNewIsbn('');
      setShowAddBookModal(false);
    }
    refreshState();
  };

  const handleRegisterMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (virtualRuntime.registerMember(newName, newMemberId, newMemberType)) {
      setNewName('');
      setNewMemberId('');
      setShowAddMemberModal(false);
    }
    refreshState();
  };

  const handleBorrow = () => {
    if (!selectedMemberId || !selectedIsbn) return;
    virtualRuntime.borrowBook(selectedMemberId, selectedIsbn);
    refreshState();
  };

  const handleReturn = (memberId: string, isbn: string) => {
    virtualRuntime.returnBook(memberId, isbn);
    refreshState();
  };

  const handleReset = () => {
    virtualRuntime.resetToDefaults();
    refreshState();
  };

  const filteredBooks = books.filter(
    b => b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
         b.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
         b.isbn.includes(bookSearch)
  );

  const filteredLogs = logs.filter(l => {
    if (logFilter === 'all') return true;
    if (logFilter === 'cpp_cout') return l.type === 'cpp_cout';
    if (logFilter === 'error') return l.type === 'error';
    if (logFilter === 'success') return l.type === 'success';
    return true;
  });

  return (
    <div className="min-h-screen text-slate-800 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner & Quick Controls */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">C++ Library Operations Simulator</h2>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              Live C++ Demo
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Test book borrowing, returning, and member limits according to our C++ OOP design (Regular Members = max 3 books, Premium Members = max 5 books).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setShowAddBookModal(true)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Book</span>
          </button>

          <button
            onClick={() => setShowAddMemberModal(true)}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register Member</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-gray-50 text-slate-700 border border-gray-300 shadow-xs transition"
            title="Reset repository and members to default state"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Quick Operation Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div>
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
            Select Member (Inheritance Check)
          </label>
          <select
            value={selectedMemberId}
            onChange={e => setSelectedMemberId(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 text-xs rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-600 font-medium"
          >
            <option value="">-- Choose Member --</option>
            {members.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.id}) • {m.type === 'regular' ? 'Regular (Max 3)' : 'Premium (Max 5)'} [Active: {m.borrowedIsbns.length}/{m.maxBorrowLimit}]
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
            Select Book to Borrow (ISBN)
          </label>
          <select
            value={selectedIsbn}
            onChange={e => setSelectedIsbn(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 text-xs rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-600 font-medium"
          >
            <option value="">-- Choose Book --</option>
            {books.map(b => (
              <option key={b.isbn} value={b.isbn} disabled={b.isBorrowed}>
                {b.title} {b.isBorrowed ? '(Currently Borrowed)' : '[Available]'}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleBorrow}
            disabled={!selectedMemberId || !selectedIsbn}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <BookOpen className="w-4 h-4" />
            <span>Execute Borrow Operation</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Catalog, Members, Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1: Book Repository Catalog */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col h-[620px]">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                <BookIcon className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase">Book Repository</h3>
                <p className="text-[11px] text-slate-500 font-medium">Composition • std::unordered_map</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-gray-200">
              {books.length} Books
            </span>
          </div>

          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search title, author, ISBN..."
              value={bookSearch}
              onChange={e => setBookSearch(e.target.value)}
              className="w-full bg-slate-50 border border-gray-200 text-xs rounded-lg pl-9 pr-3 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-medium"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
            {filteredBooks.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs font-medium">
                No books found in repository.
              </div>
            ) : (
              filteredBooks.map(book => (
                <div
                  key={book.isbn}
                  className={`p-3.5 rounded-xl border transition-all ${
                    book.isBorrowed
                      ? 'bg-amber-50/60 border-amber-200'
                      : 'bg-slate-50/60 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{book.title}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 uppercase tracking-wider ${
                        book.isBorrowed
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {book.isBorrowed ? 'Borrowed' : 'Available'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">by {book.author}</p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/60 text-[10px] text-slate-500 font-medium">
                    <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-gray-200 text-slate-700">
                      ISBN: {book.isbn}
                    </span>
                    {book.isBorrowed && book.borrowedByMemberId && (
                      <span className="text-amber-700 font-bold">
                        Held by {book.borrowedByMemberId}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Col 2: Members Hierarchy & Limits */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col h-[620px]">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-gray-200 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-slate-700" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase">Registered Members</h3>
                <p className="text-[11px] text-slate-500 font-medium">Inheritance • Regular (3) vs Premium (5)</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-gray-200">
              {members.length} Members
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar">
            {members.map(member => {
              const count = member.borrowedIsbns.length;
              const max = member.maxBorrowLimit;
              const isFull = count >= max;
              const pct = (count / max) * 100;

              return (
                <div
                  key={member.id}
                  className="bg-slate-50/60 border border-gray-200 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-900">{member.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-white text-slate-600 rounded border border-gray-200 font-semibold">
                          {member.id}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5 mt-1">
                        {member.type === 'premium' ? (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 uppercase tracking-wider">
                            <Award className="w-3 h-3 text-blue-600" />
                            <span>Premium Member (Max 5)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-gray-200 uppercase tracking-wider">
                            <ShieldCheck className="w-3 h-3 text-slate-600" />
                            <span>Regular Member (Max 3)</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-xs font-bold font-mono ${isFull ? 'text-rose-600' : 'text-slate-900'}`}>
                        {count} / {max}
                      </span>
                      <p className="text-[10px] text-slate-500 font-medium">Books Borrowed</p>
                    </div>
                  </div>

                  {/* Quota Progress Bar */}
                  <div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isFull
                            ? 'bg-rose-500'
                            : 'bg-blue-600'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Borrowed Book Pills */}
                  {member.borrowedIsbns.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        Borrowed Books:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {member.borrowedIsbns.map(isbn => {
                          const bookObj = books.find(b => b.isbn === isbn);
                          return (
                            <div
                              key={isbn}
                              className="inline-flex items-center space-x-1 bg-white border border-gray-300 rounded-md px-2 py-1 text-[10px] text-slate-800 font-medium shadow-2xs"
                            >
                              <span className="truncate max-w-[120px]" title={bookObj?.title || isbn}>
                                {bookObj?.title || isbn}
                              </span>
                              <button
                                onClick={() => handleReturn(member.id, isbn)}
                                className="ml-1 text-slate-400 hover:text-rose-600 transition font-bold"
                                title="Return this book"
                              >
                                &times;
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Col 3: Virtual C++ Terminal Logs */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col h-[620px]">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">C++ Terminal Output</h3>
                <p className="text-[11px] text-slate-500 font-normal">Console logs &amp; program traces (std::cout)</p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              {(['all', 'cpp_cout', 'success', 'error'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setLogFilter(type)}
                  className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md transition ${
                    logFilter === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type === 'all' ? 'All' : type === 'cpp_cout' ? 'C++ Trace' : type}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto font-mono text-[11px] p-3 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 space-y-2 custom-scrollbar">
            {filteredLogs.length === 0 ? (
              <div className="text-slate-500 italic text-center py-10">
                // Terminal output buffer is empty.
              </div>
            ) : (
              filteredLogs.map(log => {
                let badgeStyle = 'text-slate-300';
                if (log.type === 'cpp_cout') badgeStyle = 'text-blue-300 font-bold';
                if (log.type === 'success') badgeStyle = 'text-emerald-400';
                if (log.type === 'error') badgeStyle = 'text-rose-400 font-semibold';

                return (
                  <div key={log.id} className="leading-relaxed border-b border-slate-800/60 pb-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                      <span>[{log.timestamp}]</span>
                      {log.cppTrace && <span className="text-slate-400 font-sans">{log.cppTrace}</span>}
                    </div>
                    <div className={badgeStyle}>
                      {log.text}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* Modal: Add Book */}
      {showAddBookModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 uppercase">Add Book to Repository (Composition)</h3>
              <button onClick={() => setShowAddBookModal(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">&times;</button>
            </div>

            <form onSubmit={handleAddBook} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Book Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. War and Peace"
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Author</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                  placeholder="e.g. Leo Tolstoy"
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">ISBN Code</label>
                <input
                  type="text"
                  required
                  value={newIsbn}
                  onChange={e => setNewIsbn(e.target.value)}
                  placeholder="e.g. 978-0140447934"
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddBookModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Register Member */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 uppercase">Register Member (Inheritance)</h3>
              <button onClick={() => setShowAddMemberModal(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">&times;</button>
            </div>

            <form onSubmit={handleRegisterMember} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Mikhail Lermontov"
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Member ID</label>
                <input
                  type="text"
                  required
                  value={newMemberId}
                  onChange={e => setNewMemberId(e.target.value)}
                  placeholder="e.g. M003"
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Member Type (Subclass)</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setNewMemberType('regular')}
                    className={`p-3 rounded-lg border text-left transition ${
                      newMemberType === 'regular'
                        ? 'bg-blue-50 border-blue-600 text-blue-900'
                        : 'bg-slate-50 border-gray-200 text-slate-600'
                    }`}
                  >
                    <span className="font-bold block">Regular Member</span>
                    <span className="text-[10px] text-slate-500 font-medium">Borrow Limit: 3 books</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewMemberType('premium')}
                    className={`p-3 rounded-lg border text-left transition ${
                      newMemberType === 'premium'
                        ? 'bg-blue-50 border-blue-600 text-blue-900'
                        : 'bg-slate-50 border-gray-200 text-slate-600'
                    }`}
                  >
                    <span className="font-bold block">Premium Member</span>
                    <span className="text-[10px] text-slate-500 font-medium">Borrow Limit: 5 books</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold"
                >
                  Register Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
