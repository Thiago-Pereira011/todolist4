import { useEffect, useRef, useState } from 'react';

// Serve para "Create Task" (task = null) e "Edit Task" (task = tarefa existente).
export default function TaskModal({ task, onClose, onSubmit }) {
  const isEdit = !!task;
  const [title, setTitle] = useState(task?.title ?? '');
  const [dueDate, setDueDate] = useState(task?.due_date?.slice(0, 10) ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Enter a task name.');
      inputRef.current?.focus();
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSubmit({ title: title.trim(), dueDate: dueDate || null });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 id="modal-title">{isEdit ? 'Edit Task' : 'Create Task'}</h2>

        <div className="field">
          <label htmlFor="task-title">Task name</label>
          <input
            id="task-title"
            ref={inputRef}
            type="text"
            value={title}
            maxLength={255}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={!!error}
          />
        </div>

        <div className="field">
          <label htmlFor="task-date">Due date (optional)</label>
          <input
            id="task-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <p className="form-error" role="alert">
          {error}
        </p>

        <div className="modal__actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {isEdit ? 'Save' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
