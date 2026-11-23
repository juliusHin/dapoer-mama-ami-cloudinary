export default function DietInfo({ summary }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="rounded-2xl border-2 border-ink bg-white p-6 shadow-hard sm:p-8">
        <h2 className="font-heading text-2xl font-bold text-brand">Standar Dapur Kami</h2>
        <svg className="mt-1 h-2 w-44" viewBox="0 0 176 8" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M2 5 C 30 1, 60 7, 90 4 S 150 2, 174 5"
            stroke="#D96B27"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{summary}</p>
        <ul className="font-hand mt-5 space-y-1.5 text-xl leading-snug text-ink">
          <li>&check; Standar: vegetarian &amp; tanpa bawang</li>
          <li>&check; Bisa request 100% vegan — tanpa telur &amp; susu</li>
          <li>&check; Bisa request pakai bawang</li>
        </ul>
      </div>
    </section>
  )
}
