import { useEffect, useState } from 'react'
import { Timer } from 'lucide-react'
import { campaignTimeLeft } from '../services/firebase.js'

const pad = (n) => String(n).padStart(2, '0')

export default function Countdown({ end, label }) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const left = campaignTimeLeft(end, now)
  if (!left) return null

  return (
    <div className="bg-cta text-white">
      <p className="animate-fade-up mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-3 text-center text-sm font-medium">
        <Timer className="h-4 w-4" aria-hidden="true" />
        <span>{label} berakhir dalam</span>
        <strong className="font-heading text-base tabular-nums tracking-wide">
          {left.days} hari {pad(left.hours)}:{pad(left.minutes)}:{pad(left.seconds)}
        </strong>
      </p>
    </div>
  )
}
