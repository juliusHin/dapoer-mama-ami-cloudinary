import { Gift } from 'lucide-react'
import MenuCard from './MenuCard.jsx'

export default function CampaignSection({ name, items, waNumber }) {
  return (
    <section className="bg-campaign py-10 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-2">
          <Gift className="h-6 w-6" aria-hidden="true" />
          <h2 className="font-heading text-2xl font-bold">{name}</h2>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-white/80">
          Kue hampers spesial musim liburan — bisa diambil sendiri atau dikirim. Pesan sekarang selama stok tersedia.
        </p>

        {items.length === 0 ? (
          <p className="mt-6 rounded-xl bg-white/10 p-5 text-sm text-white/90">
            Daftar paket hampers menyusul — silakan tanya dulu via WhatsApp di bagian bawah halaman ini.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((m) => (
              <MenuCard key={m.id} menu={m} poOpen={false} waNumber={waNumber} variant="hampers" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
