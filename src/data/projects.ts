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
    fileName: "UofT-Booking-Bot.md",
    path: "/projects/uoft-booking-bot",
    title: "UofT Booking Bot",
    oneLiner:
      "Automated desktop booking tool for University of Toronto recreational activities.",
    techStack: ["Python", "SQLite", "Playwright", "PyQt"],
    metrics: { commits: 118, linesOfCode: 7000 },
    media: [
      {
        type: "video",
        src: "/projects/uoft-booking-bot/demo-video.mp4",
        caption: "Demo Video",
      },
    ],
    about:
      "UofT Booking Bot is a Playwright web scraping application featuring a PyQt6 desktop GUI designed to secure high-demand golf slots at the University of Toronto. The system integrates SQLite and native OS schedulers to automate registrations at exact intervals, consistently securing reservations in under two seconds.",
    features: [
      "Automated booking scheduling executed at precise time intervals",
      "Captcha bypassing to maintain uninterrupted registration flows",
      "Dynamic retry logic to handle server lag during peak demand",
      "Desktop GUI built with PyQt6 for accessible user configuration",
      "Local SQLite database integration for reliable session management",
    ],
    githubUrl: "https://github.com/ethanmcf/UofTBookingBot",
    docsUrl: "http://ethanmcf.github.io/UofTBookingBot/",
  },
  {
    fileName: "Notion-Network-Sync.md",
    path: "/projects/notion-network-sync",
    title: "Notion Network Sync",
    oneLiner:
      "An automated system that extracts LinkedIn messages, enriches them using AI, and syncs the data directly into a Notion database.",
    techStack: [
      "Kubernetes",
      "Cronjob",
      "SQLite",
      "Playwright",
      "Python",
      "Notion API",
      "OpenAI API",
      "Docker",
    ],
    metrics: { commits: 19, linesOfCode: 2400 },
    media: [
      {
        type: "image",
        src: "/projects/notion-network-sync/NotionDB.jpg",
        caption: "DB",
      },
    ],
    about:
      "Notion Network Sync is an automated, scalable Python monorepo that containerizes two independent services to synchronize and enrich professional communications. Utilizing Docker and Kubernetes CronJobs, the system extracts recent LinkedIn messages via Playwright, tracks state with SQLite, and enriches the notes using the OpenAI GPT API before securely updating corresponding Notion database contact pages.",
    features: [
      "Automated LinkedIn message extraction leveraging Playwright to parse recent communications",
      "Containerized microservices architecture built with Docker for seamless and scalable deployment",
      "Continuous Notion database polling to detect page updates using last-modified timestamps",
      "Natural language formatting and context enrichment powered by the OpenAI GPT API",
      "Scheduled, hands-off execution managed by Kubernetes CronJobs for reliable synchronization",
    ],
    githubUrl: "https://github.com/ethanmcf/Notion-Network-Sync",
  },
  {
    fileName: "Express-Hockey-Development.md",
    path: "/projects/Express-Hockey-Development",
    title: "Express Hockey Development",
    oneLiner: "Registration and payment platform for hockey training programs.",
    techStack: ["React", "TypeScript", "Cloud Functions", "Firebase", "Stripe"],
    metrics: { commits: 67, linesOfCode: 14000 },
    media: [
      {
        type: "video",
        src: "/projects/express-hockey-dev/site-demo.mov",
        caption: "Demo Video",
      },
      {
        type: "video",
        src: "/projects/express-hockey-dev/admin-demo.mov",
        caption: "Admin Demo Video",
      },
      {
        type: "image",
        src: "/projects/express-hockey-dev/email.png",
        caption: "Email Example",
      },
    ],
    about:
      "Express Hockey Development is a full-stack web application designed to manage registrations and payments for hockey training programs. Built with React and TypeScript, the platform allows parents to seamlessly register skaters and pay via Stripe, while providing administrators with a secure, serverless Firebase dashboard to manage sessions, users, and capacity.",
    features: [
      "Secure checkout flow powered by Stripe PaymentIntents and Firebase Cloud Functions",
      "Protected admin dashboard managed via Firebase Auth custom claims for secure CRUD operations",
      "Automated soft-hold reservation system with scheduled cleanup functions to prevent overbooking",
      "Automated email confirmations and capacity alerts triggered by Resend and Stripe webhooks",
    ],
    githubUrl: "https://github.com/Emac-Software/ExpressHockeyDev",
    liveUrl: "http://expresshockeydevelopment.com/",
  },
  // {
  //   fileName: "ULA-Healthcare.md",
  //   path: "/projects/ula-healthcare",
  //   title: "ULA Healthcare",
  //   oneLiner:
  //     "Automated desktop booking tool for University of Toronto recreational activities.",
  //   techStack: ["Python", "SQLite", "Playwright", "PyQt"],
  //   metrics: { commits: 118, linesOfCode: 7000 },
  //   media: [
  //     {
  //       type: "video",
  //       src: "/projects/uoft-booking-bot/demo-video.mp4",
  //       caption: "Demo Video",
  //     },
  //   ],
  //   about:
  //     "UofT Booking Bot is a Playwright web scraping application featuring a PyQt6 desktop GUI designed to secure high-demand golf slots at the University of Toronto. The system integrates SQLite and native OS schedulers to automate registrations at exact intervals, consistently securing reservations in under two seconds.",
  //   features: [
  //     "Automated booking scheduling executed at precise time intervals",
  //     "Captcha bypassing to maintain uninterrupted registration flows",
  //     "Dynamic retry logic to handle server lag during peak demand",
  //     "Desktop GUI built with PyQt6 for accessible user configuration",
  //     "Local SQLite database integration for reliable session management",
  //   ],
  //   githubUrl: "https://github.com/ethanmcf/UofTBookingBot",
  //   docsUrl: "http://ethanmcf.github.io/UofTBookingBot/",
  // },
];
