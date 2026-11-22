# Architecture Document (ARCHITECTURE.md)

**Nama Proyek:** Website Portofolio & Katalog Pre-Order Kuliner Vegetarian/Vegan

**Versi Dokumen:** 1.0 (MVP)

**Referensi Utama:** `PRD.md` (Versi 1.0)

**Pola Arsitektur:** *Serverless Single Page Application (SPA)* dengan *Backend-as-a-Service (BaaS)*

---

## 1. Ringkasan Arsitektur (Architecture Overview)

Aplikasi ini dirancang menggunakan pendekatan **Serverless / Tanpa Server Mandiri**. Artinya, Anda tidak perlu menyewa, mengatur, atau merawat mesin server sendiri. Seluruh kebutuhan penyimpanan data, keamanan login, dan penyimpanan foto ditangani oleh layanan *cloud* terpercaya yang menyediakan paket gratis berkapasitas besar.

### Diagram Alur Sistem

```text
+-------------------------------------------------------------------+
|                     PENGGUNA (Browser HP / Laptop)                |
|                                                                   |
|   [ Pengunjung Umum ]                      [ Admin (Anda) ]       |
|   - Lihat status PO                        - Login Admin          |
|   - Cari & filter menu                     - Buka/Tutup PO        |
|   - Klik pesan via WA                      - Tambah/Edit Menu     |
+-----------+---------------------------------------+---------------+
            |                                       |
            v                                       v
+-------------------------------------------------------------------+
|               FRONTEND: React (Vite) + Tailwind CSS               |
|                  (Dihosting di Cloudflare Pages)                  |
+---+-----------------------+-----------------------+---------------+
    |                       |                       |
    | 1. Baca Data          | 2. Login & Tulis      | 3. Unggah &
    |    (Read-Only)        |    Data (Admin Only)  |    Ambil Foto
    v                       v                       v
+-------------------------------+       +---------------------------+
|        GOOGLE FIREBASE        |       |        CLOUDINARY         |
|  - Cloud Firestore (Database) |       |  - Penyimpanan Foto       |
|  - Firebase Auth (Login)      |       |  - Kompresi Otomatis WebP |
+-------------------------------+       +---------------------------+
            |
            | 4. Klik Tombol Pesan / Tanya
            v
+-------------------------------------------------------------------+
|             WHATSAPP (Aplikasi / WhatsApp Web via wa.me)          |
|  - Pesan otomatis terisi (Nama Menu, Porsi, Request Vegan/Bawang) |
|  - Tautan langsung ke Grup / Saluran Info PO                      |
+-------------------------------------------------------------------+
```

---

## 2. Tumpukan Teknologi (Tech Stack)

| Lapisan Sistem | Teknologi Terpilih | Alasan Pemilihan |
| :--- | :--- | :--- |
| **Frontend (Tampilan)** | **React (Vite) + Tailwind CSS** | Ringan, cepat dibuka di ponsel, mudah dipelajari pemula, dan memudahkan pembuatan desain modern yang responsif. |
| **Navigasi Halaman** | **React Router** | Mengatur perpindahan antara halaman publik (`/`), halaman login (`/login`), dan dasbor admin (`/admin`) tanpa memuat ulang seluruh browser. |
| **Ikon Antarmuka** | **Lucide React** | Kumpulan ikon ringan dan bersih (ikon WhatsApp, pencarian, filter, kalender, dan label diet). |
| **Database** | **Google Cloud Firestore** | Database berbasis dokumen (NoSQL) yang fleksibel, cepat, tidak memiliki jeda tidur (*auto-pause*), dan gratis hingga puluhan ribu akses per hari. |
| **Authentication (Login)** | **Firebase Authentication** | Sistem login email dan kata sandi bawaan Google yang aman untuk melindungi halaman admin. |
| **Penyimpanan Foto** | **Cloudinary (Paket Gratis)** | Khusus menyimpan foto makanan, otomatis mengompres ukuran file agar hemat kuota internet pengunjung tanpa mengurangi ketajaman gambar. |
| **Integrasi Pesan** | **WhatsApp Click-to-Chat (`wa.me`)** | Menghubungkan tombol pemesanan langsung ke aplikasi WhatsApp dengan templat pesan otomatis tanpa biaya langganan API. |
| **Hosting & CDN** | **Cloudflare Pages** | Menayangkan website ke internet secara gratis dengan kecepatan tinggi, sertifikat keamanan HTTPS otomatis, dan *bandwidth* tanpa batas. |

