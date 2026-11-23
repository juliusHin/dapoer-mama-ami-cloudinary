import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../services/firebase.js'

// Placeholder dasbor — digantikan implementasi penuh pada Issue #4.
export default function Admin() {
  const navigate = useNavigate()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream px-4 text-center">
      <h1 className="font-heading text-2xl font-bold text-brand">Login Berhasil</h1>
      <p className="max-w-sm text-sm text-muted">
        Dasbor admin sedang dibangun (Issue #4–#6). Sementara ini Anda sudah terhubung sebagai admin.
      </p>
      <div className="flex gap-3">
        <a href="/" className="rounded-full border border-brand/40 px-5 py-2.5 text-sm font-semibold text-brand hover:bg-sand">
          Kembali ke Beranda
        </a>
        <button
          onClick={() => { signOut(auth); navigate('/login') }}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand/90"
        >
          Keluar
        </button>
      </div>
    </main>
  )
}
