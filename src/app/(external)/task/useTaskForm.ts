// useTaskForm.ts

import { useState, useCallback } from "react";
import type { TaskForm, TaskFormErrors, SaveState } from "./Task-types";
import { INITIAL_FORM } from "./Task-constants";
import { validateTaskForm, hasErrors } from "./Task-validation";
import { taskService } from "./Task-service";

interface UseTaskFormOptions {
  initialData?: (Partial<TaskForm> & { id?: string }) | null;
  onSave?:      (data: TaskForm) => void | Promise<void>;
}

export interface UseTaskFormReturn {
  form:      TaskForm;
  errors:    TaskFormErrors;
  saveState: SaveState;
  isDirty:   boolean;
  setField:  <K extends keyof TaskForm>(key: K, value: TaskForm[K]) => void;
  reset:     () => void;
  submit:    () => Promise<boolean>;
}

export function useTaskForm({
  initialData,
  onSave,
}: UseTaskFormOptions): UseTaskFormReturn {
  const base = { ...INITIAL_FORM, ...(initialData ?? {}) };

  const [form,      setForm]      = useState<TaskForm>(base);
  const [errors,    setErrors]    = useState<TaskFormErrors>({});
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const setField = useCallback(
    <K extends keyof TaskForm>(key: K, value: TaskForm[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    []
  );

  const reset = useCallback(() => {
    setForm({ ...INITIAL_FORM, ...(initialData ?? {}) });
    setErrors({});
    setSaveState("idle");
  }, [initialData]);

  const submit = useCallback(async (): Promise<boolean> => {
    const validationErrors = validateTaskForm(form);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return false;
    }

    setSaveState("saving");
    try {
      const taskId = (initialData as any)?.id as string | undefined;
      const result = taskId
        ? await taskService.update(taskId, form)
        : await taskService.create(form);

      setSaveState("saved");
      await onSave?.(result);
      setTimeout(() => setSaveState("idle"), 2000);
      return true;
    } catch (err) {
      console.error("Task save failed:", err);
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 3000);
      return false;
    }
  }, [form, initialData, onSave]);

  const isDirty =
    JSON.stringify(form) !== JSON.stringify(base);

  return { form, errors, saveState, isDirty, setField, reset, submit };
}