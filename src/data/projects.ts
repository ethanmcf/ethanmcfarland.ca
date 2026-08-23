export interface MediaItem {
  type: "image" | "video";
  src: string | null;
  caption: string;
}

export interface ProjectMetrics {
  commits: number;
  linesOfCode: number;
}

export interface Project {
  fileName: string;
  path: string;
  title: string;
  oneLiner: string;
  techStack: string[];
  metrics: ProjectMetrics;
  media: MediaItem[];
  about: string;
  features: string[];
  githubUrl: string;
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    fileName: "ProjectOne.md",
    path: "/projects/project-one",
    title: "Project One",
    oneLiner:
      "A one-sentence description of what this project does and why it matters.",
    techStack: ["React", "TypeScript", "Node.js"],
    metrics: { commits: 128, linesOfCode: 8400 },
    media: [
      { type: "image", src: null, caption: "Screenshot 1" },
      { type: "image", src: null, caption: "Screenshot 2" },
      { type: "video", src: null, caption: "Demo walkthrough" },
    ],
    about:
      "Describe the problem this project solves, who it's for, and the approach you took to build it.",
    features: [
      "Describe a key feature.",
      "Describe another key feature.",
      "Describe a third key feature.",
    ],
    githubUrl: "https://github.com/ethanmcf/project-one",
    liveUrl: "https://project-one.example.com",
  },
  {
    fileName: "ProjectTwo.md",
    path: "/projects/project-two",
    title: "Project Two",
    oneLiner:
      "A one-sentence description of what this project does and why it matters.",
    techStack: ["Python", "FastAPI"],
    metrics: { commits: 64, linesOfCode: 3200 },
    media: [
      { type: "image", src: null, caption: "Screenshot 1" },
      { type: "image", src: null, caption: "Screenshot 2" },
    ],
    about:
      "Describe the problem this project solves, who it's for, and the approach you took to build it.",
    features: [
      "Describe a key feature.",
      "Describe another key feature.",
    ],
    githubUrl: "https://github.com/ethanmcf/project-two",
  },
];
