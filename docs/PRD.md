# Product Requirement Document (PRD)
**Nama Proyek:** Website Portofolio & Katalog Pre-Order Kuliner Vegetarian/Vegan  
**Versi Dokumen:** 1.0 (MVP / Versi Pertama)  
**Status:** Siap Ditinjau  
**Pemilik Produk:** Pengelola Usaha Kuliner Orang Tua  

---

## 1. Project Overview (Gambaran Umum Proyek)

### 1.1 Latar Belakang
Usaha kuliner milik orang tua menyediakan hidangan berbasis nabati (*vegetarian* dan *vegan*) dengan sistem pemesanan *Pre-Order* (PO) berbasis kuota yang dibuka secara berkala (tidak rutin setiap hari), serta melayani pesanan acara atau nasi kotak. Tantangan utama saat ini adalah meyakinkan calon pembeli umum bahwa makanan vegetarian/vegan memiliki rasa yang lezat dan menggugah selera, sekaligus menjelaskan fleksibilitas bahan masakan secara jelas.

### 1.2 Solusi yang Dibangun
Membangun sebuah website portofolio kuliner yang berfungsi sebagai etalase digital permanen dan pusat informasi jadwal PO. Website ini dirancang untuk:
* Menampilkan foto-foto makanan yang estetis dan menggugah selera guna menarik minat pembeli baru.
* Memberikan kejelasan status apakah kloter PO sedang **Buka** atau **Tutup**.
* Mempermudah calon pembeli memesan kuota PO atau berkonsultasi mengenai pesanan acara langsung melalui WhatsApp tanpa perlu membuat akun.
* Memudahkan admin (Anda sendiri) memperbarui daftar menu, foto, dan status PO dengan biaya pembuatan serta perawatan yang hemat.

---

## 2. Business Objectives (Tujuan Bisnis)

1. **Meningkatkan Kepercayaan & Minat Coba:** Mengubah persepsi calon pembeli umum terhadap makanan vegetarian/vegan melalui tampilan visual yang menarik, deskripsi rasa yang menggugah, dan bukti dokumentasi pesanan acara.
2. **Mempermudah Komunikasi Aturan Bahan:** Mengurangi pertanyaan berulang mengenai pantangan bahan dengan menampilkan standar dapur secara transparan (standar vegetarian tanpa bawang, namun bisa *request* 100% vegan atau pakai bawang).
3. **Menjaga Keterhubungan Pelanggan Saat PO Tutup:** Mengarahkan pengunjung yang datang di luar jadwal PO untuk bergabung ke saluran/grup info WhatsApp agar tidak kehilangan calon pembeli pada kloter berikutnya.
4. **Efisiensi Biaya dan Waktu Peluncuran:** Menghadirkan versi pertama (*Minimum Viable Product* / MVP) yang cepat selesai, murah secara operasional, dan mudah dikelola sendiri oleh satu orang admin.

---

## 3. User Personas (Profil Pengguna)

### 3.1 Pembeli Umum / Pemula (Non-Vegetarian)
* **Karakteristik:** Masyarakat umum yang penasaran mencoba makanan sehat, ingin mengurangi konsumsi daging, atau tertarik karena melihat foto makanan yang menarik.
* **Kebutuhan:** Ingin melihat foto makanan yang menggugah selera, membaca deskripsi rasa, dan memiliki opsi untuk meminta tambahan bawang (*request* pakai bawang) agar rasanya lebih akrab di lidah.
* **Hambatan:** Ragu makanan nabati terasa hambar dan malas jika harus mendaftar akun hanya untuk memesan.

### 3.2 Pelanggan Vegetarian / Diet Khusus
* **Karakteristik:** Pelanggan yang menjalani pola makan vegetarian (masih mengonsumsi telur/susu), vegan murni (tanpa produk hewani sama sekali), atau memiliki pantangan bawang-bawangan (misalnya karena alasan keyakinan/kesehatan).
* **Kebutuhan:** Kepastian label bahan pada setiap menu dan jaminan bahwa permintaan khusus (*100% vegan* atau *tanpa bawang*) dapat dicatat dengan jelas saat memesan.

