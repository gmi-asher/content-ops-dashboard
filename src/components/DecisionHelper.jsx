import { useState } from 'react'

const RESULT_STYLES = {
  green: 'bg-green-50 border-green-200 text-green-800',
  yellow: 'bg-amber-50 border-amber-200 text-amber-800',
  gray: 'bg-gray-50 border-gray-200 text-gray-600',
}

function PlatformDecision({ platform, question, options }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-900">{platform}</p>
      <p className="text-sm text-gray-600">{question}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSelected(opt)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer font-medium ${
              selected?.value === opt.value
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {selected && (
        <div className={`p-3 rounded-lg border text-sm ${RESULT_STYLES[selected.color]}`}>
          {selected.result}
        </div>
      )}
    </div>
  )
}

export default function DecisionHelper() {
  const [key, setKey] = useState(0)

  return (
    <div className="mt-3 bg-gray-50 rounded-lg p-4 space-y-5">
      <div key={key}>
        <PlatformDecision
          platform="Instagram"
          question='What does the "IG Partnered + Tag" column say?'
          options={[
            { value: 'yes', label: 'YES', color: 'green',
              result: 'Run as IG Spark/Partnership Ad. Quick Duplicate an existing Spark ad in Meta. Update status to "IG Spark".' },
            { value: 'not-tagged', label: 'not tagged', color: 'gray',
              result: 'SKIP IG for now. The creator hasn\'t tagged us yet. Check back later.' },
            { value: 'na', label: 'NA', color: 'yellow',
              result: 'Creator only uses TikTok. Download the video from TikTok and Run Ourselves on IG. Quick Duplicate a non-Spark ad, upload the video. Update status to "IG Run Ourselves".' },
          ]}
        />

        <div className="border-t border-gray-200 my-4" />

        <PlatformDecision
          platform="TikTok"
          question='What does the "TT Spark Code" column say?'
          options={[
            { value: 'code', label: 'Has a code', color: 'green',
              result: 'Run as TikTok Spark Ad using the Spark code. Update status to "TikTok Spark".' },
            { value: 'need', label: 'NEED', color: 'gray',
              result: 'SKIP TikTok for now. We don\'t have the Spark code yet. Check back later.' },
            { value: 'na', label: 'NA', color: 'yellow',
              result: 'Creator doesn\'t use TikTok. Download the video from IG and Run Ourselves on TikTok. Upload the video directly. Update status to "TikTok Run Ourselves".' },
          ]}
        />
      </div>

      <button
        onClick={() => setKey(k => k + 1)}
        className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
      >
        Reset both
      </button>
    </div>
  )
}
