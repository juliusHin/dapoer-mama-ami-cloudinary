import { MessageCircle, CalendarClock } from 'lucide-react'
import { waLink, eventMessage } from '../services/whatsapp.js'

const rupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function EventSection({ events, waNumber }) {
  return (
    <section id="acara" className="bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-heading text-2xl font-bold text-brand">Pesanan Acara & Nasi Kotak</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Dokumentasi pesanan acara yang pernah kami tangani. Minimal 20 kotak, pemesanan minimal H-10 sebelum hari acara.
        </p>

        {events.length === 0 ? (
          <p className="mt-6 rounded-xl bg-cream p-5 text-sm text-muted">
            Dokumentasi acara menyusul — silakan konsultasi dulu via WhatsApp.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <article key={e.id} className="overflow-hidden rounded-xl bg-cream shadow-sm">
                <div className="aspect-[4/3] w-full overflow-hidden bg-sand">
                  {e.image_url && (
                    <img src={e.image_url} alt={e.title} loading="lazy" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="space-y-1.5 p-4">
                  <h3 className="font-heading text-lg font-bold">{e.title}</h3>
                  <p className="text-sm text-muted">{e.description}</p>
                  <p className="font-semibold text-cta">{rupiah(e.starting_price)} <span className="font-normal text-muted">/ kotak</span></p>
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
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white hover:bg-cta/90"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Konsultasi Acara via WhatsApp
        </a>
      </div>
    </section>
  )
}
