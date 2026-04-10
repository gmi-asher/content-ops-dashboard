import { useState } from 'react'
import WhereTag from './WhereTag'

const STATUS_COLORS = {
  'not-started': 'bg-gray-100 text-gray-600',
  'in-progress': 'bg-blue-50 text-blue-700',
  'done': 'bg-green-50 text-green-700',
}

const STATUS_LABELS = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'done': 'Complete',
}

export default function AsherOps({ dayData, onToggleStep, onUpdateSOPNotes, onUpdateNotes }) {
  const [expandedSection, setExpandedSection] = useState(null)

  const toggle = (key) => {
    setExpandedSection(expandedSection === key ? null : key)
  }

  return (
    <div className="space-y-4">
      {Object.entries(dayData.tasks).map(([key, section]) => (
        <div key={key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggle(key)}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold text-gray-900">{section.title}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[section.status]}`}>
                  {STATUS_LABELS[section.status]}
                </span>
                {section.frequency && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500">
                    {section.frequency}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{section.description}</p>
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === key ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expandedSection === key && (
            <div className="border-t border-gray-100 px-5 py-4 space-y-4">
              {/* Checklist */}
              <div className="space-y-1">
                {section.steps.map((step, i) => (
                  <label
                    key={step.id}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      step.done ? 'bg-green-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={step.done}
                      onChange={() => onToggleStep(key, step.id)}
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      {step.where && (
                        <div className="mb-1">
                          <WhereTag where={step.where} />
                        </div>
                      )}
                      <span className={`text-sm ${step.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        <span className="font-medium text-gray-400 mr-2">{i + 1}.</span>
                        {step.text}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={section.notes}
                  onChange={(e) => onUpdateSOPNotes(key, e.target.value)}
                  placeholder="Notes for this section..."
                  className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* General notes */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Notes</h2>
        <textarea
          value={dayData.notes}
          onChange={(e) => onUpdateNotes(e.target.value)}
          placeholder="Anything to remember, follow up on, or flag..."
          className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}
