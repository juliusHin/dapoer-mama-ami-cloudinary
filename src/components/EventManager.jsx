import { useEffect, useRef, useState } from 'react'
import { getEvents, addEvent, updateEvent, deleteEvent } from '../services/firebase.js'
import { uploadImage } from '../services/cloudinary.js'
import { Plus, Pencil, Trash2, Loader2, Check, AlertCircle, ImagePlus } from 'lucide-react'

const inputCls =
  'mt-1 w-full rounded-lg border border-sand px-3 py-2.5 text-sm outline-none focus:border-brand'

const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

const EMPTY_FORM = {
  title: '',
  description: '',
  starting_price: '',
  min_order_info: '',
  image_url: '',
}

export default function EventManager() {
  const [events, setEvents] = useState(null) // null = masih memuat
  const [form, setForm] = useState(null) // null = form tertutup
  const [editId, setEditId] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [busy, setBusy] = useState(false)
  const [formErr, setFormErr] = useState('')
  const [msg, setMsg] = useState(null)
  const msgTimer = useRef(null)

  // Badge sukses auto-hilang 4 detik; timer lama dibersihkan agar tak menghapus pesan baru.
  function showMsg(m) {
    clearTimeout(msgTimer.current)
    setMsg(m)
    if (m.ok) msgTimer.current = setTimeout(() => setMsg(null), 4000)
  }

  function clearPreview() {
    if (photoPreview) {
      try {
        URL.revokeObjectURL(photoPreview)
      } catch {}
    }
    setPhotoPreview(null)
  }

  function load() {
    getEvents()
      .then(setEvents)
      .catch((err) => {
        setEvents([])
        showMsg({ ok: false, text: `Gagal memuat galeri acara: ${err.message}`, retry: true })
      })
  }

  useEffect(() => {
    load()
  }, [])

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  function openAdd() {
    setEditId(null)
    clearPreview()
    setFormErr('')
    setForm({ ...EMPTY_FORM })
  }

  function openEdit(e) {
    setEditId(e.id)
    clearPreview()
    setFormErr('')
    setForm({
      title: e.title || '',
      description: e.description || '',
      starting_price: e.starting_price ?? '',
      min_order_info: e.min_order_info || '',
      image_url: e.image_url || '',
    })
  }

  function closeForm() {
    setForm(null)
    setEditId(null)
    clearPreview()
    setFormErr('')
    setUploading(false)
  }

  async function onPickPhoto(e) {
    const file = e.target.files?.[0]
    if (!file) return
    clearPreview()
    setPhotoPreview(URL.createObjectURL(file))
    setUploading(true)
    setFormErr('')
    try {
      const url = await uploadImage(file)
      // Guard: form bisa saja sudah ditutup user saat upload selesai.
      setForm((f) => (f ? { ...f, image_url: url } : f))
    } catch (err) {
      setFormErr(err.message)
    } finally {
      setUploading(false)
    }
  }

  async function remove(e) {
    if (!window.confirm(`Hapus dokumentasi "${e.title}"? Perubahan tidak bisa dibatalkan.`)) return
    try {
      await deleteEvent(e.id)
      load()
    } catch (err) {
      showMsg({ ok: false, text: `Gagal menghapus dokumentasi: ${err.message}` })
    }
  }

  async function save() {
    if (!form.title.trim()) {
      setFormErr('Judul dokumentasi wajib diisi.')
      return
    }
    const p = Number(form.starting_price)
    if (!Number.isInteger(p) || p <= 0) {
      setFormErr('Harga harus angka bulat lebih dari 0, tanpa titik/koma (contoh: 25000)')
      return
    }
    setBusy(true)
    setFormErr('')
    const data = {
      title: form.title.trim(),
      description: form.description.trim(),
      starting_price: p,
      min_order_info: form.min_order_info.trim(),
      image_url: form.image_url,
    }
    try {
      if (editId) await updateEvent(editId, data)
      else await addEvent(data)
      closeForm()
      showMsg({ ok: true, text: 'Dokumentasi tersimpan ✓' })
      load()
    } catch (err) {
      setFormErr(`Gagal menyimpan: ${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-base font-bold">Kelola Galeri Acara</h2>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Tambah Dokumentasi
        </button>
      </div>

      {msg && (
        <p role="status" className={`flex flex-wrap items-center gap-2 rounded-lg px-3 py-2 text-sm ${msg.ok ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
          {msg.ok ? <Check className="h-4 w-4" aria-hidden="true" /> : <AlertCircle className="h-4 w-4" aria-hidden="true" />} {msg.text}
          {msg.retry && (
            <button type="button" onClick={() => { setMsg(null); load() }} className="font-bold underline">
              Coba lagi
            </button>
          )}
        </p>
      )}

      {form && (
        <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="font-heading text-base font-bold">{editId ? 'Edit Dokumentasi' : 'Dokumentasi Baru'}</h3>

          <label className="block text-sm font-medium">Judul<input value={form.title} onChange={set('title')} placeholder="Natal 2025 di Gereja XYZ" className={inputCls} /></label>
          <label className="block text-sm font-medium">Deskripsi<textarea rows="3" value={form.description} onChange={set('description')} placeholder="Deskripsi singkat acara..." className={inputCls} /></label>
          <label className="block text-sm font-medium">Harga Mulai per Kotak (Rp)<input type="number" min="0" value={form.starting_price} onChange={set('starting_price')} placeholder="25000" className={inputCls} /></label>
          <label className="block text-sm font-medium">Syarat Minimal Order<input value={form.min_order_info} onChange={set('min_order_info')} placeholder="Minimal 20 kotak • Pesan H-10" className={inputCls} /></label>

          <div>
            <span className="text-sm font-medium">Foto Dokumentasi</span>
            <label className="mt-1 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-sand px-3 py-2.5 text-sm text-muted hover:border-brand/40">
              <ImagePlus className="h-4 w-4" aria-hidden="true" />
              Pilih foto (JPG/PNG/WebP, maks 5 MB)
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onPickPhoto} className="sr-only" />
            </label>
            {(photoPreview || form.image_url) && (
              <div className="mt-2 aspect-[4/3] w-full max-w-xs overflow-hidden rounded-lg bg-sand">
                <img src={photoPreview || form.image_url} alt="Pratinjau foto dokumentasi" className="h-full w-full object-cover" />
              </div>
            )}
            {uploading && (
              <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sedang mengunggah foto...
              </p>
            )}
          </div>

          {formErr && (
            <p role="alert" className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              <AlertCircle className="h-4 w-4" aria-hidden="true" /> {formErr}
            </p>
          )}

          <div className="flex gap-2">
            <button
              onClick={save}
              disabled={busy || uploading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand/90 disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {busy ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button
              onClick={closeForm}
              disabled={busy}
              className="rounded-full border border-brand/40 px-6 py-2.5 text-sm font-semibold text-brand hover:bg-sand disabled:opacity-60"
            >
              Batal
            </button>
          </div>
        </section>
      )}

      {events === null ? (
        <p className="flex items-center gap-2 rounded-2xl bg-white p-6 text-sm text-muted shadow-sm">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Memuat galeri...
        </p>
      ) : events.length === 0 ? (
        <p className="rounded-2xl bg-white p-6 text-sm text-muted shadow-sm">
          Belum ada dokumentasi acara. Klik &lsquo;+ Tambah Dokumentasi&rsquo; untuk mulai.
        </p>
      ) : (
        <ul className="space-y-3">
          {events.map((e) => (
            <li key={e.id} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand">
                {e.image_url && <img src={e.image_url} alt={e.title} loading="lazy" className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{e.title}</p>
                <p className="text-sm font-semibold text-cta">Mulai {rupiah(e.starting_price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(e)}
                  aria-label={`Edit dokumentasi ${e.title}`}
                  className="inline-flex items-center rounded-full border border-brand/40 p-2 text-brand hover:bg-sand"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(e)}
                  aria-label={`Hapus dokumentasi ${e.title}`}
                  className="inline-flex items-center rounded-full border border-red-200 p-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
