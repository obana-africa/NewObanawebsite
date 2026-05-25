// task.service.ts
// ─────────────────────────────────────────────────────────
// Replace stub bodies with real fetch calls when API is ready.
// All methods resolve to the canonical TaskForm shape.
// ─────────────────────────────────────────────────────────

import type { TaskForm } from "./Task-types";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api/v1";

export const taskService = {

  /** POST /tasks — create a new task */
  async create(data: TaskForm): Promise<TaskForm> {
    // TODO: uncomment when API is ready
    // const res = await fetch(`${BASE_URL}/tasks`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // if (!res.ok) throw new Error(await res.text());
    // return res.json();
    await new Promise((r) => setTimeout(r, 700));
    return { ...data };
  },

  /** PATCH /tasks/:id — update an existing task */
  async update(id: string, data: Partial<TaskForm>): Promise<TaskForm> {
    // const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // if (!res.ok) throw new Error(await res.text());
    // return res.json();
    await new Promise((r) => setTimeout(r, 700));
    return data as TaskForm;
  },

  /** GET /tasks/:id — fetch a single task */
  async getById(id: string): Promise<TaskForm> {
    // const res = await fetch(`${BASE_URL}/tasks/${id}`);
    // if (!res.ok) throw new Error(await res.text());
    // return res.json();
    throw new Error(`getById(${id}) — not yet implemented`);
  },

  /** DELETE /tasks/:id — remove a task */
  async remove(id: string): Promise<void> {
    // await fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" });
    console.warn(`remove(${id}) — not yet implemented`);
  },
};