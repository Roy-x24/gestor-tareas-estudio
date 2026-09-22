import { Search, Plus, Filter, Trash2, ArrowDownUp } from "lucide-react";
import type { Priority, Status } from "@/types";
import { PRIORITIES, STATUSES } from "@/types";

interface ToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filterStatus: Status | "Todas";
  onFilterStatusChange: (value: Status | "Todas") => void;
  filterPriority: Priority | "Todas";
  onFilterPriorityChange: (value: Priority | "Todas") => void;
  sortByDeadline: boolean;
  onSortByDeadlineChange: (value: boolean) => void;
  onNewTask: () => void;
  onClearCompleted: () => void;
  completedCount: number;
  totalTasks: number;
  filteredCount: number;
}

export function Toolbar({
  search,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  filterPriority,
  onFilterPriorityChange,
  sortByDeadline,
  onSortByDeadlineChange,
  onNewTask,
  onClearCompleted,
  completedCount,
  totalTasks,
  filteredCount,
}: ToolbarProps) {
  const selectClass =
    "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por título o descripción..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          onClick={onNewTask}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
        >
          <Plus size={18} />
          Nueva tarea
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <span className="text-sm text-slate-500">Filtros:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={filterStatus}
            onChange={(e) =>
              onFilterStatusChange(e.target.value as Status | "Todas")
            }
            className={selectClass}
          >
            <option value="Todas">Todos los estados</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={filterPriority}
            onChange={(e) =>
              onFilterPriorityChange(e.target.value as Priority | "Todas")
            }
            className={selectClass}
          >
            <option value="Todas">Todas las prioridades</option>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 sm:ml-2">
          <ArrowDownUp size={16} className="text-slate-400" />
          <label htmlFor="sort-order" className="sr-only">
            Ordenar tareas
          </label>
          <select
            id="sort-order"
            value={sortByDeadline ? "deadline" : "default"}
            onChange={(e) => onSortByDeadlineChange(e.target.value === "deadline")}
            className={selectClass}
          >
            <option value="default">Orden original</option>
            <option value="deadline">Fecha límite (más cercana)</option>
          </select>
        </div>

        {totalTasks > 0 && (
          <span className="text-sm text-slate-400 sm:ml-auto">
            {filteredCount} de {totalTasks} tareas
          </span>
        )}
      </div>

      {completedCount > 0 && (
        <div className="flex justify-end">
          <button
            onClick={onClearCompleted}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100 active:scale-95"
          >
            <Trash2 size={15} />
            Limpiar tareas terminadas ({completedCount})
          </button>
        </div>
      )}
    </div>
  );
}
