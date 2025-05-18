export async function getCroppedImg(
  imageSrc: string,
  crop: { width: number; height: number; x: number; y: number }
): Promise<Blob> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const size = 400
  canvas.width = size
  canvas.height = size

  ctx?.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    size,
    size
  )

  return new Promise<Blob>(resolve => {
    canvas.toBlob(
      blob => {
        if (!blob) throw new Error('Crop failed')
        resolve(blob)
      },
      'image/png',
      1
    )
  })
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', error => reject(error))
    img.setAttribute('crossOrigin', 'anonymous') // CORS回避
    img.src = url
  })
}
