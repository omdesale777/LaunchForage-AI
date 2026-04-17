import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import IdeaForm from './components/IdeaForm'
import ResultCard from './components/ResultCard'
import HistoryPanel from './components/HistoryPanel'
import Footer from './components/Footer'
import { generateBlueprint, saveBlueprint, deleteIdea } from './api'

export default function App() {
  const [blueprint, setBlueprint] = useState(null)
  const [currentIdea, setCurrentIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('generate') // 'generate' | 'history'

  const handleGenerate = async (idea, industry, targetAudience) => {
    setLoading(true)
    setError(null)
    setBlueprint(null)
    setSaved(false)
    setCurrentIdea(idea)
    try {
      const result = await generateBlueprint(idea, industry, targetAudience)
      setBlueprint(result)
      // Scroll to result
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      setError(err.message || 'Failed to generate blueprint. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!blueprint || saved) return
    try {
      await saveBlueprint(currentIdea, blueprint)
      setSaved(true)
    } catch (err) {
      setError('Failed to save idea. ' + (err.message || ''))
    }
  }

  const handleDeleteIdea = async (id) => {
    try {
      await deleteIdea(id)
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  return (
    <div className="min-h-screen bg-[#080b14] text-forge-text relative overflow-x-hidden">
      {/* Global ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="blob w-[600px] h-[600px] bg-[#7c3aed] top-[-200px] right-[-200px]" />
        <div className="blob w-[500px] h-[500px] bg-[#00e5ff] bottom-[-100px] left-[-200px]" />
        <div className="bg-grid-pattern absolute inset-0 opacity-50" />
      </div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="relative z-10">
        {activeTab === 'generate' ? (
          <>
            <Hero />
            <section id="forge-section" className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
              <IdeaForm onGenerate={handleGenerate} loading={loading} />

              {error && (
                <div className="mt-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-mono fade-in-up">
                  ⚠ {error}
                </div>
              )}

              {loading && <LoadingSkeleton />}
            </section>

            {blueprint && !loading && (
              <section id="result-section" className="max-w-6xl mx-auto px-4 sm:px-6 pb-32">
                <ResultCard
                  blueprint={blueprint}
                  idea={currentIdea}
                  onSave={handleSave}
                  saved={saved}
                />
              </section>
            )}
          </>
        ) : (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-32">
            <HistoryPanel
              onDelete={handleDeleteIdea}
              onReload={(bp, idea) => {
                setBlueprint(bp)
                setCurrentIdea(idea)
                setSaved(true)
                setActiveTab('generate')
                setTimeout(() => {
                  document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' })
                }, 200)
              }}
            />
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="mt-10 space-y-4 fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 rounded-full bg-forge-cyan pulse-ring" />
        <span className="text-forge-cyan font-mono text-sm">Forging your startup blueprint...</span>
      </div>
      {[80, 60, 90, 50, 70].map((w, i) => (
        <div key={i} className={`shimmer h-5 rounded`} style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }} />
      ))}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="shimmer h-24 rounded-xl" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  )
}
