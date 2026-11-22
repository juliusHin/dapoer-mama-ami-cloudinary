# User Flow Document (USER_FLOW.md)

**Nama Proyek:** Website Portofolio & Katalog Pre-Order Kuliner Vegetarian/Vegan

**Versi Dokumen:** 1.0 (MVP)

**Dokumen Terkait:** `PRD.md`, `ARCHITECTURE.md`, dan `PROJECT-BRIEF.md`

## 1. Pengantar Dokumen

Dokumen **User Flow** (Alur Pengguna) ini menggambarkan langkah demi langkah perjalanan yang dilalui oleh pengguna dari pertama kali membuka website hingga tujuan mereka tercapai.

Terdapat dua kelompok pengguna utama yang dipetakan di sini:
1. **Pengunjung / Calon Pembeli** (mengakses halaman utama `/` tanpa perlu login).
2. **Admin / Pengelola Usaha** (Anda sendiri, mengakses halaman `/login` dan `/admin`).

---

## 2. Alur Pengunjung & Calon Pembeli (Halaman Publik `/`)

### 2.1 Alur 1: Memesan Kuota PO (Saat Status PO BUKA)

Alur ini terjadi ketika kloter Pre-Order sedang dibuka dan pengunjung ingin memesan hidangan.

```
[Buka Website (/)]
        │
        ▼
[Lihat Papan Status PO di Atas] ──► Status: "PO BUKA" + Info Tanggal Kirim & Kuota
        │
        ▼
[Baca Kotak Standar Dapur] ───────► Paham aturan: Vegetarian Tanpa Bawang (Bisa Request Vegan/Bawang)
        │
        ▼
[Jelajahi Katalog Menu] ──────────► Lihat foto estetis, harga, deskripsi rasa, & label diet
        │
        ▼
[Klik "Ikut PO via WhatsApp"] ────► Pada kartu menu yang diinginkan
        │
        ▼
[Aplikasi WhatsApp Terbuka] ──────► Pesan otomatis terisi (Nama Menu, Porsi, Pilihan Bahan)
        │
        ▼
[Lengkapi & Kirim Pesan] ─────────► Pembeli mengisi jumlah porsi & memilih request bahan
        │
        ▼
[Konfirmasi & Transfer di WA] ────► Admin cek kuota, pembeli transfer untuk mengunci kuota
```

**Rincian Langkah:**
1. Pengunjung membuka tautan website dari Instagram, WhatsApp, atau browser.
2. Di bagian paling atas layar, pengunjung langsung melihat papan status berwarna cerah bertuliskan **PO BUKA**, lengkap dengan tanggal pengiriman dan status kuota (*Kuota Tersedia* / *Hampir Habis*).
3. Pengunjung menggulir layar ke bawah untuk melihat daftar menu yang tersedia pada kloter PO tersebut.
4. Setelah menemukan menu yang menarik, pengunjung menekan tombol **"Ikut PO via WhatsApp"**.
5. Browser otomatis membuka aplikasi WhatsApp dengan draf pesan yang sudah terisi:
   > *"Halo, saya tertarik ikut PO menu **[Nama Menu]**.*
   > *Jumlah porsi: ...*
   > *Pilihan bahan: (Standar Tanpa Bawang / Request Pakai Bawang / Request 100% Vegan)*
   > *Mohon info ketersediaan kuotanya ya."*
6. Pengunjung menghapus pilihan bahan yang tidak sesuai, mengisi jumlah porsi, lalu menekan tombol kirim di WhatsApp.

---

### 2.2 Alur 2: Pengunjung Datang Saat Status PO TUTUP

Karena kloter PO dibuka tidak rutin, alur ini memastikan pengunjung yang datang di luar jadwal PO tidak pergi begitu saja tanpa jejak.

```
[Buka Website (/)]
        │
        ▼
[Lihat Papan Status PO di Atas] ──► Status: "PO TUTUP / Kuota Penuh"
        │
        ├───► [Klik "Gabung Info Jadwal PO"] ──► Masuk ke Grup / Saluran WhatsApp Resmi
        │
        ▼
[Tetap Jelajahi Portofolio] ──────► Melihat foto-foto menu sebagai referensi
        │
        ├───► [Tertarik Pesan untuk Acara] ────► Lanjut ke Alur 4 (Pesanan Acara / Nasi Kotak)
```

