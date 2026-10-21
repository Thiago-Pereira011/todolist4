import { formatDate, isOverdue } from '../dates.js';
import { CheckIcon, PencilIcon, TrashIcon } from './Icons.jsx';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const done = !!task.completed;
  const overdue = isOverdue(task);

  return (
    <li className={`task ${done ? 'task--done' : ''} ${overdue ? 'task--overdue' : ''}`}>
      <label className="check">
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggle(task)}
          aria-label={done ? `Reabrir "${task.title}"` : `Concluir "${task.title}"`}
        />
        <span className="check__box">
          <CheckIcon />
        </span>
      </label>

      <div className="task__body">
        <span className="task__title">{task.title}</span>
        {task.due_date && (
          <span className="task__meta">
            <time dateTime={task.due_date}>{formatDate(task.due_date)}</time>
            {overdue && <span className="badge">Em atraso</span>}
          </span>
        )}
      </div>

      <div className="task__actions">
        <button
          type="button"
          className="icon-btn"
          onClick={() => onEdit(task)}
          aria-label={`Editar "${task.title}"`}
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          className="icon-btn icon-btn--danger"
          onClick={() => onDelete(task)}
          aria-label={`Excluir "${task.title}"`}
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}
