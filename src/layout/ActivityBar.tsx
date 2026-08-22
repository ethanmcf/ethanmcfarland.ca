import { Files } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./icons";

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
  active,
  onClick,
  href,
  children,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}) {
  const className = `group relative flex h-12 w-12 items-center justify-center border-l-2 ${
    active
      ? "border-[#0078d4] text-white"
      : "border-transparent text-[#858585] hover:text-white"
  }`;

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
      aria-pressed={active}
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
          active={sidebarOpen}
          onClick={onToggleSidebar}
        >
          <Files size={22} strokeWidth={1.5} />
        </ActivityBarIcon>
      </div>

      <div className="mb-1">
        <ActivityBarIcon label="GitHub" href={SOCIAL_LINKS.github}>
          <GithubIcon size={20} />
        </ActivityBarIcon>
        <ActivityBarIcon label="LinkedIn" href={SOCIAL_LINKS.linkedin}>
          <LinkedinIcon size={20} />
        </ActivityBarIcon>
        <ActivityBarIcon label="Instagram" href={SOCIAL_LINKS.instagram}>
          <InstagramIcon size={20} />
        </ActivityBarIcon>
      </div>
    </nav>
  );
}
