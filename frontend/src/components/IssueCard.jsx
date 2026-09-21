import React from 'react';
import { ArrowLeft, ArrowRight, Trash2, User, Clock, AlertOctagon, AlertCircle, Info, ShieldAlert } from 'lucide-react';

const priorityStyles = {
  Critical: {
    badge: 'bg-rose-50 text-rose-700 border border-rose-200',
    icon: ShieldAlert,
  },
  High: {
    badge: 'bg-amber-50 text-amber-700 border border-amber-200',
    icon: AlertOctagon,
  },
  Medium: {
    badge: 'bg-blue-50 text-blue-700 border border-blue-200',
    icon: AlertCircle,
  },
  Low: {
    badge: 'bg-slate-50 text-slate-600 border border-slate-200',
    icon: Info,
  },
};

const statusFlow = ['To Do', 'In Progress', 'Done'];

export default function IssueCard({ issue, onMove, onDelete }) {
  const priorityInfo = priorityStyles[issue.priority] || priorityStyles.Medium;
  const PriorityIcon = priorityInfo.icon;

  const currentIdx = statusFlow.indexOf(issue.status);
  const prevStatus = currentIdx > 0 ? statusFlow[currentIdx - 1] : null;
  const nextStatus = currentIdx < statusFlow.length - 1 ? statusFlow[currentIdx + 1] : null;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col justify-between">
      <div>
        {/* Top Header Row: Priority Badge & Created Date */}
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${priorityInfo.badge}`}>
            <PriorityIcon className="w-3 h-3 mr-1" />
            <span>{issue.priority}</span>
          </span>
          <span className="text-[11px] font-medium text-slate-400 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {formatDate(issue.created_at)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1.5 group-hover:text-indigo-600 transition-colors">
          {issue.title}
        </h3>

        {/* Description Snippet */}
        {issue.description && (
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {issue.description}
          </p>
        )}
      </div>

      {/* Card Footer: Assignee & Action Buttons */}
      <div className="pt-3 mt-1 border-t border-slate-100 flex items-center justify-between">
        {/* Assignee Avatar / Tag */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-600">
          <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[10px]">
            {issue.assignee ? issue.assignee.substring(0, 2).toUpperCase() : 'UN'}
          </div>
          <span className="font-medium text-slate-700 truncate max-w-[110px]">
            {issue.assignee || 'Unassigned'}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1">
          {prevStatus && (
            <button
              onClick={() => onMove(issue.id, prevStatus)}
              title={`Move back to ${prevStatus}`}
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          {nextStatus && (
            <button
              onClick={() => onMove(issue.id, nextStatus)}
              title={`Move to ${nextStatus}`}
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => onDelete(issue.id)}
            title="Delete Issue"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