### 3.3 Pemesan Acara / Nasi Kotak
* **Karakteristik:** Perwakilan keluarga, panitia kegiatan, atau kantor yang membutuhkan konsumsi dalam jumlah banyak untuk tanggal tertentu.
* **Kebutuhan:** Melihat bukti foto pesanan acara yang pernah ditangani sebelumnya, kisaran paket harga, dan akses cepat untuk berdiskusi mengenai tanggal serta jumlah porsi.

### 3.4 Admin / Pengelola Website (Anda Sendiri)
* **Karakteristik:** Pengelola tunggal yang membantu operasional digital usaha orang tua, membutuhkan sistem yang praktis dan tidak rumit secara teknis.
* **Kebutuhan:** Dapat mengubah status PO (Buka/Tutup), mengganti label kuota, mengunggah foto menu yang sudah diedit, serta mengubah harga dengan cepat lewat HP maupun laptop.

---

## 4. Functional Requirements (Kebutuhan Fungsional)

Seluruh poin di bawah ini merupakan **[Kebutuhan yang Sudah Disetujui]** untuk versi pertama (MVP):

### FR-01: Papan Status PO (PO Status Banner)
* Sistem harus menampilkan informasi status PO di bagian paling atas halaman depan agar langsung terlihat oleh pengunjung.
* Admin dapat mengubah status PO menjadi dua kondisi utama:
  * **PO BUKA:** Menampilkan informasi jadwal/tanggal pengiriman kloter berjalan dan status ketersediaan kuota (contoh: *Kuota Tersedia* atau *Kuota Hampir Habis*).
  * **PO TUTUP:** Menampilkan informasi bahwa kloter saat ini sudah tutup/penuh, disertai tombol ajakan untuk bergabung ke Grup/Saluran WhatsApp Info PO berikutnya.

### FR-02: Katalog Portofolio & Pencarian Menu
* Sistem harus menampilkan daftar seluruh menu unggulan dalam bentuk galeri foto yang rapi meskipun status PO sedang tutup (berfungsi sebagai portofolio permanen).
* Setiap kartu menu wajib menampilkan:
  * Foto makanan beresolusi baik.
  * Nama menu dan harga per porsi/paket.
  * Deskripsi singkat mengenai rasa dan bahan utama.
  * **Label Diet & Bahan:** Penanda visual yang jelas (misalnya: *Vegetarian*, *Bisa Request Vegan*, *Default Tanpa Bawang*).
* Pengunjung dapat mencari menu berdasarkan nama atau menyaring (*filter*) berdasarkan kategori (misalnya: *Menu PO*, *Paket Nasi Kotak / Acara*, *Bisa Vegan*).

### FR-03: Informasi Standar Dapur & Fleksibilitas Bahan
* Website harus memiliki bagian penjelasan singkat yang mudah dibaca mengenai aturan bahan:
  * Standar (*default*) masakan adalah **Vegetarian** (dapat mengandung telur/susu) dan **Tanpa Bawang-bawangan**.
  * Pembeli dapat mengajukan permintaan khusus saat memesan: **Request 100% Vegan** (tanpa telur, susu, dan produk hewani lainnya) atau **Request Pakai Bawang**.

### FR-04: Halaman / Bagian Khusus Pesanan Acara & Nasi Kotak
* Website harus menyediakan bagian khusus yang menampilkan galeri dokumentasi pesanan acara/nasi kotak sebelumnya untuk membangun kepercayaan.
* Menampilkan pilihan paket nasi kotak/prasmanan beserta informasi syarat umum pemesanan acara (minimal porsi dan batas waktu pemesanan).