---

## 3. Desain Struktur Data (Database Schema)

Data di dalam **Cloud Firestore** disusun menjadi **3 koleksi (kelompok dokumen)** agar struktur datanya sederhana, mudah dibaca, dan hemat kuota pembacaan database:

### 3.1 Koleksi `settings` (Pengaturan Umum & Papan Status PO)
Koleksi ini hanya berisi **1 dokumen tetap** bernama `general` yang mengatur tampilan papan pengumuman paling atas serta informasi kontak.

* **`po_status`** *(Teks: `"buka"` atau `"tutup"`)* — Menentukan mode tampilan papan status di halaman utama.
* **`po_title`** *(Teks)* — Judul kloter PO saat ini (contoh: *"PO Kloter Akhir Pekan"*).
* **`delivery_date`** *(Teks)* — Informasi jadwal pengiriman makanan (contoh: *"Sabtu, 28 November 2026"*).
* **`quota_status`** *(Teks: `"tersedia"`, `"hampir_habis"`, atau `"penuh"`)* — Label ketersediaan kuota agar admin tidak perlu memperbarui angka setiap menit.
* **`whatsapp_number`** *(Teks)* — Nomor WhatsApp admin dengan format kode negara tanpa tanda plus (contoh: `"6281234567890"`).
* **`whatsapp_group_link`** *(Teks)* — Tautan undangan Grup atau Saluran WhatsApp resmi untuk info jadwal PO berikutnya.
* **`kitchen_rules_summary`** *(Teks)* — Ringkasan aturan dapur (standar vegetarian tanpa bawang, bisa *request* vegan atau pakai bawang).
* **`updated_at`** *(Waktu / Timestamp)* — Waktu terakhir admin mengubah pengaturan PO.

> **Catatan fallback:** Jika dokumen `settings/general` belum ada (database masih kosong), halaman utama harus menampilkan kondisi **PO TUTUP** sebagai default aman, bukan halaman rusak/kosong.

### 3.2 Koleksi `menus` (Katalog Portofolio & Menu PO)
Setiap dokumen di dalam koleksi ini mewakili **1 jenis hidangan**.

* **`name`** *(Teks)* — Nama hidangan (contoh: *"Rendang Jamur Suwir Spesial"*).
* **`category`** *(Teks)* — Kategori menu (contoh: `"Lauk Utama"`, `"Paket Nasi"`, `"Camilan"`, `"Sambal & Pelengkap"`).
* **`price`** *(Angka)* — Harga satuan dalam Rupiah (contoh: `35000`).
* **`description`** *(Teks)* — Deskripsi cita rasa, tekstur, dan bahan utama untuk menggugah selera pembeli baru.
* **`diet_labels`** *(Daftar Teks / Array)* — Penanda label pada kartu menu (contoh: `["Vegetarian", "Bisa Request Vegan", "Default Tanpa Bawang"]`).
* **`is_active_po`** *(Boolean: `true` / `false`)* — Penanda apakah menu ini ikut dibuka pada kloter PO yang sedang berjalan. Jika `false`, menu tetap tampil rapi sebagai portofolio.
* **`image_url`** *(Teks)* — Tautan gambar hasil optimasi dari Cloudinary.
* **`created_at`** *(Waktu / Timestamp)* — Waktu menu ditambahkan untuk pengurutan tampilan.
* **`updated_at`** *(Waktu / Timestamp)* — Waktu terakhir menu diedit (misal saat ganti harga atau foto).

