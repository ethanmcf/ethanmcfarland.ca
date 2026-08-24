import { EDUCATION } from "./education";
import { EXPERIENCE_FILE } from "./experience";
import { SKILLS } from "./techstack";
import { titleize } from "../utils/slug";

export interface AboutCommand {
  command: string;
  question: string;
  aliases: string[];
  run: () => string[];
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
  "Four-time Dean's List Scholar and a U SPORTS Academic All-Canadian.",
  "This entire site is a hand-built VS Code clone — even this terminal.",
];

export const ABOUT_COMMANDS: AboutCommand[] = [
  {
    command: "help",
    question: "What can I ask you?",
    aliases: ["commands", "menu", "options", "?"],
    run: () => [
      "A few ideas to get started (feel free to ask in your own words):",
      ...ABOUT_COMMANDS.map((entry) => `  "${entry.question}"`),
      '  "clear" — clear the terminal',
    ],
  },
  {
    command: "education",
    question: "Where did you study?",
    aliases: ["school", "university", "college", "study", "degree", "gpa"],
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
    run: () => [funFacts[Math.floor(Math.random() * funFacts.length)]],
  },
  {
    command: "contact",
    question: "How can I get in touch?",
    aliases: ["email", "reach", "message", "hire", "get in touch"],
    run: () => ['Switch to the "Contact Me" tab above to send a message.'],
  },
];
