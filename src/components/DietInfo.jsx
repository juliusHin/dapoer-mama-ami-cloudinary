import { Leaf, MilkOff, Flame } from 'lucide-react'

const rules = [
  { icon: Leaf, title: 'Standar Dapur', text: 'Vegetarian (boleh telur/susu) & tanpa bawang-bawangan.' },
  { icon: MilkOff, title: 'Bisa Request 100% Vegan', text: 'Tanpa telur, susu, dan bahan hewani lainnya.' },
  { icon: Flame, title: 'Bisa Request Pakai Bawang', text: 'Cocok untuk pemula yang terbiasa makan bawang.' },
]

export default function DietInfo({ summary }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="font-heading text-2xl font-bold text-brand">Standar Dapur Kami — Transparan & Fleksibel</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">{summary}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {rules.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border-2 border-dashed border-brand/30 bg-white p-5">
            <Icon className="h-6 w-6 text-brand" aria-hidden="true" />
            <h3 className="mt-2 font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
