import type { ReactNode } from "react";
import { EDUCATION } from "../data/education";

interface CodeLine {
  indent: number;
  content: ReactNode;
}

type TagVariant = "container" | "subtag";

const TAG_COLOR: Record<TagVariant, string> = {
  container: "text-code-class",
  subtag: "text-code-subtag",
};

function OpenTag({ tag, variant = "subtag" }: { tag: string; variant?: TagVariant }) {
  return (
    <>
      <span className="text-code-class">{"<"}</span>
      <span className={TAG_COLOR[variant]}>{tag}</span>
      <span className="text-code-class">{">"}</span>
    </>
  );
}

function CloseTag({ tag, variant = "subtag" }: { tag: string; variant?: TagVariant }) {
  return (
    <>
      <span className="text-code-class">{"</"}</span>
      <span className={TAG_COLOR[variant]}>{tag}</span>
      <span className="text-code-class">{">"}</span>
    </>
  );
}

function leaf(
  tag: string,
  value: string,
  valueClassName = "text-content",
): ReactNode {
  return (
    <>
      <OpenTag tag={tag} />
      <span className={valueClassName}>{value}</span>
      <CloseTag tag={tag} />
    </>
  );
}

export default function Education() {
  const lines: CodeLine[] = [
    { indent: 0, content: <OpenTag tag="education" variant="container" /> },
    { indent: 1, content: leaf("institution", EDUCATION.institution) },
    { indent: 1, content: leaf("program", EDUCATION.program) },
    { indent: 1, content: null },
    { indent: 1, content: <OpenTag tag="timeline" variant="container" /> },
    { indent: 2, content: leaf("start-date", EDUCATION.startDate) },
    {
      indent: 2,
      content: leaf("expected-graduation", EDUCATION.expectedGraduation),
    },
    { indent: 1, content: <CloseTag tag="timeline" variant="container" /> },
    { indent: 1, content: null },
    { indent: 1, content: <OpenTag tag="metrics" variant="container" /> },
    { indent: 2, content: leaf("gpa", EDUCATION.gpa, "text-code-number") },
    { indent: 1, content: <CloseTag tag="metrics" variant="container" /> },
    { indent: 1, content: null },
    { indent: 1, content: <OpenTag tag="scholarships" variant="container" /> },
    ...EDUCATION.scholarships.map((scholarship) => ({
      indent: 2,
      content: leaf("scholarship", scholarship),
    })),
    { indent: 1, content: <CloseTag tag="scholarships" variant="container" /> },
    { indent: 1, content: null },
    { indent: 1, content: <OpenTag tag="awards" variant="container" /> },
    ...EDUCATION.awards.map((award) => ({
      indent: 2,
      content: leaf("award", award),
    })),
    { indent: 1, content: <CloseTag tag="awards" variant="container" /> },
    { indent: 1, content: null },
    {
      indent: 1,
      content: <OpenTag tag="relevant-coursework" variant="container" />,
    },
    ...EDUCATION.coursework.map((course) => ({
      indent: 2,
      content: leaf("course", course),
    })),
    {
      indent: 1,
      content: <CloseTag tag="relevant-coursework" variant="container" />,
    },
    { indent: 1, content: null },
    {
      indent: 1,
      content: <OpenTag tag="extracurriculars" variant="container" />,
    },
    ...EDUCATION.extracurriculars.flatMap((activity) => [
      { indent: 2, content: <OpenTag tag="activity" variant="container" /> },
      { indent: 3, content: leaf("organization", activity.organization) },
      { indent: 3, content: leaf("role", activity.role) },
      { indent: 2, content: <CloseTag tag="activity" variant="container" /> },
    ]),
    {
      indent: 1,
      content: <CloseTag tag="extracurriculars" variant="container" />,
    },
    { indent: 0, content: <CloseTag tag="education" variant="container" /> },
  ];

  return (
    <div className="p-8 font-mono text-[13px] leading-5.5">
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
