import React, { useMemo } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TOOLBAR = [
  ['bold', 'italic', 'underline'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
  ['clean'],
]

export default function AdminRichTextField({ label, value, onChange, placeholder }) {
  const modules = useMemo(
    () => ({
      toolbar: TOOLBAR,
    }),
    []
  )

  return (
    <div className="admin-form-group admin-rich-text">
      {label ? <label>{label}</label> : null}
      <ReactQuill
        theme="snow"
        value={value || ''}
        onChange={(html) => onChange(html === '<p><br></p>' ? '' : html)}
        modules={modules}
        placeholder={placeholder}
      />
    </div>
  )
}
