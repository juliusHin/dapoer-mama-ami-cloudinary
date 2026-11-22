# Project Brief: Website Portofolio & Katalog Pre-Order Kuliner

**Nama Proyek:** Website Portofolio & Pemesanan Kuota PO Kuliner Vegetarian/Vegan  
**Dokumen Terkait:** `PRD.md` (Kebutuhan Produk) & `ARCHITECTURE.md` (Rancangan Teknis)  
**Target Rilis:** Versi Pertama (MVP — Cepat Jadi & Hemat Biaya)  
**Pengelola Utama:** Anda (Admin Tunggal)  

---

## 1. Ringkasan Proyek (Executive Summary)
Proyek ini bertujuan membangun sebuah **website portofolio kuliner digital** untuk mempromosikan usaha masakan rumahan milik orang tua yang berfokus pada hidangan **vegetarian dan vegan**. 

Website ini dirancang sebagai etalase visual yang menarik guna meyakinkan calon pembeli baru agar tertarik mencoba makanan nabati, sekaligus menjadi pusat informasi jadwal pemesanan *Pre-Order* (PO) berbasis kuota yang dibuka secara berkala (tidak rutin) serta layanan pesanan acara/nasi kotak. Seluruh proses pemesanan diarahkan langsung ke **WhatsApp Admin** dengan format pesan otomatis agar praktis, personal, dan hemat biaya operasional.

---

## 2. Latar Belakang & Masalah yang Diselesaikan
* **Stigma Rasa Makanan Nabati:** Banyak masyarakat umum masih menganggap makanan vegetarian/vegan terasa hambar atau kurang menggugah selera. Dibutuhkan tampilan foto makanan yang estetis serta deskripsi rasa yang menggoda untuk mematahkan anggapan tersebut.
* **Jadwal PO yang Tidak Menentu:** Karena kloter PO dibuka hanya pada waktu-waktu tertentu (tidak setiap hari), calon pembeli membutuhkan kejelasan status apakah pesanan sedang **Buka** atau **Tutup**, serta saluran informasi agar tidak ketinggalan kloter berikutnya.
* **Komunikasi Aturan Bahan yang Berulang:** Calon pembeli perlu memahami sejak awal bahwa masakan dibuat dengan standar **vegetarian tanpa bawang**, namun tetap fleksibel menerima permintaan khusus (*request* 100% vegan atau *request* memakai bawang).

---

## 3. Target Audiens
1. **Pembeli Umum / Pemula (Non-Vegetarian):** Masyarakat yang ingin mulai mencoba makanan sehat atau tertarik karena melihat foto makanan yang menggugah selera (termasuk mereka yang lebih suka jika bisa *request* pakai bawang).
2. **Pelanggan Vegetarian, Vegan & Pantangan Bawang:** Pembeli yang membutuhkan jaminan hidangan bebas daging, bebas bawang-bawangan, atau 100% vegan (tanpa telur dan susu).
3. **Pemesan Acara / Nasi Kotak:** Keluarga, panitia kegiatan, atau kantor yang mencari konsumsi dalam jumlah banyak untuk acara pada tanggal tertentu.

---

## 4. Proposisi Nilai & Aturan Dapur (Key Selling Points)
* **Visual Menggugah Selera:** Menampilkan foto hidangan yang sudah diedit secara estetis untuk membangun kesan pertama yang kuat.
* **Standar Dapur Jelas & Fleksibel:**
  * *Standar (Default):* **Vegetarian** (dapat menggunakan telur/susu) dan **Tanpa Bawang-bawangan**.
  * *Opsi Request:* Pembeli dapat meminta **100% Vegan** (tanpa telur, susu, dan produk hewani lainnya) atau **Pakai Bawang** saat memesan.
* **Tanpa Hambatan Daftar Akun:** Pengunjung dapat langsung melihat katalog menu, mengecek status PO, dan menekan tombol pesan ke WhatsApp tanpa perlu membuat akun atau login.

---

## 5. Ruang Lingkup & Fitur Utama (Scope)

