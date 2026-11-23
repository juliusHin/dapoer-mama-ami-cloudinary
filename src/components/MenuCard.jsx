import { MessageCircle } from 'lucide-react'
import { waLink, poMessage, scheduleMessage, hampersMessage } from '../services/whatsapp.js'

const rupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

const BADGE_STYLE = {
  'Vegetarian': 'bg-green-100 text-green-900',
  'Bisa Request Vegan': 'bg-amber-100 text-amber-900',
  'Default Tanpa Bawang': 'bg-stone-200 text-stone-700',
}

export default function MenuCard({ menu, poOpen, waNumber, variant = 'menu' }) {
  const isHampers = variant === 'hampers'
  const active = isHampers || (poOpen && menu.is_active_po)
  const label = isHampers
    ? 'Pesan Hampers via WhatsApp'
    : active
      ? 'Ikut PO via WhatsApp'
      : 'Tanya Jadwal Menu Ini'
  const href = waLink(
    waNumber,
    isHampers ? hampersMessage(menu.name) : active ? poMessage(menu.name) : scheduleMessage(menu.name),
  )

  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="aspect-[4/3] w-full overflow-hidden bg-sand">
        {menu.image_url && (
          <img
            src={menu.image_url}
            alt={menu.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {(menu.diet_labels || []).map((l) => (
            <span key={l} className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${BADGE_STYLE[l] || 'bg-stone-200 text-stone-700'}`}>
              {l}
            </span>
          ))}
        </div>
        <h3 className="font-heading text-lg font-bold">{menu.name}</h3>
        <p className="font-semibold text-cta">{rupiah(menu.price)}</p>
        <p className="flex-1 text-sm text-muted">{menu.description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-2 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ${active ? 'bg-cta text-white hover:bg-cta/90' : 'border border-brand/40 bg-white text-brand hover:bg-sand'}`}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {label}
        </a>
      </div>
    </article>
  )
}
