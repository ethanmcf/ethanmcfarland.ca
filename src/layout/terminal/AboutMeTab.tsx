import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import PromptLine from "./PromptLine";
import { ABOUT_COMMANDS, type AboutCommand } from "../../data/aboutMe";

interface HistoryEntry {
  command: string;
  output: string[];
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
}

function findCommand(raw: string): AboutCommand | undefined {
  const normalized = normalize(raw);
  if (!normalized) return undefined;

  const exact = ABOUT_COMMANDS.find((entry) => entry.command === normalized);
  if (exact) return exact;

  const aliasExact = ABOUT_COMMANDS.find((entry) =>
    entry.aliases.includes(normalized),
  );
  if (aliasExact) return aliasExact;

  return ABOUT_COMMANDS.find((entry) =>
    [entry.command, ...entry.aliases].some((keyword) =>
      normalized.includes(keyword),
    ),
  );
}

export default function AboutMeTab() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  function runCommand(raw: string) {
    const command = raw.trim();
    if (!command) return;

    if (normalize(command) === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const match = findCommand(command);
    const output = match
      ? match.run()
      : [
          `I didn't catch that — type "help" for a few ideas of what to ask (you're not limited to those, just ask in your own words)`,
        ];

    setHistory((prev) => [...prev, { command, output }]);
    setInput("");
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-terminal-muted">
        # ask me anything about myself, in your own words — type "help" for a
        few ideas to get started
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
