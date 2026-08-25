import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Image as ImageIcon,
  Maximize2,
  Video as VideoIcon,
  X,
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

function MediaFrame({
  item,
  fillClassName,
  onExpand,
}: {
  item: MediaItem;
  fillClassName: string;
  onExpand?: () => void;
}) {
  if (!item.src) {
    return (
      <div className="flex flex-col items-center gap-2 text-muted">
        {item.type === "video" ? (
          <VideoIcon size={32} />
        ) : (
          <ImageIcon size={32} />
        )}
        <span className="text-[13px]">{item.caption}</span>
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <>
        <video src={item.src} controls className={`${fillClassName} object-contain`} />
        {onExpand && (
          <button
            type="button"
            onClick={onExpand}
            aria-label="Expand video"
            className="absolute top-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-panel/80 text-text hover:bg-overlay-strong"
          >
            <Maximize2 size={16} />
          </button>
        )}
      </>
    );
  }

  return (
    <img
      src={item.src}
      alt={item.caption}
      onClick={onExpand}
      className={`${fillClassName} object-contain ${onExpand ? "cursor-zoom-in" : ""}`}
    />
  );
}

function CarouselArrows({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous"
        className="absolute top-1/2 left-2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-panel/80 text-text hover:bg-overlay-strong"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next"
        className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-panel/80 text-text hover:bg-overlay-strong"
      >
        <ChevronRight size={18} />
      </button>
    </>
  );
}

function MediaThumbnails({
  media,
  index,
  onSelect,
}: {
  media: MediaItem[];
  index: number;
  onSelect: (index: number) => void;
}) {
  if (media.length <= 1) return null;
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {media.map((item, thumbIndex) => (
        <button
          key={item.caption}
          type="button"
          onClick={() => onSelect(thumbIndex)}
          aria-label={`Go to slide ${thumbIndex + 1}`}
          aria-current={thumbIndex === index}
          className={`flex aspect-video w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md border-2 bg-chrome-sidebar ${
            thumbIndex === index
              ? "border-accent"
              : "border-transparent hover:border-overlay-strong"
          }`}
        >
          {item.src ? (
            item.type === "video" ? (
              <video src={item.src} muted className="h-full w-full object-cover" />
            ) : (
              <img
                src={item.src}
                alt={item.caption}
                className="h-full w-full object-cover"
              />
            )
          ) : item.type === "video" ? (
            <VideoIcon size={16} className="text-muted" />
          ) : (
            <ImageIcon size={16} className="text-muted" />
          )}
        </button>
      ))}
    </div>
  );
}

function MediaLightbox({
  media,
  index,
  onIndexChange,
  onClose,
}: {
  media: MediaItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const current = media[index];
  const go = (delta: number) => {
    onIndexChange((index + delta + media.length) % media.length);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-panel/30 p-6 backdrop-blur-md"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-text hover:bg-overlay-strong"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        onClick={(event) => event.stopPropagation()}
        className="flex flex-col items-start gap-4"
      >
        <div className="relative flex max-h-[75vh] max-w-[85vw] items-center justify-center">
          <MediaFrame item={current} fillClassName="max-h-[75vh] max-w-[85vw] rounded-lg" />
          {media.length > 1 && (
            <CarouselArrows onPrev={() => go(-1)} onNext={() => go(1)} />
          )}
        </div>

        <div className="max-w-[85vw]">
          <MediaThumbnails media={media} index={index} onSelect={onIndexChange} />
        </div>
      </div>
    </div>
  );
}

function MediaCarousel({ media }: { media: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (media.length === 0) return null;
  const current = media[index];

  const go = (delta: number) => {
    setIndex((prev) => (prev + delta + media.length) % media.length);
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg border border-divider bg-chrome-sidebar">
        <div className="group relative flex aspect-video items-center justify-center">
          <MediaFrame
            item={current}
            fillClassName="h-full w-full"
            onExpand={() => setLightboxOpen(true)}
          />
        </div>

        {media.length > 1 && (
          <CarouselArrows onPrev={() => go(-1)} onNext={() => go(1)} />
        )}
      </div>

      <div className="mt-3">
        <MediaThumbnails media={media} index={index} onSelect={setIndex} />
      </div>

      {lightboxOpen && (
        <MediaLightbox
          media={media}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setLightboxOpen(false)}
        />
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

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-md border border-divider px-4 py-2 text-[13px] text-content hover:bg-overlay-weak"
          >
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
            View on GitHub
          </a>
        )}

        {project.docsUrl && (
          <a
            href={project.docsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-[13px] font-medium text-panel hover:bg-white/90"
          >
            <BookOpen className="h-4 w-4" />
            View Documentation Site
          </a>
        )}
      </div>
    </div>
  );
}
