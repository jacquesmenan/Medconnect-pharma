import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { NewsCard } from '../components/NewsCard';
import { ApiService } from '../services/api';
import { NewsArticle } from '../types';

interface NewsPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const load = async () => {
      const data = await ApiService.getNews();
      setArticles(data);
    };
    load();
  }, []);

  const categories = ['all', 'Actualité Pharmaceutique', 'Événement', 'Formation Médicale', 'Innovation'];

  const filteredArticles = articles.filter((art) => {
    const matchSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCat = selectedCategory === 'all' || art.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div id="news-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Actualités & Congrès', active: true }]} onNavigate={onNavigate} />

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
          Veille & Publications
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Actualités Scientifiques & Événements
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Restez informé des évolutions thérapeutiques, symposiums, dates de congrès médicaux et nouveautés réglementaires.
        </p>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un article, mot-clé, congrès..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCategory(c)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === c
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {c === 'all' ? 'Toutes les actualités' : c}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <NewsCard
            key={art.id}
            article={art}
            onSelect={(id) => onNavigate('article-detail', id)}
          />
        ))}
      </section>
    </div>
  );
};
