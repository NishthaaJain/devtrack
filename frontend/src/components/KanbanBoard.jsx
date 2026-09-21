import React from 'react';
import IssueColumn from './IssueColumn';

const COLUMNS = ['To Do', 'In Progress', 'Done'];

export default function KanbanBoard({ issues, onMove, onDelete }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLUMNS.map((columnTitle) => {
          const columnIssues = issues.filter(
            (issue) => issue.status === columnTitle
          );
          return (
            <IssueColumn
              key={columnTitle}
              title={columnTitle}
              issues={columnIssues}
              onMove={onMove}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}
