import React from 'react';
import IssueCard from './IssueCard';
import { Circle, Clock, CheckCircle2 } from 'lucide-react';

const columnConfigs = {
  'To Do': {
    bg: 'bg-slate-100/80 border-slate-200/60',
    titleColor: 'text-slate-700',
    badge: 'bg-indigo-100 text-indigo-700',
    icon: Circle,
    iconColor: 'text-indigo-500',
  },
  'In Progress': {
    bg: 'bg-amber-50/60 border-amber-200/60',
    titleColor: 'text-amber-800',
    badge: 'bg-amber-100 text-amber-700',
    icon: Clock,
    iconColor: 'text-amber-500',
  },
  'Done': {
    bg: 'bg-emerald-50/60 border-emerald-200/60',
    titleColor: 'text-emerald-800',
    badge: 'bg-emerald-100 text-emerald-700',
    icon: CheckCircle2,
    iconColor: 'text-emerald-500',
  },
};

export default function IssueColumn({ title, issues, onMove, onDelete }) {
  const config = columnConfigs[title] || columnConfigs['To Do'];
  const StatusIcon = config.icon;

  return (
    <div className={`rounded-2xl border ${config.bg} p-4 flex flex-col h-full min-h-[500px]`}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center space-x-2">
          <StatusIcon className={`w-4 h-4 ${config.iconColor}`} />
          <h2 className={`font-bold text-base ${config.titleColor}`}>{title}</h2>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${config.badge}`}>
          {issues.length}
        </span>
      </div>

      {/* Cards List */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-0.5">
        {issues.length === 0 ? (
          <div className="h-36 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-xs text-slate-400 font-medium">
            No issues in {title}
          </div>
        ) : (
          issues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onMove={onMove}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