### 3.3 Koleksi `events_gallery` (Etalase Paket & Dokumentasi Acara)
Setiap dokumen di dalam koleksi ini mewakili **1 paket nasi kotak / dokumentasi pesanan acara**.

* **`title`** *(Teks)* — Judul paket atau dokumentasi acara (contoh: *"Paket Nasi Kotak Syukuran - 50 Box"*).
* **`description`** *(Teks)* — Rincian isi lauk dalam paket dan cerita singkat dokumentasi acara.
* **`starting_price`** *(Angka)* — Harga mulai per kotak/porsi (contoh: `25000`).
* **`min_order_info`** *(Teks)* — Syarat minimal pemesanan dan batas waktu (contoh: *"Minimal 20 kotak • Pemesanan H-3"*).
* **`image_url`** *(Teks)* — Tautan foto dokumentasi acara dari Cloudinary.
* **`created_at`** *(Waktu / Timestamp)* — Waktu unggah data.

---

## 4. Arsitektur Halaman & Struktur Folder

### 4.1 Pemetaan Rute Halaman (Routing)

1. **Halaman Utama Publik (`/`)**
   * Disusun sebagai halaman tunggal (*single-page landing*) yang dapat digulir (*scroll*) dengan mulus dari atas ke bawah, dilengkapi menu navigasi cepat di bagian atas:
     * **Bagian 1 (Hero & Papan Status PO):** Menampilkan status PO terkini (Buka/Tutup), tombol aksi utama, dan tombol gabung grup/saluran WhatsApp.
     * **Bagian 2 (Kenapa Coba & Aturan Bahan):** Menjelaskan keunggulan rasa masakan orang tua Anda serta kotak informasi transparan mengenai standar *vegetarian tanpa bawang* dan fleksibilitas *request* 100% vegan / pakai bawang.
     * **Bagian 3 (Katalog Menu & Pencarian):** Kolom pencarian nama menu, tombol filter kategori dan filter *"Bisa Vegan"*, serta grid kartu foto makanan.
     * **Bagian 4 (Pesanan Acara & Nasi Kotak):** Galeri dokumentasi acara, pilihan paket, syarat pemesanan, dan tombol konsultasi acara.
     * **Bagian 5 (Footer):** Informasi area pengiriman, jam operasional dapur, dan kontak WhatsApp.
2. **Halaman Masuk Admin (`/login`)**
   * Halaman tersembunyi (tidak ditautkan pada menu navigasi pengunjung) yang berisi formulir login email dan kata sandi khusus admin.
3. **Halaman Dasbor Admin (`/admin`)**
   * Halaman terproteksi yang hanya bisa dibuka setelah berhasil login. Terbagi menjadi 3 tab praktis:
     * **Tab 1 — Kontrol Status PO:** Mengubah saklar *PO Buka / Tutup*, tanggal kirim, status kuota, dan link WhatsApp.
     * **Tab 2 — Kelola Menu:** Menambah menu baru, mengunggah foto, mengedit harga, dan mencentang menu mana saja yang aktif di kloter PO saat ini.
      * **Tab 3 — Kelola Galeri Acara:** Menambah, mengedit, atau menghapus foto dokumentasi dan paket nasi kotak.

### 4.2 Struktur Folder Proyek (Konseptual)

