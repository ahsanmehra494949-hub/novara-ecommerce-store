import { FaWhatsapp } from 'react-icons/fa';
import { loadState } from '../../utils/storage';

export default function WhatsAppButton() {
  const settings = loadState('novara_store_settings', { phone: '+92 300 1234567', storeName: 'Novara' });
  const digits = (settings.phone || '').replace(/[^0-9]/g, '');
  const message = encodeURIComponent(`Hi ${settings.storeName || 'Novara'}, I have a question about a product.`);
  const href = `https://api.whatsapp.com/send?phone=${digits}&text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition hover:scale-105"
      style={{ background: '#25D366', color: '#fff' }}
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
