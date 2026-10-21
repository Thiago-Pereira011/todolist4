// URL base do backend. Configure em .env (VITE_API_URL).
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3333').replace(/\/$/, '');

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new Error('Não foi possível conectar ao servidor.');
  }

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || `Erro inesperado (${res.status}).`);
  }
  return data;
}

// GET /api/tasks?search=  ->  { tasks, total, completed }
export function listTasks(search = '', signal) {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return request(`/api/tasks${query}`, { signal });
}

// POST /api/tasks { title, dueDate? }
export function createTask({ title, dueDate }) {
  return request('/api/tasks', {
    method: 'POST',
    body: JSON.stringify({ title, dueDate: dueDate || null }),
  });
}

// PATCH /api/tasks/:id { completed?, title?, dueDate? }
export function updateTask(id, changes) {
  return request(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(changes),
  });
}

// DELETE /api/tasks/:id
export function deleteTask(id) {
  return request(`/api/tasks/${id}`, { method: 'DELETE' });
}
