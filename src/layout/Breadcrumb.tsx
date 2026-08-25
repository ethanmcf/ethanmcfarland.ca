import { useLocation } from "react-router-dom";
import { FOLDERS, ROOT_FILES } from "../data/folders";

export default function Breadcrumb() {
  const location = useLocation();

  const folder = FOLDERS.find((candidate) =>
    candidate.files.some((file) => file.path === location.pathname),
  );
  const file =
    folder?.files.find((candidate) => candidate.path === location.pathname) ??
    ROOT_FILES.find((candidate) => candidate.path === location.pathname);

  if (!file) return null;

  return (
    <div className="flex shrink-0 items-center gap-1.5 px-4 py-1.5 text-[12px] text-muted">
      {folder && (
        <>
          <span>{folder.name}</span>
          <span>{">"}</span>
        </>
      )}
      <img src={file.icon} alt="" className="h-3.5 w-3.5 shrink-0" />
      <span>{file.name}</span>
    </div>
  );
}
