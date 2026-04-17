import { useState } from 'react'
import {
  Rocket, Target, Lightbulb, Layers, Users, Zap,
  Layout, Server, Code2, Cloud, Save, Check,
  ChevronDown, ChevronUp, ExternalLink, Copy, CheckCheck
} from 'lucide-react'

const SECTION_COLORS = {
  cyan: { bg: 'bg-[#00e5ff]/8', border: 'border-[#00e5ff]/20', text: 'text-[#00e5ff]', dot: 'bg-[#00e5ff]' },
  violet: { bg: 'bg-[#7c3aed]/8', border: 'border-[#7c3aed]/20', text: 'text-[#7c3aed]', dot: 'bg-[#7c3aed]' },
  pink: { bg: 'bg-[#ec4899]/8', border: 'border-[#ec4899]/20', text: 'text-[#ec4899]', dot: 'bg-[#ec4899]' },
  green: { bg: 'bg-[#10b981]/8', border: 'border-[#10b981]/20', text: 'text-[#10b981]', dot: 'bg-[#10b981]' },
  amber: { bg: 'bg-[#f59e0b]/8', border: 'border-[#f59e0b]/20', text: 'text-[#f59e0b]', dot: 'bg-[#f59e0b]' },
  blue: { bg: 'bg-[#3b82f6]/8', border: 'border-[#3b82f6]/20', text: 'text-[#3b82f6]', dot: 'bg-[#3b82f6]' },
}

