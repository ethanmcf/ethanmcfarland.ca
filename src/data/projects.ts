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
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    fileName: "JERC-Sentry.md",
    path: "/projects/JERC-Sentry",
    title: "JERC Sentry",
    oneLiner: "Realtime AI Scam Call Defence",
    techStack: [
      "FastAPI",
      "Flutter",
      "SQL",
      "Firebase",
      "Telnyx",
      "Groq",
      "Deepgram",
      "Github Actions",
      "pytest",
    ],
    metrics: { commits: 215, linesOfCode: 12000 },
    media: [
      {
        type: "video",
        src: "/projects/jerc-sentry/demo-video.mp4",
        caption: "Demo walkthrough",
      },
      {
        type: "image",
        src: "/projects/jerc-sentry/topology.jpg",
        caption: "Architecture",
      },
    ],
    about:
      "JERC Sentry is a real-time telephony security platform that protects users from voice scams at the network level. It analyzes live call audio for threats with sub-second latency and immediately alerts a designated protector via a push notifications to a mobile app if fraud is detected, allowing them to remotely intervene or terminate the call.",
    features: [
      "Real-time speech-to-text and AI threat classification powered by Deepgram and Groq APIs",
      "Event-driven FastAPI and WebSocket backend with Telnyx for network-level call control",
      "Flutter mobile app utilizing Firebase push notifications for family intervention",
      "Automated infrastructure and deployment through Terraform and Github Actions",
    ],
    docsUrl: "https://jerc-beta.pages.dev/",
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
    features: ["Describe a key feature.", "Describe another key feature."],
    githubUrl: "https://github.com/ethanmcf/project-two",
  },
];
