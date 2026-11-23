// Penanda slot foto bergaya sketsa tangan — tampil saat image_url kosong, tergantikan otomatis oleh foto asli.
const ink = '#2E5A44'
const accent = '#D96B27'
const muted = '#66625E'

function Plate() {
  return (
    <g stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round">
      <ellipse cx="200" cy="175" rx="95" ry="26" />
      <ellipse cx="200" cy="170" rx="58" ry="15" opacity="0.55" />
      <circle cx="200" cy="164" r="14" fill={accent} stroke="none" opacity="0.85" />
      <path d="M172 118 q8 -16 -2 -30" opacity="0.7" />
      <path d="M200 112 q8 -18 -2 -32" opacity="0.7" />
      <path d="M228 118 q8 -16 -2 -30" opacity="0.7" />
    </g>
  )
}

function Jar() {
  return (
    <g stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round">
      <rect x="150" y="118" width="100" height="88" rx="12" />
      <rect x="144" y="102" width="112" height="18" rx="9" />
      <circle cx="182" cy="160" r="12" fill={accent} stroke="none" opacity="0.85" />
      <circle cx="216" cy="182" r="9" fill={ink} stroke="none" opacity="0.35" />
      <circle cx="216" cy="146" r="6" opacity="0.5" />
    </g>
  )
}

function Sprig() {
  return (
    <g stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M200 205 q-4 -55 18 -95" />
      <path d="M203 172 q-24 -4 -32 -24 q22 -2 32 24z" fill={accent} fillOpacity="0.25" />
      <path d="M209 148 q22 -8 26 -30 q-24 4 -26 30z" fill={accent} fillOpacity="0.25" />
      <path d="M196 196 q-20 -2 -26 -20 q19 0 26 20z" />
    </g>
  )
}

const MOTIFS = [Plate, Jar, Sprig]

export default function PlaceholderArt({ label, seed = '' }) {
  const hash = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0)
  const Motif = MOTIFS[Math.abs(hash) % MOTIFS.length]
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`Foto ${label} menyusul`}
    >
      <rect width="400" height="300" fill="#FAF8F5" />
      <Motif />
      <text x="200" y="272" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="24" fill={muted}>
        foto {label} menyusul
      </text>
    </svg>
  )
}
