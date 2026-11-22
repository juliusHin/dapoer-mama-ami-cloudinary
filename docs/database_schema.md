# Database Schema Document (DATABASE_SCHEMA.md)

**Nama Proyek:** Website Portofolio & Katalog Pre-Order Kuliner Vegetarian/Vegan

**Versi Dokumen:** 1.0 (MVP)

**Layanan Database:** Google Cloud Firestore (NoSQL Document Database)

**Dokumen Terkait:** `PRD.md`, `ARCHITECTURE.md`, `USER_FLOW.md`, dan `UI_DESIGN.md`

## 1. Konsep Dasar Database (Untuk Pemula)

Berbeda dengan database tradisional yang berbentuk tabel seperti Microsoft Excel (baris dan kolom kaku), **Cloud Firestore** menggunakan konsep **Dokumen dan Koleksi** yang jauh lebih fleksibel:

* **Koleksi (*Collection*):** Ibarat sebuah **map folder** besar yang mengelompokkan data sejenis (contoh: folder `menus` khusus menyimpan semua daftar makanan).

* **Dokumen (*Document*):** Ibarat **lembar catatan** di dalam map folder tersebut (contoh: 1 lembar catatan untuk *"Rendang Jamur Suwir"*).

* **Field (Kolom Data):** Ibarat **baris isian** di dalam lembar catatan (contoh: `name` berisi nama makanan, `price` berisi angka harga).

* **Penyimpanan Foto:** Database Firestore hanya menyimpan **teks alamat tautan (`URL`)** foto, sedangkan file gambar aslinya disimpan dan dikompresi secara terpisah di **Cloudinary** agar database tetap ringan dan cepat.

## 2. Peta Hubungan Data (Data Structure Map)

Database proyek ini hanya membutuhkan **3 Koleksi Utama** tanpa relasi rumit yang saling mengunci:

```
[ CLOUD FIRESTORE DATABASE ]
│
├── 📁 settings (Koleksi Pengaturan Umum)
│    └── 📄 general (1 Dokumen Tetap)
│         ├── Mengatur Papan Status PO (Buka / Tutup)
│         ├── Menyimpan Jadwal Kirim & Label Kuota
│         └── Menyimpan Nomor WA Admin & Link Grup Info PO
│
├── 📁 menus (Koleksi Katalog & Portofolio Makanan)
│    ├── 📄 [auto_id_1] ──► Menu 1 (misal: Rendang Jamur Suwir)
│    ├── 📄 [auto_id_2] ──► Menu 2 (misal: Nasi Bakar Kemangi)
│    └── 📄 [auto_id_3] ──► Menu 3 (dan seterusnya...)
│         └── Menyimpan tautan foto dari Cloudinary (image_url)
│
└── 📁 events_gallery (Koleksi Paket & Dokumentasi Acara)
     ├── 📄 [auto_id_1] ──► Paket / Dokumentasi 1 (misal: Nasi Kotak Syukuran)
     └── 📄 [auto_id_2] ──► Paket / Dokumentasi 2 (misal: Prasmanan Keluarga)
          └── Menyimpan tautan foto dokumentasi dari Cloudinary (image_url)

```

## 3. Rincian Struktur Koleksi (Schema Definitions)

### 3.1 Koleksi `settings` (Pengaturan Status PO & Kontak)

Koleksi ini dirancang hanya memiliki **1 dokumen tunggal** dengan nama ID tetap yaitu **`general`**. Tujuannya agar halaman utama hanya perlu membaca 1 dokumen kecil untuk mengetahui apakah PO sedang buka atau tutup.

