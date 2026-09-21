import React from 'react';
import { Kanban, Plus, Sparkles } from 'lucide-react';

export default function Header({ totalIssues, onOpenModal }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Kanban className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">DevTrack</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xs">
                <Sparkles className="w-3 h-3 mr-1" /> Agile v1.0
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Issue Tracker & Team Task Board</p>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="font-semibold text-slate-700 mr-1">{totalIssues}</span> Total Active Issues
          </div>

          <button
            onClick={onOpenModal}
            className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/20 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Issue</span>
          </button>
        </div>
      </div>
    </header>
  );
}
