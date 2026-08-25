import { EDUCATION } from "./education";
import { EXPERIENCE_FILE } from "./experience";
import { SKILLS } from "./techstack";
import { titleize } from "../utils/slug";

export interface AboutCommand {
  command: string;
  question: string;
  aliases: string[];
  run: () => string[];
  featured?: boolean;
}

const experienceLines = Object.values(EXPERIENCE_FILE)
  .slice()
  .reverse()
  .map(
    (entry) =>
      `${titleize(entry.role)} — ${entry.company} (${entry.season} ${entry.year})`,
  );

const funFacts = [
  "I play for the Varsity Blues Men's Hockey Team while studying CS full-time.",
  "This entire site is a hand-built VS Code clone — even this terminal.",
  "I have broken 3 bones.",
  "I'm a 6 handicap in golf.",
  "I practiced with the Leafs during the 2026 Winter Olympics.",
];

export const ABOUT_COMMANDS: AboutCommand[] = [
  {
    command: "help",
    question: "What can I ask you?",
    aliases: ["commands", "menu", "options", "?"],
    run: () => [
      "A few ideas to get started (feel free to ask in your own words):",
      ...ABOUT_COMMANDS.filter((entry) => entry.featured).map(
        (entry) => `  "${entry.question}"`,
      ),
      '  "clear" — clear the terminal',
    ],
  },
  {
    command: "education",
    question: "Where did you study?",
    aliases: ["school", "university", "college", "study", "degree", "gpa"],
    featured: true,
    run: () => [
      `${EDUCATION.institution} — ${EDUCATION.program}`,
      `GPA ${EDUCATION.gpa} · ${EDUCATION.startDate} → ${EDUCATION.expectedGraduation}`,
      ...EDUCATION.awards,
    ],
  },
  {
    command: "experience",
    question: "Where have you worked?",
    aliases: ["work", "job", "jobs", "career", "worked", "internship"],
    featured: true,
    run: () => experienceLines,
  },
  {
    command: "skills",
    question: "What tech do you use?",
    aliases: ["tech", "stack", "languages", "tools", "technologies"],
    run: () => [
      `Languages: ${SKILLS.languages.join(", ")}`,
      `Frameworks: ${SKILLS.frameworksAndLibraries.join(", ")}`,
      `Infra/DevOps: ${SKILLS.infrastructureAndDevOps.join(", ")}`,
    ],
  },
  {
    command: "hobbies",
    question: "What do you do outside of code?",
    aliases: ["interests", "fun", "sports", "hockey", "outside of code"],
    run: () =>
      EDUCATION.extracurriculars.map(
        (activity) => `${activity.role}, ${activity.organization}`,
      ),
  },
  {
    command: "fun-fact",
    question: "Tell me something interesting",
    aliases: ["fun fact", "funfact", "surprise", "random", "interesting"],
    featured: true,
    run: () => [funFacts[Math.floor(Math.random() * funFacts.length)]],
  },
  {
    command: "bones",
    question: "Have you broken any bones?",
    aliases: ["bones", "broken bones", "broken bone", "injuries", "injury"],
    run: () => ["I've broken 3 bones."],
  },
  {
    command: "olympics",
    question: "Have you played in the Olympics?",
    aliases: ["olympics", "winter olympics", "leafs", "maple leafs"],
    run: () => ["I practiced with the Leafs during the 2026 Winter Olympics."],
  },
  {
    command: "golf",
    question: "Do you play golf?",
    aliases: ["golf", "handicap", "golfer"],
    featured: true,
    run: () => ["I'm a 6 handicap in golf."],
  },
  {
    command: "girlfriend",
    question: "Do you have a girlfriend?",
    aliases: ["girlfriend", "dating", "relationship", "dani", "single", "girl"],
    run: () => [
      "Yes ... the lovely, perfect Dani Sacks.",
      "LinkedIn: https://www.linkedin.com/in/danielle-sacks-34b7a2298/",
    ],
  },
  {
    command: "contact",
    question: "How can I get in touch?",
    aliases: ["email", "reach", "message", "hire", "get in touch"],
    run: () => ['Switch to the "Contact Me" tab above to send a message.'],
  },
];