```text
website-kuliner/
├── public/                 # Ikon tab browser (favicon) & aset statis
├── src/
│   ├── components/         # Komponen tampilan yang dapat dipakai ulang
│   │   ├── Navbar.jsx      # Navigasi atas & tombol pintas WhatsApp
│   │   ├── PoBanner.jsx    # Papan pengumuman status PO (Buka/Tutup)
│   │   ├── DietInfo.jsx    # Kotak penjelasan standar tanpa bawang & opsi vegan
│   │   ├── MenuCard.jsx    # Kartu foto makanan, label diet, & tombol pesan WA
│   │   └── EventSection.jsx# Bagian khusus galeri & paket pesanan acara
│   ├── pages/              # Halaman utama aplikasi
│   │   ├── Home.jsx        # Halaman depan untuk pengunjung & calon pembeli
│   │   ├── Login.jsx       # Halaman masuk khusus admin
│   │   └── Admin.jsx       # Dasbor pengelola konten & status PO
│   ├── services/           # Penghubung ke layanan luar
│   │   ├── firebase.js     # Konfigurasi koneksi Firestore & Firebase Auth
│   │   ├── cloudinary.js   # Fungsi unggah foto ke Cloudinary
│   │   └── whatsapp.js     # Pembuat tautan & format pesan otomatis WhatsApp
│   ├── App.jsx             # Pengatur rute halaman (/, /login, /admin)
│   └── main.jsx            # Titik masuk utama aplikasi React
├── index.html              # Kerangka HTML dasar, judul website, & tag meta Open Graph (pratinjau tautan WA/IG)
└── package.json            # Daftar pustaka yang digunakan (React, Tailwind, Firebase)
```

---

## 5. Alur Integrasi Utama (Key Integration Flows)

### 5.1 Alur Unggah Foto & Simpan Menu oleh Admin
1. Admin memilih file foto makanan (format JPG/PNG/WebP) pada formulir di halaman `/admin`.
2. Browser mengirim file foto tersebut langsung ke API **Cloudinary** menggunakan *Upload Preset* khusus yang sudah dibatasi ukurannya.
3. Cloudinary menyimpan foto dan mengembalikan alamat tautan (`secure_url`).
4. Aplikasi menambahkan parameter optimasi otomatis pada tautan tersebut (`f_auto,q_auto,w_800`) sehingga ukuran file menyusut hingga 60–70% tanpa merusak ketajaman visual.
5. Aplikasi menyimpan data teks menu beserta tautan foto Cloudinary ke dalam **Cloud Firestore**.

### 5.2 Alur Pemesanan Otomatis ke WhatsApp (`wa.me`)
Aplikasi tidak memerlukan backend server untuk mengirim pesan. Saat pengunjung menekan tombol pesan pada kartu menu, fungsi `whatsapp.js` menyusun URL khusus yang langsung membuka aplikasi WhatsApp:

* **Format URL:** `https://wa.me/[nomor_admin]?text=[pesan_terkode]`
* **Contoh Isi Pesan Otomatis (Saat PO Buka):**
  > Halo, saya tertarik ikut PO menu *[Nama Menu]*.
  > • Jumlah porsi: ...
  > • Pilihan bahan: *(Standar Tanpa Bawang / Request Pakai Bawang / Request 100% Vegan)*
  > Mohon info ketersediaan kuotanya ya. Terima kasih!

---

## 6. Desain Keamanan (Security Architecture)

Meskipun aplikasi ini tidak menyimpan data sensitif seperti nomor kartu kredit, keamanan tetap dijaga agar tidak ada pihak luar yang dapat mengubah harga menu atau status PO:

1. **Penguncian Pendaftaran Akun (Firebase Auth):**
   * Fitur pendaftaran akun baru (*Sign Up*) tidak disediakan di dalam website. Satu-satunya akun admin (email dan kata sandi Anda) dibuat secara manual langsung melalui dasbor *Firebase Console*.
2. **Aturan Keamanan Database (Firestore Security Rules):**
   * Database dikonfigurasi dengan aturan ketat di sisi server Google:
     * **Izin Baca (`read`):** Dibuka untuk publik (`true`) agar seluruh pengunjung bisa melihat status PO, daftar menu, dan galeri acara tanpa perlu login.
     * **Izin Tulis (`create`, `update`, `delete`):** Ditolak untuk semua orang, **kecuali** permintaan yang berasal dari akun dengan `UID` (ID unik pengguna) milik Anda yang sudah terverifikasi login.
