import { useState, useEffect } from 'react'
import { History, Trash2, ExternalLink, Clock, RefreshCw } from 'lucide-react'
import { getHistory, deleteIdea } from '../api'

export default function HistoryPanel({ onDelete, onReload }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const fetchHistory = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getHistory()
      setRecords(data)
    } catch (err) {
      setError('Could not load history. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchHistory() }, [])

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      await deleteIdea(id)
      setRecords(prev => prev.filter(r => r.id !== id))
      onDelete(id)
    } catch (err) {
      console.error('Delete failed', err)
    } finally {
      setDeletingId(null)
    }
  }

  const handleReload = (record) => {
    try {
      const bp = JSON.parse(record.blueprint_json)
      onReload(bp, record.idea)
    } catch (e) {
      console.error('Failed to parse blueprint', e)
    }
  }

  const formatDate = (iso) => {
    try {
      const d = new Date(iso)
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    } catch {
      return iso
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-[#e2e8f0] flex items-center gap-3">
            <History size={22} className="text-[#00e5ff]" />
            Saved Blueprints
          </h2>
          <p className="text-[#475569] text-sm mt-1 font-mono">
            {records.length} idea{records.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <button
          onClick={fetchHistory}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#1e2d45] text-[#64748b] hover:text-[#e2e8f0] hover:border-[#475569] text-sm font-medium transition-all"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-mono mb-6">
          ⚠ {error}
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="shimmer h-28 rounded-2xl" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && records.length === 0 && (
        <div className="text-center py-24">
          <div className="w-16 h-16 rounded-2xl bg-[#0d1120] border border-[#1e2d45] flex items-center justify-center mx-auto mb-5">
            <History size={24} className="text-[#334155]" />
          </div>
          <h3 className="font-display font-semibold text-[#475569] text-lg mb-2">No saved blueprints yet</h3>
          <p className="text-[#334155] text-sm font-mono">Generate and save an idea to see it here.</p>
        </div>
      )}

      {/* Records */}
      {!loading && records.length > 0 && (
        <div className="space-y-4">
          {records.map((record, i) => (
            <div
              key={record.id}
              className="group relative rounded-2xl border border-[#1e2d45] bg-[#0d1120]/60 p-5 sm:p-6 hover:border-[#00e5ff]/20 hover:bg-[#0d1120] transition-all neon-border"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-display font-bold text-lg text-[#e2e8f0] truncate">
                      {record.startup_name}
                    </span>
                    <span className="tag bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/20 shrink-0">
                      #{record.id}
                    </span>
                  </div>
                  <p className="text-[#94a3b8] text-sm mb-3 leading-snug line-clamp-2">
                    {record.elevator_pitch}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-[#475569] font-mono">
                    <Clock size={10} />
                    {formatDate(record.created_at)}
                    <span className="text-[#1e2d45]">·</span>
                    <span className="text-[#334155] italic truncate max-w-[260px]">
                      "{record.idea.length > 60 ? record.idea.slice(0, 60) + '…' : record.idea}"
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleReload(record)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#1e2d45] text-[#64748b] hover:text-[#00e5ff] hover:border-[#00e5ff]/30 text-xs font-medium transition-all"
                    title="View blueprint"
                  >
                    <ExternalLink size={12} />
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
                    disabled={deletingId === record.id}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#1e2d45] text-[#64748b] hover:text-red-400 hover:border-red-500/30 text-xs font-medium transition-all disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === record.id
                      ? <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                      : <Trash2 size={12} />
                    }
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