| Nama Field | Tipe Data | Wajib? | Nilai Awal (Default) | Keterangan & Contoh Isi | 
| :--- | :--- | :--- | :--- | :--- | 
| `po_status` | `String` (Teks) | Ya | `"tutup"` | Status kloter PO saat ini. Hanya berisi `"buka"` atau `"tutup"`. | 
| `po_title` | `String` (Teks) | Ya | `"PO Kloter Spesial"` | Judul kloter PO yang tampil di banner atas (contoh: `"PO Akhir Pekan"`). | 
| `delivery_date` | `String` (Teks) | Tidak | `""` | Tanggal pengiriman makanan untuk kloter aktif (contoh: `"Sabtu, 28 November 2026"`). | 
| `quota_status` | `String` (Teks) | Ya | `"tersedia"` | Penanda ketersediaan kuota: `"tersedia"`, `"hampir_habis"`, atau `"penuh"`. | 
| `whatsapp_number` | `String` (Teks) | Ya | `"6281234567890"` | Nomor WhatsApp admin diawali kode negara `62` tanpa tanda `+` atau spasi. | 
| `whatsapp_group_link` | `String` (Teks) | Tidak | `""` | Tautan undangan Grup atau Saluran WhatsApp resmi untuk pengumuman PO berikutnya. | 
| `kitchen_rules_summary` | `String` (Teks) | Ya | *(Teks standar)* | Penjelasan singkat standar dapur (vegetarian tanpa bawang, bisa *request* vegan/bawang). | 
| `updated_at` | `Timestamp` | Ya | *(Waktu saat ini)* | Catatan waktu terakhir admin mengubah pengaturan PO. | 

**Contoh Isi Dokumen (`settings/general`):**

```json
{
  "po_status": "buka",
  "po_title": "PO Kloter Spesial Akhir Pekan",
  "delivery_date": "Sabtu, 28 November 2026",
  "quota_status": "tersedia",
  "whatsapp_number": "6287782238049",
  "whatsapp_group_link": "https://chat.whatsapp.com/ContohLinkGrupInfoPO",
  "kitchen_rules_summary": "Standar masakan kami adalah Vegetarian & Tanpa Bawang. Anda dapat melakukan request 100% Vegan (tanpa telur/susu) atau request Pakai Bawang saat memesan.",
  "updated_at": "2026-11-22T14:30:00Z"
}
```

### 3.2 Koleksi `menus` (Katalog Portofolio & Menu PO)

Setiap dokumen di dalam koleksi `menus` memiliki ID unik otomatis yang dibuat oleh Firestore (`auto-ID`) dan mewakili **1 hidangan**.

| Nama Field | Tipe Data | Wajib? | Nilai Awal (Default) | Keterangan & Contoh Isi | 
| :--- | :--- | :--- | :--- | :--- | 
| `name` | `String` (Teks) | Ya | — | Nama hidangan (contoh: `"Rendang Jamur Suwir Spesial"`). | 
| `category` | `String` (Teks) | Ya | `"Lauk Utama"` | Kategori menu untuk tombol filter (contoh: `"Lauk Utama"`, `"Paket Nasi"`, `"Camilan"`, `"Sambal & Pelengkap"`). | 
| `price` | `Number` (Angka) | Ya | `0` | Harga per porsi dalam angka murni tanpa titik/Rp (contoh: `35000`). Format Rupiah diatur otomatis oleh tampilan website. | 
| `description` | `String` (Teks) | Ya | — | Deskripsi rasa, tekstur, dan porsi untuk menarik minat pembeli baru. | 
| `diet_labels` | `Array` (Daftar Teks) | Ya | `["Vegetarian", "Default Tanpa Bawang"]` | Daftar label yang tampil sebagai pil warna di kartu menu (contoh: `["Vegetarian", "Bisa Request Vegan", "Default Tanpa Bawang"]`). | 
| `is_active_po` | `Boolean` (Ya/Tidak) | Ya | `true` | Jika `true`, menu ikut dibuka dalam kloter PO aktif. Jika `false`, menu tetap tampil sebagai portofolio. | 
| `image_url` | `String` (Teks) | Ya | — | Tautan gambar lengkap dari Cloudinary yang sudah diberi parameter optimasi. | 
| `created_at` | `Timestamp` | Ya | *(Waktu saat ini)* | Waktu menu pertama kali dibuat (dipakai untuk mengurutkan menu terbaru di atas). | 
| `updated_at` | `Timestamp` | Tidak | *(Waktu saat ini)* | Waktu terakhir menu diedit (misal saat ganti harga atau foto). | 

