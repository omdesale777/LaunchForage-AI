import { Zap, History, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="relative z-50 border-b border-[#1e2d45]/50 bg-[#080b14]/80 backdrop-blur-xl sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setActiveTab('generate')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7c3aed] flex items-center justify-center shadow-cyan group-hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-shadow">
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className="font-display font-700 text-lg tracking-tight">
            Launch<span className="text-[#00e5ff]">Forge</span>
            <span className="text-[#64748b] ml-1 text-sm font-normal">AI</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          <NavBtn active={activeTab === 'generate'} onClick={() => setActiveTab('generate')} icon={<Zap size={14} />}>
            Generate
          </NavBtn>
          <NavBtn active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={<History size={14} />}>
            History
          </NavBtn>
        </div>

        {/* Badge */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="tag bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] inline-block pulse-ring" />
            Live Demo
          </span>
        </div>

        {/* Mobile */}
        <button className="sm:hidden text-forge-muted" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-[#1e2d45]/50 bg-[#080b14]/95 backdrop-blur-xl px-4 py-3 flex flex-col gap-2">
          <NavBtn active={activeTab === 'generate'} onClick={() => { setActiveTab('generate'); setMobileOpen(false) }} icon={<Zap size={14} />} full>
            Generate
          </NavBtn>
          <NavBtn active={activeTab === 'history'} onClick={() => { setActiveTab('history'); setMobileOpen(false) }} icon={<History size={14} />} full>
            History
          </NavBtn>
        </div>
      )}
    </nav>
  )
}

function NavBtn({ children, active, onClick, icon, full }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium font-display transition-all ${full ? 'w-full' : ''}
        ${active
          ? 'bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20'
          : 'text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e2d45]/50'
        }`}
    >
      {icon}
      {children}
    </button>
  )
}
