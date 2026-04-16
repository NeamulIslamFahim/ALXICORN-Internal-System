import React from "react";

function SvgIcon({ children, size = 18, strokeWidth = 1.9, className = "", ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props) {
  return (
    <SvgIcon {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </SvgIcon>
  );
}

export function BellIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M15 18H6.5a1.5 1.5 0 0 1-1.2-2.4L7 13.5V10a5 5 0 1 1 10 0v3.5l1.7 2.1A1.5 1.5 0 0 1 17.5 18H15" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </SvgIcon>
  );
}

export function SettingsIcon(props) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="3.25" />
      <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7.5 7.5 0 0 0-2-1.2l-.4-2.5H10l-.4 2.5a7.5 7.5 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7.5 7.5 0 0 0 2 1.2l.4 2.5h4l.4-2.5a7.5 7.5 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z" />
    </SvgIcon>
  );
}

export function UserCircleIcon(props) {
  return (
    <SvgIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="9" r="3" />
      <path d="M6.5 18a6.5 6.5 0 0 1 11 0" />
    </SvgIcon>
  );
}

export function UsersIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M16.5 18a4.5 4.5 0 0 0-9 0" />
      <circle cx="12" cy="9" r="3" />
      <path d="M19.5 17a3.5 3.5 0 0 0-3-3.5" />
      <path d="M16.5 6.5a2.5 2.5 0 1 1 0 5" />
    </SvgIcon>
  );
}

export function BriefcaseIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect x="3.5" y="7" width="17" height="11.5" rx="2" />
      <path d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7" />
      <path d="M3.5 11.5h17" />
    </SvgIcon>
  );
}

export function SparklesIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 4l1.4 3.6L17 9l-3.6 1.4L12 14l-1.4-3.6L7 9l3.6-1.4L12 4Z" />
      <path d="M18.5 4.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4Z" />
      <path d="M6 14.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
    </SvgIcon>
  );
}

export function CalendarIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
      <path d="M7.5 3.5v4" />
      <path d="M16.5 3.5v4" />
      <path d="M3.5 9.5h17" />
    </SvgIcon>
  );
}

export function FileTextIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M8 3.5h6l4 4V20a.5.5 0 0 1-.5.5h-9A2.5 2.5 0 0 1 6 18V5.5A2 2 0 0 1 8 3.5Z" />
      <path d="M14 3.5v4h4" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </SvgIcon>
  );
}

export function NotebookIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M9 3.5v17" />
      <path d="M12 8.5h4" />
      <path d="M12 12h4" />
      <path d="M12 15.5h4" />
    </SvgIcon>
  );
}

export function PalmIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 20c3.4 0 6-2.7 6-6v-2.5a1.5 1.5 0 0 0-3 0V13" />
      <path d="M15 13V8.5a1.5 1.5 0 0 0-3 0V13" />
      <path d="M12 13V7.5a1.5 1.5 0 0 0-3 0V14" />
      <path d="M9 14V9.5a1.5 1.5 0 0 0-3 0v4L5 12" />
    </SvgIcon>
  );
}

export function BookOpenIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v16h5.5A2.5 2.5 0 0 1 20 21V5.5Z" />
    </SvgIcon>
  );
}

export function ArrowUpDownIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M8 4v14" />
      <path d="M5 7l3-3 3 3" />
      <path d="M16 20V6" />
      <path d="M13 17l3 3 3-3" />
    </SvgIcon>
  );
}

export function DownloadIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 4v10" />
      <path d="M8.5 10.5 12 14l3.5-3.5" />
      <path d="M5 19h14" />
    </SvgIcon>
  );
}

export function PlusIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </SvgIcon>
  );
}

export function EditIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="m14 5 5 5" />
      <path d="M4 20l4.5-1 9-9a2.1 2.1 0 0 0-3-3l-9 9L4 20Z" />
    </SvgIcon>
  );
}

export function TrashIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M4.5 7.5h15" />
      <path d="M9.5 3.5h5" />
      <path d="M7 7.5l.8 11a2 2 0 0 0 2 1.8h4.4a2 2 0 0 0 2-1.8l.8-11" />
      <path d="M10 11v5.5" />
      <path d="M14 11v5.5" />
    </SvgIcon>
  );
}

export function PowerIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 3.5v7" />
      <path d="M7.2 6.2a7 7 0 1 0 9.6 0" />
    </SvgIcon>
  );
}
