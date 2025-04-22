import { UploadDropzone } from '@uploadthing/react'
import type { OurFileRouter } from '@/lib/uploadthing'
import '@uploadthing/react/styles.css'

interface Props {
  onUpload: (url: string) => void
}

export default function UploadImageButton({ onUpload }: Props) {
  return (
    <UploadDropzone<OurFileRouter, 'imageUploader'>
      endpoint="imageUploader"
      onClientUploadComplete={res => {
        if (res && res[0].url) onUpload(res[0].url)
      }}
      onUploadError={err => {
        alert(`上傳失敗：${err.message}`)
      }}
      appearance={{
        label: { fontSize: '14px' },
        button: {
          backgroundColor: '#ff5a5f',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
        },
        container: {
          borderRadius: '0.5rem',
          border: '1px dashed #ff5a5f',
          padding: '1rem',
          marginTop: '0.5rem',
        },
      }}
    />
  )
}
