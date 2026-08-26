import { useEffect, useRef, useState } from "react";
import { Activity, Bot, ChevronDown, ChevronUp, Mail } from "lucide-react";
import ContactMeTab from "./terminal/ContactMeTab";
import AboutMeTab from "./terminal/AboutMeTab";
import SystemStatusTab from "./terminal/SystemStatusTab";
import { useIsMobile } from "../utils/useIsMobile";

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
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(() => !isMobile);
  const [height, setHeight] = useState(224);
  const [activeTab, setActiveTab] = useState<TabId>("contact");

  useEffect(() => {
    if (isMobile) setOpen(false);
  }, [isMobile]);

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
      className={`flex flex-col border-t border-divider bg-panel text-text ${
        isMobile && open
          ? "fixed top-0 right-0 left-12 z-50 h-dvh"
          : "relative shrink-0"
      }`}
    >
      {open && !isMobile && (
        <div
          onMouseDown={() => {
            resizingRef.current = true;
          }}
          className="absolute top-0 left-0 h-1 w-full cursor-row-resize hover:bg-overlay-strong"
        />
      )}

      <div
        onClick={isMobile ? () => setOpen((prev) => !prev) : undefined}
        className="flex h-9 min-w-0 shrink-0 items-center justify-between pr-2"
      >
        <div className="flex h-full min-w-0 items-center overflow-x-auto text-[11px] font-medium tracking-wide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setActiveTab(id);
                if (isMobile) setOpen(true);
              }}
              title={label}
              className={`flex h-full shrink-0 cursor-pointer items-center gap-1.5 border-b-2 px-3 ${
                activeTab === id
                  ? "border-accent text-white"
                  : "border-transparent text-terminal-muted hover:text-hover-text-emphasis"
              }`}
            >
              <Icon size={14} className="h-5 w-5 sm:h-3.5 sm:w-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setOpen((prev) => !prev);
          }}
          title={open ? "Collapse panel" : "Expand panel"}
          aria-expanded={open}
          className="flex h-6 w-6 items-center justify-center text-text hover:text-white"
        >
          {open ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {open && (
        <div
          style={isMobile ? undefined : { height }}
          className={`overflow-y-auto px-4 py-2 font-mono text-base leading-6 md:text-[13px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isMobile ? "flex-1" : ""
          }`}
        >
          {activeTab === "contact" && <ContactMeTab />}
          {activeTab === "about" && <AboutMeTab />}
          {activeTab === "system" && <SystemStatusTab />}
        </div>
      )}
    </div>
  );
}
