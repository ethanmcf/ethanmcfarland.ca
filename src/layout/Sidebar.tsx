import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { FOLDERS, ROOT_FILES } from "../data/folders";

const MIN_WIDTH = 180;
const MAX_WIDTH = 480;

const FOLDER_ROW_CHROME = 74; // pl-6 + chevron + gap + icon + gap + pr-2
const FILE_ROW_CHROME = 82; // pl-[3.25rem] + icon + gap + breathing room
const RESIZE_HANDLE_BUFFER = 12;

function measureDefaultWidth(): number {
  if (typeof document === "undefined") return 240;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return 240;
  context.font = "13px ui-sans-serif, system-ui, sans-serif";

  const widest = Math.max(
    ...FOLDERS.flatMap((folder) => [
      context.measureText(folder.name).width + FOLDER_ROW_CHROME,
      ...folder.files.map(
        (file) => context.measureText(file.name).width + FILE_ROW_CHROME,
      ),
    ]),
    ...ROOT_FILES.map(
      (file) => context.measureText(file.name).width + FOLDER_ROW_CHROME,
    ),
  );

  return Math.min(
    MAX_WIDTH,
    Math.max(MIN_WIDTH, Math.ceil(widest) + RESIZE_HANDLE_BUFFER),
  );
}

export default function Sidebar() {
  const asideRef = useRef<HTMLElement>(null);
  const resizingRef = useRef(false);
  const [width, setWidth] = useState(measureDefaultWidth);
  const [treeOpen, setTreeOpen] = useState(true);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(FOLDERS.map((folder) => [folder.name, true])),
  );

  const toggleFolder = (name: string) => {
    setOpenFolders((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (!resizingRef.current || !asideRef.current) return;
      const left = asideRef.current.getBoundingClientRect().left;
      setWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, event.clientX - left)));
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
    <aside
      ref={asideRef}
      style={{ width }}
      className="relative flex h-full shrink-0 flex-col overflow-hidden border-r border-[#2b2b2b] bg-panel text-muted selection:bg-transparent selection:text-inherit"
    >
      <h2 className="px-4 pt-4 pb-2 text-[11px] font-bold tracking-wide text-muted">
        EXPLORER
      </h2>

      <button
        type="button"
        onClick={() => setTreeOpen((prev) => !prev)}
        className="group flex w-full items-center gap-1 px-2 py-1 text-left text-[11px] font-bold tracking-wide text-muted hover:text-hover"
      >
        {treeOpen ? (
          <ChevronDown
            size={14}
            className="shrink-0 text-muted group-hover:text-hover"
          />
        ) : (
          <ChevronRight
            size={14}
            className="shrink-0 text-muted group-hover:text-hover"
          />
        )}
        ETHANMCFARLAND.CA
      </button>

      {treeOpen && (
        <ul>
          {FOLDERS.map((folder) => {
            const isOpen = openFolders[folder.name];
            return (
              <li key={folder.name} className="relative">
                {isOpen && (
                  <div className="pointer-events-none absolute top-[22px] bottom-[0px] left-[29px] w-px bg-white/10" />
                )}
                <button
                  type="button"
                  onClick={() => toggleFolder(folder.name)}
                  className="group flex w-full cursor-pointer items-center gap-1.5 py-[3px] pr-2 pl-6 text-left text-[13px] whitespace-nowrap text-muted hover:bg-white/[0.05] hover:text-white/50"
                >
                  {isOpen ? (
                    <ChevronDown size={14} className="shrink-0 text-muted" />
                  ) : (
                    <ChevronRight
                      size={14}
                      className="shrink-0 text-muted group-hover:text-hover"
                    />
                  )}
                  <img
                    src={isOpen ? folder.iconOpen : folder.icon}
                    alt=""
                    className="h-4 w-4 shrink-0"
                  />
                  {folder.name}
                </button>

                {isOpen &&
                  folder.files.map((file) => (
                    <NavLink
                      key={file.path}
                      to={file.path}
                      className={({ isActive }) =>
                        `flex items-center gap-1.5 py-[3px] pr-2 pl-[3.25rem] text-[13px] whitespace-nowrap ${
                          isActive
                            ? "bg-white/[0.05] text-white/70"
                            : "text-muted hover:bg-white/[0.05] hover:text-white/20"
                        }`
                      }
                    >
                      <img
                        src={file.icon}
                        alt=""
                        className="h-4 w-4 shrink-0"
                      />
                      {file.name}
                    </NavLink>
                  ))}
              </li>
            );
          })}

          {ROOT_FILES.map((file) => (
            <li key={file.path}>
              <NavLink
                to={file.path}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 py-[3px] pr-2 pl-6 text-[13px] whitespace-nowrap ${
                    isActive
                      ? "bg-white/[0.05] text-white/70"
                      : "text-muted hover:bg-white/[0.05] hover:text-white/20"
                  }`
                }
              >
                <img src={file.icon} alt="" className="h-4 w-4 shrink-0" />
                {file.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <FontAwesomeIcon
            icon={faCodeBranch}
            className="h-3.5 w-3.5 shrink-0 text-muted"
          />
          <span className="truncate text-[13px] text-muted">
            main/ethan-mcfarland
          </span>
        </div>
      </div>

      <div
        onMouseDown={() => {
          resizingRef.current = true;
        }}
        className="absolute top-0 right-0 h-full w-1 cursor-col-resize hover:bg-white/20"
      />
    </aside>
  );
}
