import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
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
    "flex h-12 w-12 items-center justify-center text-muted hover:text-white";

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
      {children}
    </button>
  );
}

export default function ActivityBar({
  sidebarOpen,
  onToggleSidebar,
}: ActivityBarProps) {
  return (
    <nav className="flex h-full w-12 shrink-0 flex-col justify-between border-r border-[#2b2b2b] bg-panel">
      <div>
        <ActivityBarIcon
          label="Explorer"
          pressed={sidebarOpen}
          onClick={onToggleSidebar}
        >
          <FontAwesomeIcon icon={faFile} className="text-[22px]" />
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
        <div className="flex h-12 w-12 items-center justify-center">
          <img
            src={profilePhoto}
            alt="Ethan McFarland"
            className="h-7 w-7 shrink-0 rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
