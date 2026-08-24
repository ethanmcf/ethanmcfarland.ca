import type { ReactNode } from "react";
import { SKILLS } from "../data/techstack";

interface CodeLine {
  indent: number;
  content: ReactNode;
}

function jsonKey(key: string): ReactNode {
  return (
    <>
      <span className="text-content">"</span>
      <span className="text-code-number">{key}</span>
      <span className="text-content">"</span>
    </>
  );
}

function jsonString(value: string, trailingComma: boolean): ReactNode {
  return (
    <>
      <span className="text-content">"</span>
      <span className="text-code-string">{value}</span>
      <span className="text-content">"{trailingComma ? "," : ""}</span>
    </>
  );
}

const categories = Object.entries(SKILLS);

export default function Techstack() {
  const lines: CodeLine[] = [
    { indent: 0, content: <span className="text-content">{"{"}</span> },
    {
      indent: 1,
      content: (
        <>
          {jsonKey("skills")}
          <span className="text-content">: {"{"}</span>
        </>
      ),
    },
    ...categories.flatMap(([key, skills], categoryIndex) => {
      const isLastCategory = categoryIndex === categories.length - 1;
      return [
        {
          indent: 2,
          content: (
            <>
              {jsonKey(key)}
              <span className="text-content">: [</span>
            </>
          ),
        },
        ...skills.map((skill, skillIndex) => ({
          indent: 3,
          content: jsonString(skill, skillIndex < skills.length - 1),
        })),
        {
          indent: 2,
          content: (
            <span className="text-content">]{isLastCategory ? "" : ","}</span>
          ),
        },
      ];
    }),
    { indent: 1, content: <span className="text-content">{"}"}</span> },
    { indent: 0, content: <span className="text-content">{"}"}</span> },
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