### FR-05: Tombol Aksi Langsung ke WhatsApp (Format Otomatis)
* Website tidak memproses pembayaran secara otomatis, melainkan mengarahkan pengunjung ke WhatsApp Admin dengan draf pesan yang sudah terisi otomatis:
  * **Tombol Pesan Kuota PO (saat PO Buka):** Mengisi templat pesan berisi nama menu yang dipilih, jumlah porsi, dan pilihan catatan bahan (*Standar Tanpa Bawang / Request Pakai Bawang / Request 100% Vegan*).
  * **Tombol Konsultasi Acara:** Mengisi templat pesan untuk menanyakan ketersediaan tanggal acara, estimasi jumlah kotak, dan pilihan menu.
   * **Tombol Gabung Info PO:** Mengarahkan pengunjung ke tautan Grup atau Saluran (*Channel*) WhatsApp resmi untuk mendapatkan notifikasi saat PO berikutnya dibuka. *Fallback:* jika tautan grup belum tersedia, tombol membuka chat WhatsApp langsung ke admin.

### FR-06: Panel Admin Sederhana
* Tersedia halaman khusus yang dilindungi kata sandi (*password*) bagi admin untuk:
   * Mengubah status PO (Buka / Tutup), tanggal pengiriman kloter, dan label ketersediaan kuota.
   * Menambah, mengedit, atau menghapus data menu (unggah foto, nama menu, harga, deskripsi, kategori, dan label diet).
   * Mengunggah foto dokumentasi pesanan acara.
   * Mengatur tautan Grup/Saluran WhatsApp Info PO dan nomor WhatsApp tujuan pemesanan.

### FR-07: Pratinjau Tautan Saat Dibagikan (Open Graph)
* Saat tautan website dibagikan di WhatsApp atau Instagram, sistem harus menampilkan pratinjau berupa foto hidangan unggulan, nama usaha, dan deskripsi singkat (bukan tautan polos).
* Pratinjau diatur melalui *tag meta* Open Graph statis pada `index.html` (foto memakai URL Cloudinary), tanpa layanan tambahan.

### FR-08: Kampanye Musiman (Contoh: Hampers Natal)
* Admin dapat mengaktifkan kampanye musiman dengan mengatur `campaign_name`, `campaign_start`, dan `campaign_end` pada dokumen pengaturan (`settings/general`).
* Selama periode aktif, section kampanye tampil di halaman utama tepat di bawah papan status PO: berisi grid paket kampanye (disimpan sebagai menu dengan kategori khusus, misal `"Hampers Natal"`) dan tombol pemesanan WhatsApp dengan templat khusus (nama paket, jumlah box, tanggal ambil/kirim, ucapan kartu opsional).
* Paket kampanye dijual terus selama periode kampanye dan tidak terpengaruh status buka/tutupnya PO kuliner.
* Di luar periode, section kampanye otomatis disembunyikan tanpa perubahan kode; paketnya tetap tampil di katalog biasa.

---

## 5. Non-Functional Requirements (Kebutuhan Non-Fungsional)

1. **Kemudahan Penggunaan (Usability):**
   * Pengunjung umum **tidak perlu mendaftar akun atau login** untuk melihat seluruh isi website maupun menekan tombol pemesanan WhatsApp.
   * Tampilan harus ramah layar ponsel (*mobile-first*), mengingat mayoritas pengunjung akan membuka tautan website dari Instagram atau WhatsApp di HP mereka.
2. **Kecepatan Akses (Performance):**
   * Karena website akan memuat banyak foto makanan estetis, sistem harus mengoptimalkan ukuran foto secara otomatis atau menggunakan format gambar ringan agar halaman tetap terbuka cepat (target di bawah 3 detik pada jaringan seluler standar).
3. **Keamanan Dasar (Security):**
   * Halaman panel admin hanya dapat diakses menggunakan kredensial login (username/email dan kata sandi) agar pengunjung umum tidak bisa mengubah harga atau status PO.
4. **Efisiensi Biaya & Perawatan (Maintainability & Cost):**
   * Arsitektur website harus ringan sehingga biaya sewa server/hosting bulanan sangat rendah (atau menggunakan layanan gratis/hemat) dan tidak bergantung pada layanan berbayar pihak ketiga seperti *WhatsApp Blast API*.

---

## 6. User Stories (Cerita Pengguna)

