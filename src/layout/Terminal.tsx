import { useEffect, useRef, useState } from "react";
import { Activity, Bot, ChevronDown, ChevronUp, Mail } from "lucide-react";
import ContactMeTab from "./terminal/ContactMeTab";
import AboutMeTab from "./terminal/AboutMeTab";
import SystemStatusTab from "./terminal/SystemStatusTab";

const MIN_HEIGHT = 120;
const MAX_HEIGHT = 560;

type TabId = "contact" | "about" | "system";

const TABS: { id: TabId; label: string; icon: typeof Mail }[] = [
  { id: "contact", label: "CONTACT ME", icon: Mail },
  { id: "about", label: "ABOUT ME", icon: Bot },
  { id: "system", label: "SYSTEM STATUS", icon: Activity },
];

export default function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const resizingRef = useRef(false);
  const [open, setOpen] = useState(true);
  const [height, setHeight] = useState(224);
  const [activeTab, setActiveTab] = useState<TabId>("contact");

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (!resizingRef.current || !containerRef.current) return;
      const bottom = containerRef.current.getBoundingClientRect().bottom;
      setHeight(
        Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, bottom - event.clientY)),
      );
    }
    function handleMouseUp() {
      resizingRef.current = false;
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex shrink-0 flex-col border-t border-divider bg-panel text-text"
    >
      {open && (
        <div
          onMouseDown={() => {
            resizingRef.current = true;
          }}
          className="absolute top-0 left-0 h-1 w-full cursor-row-resize hover:bg-overlay-strong"
        />
      )}

      <div className="flex h-9 shrink-0 items-center justify-between pr-2">
        <div className="flex h-full items-center text-[11px] font-medium tracking-wide">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex h-full cursor-pointer items-center gap-1.5 border-b-2 px-3 ${
                activeTab === id
                  ? "border-accent text-white"
                  : "border-transparent text-terminal-muted hover:text-hover-text-emphasis"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          title={open ? "Collapse panel" : "Expand panel"}
          aria-expanded={open}
          className="flex h-6 w-6 items-center justify-center text-text hover:text-white"
        >
          {open ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {open && (
        <div
          style={{ height }}
          className="overflow-y-auto px-4 py-2 font-mono text-[13px] leading-6"
        >
          <p className="text-terminal-muted">
            Last login: {new Date().toDateString()} on ttys002
          </p>
          {activeTab === "contact" && <ContactMeTab />}
          {activeTab === "about" && <AboutMeTab />}
          {activeTab === "system" && <SystemStatusTab />}
        </div>
      )}
    </div>
  );
}
