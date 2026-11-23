export default function Hero({ campaignActive }) {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 md:grid-cols-2">
        <div>
          <p className="font-hand text-xl text-cta">— dari dapur rumah kami, Tangerang</p>
          <h1 className="animate-fade-up-1 mt-2 font-heading text-4xl font-bold leading-tight text-brand sm:text-5xl">
            Masakan rumah Mama Ami.
          </h1>
          <p className="animate-fade-up-2 mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Vegetarian, tanpa bawang, dimasak pelan — bisa request 100% vegan atau pakai bawang
            sesuai selera Anda.
          </p>
          <p className="animate-fade-up-2 font-hand mt-2 text-lg text-muted">
            vegetarian &bull; tanpa bawang &bull; resep keluarga
          </p>
          <div className="animate-fade-up-3 mt-7 flex flex-wrap gap-4">
            {campaignActive && (
              <a
                href="#hampers"
                className="rounded-lg bg-cta px-6 py-3 text-sm font-semibold text-white shadow-hard transition hover:-translate-y-0.5"
              >
                Lihat Hampers Natal
              </a>
            )}
            <a
              href="#katalog"
              className={`rounded-lg px-6 py-3 text-sm font-semibold shadow-hard transition hover:-translate-y-0.5 ${campaignActive ? 'border-2 border-ink bg-white text-ink' : 'bg-cta text-white'}`}
            >
              Lihat Katalog Menu
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-64 pb-4">
          <div className="tilt-r border-2 border-ink bg-white p-3 pb-2 shadow-hard">
            <img src="/logo.png" alt="Masakan Dapoer Mama Ami" className="aspect-square w-full object-cover" />
            <p className="font-hand py-2 text-center text-xl text-muted">masakan rumah kami</p>
          </div>
          <div className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-6 bg-cta/25" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
