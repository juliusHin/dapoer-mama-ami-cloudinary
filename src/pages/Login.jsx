import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/firebase.js'
import { Lock, Loader2 } from 'lucide-react'

const ERRORS = {
  'auth/invalid-credential': 'Email atau kata sandi salah. Silakan coba lagi.',
  'auth/wrong-password': 'Email atau kata sandi salah. Silakan coba lagi.',
  'auth/user-not-found': 'Email atau kata sandi salah. Silakan coba lagi.',
  'auth/too-many-requests': 'Terlalu banyak percobaan gagal. Coba lagi dalam beberapa menit.',
  'auth/network-request-failed': 'Koneksi bermasalah. Periksa internet Anda lalu coba lagi.',
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  useEffect(
    () => onAuthStateChanged(auth, (u) => u && navigate('/admin', { replace: true })),
    [navigate],
  )

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError(ERRORS[err.code] || 'Gagal masuk. Silakan coba lagi.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow-sm"
      >
        <div className="space-y-1 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
            <Lock className="h-5 w-5 text-brand" aria-hidden="true" />
          </span>
          <h1 className="font-heading text-xl font-bold text-brand">Masuk Panel Admin</h1>
          <p className="text-xs text-muted">Halaman khusus pengelola Dapoer Mama Ami</p>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <label className="block text-sm font-medium">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-sand px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
        </label>

        <label className="block text-sm font-medium">
          Kata Sandi
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-sand px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
        </label>

        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand/90 disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {busy ? 'Memeriksa...' : 'Masuk'}
        </button>
      </form>
    </main>
  )
}
