import { useEffect, useRef, useState } from "react";
import PromptLine from "./PromptLine";
import { ABOUT_COMMANDS } from "../../data/aboutMe";

interface HistoryEntry {
  command: string;
  output: string[];
}

export default function AboutMeTab() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;

    if (command.toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const match = ABOUT_COMMANDS.find(
      (entry) => entry.command === command.toLowerCase(),
    );
    const output = match
      ? match.run()
      : [`command not found: ${command} — type "help" for a list`];

    setHistory((prev) => [...prev, { command, output }]);
    setInput("");
  }

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-terminal-muted">
        # type a command to learn more about me — try "help"
      </p>

      {history.map((entry, index) => (
        <div key={index}>
          <PromptLine>
            <span className="text-text">{entry.command}</span>
          </PromptLine>
          {entry.output.map((line, lineIndex) => (
            <p key={lineIndex} className="text-text">
              {line}
            </p>
          ))}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex items-center gap-1">
        <PromptLine />
        <input
          autoFocus
          value={input}
          onChange={(event) => setInput(event.target.value)}
          spellCheck={false}
          className="flex-1 bg-transparent font-mono text-[13px] text-text outline-none"
        />
      </form>
      <div ref={endRef} />
    </div>
  );
}
