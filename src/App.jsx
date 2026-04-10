import { useState, useEffect } from 'react'
import DailyOps from './components/DailyOps'
import AsherOps from './components/AsherOps'
import DailyReport from './components/DailyReport'

// Use local date, not UTC (toISOString converts to UTC which can shift the day)
const now = new Date()
const TODAY = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
const TODAY_DAY = now.getDay() // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
const IS_METRICOOL_DAY = TODAY_DAY === 1 || TODAY_DAY === 4 // Monday or Thursday

// --- Gelou's tasks ---

function createGelouDay() {
  return {
    date: TODAY,
    who: 'gelou',
    tasks: {
      sop1: {
        title: 'SOP 1: Ad Organization & Filing',
        description: 'Organize new ads from Ad Spreadsheet, name them, file in Drive, post as ads',
        frequency: 'Daily',
        steps: [
          { id: 's1-1', text: 'Find ads with Status = "Created" AND Added to Final Ad Sheet = "No"', done: false,
            where: { label: 'Ads (11/10/25-) Sheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=932862585#gid=932862585' } },
          { id: 's1-2', text: 'For each ad: create shortened name (lowercase_underscores), update Title + Title C columns', done: false,
            where: { label: 'Ads (11/10/25-) Sheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=932862585#gid=932862585' } },
          { id: 's1-3', text: 'Get next available number from the Number column', done: false,
            where: { label: 'Finished Ad Spreadsheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=9406102#gid=9406102' } },
          { id: 's1-4', text: 'Click the link in the "Final" column — find the final/most recent draft folder', done: false,
            where: { label: 'Google Drive', url: 'https://drive.google.com/drive/folders/1GlAFM_7Rj5sj9QIB0PFEvD6KlO3qAdpc' } },
          { id: 's1-5', text: 'Count ad files in the folder, enter count in "Amount" column', done: false,
            where: { label: 'Ads (11/10/25-) Sheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=932862585#gid=932862585' } },
          { id: 's1-6', text: 'Rename files inside to [NUMBER]_[name].[ext] (use .1, .2 for variations)', done: false,
            where: { label: 'Ads Google Drive', url: 'https://drive.google.com/drive/folders/1GlAFM_7Rj5sj9QIB0PFEvD6KlO3qAdpc' } },
          { id: 's1-7', text: 'Add new row: Number, Name, Link (to the Drive folder), Format', done: false,
            where: { label: 'Finished Ad Spreadsheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=9406102#gid=9406102' } },
          { id: 's1-9', text: 'Mark "Yes" in Added to Final Ad Sheet column', done: false,
            where: { label: 'Ads (11/10/25-) Sheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=932862585#gid=932862585' } },
          { id: 's1-10', text: 'Check: does any file in this folder have an "x" prefix (e.g. xVideo 3.mp4)?', done: false,
            where: { label: 'Ads Google Drive', url: 'https://drive.google.com/drive/folders/1GlAFM_7Rj5sj9QIB0PFEvD6KlO3qAdpc' },
            branch: {
              label: 'Yes — "x" file found → Post on Page (POP) flow',
              steps: [
                { id: 's1-pop-1', text: 'Download the "x" video. Get caption from column C and YouTube title from column D.', done: false,
                  where: { label: 'Testimonial POP Sheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=625366125#gid=625366125' } },
                { id: 's1-pop-2', text: 'Schedule post in Metricool (1 per day, 24hrs apart, all platforms: IG, TT, FB, YT Shorts, X)', done: false,
                  where: { label: 'Metricool', url: 'https://app.metricool.com/planner/calendar?blogId=2534933&userId=2062311' } },
                { id: 's1-pop-3', text: 'Mark "Added to metricool" = yes', done: false,
                  where: { label: 'Testimonial POP Sheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=625366125#gid=625366125' } },
                { id: 's1-pop-4', text: 'Paste link in Post on Page column + set status to "Scheduled - [date]"', done: false,
                  where: { label: 'Testimonial POP Sheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=625366125#gid=625366125' } },
              ],
            } },
          { id: 's1-11', text: 'If NO "x" file: post ad directly (upload video to Meta + TikTok as ad)', done: false,
            where: [
              { label: 'Meta Ads', url: 'https://adsmanager.facebook.com' },
              { label: 'TikTok Ads', url: 'https://ads.tiktok.com' },
            ] },
          { id: 's1-12', text: 'Update Meta Ad Status + TikTok Ad Status to "Posted"', done: false,
            where: { label: 'Finished Ad Spreadsheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=9406102#gid=9406102' } },
          { id: 's1-13', text: 'Change Status from "Created" to "Posted"', done: false,
            where: { label: 'Ads (11/10/25-) Sheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=932862585#gid=932862585' } },
        ],
        status: 'not-started',
        notes: '',
      },
      sop2: {
        title: 'SOP 2: Influencer Videos as Paid Ads',
        description: 'Run influencer videos as ads on both Instagram and TikTok',
        frequency: 'Daily',
        steps: [
          { id: 's2-1', text: 'Find rows where Ad Status = "To Do" or is missing either an IG or TikTok status. Skip rows marked "Don\'t Run".', done: false,
            where: { label: 'Influencer Spreadsheet (Posts)', url: 'https://docs.google.com/spreadsheets/d/1-cep-71yHRc6XxdEcq9vesl3KJLUjNaSqZF3eQB7GUA/edit?gid=82550399#gid=82550399' } },
          { id: 's2-2', text: 'For each video, figure out the path for EACH platform separately (click to open Decision Helper)', done: false, hasDecisionHelper: true },
          { id: 's2-3', text: 'INSTAGRAM — check "IG Partnered + Tag" column:', done: false,
            where: { label: 'Influencer Spreadsheet (Posts)', url: 'https://docs.google.com/spreadsheets/d/1-cep-71yHRc6XxdEcq9vesl3KJLUjNaSqZF3eQB7GUA/edit?gid=82550399#gid=82550399' },
            branch: {
              label: 'IG path — what to do + what to mark',
              steps: [
                { id: 's2-ig-1', text: '"YES" → Quick Duplicate an existing Spark ad in Meta → run as partnership ad → mark Ad Status: "IG Spark"', done: false,
                  where: { label: 'Meta Ads', url: 'https://adsmanager.facebook.com' } },
                { id: 's2-ig-2', text: '"not tagged" → SKIP IG for now. Creator hasn\'t tagged us yet. Don\'t mark anything. Come back later.', done: false },
                { id: 's2-ig-3', text: '"NA" → Creator only uses TikTok. Download video from TikTok. Quick Duplicate a non-Spark ad in Meta, upload the video. Upload video to Drive too. → mark Ad Status: "IG Run Ourselves"', done: false,
                  where: [
                    { label: 'Meta Ads', url: 'https://adsmanager.facebook.com' },
                    { label: 'Ads Google Drive', url: 'https://drive.google.com/drive/folders/1GlAFM_7Rj5sj9QIB0PFEvD6KlO3qAdpc' },
                  ] },
              ],
            } },
          { id: 's2-4', text: 'TIKTOK — check "TT Spark Code" column:', done: false,
            where: { label: 'Influencer Spreadsheet (Posts)', url: 'https://docs.google.com/spreadsheets/d/1-cep-71yHRc6XxdEcq9vesl3KJLUjNaSqZF3eQB7GUA/edit?gid=82550399#gid=82550399' },
            branch: {
              label: 'TikTok path — what to do + what to mark',
              steps: [
                { id: 's2-tt-1', text: 'Has a Spark code → use the code to run as TikTok Spark Ad in BOTH the Search campaign and Trial Start campaign → mark Ad Status: "TikTok Spark"', done: false,
                  where: { label: 'TikTok Ads', url: 'https://ads.tiktok.com' } },
                { id: 's2-tt-2', text: '"NEED" → SKIP TikTok for now. We don\'t have the Spark code yet. Don\'t mark anything. Come back later.', done: false },
                { id: 's2-tt-3', text: '"NA" → Creator doesn\'t use TikTok. Download video from IG. Upload to BOTH TikTok campaigns (Search + Trial Start). Upload video to Drive too. → mark Ad Status: "TikTok Run Ourselves"', done: false,
                  where: [
                    { label: 'TikTok Ads', url: 'https://ads.tiktok.com' },
                    { label: 'IG Downloader', url: 'https://snapinsta.to/en/instagram-reels-downloader' },
                    { label: 'Ads Google Drive', url: 'https://drive.google.com/drive/folders/1GlAFM_7Rj5sj9QIB0PFEvD6KlO3qAdpc' },
                  ] },
              ],
            } },
          { id: 's2-5', text: 'After running on at least one platform: add row to Finished Ad Spreadsheet (next number, name with underscores, link, format). Use the same number for both platforms.', done: false,
            where: { label: 'Finished Ad Spreadsheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=9406102#gid=9406102' } },
          { id: 's2-6', text: 'Update Meta Ad Status and/or TikTok Ad Status to "Posted" for whichever platforms you ran', done: false,
            where: { label: 'Finished Ad Spreadsheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=9406102#gid=9406102' } },
          { id: 's2-7', text: 'Remove "To Do" from the Ad Status dropdown once both platforms are done (or skipped)', done: false,
            where: { label: 'Influencer Spreadsheet (Posts)', url: 'https://docs.google.com/spreadsheets/d/1-cep-71yHRc6XxdEcq9vesl3KJLUjNaSqZF3eQB7GUA/edit?gid=82550399#gid=82550399' } },
        ],
        status: 'not-started',
        notes: '',
      },
      sop3: {
        title: 'SOP 3: Metricool Catch-Up — Run Scheduled Posts as Ads',
        description: 'Check if any previously scheduled Metricool posts are now live and run them as ads',
        frequency: 'Mon & Thu',
        steps: [
          { id: 's3-1', text: 'Check for any rows where status = "Scheduled" with today\'s date or earlier — these posts are now LIVE', done: false,
            where: { label: 'Finished Ad Spreadsheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=9406102#gid=9406102' } },
          { id: 's3-2', text: 'Also check POP sheet for any rows where "Added to metricool" = yes BUT "run as ad" = no', done: false,
            where: { label: 'Testimonial POP Sheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=625366125#gid=625366125' } },
          { id: 's3-3', text: 'For each live post: go to Meta Ads → Quick Duplicate a non-Spark ad → select "Use Existing Post" → find the post on your page', done: false,
            where: { label: 'Meta Ads', url: 'https://adsmanager.facebook.com' } },
          { id: 's3-4', text: 'Verify AppStack URL is in Website URL field + CTA = "Download". Set ad name to match Finished Ad Spreadsheet.', done: false,
            where: { label: 'Meta Ads', url: 'https://adsmanager.facebook.com' } },
          { id: 's3-5', text: 'Do the same in TikTok Ads — use existing post as ad', done: false,
            where: { label: 'TikTok Ads', url: 'https://ads.tiktok.com' } },
          { id: 's3-6', text: 'Publish all ads', done: false,
            where: [
              { label: 'Meta Ads', url: 'https://adsmanager.facebook.com' },
              { label: 'TikTok Ads', url: 'https://ads.tiktok.com' },
            ] },
          { id: 's3-7', text: 'Update status from "Scheduled" to "Posted"', done: false,
            where: { label: 'Finished Ad Spreadsheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=9406102#gid=9406102' } },
          { id: 's3-8', text: 'Mark "run as ad" = yes for each one', done: false,
            where: { label: 'Testimonial POP Sheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=625366125#gid=625366125' } },
        ],
        status: 'not-started',
        notes: '',
      },
      sop4: {
        title: 'Influencer Outreach',
        description: 'Find and recruit new creators for Clear30 campaigns',
        frequency: 'Daily',
        simple: true,
        steps: [],
        status: 'not-started',
        notes: '',
      },
    },
    items: [],
    notes: '',
  }
}

