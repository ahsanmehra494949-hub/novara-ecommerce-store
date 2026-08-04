import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FiUpload, FiX } from 'react-icons/fi';
import { fileToCompressedDataUrl } from '../../utils/imageUpload';

// A single-image "upload from your device" control. Shows a preview once an
// image is picked, with a way to remove/replace it. Value is a compressed
// data URL string (or '').
export default function ImageUploadField({
  label,
  value,
  onChange,
  hint = 'PNG or JPG, uploaded from your device.',
  aspect = 'aspect-video',
  round = false,
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (fileList) => {
    const file = Array.from(fileList || []).find((f) => f.type.startsWith('image/'));
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      onChange(dataUrl);
    } catch {
      toast.error('Could not read that image');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="mb-4">
      {label && <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>{label}</label>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files)}
      />

      {value ? (
        <div className={`relative w-full ${aspect} ${round ? 'rounded-full' : 'rounded-xl'} overflow-hidden group border`} style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}>
          <img src={value} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
              style={{ background: 'var(--brand)', color: 'var(--brand-ink)' }}
            >
              <FiUpload size={12} /> Replace
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 rounded-full"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <FiX className="text-white" size={14} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={`w-full ${aspect} flex flex-col items-center justify-center gap-2 ${round ? 'rounded-full' : 'rounded-xl'} border border-dashed text-sm font-medium hover:opacity-80 transition disabled:opacity-50`}
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'var(--surface-2)' }}
        >
          <FiUpload size={17} style={{ color: 'var(--brand)' }} />
          {uploading ? 'Processing...' : 'Upload from your device'}
        </button>
      )}
      {hint && <p className="text-[11px] mt-1.5" style={{ color: 'var(--text-muted)' }}>{hint}</p>}
    </div>
  );
}
