export interface RoleDetails {
  role: string;
  company: string;
  season: string;
  year: string;
  location: string;
  team: string;
  isRemote: boolean;
  skills: string[];
  bullets: string[];
}

export const EXPERIENCE_FILE: Record<string, RoleDetails> = {
  "/experience/quality-engineer_2023": {
    role: "QualityEngineerIntern",
    company: "CompanyName",
    season: "Season",
    year: "20XX",
    location: "City, Province",
    team: "Team Name",
    isRemote: false,
    skills: ["TypeScript", "Cypress", "SQL"],
    bullets: [
      "Add a bullet point describing a responsibility or impact.",
      "Add another bullet point.",
    ],
  },
  "/experience/software-developer_2024": {
    role: "SoftwareDeveloperIntern",
    company: "CompanyName",
    season: "Season",
    year: "20XX",
    location: "City, Province",
    team: "Team Name",
    isRemote: false,
    skills: ["TypeScript", "React", "Node"],
    bullets: [
      "Add a bullet point describing a responsibility or impact.",
      "Add another bullet point.",
    ],
  },
  "/experience/dev-ops-specalist_2025": {
    role: "DevOpsSpecialistIntern",
    company: "CompanyName",
    season: "Season",
    year: "20XX",
    location: "City, Province",
    team: "Team Name",
    isRemote: false,
    skills: ["Docker", "Kubernetes", "AWS"],
    bullets: [
      "Add a bullet point describing a responsibility or impact.",
      "Add another bullet point.",
    ],
  },
  "/experience/cyber-security-engineer_2026": {
    role: "CyberSecurityEngineerIntern",
    company: "Scotiabank",
    season: "Summer",
    year: "2026",
    location: "Toronto, ON",
    team: "Data Loss Prevention - Exceptions Management",
    isRemote: false,
    skills: ["Python", "Nmap", "Splunk"],
    bullets: [
      "Add a bullet point describing a responsibility or impact.",
      "Add another bullet point.",
    ],
  },
};