| ID | Peran | Cerita Pengguna (User Story) |
| :--- | :--- | :--- |
| **US-01** | Pengunjung Umum | Sebagai pengunjung baru, saya ingin langsung melihat status apakah PO sedang buka atau tutup saat membuka website, supaya saya tahu apakah saya bisa memesan hari ini. |
| **US-02** | Pembeli Umum | Sebagai pembeli yang terbiasa makan makanan berbawang, saya ingin tahu bahwa saya bisa *request* pakai bawang saat memesan, supaya saya yakin rasanya akan cocok di lidah saya. |
| **US-03** | Pelanggan Vegan | Sebagai pelanggan vegan, saya ingin melihat label menu yang bisa dibuat 100% vegan tanpa telur dan susu, supaya saya merasa aman saat memesan. |
| **US-04** | Pembeli Kuota PO | Sebagai pembeli yang tertarik pada suatu menu, saya ingin menekan satu tombol yang langsung membuka WhatsApp dengan format pesanan terisi, supaya saya tidak repot mengetik dari awal. |
| **US-05** | Pengunjung Saat PO Tutup | Sebagai pengunjung yang datang saat kuota PO sudah tutup, saya ingin tombol untuk bergabung ke grup info WhatsApp, supaya saya mendapat kabar ketika kloter berikutnya dibuka. |
| **US-06** | Pemesan Acara | Sebagai panitia acara, saya ingin melihat foto-foto dokumentasi pesanan nasi kotak sebelumnya dan tombol konsultasi cepat, supaya saya yakin mempercayakan konsumsi acara saya. |
| **US-07** | Admin (Anda) | Sebagai pengelola website, saya ingin bisa mengganti status PO dari Buka menjadi Tutup hanya dengan satu klik di halaman admin, supaya pembeli tidak terus memesan saat kuota penuh. |
| **US-08** | Admin (Anda) | Sebagai pengelola website, saya ingin mudah mengunggah foto menu yang baru saja saya edit dan memperbarui harganya tanpa perlu mengerti teknis pemrograman. |

---

## 7. User Flow (Alur Pengguna)

### 7.1 Alur Pemesanan Kuota PO (Saat Status PO Buka)
1. Pengunjung membuka halaman utama website.
2. Pengunjung melihat papan status di bagian atas bertuliskan **PO BUKA** beserta jadwal pengiriman.
3. Pengunjung menelusuri galeri foto menu, membaca deskripsi rasa, dan melihat label aturan bahan.
4. Pengunjung menekan tombol **"Ikut PO via WhatsApp"** pada menu yang diminati.
5. Aplikasi WhatsApp terbuka otomatis dengan pesan bawaan (contoh: *"Halo, saya ingin ikut PO menu [Nama Menu]. Jumlah: ... porsi. Pilihan bahan: [Standar Tanpa Bawang / Request Pakai Bawang / Request 100% Vegan]"*).
6. Pengunjung mengirim pesan, lalu admin mengonfirmasi ketersediaan kuota dan meminta pembayaran untuk mengunci kuota.

### 7.2 Alur Pengunjung Saat Status PO Tutup
1. Pengunjung membuka website dan melihat papan status bertuliskan **PO TUTUP**.
2. Pengunjung tetap dapat melihat seluruh galeri foto menu sebagai portofolio.
3. Pengunjung menekan tombol **"Gabung Info Jadwal PO Berikutnya"** pada papan status.
4. Pengunjung diarahkan masuk ke Grup/Saluran WhatsApp resmi agar mendapat pengumuman saat kloter PO berikutnya dibuka.

### 7.3 Alur Konsultasi Pesanan Acara / Nasi Kotak
1. Pengunjung masuk ke bagian **"Pesanan Acara & Nasi Kotak"**.
2. Pengunjung melihat galeri dokumentasi acara, pilihan paket, dan syarat minimal pemesanan.
3. Pengunjung menekan tombol **"Konsultasi Acara via WhatsApp"**.
4. Aplikasi WhatsApp terbuka dengan draf pesan untuk berdiskusi mengenai tanggal acara, jumlah kotak, dan penyesuaian bahan.

