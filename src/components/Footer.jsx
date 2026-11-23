import { AtSign, MapPin, MessageCircle } from 'lucide-react'
import { waLink } from '../services/whatsapp.js'

export default function Footer({ waNumber }) {
  return (
    <footer id="kontak" className="bg-brand text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-bold">Dapoer Mama Ami</p>
          <p className="mt-1 text-sm text-white/80">Masakan vegetarian rumahan — tanpa bawang, bisa request vegan.</p>
        </div>
        <div className="text-sm">
          <p className="mb-1 font-semibold">Area Pengiriman</p>
          <p className="text-white/80">Tangerang & Jakarta. Di luar area tersebut silakan ambil sendiri (self-pickup).</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-semibold">Kontak</p>
          <a href={waLink(waNumber, 'Halo!')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp Admin
          </a>
          <a href="https://www.instagram.com/dapoermamaami/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/90 hover:text-white">
            <AtSign className="h-4 w-4" aria-hidden="true" /> @dapoermamaami
          </a>
          <p className="inline-flex items-center gap-2 text-white/80">
            <MapPin className="h-4 w-4" aria-hidden="true" /> Dapur: Tangerang
          </p>
        </div>
      </div>
      <p className="border-t border-white/10 py-3 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Dapoer Mama Ami. Semua masakan dimasak fresh tanpa pengawet.
      </p>
    </footer>
  )
}
