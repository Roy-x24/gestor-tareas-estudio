import { useMemo, useState } from "react";
import { GraduationCap, Inbox } from "lucide-react";
import type { Task, Priority, Status } from "@/types";
import { useTasks } from "@/hooks/useTasks";
import { TaskForm } from "@/components/TaskForm";
import { TaskBoard } from "@/components/TaskBoard";
import { Toolbar } from "@/components/Toolbar";
import { StatsBar } from "@/components/StatsBar";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, deleteCompletedTasks } =
    useTasks();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "Todas">("Todas");
  const [filterPriority, setFilterPriority] = useState<Priority | "Todas">(
    "Todas"
  );

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const completedCount = tasks.filter((t) => t.status === "Terminada").length;

  const filteredTasks = useMemo(() => {
    const term = search.trim().toLowerCase();
    return tasks.filter((t) => {
      if (filterStatus !== "Todas" && t.status !== filterStatus) return false;
      if (filterPriority !== "Todas" && t.priority !== filterPriority)
        return false;
      if (term) {
        const inTitle = t.title.toLowerCase().includes(term);
        const inDesc = t.description.toLowerCase().includes(term);
        if (!inTitle && !inDesc) return false;
      }
      return true;
    });
  }, [tasks, search, filterStatus, filterPriority]);

  const openNewForm = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const openEditForm = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleSave = (data: Omit<Task, "id" | "createdAt">) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
    setFormOpen(false);
    setEditingTask(null);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  const handleClearCompleted = () => {
    deleteCompletedTasks();
    setConfirmOpen(false);
  };

  const hasFilters =
    search.trim() !== "" ||
    filterStatus !== "Todas" ||
    filterPriority !== "Todas";

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <GraduationCap size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
                Gestor de Tareas de Estudio
              </h1>
              <p className="text-xs text-slate-500">
                Organiza tus tareas universitarias
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <StatsBar tasks={tasks} />

        <div className="mt-6">
          <Toolbar
          search={search}
          onSearchChange={setSearch}
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
          filterPriority={filterPriority}
          onFilterPriorityChange={setFilterPriority}
          onNewTask={openNewForm}
          onClearCompleted={() => setConfirmOpen(true)}
          completedCount={completedCount}
          totalTasks={tasks.length}
          filteredCount={filteredTasks.length}
        />

        <div className="mt-6">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white py-20 text-center">
              <Inbox size={48} className="mb-4 text-slate-300" />
              <h3 className="text-lg font-semibold text-slate-700">
                No tienes tareas todavía
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Crea tu primera tarea para empezar a organizar tu estudio.
              </p>
              <button
                onClick={openNewForm}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
              >
                Crear primera tarea
              </button>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white py-16 text-center">
              <p className="text-sm font-medium text-slate-600">
                No hay tareas que coincidan con tu búsqueda o filtros.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setFilterStatus("Todas");
                  setFilterPriority("Todas");
                }}
                className="mt-3 text-sm font-medium text-blue-600 hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <TaskBoard
              tasks={filteredTasks}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          )}
        </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 py-8 text-center sm:px-6">
        <p className="text-xs text-slate-400">
          Las tareas se guardan en tu navegador.
        </p>
      </footer>

      {/* Confirmación limpiar terminadas */}
      {confirmOpen && (
        <ConfirmDialog
          title="Limpiar tareas terminadas"
          message={`Se eliminarán ${completedCount} ${completedCount === 1 ? "tarea terminada" : "tareas terminadas"}. Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          onConfirm={handleClearCompleted}
          onClose={() => setConfirmOpen(false)}
        />
      )}

      {/* Modal */}
      {formOpen && (
        <TaskForm
          task={editingTask}
          onSave={handleSave}
          onClose={() => {
            setFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
