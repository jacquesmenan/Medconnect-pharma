import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Pill, Building2, Stethoscope, Newspaper, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ApiService } from '../services/api';
import { Product, Laboratory, Service, NewsArticle } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, param?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    products: Product[];
    laboratories: Laboratory[];
    services: Service[];
    news: NewsArticle[];
  }>({ products: [], laboratories: [], services: [], news: [] });

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults({ products: [], laboratories: [], services: [], news: [] });
    }
  }, [isOpen]);

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger handled in parent or here
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], laboratories: [], services: [], news: [] });
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      const res = await ApiService.globalSearch(query);
      setResults(res);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (page: string, param?: string) => {
    onNavigate(page, param);
    onClose();
  };

  const totalResults =
    results.products.length +
    results.laboratories.length +
    results.services.length +
    results.news.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Search Input Header */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
              <Search className="w-5 h-5 text-blue-600 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un médicament (ex: TensolCor, Amoxicilline), un laboratoire, un service..."
                className="w-full bg-transparent text-sm sm:text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
              {loading && <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />}
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded-md font-medium transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Search Results Area */}
            <div className="overflow-y-auto p-4 space-y-6 flex-1 divide-y divide-slate-100">
              {query.trim() === '' ? (
                <div className="py-8 text-center text-slate-400 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">Recherche rapide MedConnect Pharma</p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
                    <span className="text-slate-400">Suggestions :</span>
                    {['Cardiologie', 'BioMed France', 'Antibiotiques', 'Visite Médicale', 'Pédiatrie'].map((sugg) => (
                      <button
                        key={sugg}
                        type="button"
                        onClick={() => setQuery(sugg)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-lg text-slate-600 transition-colors"
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>
                </div>
              ) : totalResults === 0 && !loading ? (
                <div className="py-10 text-center text-slate-500 text-sm">
                  Aucun résultat trouvé pour « <span className="font-semibold text-slate-800">{query}</span> ».
                  <p className="text-xs text-slate-400 mt-1">Essayez un nom de molécule (DCI), une classe thérapeutique ou un laboratoire.</p>
                </div>
              ) : (
                <>
                  {/* Produits */}
                  {results.products.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                          <Pill className="w-3.5 h-3.5" /> Médicaments & Produits ({results.products.length})
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {results.products.map((prod) => (
                          <button
                            key={prod.id}
                            type="button"
                            onClick={() => handleSelect('product-detail', prod.id)}
                            className="w-full text-left p-2.5 hover:bg-blue-50/70 rounded-xl transition-colors flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-9 h-9 rounded-lg object-cover border border-slate-200"
                              />
                              <div>
                                <p className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                                  {prod.name}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  {prod.genericName} • {prod.category} ({prod.laboratoryName})
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Laboratoires */}
                  {results.laboratories.length > 0 && (
                    <div className="pt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5 mb-2">
                        <Building2 className="w-3.5 h-3.5" /> Laboratoires Partenaires ({results.laboratories.length})
                      </span>
                      <div className="space-y-1.5">
                        {results.laboratories.map((lab) => (
                          <button
                            key={lab.id}
                            type="button"
                            onClick={() => handleSelect('laboratory-detail', lab.id)}
                            className="w-full text-left p-2.5 hover:bg-emerald-50/70 rounded-xl transition-colors flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{lab.flag}</span>
                              <div>
                                <p className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-emerald-700">
                                  {lab.name}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  {lab.country} • Spécialités: {lab.specialties.join(', ')}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Services */}
                  {results.services.length > 0 && (
                    <div className="pt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 mb-2">
                        <Stethoscope className="w-3.5 h-3.5" /> Pôles de Services ({results.services.length})
                      </span>
                      <div className="space-y-1.5">
                        {results.services.map((srv) => (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => handleSelect('services', srv.id)}
                            className="w-full text-left p-2.5 hover:bg-amber-50/70 rounded-xl transition-colors flex items-center justify-between group"
                          >
                            <div>
                              <p className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-amber-700">
                                {srv.title}
                              </p>
                              <p className="text-[11px] text-slate-500 line-clamp-1">{srv.shortDescription}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actualités */}
                  {results.news.length > 0 && (
                    <div className="pt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5 mb-2">
                        <Newspaper className="w-3.5 h-3.5" /> Articles & Congrès ({results.news.length})
                      </span>
                      <div className="space-y-1.5">
                        {results.news.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect('article-detail', item.id)}
                            className="w-full text-left p-2.5 hover:bg-purple-50/70 rounded-xl transition-colors flex items-center justify-between group"
                          >
                            <div>
                              <p className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-purple-700 line-clamp-1">
                                {item.title}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {item.category} • {item.publicationDate}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer with hint */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Navigation au clavier : flèches ↑↓ pour naviguer</span>
              <button
                type="button"
                onClick={() => handleSelect('products')}
                className="text-blue-600 font-semibold hover:underline"
              >
                Explorer tout le catalogue →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
