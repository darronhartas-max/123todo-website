import React, { useState, useEffect } from 'react';

type Priority = 1 | 2 | 3;

interface DemoTask {
  id: string;
  title: string;
  note?: string;
  priority: Priority;
  completed: boolean;
  project?: { name: string; color: string };
}

const INITIAL_DEMO_TASKS: DemoTask[] = [
  {
    id: 'demo-1',
    title: 'Send monthly project invoice to client',
    note: 'Include bank details and updated hours breakdown.',
    priority: 1,
    completed: false,
    project: { name: 'Work', color: '#2563eb' },
  },
  {
    id: 'demo-2',
    title: 'Book car service & MOT before Friday',
    note: 'Call garage at 8:30am; ask for morning drop-off.',
    priority: 2,
    completed: false,
    project: { name: 'Personal', color: '#10b981' },
  },
  {
    id: 'demo-3',
    title: 'Pick up weekly groceries & fresh fruit',
    note: 'Olive oil, fresh produce, and coffee beans.',
    priority: 3,
    completed: false,
    project: { name: 'Home', color: '#f59e0b' },
  },
];

export default function HeroInteractiveDemo() {
  // Modal visibility state
  const [isOpen, setIsOpen] = useState(false);

  // Purely in-memory state: NO localStorage, NO cookies, NO server persistence
  const [tasks, setTasks] = useState<DemoTask[]>(INITIAL_DEMO_TASKS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newPriority, setNewPriority] = useState<Priority>(1);

  // Edit task form state
  const [editTitle, setEditTitle] = useState('');
  const [editNote, setEditNote] = useState('');
  const [editPriority, setEditPriority] = useState<Priority>(1);

  // Handle external triggers (URL hash, custom event, or hero CTA button click)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#interactive-demo' || window.location.hash === '#demo') {
        setIsOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);

    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('123todo:open-demo', handleCustomOpen);

    const openBtn = document.getElementById('hero-open-demo-btn');
    const handleBtnClick = (e: MouseEvent) => {
      e.preventDefault();
      setIsOpen(true);
    };
    if (openBtn) {
      openBtn.addEventListener('click', handleBtnClick);
    }

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('123todo:open-demo', handleCustomOpen);
      if (openBtn) {
        openBtn.removeEventListener('click', handleBtnClick);
      }
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key to close modal (or close task edit modal if open)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (editingTaskId) {
          setEditingTaskId(null);
        } else {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, editingTaskId]);

  const toggleComplete = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingTaskId === id) {
      setEditingTaskId(null);
    }
  };

  const handleStartEdit = (task: DemoTask) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditNote(task.note || '');
    setEditPriority(task.priority);
  };

  const handleSaveEdit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingTaskId || !editTitle.trim()) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === editingTaskId
          ? {
              ...t,
              title: editTitle.trim(),
              note: editNote.trim() || undefined,
              priority: editPriority,
            }
          : t
      )
    );
    setEditingTaskId(null);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    const newTask: DemoTask = {
      id: `demo-${Date.now()}`,
      title: trimmed,
      note: newNote.trim() || undefined,
      priority: newPriority,
      completed: false,
      project: { name: 'General', color: '#6b7280' },
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTitle('');
    setNewNote('');
    setShowAddForm(false);
  };

  const resetDemo = () => {
    setTasks(INITIAL_DEMO_TASKS);
    setEditingTaskId(null);
    setShowAddForm(false);
    setNewTitle('');
    setNewNote('');
  };

  const priorityConfigs = [
    {
      level: 1 as Priority,
      label: 'MUST DO',
      color: '#dc2626',
      bgLight: 'bg-red-50 dark:bg-red-950/30',
      borderLight: 'border-red-200 dark:border-red-900/50',
      textAccent: 'text-red-600 dark:text-red-400',
      pillBg: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
    },
    {
      level: 2 as Priority,
      label: 'SHOULD DO',
      color: '#f59e0b',
      bgLight: 'bg-amber-50 dark:bg-amber-950/30',
      borderLight: 'border-amber-200 dark:border-amber-900/50',
      textAccent: 'text-amber-600 dark:text-amber-400',
      pillBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
    },
    {
      level: 3 as Priority,
      label: 'COULD DO',
      color: '#6b7280',
      bgLight: 'bg-slate-50 dark:bg-slate-800/40',
      borderLight: 'border-slate-200 dark:border-slate-700',
      textAccent: 'text-slate-600 dark:text-slate-400',
      pillBg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    },
  ];

  return (
    <>
      {/* 1. HERO INLINE TEASER PREVIEW (Clicks to launch modal with blurred background) */}
      <div className="w-full max-w-3xl mx-auto text-left select-none relative group">
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-blue-500/10 transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-blue-500/20"
          title="Click to launch interactive demo"
        >
          {/* Top Bar Preview */}
          <div className="px-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block"></span>
              <span className="ml-2 font-mono text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                123todo.com &bull; In-Memory Sandbox
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>Interactive Sandbox Available</span>
            </span>
          </div>

          {/* Realistic Teaser Snapshot */}
          <div className="p-4 sm:p-6 space-y-4 relative">
            {/* Header snippet */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <img src="/123-logo-500px-light.png" alt="123 ToDo" className="h-7 w-auto dark:hidden" />
                <img src="/123-logo-500px-dark.png" alt="123 ToDo" className="h-7 w-auto hidden dark:block" />
              </div>
              <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300">
                1-2-3 Priority Workflow
              </div>
            </div>

            {/* Teaser 3 tasks */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl border border-red-200/80 dark:border-red-900/40 bg-red-50/40 dark:bg-red-950/20 border-l-[5px] border-l-red-600">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded border border-red-400 bg-white dark:bg-slate-800"></div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      1 Must Do: Send monthly project invoice to client
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Include bank details &amp; updated hours breakdown.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950 px-2 py-0.5 rounded">
                  P1 Must Do
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 border-l-[5px] border-l-amber-500">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded border border-amber-400 bg-white dark:bg-slate-800"></div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      2 Should Do: Book car service &amp; MOT before Friday
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Call garage at 8:30am; ask for morning drop-off.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded">
                  P2 Should Do
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 border-l-[5px] border-l-slate-400">
                <div className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded border border-slate-400 bg-white dark:bg-slate-800"></div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      3 Could Do: Pick up weekly groceries &amp; fresh fruit
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Olive oil, fresh produce, and coffee beans.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  P3 Could Do
                </span>
              </div>
            </div>

            {/* Interactive Overlay Call-to-action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
                <span>Click anywhere to test checking, editing &amp; creating tasks in a sandboxed modal</span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>Open Interactive Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE MODAL DIALOG WITH BLURRED BACKGROUND */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="123ToDo Simplified Demo Sandbox"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 sm:py-8 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-fade"
          onClick={(e) => {
            // Close modal when clicking on the blurred backdrop outside the modal dialog
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          {/* Modal Dialog Card */}
          <div
            className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Amber Banner: Crystal Clear SIMPLIFIED DEMO Notice */}
            <div className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border-b border-amber-500/30 flex items-center justify-between gap-3 text-xs flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-2.5 text-amber-900 dark:text-amber-200 font-semibold">
                <span className="flex-shrink-0 text-base">⚠️</span>
                <div>
                  <span className="font-extrabold uppercase tracking-wider text-[11px] sm:text-xs bg-amber-500/30 text-amber-950 dark:text-amber-100 px-2 py-0.5 rounded mr-2 border border-amber-500/40">
                    SIMPLIFIED DEMO ONLY
                  </span>
                  <span className="hidden md:inline text-[11px] sm:text-xs font-medium text-amber-900/90 dark:text-amber-200/90">
                    In-memory sandbox &bull; Zero data is saved or stored in your browser &bull; Closes clean.
                  </span>
                </div>
              </div>

              {/* Close Modal Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close demo modal"
                className="flex-shrink-0 p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* High-Impact Invitation to Try the REAL App */}
            <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 shadow-sm flex-shrink-0">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-xs sm:text-sm">
                  <span>Want to try the full 123ToDo App?</span>
                  <span className="bg-white/20 text-[10px] sm:text-xs px-2 py-0.2 rounded-full uppercase tracking-wider">
                    100% Free &amp; Private
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-blue-100 mt-0.5 leading-snug">
                  Includes Voice Notes dictation, Unlimited tasks, Zero-Knowledge Cloud Sync, Subtasks &amp; Photos.
                </p>
              </div>

              <a
                href="https://app.123todo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-white text-blue-700 hover:bg-blue-50 shadow-md transition-all whitespace-nowrap cursor-pointer flex-shrink-0 hover:scale-105"
              >
                <span>Launch App</span>
              </a>
            </div>

            {/* Scrollable Demo Content Area */}
            <div className="overflow-y-auto flex-1 p-0 divide-y divide-slate-100 dark:divide-slate-800">
              {/* App Bar Header */}
              <div className="px-4 sm:px-6 py-3 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 bg-white dark:bg-slate-900 sticky top-0 z-10">
                {/* Logo & Demo pill */}
                <div className="flex items-center gap-2.5">
                  <img src="/123-logo-500px-light.png" alt="123 ToDo" className="h-7 sm:h-8 w-auto dark:hidden" />
                  <img src="/123-logo-500px-dark.png" alt="123 ToDo" className="h-7 sm:h-8 w-auto hidden dark:block" />
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                    Simplified Demo
                  </span>
                </div>

                {/* Reset & Add Task Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={resetDemo}
                    title="Reset to 3 starter tasks"
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span className="hidden sm:inline">Reset</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAddForm((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Task</span>
                  </button>
                </div>
              </div>

              {/* Add Task Form (Expandable) */}
              {showAddForm && (
                <form
                  onSubmit={handleAddTask}
                  className="p-4 bg-blue-50/60 dark:bg-slate-800/80 border-b border-blue-100 dark:border-slate-700 space-y-3 animate-fade"
                >
                  <div>
                    <input
                      type="text"
                      autoFocus
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="What needs doing? (e.g. Schedule dentist checkup)..."
                      className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add optional note or details..."
                      className="w-full px-3.5 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 dark:text-slate-300 placeholder-slate-400"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">Priority:</span>
                      <button
                        type="button"
                        onClick={() => setNewPriority(1)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          newPriority === 1
                            ? 'bg-red-600 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-red-600 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        1 Must Do
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewPriority(2)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          newPriority === 2
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-amber-600 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        2 Should Do
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewPriority(3)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          newPriority === 3
                            ? 'bg-slate-700 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        3 Could Do
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="px-3 py-1 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer"
                      >
                        Add Task
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Task List: 3 Signature 1-2-3 Priority Sections */}
              <div className="p-4 sm:p-6 space-y-6">
                {priorityConfigs.map((config) => {
                  const sectionTasks = tasks.filter((t) => t.priority === config.level);

                  return (
                    <div key={config.level} className="space-y-2">
                      {/* Priority Section Header */}
                      <div className="flex items-center justify-between pb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: config.color }}></span>
                          <h3
                            className="text-xs sm:text-sm font-extrabold tracking-wider uppercase"
                            style={{ color: config.color }}
                          >
                            {config.label}
                          </h3>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${config.pillBg}`}>
                            {sectionTasks.length}
                          </span>
                        </div>
                      </div>

                      {/* Section Task Items */}
                      <div className="space-y-2">
                        {sectionTasks.length === 0 ? (
                          <div className="py-3 px-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500">
                            No tasks in {config.label.toLowerCase()}. Click "+ Add Task" to create one.
                          </div>
                        ) : (
                          sectionTasks.map((task) => (
                            <div
                              key={task.id}
                              className={`group relative flex items-start justify-between gap-3 p-3 sm:p-3.5 rounded-xl border transition-all ${
                                task.completed
                                  ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-60'
                                  : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm'
                              }`}
                              style={{
                                borderLeftWidth: '5px',
                                borderLeftColor: task.project?.color || config.color,
                              }}
                            >
                              {/* Checkbox */}
                              <button
                                type="button"
                                onClick={() => toggleComplete(task.id)}
                                aria-label={`Mark task ${task.completed ? 'incomplete' : 'complete'}`}
                                className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all flex-shrink-0 cursor-pointer ${
                                  task.completed
                                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                                    : 'border-slate-300 dark:border-slate-600 hover:border-blue-500 bg-white dark:bg-slate-800'
                                }`}
                              >
                                {task.completed && (
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="3"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </button>

                              {/* Title & Notes (Click to Edit) */}
                              <div
                                onClick={() => handleStartEdit(task)}
                                className="flex-1 min-w-0 cursor-pointer"
                                title="Click to edit task title or notes"
                              >
                                <p
                                  className={`text-xs sm:text-sm font-medium leading-snug break-words transition-all ${
                                    task.completed
                                      ? 'line-through text-slate-400 dark:text-slate-500'
                                      : 'text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400'
                                  }`}
                                >
                                  {task.title}
                                </p>
                                {task.note && (
                                  <p
                                    className={`text-[11px] sm:text-xs mt-0.5 leading-relaxed break-words ${
                                      task.completed
                                        ? 'line-through text-slate-400/80 dark:text-slate-600'
                                        : 'text-slate-500 dark:text-slate-400'
                                    }`}
                                  >
                                    {task.note}
                                  </p>
                                )}
                              </div>

                              {/* Actions (Edit & Delete) */}
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleStartEdit(task)}
                                  title="Edit task"
                                  aria-label="Edit task"
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                                >
                                  <svg
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => deleteTask(task.id)}
                                  title="Delete task"
                                  aria-label="Delete task"
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                                >
                                  <svg
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* In-Demo Task Edit Modal (Overlay over the demo modal) */}
            {editingTaskId && (
              <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade">
                <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      <span>Edit Task</span>
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingTaskId(null)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Edit Form */}
                  <form onSubmit={handleSaveEdit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Task Title
                      </label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Notes &amp; Details
                      </label>
                      <textarea
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        rows={3}
                        placeholder="Add phone numbers, addresses, links, or notes..."
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Priority
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setEditPriority(1)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            editPriority === 1
                              ? 'bg-red-600 text-white border-red-600 shadow-md'
                              : 'bg-slate-50 dark:bg-slate-800 text-red-600 dark:text-red-400 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          1 Must Do
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditPriority(2)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            editPriority === 2
                              ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                              : 'bg-slate-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          2 Should Do
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditPriority(3)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            editPriority === 3
                              ? 'bg-slate-700 text-white border-slate-700 shadow-md'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          3 Could Do
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => deleteTask(editingTaskId)}
                        className="text-xs font-bold text-red-600 hover:text-red-700 dark:text-red-400 p-2 rounded-lg cursor-pointer"
                      >
                        Delete Task
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingTaskId(null)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Bottom Modal Conversion Bar: Direct to the REAL App */}
            <div className="px-4 sm:px-6 py-3.5 bg-slate-50 dark:bg-slate-950/90 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left flex-shrink-0">
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Ready to organize your day for real?
                </p>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                  Try the REAL 123ToDo App &bull; No sign-up &bull; No email &bull; Instant &amp; 100% Free
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Close Demo
                </button>
                <a
                  href="https://app.123todo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:scale-[1.02] transition-all whitespace-nowrap cursor-pointer"
                >
                  <span>Launch App</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