### 7.4 Alur Pengelolaan Konten oleh Admin
1. Admin membuka tautan halaman khusus admin dan memasukkan kata sandi.
2. **Untuk membuka kloter PO:** Admin memilih menu yang aktif pada kloter tersebut, mengisi tanggal pengiriman, lalu mengubah status PO menjadi **BUKA** dan menekan **Simpan**.
3. **Untuk menambah/edit menu:** Admin membuka menu kelola katalog, mengunggah foto yang sudah diedit, mengisi nama, harga, deskripsi, dan label diet, lalu menekan **Simpan**.
4. **Untuk menutup PO:** Setelah kuota penuh di WhatsApp, admin mengubah status PO menjadi **TUTUP** dan menekan **Simpan**.

---

## 8. Acceptance Criteria (Kriteria Penerimaan / Keberhasilan)

Website dinyatakan selesai dan siap diluncurkan apabila memenuhi seluruh kriteria berikut:

* **Papan Status PO:** Perubahan status antara *PO Buka* dan *PO Tutup* di panel admin langsung mengubah tampilan banner dan tombol aksi di halaman depan tanpa kesalahan tampilan.
* **Kelengkapan Informasi Bahan:** Setiap item menu menampilkan label diet yang jelas, dan kotak penjelasan mengenai aturan standar (*vegetarian tanpa bawang, bisa request vegan atau pakai bawang*) tampil mudah terbaca di halaman utama.
* **Fungsi Tautan WhatsApp:** Seluruh tombol pemesanan PO, konsultasi acara, dan ajakan gabung grup/saluran WhatsApp berfungsi dengan benar baik saat dibuka melalui browser HP (Android/iOS) maupun komputer.
* **Tampilan Galeri & Responsivitas:** Foto-foto makanan tampil tajam, proporsional (tidak terpotong aneh), dan tata letak website rapi saat dibuka di layar ponsel maupun layar laptop.
* **Fungsi Panel Admin:** Admin dapat melakukan proses tambah, ubah, dan hapus menu beserta unggah foto secara mandiri tanpa bantuan teknis, dan halaman admin tidak dapat diakses publik tanpa kata sandi.
* **Pratinjau Tautan (Open Graph):** Tautan website yang dibagikan ke WhatsApp maupun Instagram menampilkan gambar hidangan unggulan, nama usaha, dan deskripsi singkat dengan benar (sesuai FR-07).

---

## 9. Scope dan Out-of-Scope (Batasan Ruang Lingkup)

### 9.1 In-Scope (Termasuk dalam Pembuatan Versi Pertama / MVP)
* Halaman utama dengan papan status PO dinamis (Buka/Tutup).
* Katalog portofolio menu lengkap dengan fitur pencarian, filter kategori, dan label diet.
* Bagian informasi standar bahan (vegetarian tanpa bawang, fleksibilitas *request* vegan/bawang).
* Bagian etalase dokumentasi dan paket pesanan acara / nasi kotak.
* Integrasi tombol WhatsApp dengan templat pesan otomatis dan tautan ke Grup/Saluran Info PO.
* Halaman admin sederhana untuk kelola status PO dan data menu.
* Kampanye musiman otomatis berbasis tanggal (contoh: Hampers Natal) dengan templat WhatsApp khusus.

### 9.2 Out-of-Scope (Tidak Termasuk di Versi Pertama — Ditunda ke Tahap Berikutnya)
* **Notifikasi Otomatis (WhatsApp Blast / Email Newsletter):** Pengiriman pengingat jadwal PO otomatis berbayar dari sistem. *(Digantikan dengan tombol gabung Grup/Saluran WhatsApp).*
* **Keranjang Belanja & Pembayaran Otomatis (Payment Gateway):** Fitur hitung total belanja multi-item dan pembayaran QRIS/Virtual Account otomatis di dalam website.
* **Pengurangan Kuota Otomatis:** Sistem yang otomatis mengurangi angka sisa kuota setiap ada pesanan masuk. *(Kuota dikonfirmasi manual oleh admin di WhatsApp untuk menghindari selisih data).*
* **Sistem Katering Langganan:** Penjadwalan pengiriman rutin harian/mingguan.
* **Registrasi & Akun Pembeli:** Fitur daftar akun, login pembeli, dan riwayat pesanan di dalam website.

