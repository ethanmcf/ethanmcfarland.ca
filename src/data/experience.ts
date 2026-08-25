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
    company: "Tangerine",
    season: "Summer",
    year: "2023",
    location: "Toronto, ON",
    team: "Regression Testing",
    isRemote: false,
    skills: ["TypeScript", "Java", "Jenkins"],
    bullets: [
      "Restructured Selenium WebDriver to optimize mobile web testing speed by over 25%.",
      "Developed custom automated testing scripts TypeScript for web and mobile applications.",
      "Expanded automated front-end and API test coverage by 10%.",
      "Triaged test failures, analyzed logs, and reported detailed defects to development teams to accelerate bug fixes.",
    ],
  },
  "/experience/software-developer_2024": {
    role: "SoftwareDeveloperIntern",
    company: "Scoitabank",
    season: "Summer",
    year: "2024",
    location: "Toronto, ON",
    team: "Internal Platforms",
    isRemote: true,
    skills: ["JavaScript", "SQL", "HTML", "CSS"],
    bullets: [
      "Engineered a reusable ServiceNow component to standardize customer data acquisition.",
      "Reduced manual data input by 40% and enforced cross-form data consistency.",
      "Built customized front-end form experiences using JavaScript.",
    ],
  },
  "/experience/dev-ops-specalist_2025": {
    role: "DevOpsSpecialistIntern",
    company: "Tangerine",
    season: "Summer",
    year: "2025",
    location: "Toronto, ON",
    team: "Release Management",
    isRemote: false,
    skills: ["Docker", "Kubernetes", "GCP", "Bash"],
    bullets: [
      "Orchestrated 20+ Kubernetes microservices across 5 development environments.",
      "Built automated CI/CD pipelines using Jenkins and Bash.",
      "Cut manual integration branch deployments by 30%.",
      "Configured custom Dynatrace alerts and log monitoring to proactively catch microservice outages.",
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
    skills: ["DLP", "IAM", "Risk Assessment", "Jira"],
    bullets: [
      "Managed 150+ cybersecurity exceptions across Scotiabank using Jira and ServiceNow.",
      "Assessed security risks for removable media, external sites, and SSL/TLS bypasses to ensure governance compliance.",
      "Resolved access vulnerabilities by building automated checks for DLP violations and large datalake access into daily workflows.",
      "Restructured renewal exception workflows for seamless integration with adjacent implementation teams.",
    ],
  },
};
