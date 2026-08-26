import { useLayoutEffect, useRef } from "react";

export default function TerminalTextarea({
  value,
  onChange,
  placeholder,
  inputMode,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLTextAreaElement>["inputMode"];
  className?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      autoFocus
      rows={1}
      inputMode={inputMode}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          event.currentTarget.form?.requestSubmit();
        }
      }}
      placeholder={placeholder}
      spellCheck={false}
      className={`resize-none overflow-hidden bg-transparent font-mono text-base leading-6 text-text outline-none placeholder:text-terminal-muted md:text-[13px] ${className}`}
    />
  );
}