export default function ResultCard({ blueprint, idea, onSave, saved }) {
  const [copied, setCopied] = useState(false)
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (key) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const copyAll = () => {
    const text = JSON.stringify(blueprint, null, 2)
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fade-in-up space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="tag bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" />
              Blueprint Ready
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#e2e8f0] mt-2">
            {blueprint.startup_name}
          </h2>
          <p className="text-[#64748b] text-sm mt-1 font-mono max-w-xl">
            Generated from: "{idea.length > 80 ? idea.slice(0, 80) + '…' : idea}"
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={copyAll}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1e2d45] text-[#94a3b8] hover:text-[#e2e8f0] hover:border-[#475569] transition-all text-sm font-medium"
          >
            {copied ? <CheckCheck size={14} className="text-[#10b981]" /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy JSON'}
          </button>
          <button
            onClick={onSave}
            disabled={saved}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
              ${saved
                ? 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 cursor-default'
                : 'bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 hover:bg-[#00e5ff]/20'
              }`}
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            {saved ? 'Saved' : 'Save Idea'}
          </button>
        </div>
      </div>

      {/* Elevator pitch hero card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#00e5ff]/20 bg-gradient-to-br from-[#00e5ff]/5 via-[#0d1120] to-[#7c3aed]/5 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Rocket size={16} className="text-[#00e5ff]" />
            <span className="text-xs font-mono text-[#00e5ff] uppercase tracking-wider">Elevator Pitch</span>
          </div>
          <p className="text-[#e2e8f0] text-xl sm:text-2xl font-display font-medium leading-snug">
            "{blueprint.elevator_pitch}"
          </p>
        </div>
      </div>

      {/* 2-col grid: Problem + Solution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={<Target size={15} />}
          label="Problem"
          color="pink"
          content={blueprint.problem}
        />
        <InfoCard
          icon={<Lightbulb size={15} />}
          label="Solution"
          color="cyan"
          content={blueprint.solution}
        />
      </div>

      {/* Core features */}
      <ExpandableSection
        icon={<Layers size={15} />}
        label="Core Features"
        color="violet"
        count={blueprint.core_features.length}
        expanded={expandedSections.features ?? true}
        onToggle={() => toggleSection('features')}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {blueprint.core_features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#0d1120] border border-[#1e2d45]">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-[#7c3aed]/20 border border-[#7c3aed]/30 text-[#7c3aed] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="text-[#cbd5e1] text-sm leading-snug">{f}</span>
            </div>
          ))}
        </div>
      </ExpandableSection>

      {/* Target users + use cases */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ExpandableSection
          icon={<Users size={15} />}
          label="Target Users"
          color="green"
          count={blueprint.target_users.length}
          expanded={expandedSections.users ?? true}
          onToggle={() => toggleSection('users')}
        >
          <ul className="space-y-2">
            {blueprint.target_users.map((u, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-[#cbd5e1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
                {u}
              </li>
            ))}
          </ul>
        </ExpandableSection>

        <ExpandableSection
          icon={<Zap size={15} />}
          label="Use Cases"
          color="amber"
          count={blueprint.use_cases.length}
          expanded={expandedSections.usecases ?? true}
          onToggle={() => toggleSection('usecases')}
        >
          <ul className="space-y-3">
            {blueprint.use_cases.map((uc, i) => (
              <li key={i} className="text-sm text-[#cbd5e1] leading-snug pl-3 border-l-2 border-[#f59e0b]/40">
                {uc}
              </li>
            ))}
          </ul>
        </ExpandableSection>
      </div>

      {/* UI/UX Flow */}
      <ExpandableSection
        icon={<Layout size={15} />}
        label="UI / UX Flow"
        color="cyan"
        count={blueprint.ui_ux_flow.length + ' steps'}
        expanded={expandedSections.uiux ?? true}
        onToggle={() => toggleSection('uiux')}
      >
        <div className="relative pl-6">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00e5ff]/30 to-transparent" />
          <div className="space-y-3">
            {blueprint.ui_ux_flow.map((step, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#0d1120] border-2 border-[#00e5ff]/50" />
                <p className="text-sm text-[#cbd5e1] leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </ExpandableSection>

      {/* Backend architecture */}
      <ExpandableSection
        icon={<Server size={15} />}
        label="Backend Architecture"
        color="blue"
        expanded={expandedSections.backend ?? true}
        onToggle={() => toggleSection('backend')}
      >
        <p className="text-sm text-[#cbd5e1] leading-relaxed">{blueprint.backend_architecture}</p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(blueprint.tech_stack).map(([key, val]) => (
            <div key={key} className="p-3 rounded-xl bg-[#0d1120] border border-[#1e2d45] text-center">
              <div className="text-[#475569] text-[10px] font-mono uppercase tracking-wider mb-1">{key}</div>
              <div className="text-[#cbd5e1] text-xs font-medium">{val}</div>
            </div>
          ))}
        </div>
      </ExpandableSection>

      {/* API Endpoints */}
      <ExpandableSection
        icon={<Code2 size={15} />}
        label="Sample API Endpoints"
        color="violet"
        count={blueprint.sample_api_endpoints.length}
        expanded={expandedSections.api ?? false}
        onToggle={() => toggleSection('api')}
      >
        <div className="space-y-2">
          {blueprint.sample_api_endpoints.map((ep, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#0d1120] border border-[#1e2d45] font-mono text-xs">
              <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-bold ${
                ep.method === 'GET' ? 'bg-[#10b981]/15 text-[#10b981]' :
                ep.method === 'POST' ? 'bg-[#00e5ff]/15 text-[#00e5ff]' :
                ep.method === 'PUT' ? 'bg-[#f59e0b]/15 text-[#f59e0b]' :
                'bg-[#ef4444]/15 text-[#ef4444]'
              }`}>{ep.method}</span>
              <span className="text-[#7c3aed] shrink-0">{ep.path}</span>
              <span className="text-[#475569] hidden sm:block truncate">— {ep.description}</span>
            </div>
          ))}
        </div>
      </ExpandableSection>

      {/* Deployment */}
      <div className="rounded-2xl border border-[#10b981]/20 bg-[#10b981]/5 p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <Cloud size={15} className="text-[#10b981]" />
          <span className="text-xs font-mono text-[#10b981] uppercase tracking-wider">Deployment Suggestion</span>
        </div>
        <p className="text-sm text-[#cbd5e1] leading-relaxed">{blueprint.deployment_suggestion}</p>
      </div>
    </div>
  )
}

function InfoCard({ icon, label, color, content }) {
  const c = SECTION_COLORS[color]
  return (
    <div className={`rounded-2xl border ${c.border} ${c.bg} p-5`}>
      <div className={`flex items-center gap-2 mb-3 ${c.text}`}>
        {icon}
        <span className="text-xs font-mono uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm text-[#cbd5e1] leading-relaxed">{content}</p>
    </div>
  )
}

function ExpandableSection({ icon, label, color, count, expanded, onToggle, children }) {
  const c = SECTION_COLORS[color] || SECTION_COLORS.cyan
  return (
    <div className="rounded-2xl border border-[#1e2d45] bg-[#0d1120]/60 overflow-hidden neon-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 hover:bg-[#ffffff04] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center ${c.text}`}>
            {icon}
          </div>
          <span className="font-display font-semibold text-sm text-[#e2e8f0]">{label}</span>
          {count !== undefined && (
            <span className={`tag ${c.bg} ${c.text} border ${c.border}`}>{count}</span>
          )}
        </div>
        <div className="text-[#475569]">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>
      {expanded && (
        <div className="px-5 pb-5 fade-in-up">
          {children}
        </div>
      )}
    </div>
  )
}
