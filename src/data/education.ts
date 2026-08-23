export interface Activity {
  organization: string;
  role: string;
}

export interface EducationDetails {
  institution: string;
  program: string;
  startDate: string;
  expectedGraduation: string;
  gpa: string;
  scholarships: string[];
  awards: string[];
  coursework: string[];
  extracurriculars: Activity[];
}

export const EDUCATION: EducationDetails = {
  institution: "University of Toronto",
  program: "Honours Bachelor of Science in Computer Science",
  startDate: "September 2022",
  expectedGraduation: "April 2027",
  gpa: "3.96",
  scholarships: [
    "Dr. James A. & Connie P. Dickson Scholarship In Science & Mathematics",
    "Louis Savlov (Uc'37) Scholarships In Sciences And Humanities At University College",
  ],
  awards: ["Four-time Dean's List Scholar", "U SPORTS Academic All-Canadian"],
  coursework: [
    "Data Structures & Algorithm Design",
    "Machine Learning & Neural Networks",
    "Operating Systems & Systems Programming",
    "Web and Mobile Application Architecture",
  ],
  extracurriculars: [
    { organization: "Varsity Blues Men's Hockey Team", role: "Student-Athlete" },
    { organization: "UofT AI Club", role: "Member" },
  ],
};
