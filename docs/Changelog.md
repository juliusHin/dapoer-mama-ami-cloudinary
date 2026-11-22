# Changelog

Catatan seluruh perubahan dokumen proyek. Format mengikuti [Keep a Changelog](https://keepachangelog.com/).

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
