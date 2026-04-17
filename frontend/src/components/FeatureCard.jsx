export default function FeatureCard({ icon, title, description, color = 'cyan' }) {
  const colors = {
    cyan: 'border-[#00e5ff]/20 bg-[#00e5ff]/5 text-[#00e5ff]',
    violet: 'border-[#7c3aed]/20 bg-[#7c3aed]/5 text-[#7c3aed]',
    pink: 'border-[#ec4899]/20 bg-[#ec4899]/5 text-[#ec4899]',
    green: 'border-[#10b981]/20 bg-[#10b981]/5 text-[#10b981]',
  }

  return (
    <div className={`rounded-2xl border p-5 ${colors[color]} neon-border`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-current/10">
          <span className="text-current">{icon}</span>
        </div>
        <h3 className="font-display font-semibold text-sm text-[#e2e8f0]">{title}</h3>
      </div>
      <p className="text-[#64748b] text-xs leading-relaxed">{description}</p>
    </div>
  )
}
