import { MessageCircle, CalendarClock } from 'lucide-react'
import { waLink, eventMessage } from '../services/whatsapp.js'

const rupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function EventSection({ events, waNumber }) {
  return (
    <section id="acara" className="bg-cream py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-heading text-2xl font-bold text-brand">Pesanan Acara & Nasi Kotak</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Butuh konsumsi untuk syukuran atau acara kantor? Ini dokumentasi pesanan yang pernah kami
          tangani.
        </p>

        {events.length === 0 ? (
          <p className="mt-6 rounded-lg border-2 border-ink/60 bg-white p-5 text-sm text-muted shadow-hard">
            Dokumentasi acara lagi dikumpulkan — silakan konsultasi dulu via WhatsApp.
          </p>
        ) : (
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e, i) => (
              <article key={e.id} className={`${i % 2 ? 'tilt-r' : 'tilt-l'} border-2 border-ink/80 bg-white p-3 shadow-hard`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
                  {e.image_url && (
                    <img src={e.image_url} alt={e.title} loading="lazy" className="h-full w-full object-cover" />
                  )}
                  <div className="absolute -top-0 left-1/2 h-5 w-20 -translate-x-1/2 -translate-y-1/2 -rotate-3 bg-cta/25" aria-hidden="true" />
                </div>
                <div className="space-y-1.5 px-1 pb-1 pt-3">
                  <h3 className="font-heading text-lg font-bold leading-snug">{e.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{e.description}</p>
                  <p className="font-heading font-bold text-brand">
                    Mulai {rupiah(e.starting_price)} <span className="font-body text-xs font-normal text-muted">/ kotak</span>
                  </p>
                  <p className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
                    <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" /> {e.min_order_info}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <a
          href={waLink(waNumber, eventMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-cta px-6 py-3 text-sm font-semibold text-white shadow-hard transition hover:-translate-y-0.5"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Konsultasi Acara via WhatsApp
        </a>
      </div>
    </section>
  )
}
