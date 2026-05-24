"use client";

// StaffCombobox.tsx
// The display query is fully local — parent state is only updated
// on selection or blur, never on every keystroke.

import React, { useState, useRef, useEffect } from "react";

export interface StaffSuggestion {
  value: string;
  label: string;
  role?:   string;
}

interface StaffComboboxProps {
  initialValue?: string;           // pre-fill label on mount (edit mode)
  onCommit:      (value: string) => void; // called only on select / blur
  suggestions:   StaffSuggestion[];
  placeholder?:  string;
  disabled?:     boolean;
  variant?:      "desktop" | "mobile";
}

const StaffCombobox: React.FC<StaffComboboxProps> = ({
  initialValue = "",
  onCommit,
  suggestions,
  placeholder = "Search staff...",
  disabled    = false,
  variant     = "desktop",
}) => {
  const inputRef     = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getLabel = (val: string) =>
    suggestions.find((s) => s.value === val)?.label ?? val;

  // query is FULLY LOCAL — never set from outside after mount
  const [query,    setQuery]    = useState(() => getLabel(initialValue));
  const [open,     setOpen]     = useState(false);
  const [filtered, setFiltered] = useState(
    suggestions.filter((s) => s.value !== "")
  );

  // Only on mount — pre-fill for edit mode
  useEffect(() => {
    if (initialValue) setQuery(getLabel(initialValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty dep array — run once only

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const doFilter = (q: string) =>
    q.trim() === ""
      ? suggestions.filter((s) => s.value !== "")
      : suggestions.filter(
          (s) =>
            s.value !== "" &&
            (s.label.toLowerCase().includes(q.toLowerCase()) ||
             s.role?.toLowerCase().includes(q.toLowerCase()))
        );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setFiltered(doFilter(val));
    setOpen(true);
    // NO parent call here — parent stays unchanged while typing
  };

  const handleFocus = () => {
    setFiltered(doFilter(query));
    setOpen(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setOpen(false);
        // Commit free-text or matched value on blur
        const match = suggestions.find(
          (s) => s.label.toLowerCase() === query.trim().toLowerCase()
        );
        onCommit(match ? match.value : query.trim());
      }
    }, 120);
  };

  const handleSelect = (s: StaffSuggestion) => {
    setQuery(s.label);
    setFiltered(doFilter(""));
    setOpen(false);
    onCommit(s.value);    // only now update parent
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuery("");
    setFiltered(doFilter(""));
    setOpen(true);
    onCommit("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // ── Avatar ─────────────────────────────────────────────────────
  const Av: React.FC<{ s: StaffSuggestion }> = ({ s }) => {
    const initials = s.label
      .split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
    return (
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-semibold text-white"
        style={{ background: "#1b3b5f" }}
      >
        {initials}
      </div>
    );
  };

  // ── Dropdown ───────────────────────────────────────────────────
  const Dropdown: React.FC<{ cls?: string }> = ({ cls = "left-0 right-0" }) => (
    <div
      className={`absolute top-full ${cls} mt-1 bg-white rounded-xl overflow-hidden z-[200]`}
      style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)" }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {filtered.length === 0 ? (
        <p className="px-4 py-3 text-[13px] text-[#8e8e93] text-center">
          No staff found
        </p>
      ) : (
        <ul role="listbox" className="max-h-[200px] overflow-y-auto">
          {filtered.map((s) => (
            <li
              key={s.value}
              role="option"
              onMouseDown={(e) => { e.preventDefault(); handleSelect(s); }}
              className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors border-b border-gray-50 last:border-0 hover:bg-gray-50"
            >
              <Av s={s} />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium leading-tight truncate text-black">
                  {s.label}
                </p>
                {s.role && (
                  <p className="text-[12px] text-[#8e8e93] leading-tight truncate">
                    {s.role}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  // ── DESKTOP ────────────────────────────────────────────────────
  if (variant === "desktop") {
    return (
      <div ref={containerRef} className="relative w-full">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            className={`w-full text-[14px] text-black bg-[#f5f5f7] border rounded-lg px-3 py-[9px] pr-8 outline-none transition-all placeholder:text-[#aeaeb2] ${
              open
                ? "bg-white border-[#007AFF]"
                : "border-transparent"
            }`}
            placeholder={placeholder}
            value={query}
            onChange={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            autoComplete="off"
            spellCheck={false}
          />
          {query ? (
            <button
              type="button"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#aeaeb2] hover:text-[#3c3c43] transition-colors z-10"
              onMouseDown={handleClear}
              tabIndex={-1}
              aria-label="Clear"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="#aeaeb2" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          )}
        </div>
        {open && <Dropdown />}
      </div>
    );
  }

  // ── MOBILE ─────────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="flex-1 min-w-0 relative">
      <input
        ref={inputRef}
        type="text"
        className="w-full text-[15px] text-right bg-transparent border-none outline-none placeholder:text-[#c7c7cc] text-black"
        placeholder={placeholder}
        value={query}
        onChange={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        autoComplete="off"
        spellCheck={false}
      />
      {open && filtered.length > 0 && <Dropdown cls="right-0 w-[220px]" />}
    </div>
  );
};

export default StaffCombobox;