**Rincian Langkah:**
1. Pengunjung membuka website dan melihat papan status bertuliskan **PO TUTUP**.
2. Pada papan status yang sama, tersedia tombol utama **"Gabung Info Jadwal PO Berikutnya"**.
3. Jika pengunjung tertarik agar tidak ketinggalan kloter berikutnya, mereka menekan tombol tersebut dan langsung diarahkan masuk ke Grup atau Saluran (*Channel*) WhatsApp resmi.
4. Pengunjung tetap dapat melihat seluruh galeri foto makanan di halaman tersebut sebagai portofolio masakan orang tua Anda.

---

### 2.3 Alur 3: Mencari Menu & Memastikan Pantangan Bahan (Diet)

Alur ini membantu pembeli dengan kebutuhan khusus (misalnya 100% vegan tanpa telur/susu, atau pembeli umum yang ingin *request* pakai bawang) agar merasa yakin sebelum menghubungi admin.

```
[Berada di Katalog Menu]
        │
        ├───► [Ketik di Kotak Pencarian] ──────► Misal: "Jamur", "Rendang", "Nasi"
        │
        ├───► [Klik Tombol Filter] ────────────► Pilih Kategori atau Filter "Bisa Request Vegan"
        │
        ▼
[Daftar Menu Tersaring Otomatis] ─► Tampil instan di layar tanpa memuat ulang halaman
        │
        ▼
[Cek Label pada Kartu Menu] ──────► Contoh: [Vegetarian] [Bisa Request Vegan] [Tanpa Bawang]
        │
        ▼
[Klik Tombol WhatsApp] ───────────► Menanyakan detail bahan atau langsung memesan
```

**Rincian Langkah:**
1. Pengunjung mengetik nama makanan di kotak pencarian atau menekan tombol filter (misalnya filter **"Bisa Request Vegan"**).
2. Daftar kartu menu langsung menyesuaikan secara instan.
3. Pengunjung membaca label pada kartu menu serta kotak informasi aturan dapur untuk memastikan makanan aman dikonsumsi sesuai pantangan masing-masing.

---

### 2.4 Alur 4: Konsultasi Pesanan Acara / Nasi Kotak

Alur ini ditujukan bagi keluarga, panitia kegiatan, atau kantor yang ingin memesan konsumsi dalam jumlah banyak di luar jadwal PO harian.

```
[Klik Menu Navigasi "Pesanan Acara"] (atau gulir ke bagian bawah)
        │
        ▼
[Lihat Galeri Dokumentasi] ───────► Melihat foto-foto pesanan acara/nasi kotak sebelumnya
        │
        ▼
[Baca Pilihan Paket & Syarat] ───► Cek harga mulai, minimal porsi, & batas waktu pesan (H-sekian)
        │
        ▼
[Klik "Konsultasi Acara via WA"] ─► WhatsApp terbuka dengan templat tanya acara
        │
        ▼
[Diskusi Tanggal & Paket di WA] ──► Admin & pemesan menyepakati menu, jumlah kotak, dan DP
```

**Rincian Langkah:**
1. Pengunjung menuju bagian **Pesanan Acara & Nasi Kotak** di website.
2. Pengunjung melihat foto dokumentasi pesanan sebelumnya untuk meyakinkan diri terhadap kualitas penyajian dan kemasan.
3. Pengunjung membaca informasi syarat minimal pemesanan (misalnya minimal jumlah kotak dan jarak hari pemesanan).
4. Pengunjung menekan tombol **"Konsultasi Acara via WhatsApp"**, yang otomatis mengisi pesan:
   > *"Halo, saya ingin konsultasi untuk pesanan acara / nasi kotak.*
   > *Tanggal acara: ...*
   > *Estimasi jumlah porsi/kotak: ...*
   > *Preferensi bahan: (Standar Tanpa Bawang / Vegan / Pakai Bawang)"*

---

## 3. Alur Pengelolaan oleh Admin (`/login` & `/admin`)

Seluruh aktivitas pengelolaan dilakukan oleh Anda sendiri melalui HP maupun laptop.

### 3.1 Alur 5A: Masuk ke Halaman Admin (Login)

```
[Ketik Alamat Website + /login] ──► Contoh: namausaha.pages.dev/login
        │
        ▼
[Masukkan Email & Kata Sandi] ────► Akun admin tunggal yang terdaftar di Firebase
        │
        ├───► [Jika Salah] ───────────────► Muncul pesan peringatan, coba masukkan ulang
        │
        ▼ [Jika Benar]
[Masuk ke Dasbor Admin (/admin)] ─► Tampil 3 Tab: Status PO, Kelola Menu, Galeri Acara
```

---

