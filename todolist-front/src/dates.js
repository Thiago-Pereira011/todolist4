// As datas do backend chegam como 'YYYY-MM-DD'. Trabalhamos com strings
// para evitar problemas de fuso horário (new Date('2026-10-12') viraria dia 11).

export function todayISO() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function formatDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${d}/${m}/${y}`;
}

export function isOverdue(task) {
  return !task.completed && !!task.due_date && task.due_date.slice(0, 10) < todayISO();
}

// Data mais próxima primeiro; sem data vai para o fim; empate: mais recente primeiro.
export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (!a.due_date && b.due_date) return 1;
    if (a.due_date && !b.due_date) return -1;
    if (a.due_date && b.due_date && a.due_date !== b.due_date) {
      return a.due_date < b.due_date ? -1 : 1;
    }
    return (b.created_at || '').localeCompare(a.created_at || '');
  });
}
