import React, { useRef, useState } from 'react'
import { API_BASE_URL } from '../../constants/api'
import { resolveCmsAssetUrl } from '../../utils/cmsAssetUrl'

const AdminImageField = ({ label, value, onChange, hint, variant = 'default' }) => {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WebP, etc.)')
      return
    }

    setError('')
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      onChange(data.imageUrl)
    } catch (err) {
      setError(err.message || 'Failed to upload image')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const previewSrc = value ? resolveCmsAssetUrl(value) : ''

  return (
    <div className="admin-form-group">
      <label>{label}</label>
      {hint ? <p className="admin-field-hint">{hint}</p> : null}
      <div className="admin-file-upload-section">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="admin-file-input"
          disabled={uploading}
        />
        {uploading ? <span className="admin-selected-file">Uploading…</span> : null}
        {error ? <span className="admin-field-error">{error}</span> : null}
      </div>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Image URL or upload above"
        style={{ marginTop: 8 }}
      />
      {previewSrc ? (
        <div
          className={`admin-image-preview-wrap${
            variant === 'logo' ? ' admin-image-preview-wrap--logo' : ''
          }`}
        >
          <img
            src={previewSrc}
            alt=""
            className={`admin-image-preview${
              variant === 'logo' ? ' admin-image-preview--logo' : ''
            }`}
          />
        </div>
      ) : null}
    </div>
  )
}

export default AdminImageField
