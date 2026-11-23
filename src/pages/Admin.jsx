import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, getSettings, saveSettings } from '../services/firebase.js'
import MenuManager from '../components/MenuManager.jsx'
import EventManager from '../components/EventManager.jsx'
import { Loader2, LogOut, Check, AlertCircle } from 'lucide-react'

const QUOTA_OPTIONS = [
  ['tersedia', 'Kuota Tersedia'],
  ['hampir_habis', 'Kuota Hampir Habis'],
  ['penuh', 'Kuota Penuh'],
]

const inputCls =
  'mt-1 w-full rounded-lg border border-sand px-3 py-2.5 text-sm outline-none focus:border-brand'

export default function Admin() {
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)
  const [form, setForm] = useState(null)
  const [tab, setTab] = useState(1)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)

  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        if (!u) navigate('/login', { replace: true })
        else setReady(true)
      }),
    [navigate],
  )

  useEffect(() => {
    if (ready) getSettings().then(setForm)
  }, [ready])

  if (!ready || !form)
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream">
        <Loader2 className="h-6 w-6 animate-spin text-brand" aria-label="Memuat" />
      </main>
    )

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function save() {
    setBusy(true)
    setMsg(null)
    try {
      await saveSettings(form)
      setMsg({ ok: true, text: 'Perubahan tersimpan. Halaman depan sudah diperbarui.' })
    } catch (err) {
      setMsg({ ok: false, text: `Gagal menyimpan: ${err.message}` })
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 border-b border-sand bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <h1 className="font-heading text-lg font-bold text-brand">Dasbor Admin</h1>
          <button
            onClick={() => { signOut(auth); navigate('/login') }}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 px-4 py-2 text-sm font-semibold text-brand hover:bg-sand"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" /> Keluar
          </button>
        </div>
        <nav className="mx-auto flex max-w-3xl gap-1 px-4">
          {[[1, 'Status PO'], [2, 'Kelola Menu'], [3, 'Galeri Acara']].map(([n, label]) => (
            <button
              key={n}
              onClick={() => setTab(n)}
              className={`rounded-t-lg px-4 py-2 text-sm font-medium ${tab === n ? 'border-b-2 border-brand text-brand' : 'text-muted hover:text-brand'}`}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-6">
        {tab === 1 && (
          <section className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-heading text-base font-bold">Pengaturan Kloter Pre-Order (PO)</h2>

            <fieldset>
              <legend className="text-sm font-semibold">Status PO Saat Ini</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {['buka', 'tutup'].map((s) => (
                  <label
                    key={s}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border-2 py-3 text-sm font-bold ${form.po_status === s ? (s === 'buka' ? 'border-brand bg-brand text-white' : 'border-muted bg-sand text-ink') : 'border-sand text-muted hover:border-brand/40'}`}
                  >
                    <input type="radio" name="po_status" value={s} checked={form.po_status === s} onChange={set('po_status')} className="sr-only" />
                    {s === 'buka' ? 'PO BUKA' : 'PO TUTUP'}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block text-sm font-medium">Judul Kloter<input value={form.po_title} onChange={set('po_title')} placeholder="PO Kloter Spesial Akhir Pekan" className={inputCls} /></label>
            <label className="block text-sm font-medium">Tanggal Pengiriman<input value={form.delivery_date} onChange={set('delivery_date')} placeholder="Sabtu, 28 November 2026" className={inputCls} /></label>
            <label className="block text-sm font-medium">Status Ketersediaan Kuota
              <select value={form.quota_status} onChange={set('quota_status')} className={inputCls}>
                {QUOTA_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
            <label className="block text-sm font-medium">Nomor WhatsApp Pesanan (format 62...)<input value={form.whatsapp_number} onChange={set('whatsapp_number')} placeholder="6281234567890" className={inputCls} /></label>
            <label className="block text-sm font-medium">Link Grup/Saluran Info PO <span className="font-normal text-muted">(kosongkan untuk arahkan ke chat admin)</span><input value={form.whatsapp_group_link || ''} onChange={set('whatsapp_group_link')} placeholder="https://chat.whatsapp.com/..." className={inputCls} /></label>

            <h3 className="border-t border-sand pt-4 font-heading text-base font-bold">Kampanye Musiman</h3>
            <label className="block text-sm font-medium">Nama Kampanye<input value={form.campaign_name || ''} onChange={set('campaign_name')} placeholder="Hampers Natal 2026" className={inputCls} /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">Mulai Tampil<input type="date" value={form.campaign_start || ''} onChange={set('campaign_start')} className={inputCls} /></label>
              <label className="block text-sm font-medium">Terakhir Tampil<input type="date" value={form.campaign_end || ''} onChange={set('campaign_end')} className={inputCls} /></label>
            </div>
            <p className="text-xs text-muted">Kosongkan nama atau tanggal untuk menonaktifkan section kampanye.</p>

            {msg && (
              <p role="status" className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${msg.ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
                {msg.ok ? <Check className="h-4 w-4" aria-hidden="true" /> : <AlertCircle className="h-4 w-4" aria-hidden="true" />} {msg.text}
              </p>
            )}

            <button onClick={save} disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand/90 disabled:opacity-60 sm:w-auto sm:px-8">
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {busy ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </section>
        )}

        {tab === 2 && <MenuManager />}
        {tab === 3 && <EventManager />}
      </div>
    </main>
  )
}
