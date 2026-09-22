import { Pencil, Trash2, Calendar, Flag } from "lucide-react";
import type { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const priorityStyles: Record<
  string,
  { badge: string; bar: string }
> = {
  Alta: {
    badge: "bg-red-100 text-red-800 border-red-300",
    bar: "bg-red-500",
  },
  Media: {
    badge: "bg-amber-100 text-amber-800 border-amber-300",
    bar: "bg-amber-400",
  },
  Baja: {
    badge: "bg-emerald-100 text-emerald-800 border-emerald-300",
    bar: "bg-emerald-500",
  },
};

function getDeadlineInfo(deadline: string): {
  label: string;
  className: string;
} | null {
  if (!deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(deadline + "T00:00:00");
  const diffDays = Math.round(
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const formatted = due.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });

  if (diffDays < 0) {
    return {
      label: `Vencida · ${formatted}`,
      className: "text-red-600",
    };
  }
  if (diffDays === 0) {
    return { label: "Vence hoy", className: "text-orange-600" };
  }
  if (diffDays <= 3) {
    return {
      label: `En ${diffDays}d · ${formatted}`,
      className: "text-amber-600",
    };
  }
  return { label: formatted, className: "text-slate-500" };
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const deadlineInfo = getDeadlineInfo(task.deadline);

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className={`absolute left-0 top-0 h-full w-1.5 ${priorityStyles[task.priority].bar}`} />
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug text-slate-800">
          {task.title}
        </h3>
        <div className="flex shrink-0 gap-1 opacity-0 transition group-hover:opacity-100">
          <button
            onClick={onEdit}
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"
            aria-label="Editar"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={onDelete}
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            aria-label="Eliminar"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="mb-3 text-sm leading-relaxed text-slate-500 line-clamp-3">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${priorityStyles[task.priority].badge}`}
        >
          <Flag size={11} />
          {task.priority}
        </span>
        {deadlineInfo && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium ${deadlineInfo.className}`}
          >
            <Calendar size={12} />
            {deadlineInfo.label}
          </span>
        )}
      </div>
    </div>
  );
}
