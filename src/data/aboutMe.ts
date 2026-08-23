import { EDUCATION } from "./education";
import { EXPERIENCE_FILE } from "./experience";
import { SKILLS } from "./techstack";
import { titleize } from "../utils/slug";

export interface AboutCommand {
  command: string;
  summary: string;
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
    summary: "list available commands",
    run: () => [
      ...ABOUT_COMMANDS.map(
        (entry) => `${entry.command.padEnd(12)} ${entry.summary}`,
      ),
      `${"clear".padEnd(12)} clear the terminal`,
    ],
  },
  {
    command: "education",
    summary: "where I studied",
    run: () => [
      `${EDUCATION.institution} — ${EDUCATION.program}`,
      `GPA ${EDUCATION.gpa} · ${EDUCATION.startDate} → ${EDUCATION.expectedGraduation}`,
      ...EDUCATION.awards,
    ],
  },
  {
    command: "experience",
    summary: "where I've worked",
    run: () => experienceLines,
  },
  {
    command: "skills",
    summary: "languages & tools I use",
    run: () => [
      `Languages: ${SKILLS.languages.join(", ")}`,
      `Frameworks: ${SKILLS.frameworksAndLibraries.join(", ")}`,
      `Infra/DevOps: ${SKILLS.infrastructureAndDevOps.join(", ")}`,
    ],
  },
  {
    command: "hobbies",
    summary: "what I do outside of code",
    run: () =>
      EDUCATION.extracurriculars.map(
        (activity) => `${activity.role}, ${activity.organization}`,
      ),
  },
  {
    command: "fun-fact",
    summary: "something you might not expect",
    run: () => [funFacts[Math.floor(Math.random() * funFacts.length)]],
  },
  {
    command: "contact",
    summary: "get in touch",
    run: () => ['Switch to the "Contact Me" tab above to send a message.'],
  },
];
