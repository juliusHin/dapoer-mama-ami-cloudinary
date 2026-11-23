import { Gift } from 'lucide-react'
import MenuCard from './MenuCard.jsx'
import PlaceholderArt from './PlaceholderArt.jsx'

// Kartu contoh saat data hampers belum diisi — hilang otomatis begitu paket asli masuk.
const DEMO_HAMPERS = ['Contoh Hampers Mini', 'Contoh Hampers Classic', 'Contoh Hampers Premium']

export default function CampaignSection({ name, items, waNumber }) {
  return (
    <section className="border-y-2 border-ink bg-campaign py-10 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-2">
          <Gift className="h-6 w-6" aria-hidden="true" />
          <h2 className="font-heading text-2xl font-bold">{name}</h2>
        </div>
        <p className="font-hand mt-1 text-xl text-white/90">
          pesan sebelum Natal — kuota terbatas!
        </p>

        {items.length === 0 ? (
          <div>
            <p className="font-hand mb-4 text-lg text-white/85">
              contoh tampilan — daftar paket asli menyusul, tanya dulu aja ya lewat WhatsApp
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DEMO_HAMPERS.map((title, i) => (
                <div key={title} className={i % 2 ? 'tilt-r' : 'tilt-l'}>
                  <div className="border-2 border-white/80 bg-white p-3 shadow-hard">
                    <div className="aspect-[4/3] overflow-hidden bg-sand">
                      <PlaceholderArt label={title} seed={title} />
                    </div>
                    <h3 className="font-hand px-1 pt-3 text-center text-xl text-muted">{title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((m) => (
              <div key={m.id} className="tilt-l odd:tilt-r even:tilt-l">
                <MenuCard menu={m} poOpen={false} waNumber={waNumber} variant="hampers" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
