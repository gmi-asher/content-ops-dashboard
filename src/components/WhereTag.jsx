// Platform icon SVGs (tiny, clean)
const ICONS = {
  sheets: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none">
      <rect x="3" y="1" width="18" height="22" rx="2" fill="#0F9D58" />
      <rect x="6" y="6" width="12" height="12" rx="1" fill="white" />
      <line x1="12" y1="6" x2="12" y2="18" stroke="#0F9D58" strokeWidth="1.2" />
      <line x1="6" y1="10" x2="18" y2="10" stroke="#0F9D58" strokeWidth="1.2" />
      <line x1="6" y1="14" x2="18" y2="14" stroke="#0F9D58" strokeWidth="1.2" />
    </svg>
  ),
  drive: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none">
      <path d="M8 2L2 14h6l6-12H8z" fill="#4285F4" />
      <path d="M14 2L8 14h6l6-12h-6z" fill="#FBBC04" />
      <path d="M2 14l3 6h14l3-6H2z" fill="#34A853" />
    </svg>
  ),
  meta: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
      <circle cx="12" cy="12" r="11" fill="#1877F2" />
      <path d="M16.5 15.5l.5-3h-3v-2c0-.83.4-1.5 1.6-1.5H17V6.2s-1.1-.2-2.1-.2c-2.1 0-3.4 1.3-3.4 3.5v2.3H9v3h2.5V22h3V15.5h2z" fill="white" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
      <rect width="24" height="24" rx="5" fill="#010101" />
      <path d="M17.2 6.8A3.3 3.3 0 0115 5.5V5h-2.5v9.2a2 2 0 01-2 1.8 2 2 0 01-2-2 2 2 0 012-2c.2 0 .4 0 .6.1V9.5a4.6 4.6 0 00-.6 0 4.5 4.5 0 104.5 4.5V10a5.7 5.7 0 003.2 1V8.5a3.3 3.3 0 01-1-1.7z" fill="white" />
    </svg>
  ),
  metricool: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
      <rect width="24" height="24" rx="5" fill="#00C4B4" />
      <path d="M6 16l4-6 4 4 4-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
      <defs>
        <linearGradient id="ig" x1="0" y1="24" x2="24" y2="0">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#E1306C" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig)" />
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="white" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.8" fill="none" />
      <circle cx="17" cy="7" r="1.2" fill="white" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
      <rect width="24" height="24" rx="5" fill="#25D366" />
      <path d="M12 4a8 8 0 00-6.9 12L4 20l4.1-1.1A8 8 0 1012 4zm0 14.4a6.4 6.4 0 01-3.3-.9l-.2-.1-2.4.6.7-2.4-.2-.2A6.4 6.4 0 1112 18.4z" fill="white" />
      <path d="M15.1 13.6c-.2-.1-1-.5-1.2-.6s-.3-.1-.4.1-.5.6-.6.7-.2.1-.4 0a5.4 5.4 0 01-2.5-2.2c-.2-.3.2-.3.5-.9a.3.3 0 000-.3l-.3-.8c-.1-.2-.2-.2-.3-.2h-.3a.6.6 0 00-.4.2 1.8 1.8 0 00-.6 1.3c0 .8.5 1.5.6 1.6s1 1.6 2.5 2.2a8 8 0 001.5.5 3.6 3.6 0 001.6.1c.5-.1 1-.4 1.2-.8a1.4 1.4 0 00.1-.8c0-.1-.1-.2-.3-.3z" fill="white" />
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
      <rect width="24" height="24" rx="5" fill="#E91E63" />
      <path d="M12 6v8m0 0l-3-3m3 3l3-3M7 17h10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

function getIcon(label) {
  const l = label.toLowerCase()
  if (l.includes('meta ads')) return ICONS.meta
  if (l.includes('tiktok')) return ICONS.tiktok
  if (l.includes('metricool')) return ICONS.metricool
  if (l.includes('drive')) return ICONS.drive
  if (l.includes('instagram')) return ICONS.instagram
  if (l.includes('whatsapp')) return ICONS.whatsapp
  if (l.includes('downloader')) return ICONS.download
  return ICONS.sheets
}

function getStyle(label) {
  const l = label.toLowerCase()
  if (l.includes('meta ads')) return 'bg-[#E7F0FE] text-[#1565C0]'
  if (l.includes('tiktok')) return 'bg-gray-100 text-gray-800'
  if (l.includes('metricool')) return 'bg-[#E0F7F5] text-[#00897B]'
  if (l.includes('drive')) return 'bg-[#FFF8E1] text-[#F57F17]'
  if (l.includes('instagram')) return 'bg-[#FCE4EC] text-[#AD1457]'
  if (l.includes('whatsapp')) return 'bg-[#E8F5E9] text-[#2E7D32]'
  if (l.includes('downloader')) return 'bg-[#FCE4EC] text-[#C2185B]'
  // Sheets — differentiate by sheet name
  if (l.includes('finished ad')) return 'bg-[#E8F5E9] text-[#2E7D32]'
  if (l.includes('influencer')) return 'bg-[#EDE7F6] text-[#4527A0]'
  if (l.includes('testimonial') || l.includes('pop')) return 'bg-[#E0F2F1] text-[#00695C]'
  if (l.includes('ads (')) return 'bg-[#FFF3E0] text-[#E65100]'
  return 'bg-gray-100 text-gray-600'
}

export default function WhereTag({ where }) {
  if (!where) return null
  const items = Array.isArray(where) ? where : [where]
  return (
    <span className="inline-flex flex-wrap gap-1.5">
      {items.map((w, i) => (
        <a
          key={i}
          href={w.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center gap-1.5 text-[11px] leading-none font-medium pl-1.5 pr-2.5 py-1 rounded-full hover:brightness-95 transition-all ${getStyle(w.label)}`}
        >
          {getIcon(w.label)}
          {w.label}
        </a>
      ))}
    </span>
  )
}
