import { Zap, Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#1e2d45]/50 bg-[#080b14]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#7c3aed] flex items-center justify-center">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="font-display font-bold text-base tracking-tight">
              Launch<span className="text-[#00e5ff]">Forge</span>
              <span className="text-[#334155] ml-1 text-sm font-normal">AI</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-[#334155] text-xs font-mono text-center">
            Transform a rough idea into a launch-ready startup blueprint.
          </p>

          {/* Links */}
          <div className="flex items-center gap-4 text-[#475569] text-xs font-mono">
            <span className="tag bg-[#0d1120] border border-[#1e2d45] text-[#334155]">
              Built for hackathons
            </span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-[#00e5ff] transition-colors">
              <Github size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-[#00e5ff] transition-colors">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        <div className="section-divider mt-8 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[#1e2d45] text-xs font-mono">
          <span>© {new Date().getFullYear()} LaunchForge AI. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-[#475569] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[#475569] cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-[#475569] cursor-pointer transition-colors">API Docs</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
