# Photo Brief — Panduan Foto Website (untuk Manusia, Desainer & AI)

**Tujuan:** siapa pun yang memproduksi foto (Anda, orang tua, desainer, atau AI image generator) tahu persis target tiap slot. Foto asli diunggah lewat **Panel Admin** dan otomatis menggantikan placeholder sketsa.

**Aturan umum semua slot:** pencahayaan hangat seragam (kuning lembut), tanpa teks/watermark di foto, subjek di tengah dengan sedikit ruang kosong, format JPG/PNG (Cloudinary mengompres otomatis).

---

## Tabel Slot

| Slot | Rasio | Ukuran Min | Subjek & Mood | Hindari |
|---|---|---|---|---|
| **Hero polaroid** | 1:1 | 800×800 | 1 masakan andalan paling estetis, close-up menggugah selera | foto tegak, potongan aneh |
| **Kartu menu** | 4:3 | 800×600 | 1 hidangan utuh per foto, tampak atas 30–45° | prop  berantakan, meja kotor |
| **Hampers Natal** | 4:3 | 800×600 | box hampers + pita, nuansa merah–hijau lembut | teks ucapan yang salah eja |
| **Galeri acara** | 4:3 | 800×600 | susunan nasi kotak / suasana acara | wajah orang tanpa izin |
| **OG preview** (tautan WA/IG) | 1.91:1 | 1200×630 | logo + 1 foto terbaik di latar krem (#FAF8F5) | teks kecil tak terbaca |

**Konvensi nama file:** huruf kecil, strip, tanpa spasi — samakan dengan kolom "Nama File Foto" di `menu_template.md` (contoh: `rendang-jamur.jpg`, `hampers-classic.jpg`).

---

## Prompt AI per Slot (jika memakai AI image generator)

Salin & sesuaikan nama hidangannya. Hasil AI hanya untuk **konsep/mocking** — untuk produksi utamakan foto asli.

**Kartu menu:**
> Handheld-style food photography of [NAMA HIDANGAN], Indonesian home cooking, vegetarian, served on a rustic ceramic plate, warm soft natural light from the left, shallow depth of field, top-down 30 degree angle, cozy cream background, appetizing, no text, no props clutter, 4:3

**Hampers Natal:**
> Product photo of a Christmas hamper gift box with ribbon, filled with artisan cookies and brownies, soft red and sage green accents, warm cozy lighting, cream linen backdrop, handcrafted feel, no text, 4:3

**Galeri acara:**
> Rows of Indonesian nasi kotak lunch boxes neatly arranged on a wooden table for a family celebration, warm ambient light, candid documentary style, no visible faces, 4:3

**Hero polaroid:**
> Close-up appetizing shot of [NAMA HIDANGAN] Indonesian vegetarian dish on rustic plate, steam rising, warm golden light, cream background, square 1:1, looks homemade not commercial

**OG preview (1200×630):**
> Clean brand banner on warm cream background #FAF8F5, a rustic ceramic plate of Indonesian vegetarian food on the right third, generous empty space on the left for text, warm soft light, no text in image, 1200x630
