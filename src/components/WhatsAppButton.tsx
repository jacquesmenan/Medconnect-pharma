import React, { useState } from 'react';
import { MessageSquare, X, Send, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsAppButtonProps {
  onOpenContactModal?: () => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [hasSent, setHasSent] = useState(false);

  const phoneNumber = '+33189480100'; // numéro médical officiel de support
  const defaultPrompt = 'Bonjour MedConnect Pharma, je souhaite échanger avec un délégué médical concernant votre catalogue.';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = message.trim() || defaultPrompt;
    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setHasSent(true);
    setTimeout(() => {
      setIsOpen(false);
      setHasSent(false);
      setMessage('');
    }, 2000);
  };

  return (
    <div id="whatsapp-widget" className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  💊
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Assistance Délégué Médical</h4>
                  <p className="text-xs text-emerald-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                    En ligne • Réponse rapide
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 bg-slate-50 text-xs space-y-3">
              <div className="bg-white p-3 rounded-xl rounded-tl-none border border-slate-200 shadow-sm text-slate-700 leading-relaxed">
                <p className="font-medium text-slate-900 mb-1">Bienvenue chez MedConnect Pharma ! 👋</p>
                Vous êtes médecin, pharmacien ou représentant de laboratoire ? Écrivez-nous directement sur WhatsApp pour une prise de contact instantanée.
              </div>

              {hasSent ? (
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-center font-medium flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Redirection vers WhatsApp...
                </div>
              ) : (
                <form onSubmit={handleSend} className="space-y-2 pt-1">
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Votre question ou demande de visite..."
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-800 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" /> Démarrer la conversation WhatsApp
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        id="btn-open-whatsapp"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
        aria-label="Contacter sur WhatsApp"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute left-16 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg hidden sm:block">
          Échanger avec un délégué médical
        </span>
      </button>
    </div>
  );
};
