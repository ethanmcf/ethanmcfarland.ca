import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Image as ImageIcon,
  Video as VideoIcon,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { PROJECTS, type MediaItem } from "../data/projects";

function formatCompact(value: number) {
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-2xl font-semibold text-white">
        {formatCompact(value)}
      </div>
      <div className="text-[12px] text-muted">{label}</div>
    </div>
  );
}

function MediaCarousel({ media }: { media: MediaItem[] }) {
  const [index, setIndex] = useState(0);

  if (media.length === 0) return null;
  const current = media[index];

  const go = (delta: number) => {
    setIndex((prev) => (prev + delta + media.length) % media.length);
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-divider bg-chrome-sidebar">
      <div className="flex aspect-video items-center justify-center">
        {current.src ? (
          current.type === "video" ? (
            <video
              src={current.src}
              controls
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={current.src}
              alt={current.caption}
              className="h-full w-full object-cover"
            />
          )
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted">
            {current.type === "video" ? (
              <VideoIcon size={32} />
            ) : (
              <ImageIcon size={32} />
            )}
            <span className="text-[13px]">{current.caption}</span>
          </div>
        )}
      </div>

      {media.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute top-1/2 left-2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-panel/80 text-text hover:bg-overlay-strong"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-panel/80 text-text hover:bg-overlay-strong"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {media.map((item, dotIndex) => (
              <button
                key={item.caption}
                type="button"
                aria-label={`Go to slide ${dotIndex + 1}`}
                onClick={() => setIndex(dotIndex)}
                className={`h-1.5 w-1.5 cursor-pointer rounded-full ${
                  dotIndex === index ? "bg-text" : "bg-overlay-strong"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProjectFile() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((candidate) => candidate.path === `/projects/${slug}`);

  if (!project) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-white">Not found</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-4 sm:p-8">
      <h1 className="text-3xl font-bold text-white">{project.title}</h1>
      <p className="mt-2 text-lg text-muted">{project.oneLiner}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-chrome-sidebar px-3 py-1 text-[12px] text-content"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex gap-8">
        <StatTile label="Commits" value={project.metrics.commits} />
        <StatTile label="Lines of code" value={project.metrics.linesOfCode} />
      </div>

      <div className="mt-6">
        <MediaCarousel media={project.media} />
      </div>

      <h2 className="mt-8 text-xl font-semibold text-white">About</h2>
      <p className="mt-2 leading-relaxed text-content">{project.about}</p>

      <h2 className="mt-8 text-xl font-semibold text-white">Key Features</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-content">
        {project.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-[13px] font-medium text-panel hover:bg-white/90"
          >
            <ExternalLink className="h-4 w-4" />
            View Live Site
          </a>
        )}

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-md border border-divider px-4 py-2 text-[13px] text-content hover:bg-overlay-weak"
        >
          <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
          View on GitHub
        </a>
      </div>
    </div>
  );
}
