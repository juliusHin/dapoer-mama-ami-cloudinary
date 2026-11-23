import { waLink, infoMessage } from '../services/whatsapp.js'

const QUOTA_LABEL = {
  tersedia: 'Kuota Tersedia',
  hampir_habis: 'Kuota Hampir Habis',
  penuh: 'Kuota Penuh',
}

export default function PoBanner({ settings }) {
  const open = settings.po_status === 'buka'
  const infoHref = settings.whatsapp_group_link || waLink(settings.whatsapp_number, infoMessage())

  return (
    <section
      id="top"
      className={open ? 'bg-brand text-white' : 'bg-sand text-ink'}
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-heading text-lg font-bold">
            {open ? 'PO BUKA!' : 'Kloter PO Saat Ini Sudah Tutup'}
          </p>
          <p className="text-sm opacity-90">
            {open
              ? [settings.po_title, settings.delivery_date && `Kirim: ${settings.delivery_date}`, QUOTA_LABEL[settings.quota_status] || '']
                  .filter(Boolean)
                  .join(' • ')
              : 'Tetap terima pesanan acara / nasi kotak — gabung info jadwal PO berikutnya.'}
          </p>
        </div>
        <a
          href={open ? '#katalog' : infoHref}
          target={open ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-white hover:bg-cta/90"
        >
          {open ? 'Lihat Menu PO' : 'Gabung Info Jadwal PO'}
        </a>
      </div>
    </section>
  )
}
