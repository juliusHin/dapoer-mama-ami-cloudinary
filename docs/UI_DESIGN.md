# UI Design Document (UI_DESIGN.md)

**Nama Proyek:** Website Portofolio & Katalog Pre-Order Kuliner Vegetarian/Vegan

**Versi Dokumen:** 1.0 (MVP)

**Dokumen Terkait:** `PRD.md`, `ARCHITECTURE.md`, `PROJECT-BRIEF.md`, dan `USER_FLOW.md`

**Pendekatan Desain:** *Mobile-First* (Diutamakan rapi dan nyaman di layar ponsel terlebih dahulu, lalu menyesuaikan layar laptop)

---

## 1. Konsep & Filosofi Visual (Design Direction)

Untuk mematahkan anggapan bahwa makanan vegetarian/vegan itu membosankan atau hambar, tampilan website dirancang dengan nuansa **Hangat, Bersih, Segar, dan Rumahan (*Warm Artisanal & Appetizing*)**:

* **Foto Makanan sebagai Bintang Utama:** Latar belakang website dibuat bersih dan lembut agar warna-warni hidangan dalam foto terlihat menonjol dan menggugah selera.
* **Kejelasan Informasi Tanpa Ribet:** Pengunjung harus langsung menangkap tiga hal dalam 5 detik pertama: (1) Makanan ini terlihat enak, (2) Apakah PO sedang buka atau tutup, dan (3) Aturan bahannya jelas (*tanpa bawang secara standar, namun bisa request vegan atau pakai bawang*).
* **Navigasi Satu Jempol:** Karena mayoritas pengunjung membuka tautan dari WhatsApp atau Instagram di HP, seluruh tombol penting dibuat cukup besar dan mudah dijangkau oleh ibu jari.

---

## 2. Palet Warna (Color Palette)

Penggunaan warna dibatasi pada kombinasi warna alam yang menenangkan sekaligus membangkitkan selera makan:

| Peran Warna | Nama Warna | Kode Warna | Kegunaan di Dalam Website |
| :--- | :--- | :--- | :--- |
| **Latar Belakang Utama** | *Warm Cream* (Krem Lembut) | `#FAF8F5` | Latar belakang utama halaman agar mata tidak lelah dan foto makanan tampak hangat. |
| **Latar Kartu / Kotak** | *Pure White* (Putih Bersih) | `#FFFFFF` | Latar belakang kartu menu, kotak penjelasan dapur, dan formulir admin. |
| **Warna Utama (Brand)** | *Deep Sage / Forest Green* | `#2E5A44` | Melambangkan kesegaran bahan nabati, dipakai untuk judul penting, ikon, dan papan status **PO BUKA**. |
| **Warna Aksi (CTA)** | *Warm Terracotta / Amber* | `#D96B27` | Warna hangat yang menggugah selera, dipakai untuk tombol utama seperti **"Ikut PO via WhatsApp"**. |
| **Teks Utama** | *Dark Charcoal* (Abu Gelap) | `#262626` | Warna tulisan judul dan deskripsi (lebih lembut dan nyaman dibaca dibanding hitam pekat). |
| **Teks Pendukung** | *Muted Stone* (Abu Kecokelatan) | `#66625E` | Warna keterangan tambahan, harga coret, atau catatan kaki. |
| **Status PO Tutup** | *Soft Sand / Warm Gray* | `#EAE5DF` | Warna latar papan pengumuman saat **PO TUTUP** (tetap terlihat rapi dan ramah, bukan merah menyeramkan). |

---

## 3. Tipografi (Jenis & Ukuran Huruf)

Website menggunakan kombinasi dua jenis huruf gratis dari Google Fonts yang ringan dimuat dan mudah dibaca di layar kecil:

1. **Huruf Judul (*Headings*): `Lora` atau `Playfair Display` (Gaya Serif Modern)**
   * Memberikan kesan masakan rumahan yang autentik, berkualitas, dan berkelas seperti buku menu restoran.
   * Dipakai untuk judul utama halaman, nama bagian (*section*), dan nama hidangan.
2. **Huruf Isi & Tombol (*Body & UI*): `Plus Jakarta Sans` atau `Inter` (Gaya Sans-Serif Bersih)**
   * Sangat jelas terbaca pada ukuran kecil di layar ponsel.
   * Dipakai untuk deskripsi rasa, daftar harga, label diet, filter pencarian, dan teks tombol.

**Hierarki Ukuran (Tampilan Ponsel):**
* **Judul Utama (*Hero Title*):** 28px – 32px (Tebal)
* **Judul Bagian (*Section Title*):** 22px – 24px (Tebal)
* **Nama Menu pada Kartu:** 18px (Tebal)
* **Teks Deskripsi & Aturan Bahan:** 14px – 15px (Normal, jarak antarbaris lega)
* **Label Diet (*Badge*):** 12px (Semi-tebal)