**Contoh Isi Dokumen (`menus/abc123xyz`):**

```json
{
  "name": "Rendang Jamur Suwir Spesial",
  "category": "Lauk Utama",
  "price": 35000,
  "description": "Jamur tiram pilihan disuwir halus dan dimasak perlahan dengan santan segar serta rempah rendang autentik. Tekstur empuk menyerupai daging suwir, gurih, dan meresap.",
  "diet_labels": [
    "Vegetarian",
    "Bisa Request Vegan",
    "Default Tanpa Bawang"
  ],
  "is_active_po": true,
  "image_url": "https://res.cloudinary.com/nama-cloud/image/upload/f_auto,q_auto,w_800/v1700000/rendang-jamur.jpg",
  "created_at": "2026-11-20T10:00:00Z",
  "updated_at": "2026-11-22T09:15:00Z"
}
```

### 3.3 Koleksi `events_gallery` (Etalase Paket & Dokumentasi Acara)

Setiap dokumen di dalam koleksi `events_gallery` memiliki ID unik otomatis (`auto-ID`) dan mewakili **1 paket nasi kotak atau foto dokumentasi pesanan acara**.

| Nama Field | Tipe Data | Wajib? | Nilai Awal (Default) | Keterangan & Contoh Isi | 
| :--- | :--- | :--- | :--- | :--- | 
| `title` | `String` (Teks) | Ya | — | Judul paket atau dokumentasi acara (contoh: `"Paket Nasi Kotak Syukuran"`). | 
| `description` | `String` (Teks) | Ya | — | Rincian isian lauk dalam kotak atau cerita singkat acara yang pernah ditangani. | 
| `starting_price` | `Number` (Angka) | Ya | `0` | Harga mulai per kotak/porsi dalam angka murni (contoh: `25000`). | 
| `min_order_info` | `String` (Teks) | Ya | `"Minimal 20 kotak • Pesan H-3"` | Informasi syarat minimal pemesanan dan batas waktu sebelum hari acara. | 
| `image_url` | `String` (Teks) | Ya | — | Tautan foto dokumentasi acara atau contoh kemasan nasi kotak dari Cloudinary. | 
| `created_at` | `Timestamp` | Ya | *(Waktu saat ini)* | Waktu dokumentasi diunggah untuk pengurutan tampilan. | 

**Contoh Isi Dokumen (`events_gallery/evt987uvw`):**

```json
{
  "title": "Paket Nasi Kotak Syukuran & Acara Kantor",
  "description": "Nasi putih/merah pulen, rendang jamur suwir, perkedel kentang panggang, tumis buncis wortel, sambal bajak tanpa bawang, dan kerupuk. Kemasan kotak bersih dan rapi.",
  "starting_price": 25000,
  "min_order_info": "Minimal 20 kotak • Pemesanan minimal H-3",
  "image_url": "https://res.cloudinary.com/nama-cloud/image/upload/f_auto,q_auto,w_800/v1700000/nasi-kotak-acara.jpg",
  "created_at": "2026-11-21T16:00:00Z"
}
```

## 4. Strategi Pengurutan & Pencarian Data (Querying & Indexing)

Untuk menjaga agar struktur database tetap sederhana dan tidak memerlukan pengaturan indeks tambahan yang rumit di Firebase Console:

1. **Pengurutan Tunggal (*Single-Field Order*):**

   * Daftar menu (`menus`) dan galeri acara (`events_gallery`) diambil dari database dengan satu aturan urut sederhana: berdasarkan `created_at` dari yang paling baru (`descending`). Firestore membuatkan indeks untuk pengurutan tunggal ini secara otomatis.

