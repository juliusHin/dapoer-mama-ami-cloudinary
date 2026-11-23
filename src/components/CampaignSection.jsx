import { Gift } from 'lucide-react'
import MenuCard from './MenuCard.jsx'

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
          <p className="mt-6 rounded-lg border-2 border-white/60 bg-white/10 p-5 text-sm text-white/90">
            Daftar paket hampers lagi disiapkan — tanya dulu aja ya lewat WhatsApp di bagian bawah
            halaman ini.
          </p>
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
