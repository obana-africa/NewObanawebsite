"use client";

// index.tsx — barrel export for the task module
// Usage: import { TaskDetailsForm, useTaskForm, taskService } from '@/landing/task'

export { default as TaskDetailsForm } from "./TaskDetailsForm";
export { default as StaffCombobox }  from "./StaffCombobox";
export { useTaskForm }               from "./useTaskForm";
export { taskService }              from "./Task-service";
export { validateTaskForm, hasErrors } from "./Task-validation";
export * from "./Task-types";
export * from "./Task-constants";