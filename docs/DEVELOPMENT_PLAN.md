# Development Plan (DEVELOPMENT_PLAN.md)

**Nama Proyek:** Website Portofolio & Katalog Pre-Order Kuliner Vegetarian/Vegan

**Versi Dokumen:** 1.0 (MVP)

**Dokumen Terkait:** `PROJECT-BRIEF.md`, `PRD.md`, `ARCHITECTURE.md`, `USER_FLOW.md`, `UI_DESIGN.md`, `database_schema.md`, `test_plan.md`

**Cara Membaca:** Setiap tugas mencantumkan nomor kebutuhan (FR) dan uji (TC/SEC/UI) dari `PRD.md` dan `test_plan.md` yang relevan, serta kriteria "selesai". Tugas dikerjakan berurutan dari atas ke bawah dalam setiap tahap.

---

## 1. Daftar Variabel Lingkungan (Environment Variables)

Seluruh konfigurasi disimpan di file `.env` (lokal) dan di pengaturan proyek Cloudflare Pages (produksi). Nilai ini **bukan rahasia** (kode Firebase memang tampil publik di browser); keamanan data tetap dijaga oleh Firestore Rules + UID admin.

| Nama Variabel | Sumber Nilai | Kegunaan |
| :--- | :--- | :--- |
| `VITE_FIREBASE_API_KEY` | Firebase Console > Project Settings > Web App | Kunci akses Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Console (otomatis: `nama-proyek.firebaseapp.com`) | Login admin |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Console | ID proyek Firestore |
| `VITE_FIREBASE_APP_ID` | Firebase Console > Project Settings > Web App | ID aplikasi web |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary Dashboard | Nama cloud penyimpanan foto |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary > Settings > Upload Presets | Preset unggah foto (unsigned) |

---

## 2. Tahap 1 — Persiapan Konten & Akun (1–2 Hari)

### Tugas 1.1: Kumpulkan Konten dari Orang Tua
Daftar periksa sama dengan bagian 8 `PROJECT-BRIEF.md` (nama brand, nomor WA, link grup, syarat acara, aturan bayar, area kirim, daftar menu final + foto hasil edit).

- **Selesai jika:** Seluruh kotak di bagian 8 `PROJECT-BRIEF.md` tercentang.

### Tugas 1.2: Setup Firebase
1. Buat proyek Firebase (Spark/gratis) → buat Web App → catat nilai env vars Firebase di atas.
2. Aktifkan **Firestore Database** (mode production).
3. Aktifkan **Authentication** metode Email/Password, lalu buat 1 akun admin manual (tanpa halaman pendaftaran).
4. Catat **UID** akun admin, tempel ke aturan keamanan di bagian 5 `database_schema.md`, lalu publikasikan rules.
5. Buat dokumen awal `settings/general` (atau lewat admin setelah Tahap 3 selesai).

- **Selesai jika:** Login akun admin berhasil di Firebase Console dan rules aktif (uji cepat: tulis data ditolak tanpa login).

### Tugas 1.3: Setup Cloudinary
1. Buat akun Cloudinary gratis → catat `cloud_name`.
2. Buat **Upload Preset** *unsigned*: hanya gambar (`jpg/png/webp`), maksimal 5 MB, folder khusus (misal `dapoer-mama-ami`).

- **Selesai jika:** Unggah 1 foto uji lewat dashboard Cloudinary masuk ke folder yang benar.

### Tugas 1.4: Setup GitHub & Cloudflare
1. Buat repositori GitHub pribadi + inisialisasi proyek lokal (`git init`).
2. Buat akun Cloudflare (cukup daftar; koneksi ke GitHub dilakukan di Tahap 5).

- **Selesai jika:** Repo GitHub ada dan kosong siap diisi kode.

---

## 3. Tahap 2 — Kerangka & Tampilan Utama (2–3 Hari)