### 5.1 Termasuk dalam Versi Pertama (In-Scope)
* **Papan Status PO Dinamis:** Banner paling atas yang menampilkan status **PO BUKA** (lengkap dengan tanggal kirim dan label ketersediaan kuota) atau **PO TUTUP**.
* **Katalog Portofolio & Pencarian Menu:** Galeri foto makanan yang tetap tampil rapi meskipun PO sedang tutup, dilengkapi fitur pencarian, filter kategori, harga, deskripsi rasa, dan label bahan.
* **Kotak Edukasi Singkat Aturan Bahan:** Penjelasan yang mudah dibaca mengenai standar vegetarian tanpa bawang dan cara mengajukan *request* vegan/bawang.
* **Etalase Pesanan Acara & Nasi Kotak:** Galeri dokumentasi pesanan acara sebelumnya, pilihan paket, syarat minimal pemesanan, dan tombol konsultasi cepat.
* **Integrasi WhatsApp Praktis:**
  * Tombol pesan menu yang otomatis mengisi draf pesan WhatsApp (nama menu, jumlah porsi, dan pilihan bahan).
  * Tombol ajakan bergabung ke **Grup / Saluran WhatsApp Info PO** agar pengunjung tidak ketinggalan jadwal PO berikutnya.
* **Panel Admin Sederhana:** Halaman khusus ber kata sandi bagi Anda untuk mengganti status PO (Buka/Tutup), mengunggah foto menu, dan memperbarui harga.

### 5.2 Ditunda ke Tahap Berikutnya (Out-of-Scope)
* Pengiriman notifikasi otomatis berbayar (*WhatsApp Blast* / *Email Newsletter*).
* Keranjang belanja dan pembayaran otomatis (*Payment Gateway* / QRIS otomatis) di dalam website.
* Sistem pengurangan angka kuota otomatis (kuota dikonfirmasi manual oleh admin di chat WhatsApp).
* Sistem katering langganan harian/mingguan.

---

## 6. Ringkasan Teknologi & Biaya Operasional
Berdasarkan dokumen `ARCHITECTURE.md`, website dibangun dengan arsitektur ringan tanpa perlu menyewa server mandiri:
* **Tampilan Website (Frontend):** React (Vite) + Tailwind CSS.
* **Database & Login Admin:** Google Firebase (Cloud Firestore & Firebase Auth).
* **Penyimpanan & Optimasi Foto:** Cloudinary (otomatis memperingan ukuran foto tanpa mengurangi ketajaman).
* **Hosting Website:** Cloudflare Pages.
* **Estimasi Biaya Operasional:** **Rp 0 / bulan** (seluruh layanan menggunakan paket gratis yang kapasitasnya memadai untuk skala usaha rintisan). Biaya hanya muncul jika Anda membeli nama domain kustom (`.com` / `.id`) sekitar Rp 150.000 – Rp 250.000 per tahun.

---

## 7. Tahapan Pengerjaan (Milestones)
1. **Tahap 1 — Persiapan Konten & Akun (1–2 Hari):** Melengkapi data usaha bersama orang tua, menyiapkan foto makanan hasil edit, serta membuat akun gratis Firebase dan Cloudinary.
2. **Tahap 2 — Pembangunan Kerangka & Tampilan Utama (2–3 Hari):** Membangun halaman depan publik, papan status PO, katalog menu, dan integrasi tombol WhatsApp.
3. **Tahap 3 — Pembangunan Panel Admin & Keamanan (2 Hari):** Membuat halaman login serta dasbor bagi Anda untuk mengatur status PO dan mengelola daftar menu.
4. **Tahap 4 — Pengisian Data & Uji Coba (1–2 Hari):** Mengunggah foto-foto menu asli, menguji tampilan di berbagai layar HP, serta memastikan seluruh tautan WhatsApp berfungsi akurat.
5. **Tahap 5 — Peluncuran (Go-Live):** Menayangkan website ke internet melalui Cloudflare Pages dan membagikan tautannya ke media sosial maupun WhatsApp.

---

## 8. Hal yang Masih Perlu Dilengkapi Sebelum Mulai
Sebelum masuk ke tahap pengisian konten dan peluncuran, mohon siapkan informasi berikut bersama orang tua Anda:
- [ ] **Nama Brand / Usaha Kuliner** dan logo (jika ada).
Dapoer Mama Ami. logo ada di folder "images/logos"
- [ ] **Nomor WhatsApp Admin** yang aktif menerima pesanan (format `62 8778 223 8049`).
- [ ] **Tautan Grup atau Saluran WhatsApp** resmi untuk pengumuman jadwal PO berikutnya. 
instagram https://www.instagram.com/dapoermamaami/
- [ ] **Syarat Pesanan Acara / Nasi Kotak** minimal jumlah kotak dan batas waktu pemesanan, misalnya minimal 20 kotak dan pesan H-10.

- [ ] **Aturan Pembayaran** ( kuota PO dikunci setelah transfer lunas, sedangkan acara wajib DP 30%).
- [ ] **Area Layanan Pengiriman** (Tangerang dan Jakarta. di luar area itu diambil sendiri).
- [ ] **Daftar Final Menu Awal** beserta harga dan file foto yang sudah selesai diedit. menu menyusul