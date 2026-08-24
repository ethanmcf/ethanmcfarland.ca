import type { ReactNode } from "react";

export default function PromptLine({ children }: { children?: ReactNode }) {
  return (
    <span className="flex flex-wrap items-center gap-1">
      <span className="text-terminal-arrow">➜</span>
      <span className="text-terminal-path">ethanmcfarland.ca</span>
      <span>
        <span className="text-terminal-muted">(</span>
        <span className="text-terminal-branch">online</span>
        <span className="text-terminal-muted">)</span>
      </span>
      <span className="text-terminal-muted pr-1">%</span>
      {children}
    </span>
  );
}