3. **Pembatasan Unggah Media (Cloudinary):**
   * *Upload Preset* pada Cloudinary diatur agar hanya menerima file berjenis gambar (`jpg`, `png`, `webp`) dengan batas ukuran maksimal (misalnya maksimal 5 MB per foto) dan disimpan dalam satu folder khusus proyek.
   * **Catatan risiko & mitigasi:** Karena unggahan dilakukan langsung dari browser (upload preset tanpa tanda tangan), secara teori pihak lain yang membaca kode bisa mengunggah gambar ke akun Cloudinary Anda. Mitigasi untuk MVP: batas tipe & ukuran file, folder khusus proyek, dan pantau galeri Media Cloudinary secara berkala. Jika suatu saat muncul penyalahgunaan, naikkan ke unggahan bertanda tangan (*signed upload*) lewat *Cloudinary Function*.
4. **Enkripsi Jalur Akses (HTTPS):**
   * Cloudflare Pages secara otomatis menyediakan sertifikat SSL/TLS sehingga seluruh pertukaran data antara browser pengunjung, Firebase, dan Cloudinary terenkripsi aman.

---

## 7. Strategi Performa & Efisiensi Kuota

Agar website tetap terasa instan saat dibuka menggunakan jaringan seluler dan tidak pernah melebihi batas kuota gratis layanan *cloud*:

1. **Penyaringan Data di Sisi Browser (Client-Side Filtering):**
   * Mengingat jumlah menu kuliner rumahan biasanya berkisar antara 10 hingga 50 item, seluruh daftar menu dimuat sekali saat halaman dibuka. Ketika pengunjung mengetik di kotak pencarian atau menekan tombol filter (*Vegetarian* / *Bisa Vegan* / *Kategori*), penyaringan dilakukan langsung di memori browser tanpa meminta ulang data ke Firebase. Ini membuat hasil pencarian muncul dalam hitungan milidetik sekaligus menghemat kuota pembacaan database.
2. **Optimasi Gambar Otomatis (Cloudinary Transformations):**
   * Foto makanan yang telah Anda edit estetik sering kali berukuran besar (3–8 MB). Dengan menyisipkan parameter `f_auto,q_auto,w_800` pada URL Cloudinary, gambar otomatis dikirim dalam format modern paling ringan (**WebP** atau **AVIF**) dengan lebar optimal untuk layar ponsel dan kartu katalog.
3. **Pemuatan Gambar Bertahap (*Lazy Loading*):**
   * Foto menu yang berada di bagian bawah halaman baru akan diunduh oleh browser saat pengunjung mulai menggulir layar ke bawah, sehingga tampilan awal website terbuka jauh lebih cepat.

---

## 8. Deployment & Estimasi Biaya Operasional

### 8.1 Alur Publikasi Website (Deployment)
1. Kode aplikasi disimpan di repositori pribadi **GitHub** (gratis).
2. Akun **Cloudflare Pages** dihubungkan ke repositori GitHub tersebut.
3. Setiap kali ada pembaruan kode di masa depan, Cloudflare Pages otomatis membangun ulang (*build*) dan menayangkan versi terbaru website dalam waktu sekitar 1–2 menit tanpa biaya.

### 8.2 Rincian Biaya Operasional

| Komponen Layanan | Paket yang Digunakan | Batas Kuota Gratis | Estimasi Biaya |
| :--- | :--- | :--- | :--- |
| **Hosting Website** (Cloudflare Pages) | Free Plan | *Bandwidth* & kunjungan tidak terbatas | **Rp 0 / bulan** |
| **Database & Login** (Google Firebase) | Spark Plan (Gratis) | 50.000 pembacaan & 20.000 penulisan data per hari | **Rp 0 / bulan** |
| **Penyimpanan & Optimasi Foto** (Cloudinary) | Free Plan | 25 kredit bulanan (setara ±25 GB penyimpanan/bandwidth) | **Rp 0 / bulan** |
| **Nama Domain Kustom** *(Opsional)* | Registrasi `.com` / `.id` | Berlaku 1 tahun (bisa memakai `.pages.dev` jika ingin gratis) | **Rp 0** *(atau ±Rp 150.000–250.000/tahun)* |
| **Total Estimasi Biaya Rutin** | | | **Rp 0 / bulan** |