### 3.2 Alur 5B: Membuka Kloter PO Baru

Dilakukan setiap kali orang tua Anda berencana membuka jadwal PO baru.

```
[Login ke Dasbor Admin (/admin)]
        │
        ▼
[Buka Tab "Kelola Menu"] ─────────► Centang / aktifkan menu apa saja yang ikut PO kloter ini
        │
        ▼
[Buka Tab "Kontrol Status PO"]
        │
        ├───► Isi Judul Kloter (misal: "PO Kloter Spesial Akhir Pekan")
        ├───► Isi Tanggal Pengiriman (misal: "Sabtu, 28 November 2026")
        ├───► Pilih Status Kuota: "Kuota Tersedia"
        └───► Ubah Saklar Status PO menjadi: [ BUKA ]
        │
        ▼
[Klik Tombol "Simpan Perubahan"]
        │
        ▼
[Halaman Depan Otomatis Berubah] ─► Papan status langsung menampilkan PO BUKA & menu aktif
```

---

### 3.3 Alur 5C: Menambah Menu Baru & Unggah Foto Estetis

Dilakukan ketika ada menu baru atau setelah Anda selesai mengedit foto makanan.

```
[Login ke Dasbor Admin (/admin)]
        │
        ▼
[Buka Tab "Kelola Menu" -> Klik "+ Tambah Menu Baru"]
        │
        ▼
[Pilih File Foto dari HP/Laptop] ─► Foto otomatis dikirim & dikompres oleh Cloudinary
        │
        ▼
[Isi Detail Menu] ────────────────► Nama menu, kategori, harga, deskripsi rasa, & label diet
        │
        ▼
[Klik "Simpan Menu"] ─────────────► Data tersimpan ke Firebase & langsung muncul di katalog
```

---

### 3.4 Alur 5D: Menutup PO Saat Kuota Sudah Penuh

Dilakukan setelah pesanan yang masuk lewat WhatsApp mencapai batas kuota masak orang tua Anda.

```
[Login ke Dasbor Admin (/admin)]
        │
        ▼
[Buka Tab "Kontrol Status PO"]
        │
        ├───► Ubah Status Kuota menjadi: "Kuota Penuh"
        └───► Ubah Saklar Status PO menjadi: [ TUTUP ]
        │
        ▼
[Klik Tombol "Simpan Perubahan"]
        │
        ▼
[Halaman Depan Otomatis Berubah] ─► Papan status berubah menjadi PO TUTUP + tombol Grup Info PO
```

---

## 4. Penanganan Kondisi Khusus (Edge Cases)

Untuk mencegah kebingungan saat website digunakan sehari-hari, sistem dirancang menangani kondisi-kondisi berikut:

| Kondisi / Situasi | Apa yang Terjadi di Sistem | Solusi / Penanganan |
| :--- | :--- | :--- |
| **Kuota mendadak penuh saat pembeli sedang melihat website** | Pembeli menekan tombol pesan WA beberapa detik sebelum admin mengubah status menjadi *PO Tutup*. | Di pesan otomatis WhatsApp tercantum kalimat *"Mohon info ketersediaan kuotanya ya"*, dan kuota baru sah setelah transfer. Admin dapat menginformasikan dengan sopan di WA jika kuota baru saja penuh dan mengarahkan ke kloter berikutnya. |
| **Pengunjung membuka website dari browser dalam aplikasi (Instagram / TikTok)** | Terkadang browser bawaan Instagram memblokir pembukaan otomatis aplikasi WhatsApp (`wa.me`). | Tautan tombol WhatsApp dibuka pada tab baru (`target="_blank"`) menggunakan format standar `https://wa.me/...` yang didukung secara resmi oleh browser ponsel Android maupun iPhone. |
| **Admin mengunggah foto berukuran sangat besar** | Foto hasil kamera/edit berukuran di atas 5 MB dapat memperlambat proses unggah jika sinyal kurang stabil. | Halaman admin menampilkan indikator proses (*loading* *"Sedang mengunggah foto..."*) hingga foto selesai diproses Cloudinary sebelum tombol **Simpan** dapat ditekan, agar data tidak tersimpan tanpa foto. |
| **Koneksi internet pengunjung lambat** | Foto makanan membutuhkan waktu beberapa detik untuk muncul sepenuhnya. | Sistem menampilkan kotak bayangan lembut (*skeleton loading*) pada tempat foto dan memuat gambar versi terkompresi (`WebP`) dari Cloudinary agar halaman tetap nyaman dibaca sambil menunggu foto tampil. |