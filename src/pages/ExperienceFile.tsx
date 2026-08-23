import type { ReactNode } from "react";
import { useParams } from "react-router-dom";
import { EXPERIENCE_FILE } from "../data/experience";

interface CodeLine {
  indent: number;
  content: ReactNode;
}

export default function ExperienceFile() {
  const { slug } = useParams<{ slug: string }>();
  const path = `/experience/${slug}`;
  const details = EXPERIENCE_FILE[path];

  if (!details) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-white">Not found</h1>
      </div>
    );
  }

  const lines: CodeLine[] = [
    {
      indent: 0,
      content: (
        <>
          <span className="text-code-keyword">import</span>{" "}
          <span className="text-code-brace">{"{"}</span>
        </>
      ),
    },
    ...details.skills.map((skill) => ({
      indent: 1,
      content: (
        <>
          <span className="text-content">{skill}</span>
          <span className="text-code-punct">,</span>
        </>
      ),
    })),
    {
      indent: 0,
      content: (
        <>
          <span className="text-code-brace">{"}"}</span>{" "}
          <span className="text-code-keyword">from</span>{" "}
          <span className="text-code-string">"@skills"</span>
          <span className="text-code-punct">;</span>
        </>
      ),
    },
    {
      indent: 0,
      content: (
        <>
          <span className="text-code-keyword">import</span>{" "}
          <span className="text-code-brace">{"{"}</span>{" "}
          <span className="text-content">{details.company}</span>{" "}
          <span className="text-code-brace">{"}"}</span>{" "}
          <span className="text-code-keyword">from</span>{" "}
          <span className="text-code-string">"@employers"</span>
          <span className="text-code-punct">;</span>
        </>
      ),
    },
    { indent: 0, content: null },
    {
      indent: 0,
      content: (
        <>
          <span className="text-code-keyword">position</span>{" "}
          <span className="text-code-class">{details.role}</span>{" "}
          <span className="text-code-brace">{"{"}</span>
        </>
      ),
    },
    {
      indent: 1,
      content: (
        <>
          <span className="text-content">company</span>
          <span className="text-code-punct"> = </span>
          <span className="text-content">{details.company}</span>
          <span className="text-code-punct">;</span>
        </>
      ),
    },

    {
      indent: 1,
      content: (
        <>
          <span className="text-content">team</span>
          <span className="text-code-punct"> = </span>
          <span className="text-code-string">"{details.team}"</span>
          <span className="text-code-punct">;</span>
        </>
      ),
    },
    {
      indent: 1,
      content: (
        <>
          <span className="text-content">year</span>
          <span className="text-code-punct"> = </span>
          <span className="text-code-number">{details.year}</span>
          <span className="text-code-punct">;</span>
        </>
      ),
    },
    {
      indent: 1,
      content: (
        <>
          <span className="text-content">season</span>
          <span className="text-code-punct"> = </span>
          <span className="text-code-string">"{details.season}"</span>
          <span className="text-code-punct">;</span>
        </>
      ),
    },
    {
      indent: 1,
      content: (
        <>
          <span className="text-content">location</span>
          <span className="text-code-punct"> = </span>
          <span className="text-code-class">Location</span>
          <span className="text-code-brace">(</span>
          <span className="text-code-string">"{details.location}"</span>
          <span className="text-code-brace">)</span>
          <span className="text-code-punct">;</span>
        </>
      ),
    },
    {
      indent: 1,
      content: (
        <>
          <span className="text-content">isRemote</span>
          <span className="text-code-punct"> = </span>
          <span className="text-code-number">
            {details.isRemote ? "true" : "false"}
          </span>
          <span className="text-code-punct">;</span>
        </>
      ),
    },
    { indent: 1, content: null },
    {
      indent: 1,
      content: (
        <span className="text-muted">// Impact and responsibilities</span>
      ),
    },
    {
      indent: 1,
      content: (
        <span className="text-code-punct">
          <span className="text-content">achievements</span> ={" "}
          <span className="text-code-bracket">[</span>
        </span>
      ),
    },
    ...details.bullets.map((bullet) => ({
      indent: 2,
      content: (
        <>
          <span className="text-code-string">"{bullet}"</span>
          <span className="text-code-punct">,</span>
        </>
      ),
    })),
    {
      indent: 1,
      content: (
        <span className="text-code-punct">
          <span className="text-code-bracket">]</span>;
        </span>
      ),
    },
    { indent: 0, content: <span className="text-code-brace">{"}"}</span> },
  ];

  return (
    <div className="p-8 font-mono text-[13px] leading-5.5">
      {lines.map((line, index) => (
        <div key={index} className="flex">
          <span className="mr-4 w-6 text-[13px] shrink-0 select-none text-right text-muted">
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
