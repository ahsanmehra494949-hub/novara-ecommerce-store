import { useState, useEffect } from 'react';
import { FiImage } from 'react-icons/fi';

export default function ProductImage({ src, alt = '', className = '', style, iconSize = 22 }) {
  const [error, setError] = useState(false);
  useEffect(() => { setError(false); }, [src]);

  if (src && !error) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={className}
        style={style}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`} style={{ background: 'var(--surface-2)', color: 'var(--text-muted)', ...style }}>
      <FiImage size={iconSize} />
    </div>
  );
}
