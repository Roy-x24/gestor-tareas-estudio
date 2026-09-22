export type Priority = "Alta" | "Media" | "Baja";
export type Status = "Pendiente" | "En progreso" | "Terminada";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  deadline: string; // ISO date string (YYYY-MM-DD)
  createdAt: string;
}

export const PRIORITIES: Priority[] = ["Alta", "Media", "Baja"];
export const STATUSES: Status[] = ["Pendiente", "En progreso", "Terminada"];
