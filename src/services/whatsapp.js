const waLink = (number, text) =>
  `https://wa.me/${String(number).replace(/\D/g, '')}?text=${encodeURIComponent(text)}`

export const poMessage = (name) =>
  `Halo, saya tertarik ikut PO menu ${name}.\n• Jumlah porsi: ...\n• Pilihan bahan: (Standar Tanpa Bawang / Request Pakai Bawang / Request 100% Vegan)\nMohon info ketersediaan kuotanya ya. Terima kasih!`

export const scheduleMessage = (name) =>
  `Halo, apakah menu ${name} akan dibuka pada kloter PO berikutnya?`

export const eventMessage = () =>
  `Halo, saya ingin konsultasi pesanan acara / nasi kotak.\n• Tanggal acara: ...\n• Estimasi jumlah kotak: ...\n• Preferensi bahan: (Standar Tanpa Bawang / Vegan / Pakai Bawang)`

export const infoMessage = () =>
  `Halo, saya ingin mendapat kabar jadwal PO berikutnya Dapoer Mama Ami.`

export const hampersMessage = (name, campaignName = 'Hampers Natal') =>
  `Halo, saya ingin pesan ${campaignName} — ${name}.\n• Jumlah box: ...\n• Tanggal ambil/kirim: ...\n• Ucapan kartu (opsional): ...\nMohon info ketersediaannya ya. Terima kasih!`

export { waLink }
