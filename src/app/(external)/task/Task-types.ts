// task.types.ts

export type TaskStatus    = "pending" | "in_progress" | "review" | "completed" | "cancelled";
export type TaskPriority  = "low" | "medium" | "high" | "urgent";
export type ReminderOption = "none" | "15min" | "30min" | "1hour" | "1day";
export type SaveState     = "idle" | "saving" | "saved" | "error";

export interface TaskForm {
  subject:     string;
  startDate:   string;
  endDate:     string;
  staffName:   string;
  priority:    TaskPriority;
  reminder:    ReminderOption;
  description: string;
  status:      TaskStatus;
}

export interface TaskFormErrors {
  subject?:     string;
  startDate?:   string;
  endDate?:     string;
  description?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface PriorityColor {
  bg:   string;
  text: string;
  dot:  string;
}

export interface TaskDetailsFormProps {
  initialData?: (Partial<TaskForm> & { id?: string }) | null;
  onSave?:      (data: TaskForm) => void | Promise<void>;
  onCancel?:    () => void;
}