import { useState } from 'react'

const STATUS_LABELS = {
  'done': 'Done',
  'posted-meta': 'Posted on Meta',
  'posted-tiktok': 'Posted on TikTok',
  'posted-both': 'Posted Both',
  'scheduled': 'Scheduled',
  'blocked': 'Blocked',
  'skipped': 'Skipped',
}

const TYPE_LABELS = {
  'ad': 'In-House Ad',
  'influencer': 'Influencer Video',
  'metricool': 'Metricool Post',
  'other': 'Other',
}

const PATH_LABELS = {
  'spark': 'Spark',
  'run-ourselves': 'Run Ourselves',
  'post-on-page': 'Post on Page',
}

export default function DailyReport({ dayData, onBack }) {
  const [copied, setCopied] = useState(false)

  const report = generateReport(dayData)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(report)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Daily Report</h2>
          <p className="text-sm text-gray-500 mb-4">Copy-paste this to WhatsApp and send to Asher at the end of your shift</p>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans bg-gray-50 rounded-lg p-4 border border-gray-100 leading-relaxed">
            {report}
          </pre>
        </div>
      </main>
    </div>
  )
}

function generateReport(dayData) {
  const date = new Date(dayData.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  let lines = []
  lines.push(`CLEAR30 DAILY OPS REPORT`)
  lines.push(date)
  lines.push('')

  // Section progress
  for (const [key, sop] of Object.entries(dayData.tasks)) {
    if (sop.simple) continue
    const done = sop.steps.filter(s => s.done).length
    const total = sop.steps.length
    const statusIcon = total === 0 ? 'N/A' : done === total ? 'DONE' : done > 0 ? 'IN PROGRESS' : 'NOT STARTED'

    lines.push(`--- ${sop.title} ---`)
    lines.push(`Status: ${statusIcon} (${done}/${total} steps)`)
    if (sop.minutes) {
      lines.push(`Time: ${sop.minutes} min`)
    }
    if (sop.notes && sop.notes.trim()) {
      lines.push(`Notes: ${sop.notes.trim()}`)
    }
    lines.push('')
  }

  // Total time
  const totalMinutes = Object.values(dayData.tasks).reduce((sum, sop) => {
    return sum + (parseInt(sop.minutes) || 0)
  }, 0)
  if (totalMinutes > 0) {
    const hrs = Math.floor(totalMinutes / 60)
    const mins = totalMinutes % 60
    lines.push(`TOTAL TIME: ${hrs > 0 ? `${hrs}h ` : ''}${mins}m`)
    lines.push('')
  }

  // Items worked on (if any)
  if (dayData.items && dayData.items.length > 0) {
    lines.push(`--- ITEMS WORKED ON ---`)
    for (const item of dayData.items) {
      const status = STATUS_LABELS[item.status] || item.status
      const type = TYPE_LABELS[item.type] || item.type
      let line = `- ${item.name} (${type}) - ${status}`
      if (item.path) {
        line += ` [${PATH_LABELS[item.path] || item.path}]`
      }
      lines.push(line)
      if (item.note) {
        lines.push(`  Note: ${item.note}`)
      }
    }
    lines.push('')

    const blocked = dayData.items.filter(i => i.status === 'blocked')
    if (blocked.length > 0) {
      lines.push(`--- BLOCKED / ISSUES ---`)
      for (const item of blocked) {
        lines.push(`- ${item.name}: ${item.note || 'No details provided'}`)
      }
      lines.push('')
    }
  }

  // End of day notes
  if (dayData.notes.trim()) {
    lines.push(`--- END OF DAY NOTES ---`)
    lines.push(dayData.notes.trim())
    lines.push('')
  }

  // Summary stats
  const allSteps = Object.values(dayData.tasks).flatMap(sop => sop.steps)
  const totalDone = allSteps.filter(s => s.done).length
  const totalSteps = allSteps.length
  const itemsDone = dayData.items.filter(i => i.status !== 'blocked' && i.status !== 'skipped').length
  const itemsBlocked = blocked.length

  lines.push(`--- SUMMARY ---`)
  lines.push(`Checklist: ${totalDone}/${totalSteps} steps completed`)
  lines.push(`Items processed: ${itemsDone}`)
  if (itemsBlocked > 0) {
    lines.push(`Items blocked: ${itemsBlocked}`)
  }

  return lines.join('\n')
}
