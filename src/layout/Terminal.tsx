import { useState } from 'react'
import { ChevronDown, ChevronUp, SquareTerminal } from 'lucide-react'

export default function Terminal() {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex shrink-0 flex-col border-t border-[#2b2b2b] bg-panel text-[#cccccc]">
      <div className="flex h-9 shrink-0 items-center justify-between pr-2">
        <div className="flex h-full items-center text-[11px] font-medium tracking-wide">
          <span className="cursor-default px-3 text-[#6f6f6f]">PROBLEMS</span>
          <span className="cursor-default px-3 text-[#6f6f6f]">OUTPUT</span>
          <span className="cursor-default px-3 text-[#6f6f6f]">DEBUG CONSOLE</span>
          <span className="flex h-full items-center gap-1.5 border-b-2 border-white px-3 text-white">
            <SquareTerminal size={14} />
            TERMINAL
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          title={open ? 'Collapse panel' : 'Expand panel'}
          aria-expanded={open}
          className="flex h-6 w-6 items-center justify-center text-[#cccccc] hover:text-white"
        >
          {open ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {open && (
        <div className="h-56 overflow-y-auto px-4 py-2 font-mono text-[13px] leading-6">
          <p className="text-[#6f6f6f]">Last login: {new Date().toDateString()} on ttys002</p>
          <p>
            <span className="text-[#4ec9b0]">➜</span>{' '}
            <span className="text-[#569cd6]">ethanmcfarland.ca</span>{' '}
            <span className="text-[#6f6f6f]">git:(</span>
            <span className="text-[#ce9178]">main</span>
            <span className="text-[#6f6f6f]">)</span> whoami
          </p>
          <p className="text-[#cccccc]">Ethan McFarland — Software Engineer</p>
          <p>
            <span className="text-[#4ec9b0]">➜</span>{' '}
            <span className="text-[#569cd6]">ethanmcfarland.ca</span>{' '}
            <span className="text-[#6f6f6f]">git:(</span>
            <span className="text-[#ce9178]">main</span>
            <span className="text-[#6f6f6f]">)</span>{' '}
            <span className="inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-[#cccccc]" />
          </p>
        </div>
      )}
    </div>
  )
}
