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
import pdfIcon from "material-icon-theme/icons/pdf.svg";
import { slugify, titleize } from "../utils/slug";
import { PROJECTS } from "./projects";

const FILE_ICONS: Record<string, string> = {
  tsx: reactTsIcon,
  html: htmlIcon,
  json: jsonIcon,
  md: markdownIcon,
  pdf: pdfIcon,
};

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
      "Cyber-Security-Engineer_2026.tsx",
      "DevOps-Specalist_2025.tsx",
      "Software-Developer_2024.tsx",
      "Quality-Engineer_2023.tsx",
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
    files: PROJECTS.map((project) => makeFile(project.fileName, project.path)),
  },
  {
    name: "Techstack",
    icon: layoutFolderIcon,
    iconOpen: layoutFolderOpenIcon,
    files: [makeFile("Skills.json", "/techstack")],
  },
];

export const ROOT_FILES: FileEntry[] = [makeFile("Resume.pdf", "/resume")];

export const ALL_FILES: FileEntry[] = [
  ...FOLDERS.flatMap((folder) => folder.files),
  ...ROOT_FILES,
];