---

## 4. Tata Letak Halaman Utama Publik (`/`)

Halaman depan disusun memanjang ke bawah secara berurutan agar pengunjung mengalir dari rasa penasaran menuju keputusan memesan:

```
+-------------------------------------------------------+
| [LOGO / NAMA USAHA]             [Menu] [Tombol WA]    | <-- 1. Navigasi Atas (Sticky)
+-------------------------------------------------------+
| STATUS: PO BUKA! Kirim Sabtu, 28 Nov | Kuota Terbatas | <-- 2. Papan Status PO Dinamis
| [ Tombol: Lihat Menu PO ]                             |
+-------------------------------------------------------+
|                                                       |
|   [ FOTO BESAR HIDANGAN UNGGULAN YANG ESTETIS ]       | <-- 3. Bagian Pembuka (Hero)
|                                                       |
|   "Masakan Nabati Rumahan yang Bikin Jatuh Hati"      |
|   Deskripsi singkat keunggulan rasa & bahan segar.    |
|   [ Pesan Kloter Ini ]   [ Lihat Paket Acara ]        |
+-------------------------------------------------------+
|  STANDAR DAPUR KAMI (Transparan & Fleksibel)          | <-- 4. Kotak Aturan Bahan
|  • Standar (Default): Vegetarian & Tanpa Bawang       |
|  • Bisa Request: 100% Vegan (Tanpa Telur & Susu)      |
|  • Bisa Request: Pakai Bawang (Untuk pemula/umum)     |
+-------------------------------------------------------+
|  KATALOG MENU & PORTOFOLIO                            | <-- 5. Katalog & Pencarian
|  [ Cari nama menu...                            🔍 ]  |
|  [Semua] [Lauk Utama] [Paket Nasi] [Bisa Vegan]       |
|                                                       |
|  +-----------------------+  +-----------------------+ |
|  | [Foto Makanan 4:3]    |  | [Foto Makanan 4:3]    | |
|  | [Vegetarian] [Vegan*] |  | [Vegetarian]          | |
|  | Rendang Jamur Suwir   |  | Nasi Bakar Kemangi    | |
|  | Rp 35.000             |  | Rp 28.000             | |
|  | Bumbu meresap gurih.. |  | Wangi kemangi & jamur..| |
|  | [ Ikut PO via WA ]    |  | [ Ikut PO via WA ]    | |
|  +-----------------------+  +-----------------------+ |
+-------------------------------------------------------+
|  PESANAN ACARA & NASI KOTAK                           | <-- 6. Etalase Acara
|  [ Galeri Foto Dokumentasi Nasi Kotak / Prasmanan ]   |
|  • Paket Syukuran (Mulai Rp 25.000/box - Min. 20 box) |
|  • Pemesanan minimal H-3 sebelum hari acara           |
|  [ Konsultasi Acara via WhatsApp ]                    |
+-------------------------------------------------------+
|  FOOTER: Area Pengiriman • Jam Dapur • Kontak WA      | <-- 7. Bagian Penutup
+-------------------------------------------------------+
```

### Penjelasan Kondisi Papan Status PO (Bagian 2):
* **Saat PO BUKA:** Papan berwarna hijau lembut (`#2E5A44`) dengan teks putih terang, menampilkan judul kloter, tanggal pengiriman, dan label status kuota (*Kuota Tersedia* / *Hampir Habis*).
* **Saat PO TUTUP:** Papan berubah warna menjadi krem hangat (`#EAE5DF`), menampilkan tulisan *"Kloter PO Saat Ini Sudah Tutup — Tetap terima pesanan acara/nasi kotak"*, disertai tombol utama **"Gabung Grup Info Jadwal PO Berikutnya"**.

---

## 5. Detail Desain Komponen Utama

### 5.1 Kartu Menu (*Menu Card*)
Setiap hidangan ditampilkan dalam kartu seragam dengan sudut membulat lembut (*rounded corners* 12px) dan bayangan tipis:
* **Rasio Foto:** `4:3` (mendatar sedikit melebar) agar proporsional baik saat dibuka di HP maupun laptop.
* **Lencana Diet (*Diet Badges*):** Diletakkan tepat di bawah foto menggunakan pil warna lembut agar mudah dipindai mata:
  * `Vegetarian` (Latar hijau muda, teks hijau tua)
  * `Bisa Request Vegan` (Latar kuning gading, teks cokelat tua)
  * `Tanpa Bawang (Bisa Request Bawang)` (Latar abu hangat, teks abu gelap)
