const API_URL = 'http://smart-task-board-production.up.railway.app';

export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks.');
  }
  return response.json();
};

export const createTask = async (title, content, deadline = null) => {
  const params = new URLSearchParams();
  params.append('title', title);
  if (content) {
    params.append('content', content);
  }
  if (deadline) {
    params.append('deadline', deadline);
  }
  
  const response = await fetch(`${API_URL}/tasks?${params.toString()}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to create task.');
  }
  return response.json();
};

export const updateTaskStatus = async (taskId, status, title = null, content = null, deadline = null) => {
  const params = new URLSearchParams();
  params.append('status', status);
  if (title !== null) {
    params.append('title', title);
  }
  if (content !== null) {
    params.append('content', content);
  }
  if (deadline !== null) {
    params.append('deadline', deadline);
  }
  
  const response = await fetch(`${API_URL}/tasks/${taskId}?${params.toString()}`, {
    method: 'PUT',
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  return response.json();
}; 