| # | Tugas | FR | Uji Terkait |
| :--- | :--- | :--- | :--- |
| 2.1 | Inisialisasi proyek: Vite + React + Tailwind + React Router + Lucide React (versi `npm create vite`), file `.env` + `.gitignore` | — | — |
| 2.2 | `services/firebase.js` (baca `settings/general`, `menus`, `events_gallery`) + fallback tampil PO TUTUP bila settings kosong | FR-01 | TC-01, TC-02 |
| 2.3 | `services/whatsapp.js` (pembuat URL `wa.me` + templat pesan PO/acara, buka tab baru) | FR-05 | TC-09, TC-12 |
| 2.4 | Halaman `/`: Navbar, PoBanner (buka/tutup), Hero, DietInfo, katalog + pencarian + filter (client-side), EventSection, Footer sesuai `UI_DESIGN.md` | FR-01–FR-05 | TC-01–TC-08, UI-01–UI-04 |
| 2.5 | Tag meta Open Graph di `index.html` (foto unggulan via URL Cloudinary, nama usaha, deskripsi) | FR-07 | TC-19 |
| 2.6 | Optimasi gambar: parameter `f_auto,q_auto,w_800` pada URL Cloudinary + *lazy loading* + *skeleton loading* | NFR-2 | UI-03, UI-04 |

- **Selesai jika:** Halaman `/` tampil rapi dengan data uji dan seluruh TC Modul A & B lulus.

---

## 4. Tahap 3 — Panel Admin & Keamanan (2 Hari)

| # | Tugas | FR | Uji Terkait |
| :--- | :--- | :--- | :--- |
| 3.1 | Halaman `/login` (email + sandi Firebase Auth), tanpa tombol daftar | FR-06 | TC-13, TC-14, SEC-02 |
| 3.2 | Halaman `/admin` terproteksi (redirect ke `/login` bila belum login) + tombol keluar | FR-06 | SEC-01, TC-18 |
| 3.3 | Tab 1 — Kontrol Status PO: saklar buka/tutup, judul kloter, tanggal kirim, status kuota, link grup WA | FR-06 | TC-01, TC-02 |
| 3.4 | Tab 2 — Kelola Menu: tambah/edit/hapus menu, unggah foto via Cloudinary (indikator *loading* + validasi tipe file), saklar `is_active_po` | FR-06 | TC-15, TC-16, SEC-03 |
| 3.5 | Tab 3 — Kelola Galeri Acara: tambah/edit/hapus dokumentasi & paket | FR-06 | TC-17 |

- **Selesai jika:** Seluruh TC Modul D dan SEC-01–SEC-03 lulus.

---

## 5. Tahap 4 — Pengisian Data & Uji Coba (1–2 Hari)

| # | Tugas | Referensi |
| :--- | :--- | :--- |
| 4.1 | Isi data awal (seed): `settings/general`, minimal 3–6 menu + foto, minimal 1–3 paket acara | Bagian 7 `database_schema.md` |
| 4.2 | Jalankan seluruh rencana uji: TC-01–TC-19, SEC-01–SEC-04, UI-01–UI-04 di HP Android, iPhone, browser dalam aplikasi WA/IG, dan laptop | `test_plan.md` |
| 4.3 | Perbaiki semua temuan, lalu minta persetujuan akhir orang tua (tampilan, harga, aturan bahan) | Launch checklist `test_plan.md` |

- **Selesai jika:** Seluruh kotak *Launch Checklist* di `test_plan.md` tercentang.

---

## 6. Tahap 5 — Peluncuran / Go-Live

1. Push kode final ke GitHub.
2. Cloudflare Pages: **Create project → Connect to Git** → pilih repo.
   * Framework preset: **React (Vite)**
   * Build command: `npm run build`
   * Output directory: `dist`
3. Tambahkan seluruh env vars (bagian 1 dokumen ini) di **Settings > Environment variables**.
4. Deploy → uji ulang alur penting di domain `.pages.dev` (TC-09, TC-11, TC-12, TC-19, SEC-01).
5. Bagikan tautan ke media sosial & WhatsApp.

- **Selesai jika:** Website hidup di `https://namausaha.pages.dev` dan seluruh alur penting lulus di domain produksi.
