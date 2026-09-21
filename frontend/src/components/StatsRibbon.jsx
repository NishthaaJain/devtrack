import React from 'react';
import { CheckCircle2, Clock, Layers, TrendingUp } from 'lucide-react';

export default function StatsRibbon({ issues }) {
  const total = issues.length;
  const pending = issues.filter(i => i.status === 'To Do' || i.status === 'In Progress').length;
  const completed = issues.filter(i => i.status === 'Done').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200/80 p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Issues */}
        <div className="flex items-center space-x-3.5 p-2 rounded-xl bg-slate-50/70 border border-slate-100">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Backlog</p>
            <p className="text-xl font-bold text-slate-900">{total}</p>
          </div>
        </div>

        {/* Pending */}
        <div className="flex items-center space-x-3.5 p-2 rounded-xl bg-slate-50/70 border border-slate-100">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">In Progress & To Do</p>
            <p className="text-xl font-bold text-amber-600">{pending}</p>
          </div>
        </div>

        {/* Completed */}
        <div className="flex items-center space-x-3.5 p-2 rounded-xl bg-slate-50/70 border border-slate-100">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Completed Tasks</p>
            <p className="text-xl font-bold text-emerald-600">{completed}</p>
          </div>
        </div>

        {/* Completion Bar */}
        <div className="flex flex-col justify-center p-2 rounded-xl bg-slate-50/70 border border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-1 text-indigo-500" /> Completion Rate
            </span>
            <span className="text-xs font-bold text-slate-800">{percentage}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
