import { useState } from 'react'
import { ChevronDown, ChevronRight, FileCode2, Folder, FolderOpen } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface FolderEntry {
  name: string
  path: string
  file: string
}

const FOLDERS: FolderEntry[] = [
  { name: 'Experience', path: '/experience', file: 'experience.tsx' },
  { name: 'Education', path: '/education', file: 'education.tsx' },
  { name: 'Projects', path: '/projects', file: 'projects.tsx' },
  { name: 'Techstack', path: '/techstack', file: 'techstack.tsx' },
]

export default function Sidebar() {
  const [treeOpen, setTreeOpen] = useState(true)
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(
    () => Object.fromEntries(FOLDERS.map((folder) => [folder.name, true])),
  )

  const toggleFolder = (name: string) => {
    setOpenFolders((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col overflow-y-auto border-r border-[#2b2b2b] bg-panel text-[#cccccc]">
      <h2 className="px-4 pt-4 pb-2 text-[11px] font-bold tracking-wide text-[#bbbbbb]">
        EXPLORER
      </h2>

      <button
        type="button"
        onClick={() => setTreeOpen((prev) => !prev)}
        className="flex w-full items-center gap-1 px-2 py-1 text-left text-[11px] font-bold tracking-wide text-[#cccccc] hover:text-white"
      >
        {treeOpen ? (
          <ChevronDown size={14} className="shrink-0 text-[#cccccc]" />
        ) : (
          <ChevronRight size={14} className="shrink-0 text-[#cccccc]" />
        )}
        ETHANMCFARLAND.CA
      </button>

      {treeOpen && (
        <ul>
          {FOLDERS.map((folder) => {
            const isOpen = openFolders[folder.name]
            return (
              <li key={folder.name}>
                <button
                  type="button"
                  onClick={() => toggleFolder(folder.name)}
                  className="flex w-full items-center gap-1.5 py-[3px] pr-2 pl-6 text-left text-[13px] hover:bg-[#2a2d2e]"
                >
                  {isOpen ? (
                    <ChevronDown size={14} className="shrink-0 text-[#cccccc]" />
                  ) : (
                    <ChevronRight size={14} className="shrink-0 text-[#cccccc]" />
                  )}
                  {isOpen ? (
                    <FolderOpen size={16} className="shrink-0 text-[#c09553]" />
                  ) : (
                    <Folder size={16} className="shrink-0 text-[#c09553]" />
                  )}
                  {folder.name}
                </button>

                {isOpen && (
                  <NavLink
                    to={folder.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 py-[3px] pr-2 pl-[3.25rem] text-[13px] ${
                        isActive
                          ? 'bg-[#37373d] text-white'
                          : 'text-[#cccccc] hover:bg-[#2a2d2e]'
                      }`
                    }
                  >
                    <FileCode2 size={16} className="shrink-0 text-[#519aba]" />
                    {folder.file}
                  </NavLink>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </aside>
  )
}
