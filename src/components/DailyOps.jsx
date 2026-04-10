import { useState } from 'react'
import DecisionHelper from './DecisionHelper'
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

const FREQ_COLORS = {
  'Daily': 'bg-blue-50 text-blue-600',
  'Mon & Thu': 'bg-amber-50 text-amber-600',
}

function StepRow({ step, index, sopKey, onToggleStep }) {
  const [showHelper, setShowHelper] = useState(false)

  return (
    <div>
      <label
        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
          step.done ? 'bg-green-50' : 'hover:bg-gray-50'
        }`}
      >
        <input
          type="checkbox"
          checked={step.done}
          onChange={() => onToggleStep(sopKey, step.id)}
          className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer shrink-0"
        />
        <div className="flex-1 min-w-0">
          {step.where && (
            <div className="mb-1">
              <WhereTag where={step.where} />
            </div>
          )}
          <span className={`text-sm ${step.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
            <span className="font-medium text-gray-400 mr-2">{index}.</span>
            {step.text}
          </span>
          {step.hasDecisionHelper && (
            <button
              onClick={(e) => { e.preventDefault(); setShowHelper(!showHelper) }}
              className="ml-2 text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            >
              {showHelper ? 'Hide helper' : 'Open helper'}
            </button>
          )}
        </div>
      </label>
      {step.hasDecisionHelper && showHelper && (
        <div className="ml-7 mb-2">
          <DecisionHelper />
        </div>
      )}
    </div>
  )
}

function BranchBlock({ step }) {
  const [expanded, setExpanded] = useState(false)
  const branch = step.branch

  return (
    <div className="ml-7 mt-1 mb-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-4 py-3 rounded-lg border-2 border-dashed border-amber-300 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <svg
            className={`w-4 h-4 text-amber-600 transition-transform ${expanded ? 'rotate-90' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-sm font-medium text-amber-800">
            {branch.label}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="mt-2 ml-2 pl-4 border-l-2 border-amber-200 space-y-2">
          {branch.steps.map((bs, j) => (
            <div key={bs.id} className="p-2">
              {bs.where && (
                <div className="mb-1">
                  <WhereTag where={bs.where} />
                </div>
              )}
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-400 mr-2">{String.fromCharCode(97 + j)}.</span>
                {bs.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DailyOps({
  dayData,
  onToggleStep,
  onUpdateSOPNotes,
  onUpdateNotes,
  isMetricoolDay,
}) {
  const [expandedSOP, setExpandedSOP] = useState(null)

  const toggle = (key) => {
    setExpandedSOP(expandedSOP === key ? null : key)
  }

  let stepCounter = 0

  return (
    <div className="space-y-4">
      {Object.entries(dayData.tasks).map(([key, sop]) => {
        stepCounter = 0
        const isOffDay = key === 'sop3' && !isMetricoolDay

        // Simple card — no dropdown, just title + frequency
        if (sop.simple) {
          return (
            <div key={key} className="bg-white rounded-xl border border-gray-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold text-gray-900">{sop.title}</h2>
                {sop.frequency && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${FREQ_COLORS[sop.frequency] || 'bg-gray-100 text-gray-500'}`}>
                    {sop.frequency}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-0.5">{sop.description}</p>
            </div>
          )
        }

        return (
          <div key={key} className={`rounded-xl border border-gray-200 overflow-hidden ${isOffDay ? 'bg-gray-50 opacity-60' : 'bg-white'}`}>
            <button
              onClick={() => !isOffDay && toggle(key)}
              className={`w-full px-5 py-4 flex items-center justify-between transition-colors text-left ${isOffDay ? 'cursor-default' : 'hover:bg-gray-50 cursor-pointer'}`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className={`text-base font-semibold ${isOffDay ? 'text-gray-400' : 'text-gray-900'}`}>{sop.title}</h2>
                  {!isOffDay && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[sop.status]}`}>
                      {STATUS_LABELS[sop.status]}
                    </span>
                  )}
                  {sop.frequency && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${FREQ_COLORS[sop.frequency] || 'bg-gray-100 text-gray-500'}`}>
                      {sop.frequency}
                    </span>
                  )}
                  {isOffDay && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-gray-200 text-gray-500">
                      Not today
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{sop.description}</p>
              </div>
              {!isOffDay && (
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${expandedSOP === key ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>

            {expandedSOP === key && (
              <div className="border-t border-gray-100 px-5 py-4 space-y-4">
                {/* Checklist */}
                <div className="space-y-1">
                  {sop.steps.map((step) => {
                    stepCounter++
                    return (
                      <div key={step.id}>
                        <StepRow
                          step={step}
                          index={stepCounter}
                          sopKey={key}
                          onToggleStep={onToggleStep}
                        />
                        {step.branch && (
                          <BranchBlock step={step} />
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Notes for this SOP */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes / Issues for this section
                  </label>
                  <textarea
                    value={sop.notes}
                    onChange={(e) => onUpdateSOPNotes(key, e.target.value)}
                    placeholder="Any issues, questions, or things to flag for Asher..."
                    className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* General notes */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-base font-semibold text-gray-900 mb-3">End of Day Notes</h2>
        <textarea
          value={dayData.notes}
          onChange={(e) => onUpdateNotes(e.target.value)}
          placeholder="How did today go? Anything Asher should know? Questions for tomorrow?"
          className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}
