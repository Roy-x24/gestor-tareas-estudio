import { useEffect, useRef, useState } from "react";
import { X, AlertCircle } from "lucide-react";
import type { Task, Priority, Status } from "@/types";
import { PRIORITIES, STATUSES } from "@/types";

interface TaskFormProps {
  task: Task | null;
  onSave: (data: Omit<Task, "id" | "createdAt">) => void;
  onClose: () => void;
}

const emptyForm = {
  title: "",
  description: "",
  priority: "Media" as Priority,
  status: "Pendiente" as Status,
  deadline: "",
};

export function TaskForm({ task, onSave, onClose }: TaskFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        deadline: task.deadline,
      });
    } else {
      setForm(emptyForm);
    }
    setError("");
  }, [task]);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = form.title.trim();
    if (!trimmedTitle) {
      setError("El título es obligatorio. No se puede guardar la tarea sin un título.");
      titleRef.current?.focus();
      return;
    }
    onSave({
      title: trimmedTitle,
      description: form.description.trim(),
      priority: form.priority,
      status: form.status,
      deadline: form.deadline,
    });
  };

  const fieldClass =
    "w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const labelClass = "mb-1 block text-xs font-medium text-slate-600";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <h2 className="text-base font-semibold text-slate-800">
            {task ? "Editar tarea" : "Nueva tarea"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 px-5 py-4">
          {error && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="title" className={labelClass}>
              Título <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              ref={titleRef}
              type="text"
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });
                if (error) setError("");
              }}
              placeholder="Ej: Repasar cálculo para el examen"
              className={fieldClass}
              maxLength={120}
            />
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              Descripción
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Detalles de la tarea..."
              rows={2}
              className={`${fieldClass} resize-none`}
              maxLength={500}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label htmlFor="priority" className={labelClass}>
                Prioridad
              </label>
              <select
                id="priority"
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value as Priority })
                }
                className={fieldClass}
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" className={labelClass}>
                Estado
              </label>
              <select
                id="status"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as Status })
                }
                className={fieldClass}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="deadline" className={labelClass}>
                Fecha límite
              </label>
              <input
                id="deadline"
                type="date"
                value={form.deadline}
                onChange={(e) =>
                  setForm({ ...form, deadline: e.target.value })
              }
                className={fieldClass}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
            >
              {task ? "Guardar cambios" : "Crear tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