* **Status Menu Saat PO:** Jika PO sedang buka namun menu tersebut tidak masuk dalam kloter minggu ini, tombol pemesanan otomatis berubah menjadi **"Tanya Jadwal Menu Ini"** agar pengunjung tetap bisa bertanya.

### 5.2 Kotak Aturan Dapur (*Kitchen Standards Box*)
Didesain sebagai kotak khusus dengan garis tepi putus-putus atau aksen daun sederhana di halaman utama. Tujuannya agar pembeli baru tidak bingung mengapa ada tulisan *"Tanpa Bawang"* dan langsung tahu bahwa mereka boleh meminta tambahan bawang atau versi 100% vegan saat mengisi format WhatsApp.

---

## 6. Tata Letak Halaman Admin (`/login` & `/admin`)

Halaman admin dirancang sangat fungsional, bersih, dan bebas gangguan visual agar Anda bisa memperbarui data dalam waktu kurang dari 1 menit lewat ponsel:

```
+-------------------------------------------------------+
| DASBOR ADMIN KULINER                     [ Keluar ]   |
+-------------------------------------------------------+
| [ 1. Status PO ]  [ 2. Kelola Menu ]  [ 3. Acara ]    | <-- Navigasi 3 Tab Utama
+-------------------------------------------------------+
|                                                       |
|  PENGATURAN KLOTER PRE-ORDER (PO)                     |
|                                                       |
|  Status PO Saat Ini:   ( O ) BUKA    (   ) TUTUP      |
|                                                       |
|  Judul Kloter:                                        |
|  [ PO Kloter Spesial Akhir Pekan                    ] |
|                                                       |
|  Tanggal Pengiriman:                                  |
|  [ Sabtu, 28 November 2026                          ] |
|                                                       |
|  Status Ketersediaan Kuota:                           |
|  [ Kuota Tersedia                              ▼ ]    |
|                                                       |
|  Link Grup / Saluran WhatsApp Info PO:                |
|  [ https://chat.whatsapp.com/...                    ] |
|                                                       |
|  [           SIMPAN PERUBAHAN STATUS PO             ] |
+-------------------------------------------------------+
```

* **Tab 2 (Kelola Menu):** Menampilkan daftar menu dalam bentuk baris ringkas berisi foto kecil (*thumbnail*), nama menu, harga, saklar cepat **"Ikut PO Minggu Ini (Ya/Tidak)"**, serta tombol **Edit** dan **Hapus**. Di bagian atas terdapat tombol besar **"+ Tambah Menu Baru"**.
* **Tab 3 (Acara):** Formulir sederhana untuk mengunggah foto dokumentasi pesanan acara beserta keterangan paket dan minimal order.

---

## 7. Panduan Foto Makanan & Aset Visual

Karena Anda sedang dalam tahap mengedit foto-foto makanan yang sudah ada, berikut panduan praktis agar foto tersebut tampil maksimal saat dipasang di website:

1. **Jangan Menempelkan Teks Harga/Promo di Dalam Foto:** Biarkan foto makanan tampil bersih tanpa tulisan. Harga, nama menu, dan label vegan akan ditampilkan oleh sistem website secara rapi sehingga mudah diubah sewaktu-waktu tanpa perlu mengedit ulang gambar.
2. **Gunakan Orientasi Mendatar (`4:3`) atau Persegi (`1:1`):** Hindari foto yang terlalu tinggi memanjang (seperti ukuran *Instagram Story* `9:16`) karena bagian atas dan bawah makanan berisiko terpotong saat ditampilkan di kartu katalog.
3. **Konsistensi Pencahayaan Hangat:** Saat mengedit foto, usahakan tingkat kecerahan dan kehangatan warnanya (*warmth*) seragam antar satu menu dengan menu lainnya agar tampilan galeri terlihat harmonis seperti buku menu profesional.
4. **Ukuran File:** Simpan hasil edit dalam format **JPG** atau **PNG** dengan kualitas baik. Anda tidak perlu repot memperkecil ukuran file secara manual karena Cloudinary akan mengompresnya secara otomatis saat diunggah.

---

## 8. Responsivitas & Pengalaman Pengguna (UX)

* **Tampilan Ponsel (*Mobile* < 640px):** Kartu menu ditampilkan **1 kolom penuh** ke bawah agar foto makanan terlihat besar dan detail teksturnya jelas.
* **Tampilan Tablet & Laptop (> 768px):** Kartu menu otomatis berjajar **2 hingga 3 kolom** ke samping agar halaman tetap proporsional dan tidak terlihat kosong.
* **Keadaan Memuat (*Loading State*):** Saat foto sedang dimuat di jaringan seluler yang lambat, kotak gambar akan menampilkan efek kilau lembut (*skeleton placeholder*) sehingga tata letak halaman tidak bergeser atau melompat secara tiba-tiba.