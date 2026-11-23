# Test Plan Document (TEST_PLAN.md)

**Nama Proyek:** Website Portofolio & Katalog Pre-Order Kuliner Vegetarian/Vegan

**Versi Dokumen:** 1.0 (MVP)

**Dokumen Terkait:** `PRD.md`, `ARCHITECTURE.md`, `USER_FLOW.md`, `UI_DESIGN.md`, dan `DATABASE_SCHEMA.md`

**Pelaksana Pengujian:** Anda (Pemilik Produk / Admin)

## 1. Tujuan Pengujian (Test Objectives)

Dokumen rencana pengujian ini disusun untuk memastikan bahwa sebelum website diluncurkan ke publik (*Go-Live*):

1. **Seluruh fitur berjalan sesuai harapan:** Papan status PO, katalog menu, label aturan bahan, dan panel admin berfungsi tanpa kesalahan (*error*).

2. **Tautan WhatsApp akurat:** Setiap tombol pemesanan langsung membuka aplikasi WhatsApp dengan format pesan dan nomor tujuan yang benar.

3. **Nyaman dibuka di ponsel:** Tampilan gambar, tulisan, dan tombol mudah dilihat serta ditekan menggunakan satu tangan di layar HP.

4. **Keamanan terjaga:** Orang luar tidak bisa masuk ke halaman admin maupun mengubah harga menu secara sembarangan.

## 2. Ruang Lingkup Pengujian (Test Scope)

### 2.1 Yang Diuji (In-Scope)

* Tampilan dan perubahan status Papan PO (**Buka** vs **Tutup**).

* Fungsi pencarian nama menu dan tombol filter kategori/diet (*Vegetarian* / *Bisa Request Vegan*).

* Kejelasan kotak informasi standar dapur (*tanpa bawang secara standar, bisa request vegan/bawang*).

* Integrasi tombol menuju aplikasi WhatsApp (`wa.me`) serta tautan Grup/Saluran Info PO.

* Etalase paket pesanan acara / nasi kotak dan tombol konsultasinya.

* Proses login admin, unggah foto ke Cloudinary, serta tambah/ubah/hapus data di Firestore.

### 2.2 Tidak Diuji di Versi Pertama (Out-of-Scope)

* Pembayaran otomatis (QRIS/transfer otomatis) dan keranjang belanja multi-item.

* Pengiriman pengingat otomatis via *WhatsApp Blast* atau email.

* Pengurangan angka kuota secara otomatis oleh sistem.

## 3. Perangkat & Lingkungan Pengujian (Test Environment)

Karena mayoritas calon pembeli akan membuka website melalui tautan di media sosial atau chat, pengujian wajib dilakukan pada kondisi berikut:

1. **Browser Ponsel Utama:** Google Chrome (Android) dan/atau Safari (iPhone).

2. **Browser Dalam Aplikasi (*In-App Browser*):** Membuka tautan website langsung dari dalam aplikasi **WhatsApp** dan **Instagram** (untuk memastikan tombol WhatsApp tidak terblokir).

3. **Browser Laptop/Komputer:** Google Chrome atau Microsoft Edge (untuk memastikan tampilan layar lebar tetap proporsional).

4. **Mode Penyamaran (*Incognito / Private Tab*):** Digunakan untuk menguji website sebagai pengunjung baru yang belum pernah login.

## 4. Daftar Skenario Pengujian Fungsional (Functional Test Cases)

Gunakan tabel di bawah ini sebagai daftar periksa (*checklist*) saat menguji aplikasi:

### 4.1 Modul A: Papan Status PO & Aturan Dapur

| ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Status | 
| ----- | ----- | ----- | ----- | ----- | 
| **TC-01** | Tampilan saat **PO BUKA** | Atur status PO menjadi `buka` di admin, lalu buka halaman utama website. | Papan status atas berwarna hijau segar, menampilkan judul kloter, tanggal pengiriman, dan label ketersediaan kuota. | `[ ]` | 
| **TC-02** | Tampilan saat **PO TUTUP** | Atur status PO menjadi `tutup` di admin, lalu muat ulang (*refresh*) halaman utama. | Papan status berubah menjadi warna krem lembut bertuliskan PO tutup, dan muncul tombol **"Gabung Info Jadwal PO"**. | `[ ]` | 
| **TC-03** | Portofolio tetap tampil saat PO Tutup | Dalam kondisi status `tutup`, gulir halaman ke bagian katalog menu. | Seluruh foto dan deskripsi menu tetap tampil rapi sebagai portofolio (halaman tidak kosong). | `[ ]` | 
| **TC-04** | Kejelasan Kotak Aturan Dapur | Baca bagian penjelasan bahan di halaman utama lewat layar ponsel. | Teks mudah dibaca dan menjelaskan bahwa standar masakan adalah *Vegetarian Tanpa Bawang*, serta bisa *request* 100% vegan atau pakai bawang. | `[ ]` | 

### 4.2 Modul B: Katalog Menu, Pencarian & Filter

| ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Status | 
| ----- | ----- | ----- | ----- | ----- | 
| **TC-05** | Kelengkapan informasi kartu menu | Periksa salah satu kartu menu di katalog. | Menampilkan foto rasio `4:3`, nama menu, harga dalam format Rupiah (`Rp ...`), deskripsi rasa, dan lencana label diet. | `[ ]` | 
| **TC-06** | Pencarian nama menu | Ketik kata kunci (misal: *"Jamur"*) di kotak pencarian. | Daftar menu langsung tersaring menampilkan menu yang mengandung kata *"Jamur"* saja tanpa memuat ulang halaman. | `[ ]` | 
| **TC-07** | Pencarian menu tidak ditemukan | Ketik kata acak yang tidak ada (misal: *"Steak Sapi"*). | Muncul pesan ramah (misal: *"Menu tidak ditemukan, coba kata kunci lain"*) dan halaman tidak rusak. | `[ ]` | 
| **TC-08** | Filter kategori & label diet | Tekan tombol filter **"Bisa Request Vegan"** atau kategori tertentu. | Hanya menu yang memiliki label/kategori sesuai pilihan yang tampil di layar. | `[ ]` | 

### 4.3 Modul C: Integrasi Tombol WhatsApp & Etalase Acara

| ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Status | 
| ----- | ----- | ----- | ----- | ----- | 
| **TC-09** | Tombol pesan menu (PO Buka & Menu Aktif) | Pastikan status PO `buka` dan menu aktif PO. Tekan tombol **"Ikut PO via WhatsApp"** pada salah satu menu. | Aplikasi WhatsApp terbuka menuju nomor admin dengan draf pesan otomatis berisi nama menu, kolom jumlah porsi, dan pilihan bahan (*Tanpa Bawang / Pakai Bawang / 100% Vegan*). | `[ ]` | 
| **TC-10** | Tombol menu arsip (PO Buka, Menu Tidak Ikut PO) | Saat PO `buka`, tekan tombol pada menu yang ditandai tidak ikut kloter PO minggu ini. | Tombol bertuliskan **"Tanya Jadwal Menu Ini"** dan mengarah ke WhatsApp dengan format pertanyaan jadwal. | `[ ]` | 
| **TC-11** | Tombol Gabung Grup/Saluran Info PO | Saat PO `tutup`, tekan tombol **"Gabung Info Jadwal PO"** di papan status. | Browser langsung mengarahkan ke halaman undangan Grup atau Saluran WhatsApp resmi usaha Anda (atau chat admin, bila tautan grup belum diisi). | `[ ]` | 
| **TC-12** | Konsultasi Pesanan Acara / Nasi Kotak | Gulir ke bagian **Pesanan Acara**, periksa paket yang ada, lalu tekan tombol **"Konsultasi Acara via WhatsApp"**. | Aplikasi WhatsApp terbuka dengan draf pesan otomatis berisi kolom tanggal acara, estimasi jumlah kotak, dan preferensi bahan. | `[ ]` | 
| **TC-19** | Pratinjau tautan (Open Graph) | Bagikan tautan website ke chat WhatsApp pribadi, lalu buka tautan yang sama dari bio/caption Instagram. | Tautan menampilkan gambar hidangan unggulan, nama usaha, dan deskripsi singkat (bukan tautan polos tanpa gambar). | `[ ]` | 

### 4.4 Modul D: Halaman Login & Dasbor Admin

| ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Status | 
| ----- | ----- | ----- | ----- | ----- | 
| **TC-13** | Login admin berhasil | Buka `/login`, masukkan email dan kata sandi admin yang benar, lalu tekan **Masuk**. | Berhasil masuk dan langsung diarahkan ke halaman Dasbor Admin (`/admin`). | `[ ]` | 
| **TC-14** | Login admin gagal (salah sandi) | Masukkan email benar tetapi kata sandi salah. | Muncul pesan peringatan kesalahan login dan pengguna tetap tertahan di halaman `/login`. | `[ ]` | 
| **TC-15** | Tambah menu baru & unggah foto | Di tab **Kelola Menu**, klik tambah menu, pilih foto dari galeri HP/laptop, isi data, dan klik **Simpan**. | Muncul indikator proses unggah foto; setelah selesai, menu baru dan fotonya langsung muncul di halaman depan publik. | `[ ]` | 
| **TC-16** | Edit harga & status aktif PO menu | Ubah harga salah satu menu atau matikan centang *"Ikut PO Minggu Ini"*, lalu simpan. | Perubahan harga dan status tombol langsung terbarui di halaman depan publik. | `[ ]` | 
| **TC-17** | Tambah dokumentasi pesanan acara | Di tab **Kelola Galeri Acara**, unggah foto nasi kotak, isi keterangan paket & minimal order, lalu simpan. | Foto dan rincian paket acara langsung muncul di bagian **Pesanan Acara** pada halaman depan. | `[ ]` | 
| **TC-18** | Keluar dari akun admin (*Logout*) | Tekan tombol **Keluar** di pojok atas dasbor admin. | Sesi admin berakhir dan halaman kembali ke tampilan publik atau halaman login. | `[ ]` | 

