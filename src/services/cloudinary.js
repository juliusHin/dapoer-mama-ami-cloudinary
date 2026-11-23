const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024

export async function uploadImage(file) {
  if (!file || !ALLOWED_TYPES.includes(file.type)) {
    throw new Error('File harus berupa gambar (JPG, PNG, atau WebP).')
  }
  if (file.size > MAX_SIZE) {
    throw new Error('Ukuran foto maksimal 5 MB.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData },
  )

  if (!res.ok) {
    let msg = 'kesalahan tidak diketahui'
    try {
      msg = (await res.json())?.error?.message || msg
    } catch {}
    throw new Error('Gagal mengunggah foto: ' + msg)
  }
  const json = await res.json()

  return json.secure_url.replace('/upload/', '/upload/f_auto,q_auto,w_800/')
}
