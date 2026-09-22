import type { Task, Status } from "@/types";
import { STATUSES } from "@/types";
import { TaskCard } from "./TaskCard";

interface TaskBoardProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const statusConfig: Record<
  Status,
  { label: string; dot: string; header: string }
> = {
  Pendiente: {
    label: "Pendiente",
    dot: "bg-slate-400",
    header: "text-slate-700",
  },
  "En progreso": {
    label: "En progreso",
    dot: "bg-blue-500",
    header: "text-blue-700",
  },
  Terminada: {
    label: "Terminada",
    dot: "bg-emerald-500",
    header: "text-emerald-700",
  },
};

export function TaskBoard({ tasks, onEdit, onDelete }: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {STATUSES.map((status) => {
        const config = statusConfig[status];
        const columnTasks = tasks.filter((t) => t.status === status);

        return (
          <div key={status} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <span className={`h-2.5 w-2.5 rounded-full ${config.dot}`} />
              <h2 className={`text-sm font-semibold ${config.header}`}>
                {config.label}
              </h2>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                {columnTasks.length}
              </span>
            </div>

            <div className="flex min-h-[120px] flex-col gap-3 rounded-2xl bg-slate-50 p-3">
              {columnTasks.length === 0 ? (
                <div className="flex flex-1 items-center justify-center py-8 text-center text-sm text-slate-400">
                  Sin tareas
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => onEdit(task)}
                    onDelete={() => onDelete(task.id)}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
