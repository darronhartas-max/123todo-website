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

  // Responsive View Mode: 'columns' (3-column desktop Kanban) or 'list' (stacked list)
  const [viewMode, setViewMode] = useState<'columns' | 'list'>('columns');

  // Simulated Cross-Device Sync Notification Toast
  const [syncToast, setSyncToast] = useState<{ message: string; device: string } | null>(null);

  const triggerSyncSimulation = (action: string) => {
    const devices = ['iPhone 15 Pro', 'MacBook Air', 'Pixel 8', 'iPad Air'];
    const chosenDevice = devices[Math.floor(Math.random() * devices.length)];
    setSyncToast({
      message: action,
      device: chosenDevice,
    });
    setTimeout(() => {
      setSyncToast(null);
    }, 2800);
  };

  // Close edit modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && editingTaskId) {
        setEditingTaskId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editingTaskId]);

  const toggleComplete = (id: string) => {
    setTasks((prev) => {
      const target = prev.find((t) => t.id === id);
      const willComplete = target ? !target.completed : false;
      triggerSyncSimulation(willComplete ? 'Task marked complete' : 'Task marked incomplete');
      return prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    triggerSyncSimulation('Task deleted');
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
    triggerSyncSimulation('Task changes synced');
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
    triggerSyncSimulation('New task synced');
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
    triggerSyncSimulation('Reset to starter tasks');
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
    <div className="w-full max-w-5xl xl:max-w-6xl mx-auto text-left relative">
      {/* DIRECT INLINE PLAYABLE SANDBOX CARD */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-blue-500/10 overflow-hidden flex flex-col">
        {/* Top Amber Banner: Crystal Clear SIMPLIFIED DEMO Notice */}
        <div className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border-b border-amber-500/30 flex items-center justify-between gap-3 text-xs flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 text-amber-900 dark:text-amber-200 font-semibold">
            <span className="flex-shrink-0 text-base">⚠️</span>
            <div>
              <span className="font-extrabold uppercase tracking-wider text-[11px] sm:text-xs bg-amber-500/30 text-amber-950 dark:text-amber-100 px-2 py-0.5 rounded mr-2 border border-amber-500/40">
                LIVE INTERACTIVE SANDBOX
              </span>
              <span className="hidden sm:inline text-[11px] sm:text-xs font-medium text-amber-900/90 dark:text-amber-200/90">
                In-memory preview &bull; Try checking, adding, and editing tasks right here &bull; No login required.
              </span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Fully Playable</span>
          </span>
        </div>

        {/* High-Impact Invitation to Try the REAL App */}
        <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 shadow-sm flex-shrink-0">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-xs sm:text-sm">
              <span>Ready for the full experience?</span>
              <span className="bg-white/20 text-[10px] sm:text-xs px-2 py-0.2 rounded-full uppercase tracking-wider">
                100% Free &amp; Private
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-blue-100 mt-0.5 leading-snug">
              Includes Voice Notes dictation, Unlimited tasks, Zero-Knowledge Multi-Device Cloud Sync &amp; Photos.
            </p>
          </div>

          <a
            href="https://app.123todo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold bg-white text-blue-700 hover:bg-blue-50 shadow-md transition-all whitespace-nowrap cursor-pointer flex-shrink-0 hover:scale-105"
          >
            <span>Open Full App Free</span>
          </a>
        </div>

        {/* App Bar Header */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 bg-white dark:bg-slate-900 flex-shrink-0">
          {/* Logo & Demo pill */}
          <div className="flex items-center gap-2.5">
            <img src="/123-logo-500px-light.png" alt="123 ToDo" className="h-7 sm:h-8 w-auto dark:hidden" />
            <img src="/123-logo-500px-dark.png" alt="123 ToDo" className="h-7 sm:h-8 w-auto hidden dark:block" />
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 hidden xs:inline">
              1-2-3 Priorities
            </span>
          </div>

          {/* Center: Live Sync Simulator Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Real-Time Sync:</span>
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
              Mac &bull; iPhone &bull; Android
            </span>
            <span className="font-mono text-[10px] font-bold bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 text-slate-700 dark:text-slate-300">
              Pairing: 738-921
            </span>
          </div>

          {/* Reset, View Toggle & Add Task Buttons */}
          <div className="flex items-center gap-2">
            {/* Desktop Layout Switcher: 3 Columns vs Stacked List */}
            <div className="hidden sm:inline-flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('columns')}
                title="Desktop 3-Column Kanban Board"
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'columns'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                  />
                </svg>
                <span>Columns</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                title="Compact List View"
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>List</span>
              </button>
            </div>

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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer hover:scale-[1.02]"
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
            className="p-4 bg-blue-50/70 dark:bg-slate-800/80 border-b border-blue-100 dark:border-slate-700 space-y-3"
          >
            <div>
              <input
                type="text"
                autoFocus
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="What needs doing? (e.g. Schedule team sprint retrospective)..."
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

        {/* Live Sync Simulated Notification Toast */}
        {syncToast && (
          <div className="px-4 py-2 bg-emerald-500/10 dark:bg-emerald-950/40 border-b border-emerald-500/20 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold">Encrypted Cloud Sync:</span>
              <span>{syncToast.message}</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
              &rarr; Synced with {syncToast.device}
            </span>
          </div>
        )}

        {/* Task List: 3 Signature 1-2-3 Priority Sections (Responsive 3-Column Desktop Kanban or Stacked List) */}
        <div
          className={`p-4 sm:p-6 ${
            viewMode === 'columns' ? 'grid grid-cols-1 md:grid-cols-3 gap-6 items-start' : 'space-y-6'
          }`}
        >
          {priorityConfigs.map((config) => {
            const sectionTasks = tasks.filter((t) => t.priority === config.level);

            return (
              <div key={config.level} className="space-y-2.5">
                {/* Priority Section Header */}
                <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
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
                    <div className="py-4 px-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500">
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
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

        {/* In-Demo Task Edit Modal (Overlay over the demo card when editing) */}
        {editingTaskId && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
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

        {/* Bottom Conversion Bar: Direct to the REAL App */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-50 dark:bg-slate-950/90 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left flex-shrink-0">
          <div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Ready to organize your day for real?
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              Try the REAL 123ToDo App &bull; No sign-up &bull; No email &bull; Instant &amp; 100% Free
            </p>
          </div>

          <a
            href="https://app.123todo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:scale-[1.02] transition-all whitespace-nowrap cursor-pointer"
          >
            <span>Open Full App Free</span>
            <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
