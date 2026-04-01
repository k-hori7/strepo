export type ProjectStatus =
  | "in_progress"
  | "unpaid"
  | "action_required"
  | "completed";

export type Employee = {
  id: string;
  name: string;
  birthDate: string;
  completedAt?: string;
  isHighStress?: boolean;
  requestsInterview?: boolean;
};
