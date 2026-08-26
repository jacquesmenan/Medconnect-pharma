import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('medconnect_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('medconnect_cookie_consent', JSON.stringify({ essential: true, analytics: true, marketing: true }));
    setIsVisible(false);
  };

  const handleRefuseAll = () => {
    localStorage.setItem('medconnect_cookie_consent', JSON.stringify({ essential: true, analytics: false, marketing: false }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('medconnect_cookie_consent', JSON.stringify({ essential: true, analytics, marketing }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="cookie-consent-banner"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-700 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 max-w-4xl">
            <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-xl shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white text-sm sm:text-base">
                Respect de votre vie privée & conformité pharmaceutique
              </p>
              <p className="leading-relaxed">
                MedConnect Pharma utilise des cookies techniques nécessaires au bon fonctionnement de la plateforme et, avec votre accord, des cookies d’audience pour optimiser l’expérience des professionnels de santé. Vos données médicales ne sont jamais partagées à des fins publicitaires tierces.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0 justify-end">
            <button
              type="button"
              onClick={() => setShowPreferences(!showPreferences)}
              className="px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Settings2 className="w-3.5 h-3.5" /> Personnaliser
            </button>
            <button
              type="button"
              onClick={handleRefuseAll}
              className="px-4 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              Continuer sans accepter
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-md transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" /> Tout accepter
            </button>
          </div>
        </div>

        {/* Modal de personnalisation simplifiée */}
        {showPreferences && (
          <div className="mt-4 pt-4 border-t border-slate-800 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 flex items-center justify-between">
              <div>
                <p className="font-medium text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Cookies Essentiels
                </p>
                <p className="text-slate-400 text-[11px] mt-0.5">Indispensables à la navigation</p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">Toujours actif</span>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Mesure d’Audience</p>
                <p className="text-slate-400 text-[11px] mt-0.5">Statistiques anonymisées de consultation</p>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="w-4 h-4 text-sky-600 rounded bg-slate-700 border-slate-600 focus:ring-sky-500"
              />
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Personnalisation Médicale</p>
                <p className="text-slate-400 text-[11px] mt-0.5">Suggestions par spécialité médicale</p>
              </div>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="w-4 h-4 text-sky-600 rounded bg-slate-700 border-slate-600 focus:ring-sky-500"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold"
              >
                Enregistrer mes choix
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
