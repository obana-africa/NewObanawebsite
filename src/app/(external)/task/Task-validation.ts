// task.validation.ts

import type { TaskForm, TaskFormErrors } from "./Task-types";

export function validateTaskForm(form: TaskForm): TaskFormErrors {
  const errors: TaskFormErrors = {};

  if (!form.subject.trim()) {
    errors.subject = "Subject is required";
  } else if (form.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  } else if (form.subject.trim().length > 200) {
    errors.subject = "Subject must be under 200 characters";
  }

  if (!form.startDate) {
    errors.startDate = "Start date is required";
  }

  if (form.startDate && form.endDate && form.endDate < form.startDate) {
    errors.endDate = "End date must be after start date";
  }

  if (form.description.length > 2000) {
    errors.description = "Description must be under 2000 characters";
  }

  return errors;
}

export function hasErrors(errors: TaskFormErrors): boolean {
  return Object.values(errors).some(Boolean);
}