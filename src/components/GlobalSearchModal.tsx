import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search,
  X,
  Pill,
  Building2,
  Stethoscope,
  Newspaper,
  ChevronRight,
  Loader2,
  History,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ApiService } from '../services/api';
import { Product, Laboratory, Service, NewsArticle } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, param?: string) => void;
}

const RECENT_SEARCHES_KEY = 'medconnect_recent_searches_v1';
const MAX_RECENT_SEARCHES = 6;

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [results, setResults] = useState<{
    products: Product[];
    laboratories: Laboratory[];
    services: Service[];
    news: NewsArticle[];
  }>({ products: [], laboratories: [], services: [], news: [] });

  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  const loadRecentSearches = useCallback(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRecentSearches(parsed.slice(0, MAX_RECENT_SEARCHES));
        }
      }
    } catch (e) {
      console.warn('Could not read recent searches from localStorage', e);
    }
  }, []);

  // Save a search query to localStorage
  const saveSearchQuery = useCallback((searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed || trimmed.length < 2) return;

    try {
      const current = localStorage.getItem(RECENT_SEARCHES_KEY);
      let list: string[] = current ? JSON.parse(current) : [];
      // Remove any existing duplicate (case insensitive comparison)
      list = list.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      // Insert at front
      list.unshift(trimmed);
      list = list.slice(0, MAX_RECENT_SEARCHES);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(list));
      setRecentSearches(list);
    } catch (e) {
      console.warn('Could not save search query to localStorage', e);
    }
  }, []);

  const handleRemoveRecentSearch = (e: React.MouseEvent, itemToRemove: string) => {
    e.stopPropagation();
    try {
      const updated = recentSearches.filter((item) => item !== itemToRemove);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      setRecentSearches(updated);
    } catch (err) {
      console.warn('Could not remove recent search item', err);
    }
  };

  const handleClearAllRecent = () => {
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      setRecentSearches([]);
    } catch (err) {
      console.warn('Could not clear recent searches', err);
    }
  };

  // Focus input and load history when opened
  useEffect(() => {
    if (isOpen) {
      loadRecentSearches();
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults({ products: [], laboratories: [], services: [], news: [] });
    }
  }, [isOpen, loadRecentSearches]);

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
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
      // If found results, save query
      if (
        res.products.length > 0 ||
        res.laboratories.length > 0 ||
        res.services.length > 0 ||
        res.news.length > 0
      ) {
        saveSearchQuery(query);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, saveSearchQuery]);

  const handleSelect = (page: string, param?: string) => {
    if (query.trim()) {
      saveSearchQuery(query);
    }
    onNavigate(page, param);
    onClose();
  };

  const handleRecentClick = (recentTerm: string) => {
    setQuery(recentTerm);
    saveSearchQuery(recentTerm);
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      saveSearchQuery(query);
    }
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
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh] z-10"
          >
            {/* Search Input Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-900/80">
              <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDownInput}
                placeholder="Rechercher un médicament (ex: TensolCor, Amoxicilline), un laboratoire, un service..."
                className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
              />
              {loading && <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin shrink-0" />}
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md"
                  title="Effacer la recherche"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md font-medium transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Search Results Area */}
            <div className="overflow-y-auto p-4 space-y-6 flex-1 divide-y divide-slate-100 dark:divide-slate-800">
              {query.trim() === '' ? (
                <div className="py-4 space-y-6">
                  {/* Recent Searches Section */}
                  {recentSearches.length > 0 && (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                          <History className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Recherches récentes
                        </span>
                        <button
                          type="button"
                          onClick={handleClearAllRecent}
                          className="text-[11px] font-medium text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Effacer l'historique</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {recentSearches.map((term, index) => (
                          <div
                            key={`${term}-${index}`}
                            onClick={() => handleRecentClick(term)}
                            className="group flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-750 rounded-xl cursor-pointer transition-all text-xs text-slate-700 dark:text-slate-200 hover:text-blue-900 dark:hover:text-blue-300"
                          >
                            <span className="flex items-center gap-2 font-medium truncate">
                              <History className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0" />
                              <span className="truncate">{term}</span>
                            </span>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => handleRemoveRecentSearch(e, term)}
                                className="p-1 text-slate-300 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 rounded-md transition-colors"
                                title="Supprimer cette recherche"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions Section */}
                  <div className="text-center text-slate-400 space-y-3 pt-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                      <Search className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Suggestions de recherche rapide :</p>
                    <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-xs">
                      {['Cardiologie', 'BioMed France', 'Antibiotiques', 'Visite Médicale', 'Pédiatrie', 'Gastro-entérologie'].map((sugg) => (
                        <button
                          key={sugg}
                          type="button"
                          onClick={() => {
                            setQuery(sugg);
                            saveSearchQuery(sugg);
                          }}
                          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-100/70 dark:hover:bg-slate-700 hover:text-blue-800 dark:hover:text-blue-300 rounded-full text-slate-600 dark:text-slate-300 font-medium transition-colors"
                        >
                          {sugg}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : totalResults === 0 && !loading ? (
                <div className="py-10 text-center text-slate-500 dark:text-slate-400 text-sm">
                  Aucun résultat trouvé pour « <span className="font-semibold text-slate-800 dark:text-slate-200">{query}</span> ».
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Essayez un nom de molécule (DCI), une classe thérapeutique ou un laboratoire.</p>
                </div>
              ) : (
                <>
                  {/* Produits */}
                  {results.products.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                          <Pill className="w-3.5 h-3.5" /> Médicaments & Produits ({results.products.length})
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {results.products.map((prod) => (
                          <button
                            key={prod.id}
                            type="button"
                            onClick={() => handleSelect('product-detail', prod.id)}
                            className="w-full text-left p-2.5 hover:bg-blue-50/70 dark:hover:bg-slate-800/60 rounded-xl transition-colors flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-9 h-9 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                              />
                              <div>
                                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400">
                                  {prod.name}
                                </p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                  {prod.genericName} • {prod.category} ({prod.laboratoryName})
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Laboratoires */}
                  {results.laboratories.length > 0 && (
                    <div className="pt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                        <Building2 className="w-3.5 h-3.5" /> Laboratoires Partenaires ({results.laboratories.length})
                      </span>
                      <div className="space-y-1.5">
                        {results.laboratories.map((lab) => (
                          <button
                            key={lab.id}
                            type="button"
                            onClick={() => handleSelect('laboratory-detail', lab.id)}
                            className="w-full text-left p-2.5 hover:bg-emerald-50/70 dark:hover:bg-slate-800/60 rounded-xl transition-colors flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{lab.flag}</span>
                              <div>
                                <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                                  {lab.name}
                                </p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                  {lab.country} • Spécialités: {lab.specialties.join(', ')}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Services */}
                  {results.services.length > 0 && (
                    <div className="pt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5 mb-2">
                        <Stethoscope className="w-3.5 h-3.5" /> Pôles de Services ({results.services.length})
                      </span>
                      <div className="space-y-1.5">
                        {results.services.map((srv) => (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => handleSelect('services', srv.id)}
                            className="w-full text-left p-2.5 hover:bg-amber-50/70 dark:hover:bg-slate-800/60 rounded-xl transition-colors flex items-center justify-between group"
                          >
                            <div>
                              <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400">
                                {srv.title}
                              </p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{srv.shortDescription}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actualités */}
                  {results.news.length > 0 && (
                    <div className="pt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1.5 mb-2">
                        <Newspaper className="w-3.5 h-3.5" /> Articles & Congrès ({results.news.length})
                      </span>
                      <div className="space-y-1.5">
                        {results.news.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelect('article-detail', item.id)}
                            className="w-full text-left p-2.5 hover:bg-purple-50/70 dark:hover:bg-slate-800/60 rounded-xl transition-colors flex items-center justify-between group"
                          >
                            <div>
                              <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 line-clamp-1">
                                {item.title}
                              </p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                {item.category} • {item.publicationDate}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer with hint */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Navigation au clavier : flèches ↑↓ pour naviguer</span>
              <button
                type="button"
                onClick={() => handleSelect('products')}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Explorer tout le catalogue</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