---

## 10. Pemisahan: Kebutuhan yang Sudah Disetujui vs. Asumsi yang Belum Dikonfirmasi

Bagian ini memisahkan secara tegas hal-hal yang sudah pasti berdasarkan keputusan Anda dan hal-hal yang masih berupa asumsi sementara sehingga perlu Anda lengkapi sebelum proses pembuatan dimulai.

### 10.1 Kebutuhan yang Sudah Disetujui (Confirmed Requirements)
1. **Model Layanan:** Pemesanan *Pre-Order* (PO) berbasis kuota yang jadwalnya tidak rutin, serta menerima pesanan acara / nasi kotak. Tidak ada layanan katering langganan.
2. **Aturan Bahan Masakan:** Standar (*default*) masakan adalah vegetarian (dapat memakai telur/susu) dan tanpa bawang-bawangan. Tersedia opsi permintaan khusus (*request* 100% vegan tanpa telur/susu/hewani, atau *request* memakai bawang).
3. **Fungsi Utama Website:** Etalase portofolio untuk meyakinkan pembeli baru agar tertarik mencoba makanan vegetarian/vegan, sekaligus pusat informasi jadwal PO.
4. **Alur Transaksi:** Menggunakan tombol yang mengarahkan langsung ke WhatsApp admin (tanpa sistem pembayaran otomatis di website dan tanpa wajib login bagi pembeli).
5. **Pengelola Sistem:** Anda sendiri yang akan mengelola dan memperbarui seluruh konten, foto, dan status PO di website.
6. **Kesiapan Aset Visual:** Foto-foto makanan sudah tersedia dan sedang dalam tahap penyuntingan (*editing*) agar lebih estetis sebelum dipasang.
7. **Batasan Proyek:** Mengutamakan kecepatan pengerjaan dan penghematan biaya (versi dasar/MVP terlebih dahulu).

### 10.2 Asumsi yang Belum Dikonfirmasi (Unconfirmed Assumptions)
Poin-poin berikut **belum dibahas** dan perlu Anda tentukan isinya untuk melengkapi konten website:

1. **Identitas Usaha & Kontak:**
   * *Asumsi:* Nama brand/usaha kuliner orang tua, logo (jika ada), serta nomor WhatsApp bisnis yang akan menerima pesanan sudah siap.
   * *Tindakan:* Perlu dikonfirmasi nama usaha, nomor WhatsApp tujuan, dan tautan Grup/Saluran WhatsApp Info PO.
2. **Syarat Pemesanan Acara / Nasi Kotak:**
   * *Asumsi:* Pesanan acara memiliki batas minimal pemesanan (misalnya minimal 15 atau 20 kotak) dan harus dipesan beberapa hari sebelumnya (misalnya minimal H-3 atau H-5).
   * *Tindakan:* Perlu dikonfirmasi angka pasti minimal porsi dan batas waktu pemesanan dari orang tua Anda.
3. **Aturan Pembayaran & Penguncian Kuota:**
   * *Asumsi:* Kuota PO dikunci setelah pembeli melakukan transfer penuh (lunas), sedangkan pesanan acara memerlukan uang muka (DP) tertentu.
   * *Tindakan:* Perlu dikonfirmasi kebijakan pembayaran yang berlaku di usaha orang tua Anda.
4. **Area Jangkauan & Pengiriman:**
   * *Asumsi:* Pengiriman dilakukan dari satu titik dapur (misalnya area kota tempat tinggal orang tua) menggunakan kurir instan/ojek online dengan ongkos kirim ditanggung pembeli.
   * *Tindakan:* Perlu dikonfirmasi area layanan pengiriman dan opsi pengambilan sendiri (*self-pickup*).
5. **Jumlah Menu Awal & Daftar Harga:**
   * *Asumsi:* Terdapat sekitar 5–15 menu unggulan yang sudah memiliki harga tetap untuk ditampilkan saat peluncuran pertama.
   * *Tindakan:* Perlu menyiapkan daftar final nama menu, kategori, harga, dan foto hasil edit sebelum website mulai diisi konten.