import { useEffect, useState } from "react";

interface DiagnosticLine {
  tag: "INFO" | "OK";
  text: string;
  spaceBefore?: boolean;
}

const REVEAL_INTERVAL_MS = 150;
const OK_TARGET_WIDTH = 32;
const STAT_REFRESH_MS = 12 * 60 * 60 * 1000;

function hashSeed(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function jitter(key: string, base: number, spread: number) {
  const bucket = Math.floor(Date.now() / STAT_REFRESH_MS);
  const rand = seededRandom(hashSeed(`${key}:${bucket}`));
  return Math.max(1, base + Math.round((rand * 2 - 1) * spread));
}

function okLine(label: string, value: string, spaceBefore?: boolean): DiagnosticLine {
  const dots = Math.max(3, OK_TARGET_WIDTH - label.length);
  return { tag: "OK", text: `${label} ${".".repeat(dots)} ${value}`, spaceBefore };
}

function buildLines(): DiagnosticLine[] {
  const timestamp = new Date().toISOString().split(".")[0] + "Z";

  return [
    { tag: "INFO", text: "Initiating Ethan McFarland health check..." },
    { tag: "INFO", text: `Current timestamp: ${timestamp}` },
    okLine("Caffeine Consumed (Coffee)", `${jitter("caffeine", 3, 1)} cups`, true),
    okLine("Weight Lifted (Deadlift PR)", `${jitter("deadlift", 425, 10)} lbs`),
    okLine(
      "Sleep Debt (REM Cycles)",
      `${jitter("sleep-h", 6, 1)}h ${jitter("sleep-m", 30, 20)}m`,
    ),
    okLine("Motivation Levels", `${jitter("motivation", 95, 5)}%`),
    {
      tag: "INFO",
      text: "Checking side-project throughput...",
      spaceBefore: true,
    },
    okLine("Lines of code shipped today", `${jitter("loc", 340, 60)}`),
    okLine("GitHub commits pushed", `${jitter("commits", 6, 3)}`),
    okLine("Claude Code sessions open", `${jitter("claude-sessions", 4, 2)}`),
    { tag: "INFO", text: "Verifying vibe integrity...", spaceBefore: true },
    okLine("Playlist mood", "Locked in"),
    okLine("Existential dread", "Nominal"),
  ];
}

export default function SystemStatusTab() {
  const [runId, setRunId] = useState(0);
  const [lines, setLines] = useState<DiagnosticLine[]>(buildLines);
  const [revealCount, setRevealCount] = useState(0);

  useEffect(() => {
    setLines(buildLines());
    setRevealCount(0);
  }, [runId]);

  useEffect(() => {
    if (revealCount >= lines.length) return;
    const timeout = setTimeout(
      () => setRevealCount((prev) => prev + 1),
      REVEAL_INTERVAL_MS,
    );
    return () => clearTimeout(timeout);
  }, [revealCount, lines.length]);

  const done = revealCount >= lines.length;

  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-text">&gt; ./run_system_diagnostics.sh</p>

      <div className="mt-1 flex flex-col">
        {lines.slice(0, revealCount).map((line, index) => (
          <p key={index} className={line.spaceBefore ? "mt-2" : undefined}>
            <span
              className={
                line.tag === "OK" ? "text-terminal-arrow" : "text-terminal-path"
              }
            >
              [{line.tag === "OK" ? "  OK  " : " INFO "}]
            </span>{" "}
            <span className="text-text">{line.text}</span>
          </p>
        ))}
      </div>

      {done && (
        <>
          <p className="mt-2 font-semibold text-terminal-arrow">
            System status: All systems operational
          </p>
          <button
            type="button"
            onClick={() => setRunId((id) => id + 1)}
            className="mt-1 w-fit cursor-pointer text-terminal-muted outline-none hover:text-hover-text-emphasis"
          >
            ↻ re-run diagnostics
          </button>
        </>
      )}
    </div>
  );
}
