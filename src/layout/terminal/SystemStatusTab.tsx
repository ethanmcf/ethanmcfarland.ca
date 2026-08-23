import { useState } from "react";
import PromptLine from "./PromptLine";
import { EDUCATION } from "../../data/education";

function monthsSince(dateStr: string): number {
  const start = new Date(`${dateStr} 1`);
  const now = new Date();
  return (
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth())
  );
}

function formatUptime(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return years > 0 ? `${years}y ${months}m` : `${months}m`;
}

interface StatBar {
  label: string;
  value: number;
}

function randomStats(): StatBar[] {
  return [
    { label: "Focus", value: 80 + Math.floor(Math.random() * 15) },
    { label: "Caffeine", value: 30 + Math.floor(Math.random() * 40) },
    { label: "Motivation", value: 85 + Math.floor(Math.random() * 15) },
    { label: "Side projects", value: 60 + Math.floor(Math.random() * 30) },
  ];
}

export default function SystemStatusTab() {
  const [stats, setStats] = useState<StatBar[]>(randomStats);
  const uptime = formatUptime(monthsSince(EDUCATION.startDate));

  return (
    <div className="flex flex-col gap-1.5">
      <PromptLine>
        <span className="text-text">system-status</span>
      </PromptLine>

      <p className="text-text">
        status: <span className="text-terminal-arrow">online</span> · uptime:{" "}
        {uptime} (since starting CS @ UofT)
      </p>
      <p className="text-text">
        currently open to:{" "}
        <span className="text-terminal-branch">
          full-time SWE roles, {EDUCATION.expectedGraduation}
        </span>
      </p>

      <div className="mt-1 flex flex-col gap-1">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-2">
            <span className="w-28 shrink-0 text-terminal-muted">
              {stat.label}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-sm bg-overlay-weak">
              <div
                className="h-full bg-terminal-arrow"
                style={{ width: `${stat.value}%` }}
              />
            </div>
            <span className="w-10 shrink-0 text-right text-text">
              {stat.value}%
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setStats(randomStats())}
        className="mt-1 w-fit cursor-pointer text-terminal-muted hover:text-hover-text-emphasis"
      >
        ↻ re-run system-status
      </button>
    </div>
  );
}
