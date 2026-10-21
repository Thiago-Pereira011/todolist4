import { useCallback, useEffect, useRef, useState } from 'react';
import { createTask, deleteTask, listTasks, updateTask } from './api.js';
import { sortTasks } from './dates.js';
import { useDebounce } from './hooks/useDebounce.js';
import TaskItem from './components/TaskItem.jsx';
import TaskModal from './components/TaskModal.jsx';
import { DocumentIcon, PlusIcon, SearchIcon } from './components/Icons.jsx';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [counts, setCounts] = useState({ total: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchInput, setSearchInput] = useState('');
  const search = useDebounce(searchInput.trim(), 400); // só busca após parar de digitar

  const [modal, setModal] = useState({ open: false, task: null });
  const firstLoad = useRef(true);

  const load = useCallback(async (term, signal) => {
    try {
      const data = await listTasks(term, signal);
      setTasks(sortTasks(data.tasks));
      setCounts({ total: data.total, completed: data.completed });
      setError('');
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  // Carrega (e recarrega a cada busca com debounce). Cancela requisições antigas.
  useEffect(() => {
    const controller = new AbortController();
    if (!firstLoad.current) setError('');
    firstLoad.current = false;
    load(search, controller.signal);
    return () => controller.abort();
  }, [search, load]);

  async function handleSubmit({ title, dueDate }) {
    if (modal.task) {
      await updateTask(modal.task.id, { title, dueDate });
    } else {
      await createTask({ title, dueDate });
    }
    setModal({ open: false, task: null });
    await load(search);
  }

  async function handleToggle(task) {
    const completed = !task.completed;
    // Atualização otimista: a interface responde na hora.
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, completed: completed ? 1 : 0 } : t)));
    setCounts((c) => ({ ...c, completed: c.completed + (completed ? 1 : -1) }));
    try {
      await updateTask(task.id, { completed });
    } catch (err) {
      setError(err.message);
      load(search);
    }
  }

  async function handleDelete(task) {
    try {
      await deleteTask(task.id);
      await load(search);
    } catch (err) {
      setError(err.message);
    }
  }

  const closeModal = useCallback(() => setModal({ open: false, task: null }), []);
  const isSearching = search.length > 0;

  return (
    <main className="app">
      <header className="app__header">
        <h1 className="logo">
          to<span>do.</span>
        </h1>
        <label className="search">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search tasks"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Search tasks"
          />
        </label>
      </header>

      <div className="counters" aria-live="polite">
        <span>
          Tasks <strong>{counts.total}</strong>
        </span>
        <span>
          Done <strong>{counts.completed}</strong>
        </span>
      </div>

      {error && (
        <div className="alert" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => setError('')} aria-label="Fechar aviso">
            ×
          </button>
        </div>
      )}

      {loading ? (
        <p className="state state--loading">Loading…</p>
      ) : tasks.length === 0 ? (
        <div className="state">
          <DocumentIcon />
          <p>{isSearching ? 'No tasks match your search.' : 'You have no pending tasks.'}</p>
        </div>
      ) : (
        <ul className="list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onEdit={(t) => setModal({ open: true, task: t })}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      <button
        type="button"
        className="fab"
        onClick={() => setModal({ open: true, task: null })}
        aria-label="Create task"
      >
        <PlusIcon />
      </button>

      {modal.open && <TaskModal task={modal.task} onClose={closeModal} onSubmit={handleSubmit} />}
    </main>
  );
}
