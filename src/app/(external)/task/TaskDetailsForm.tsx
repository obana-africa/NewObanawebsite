"use client";

// TaskDetailsForm.tsx — pure UI, all styles via Tailwind

import React from "react";
import type { ReminderOption, TaskDetailsFormProps, TaskPriority, TaskForm } from "./Task-types";
import {
  STAFF_OPTIONS,
  PRIORITY_OPTIONS,
  REMINDER_OPTIONS,
  PRIORITY_COLORS,
} from "./Task-constants";
import { useTaskForm } from "./useTaskForm";
import StaffCombobox from "./StaffCombobox";

/* ── Shared inline SVG icon ──────────────────────────────────── */
const Ic: React.FC<{
  d: string | string[];
  size?: number;
  stroke?: string;
  sw?: number;
  fill?: string;
  className?: string;
}> = ({ d, size = 16, stroke = "currentColor", sw = 2, fill = "none", className }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill={fill} stroke={stroke} strokeWidth={sw}
    strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0 }} aria-hidden="true"
    className={className}
  >
    {([] as string[]).concat(d).map((p, i) => (
      <path key={i} d={p} />
    ))}
  </svg>
);

/* ── Desktop save button label ───────────────────────────────── */
const SaveLabel: React.FC<{ state: string }> = ({ state }) => {
  if (state === "saving") return (
    <span className="flex items-center gap-1.5">
      <Ic
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        size={14} className="animate-spin"
      />
      Saving…
    </span>
  );
  if (state === "saved") return (
    <span className="flex items-center gap-1.5">
      <Ic d="M20 6L9 17l-5-5" size={14} /> Saved
    </span>
  );
  if (state === "error") return <>Failed — retry</>;
  return (
    <span className="flex items-center gap-1.5">
      <Ic
        d={["M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z", "M17 21v-8H7v8", "M7 3v5h8"]}
        size={14}
      />
      Save Task
    </span>
  );
};

