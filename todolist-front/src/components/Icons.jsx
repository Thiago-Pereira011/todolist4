const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const SearchIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const PencilIcon = (p) => (
  <svg viewBox="0 0 24 24" width="17" height="17" {...base} {...p}>
    <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4z" />
    <path d="M13.5 6.5l4 4" />
  </svg>
);

export const TrashIcon = (p) => (
  <svg viewBox="0 0 24 24" width="17" height="17" {...base} {...p}>
    <path d="M4 7h16" />
    <path d="M9 7V4h6v3" />
    <path d="M6 7l1 13h10l1-13" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" {...base} strokeWidth={3} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

export const PlusIcon = (p) => (
  <svg viewBox="0 0 24 24" width="28" height="28" {...base} strokeWidth={2} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const DocumentIcon = (p) => (
  <svg viewBox="0 0 64 80" width="64" height="80" {...base} strokeWidth={2} {...p}>
    <rect x="3" y="3" width="58" height="74" rx="9" />
    <path d="M16 24h32M16 40h32M16 56h14" />
  </svg>
);
