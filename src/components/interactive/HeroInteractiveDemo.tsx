import React, { useState } from 'react';

type Priority = 1 | 2 | 3;

interface DemoTask {
  id: string;
  title: string;
  note?: string;
  priority: Priority;
  completed: boolean;
}

const INITIAL_DEMO_TASKS: DemoTask[] = [
  {
    id: 'demo-1',
    title: 'Send monthly project invoice to client (Acme Ltd)',
    note: 'Include updated hours breakdown and bank details.',
    priority: 1,
    completed: false,
  },
  {
    id: 'demo-2',
    title: 'Book car service & MOT before Friday',
    note: 'Garage opens at 8am; request courtesy car if available.',
    priority: 1,
    completed: false,
  },
  {
    id: 'demo-3',
    title: 'Reply to priority customer enquiry regarding delivery',
    note: 'Confirm dispatch tracking link and delivery window.',
    priority: 1,
    completed: true,
  },
  {
    id: 'demo-4',
    title: 'Pick up weekly groceries & pharmacy prescription',
    note: "Don't forget olive oil, fresh produce, and vitamins.",
    priority: 2,
    completed: false,
  },
  {
    id: 'demo-5',
    title: "Prepare agenda for tomorrow's supplier / team catch-up",
    note: '3 agenda items: project milestones, order quantities, summer schedule.',
    priority: 2,
    completed: false,
  },
  {
    id: 'demo-6',
    title: 'Review and approve website draft updates',
    note: 'Verify contact telephone, email links, and mobile layout.',
    priority: 2,
    completed: false,
  },
  {
    id: 'demo-7',
    title: 'Research ideas for weekend family day trip',
    note: 'Look into coastal walk routes or local country parks.',
    priority: 3,
    completed: false,
  },
  {
    id: 'demo-8',
    title: 'Organise computer desktop & clear downloads folder',
    note: 'Archive completed client receipts into tax folder.',
    priority: 3,
    completed: false,
  },
];

export default function HeroInteractiveDemo() {
  // Purely in-memory state: NO localStorage, NO cookies, NO server persistence
  const [tasks, setTasks] = useState<DemoTask[]>(INITIAL_DEMO_TASKS);
  const [activeFilter, setActiveFilter] = useState<'all' | Priority>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>(1);

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTaskTitle.trim();
    if (!trimmed) return;

    const newTask: DemoTask = {
      id: `demo-${Date.now()}`,
      title: trimmed,
      priority: newTaskPriority,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle('');
  };

  const resetDemo = () => {
    setTasks(INITIAL_DEMO_TASKS);
    setActiveFilter('all');
    setNewTaskTitle('');
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'all') return true;
    return task.priority === activeFilter;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getPriorityBadge = (p: Priority) => {
    switch (p) {
      case 1:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700 dark:bg-red-950/70 dark:text-red-300 border border-red-200 dark:border-red-800/80 flex-shrink-0">
            1 Must Do
          </span>
        );
      case 2:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 flex-shrink-0">
            2 Should Do
          </span>
        );
      case 3:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex-shrink-0">
            3 Could Do
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto text-left select-none">
      {/* Outer App Frame with subtle 3D shadow and glow */}
      <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-500/10">
        {/* Window Top Bar (macOS style window chrome) */}
        <div className="bg-slate-100/90 dark:bg-slate-950/80 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
            <span className="ml-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hidden sm:inline-flex items-center gap-1.5">
              <span>123 ToDo</span>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <span className="text-slate-500 dark:text-slate-400">Interactive Task Mode</span>
            </span>
          </div>

          {/* DEMO NOTICE BADGE */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>DEMO ONLY • In-Memory Sandbox (Zero storage)</span>
          </div>

          <button
            type="button"
            onClick={resetDemo}
            title="Reset to default demo tasks"
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-200/60 dark:hover:bg-slate-800 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Priority Filter Bar */}
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
              }`}
            >
              All ({tasks.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter(1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                activeFilter === 1
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
              P1 Must Do ({tasks.filter((t) => t.priority === 1).length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter(2)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                activeFilter === 2
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
              P2 Should Do ({tasks.filter((t) => t.priority === 2).length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter(3)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                activeFilter === 3
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-slate-400 inline-block"></span>
              P3 Could Do ({tasks.filter((t) => t.priority === 3).length})
            </button>
          </div>

          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span>
              {completedCount} of {totalCount} completed
            </span>
            <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Quick Add Task Input */}
        <form
          onSubmit={handleAddTask}
          className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-2 sm:gap-3"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add your own test task (e.g. Schedule team lunch or Review supplier quote)..."
              className="w-full pl-3 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(Number(e.target.value) as Priority)}
            aria-label="Task Priority"
            className="text-xs font-semibold py-2 px-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value={1}>P1 (Must Do)</option>
            <option value={2}>P2 (Should Do)</option>
            <option value={3}>P3 (Could Do)</option>
          </select>

          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1 cursor-pointer flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Add</span>
          </button>
        </form>

        {/* Task List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-[380px] overflow-y-auto">
          {filteredTasks.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
              No tasks found in this view.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`group px-4 py-3 sm:py-3.5 flex items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                  task.completed ? 'opacity-60 bg-slate-50/50 dark:bg-slate-900/40' : ''
                }`}
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  {/* Custom Checkbox */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTask(task.id);
                    }}
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

                  {/* Task Content */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs sm:text-sm font-medium leading-snug break-words transition-all ${
                        task.completed
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-800 dark:text-slate-100'
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
                </div>

                {/* Priority Badge & Delete */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {getPriorityBadge(task.priority)}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                    }}
                    title="Delete task from in-memory demo"
                    aria-label="Delete task"
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1 rounded transition-opacity cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {/* Demo Bottom Callout */}
        <div className="px-4 py-3.5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-blue-950/40 dark:to-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Like this clean, stress-free simplicity?
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
              No account, no password, no tracking. Opens instantly in your browser.
            </p>
          </div>

          <a
            href="https://app.123todo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:scale-[1.02] transition-all whitespace-nowrap cursor-pointer"
          >
            <span>Launch 123ToDo in Browser</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
