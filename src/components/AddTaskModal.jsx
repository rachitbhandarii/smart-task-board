import React, {useState} from "react";

const AddTaskModal = ({isOpen, onClose, onAdd}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd({ 
      title, 
      content,
      deadline: deadline ? new Date(deadline).toISOString() : null 
    });
    setTitle("");
    setContent("");
    setDeadline("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-black mb-4">Add New Task</h2>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label className="block text-black/70 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-black/20 rounded focus:outline-none focus:border-violet-700 focus:ring-1 focus:ring-violet-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-black/70 mb-2">Content (Optional)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-black/20 rounded focus:outline-none focus:border-violet-700 focus:ring-1 focus:ring-violet-700"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black/70 mb-2">Deadline (Optional)</label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3 py-2 border border-black/20 rounded focus:outline-none focus:border-violet-700 focus:ring-1 focus:ring-violet-700"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-black/70 text-red-600 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-black/70 text-violet-600 font-medium transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal; 