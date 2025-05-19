import React, {useState} from 'react';
import {Dialog} from '@headlessui/react';

const TaskDetailModal = ({isOpen, onClose, task, onDelete, onUpdate}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const save = async () => {
    if (!editedTask.title.trim()) return;
    try {
      await onUpdate(editedTask);
      setIsEditing(false);
      onClose();
    } catch(error) {
      console.error('Failed to update task:', error);
    }
  };

  const remove = async () => {
    try {
      await onDelete();
      onClose();
    } catch(error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <Dialog.Title className="text-2xl font-semibold text-gray-900">
              {isEditing ? 'Edit Task' : 'Task Details'}
            </Dialog.Title>
            <div className="flex gap-2">
              {!isEditing && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm font-medium text-violet-600 hover:text-violet-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={remove}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                    required
                  />
                  {!editedTask.title.trim() && (
                    <p className="mt-1 text-sm text-red-600">Title is required *</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    value={editedTask.content || ''}
                    onChange={(e) => setEditedTask({ ...editedTask, content: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Deadline</label>
                  <input
                    type="datetime-local"
                    value={editedTask.deadline ? new Date(editedTask.deadline).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setEditedTask({ ...editedTask, deadline: e.target.value ? new Date(e.target.value).toISOString() : null })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedTask(task);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={save}
                    disabled={!editedTask.title.trim()}
                    className={`px-4 py-2 text-sm font-medium text-violet-600 hover:text-violet-800 ${
                      !editedTask.title.trim() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Save Changes
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 whitespace-pre-wrap break-words">{task.title}</h3>
                  {task.content && (
                    <p className="mt-2 text-gray-600 whitespace-pre-wrap break-words">{task.content}</p>
                  )}
                  {task.deadline && (
                    <p className="mt-2 text-sm text-gray-500">
                      Deadline: {new Date(task.deadline).toLocaleString()}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TaskDetailModal; 