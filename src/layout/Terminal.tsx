import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, SquareTerminal } from 'lucide-react'

const MIN_HEIGHT = 120
const MAX_HEIGHT = 560

export default function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const resizingRef = useRef(false)
  const [open, setOpen] = useState(true)
  const [height, setHeight] = useState(224)

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (!resizingRef.current || !containerRef.current) return
      const bottom = containerRef.current.getBoundingClientRect().bottom
      setHeight(
        Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, bottom - event.clientY)),
      )
    }
    function handleMouseUp() {
      resizingRef.current = false
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex shrink-0 flex-col border-t border-divider bg-panel text-text"
    >
      {open && (
        <div
          onMouseDown={() => {
            resizingRef.current = true
          }}
          className="absolute top-0 left-0 h-1 w-full cursor-row-resize hover:bg-overlay-strong"
        />
      )}

      <div className="flex h-9 shrink-0 items-center justify-between pr-2">
        <div className="flex h-full items-center text-[11px] font-medium tracking-wide">
          <span className="cursor-default px-3 text-terminal-muted">PROBLEMS</span>
          <span className="cursor-default px-3 text-terminal-muted">OUTPUT</span>
          <span className="cursor-default px-3 text-terminal-muted">DEBUG CONSOLE</span>
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
          className="flex h-6 w-6 items-center justify-center text-text hover:text-white"
        >
          {open ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </button>
      </div>

      {open && (
        <div
          style={{ height }}
          className="overflow-y-auto px-4 py-2 font-mono text-[13px] leading-6"
        >
          <p className="text-terminal-muted">Last login: {new Date().toDateString()} on ttys002</p>
          <p>
            <span className="text-terminal-arrow">➜</span>{' '}
            <span className="text-terminal-path">ethanmcfarland.ca</span>{' '}
            <span className="text-terminal-muted">git:(</span>
            <span className="text-terminal-branch">main</span>
            <span className="text-terminal-muted">)</span> whoami
          </p>
          <p className="text-text">Ethan McFarland — Software Engineer</p>
          <p>
            <span className="text-terminal-arrow">➜</span>{' '}
            <span className="text-terminal-path">ethanmcfarland.ca</span>{' '}
            <span className="text-terminal-muted">git:(</span>
            <span className="text-terminal-branch">main</span>
            <span className="text-terminal-muted">)</span>{' '}
            <span className="inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-text" />
          </p>
        </div>
      )}
    </div>
  )
}
