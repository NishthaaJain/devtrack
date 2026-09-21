import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsRibbon from './components/StatsRibbon';
import KanbanBoard from './components/KanbanBoard';
import AddIssueModal from './components/AddIssueModal';
import { getIssues, createIssue, updateIssueStatus, deleteIssue } from './api';
import { RefreshCw, Search, Filter, AlertTriangle } from 'lucide-react';

export default function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const loadIssues = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getIssues();
      setIssues(data);
    } catch (err) {
      console.error('Failed to fetch issues:', err);
      setError('Could not connect to DevTrack backend server. Please verify backend is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  // Handle Optimistic Move
  const handleMoveIssue = async (id, newStatus) => {
    const previousIssues = [...issues];

    // Optimistic update
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id ? { ...issue, status: newStatus } : issue
      )
    );

    try {
      await updateIssueStatus(id, newStatus);
    } catch (err) {
      console.error('Failed to update status:', err);
      // Rollback on error
      setIssues(previousIssues);
      alert('Failed to update issue status. Rolling back changes.');
    }
  };

  // Handle Optimistic Delete
  const handleDeleteIssue = async (id) => {
    const previousIssues = [...issues];

    // Optimistic update
    setIssues((prev) => prev.filter((issue) => issue.id !== id));

    try {
      await deleteIssue(id);
    } catch (err) {
      console.error('Failed to delete issue:', err);
      // Rollback on error
      setIssues(previousIssues);
      alert('Failed to delete issue. Rolling back changes.');
    }
  };

  // Handle Add Issue
  const handleCreateIssue = async (newIssueData) => {
    const created = await createIssue(newIssueData);
    setIssues((prev) => [created, ...prev]);
  };

  // Filtered issues
  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (issue.description && issue.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (issue.assignee && issue.assignee.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPriority =
      priorityFilter === 'All' || issue.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="min-h-screen flex flex-col pb-12">
      {/* Header */}
      <Header
        totalIssues={issues.length}
        onOpenModal={() => setIsModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Statistics Ribbon */}
        <StatsRibbon issues={issues} />

        {/* Filter & Action Controls Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search issues by title, description, assignee..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
              />
            </div>

            {/* Filter Dropdown & Refresh */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-600">
                <Filter className="w-4 h-4 text-slate-400" />
                <span>Priority:</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="All">All Priorities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <button
                onClick={loadIssues}
                title="Reload Issues"
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Error Alert if Any */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium flex items-center justify-between shadow-xs">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                onClick={loadIssues}
                className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700 transition-colors"
              >
                Retry Connection
              </button>
            </div>
          </div>
        )}

        {/* Kanban Board Container */}
        {loading && issues.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 flex flex-col items-center justify-center text-slate-400 space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
            <p className="text-sm font-semibold text-slate-600">Connecting to DevTrack backend...</p>
          </div>
        ) : (
          <KanbanBoard
            issues={filteredIssues}
            onMove={handleMoveIssue}
            onDelete={handleDeleteIssue}
          />
        )}
      </main>

      {/* Add Issue Modal */}
      <AddIssueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateIssue}
      />
    </div>
  );
}
