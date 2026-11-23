import { useEffect, useMemo, useState } from 'react'
import { Search, SearchX } from 'lucide-react'
import { getSettings, getMenus, getEvents, FALLBACK_SETTINGS, isCampaignActive } from '../services/firebase.js'
import Navbar from '../components/Navbar.jsx'
import PoBanner from '../components/PoBanner.jsx'
import CampaignSection from '../components/CampaignSection.jsx'
import DietInfo from '../components/DietInfo.jsx'
import MenuCard from '../components/MenuCard.jsx'
import EventSection from '../components/EventSection.jsx'
import Footer from '../components/Footer.jsx'

function MenuSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="aspect-[4/3] bg-sand" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-24 rounded bg-sand" />
            <div className="h-5 w-40 rounded bg-sand" />
            <div className="h-4 w-20 rounded bg-sand" />
            <div className="h-10 w-full rounded-full bg-sand" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  const [settings, setSettings] = useState(FALLBACK_SETTINGS)
  const [menus, setMenus] = useState(null)
  const [events, setEvents] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('Semua')
  const [veganOnly, setVeganOnly] = useState(false)

  useEffect(() => {
    getSettings().then(setSettings)
    getMenus().then(setMenus).catch(() => setMenus([]))
    getEvents().then(setEvents).catch(() => setEvents([]))
  }, [])

  const poOpen = settings.po_status === 'buka'
  const campaignActive = isCampaignActive(settings)
  const hampers = useMemo(
    () => (menus || []).filter((m) => m.category === 'Hampers Natal'),
    [menus],
  )
  const categories = useMemo(
    () => ['Semua', ...new Set((menus || []).map((m) => m.category).filter(Boolean))],
    [menus],
  )

  const filtered = useMemo(() => {
    let list = menus || []
    if (q.trim()) {
      const needle = q.trim().toLowerCase()
      list = list.filter((m) => m.name.toLowerCase().includes(needle) || (m.description || '').toLowerCase().includes(needle))
    }
    if (category !== 'Semua') list = list.filter((m) => m.category === category)
    if (veganOnly) list = list.filter((m) => (m.diet_labels || []).includes('Bisa Request Vegan'))
    return list
  }, [menus, q, category, veganOnly])

  return (
    <>
      <Navbar />
      <PoBanner settings={settings} />
      {campaignActive && (
        <CampaignSection name={settings.campaign_name} items={hampers} waNumber={settings.whatsapp_number} />
      )}

      <section className="bg-gradient-to-b from-white to-cream py-14 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="font-heading text-3xl font-bold text-brand sm:text-4xl">
            Masakan Nabati Rumahan yang Bikin Jatuh Hati
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
            Masakan vegetarian homemade tanpa bawang, dimasak fresh dengan bahan segar.
            Bisa request 100% vegan atau pakai bawang sesuai selera Anda.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href="#katalog" className="rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white hover:bg-cta/90">
              {poOpen ? 'Pesan Kloter Ini' : 'Lihat Katalog Menu'}
            </a>
            <a href="#acara" className="rounded-full border border-brand/40 bg-white px-6 py-3 text-sm font-semibold text-brand hover:bg-sand">
              Lihat Paket Acara
            </a>
          </div>
        </div>
      </section>

      <DietInfo summary={settings.kitchen_rules_summary} />

      <section id="katalog" className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="font-heading text-2xl font-bold text-brand">Katalog Menu & Portofolio</h2>

        <div className="mt-4 flex flex-col gap-3">
          <label className="relative block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari nama menu... (misal: jamur, rendang, nasi)"
              className="w-full rounded-full border border-sand bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-brand"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${category === c ? 'bg-brand text-white' : 'bg-white text-muted hover:bg-sand'}`}
              >
                {c}
              </button>
            ))}
            <button
              onClick={() => setVeganOnly((v) => !v)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${veganOnly ? 'bg-cta text-white' : 'bg-white text-muted hover:bg-sand'}`}
            >
              Bisa Request Vegan
            </button>
          </div>
        </div>

        <div className="mt-6">
          {menus === null ? (
            <MenuSkeleton />
          ) : filtered.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center text-sm text-muted">
              <SearchX className="mx-auto mb-2 h-6 w-6" aria-hidden="true" />
              {menus.length === 0
                ? 'Katalog menu akan segera hadir. Hubungi kami via WhatsApp untuk info menu terbaru.'
                : 'Menu tidak ditemukan, coba kata kunci lain.'}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m) => (
                <MenuCard key={m.id} menu={m} poOpen={poOpen} waNumber={settings.whatsapp_number} />
              ))}
            </div>
          )}
        </div>
      </section>

      <EventSection events={events} waNumber={settings.whatsapp_number} />
      <Footer waNumber={settings.whatsapp_number} />
    </>
  )
}
