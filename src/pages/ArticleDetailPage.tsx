import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Share2, Tag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { NewsCard } from '../components/NewsCard';
import { ApiService } from '../services/api';
import { NewsArticle } from '../types';
import { useToast } from '../context/ToastContext';

interface ArticleDetailPageProps {
  articleId: string;
  onNavigate: (page: string, param?: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  articleId,
  onNavigate
}) => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const { success } = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const art = await ApiService.getNewsById(articleId);
      if (art) {
        setArticle(art);
        const all = await ApiService.getNews();
        setRelatedArticles(all.filter((a) => a.id !== art.id).slice(0, 3));
      }
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    load();
  }, [articleId]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500">Chargement...</div>;
  }

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Article non trouvé</h2>
        <button
          type="button"
          onClick={() => onNavigate('news')}
          className="px-5 py-2 bg-sky-600 text-white rounded-xl text-xs"
        >
          Retour aux actualités
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    success('Lien de l’article copié dans le presse-papier !');
  };

  return (
    <div id="article-detail-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <Breadcrumb
        items={[
          { label: 'Actualités & Congrès', page: 'news' },
          { label: article.category, page: 'news' },
          { label: article.title, active: true }
        ]}
        onNavigate={onNavigate}
      />

      {/* Header Info */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="font-semibold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {article.publicationDate}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {article.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          {article.summary}
        </p>

        {/* Author bar & Share */}
        <div className="flex items-center justify-between border-y border-slate-100 py-3.5">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <p className="text-xs font-bold text-slate-900">{article.author.name}</p>
              <p className="text-[11px] text-slate-500">{article.author.role}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Partager</span>
          </button>
        </div>
      </section>

      {/* Featured Banner Image */}
      <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
      </div>

      {/* Main Body */}
      <article className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-4">
        {Array.isArray(article.content)
          ? article.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))
          : article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
      </article>

      {/* Tags */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
        <Tag className="w-4 h-4 text-slate-400" />
        <span className="text-xs text-slate-500 font-medium">Mots-clés :</span>
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Related News */}
      {relatedArticles.length > 0 && (
        <section className="pt-10 border-t border-slate-200 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Articles Connexes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((art) => (
              <NewsCard
                key={art.id}
                article={art}
                onSelect={(id) => onNavigate('article-detail', id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
