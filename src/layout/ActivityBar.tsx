import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import profilePhoto from "../assets/profile.png";

const SOCIAL_LINKS = {
  github: "https://github.com/ethanmcf",
  linkedin: "https://linkedin.com/in/ethanmcf",
  instagram: "https://instagram.com/ethanmcfarland2",
};

interface ActivityBarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

function ActivityBarIcon({
  label,
  pressed,
  onClick,
  href,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}) {
  const className =
    "relative flex h-12 w-12 cursor-pointer items-center justify-center text-muted hover:text-white/70";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        title={label}
        aria-label={label}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={pressed}
      className={className}
    >
      {pressed && (
        <span className="absolute top-[-10px] bottom-[0px] left-0 w-[3px] bg-accent" />
      )}
      {children}
    </button>
  );
}

export default function ActivityBar({
  sidebarOpen,
  onToggleSidebar,
}: ActivityBarProps) {
  const [photoOpen, setPhotoOpen] = useState(false);

  useEffect(() => {
    if (!photoOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setPhotoOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photoOpen]);

  return (
    <nav className="flex h-full w-12 shrink-0 flex-col justify-between bg-chrome-activity">
      <div>
        <ActivityBarIcon
          label="Explorer"
          pressed={sidebarOpen}
          onClick={onToggleSidebar}
        >
          <FontAwesomeIcon icon={faFile} className="text-[30px]" />
        </ActivityBarIcon>
      </div>

      <div className="mb-1">
        <ActivityBarIcon label="GitHub" href={SOCIAL_LINKS.github}>
          <FontAwesomeIcon icon={faGithub} className="text-[20px]" />
        </ActivityBarIcon>
        <ActivityBarIcon label="LinkedIn" href={SOCIAL_LINKS.linkedin}>
          <FontAwesomeIcon icon={faLinkedin} className="text-[20px]" />
        </ActivityBarIcon>
        <ActivityBarIcon label="Instagram" href={SOCIAL_LINKS.instagram}>
          <FontAwesomeIcon icon={faInstagram} className="text-[20px]" />
        </ActivityBarIcon>
        <button
          type="button"
          onClick={() => setPhotoOpen(true)}
          title="Ethan McFarland"
          aria-label="Expand profile photo"
          className="flex h-12 w-12 cursor-pointer items-center justify-center"
        >
          <img
            src={profilePhoto}
            alt="Ethan McFarland"
            className="h-7 w-7 shrink-0 rounded-full object-cover"
          />
        </button>
      </div>

      {photoOpen && (
        <div
          onClick={() => setPhotoOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-chrome-activity/50"
        >
          <button
            type="button"
            onClick={() => setPhotoOpen(false)}
            aria-label="Close"
            className="absolute top-6 right-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-text hover:bg-overlay-strong"
          >
            <FontAwesomeIcon icon={faXmark} className="text-[20px]" />
          </button>
          <img
            src={profilePhoto}
            alt="Ethan McFarland"
            onClick={(event) => event.stopPropagation()}
            className="h-[80vh] w-[80vh] max-w-[90vw] rounded-full object-cover shadow-2xl"
          />
        </div>
      )}
    </nav>
  );
}
