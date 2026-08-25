import type { ReactNode } from "react";
import { EDUCATION } from "../data/education";

interface CodeLine {
  indent: number;
  content: ReactNode;
}

type TagColor =
  | "wrapper"
  | "leaf"
  | "timeline"
  | "metrics"
  | "scholarships"
  | "awards"
  | "coursework"
  | "extracurriculars";

const TAG_COLOR: Record<TagColor, string> = {
  wrapper: "text-code-class",
  leaf: "text-code-subtag",
  timeline: "text-code-keyword",
  metrics: "text-code-brace",
  scholarships: "text-code-bracket",
  awards: "text-code-string",
  coursework: "text-code-teal",
  extracurriculars: "text-code-number",
};

function OpenTag({ tag, color = "leaf" }: { tag: string; color?: TagColor }) {
  return (
    <>
      <span className="text-code-class">{"<"}</span>
      <span className={TAG_COLOR[color]}>{tag}</span>
      <span className="text-code-class">{">"}</span>
    </>
  );
}

function CloseTag({ tag, color = "leaf" }: { tag: string; color?: TagColor }) {
  return (
    <>
      <span className="text-code-class">{"</"}</span>
      <span className={TAG_COLOR[color]}>{tag}</span>
      <span className="text-code-class">{">"}</span>
    </>
  );
}

function leaf(
  tag: string,
  value: string,
  color: TagColor = "leaf",
  valueClassName = "text-content",
): ReactNode {
  return (
    <>
      <OpenTag tag={tag} color={color} />
      <span className={valueClassName}>{value}</span>
      <CloseTag tag={tag} color={color} />
    </>
  );
}

export default function Education() {
  const lines: CodeLine[] = [
    { indent: 0, content: <OpenTag tag="education" color="wrapper" /> },
    { indent: 1, content: leaf("institution", EDUCATION.institution) },
    { indent: 1, content: leaf("program", EDUCATION.program) },
    { indent: 1, content: null },
    { indent: 1, content: <OpenTag tag="timeline" color="timeline" /> },
    {
      indent: 2,
      content: leaf("start-date", EDUCATION.startDate, "timeline"),
    },
    {
      indent: 2,
      content: leaf(
        "expected-graduation",
        EDUCATION.expectedGraduation,
        "timeline",
      ),
    },
    { indent: 1, content: <CloseTag tag="timeline" color="timeline" /> },
    { indent: 1, content: null },
    { indent: 1, content: <OpenTag tag="metrics" color="metrics" /> },
    {
      indent: 2,
      content: leaf("gpa", EDUCATION.gpa, "metrics", "text-code-number"),
    },
    { indent: 1, content: <CloseTag tag="metrics" color="metrics" /> },
    { indent: 1, content: null },
    {
      indent: 1,
      content: <OpenTag tag="scholarships" color="scholarships" />,
    },
    ...EDUCATION.scholarships.map((scholarship) => ({
      indent: 2,
      content: leaf("scholarship", scholarship, "scholarships"),
    })),
    {
      indent: 1,
      content: <CloseTag tag="scholarships" color="scholarships" />,
    },
    { indent: 1, content: null },
    { indent: 1, content: <OpenTag tag="awards" color="awards" /> },
    ...EDUCATION.awards.map((award) => ({
      indent: 2,
      content: leaf("award", award, "awards"),
    })),
    { indent: 1, content: <CloseTag tag="awards" color="awards" /> },
    { indent: 1, content: null },
    {
      indent: 1,
      content: <OpenTag tag="relevant-coursework" color="coursework" />,
    },
    ...EDUCATION.coursework.map((course) => ({
      indent: 2,
      content: leaf("course", course, "coursework"),
    })),
    {
      indent: 1,
      content: <CloseTag tag="relevant-coursework" color="coursework" />,
    },
    { indent: 1, content: null },
    {
      indent: 1,
      content: (
        <OpenTag tag="extracurriculars" color="extracurriculars" />
      ),
    },
    ...EDUCATION.extracurriculars.flatMap((activity) => [
      {
        indent: 2,
        content: <OpenTag tag="activity" color="extracurriculars" />,
      },
      {
        indent: 3,
        content: leaf(
          "organization",
          activity.organization,
          "extracurriculars",
        ),
      },
      {
        indent: 3,
        content: leaf("role", activity.role, "extracurriculars"),
      },
      {
        indent: 2,
        content: <CloseTag tag="activity" color="extracurriculars" />,
      },
    ]),
    {
      indent: 1,
      content: (
        <CloseTag tag="extracurriculars" color="extracurriculars" />
      ),
    },
    { indent: 0, content: <CloseTag tag="education" color="wrapper" /> },
  ];

  return (
    <div className="p-4 font-mono text-[13px] leading-5.5 sm:p-8">
      {lines.map((line, index) => (
        <div key={index} className="flex">
          <span className="mr-4 w-6 shrink-0 text-right text-[13px] text-muted select-none">
            {index + 1}
          </span>
          <span style={{ paddingLeft: `${line.indent}rem` }}>
            {line.content}
          </span>
        </div>
      ))}
    </div>
  );
}