2. **Pencarian & Filter di Sisi Browser (*Client-Side Filtering*):**

   * Ketika pengunjung mengetik nama makanan di kotak pencarian atau menekan tombol filter kategori/label (`"Bisa Request Vegan"`), website **tidak** mengirim permintaan ulang ke database Firebase.

   * Penyaringan dilakukan langsung di memori browser pengunjung. Selain membuat hasil pencarian muncul seketika (0 detik), cara ini juga menghemat kuota pembacaan database secara drastis.

## 5. Aturan Keamanan Database (Firestore Security Rules)

Di dalam pengaturan Firebase Console bagian **Firestore Database > Rules**, diterapkan aturan keamanan berikut agar website aman dari pihak tidak bertanggung jawab:

* **Siapa saja di internet (`public`):** Boleh **membaca (`read`)** koleksi `settings`, `menus`, dan `events_gallery` tanpa harus login.

* **Hanya 1 Akun Admin (`UID` milik Anda):** Yang diperbolehkan **menambah, mengubah, dan menghapus (`write`)** data pada ketiga koleksi tersebut.
- UID="F0Cx8BbenfR8bjMkQMTFeVbs6193"

**Konfigurasi Aturan (Disalin ke menu Rules di Firebase Console saat persiapan akun):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Ganti TEKS_UID_ADMIN dengan User UID akun Anda dari menu Firebase Authentication
    function isAdmin() {
      return request.auth != null && request.auth.uid == "TEKS_UID_ADMIN";
    }

    // Pengaturan PO: Publik hanya bisa membaca, Admin bisa mengubah
    match /settings/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Katalog Menu: Publik hanya bisa membaca, Admin bisa menambah/edit/hapus
    match /menus/{menuId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Galeri Acara: Publik hanya bisa membaca, Admin bisa menambah/edit/hapus
    match /events_gallery/{eventId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

## 6. Perhitungan Efisiensi Kuota Gratis (Firebase Spark Plan)

Google Firebase memberikan kuota gratis harian sebesar **50.000 pembacaan dokumen (*reads*)** dan **20.000 penulisan dokumen (*writes*)** setiap hari. Berikut simulasi penggunaannya pada website ini:

* **1 Orang Pengunjung Membuka Website:**

   * Membaca 1 dokumen `settings/general` = 1 *read*.

   * Membaca seluruh daftar menu (misal ada 20 menu) = 20 *reads*.

   * Membaca galeri acara (misal ada 5 foto paket) = 5 *reads*.

   * **Total per pengunjung:** Hanya **26 *reads***.

* **Kapasitas Pengunjung Harian Gratis:**

   * Dengan batas 50.000 *reads* per hari, website Anda sanggup dikunjungi oleh sekitar **1.923 pengunjung unik setiap hari** (50.000 ÷ 26) secara penuh tanpa dikenakan biaya sepeser pun.

* **Aktivitas Admin (Anda):**

   * Mengubah status PO dari Buka menjadi Tutup hanya memakan **1 *write*** dari jatah 20.000 *writes* harian.

## 7. Daftar Data Awal untuk Pengisian Pertama (Initial Seed Checklist)

Saat database Firestore baru dibuat pertama kali, koleksi masih dalam keadaan kosong. Anda perlu menyiapkan dan mengisikan data awal berikut melalui halaman Dasbor Admin:

1. **1 Dokumen Pengaturan Awal (`settings/general`):**

   * Nomor WhatsApp aktif orang tua/admin (`628...`).

   * Tautan Grup atau Saluran WhatsApp info PO.

   * Status awal PO (`buka` jika sudah siap menerima pesanan saat rilis, atau `tutup` jika baru ingin memperkenalkan portofolio).

2. **Minimal 3 hingga 6 Menu Awal (`menus`):**

   * Foto makanan yang sudah selesai diedit estetis.

   * Nama menu, harga, deskripsi rasa, kategori, dan label diet masing-masing.

3. **Minimal 1 hingga 3 Paket / Dokumentasi Acara (`events_gallery`):**

   * Foto hasil pesanan nasi kotak atau hidangan acara sebelumnya beserta syarat minimal pemesanannya.