import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { ALL_FILES, type FileEntry } from "../data/folders";

export default function Tabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openTabs, setOpenTabs] = useState<FileEntry[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ down: false, startX: 0, scrollLeft: 0, moved: false });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const drag = dragRef.current;
      if (!drag.down || !containerRef.current) return;
      const delta = event.clientX - drag.startX;
      if (Math.abs(delta) > 3) drag.moved = true;
      containerRef.current.scrollLeft = drag.scrollLeft - delta;
    }
    function handleMouseUp() {
      dragRef.current.down = false;
      setIsDragging(false);
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const file = ALL_FILES.find(
      (candidate) => candidate.path === location.pathname,
    );
    if (!file) return;
    setOpenTabs((prev) =>
      prev.some((tab) => tab.path === file.path) ? prev : [...prev, file],
    );
  }, [location.pathname]);

  const closeTab = (path: string) => {
    setOpenTabs((prev) => {
      const closedIndex = prev.findIndex((tab) => tab.path === path);
      const next = prev.filter((tab) => tab.path !== path);

      if (location.pathname === path) {
        const fallback = next[closedIndex - 1] ?? next[0];
        navigate(fallback ? fallback.path : "/");
      }

      return next;
    });
  };

  if (openTabs.length === 0) return null;

  return (
    <div
      ref={containerRef}
      onMouseDown={(event) => {
        if (!containerRef.current) return;
        dragRef.current = {
          down: true,
          startX: event.clientX,
          scrollLeft: containerRef.current.scrollLeft,
          moved: false,
        };
        setIsDragging(true);
      }}
      className={`flex h-9 shrink-0 items-stretch overflow-x-auto bg-panel [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
        isDragging ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
    >
      {openTabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            type="button"
            onClick={() => {
              if (dragRef.current.moved) return;
              navigate(tab.path);
            }}
            className={`group flex shrink-0 cursor-pointer items-center gap-2 border-divider border-b-2 px-3 text-[13px] ${
              isActive
                ? "border-b-accent text-content"
                : "border-b-transparent text-muted hover:bg-overlay-weak"
            }`}
          >
            <img src={tab.icon} alt="" className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">
              {tab.name}
              {tab.name.endsWith(".md") ? " (Preview)" : ""}
            </span>
            <span
              role="button"
              tabIndex={-1}
              onClick={(event) => {
                event.stopPropagation();
                closeTab(tab.path);
              }}
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded hover:bg-overlay-soft"
            >
              <X size={12} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
