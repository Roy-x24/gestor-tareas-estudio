import { ClipboardList, Clock, Loader, CheckCircle2 } from "lucide-react";
import type { Task } from "@/types";

interface StatsBarProps {
  tasks: Task[];
}

export function StatsBar({ tasks }: StatsBarProps) {
  const total = tasks.length;
  const pendientes = tasks.filter((t) => t.status === "Pendiente").length;
  const enProgreso = tasks.filter((t) => t.status === "En progreso").length;
  const terminadas = tasks.filter((t) => t.status === "Terminada").length;

  const items = [
    {
      label: "Total",
      value: total,
      icon: ClipboardList,
      bg: "bg-blue-50",
      text: "text-blue-700",
      iconColor: "text-blue-500",
    },
    {
      label: "Pendientes",
      value: pendientes,
      icon: Clock,
      bg: "bg-slate-50",
      text: "text-slate-700",
      iconColor: "text-slate-400",
    },
    {
      label: "En progreso",
      value: enProgreso,
      icon: Loader,
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      iconColor: "text-indigo-500",
    },
    {
      label: "Terminadas",
      value: terminadas,
      icon: CheckCircle2,
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      iconColor: "text-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`flex items-center gap-3 rounded-xl border border-slate-200 ${item.bg} px-4 py-3`}
          >
            <Icon size={22} className={item.iconColor} />
            <div className="min-w-0">
              <p className={`text-xl font-bold leading-none ${item.text}`}>
                {item.value}
              </p>
              <p className="mt-1 truncate text-xs text-slate-500">
                {item.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
