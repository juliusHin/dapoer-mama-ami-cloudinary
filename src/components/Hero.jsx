import { Leaf, ShieldCheck, Home as HomeIcon, ArrowRight } from 'lucide-react'

const chips = [
  { icon: Leaf, text: 'Vegetarian' },
  { icon: ShieldCheck, text: 'Tanpa Bawang' },
  { icon: HomeIcon, text: 'Homemade' },
]

export default function Hero({ campaignActive }) {
  return (
    <section className="hero-bg relative overflow-hidden text-white">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:py-24">
        <span className="animate-fade-up rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-medium tracking-wide text-white/85">
          Masakan Rumahan Vegetarian — Tangerang
        </span>
        <h1 className="animate-fade-up-1 mt-5 font-heading text-3xl font-bold leading-tight sm:text-5xl">
          Masakan Nabati Rumahan yang{' '}
          <span className="italic text-[#F3C57C]">Bikin Jatuh Hati</span>
        </h1>
        <p className="animate-fade-up-2 mt-4 max-w-xl text-sm text-white/75 sm:text-base">
          Dimasak fresh tanpa pengawet, bisa request 100% vegan atau pakai bawang sesuai selera Anda.
        </p>
        <div className="animate-fade-up-3 mt-6 flex flex-wrap justify-center gap-2">
          {chips.map(({ icon: Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold">
              <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {text}
            </span>
          ))}
        </div>
        <div className="animate-fade-up-4 mt-8 flex flex-wrap justify-center gap-3">
          {campaignActive && (
            <a
              href="#hampers"
              className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-cta/90"
            >
              Lihat Hampers Natal <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          <a
            href="#katalog"
            className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-white/10 ${campaignActive ? 'border-white/40 text-white' : 'bg-cta border-transparent text-white hover:bg-cta/90'}`}
          >
            Lihat Katalog Menu
          </a>
        </div>
      </div>
    </section>
  )
}
