import { MessageCircle } from 'lucide-react'
import { waLink, poMessage, scheduleMessage, hampersMessage } from '../services/whatsapp.js'

const rupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

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
    <article className="flex flex-col border-2 border-ink/80 bg-white p-3 shadow-hard">
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
      <div className="flex flex-1 flex-col gap-1.5 px-1 pb-1 pt-3">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
          {(menu.diet_labels || []).map((l) => (
            <span key={l} className="underline decoration-cta/60 decoration-wavy underline-offset-4">
              {l}
            </span>
          ))}
        </div>
        <h3 className="font-heading text-lg font-bold leading-snug">{menu.name}</h3>
        <p className="font-heading text-base font-bold text-brand">{rupiah(menu.price)}</p>
        <p className="flex-1 text-sm leading-relaxed text-muted">{menu.description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-2 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-hard transition hover:-translate-y-0.5 ${active ? 'bg-cta text-white' : 'border-2 border-ink bg-white text-ink'}`}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          {label}
        </a>
      </div>
    </article>
  )
}
