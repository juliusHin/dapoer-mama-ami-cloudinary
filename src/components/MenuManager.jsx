import { useEffect, useRef, useState } from 'react'
import { getMenus, addMenu, updateMenu, deleteMenu } from '../services/firebase.js'
import { uploadImage } from '../services/cloudinary.js'
import { Plus, Pencil, Trash2, Loader2, Check, AlertCircle, ImagePlus } from 'lucide-react'

const inputCls =
  'mt-1 w-full rounded-lg border border-sand px-3 py-2.5 text-sm outline-none focus:border-brand'

const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

const CATEGORIES = ['Lauk Utama', 'Paket Nasi', 'Camilan', 'Sambal & Pelengkap', 'Hampers Natal']
const DIET_LABELS = ['Vegetarian', 'Bisa Request Vegan', 'Default Tanpa Bawang']

const EMPTY_FORM = {
  name: '',
  category: '',
  price: '',
  description: '',
  diet_labels: [],
  is_active_po: true,
  image_url: '',
}

export default function MenuManager() {
  const [menus, setMenus] = useState(null) // null = masih memuat
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
    getMenus()
      .then(setMenus)
      .catch((err) => {
        setMenus([])
        showMsg({ ok: false, text: `Gagal memuat daftar menu: ${err.message}`, retry: true })
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

  function openEdit(m) {
    setEditId(m.id)
    clearPreview()
    setFormErr('')
    setForm({
      name: m.name || '',
      category: m.category || '',
      price: m.price ?? '',
      description: m.description || '',
      diet_labels: m.diet_labels || [],
      is_active_po: !!m.is_active_po,
      image_url: m.image_url || '',
    })
  }

  function closeForm() {
    setForm(null)
    setEditId(null)
    clearPreview()
    setFormErr('')
    setUploading(false)
  }

  function toggleDiet(label) {
    setForm({
      ...form,
      diet_labels: form.diet_labels.includes(label)
        ? form.diet_labels.filter((l) => l !== label)
        : [...form.diet_labels, label],
    })
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

  async function togglePo(m) {
    try {
      await updateMenu(m.id, { is_active_po: !m.is_active_po })
      setMenus((ms) => ms.map((x) => (x.id === m.id ? { ...x, is_active_po: !x.is_active_po } : x)))
    } catch (err) {
      showMsg({ ok: false, text: `Gagal mengubah status PO: ${err.message}` })
    }
  }

  async function remove(m) {
    if (!window.confirm(`Hapus menu "${m.name}"? Perubahan tidak bisa dibatalkan.`)) return
    try {
      await deleteMenu(m.id)
      load()
    } catch (err) {
      showMsg({ ok: false, text: `Gagal menghapus menu: ${err.message}` })
    }
  }

  async function save() {
    if (!form.name.trim()) {
      setFormErr('Nama menu wajib diisi.')
      return
    }
    const p = Number(form.price)
    if (!Number.isInteger(p) || p <= 0) {
      setFormErr('Harga harus angka bulat lebih dari 0, tanpa titik/koma (contoh: 35000)')
      return
    }
    setBusy(true)
    setFormErr('')
    const data = {
      name: form.name.trim(),
      category: form.category.trim(),
      price: p,
      description: form.description.trim(),
      diet_labels: form.diet_labels,
      is_active_po: form.is_active_po,
      image_url: form.image_url,
    }
    try {
      if (editId) await updateMenu(editId, data)
      else await addMenu(data)
      closeForm()
      showMsg({ ok: true, text: 'Menu tersimpan ✓' })
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
        <h2 className="font-heading text-base font-bold">Kelola Menu</h2>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Tambah Menu Baru
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
          <h3 className="font-heading text-base font-bold">{editId ? 'Edit Menu' : 'Menu Baru'}</h3>

          <label className="block text-sm font-medium">Nama Menu<input value={form.name} onChange={set('name')} placeholder="Rendang Jamur" className={inputCls} /></label>
          <label className="block text-sm font-medium">Kategori
            <input list="kategori-datalist" value={form.category} onChange={set('category')} placeholder="Pilih atau ketik kategori" className={inputCls} />
            <datalist id="kategori-datalist">
              {CATEGORIES.map((c) => <option key={c} value={c} />)}
            </datalist>
          </label>
          <label className="block text-sm font-medium">Harga (Rp)<input type="number" min="0" value={form.price} onChange={set('price')} placeholder="25000" className={inputCls} /></label>
          <label className="block text-sm font-medium">Deskripsi<textarea rows="3" value={form.description} onChange={set('description')} placeholder="Deskripsi singkat menu..." className={inputCls} /></label>

          <fieldset>
            <legend className="text-sm font-semibold">Label Diet</legend>
            <div className="mt-2 space-y-2">
              {DIET_LABELS.map((label) => (
                <label key={label} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.diet_labels.includes(label)}
                    onChange={() => toggleDiet(label)}
                    className="h-4 w-4 accent-brand"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={form.is_active_po}
              onChange={(e) => setForm({ ...form, is_active_po: e.target.checked })}
              className="h-4 w-4 accent-brand"
            />
            Ikut PO kloter ini
          </label>

          <div>
            <span className="text-sm font-medium">Foto Menu</span>
            <label className="mt-1 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-sand px-3 py-2.5 text-sm text-muted hover:border-brand/40">
              <ImagePlus className="h-4 w-4" aria-hidden="true" />
              Pilih foto (JPG/PNG/WebP, maks 5 MB)
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={onPickPhoto} className="sr-only" />
            </label>
            {(photoPreview || form.image_url) && (
              <div className="mt-2 aspect-[4/3] w-full max-w-xs overflow-hidden rounded-lg bg-sand">
                <img src={photoPreview || form.image_url} alt="Pratinjau foto menu" className="h-full w-full object-cover" />
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

      {menus === null ? (
        <p className="flex items-center gap-2 rounded-2xl bg-white p-6 text-sm text-muted shadow-sm">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Memuat menu...
        </p>
      ) : menus.length === 0 ? (
        <p className="rounded-2xl bg-white p-6 text-sm text-muted shadow-sm">
          Belum ada menu. Klik &lsquo;+ Tambah Menu Baru&rsquo; untuk mulai.
        </p>
      ) : (
        <ul className="space-y-3">
          {menus.map((m) => (
            <li key={m.id} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand">
                {m.image_url && <img src={m.image_url} alt={m.name} loading="lazy" className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{m.name}</p>
                <p className="text-sm font-semibold text-cta">{rupiah(m.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={m.is_active_po}
                  aria-label={`Ikut PO: ${m.name}`}
                  onClick={() => togglePo(m)}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${m.is_active_po ? 'bg-brand' : 'bg-sand'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${m.is_active_po ? 'translate-x-4' : ''}`} />
                </button>
                <span className="hidden text-xs font-semibold text-muted sm:inline">Ikut PO</span>
                <button
                  type="button"
                  onClick={() => openEdit(m)}
                  aria-label={`Edit menu ${m.name}`}
                  className="inline-flex items-center rounded-full border border-brand/40 p-2 text-brand hover:bg-sand"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(m)}
                  aria-label={`Hapus menu ${m.name}`}
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
