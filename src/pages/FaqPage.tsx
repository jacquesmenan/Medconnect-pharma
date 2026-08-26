import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, Search, MessageSquare } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ApiService } from '../services/api';
import { FaqItem } from '../types';

interface FaqPageProps {
  onNavigate: (page: string, param?: string) => void;
  onRequestMeeting: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onRequestMeeting }) => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const load = async () => {
      const data = await ApiService.getFaqs();
      setFaqs(data);
      // Expand first 2 by default
      if (data.length > 0) {
        setExpandedIds({ [data[0].id]: true, [data[1]?.id]: true });
      }
    };
    load();
  }, []);

  const categories = ['all', 'Professionnels de Santé', 'Laboratoires & Fabricants', 'Général & Réglementation'];

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = faqs.filter((item) => {
    const matchSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div id="faq-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Foire Aux Questions (FAQ)', active: true }]} onNavigate={onNavigate} />

      {/* Header */}
      <section className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
          Centre d’Aide & Réponses
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Questions Fréquemment Posées
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Retrouvez les réponses aux interrogations courantes des médecins, pharmaciens et dirigeants de laboratoires pharmaceutiques.
        </p>
      </section>

      {/* Search & Categories */}
      <section className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une question ou un mot-clé (ex: ordonnance, AMM, échantillon)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'Toutes les rubriques' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion FAQ Items */}
      <section className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = !!expandedIds[faq.id];
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => toggleExpand(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-sky-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Didn't find answer? CTA */}
      <section className="bg-sky-50 rounded-3xl p-6 sm:p-8 text-center border border-sky-100 space-y-3">
        <h3 className="text-lg font-bold text-sky-950">Vous n'avez pas trouvé réponse à votre question ?</h3>
        <p className="text-xs sm:text-sm text-sky-800 max-w-lg mx-auto">
          Nos délégués et pharmaciens conseils sont à votre écoute pour toute demande technique ou réglementaire spécifique.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
          >
            Poser une question
          </button>
        </div>
      </section>
    </div>
  );
};
