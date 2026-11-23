# Changelog

Catatan seluruh perubahan dokumen proyek. Format mengikuti [Keep a Changelog](https://keepachangelog.com/).

## [1.4] - 2026-11-23

Kampanye musiman **Hampers Natal** (otomatis by tanggal) — desain disetujui pengguna.

### Ditambahkan (Added)
* **`PRD.md` FR-08** — Kampanye musiman berbasis tanggal; bullet baru di In-Scope (9.1).
* **`database_schema.md`** — 3 field baru `settings/general`: `campaign_name`, `campaign_start`, `campaign_end` (+ contoh JSON diperbarui).
* **`test_plan.md` Modul E** — TC-20 (section tampil saat aktif), TC-21 (hilang di luar periode), TC-22 (templat WA hampers); launch checklist diperluas ke TC-22.
* **`UI_DESIGN.md`** — Token warna *Holiday Red* `#A63939` khusus section kampanye.
* **Kode** — `CampaignSection.jsx` (baru, latar merah, grid paket, reuse `MenuCard` mode hampers); `whatsapp.js` + `hampersMessage()`; `firebase.js` + `isCampaignActive()` + field fallback; `Home.jsx` merender section kampanye di bawah banner PO saat aktif; `index.css` + token `campaign`.
* Paket hampers disimpan sebagai dokumen `menus` berkategori `"Hampers Natal"` (tanpa perubahan schema menus).

## [1.3] - 2026-11-23

Verifikasi Tahap 1 + implementasi Tahap 2 (DEVELOPMENT_PLAN.md).

### Verifikasi
* Cloudinary ✅ (cloud name `agnchkqe`, preset unsigned berfungsi — logo ter-upload & dipakai sebagai og:image).
* GitHub ✅ (commit awal ter-push). Firestore: database ada, **rules belum dideploy** (read publik masih 403 — fallback PO TUTUP aktif sesuai desain).

### Ditambahkan (Added) — Aplikasi (Tahap 2)
* Kerangka Vite + React + Tailwind v4 + React Router + Lucide (`package.json`, `vite.config.js`, `index.html` dengan tag Open Graph & Google Fonts).
* `src/services/firebase.js` (baca settings/menus/events + fallback PO TUTUP), `src/services/whatsapp.js` (tautan wa.me + 4 templat pesan).
* Halaman publik `/`: Navbar, PoBanner (buka/tutup + fallback info PO ke chat admin), Hero, DietInfo, katalog dengan pencarian + filter kategori + filter vegan (client-side), MenuCard (label diet, tombol PO/Tanya Jadwal), EventSection, Footer. Skeleton & lazy loading aktif.
* Ikon Instagram diganti `AtSign` (lucide menghapus brand icons).

## [1.2] - 2026-11-23

Pemeriksaan Tahap 1 (DEVELOPMENT_PLAN.md) & keputusan produk: tombol "Gabung Info PO" mengarah ke chat admin (grup/saluran WA belum tersedia).

### Diubah (Changed)
* **`PRD.md` FR-05, `ARCHITECTURE.md`, `database_schema.md`** — Field `whatsapp_group_link` kini boleh kosong; jika kosong, tombol info PO otomatis mengarah ke chat admin (`whatsapp_number`).
* **`USER_FLOW.md` Alur 2, `test_plan.md` TC-11** — Hasil yang diharapkan disesuaikan dengan fallback chat admin.
* **`PROJECT-BRIEF.md` bagian 8** — Kotak checklist 5 item terjawab dicentang (brand Dapoer Mama Ami, nomor WA, syarat acara, aturan bayar, area layanan).

## [1.1] - 2026-11-22

Hasil review kelengkapan dokumen & rencana pengembangan (22 November 2026).

### Ditambahkan (Added)
* **`DEVELOPMENT_PLAN.md` (baru)** — Rincian tugas per tahap 1–5 yang dipetakan ke FR (`PRD.md`) dan TC (`test_plan.md`), daftar environment variables, serta checklist setup akun (Firebase, Cloudinary, GitHub/Cloudflare) dan deploy pertama.
* **`PRD.md` — FR-07** — Kebutuhan baru: pratinjau tautan (Open Graph) saat tautan dibagikan di WhatsApp/Instagram, plus kriteria penerimaan terkait di bagian 8.
* **`test_plan.md` — TC-19** — Skenario uji pratinjau tautan (Open Graph); rentang launch checklist diperluas ke TC-19.
* **`ARCHITECTURE.md`** — Catatan fallback: jika `settings/general` belum ada, halaman utama menampilkan PO TUTUP (default aman).
* **`ARCHITECTURE.md`** — Catatan risiko & mitigasi upload Cloudinary unsigned preset (batas tipe/ukuran, folder khusus, pantau galeri; upgrade path: signed upload).

### Diubah (Changed)
* **`PRD.md` — FR-06** — Hapus frasa "dan testimoni pelanggan" (tidak didukung database/UI/test plan; testimoni dapat diwakili galeri dokumentasi acara).
* **`ARCHITECTURE.md` — Tab 3 Admin** — "Menambah atau menghapus" → "Menambah, mengedit, atau menghapus" agar selaras dengan FR-06 dan test plan.
* **`ARCHITECTURE.md` — Struktur folder** — `index.html` kini menyebut tag meta Open Graph.

### Diperbaiki (Fixed)
* **`database_schema.md`** — Hapus artefak LaTeX (`$50.000$`, `$\frac{50.000}{26}...$`, `$26$`, `$1$`) yang tampil mentah di Markdown; diganti angka biasa.
* **`database_schema.md` ↔ `ARCHITECTURE.md`** — Field `updated_at` (settings & menus) kini tercantum konsisten di kedua dokumen.
* **`USER_FLOW.md`, `UI_DESIGN.md`** — Perbaiki referensi `project-brief.md` → `PROJECT-BRIEF.md` sesuai nama file sebenarnya.

## [1.0] - 2026-11-21

* Rilis awal dokumentasi: `PROJECT-BRIEF.md`, `PRD.md`, `ARCHITECTURE.md`, `USER_FLOW.md`, `UI_DESIGN.md`, `database_schema.md`, `test_plan.md`.