/* ════════════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════════════ */
const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const { form, errors, saveState, setField, submit } = useTaskForm({ initialData, onSave });

  const priorityColor = PRIORITY_COLORS[form.priority];
  const isEdit = !!(initialData as (Partial<TaskForm> & { id?: string }) | null)?.id;

  /* ── Reusable row pattern (mobile) ── */
  const MobileRow = ({
    label,
    required,
    children,
    error,
  }: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
    error?: string;
  }) => (
    <>
      <div className="flex items-center justify-between px-5 py-3 min-h-[46px] gap-3 border-b border-gray-100 last:border-b-0">
        <span className="text-[15px] text-black font-normal flex-shrink-0 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500 text-sm">*</span>}
        </span>
        {children}
      </div>
      {error && <p className="text-[11px] text-red-500 px-5 pt-1">{error}</p>}
    </>
  );

  /* ── Reusable row pattern (desktop) ── */
  const DesktopRow = ({
    label,
    required,
    htmlFor,
    children,
  }: {
    label: string;
    required?: boolean;
    htmlFor?: string;
    children: React.ReactNode;
  }) => (
    <div className="grid grid-cols-[160px_1fr] items-start gap-4 px-[18px] py-[13px] border-b border-gray-100 last:border-b-0 min-h-[52px]">
      <label
        htmlFor={htmlFor}
        className="text-[14px] font-medium text-[#3c3c43] flex items-center gap-1 pt-[10px]"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-col gap-1 w-full">{children}</div>
    </div>
  );

  return (
    <div
      className="w-full"
      style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >

      
      <div className="flex flex-col bg-white min-h-screen w-full sm:hidden">

        
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <button
            type="button"
            className="text-[15px] text-[#007AFF] font-normal w-16"
            onClick={onCancel}
          >
            Cancel
          </button>
          <h1 className="text-[17px] font-semibold text-black tracking-[-0.3px]">
            Task Details
          </h1>
          <button
            type="button"
            className={`text-[15px] font-semibold w-16 text-right disabled:opacity-40 ${
              saveState === "saved" ? "text-green-500" :
              saveState === "error" ? "text-red-500"  : "text-[#007AFF]"
            }`}
            onClick={submit}
            disabled={saveState === "saving"}
          >
            {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved ✓" : "Save"}
          </button>
        </div>

        {/* Task Information */}
        <p className="text-[11px] font-medium tracking-[0.08em] text-[#8e8e93] uppercase px-4 pt-6 pb-2">
          Task Information
        </p>
        <div className="bg-white border-t border-b border-[#e5e5ea]">
          <MobileRow label="Subject" required error={errors.subject}>
            <input
              className="text-[15px] text-right flex-1 bg-transparent border-none outline-none min-w-0 placeholder:text-[#c7c7cc] text-black"
              placeholder="Enter task subject"
              value={form.subject}
              onChange={(e) => setField("subject", e.target.value)}
              aria-label="Task subject"
            />
          </MobileRow>

          <MobileRow label="Start Date" error={errors.startDate}>
            <input
              type="date"
              className={`text-[15px] text-right bg-transparent border-none outline-none cursor-pointer w-[140px] ${
                form.startDate ? "text-black" : "text-[#c7c7cc]"
              }`}
              value={form.startDate}
              placeholder="Select Date"
              onChange={(e) => setField("startDate", e.target.value)}
              aria-label="Start date"
            />
          </MobileRow>

          <MobileRow label="Staff Name">
          <StaffCombobox
              initialValue={form.staffName}
              onCommit={(val) => setField("staffName", val)}
              suggestions={STAFF_OPTIONS}
              placeholder="Unassigned"
              variant="mobile"
            />
          </MobileRow>

          <MobileRow label="Priority">
            <div className="flex items-center gap-1 justify-end flex-1 min-w-0">
              <select
                className="text-[15px] text-right bg-transparent border-none outline-none cursor-pointer flex-1 min-w-0 appearance-none font-normal"
                value={form.priority}
                onChange={(e) => setField("priority", e.target.value as TaskPriority)}
                style={{ color: priorityColor.text }}
                aria-label="Priority"
              >
                {PRIORITY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <span className="text-[#c7c7cc] text-lg leading-none flex-shrink-0">›</span>
            </div>
          </MobileRow>

          <MobileRow label="Reminder">
            <div className="flex items-center gap-1 justify-end flex-1 min-w-0">
              <select
                className={`text-[15px] text-right bg-transparent border-none outline-none cursor-pointer flex-1 min-w-0 appearance-none ${
                  form.reminder !== "none" ? "text-black" : "text-[#c7c7cc]"
                }`}
                value={form.reminder}
                onChange={(e) => setField("reminder", e.target.value as ReminderOption)}
                aria-label="Reminder"
              >
                {REMINDER_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <span className="text-[#c7c7cc] text-lg leading-none flex-shrink-0">›</span>
            </div>
          </MobileRow>
        </div>

        {/* Description */}
        <p className="text-[11px] font-medium tracking-[0.08em] text-[#8e8e93] uppercase px-4 pt-6 pb-2">
          Description Information
        </p>
        <div className="bg-white border-t border-b border-[#e5e5ea]">
          <textarea
            className="w-full min-h-[150px] px-4 py-4 text-[15px] text-black bg-transparent border-none outline-none resize-none leading-[1.5] placeholder:text-[#c7c7cc]"
            placeholder="Provide a detailed description of the task requirements and objectives..."
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            aria-label="Task description"
          />
          {errors.description && (
            <p className="text-[11px] text-red-500 px-4 pb-2">{errors.description}</p>
          )}
        </div>

      </div>

      {/* ════════════════════════════════════════════
          DESKTOP — centered panel
      ════════════════════════════════════════════ */}
      <div className="hidden sm:block w-full min-h-screen bg-[#f5f5f7]">
        <div className="flex items-start justify-center px-6 py-10 min-h-screen">
          <div className="bg-white rounded-2xl w-full max-w-[720px] overflow-hidden"
            style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)" }}
          >

            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b  bg-[#fafafa]">
              <div className="flex items-center gap-3 px-6">
                <div className="w-9 h-9 bg-blue-500/10 rounded-[9px] flex items-center justify-center flex-shrink-0">
                  <Ic
                    d={["M9 11l3 3L22 4", "M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"]}
                    size={18} stroke="#007AFF"
                  />
                </div>
                <div>
                  <p className="text-[18px] font-semibold text-black tracking-[-0.3px]">
                    Task Details
                  </p>
                  <p className="text-[12px] text-gray-400 mt-px">
                    {isEdit ? "Edit existing task" : "Create a new task"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-6">
                <button
                  type="button"
                  className="px-[18px] py-2 rounded-lg border border-gray-200 bg-white text-[14px] font-medium text-[#3c3c43] hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={onCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center gap-1.5 px-[22px] py-2 rounded-lg text-[14px] font-semibold text-white min-w-[110px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                    saveState === "saved" ? "bg-green-500" :
                    saveState === "error" ? "bg-red-500"   : "bg-[#007AFF] hover:bg-[#0066DD]"
                  }`}
                  onClick={submit}
                  disabled={saveState === "saving"}
                >
                  <SaveLabel state={saveState} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-7 py-7 flex flex-col gap-7">

              {/* Status */}
              {/* <section aria-label="Task status">
                <p className="text-[11px] font-semibold tracking-[0.07em] uppercase text-[#8e8e93] mb-3">
                  Status
                </p>
                <div className="flex gap-2 flex-wrap" role="group">
                  {STATUS_OPTIONS.map((status: TaskStatus) => (
                    <button
                      key={status}
                      type="button"
                      className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border-[1.5px] transition-all cursor-pointer ${
                        form.status === status
                          ? "border-[#007AFF] bg-blue-50 text-[#007AFF]"
                          : "border-transparent bg-gray-100 text-[#8e8e93] hover:bg-gray-200"
                      }`}
                      onClick={() => setField("status", status)}
                      aria-pressed={form.status === status}
                    >
                      {STATUS_LABELS[status]}
                    </button>
                  ))}
                </div>
              </section> */}

              {/* Task Information */}
              <section aria-label="Task information">
                <p className="text-[11px] font-semibold tracking-[0.07em] uppercase text-[#8e8e93] my-3 px-6">
                  Task Information
                </p>
                <div className=" rounded-xl overflow-hidden px-6">

                  <DesktopRow label="Subject" required htmlFor="d-subject">
                    <input
                      id="d-subject"
                      className={`w-full text-[14px] text-black bg-[#f5f5f7] border border-transparent rounded-lg px-3 py-[9px] outline-none transition-all placeholder:text-[#aeaeb2] focus:bg-white focus:border-[#007AFF] ${
                        errors.subject ? "!border-red-500 !bg-red-50" : ""
                      }`}
                      placeholder="Enter task subject"
                      value={form.subject}
                      onChange={(e) => setField("subject", e.target.value)}
                    />
                    {errors.subject && (
                      <p className="text-[12px] text-red-500 mt-1" role="alert">{errors.subject}</p>
                    )}
                  </DesktopRow>

                  <DesktopRow label="Start Date">
                    <div className="w-full">
                      <input
                        type="date"
                        className={`w-full text-[14px] text-black bg-[#f5f5f7] border border-transparent rounded-lg px-3 py-[9px] outline-none transition-all focus:bg-white focus:border-[#007AFF] ${
                          errors.startDate ? "!border-red-500 !bg-red-50" : ""
                        }`}
                        value={form.startDate}
                        onChange={(e) => setField("startDate", e.target.value)}
                        title="Start Date"
                        aria-label="Start date"
                      />
                      {errors.startDate && (
                        <p className="text-[12px] text-red-500 mt-1" role="alert">{errors.startDate}</p>
                      )}
                    </div>
                  </DesktopRow>

                  <DesktopRow label="End Date">
                    <div className="w-full">
                      <input
                        type="date"
                        className={`w-full text-[14px] text-black bg-[#f5f5f7] border border-transparent rounded-lg px-3 py-[9px] outline-none transition-all focus:bg-white focus:border-[#007AFF] ${
                          errors.endDate ? "!border-red-500 !bg-red-50" : ""
                        }`}
                        value={form.endDate}
                        onChange={(e) => setField("endDate", e.target.value)}
                        min={form.startDate || undefined}
                        title="End Date"
                        aria-label="End date"
                      />
                      {errors.endDate && (
                        <p className="text-[12px] text-red-500 mt-1" role="alert">{errors.endDate}</p>
                      )}
                    </div>
                  </DesktopRow>

                  <DesktopRow label="Staff Name" htmlFor="d-staff">
                     <StaffCombobox
                      initialValue={form.staffName}
                      onCommit={(val) => setField("staffName", val)}
                      suggestions={STAFF_OPTIONS}
                      placeholder="Search or type staff name..."
                      variant="desktop"
                    />
                  </DesktopRow>

                  <DesktopRow label="Priority">
                    <select
                      className="w-full text-[14px] bg-[#f5f5f7] border border-transparent rounded-lg px-3 py-[9px] outline-none transition-all cursor-pointer appearance-none focus:bg-white focus:border-[#007AFF] font-medium"
                      style={{
                        color: priorityColor.text,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23aeaeb2' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        paddingRight: "32px",
                      }}
                      value={form.priority}
                      onChange={(e) => setField("priority", e.target.value as TaskPriority)}
                      aria-label="Priority"
                    >
                      {PRIORITY_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </DesktopRow>

                  <DesktopRow label="Reminder">
                    <select
                      className="w-full text-[14px] text-black bg-[#f5f5f7] border border-transparent rounded-lg px-3 py-[9px] outline-none transition-all cursor-pointer appearance-none focus:bg-white focus:border-[#007AFF]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23aeaeb2' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        paddingRight: "32px",
                      }}
                      value={form.reminder}
                      onChange={(e) => setField("reminder", e.target.value as ReminderOption)}
                      aria-label="Reminder"
                    >
                      {REMINDER_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </DesktopRow>

                </div>
              </section>

              {/* Description */}
              <section aria-label="Task description" className="px-6">
                <p className="text-[11px] font-semibold tracking-[0.07em] uppercase text-[#8e8e93] mb-3">
                  Description
                </p>
                <textarea
                  className="w-full min-h-[130px] text-[14px] text-black bg-[#f5f5f7] border border-transparent rounded-lg px-3 py-2.5 outline-none transition-all resize-y leading-relaxed placeholder:text-[#aeaeb2] focus:bg-white focus:border-[#007AFF]"
                  placeholder="Provide a detailed description of the task requirements and objectives..."
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  aria-label="Task description"
                />
                {errors.description && (
                  <p className="text-[12px] text-red-500 mt-1" role="alert">{errors.description}</p>
                )}
              </section>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TaskDetailsForm;