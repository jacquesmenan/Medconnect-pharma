import React from 'react';
import { X, ChevronRight, Phone, Mail, MapPin, Pill, Calendar, Search, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface MobileMenuProps {
  isOpen: boolean;
  currentPage: string;
  onClose: () => void;
  onNavigate: (page: string, param?: string) => void;
  onOpenSearch: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  currentPage,
  onClose,
  onNavigate,
  onOpenSearch
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  const links = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos de nous' },
    { id: 'services', label: 'Nos Services & Expertises' },
    { id: 'products', label: 'Catalogue Médicaments & Produits' },
    { id: 'laboratories', label: 'Laboratoires Partenaires' },
    { id: 'news', label: 'Actualités & Événements' },
    { id: 'careers', label: 'Carrières & Recrutement' },
    { id: 'faq', label: 'Foire Aux Questions (FAQ)' },
    { id: 'contact', label: 'Contact & Prise de RDV' }
  ];

  const handleLinkClick = (page: string, param?: string) => {
    onNavigate(page, param);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-200 dark:border-slate-800"
          >
            <div>
              {/* Header inside drawer */}
              <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                    <Pill className="w-4 h-4 rotate-45" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-base">MedConnect Pharma</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg transition-colors"
                    aria-label="Basculer le thème"
                  >
                    {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg"
                    aria-label="Fermer le menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Search Action */}
              <div className="p-4 pb-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSearch();
                  }}
                  className="w-full py-2.5 px-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-medium flex items-center justify-between transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    Rechercher un produit, laboratoire...
                  </span>
                  <span className="text-[10px] bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-400">⌘K</span>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-3 space-y-1">
                {links.map((link) => {
                  const isActive = currentPage === link.id;
                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => handleLinkClick(link.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-300 dark:text-slate-600'}`} />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Action & Contact Details Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <button
                type="button"
                onClick={() => handleLinkClick('contact', 'rdv_delegue')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Calendar className="w-4 h-4" /> Prendre RDV avec un Délégué
              </button>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5 pt-2">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>+225 01 50 21 52 02 (24h/24)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>contact@medconnect-pharma.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Abidjan, Côte d'Ivoire</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

