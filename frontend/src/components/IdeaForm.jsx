import { useState } from 'react'
import { Zap, ChevronDown, ChevronUp, Wand2 } from 'lucide-react'

const INDUSTRIES = [
  { value: '', label: 'Auto-detect' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'finance', label: 'Finance & Fintech' },
  { value: 'education', label: 'Education & E-learning' },
  { value: 'ecommerce', label: 'E-Commerce & Retail' },
  { value: 'productivity', label: 'Productivity & Tools' },
  { value: 'social', label: 'Social & Community' },
  { value: 'travel', label: 'Travel & Hospitality' },
  { value: 'food', label: 'Food & Nutrition' },
  { value: 'ai', label: 'AI & Automation' },
  { value: 'analytics', label: 'Data & Analytics' },
  { value: 'logistics', label: 'Logistics & Supply Chain' },
  { value: 'hr', label: 'HR & Recruiting' },
]

const EXAMPLE_IDEAS = [
  'An app that helps remote teams stay in sync without meetings',
  'A platform that teaches kids coding through interactive story games',
  'AI financial advisor for freelancers to manage taxes and invoicing',
  'A marketplace for local farmers to sell produce directly to consumers',
  'Smart fitness coach that adapts workout plans based on daily energy levels',
  'A tool for indie founders to validate startup ideas with real users',
]

export default function IdeaForm({ onGenerate, loading }) {
  const [idea, setIdea] = useState('')
  const [industry, setIndustry] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const handleChange = (e) => {
    setIdea(e.target.value)
    setCharCount(e.target.value.length)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!idea.trim() || idea.trim().length < 5) return
    onGenerate(idea.trim(), industry || null, targetAudience || null)
  }

  const fillExample = () => {
    const ex = EXAMPLE_IDEAS[Math.floor(Math.random() * EXAMPLE_IDEAS.length)]
    setIdea(ex)
    setCharCount(ex.length)
  }

  const isValid = idea.trim().length >= 5

  return (
    <div className="mt-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1e2d45] to-transparent" />
        <span className="font-display text-sm text-[#64748b] font-medium tracking-wider uppercase whitespace-nowrap">
          Forge Your Blueprint
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1e2d45] to-transparent" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main idea input */}
        <div className="relative">
          <label className="block text-xs font-mono text-[#64748b] uppercase tracking-wider mb-2 ml-1">
            Your Startup Idea
          </label>
          <div className="relative group">
            <textarea
              value={idea}
              onChange={handleChange}
              placeholder="Describe your startup idea in one or two sentences..."
              rows={4}
              maxLength={1000}
              className={`w-full bg-[#0d1120] border rounded-xl px-5 py-4 text-[#e2e8f0] placeholder-[#334155] resize-none focus:outline-none transition-all duration-200 font-body text-base leading-relaxed
                ${!isValid && idea.length > 0
                  ? 'border-red-500/40 focus:border-red-500/60'
                  : 'border-[#1e2d45] focus:border-[#00e5ff]/40 focus:shadow-[0_0_0_1px_rgba(0,229,255,0.15),0_4px_20px_rgba(0,229,255,0.05)]'
                }`}
            />
            <div className="absolute bottom-3 right-4 text-[10px] font-mono text-[#334155]">
              {charCount}/1000
            </div>
          </div>
          {idea.length > 0 && idea.trim().length < 5 && (
            <p className="mt-1.5 text-xs text-red-400 font-mono ml-1">
              Please describe your idea in at least 5 characters.
            </p>
          )}
        </div>

        {/* Example filler */}
        <button
          type="button"
          onClick={fillExample}
          className="flex items-center gap-2 text-xs font-mono text-[#475569] hover:text-[#00e5ff] transition-colors ml-1"
        >
          <Wand2 size={12} />
          Fill with a random example idea
        </button>

        {/* Advanced toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-xs font-mono text-[#475569] hover:text-[#94a3b8] transition-colors ml-1 mt-1"
        >
          {showAdvanced ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          Advanced options (optional)
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 fade-in-up">
            {/* Industry */}
            <div>
              <label className="block text-xs font-mono text-[#64748b] uppercase tracking-wider mb-2 ml-1">
                Industry / Domain
              </label>
              <select
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                className="w-full bg-[#0d1120] border border-[#1e2d45] rounded-xl px-4 py-3 text-[#e2e8f0] focus:outline-none focus:border-[#00e5ff]/40 transition-all appearance-none cursor-pointer text-sm font-body"
              >
                {INDUSTRIES.map(ind => (
                  <option key={ind.value} value={ind.value}>{ind.label}</option>
                ))}
              </select>
            </div>

            {/* Target audience */}
            <div>
              <label className="block text-xs font-mono text-[#64748b] uppercase tracking-wider mb-2 ml-1">
                Primary Target User
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={e => setTargetAudience(e.target.value)}
                placeholder="e.g. Solo founders, College students..."
                className="w-full bg-[#0d1120] border border-[#1e2d45] rounded-xl px-4 py-3 text-[#e2e8f0] placeholder-[#334155] focus:outline-none focus:border-[#00e5ff]/40 transition-all text-sm font-body"
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full flex items-center justify-center gap-3 py-4 px-8 rounded-xl font-display font-semibold text-base transition-all duration-200
              ${isValid && !loading
                ? 'bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] text-white shadow-[0_0_40px_rgba(0,229,255,0.2)] hover:shadow-[0_0_60px_rgba(0,229,255,0.4)] hover:scale-[1.01] active:scale-[0.99]'
                : 'bg-[#0d1120] text-[#334155] border border-[#1e2d45] cursor-not-allowed'
              }`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Forging Blueprint...
              </>
            ) : (
              <>
                <Zap size={18} fill={isValid ? 'white' : '#334155'} />
                Generate Blueprint
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