### 4.5 Modul E: Kampanye Musiman (Hampers Natal)

| ID | Skenario Uji | Langkah Pengujian | Hasil yang Diharapkan | Status | 
| ----- | ----- | ----- | ----- | ----- | 
| **TC-20** | Section kampanye tampil saat periode aktif | Pastikan `campaign_start` ≤ hari ini ≤ `campaign_end` pada `settings/general`, lalu buka halaman utama. | Section kampanye berwarna merah tampil di bawah papan status PO, berisi kartu paket hampers dan tombol pemesanan WhatsApp. | `[ ]` | 
| **TC-21** | Section hilang di luar periode | Ubah `campaign_end` ke tanggal yang sudah lewat (mis. kemarin), lalu muat ulang halaman utama. | Section kampanye hilang otomatis; paket hampers tetap tampil di katalog biasa beserta chip filter kategorinya. | `[ ]` | 
| **TC-22** | Tombol pesan paket hampers | Saat kampanye aktif, tekan tombol pesan pada salah satu kartu paket hampers. | WhatsApp terbuka dengan draf pesan berisi nama paket, jumlah box, tanggal ambil/kirim, dan ucapan kartu opsional. | `[ ]` | 

## 5. Pengujian Tampilan & Performa (UI/UX & Performance)

| ID | Aspek yang Diperiksa | Cara Memeriksa | Kriteria Lulus | Status | 
| ----- | ----- | ----- | ----- | ----- | 
| **UI-01** | Tampilan di layar HP kecil | Buka website di ponsel dengan lebar layar standar (sekitar 360px–414px). | Tidak ada tulisan yang terpotong ke samping, tidak ada geser kanan-kiri (*horizontal scroll*), dan tombol mudah ditekan jempol. | `[ ]` | 
| **UI-02** | Tampilan di layar Laptop | Buka website di browser komputer layar penuh. | Kartu menu berjajar rapi (2–3 kolom) dan lebar halaman terpusat nyaman dilihat. | `[ ]` | 
| **UI-03** | Ketajaman & proporsi foto makanan | Periksa seluruh foto makanan yang sudah diunggah di halaman utama. | Foto tidak pecah/buram, pencahayaan terlihat menggugah selera, dan bagian utama makanan tidak terpotong pinggiran bingkai. | `[ ]` | 
| **UI-04** | Kecepatan buka di jaringan seluler | Matikan Wi-Fi, buka website menggunakan paket data 4G biasa. | Halaman terbuka cepat (di bawah 3 detik) dan muncul kotak bayangan lembut sementara foto sedang dimuat. | `[ ]` | 

## 6. Pengujian Keamanan & Kondisi Khusus (Security & Edge Cases)

| ID | Skenario Keamanan / Khusus | Langkah Pengujian | Hasil yang Diharapkan | Status | 
| ----- | ----- | ----- | ----- | ----- | 
| **SEC-01** | Akses langsung ke `/admin` tanpa login | Buka tab penyamaran (*Incognito*), ketik langsung alamat `namausaha.pages.dev/admin`. | Sistem otomatis menolak akses dan melempar pengunjung kembali ke halaman `/login`. | `[ ]` | 
| **SEC-02** | Tidak ada tombol daftar akun baru | Periksa seluruh bagian halaman `/login` dan halaman utama. | Tidak ada tombol atau tautan *"Daftar Akun / Sign Up"* sehingga orang luar tidak bisa membuat akun sendiri. | `[ ]` | 
| **SEC-03** | Unggah file selain foto di admin | Coba pilih file dokumen (misal `.pdf` atau `.docx`) pada kolom unggah foto menu. | Sistem menolak file tersebut dan meminta pengguna memilih file gambar (`.jpg`, `.png`, `.webp`). | `[ ]` | 
| **SEC-04** | Membuka link WhatsApp dari Instagram | Taruh tautan website di bio/pesan Instagram, lalu klik dari aplikasi Instagram di HP dan tekan tombol pesan WA. | Aplikasi WhatsApp tetap berhasil terbuka (tidak macet di browser bawaan Instagram). | `[ ]` | 

## 7. Kriteria Lulus Uji / Siap Rilis (Launch Checklist)

Website dinyatakan **LULUS UJI** dan siap dibagikan kepada pelanggan apabila seluruh syarat berikut terpenuhi:

* \[ \] Seluruh pengujian pada **Modul A, B, C, D, dan E** (`TC-01` hingga `TC-22`) berstatus lulus tanpa kendala.

* \[ \] Seluruh pengujian keamanan (`SEC-01` hingga `SEC-04`) berhasil memblokir akses tidak sah.

* \[ \] Nomor WhatsApp admin dan tautan Grup/Saluran Info PO sudah diuji dan mengarah ke tujuan yang tepat.

* \[ \] Minimal 3–5 menu asli beserta foto hasil edit terbaik sudah terpasang rapi di katalog.

* \[ \] Orang tua Anda telah melihat tampilan akhir website dan menyetujui informasi harga serta aturan bahan yang tertulis.