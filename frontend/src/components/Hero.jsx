import { Rocket, ArrowDown, Sparkles } from 'lucide-react'

export default function Hero() {
  const scrollToForge = () => {
    document.getElementById('forge-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[72vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-[#00e5ff]/5" />
        <div className="absolute w-[800px] h-[800px] rounded-full border border-[#7c3aed]/5" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[#00e5ff]/10" />
      </div>

      {/* Badge */}
      <div className="fade-in-up fade-in-up-delay-1 mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00e5ff]/5 border border-[#00e5ff]/20 text-[#00e5ff] text-xs font-mono tracking-wider uppercase">
          <Sparkles size={12} />
          AI-Powered Startup Studio
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] pulse-ring inline-block" />
        </span>
      </div>

      {/* Headline */}
      <h1 className="fade-in-up fade-in-up-delay-2 font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 max-w-4xl">
        Turn Your Idea Into a{' '}
        <span className="gradient-text">Launch-Ready</span>
        <br />
        Startup Blueprint
      </h1>

      {/* Subhead */}
      <p className="fade-in-up fade-in-up-delay-3 text-[#64748b] text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
        LaunchForge AI instantly generates a complete product blueprint — name, pitch, features,
        UI/UX flow, and backend architecture — from a single sentence.
      </p>

      {/* CTAs */}
      <div className="fade-in-up fade-in-up-delay-4 flex flex-col sm:flex-row gap-4 items-center">
        <button
          onClick={scrollToForge}
          className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] rounded-xl text-white font-display font-semibold text-base shadow-[0_0_40px_rgba(0,229,255,0.25)] hover:shadow-[0_0_60px_rgba(0,229,255,0.4)] transition-all hover:scale-[1.03] active:scale-[0.98]"
        >
          <Rocket size={18} className="group-hover:rotate-12 transition-transform" />
          Start Forging
        </button>
        <button
          onClick={scrollToForge}
          className="flex items-center gap-2 px-6 py-4 rounded-xl border border-[#1e2d45] text-[#94a3b8] hover:text-[#e2e8f0] hover:border-[#00e5ff]/30 transition-all text-sm font-medium"
        >
          See an example
          <ArrowDown size={14} />
        </button>
      </div>

      {/* Stats strip */}
      <div className="fade-in-up mt-16 flex flex-wrap justify-center gap-8 sm:gap-12">
        {[
          { label: 'Blueprints Generated', value: '12,000+' },
          { label: 'Domains Supported', value: '15+' },
          { label: 'Avg. Generation Time', value: '< 2s' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-display font-bold text-2xl text-[#e2e8f0]">{stat.value}</div>
            <div className="text-[#475569] text-xs mt-0.5 font-mono tracking-wider uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
