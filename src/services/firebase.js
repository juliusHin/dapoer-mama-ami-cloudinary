import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore'

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
})

export const db = getFirestore(app)
export const auth = getAuth(app)

// Default aman saat settings/general belum dibuat / terjadi error baca.
// shortcut: menyembunyikan error berarti admin tak menyadari salah config; upgrade: tampilkan banner error saat mode admin hadir (Tahap 3)
export const FALLBACK_SETTINGS = {
  po_status: 'tutup',
  po_title: '',
  delivery_date: '',
  quota_status: 'tersedia',
  whatsapp_number: '6287782238049',
  whatsapp_group_link: '',
  kitchen_rules_summary:
    'Standar masakan kami adalah Vegetarian & Tanpa Bawang. Anda bisa request 100% Vegan (tanpa telur/susu) atau request Pakai Bawang saat memesan.',
  campaign_name: '',
  campaign_start: '',
  campaign_end: '',
}

// Kampanye aktif jika hari ini berada di antara campaign_start dan campaign_end (tanggal ISO).
// Tanggal dihitung lokal (WIB), bukan UTC, agar kampanye tidak mulai/berakhir terlambat 7 jam.
export function isCampaignActive(s) {
  if (!s.campaign_start || !s.campaign_end) return false
  const d = new Date()
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  return s.campaign_start <= today && today <= s.campaign_end
}

export async function getSettings() {
  try {
    const snap = await getDoc(doc(db, 'settings', 'general'))
    return snap.exists() ? snap.data() : FALLBACK_SETTINGS
  } catch {
    return FALLBACK_SETTINGS
  }
}

// Sisa waktu menuju akhir hari campaign_end (23:59:59 lokal WIB) atau null bila sudah lewat/kosong.
// shortcut: end-of-day kasar tanpa jam custom di database; upgrade: field jam bila admin butuh tenggat selain tengah malam
export function campaignTimeLeft(endStr, now = new Date()) {
  if (!endStr) return null
  const [y, m, d] = endStr.split('-').map(Number)
  if (!y || !m || !d) return null
  const end = new Date(y, m - 1, d, 23, 59, 59, 999)
  const secs = Math.floor((end - now) / 1000)
  if (secs <= 0) return null
  return {
    days: Math.floor(secs / 86400),
    hours: Math.floor((secs % 86400) / 3600),
    minutes: Math.floor((secs % 3600) / 60),
    seconds: secs % 60,
  }
}

async function getAll(name) {
  const snap = await getDocs(query(collection(db, name), orderBy('created_at', 'desc')))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export const getMenus = () => getAll('menus')
export const getEvents = () => getAll('events_gallery')
