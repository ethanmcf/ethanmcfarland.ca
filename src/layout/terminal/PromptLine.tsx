import type { ReactNode } from "react";

export default function PromptLine({ children }: { children?: ReactNode }) {
  return (
    <span className="flex flex-wrap items-center gap-1">
      <span className="text-terminal-arrow">➜</span>
      <span className="text-terminal-path">ethanmcfarland.ca</span>
      <span className="text-terminal-muted">git:(</span>
      <span className="text-terminal-branch">main</span>
      <span className="text-terminal-muted">)</span>
      {children}
    </span>
  );
}
