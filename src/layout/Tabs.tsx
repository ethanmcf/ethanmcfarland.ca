import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { ALL_FILES, type FileEntry } from "../data/folders";

export default function Tabs() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openTabs, setOpenTabs] = useState<FileEntry[]>([]);

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
    <div className="flex h-9 shrink-0 items-stretch overflow-hidden bg-panel">
      {openTabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            type="button"
            onClick={() => navigate(tab.path)}
            className={`group flex min-w-0 cursor-pointer items-center gap-2 border-[#2b2b2b] border-b-2 px-3 text-[13px] ${
              isActive
                ? "border-b-accent text-white/70"
                : "border-b-transparent text-muted hover:bg-white/[0.05]"
            }`}
          >
            <img src={tab.icon} alt="" className="h-4 w-4 shrink-0" />
            <span className="truncate">{tab.name}</span>
            <span
              role="button"
              tabIndex={-1}
              onClick={(event) => {
                event.stopPropagation();
                closeTab(tab.path);
              }}
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded hover:bg-white/10"
            >
              <X size={12} />
            </span>
          </button>
        );
      })}
    </div>
  );
}
