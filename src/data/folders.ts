import srcFolderIcon from "material-icon-theme/icons/folder-src.svg";
import srcFolderOpenIcon from "material-icon-theme/icons/folder-src-open.svg";
import resourceFolderIcon from "material-icon-theme/icons/folder-resource.svg";
import resourceFolderOpenIcon from "material-icon-theme/icons/folder-resource-open.svg";
import publicFolderIcon from "material-icon-theme/icons/folder-public.svg";
import publicFolderOpenIcon from "material-icon-theme/icons/folder-public-open.svg";
import layoutFolderIcon from "material-icon-theme/icons/folder-layout.svg";
import layoutFolderOpenIcon from "material-icon-theme/icons/folder-layout-open.svg";
import reactTsIcon from "material-icon-theme/icons/react_ts.svg";
import htmlIcon from "material-icon-theme/icons/html.svg";
import jsonIcon from "material-icon-theme/icons/json.svg";
import markdownIcon from "material-icon-theme/icons/markdown.svg";

const FILE_ICONS: Record<string, string> = {
  tsx: reactTsIcon,
  html: htmlIcon,
  json: jsonIcon,
  md: markdownIcon,
};

function stripExt(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "");
}

function slugify(fileName: string) {
  return stripExt(fileName)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

function titleize(fileName: string) {
  return stripExt(fileName).replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}

export interface FileEntry {
  name: string;
  path: string;
  title: string;
  icon: string;
}

function makeFile(name: string, path: string): FileEntry {
  const ext = name.split(".").pop() ?? "";
  return {
    name,
    path,
    title: titleize(name),
    icon: FILE_ICONS[ext] ?? reactTsIcon,
  };
}

export interface FolderEntry {
  name: string;
  icon: string;
  iconOpen: string;
  files: FileEntry[];
}

export const FOLDERS: FolderEntry[] = [
  {
    name: "Experience",
    icon: srcFolderIcon,
    iconOpen: srcFolderOpenIcon,
    files: [
      "QualityEngineerIntern.tsx",
      "SoftwareDeveloperIntern.tsx",
      "DevOpsSpecalistIntern.tsx",
      "CyberSecurityEngineer.tsx",
    ].map((name) => makeFile(name, `/experience/${slugify(name)}`)),
  },
  {
    name: "Education",
    icon: resourceFolderIcon,
    iconOpen: resourceFolderOpenIcon,
    files: [makeFile("UniverstiyOfToronto.html", "/education")],
  },
  {
    name: "Projects",
    icon: publicFolderIcon,
    iconOpen: publicFolderOpenIcon,
    files: [makeFile("Projects.md", "/projects")],
  },
  {
    name: "Techstack",
    icon: layoutFolderIcon,
    iconOpen: layoutFolderOpenIcon,
    files: [makeFile("Skills.json", "/techstack")],
  },
];
