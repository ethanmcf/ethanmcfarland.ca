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
    fileName: "LightKV.md",
    path: "/projects/lightkv",
    title: "LightKV",
    oneLiner:
      "LightKV is a custom, lightweight database engine built from scratch in C++.",
    techStack: ["C++", "POSIX", "Caching", "Database Architecture"],
    metrics: { commits: 74, linesOfCode: 9000 },
    media: [
      {
        type: "image",
        src: "/projects/lightkv/get-throughput-results.png",
        caption: "Get Throughput Results",
      },
      {
        type: "image",
        src: "/projects/lightkv/insert-throughput-results.png",
        caption: "Insert Throughput Results",
      },
      {
        type: "image",
        src: "/projects/lightkv/scan-throughput-results.png",
        caption: "Scan Throughput Results",
      },
      {
        type: "image",
        src: "/projects/lightkv/scan-throughput-fixed-results.png",
        caption: "Scan Throughput Fix Keys Results",
      },
    ],
    about:
      "The system utilizes a Log-Structured Merge (LSM) tree architecture to handle datasets larger than available memory through an optimized disk-based storage system. It uses an in-memory memtable backed by a red-black tree for rapid writes, which automatically flushes data into Sorted String Table (SST) files on disk. Performance is accelerated through a dynamic buffer pool and Bloom filters that actively reduce unnecessary disk I/O.",
    features: [
      "Core database API supporting open, put, get, scan, and delete operations",
      "Red-black tree memtable that processes standard operations and automatically flushes to SSTs at capacity",
      "Integrated Bloom filters to efficiently skip non-existent keys and reduce unnecessary disk reads",
      "Dynamic buffer pool utilizing an extendible hash table and clock eviction for efficient page caching",
      "Dostoevsky LSM compaction policy using min-heap multi-way merging to efficiently handle cascading file merges",
    ],
    githubUrl: "https://github.com/ethanmcf/LightKV/blob/main/report.md",
  },
  {
    fileName: ".md",
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