// --- Asher's tasks ---

function createAsherDay() {
  return {
    date: TODAY,
    who: 'asher',
    tasks: {
      review: {
        title: 'Review & Decide',
        description: 'Review new content and assign distribution paths — this is what Gelou is waiting on',
        steps: [
          { id: 'a-r1', text: 'Review new influencer posts — check new videos that came in', done: false,
            where: { label: 'Influencer Spreadsheet (Posts)', url: 'https://docs.google.com/spreadsheets/d/1-cep-71yHRc6XxdEcq9vesl3KJLUjNaSqZF3eQB7GUA/edit?gid=82550399#gid=82550399' } },
          { id: 'a-r2', text: 'For each post: decide distribution path (Spark ad / hidden ad / post to pages) and mark it', done: false,
            where: { label: 'Influencer Spreadsheet (Posts)', url: 'https://docs.google.com/spreadsheets/d/1-cep-71yHRc6XxdEcq9vesl3KJLUjNaSqZF3eQB7GUA/edit?gid=82550399#gid=82550399' } },
          { id: 'a-r3', text: 'Review and greenlight any new in-house content from JP / Eliaquim', done: false,
            where: { label: 'Ads (11/10/25-) Sheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=932862585#gid=932862585' } },
          { id: 'a-r4', text: 'Review testimonial videos — mark ones for posting by adding "x" prefix to filename (e.g. xVideo 3.mp4)', done: false,
            where: { label: 'Ads Google Drive', url: 'https://drive.google.com/drive/folders/1GlAFM_7Rj5sj9QIB0PFEvD6KlO3qAdpc' } },
          { id: 'a-r5', text: 'For each "x" video: add row with post name, Drive link, caption, and YouTube title', done: false,
            where: { label: 'Testimonial POP Sheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=625366125#gid=625366125' } },
          { id: 'a-r6', text: 'Accept any pending IG collab posts', done: false,
            where: { label: 'Instagram', url: 'https://instagram.com' } },
        ],
        status: 'not-started',
        notes: '',
      },
      creators: {
        title: 'Creator Pipeline',
        description: 'Recruit, manage, and brief influencer creators',
        steps: [
          { id: 'a-c1', text: 'Check DMs / email for new creator replies or pitches', done: false,
            where: [
              { label: 'Instagram', url: 'https://instagram.com' },
              { label: 'TikTok', url: 'https://tiktok.com' },
            ] },
          { id: 'a-c2', text: 'Follow up with active creators (pending posts, spark codes, permissions)', done: false,
            where: { label: 'Influencer Spreadsheet (Posts)', url: 'https://docs.google.com/spreadsheets/d/1-cep-71yHRc6XxdEcq9vesl3KJLUjNaSqZF3eQB7GUA/edit?gid=82550399#gid=82550399' } },
          { id: 'a-c3', text: 'Send briefs or contracts to any new creators ready to start', done: false },
          { id: 'a-c4', text: 'Check if any creators need TT Spark codes or IG partnership tags collected', done: false,
            where: { label: 'Influencer Spreadsheet (Posts)', url: 'https://docs.google.com/spreadsheets/d/1-cep-71yHRc6XxdEcq9vesl3KJLUjNaSqZF3eQB7GUA/edit?gid=82550399#gid=82550399' } },
        ],
        status: 'not-started',
        notes: '',
      },
      ig: {
        title: 'IG Stories & Highlights',
        description: 'Post testimonials and content to IG stories',
        steps: [
          { id: 'a-ig1', text: 'Check for new user testimonials ready for IG stories', done: false,
            where: { label: 'Testimonial POP Sheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=625366125#gid=625366125' } },
          { id: 'a-ig2', text: 'Post testimonials to IG stories', done: false,
            where: { label: 'Instagram', url: 'https://instagram.com' } },
          { id: 'a-ig3', text: 'Add best ones to highlights', done: false,
            where: { label: 'Instagram', url: 'https://instagram.com' } },
        ],
        status: 'not-started',
        notes: '',
      },
      ads: {
        title: 'Ads & Performance',
        description: 'Monitor ad budgets, performance, and optimize',
        steps: [
          { id: 'a-ad1', text: 'Review spend, CPM, performance of active ads', done: false,
            where: { label: 'Meta Ads', url: 'https://adsmanager.facebook.com' } },
          { id: 'a-ad2', text: 'Review spend, CPM, performance', done: false,
            where: { label: 'TikTok Ads', url: 'https://ads.tiktok.com' } },
          { id: 'a-ad3', text: 'Pause underperforming ads, increase budget on winners', done: false,
            where: [
              { label: 'Meta Ads', url: 'https://adsmanager.facebook.com' },
              { label: 'TikTok Ads', url: 'https://ads.tiktok.com' },
            ] },
          { id: 'a-ad4', text: 'Check organic post performance', done: false,
            where: { label: 'Metricool', url: 'https://app.metricool.com/planner/calendar?blogId=2534933&userId=2062311' } },
        ],
        status: 'not-started',
        notes: '',
      },
      gelou: {
        title: 'Check on Gelou',
        description: 'Review Gelou\'s work and unblock her',
        steps: [
          { id: 'a-g1', text: 'Read Gelou\'s daily report from yesterday', done: false,
            where: { label: 'WhatsApp', url: 'https://web.whatsapp.com' } },
          { id: 'a-g2', text: 'Answer any questions she flagged', done: false,
            where: { label: 'WhatsApp', url: 'https://web.whatsapp.com' } },
          { id: 'a-g3', text: 'Spot-check a few items she posted (correct naming, right spreadsheet entries, ads live)', done: false,
            where: { label: 'Finished Ad Spreadsheet', url: 'https://docs.google.com/spreadsheets/d/1cvpupZRZUG57gfN6BoZGkhE2VBq83RDaYEoUazvatOA/edit?gid=9406102#gid=9406102' } },
          { id: 'a-g4', text: 'If she flagged blocked items — help unblock (Meta errors, permissions, missing spark codes)', done: false },
        ],
        status: 'not-started',
        notes: '',
        links: [],
      },
    },
    items: [],
    notes: '',
  }
}

