export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo Dapoer Mama Ami" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-heading text-lg font-bold text-brand">Dapoer Mama Ami</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted sm:flex">
          <a href="#katalog" className="hover:text-brand">Menu</a>
          <a href="#acara" className="hover:text-brand">Pesanan Acara</a>
          <a href="#kontak" className="hover:text-brand">Kontak</a>
        </nav>
        <a
          href="#katalog"
          className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90"
        >
          Lihat Menu
        </a>
      </div>
    </header>
  )
}
