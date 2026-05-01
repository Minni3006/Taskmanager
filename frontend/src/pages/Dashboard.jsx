import { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import StatsBar from '../components/StatsBar';
import { useTasks } from '../hooks/useTasks';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { tasks, loading, error, addTask, editTask, removeTask, toggleStatus } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = async (data) => {
    await addTask(data);
    setShowForm(false);
  };

  const handleEdit = async (data) => {
    await editTask(editingTask._id, data);
    setEditingTask(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await removeTask(id);
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Tasks</h1>
            <p className="text-slate-500 text-sm mt-0.5">Manage and track your work</p>
          </div>
          <button
            onClick={() => { setShowForm((p) => !p); setEditingTask(null); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">New Task</span>
          </button>
        </div>

        {/* Stats */}
        <StatsBar tasks={tasks} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar: Add/Edit Form */}
          <div className="lg:col-span-1">
            {editingTask ? (
              <TaskForm
                editTask={editingTask}
                onSubmit={handleEdit}
                onCancel={() => setEditingTask(null)}
              />
            ) : showForm ? (
              <TaskForm
                onSubmit={handleAdd}
                onCancel={() => setShowForm(false)}
              />
            ) : (
              <div
                onClick={() => setShowForm(true)}
                className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-slate-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                  <svg className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-500 group-hover:text-blue-600 transition-colors">Add a new task</p>
              </div>
            )}
          </div>

          {/* Main: Task List */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
                {error}
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                onToggle={toggleStatus}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