// --- Storage helpers ---

function getStoredDay(who) {
  const key = `contentOps_${who}`
  const stored = localStorage.getItem(key)
  if (stored) {
    const parsed = JSON.parse(stored)
    if (parsed.date === TODAY) return parsed
  }
  return who === 'asher' ? createAsherDay() : createGelouDay()
}

function saveDay(who, data) {
  localStorage.setItem(`contentOps_${who}`, JSON.stringify(data))
}

// --- App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('gelou')
  const [gelouData, setGelouData] = useState(() => getStoredDay('gelou'))
  const [asherData, setAsherData] = useState(() => getStoredDay('asher'))
  const [showReport, setShowReport] = useState(false)

  const dayData = activeTab === 'gelou' ? gelouData : asherData
  const setDayData = activeTab === 'gelou' ? setGelouData : setAsherData

  useEffect(() => { saveDay('gelou', gelouData) }, [gelouData])
  useEffect(() => { saveDay('asher', asherData) }, [asherData])

  const toggleStep = (sopKey, stepId) => {
    setDayData(prev => {
      const sop = prev.tasks[sopKey]
      const newSteps = sop.steps.map(s =>
        s.id === stepId ? { ...s, done: !s.done } : s
      )
      const allDone = newSteps.every(s => s.done)
      const anyDone = newSteps.some(s => s.done)
      const newStatus = allDone ? 'done' : anyDone ? 'in-progress' : 'not-started'
      return {
        ...prev,
        tasks: {
          ...prev.tasks,
          [sopKey]: { ...sop, steps: newSteps, status: newStatus },
        },
      }
    })
  }

  const updateSOPNotes = (sopKey, notes) => {
    setDayData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [sopKey]: { ...prev.tasks[sopKey], notes },
      },
    }))
  }

  const addItem = (item) => {
    setDayData(prev => ({
      ...prev,
      items: [...prev.items, { ...item, id: Date.now() }],
    }))
  }

  const updateItem = (id, updates) => {
    setDayData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }))
  }

  const removeItem = (id) => {
    setDayData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }))
  }

  const updateNotes = (notes) => {
    setDayData(prev => ({ ...prev, notes }))
  }

  if (showReport) {
    return <DailyReport dayData={dayData} onBack={() => setShowReport(false)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Clear30 Daily Ops</h1>
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <button
              onClick={() => setShowReport(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Generate Report
            </button>
          </div>
          {/* Tab switcher */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('gelou')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'gelou'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Gelou
            </button>
            <button
              onClick={() => setActiveTab('asher')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'asher'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Asher
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <ProgressBar tasks={dayData.tasks} isMetricoolDay={activeTab === 'gelou' ? IS_METRICOOL_DAY : true} />

        {activeTab === 'gelou' ? (
          <DailyOps
            dayData={dayData}
            onToggleStep={toggleStep}
            onUpdateSOPNotes={updateSOPNotes}
            onUpdateNotes={updateNotes}
            isMetricoolDay={IS_METRICOOL_DAY}
          />
        ) : (
          <AsherOps
            dayData={dayData}
            onToggleStep={toggleStep}
            onUpdateSOPNotes={updateSOPNotes}
            onUpdateNotes={updateNotes}
          />
        )}
      </main>
    </div>
  )
}

function ProgressBar({ tasks, isMetricoolDay }) {
  const todayTasks = Object.entries(tasks).filter(([key, sop]) => {
    if (sop.simple) return false
    if (key === 'sop3' && !isMetricoolDay) return false
    return true
  })
  const allSteps = todayTasks.flatMap(([, sop]) => sop.steps)
  const done = allSteps.filter(s => s.done).length
  const total = allSteps.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Today's Progress</span>
        <span className="text-sm text-gray-500">{done}/{total} steps</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            backgroundColor: pct === 100 ? '#22c55e' : pct > 50 ? '#3b82f6' : '#f59e0b',
          }}
        />
      </div>
    </div>
  )
}
