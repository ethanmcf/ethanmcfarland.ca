import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const HOLD_MS = 800;
const EXIT_MS = 520;

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);
  const [skip] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }
    const exitTimer = setTimeout(() => setExiting(true), HOLD_MS);
    const doneTimer = setTimeout(onDone, HOLD_MS + EXIT_MS);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  if (skip) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-panel transition-[clip-path] ease-in"
      style={{
        transitionDuration: `${EXIT_MS}ms`,
        clipPath: exiting
          ? "circle(0% at 50% 50%)"
          : "circle(150% at 50% 50%)",
      }}
    >
      <div className="relative flex flex-col items-center gap-5">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 -z-10 rounded-full bg-accent blur-2xl [animation:loading-glow-pulse_900ms_ease-out_both]" />
          <img
            src={logo}
            alt=""
            className="h-24 w-24 [animation:loading-logo-in_620ms_cubic-bezier(0.2,0.8,0.2,1)_both]"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="h-[3px] w-52 overflow-hidden rounded-full bg-overlay-soft">
            <div className="h-full w-0 rounded-full bg-accent shadow-[0_0_10px_2px] shadow-accent/60 [animation:loading-bar-fill_620ms_120ms_ease-out_both]" />
          </div>
          <p className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.2em] text-terminal-muted uppercase">
            Booting Ethanmcfarland.ca
            <span className="text-accent [animation:loading-cursor-blink_1s_step-end_infinite]">
              ▌
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
