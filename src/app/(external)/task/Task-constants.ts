// task.constants.ts

import type {
  SelectOption,
  PriorityColor,
  TaskPriority,
  TaskStatus,
  TaskForm,
} from "./Task-types";

import type { StaffSuggestion } from "./StaffCombobox";

export const STAFF_OPTIONS: StaffSuggestion[] = [
  { value: "",               label: "Unassigned"     },
  { value: "john_doe",       label: "John Doe"       },
  { value: "jane_smith",     label: "Jane Smith"     },
  { value: "mike_johnson",   label: "Mike Johnson"   },
  { value: "sarah_williams", label: "Sarah Williams" },
];

export const PRIORITY_OPTIONS: SelectOption[] = [
  { value: "low",    label: "Low"    },
  { value: "medium", label: "Medium" },
  { value: "high",   label: "High"   },
  { value: "urgent", label: "Urgent" },
];

export const REMINDER_OPTIONS: SelectOption[] = [
  { value: "none",  label: "None"              },
  { value: "15min", label: "15 minutes before" },
  { value: "30min", label: "30 minutes before" },
  { value: "1hour", label: "1 hour before"     },
  { value: "1day",  label: "1 day before"      },
];

export const STATUS_OPTIONS: TaskStatus[] = [
  "pending", "in_progress", "review", "completed", "cancelled",
];

export const STATUS_LABELS: Record<TaskStatus, string> = {
  pending:     "Pending",
  in_progress: "In Progress",
  review:      "Review",
  completed:   "Completed",
  cancelled:   "Cancelled",
};

export const PRIORITY_COLORS: Record<TaskPriority, PriorityColor> = {
  low:    { bg: "#e8f5e9", text: "#2e7d32", dot: "#43a047" },
  medium: { bg: "#fff3e0", text: "#e65100", dot: "#fb8c00" },
  high:   { bg: "#fce4ec", text: "#c62828", dot: "#e53935" },
  urgent: { bg: "#f3e5f5", text: "#6a1b9a", dot: "#8e24aa" },
};

export const INITIAL_FORM: TaskForm = {
  subject:     "",
  startDate:   "",
  endDate:     "",
  staffName:   "",
  priority:    "medium",
  reminder:    "none",
  description: "",
  status:      "pending",
};