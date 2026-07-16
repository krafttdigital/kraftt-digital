import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { trackEvent } from '@/utils/analytics';

const floatingWhatsAppMessage = `Hi Kraftt Digital, I would like to discuss my website / digital presence.

Business name:
City:
Service needed:`;

const whatsappHref = `https://wa.me/91${siteConfig.contact.whatsapp}?text=${encodeURIComponent(floatingWhatsAppMessage)}`;

export function FloatingWhatsAppButton() {
  return (
    <motion.a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Kraftt Digital on WhatsApp"
      onClick={() => trackEvent('whatsapp_click', { location: 'floating_button' })}
      className="agency-magnetic admin-no-print inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[#25d366] text-white shadow-[0_18px_52px_rgba(13,13,13,0.24),0_0_0_8px_rgba(37,211,102,0.12)] transition-colors hover:bg-[#20bd5a] sm:h-16 sm:w-16"
      style={{
        position: 'fixed',
        right: 'max(1rem, env(safe-area-inset-right))',
        bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
        zIndex: 9999,
      }}
      initial={{ opacity: 0, scale: 0.84, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-[#25d366]/30 blur-xl" aria-hidden="true" />
      <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
    </motion.a>
  );
}
