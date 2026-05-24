"use client";

import { useRouter } from "next/navigation";
import { TaskDetailsForm } from "@/app/(external)/task";
import type { TaskForm } from "@/app/(external)/task";

export default function NewTaskPage() {
  const router = useRouter();

  const handleSave = async (data: TaskForm) => {
    console.log("Task saved:", data);
    router.push("/");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    // Full screen override — covers navbar by using fixed positioning
    <div className="fixed inset-0 z-50 bg-[#f5f5f7] overflow-auto">
      <TaskDetailsForm
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}