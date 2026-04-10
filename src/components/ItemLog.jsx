import { useState } from 'react'

const TYPES = [
  { value: 'ad', label: 'In-House Ad' },
  { value: 'influencer', label: 'Influencer Video' },
  { value: 'metricool', label: 'Metricool Post' },
  { value: 'other', label: 'Other' },
]

const STATUSES = [
  { value: 'done', label: 'Done', color: 'bg-green-100 text-green-700' },
  { value: 'posted-meta', label: 'Posted on Meta', color: 'bg-blue-100 text-blue-700' },
  { value: 'posted-tiktok', label: 'Posted on TikTok', color: 'bg-purple-100 text-purple-700' },
  { value: 'posted-both', label: 'Posted Both', color: 'bg-green-100 text-green-700' },
  { value: 'scheduled', label: 'Scheduled', color: 'bg-amber-100 text-amber-700' },
  { value: 'blocked', label: 'Blocked / Issue', color: 'bg-red-100 text-red-700' },
  { value: 'skipped', label: 'Skipped', color: 'bg-gray-100 text-gray-600' },
]

export default function ItemLog({ items, onAdd, onUpdate, onRemove }) {
  const [showForm, setShowForm] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', type: 'ad', status: 'done', path: '', note: '' })

  const handleAdd = () => {
    if (!newItem.name.trim()) return
    onAdd(newItem)
    setNewItem({ name: '', type: 'ad', status: 'done', path: '', note: '' })
    setShowForm(false)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Item Log</h2>
          <p className="text-sm text-gray-500">Track each ad/video you worked on today</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium"
        >
          + Add Item
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Name / Description</label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="e.g. 307_megan_test_short"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
              <select
                value={newItem.type}
                onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
              <select
                value={newItem.status}
                onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Path (if influencer)</label>
              <select
                value={newItem.path}
                onChange={(e) => setNewItem({ ...newItem, path: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">N/A</option>
                <option value="spark">Spark / Partnership Ad</option>
                <option value="run-ourselves">Run Ourselves</option>
                <option value="post-on-page">Post on Page first</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Notes (optional)</label>
            <input
              type="text"
              value={newItem.note}
              onChange={(e) => setNewItem({ ...newItem, note: e.target.value })}
              placeholder="Any issues, errors, or notes..."
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium"
            >
              Add
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="text-sm text-gray-500 px-4 py-2 hover:text-gray-700 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">No items logged yet. Add items as you work through each SOP.</p>
      ) : (
        <div className="space-y-2">
          {items.map(item => {
            const statusInfo = STATUSES.find(s => s.value === item.status)
            const typeInfo = TYPES.find(t => t.value === item.type)
            return (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{typeInfo?.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusInfo?.color}`}>
                      {statusInfo?.label}
                    </span>
                    {item.path && (
                      <span className="text-xs text-gray-500">
                        ({item.path === 'spark' ? 'Spark' : item.path === 'run-ourselves' ? 'Run Ourselves' : 'Post on Page'})
                      </span>
                    )}
                  </div>
                  {item.note && <p className="text-xs text-gray-500 mt-1">{item.note}</p>}
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-gray-300 hover:text-red-500 cursor-pointer p-1"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
